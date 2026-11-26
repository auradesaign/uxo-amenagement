import { useEffect, useRef } from 'react';

export type TimeOfDayMode = 'morning' | 'night';

interface AtmosphericBackgroundProps {
  mode: TimeOfDayMode;
}

const IMG_SKY_MORNING =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040343_a73684b4-3f71-4613-a843-c8be80fb1211.png&w=1600&q=80';
const IMG_SKY_NIGHT =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040308_f31964ab-ed8e-4ea4-90eb-3226c0859936.png&w=1600&q=80';
const IMG_GROUND_MORNING =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040259_1be34093-835e-4de4-b3a8-f875e6a74591.png&w=2560&q=85';
const IMG_CUT_MORNING =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040416_e3b05fa4-cc80-4a43-afde-8a0a053933e9.png&w=2560&q=85';
const IMG_GROUND_NIGHT =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040211_c8fd4865-285e-4c1f-8a37-4bfe0771357b.png&w=2560&q=85';
const IMG_CUT_NIGHT =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040415_2ab95096-8c39-449f-b36c-17c2813815a4.png&w=2560&q=85';

const SINK = 240;
const RISE = 820;
const DEPTH = 0.27;
const MAX_FOG_WIDTH = 640;
const IDLE_FRAME_INTERVAL_MS = 1000 / 30;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function AtmosphericBackground({ mode }: AtmosphericBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const setMRef = useRef<HTMLDivElement | null>(null);
  const setNRef = useRef<HTMLDivElement | null>(null);

  const animRef = useRef({
    target: mode === 'night' ? 1 : 0,
    from: mode === 'night' ? 1 : 0,
    start: -1e9,
    queued: null as number | null,
    swapped: true,
    k: mode === 'night' ? 1 : 0,
    animating: false,
    needsCssSync: true,
    clock: 0,
    lastFogRender: 0,
    initialized: false,
  });

  useEffect(() => {
    const nextTarget = mode === 'night' ? 1 : 0;
    const state = animRef.current;

    if (!state.initialized) {
      state.initialized = true;
      state.target = nextTarget;
      state.from = nextTarget;
      state.k = nextTarget;
      state.swapped = true;
      state.animating = false;
      state.needsCssSync = true;
      setMRef.current?.classList.toggle('is-on', nextTarget === 0);
      setNRef.current?.classList.toggle('is-on', nextTarget === 1);
      document.documentElement.style.setProperty('--k', String(nextTarget));
      document.documentElement.style.setProperty('--k2', String(nextTarget));
      return;
    }

    if (nextTarget === state.target && state.queued === null) return;

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm) {
      state.target = nextTarget;
      state.from = nextTarget;
      state.k = nextTarget;
      state.animating = false;
      state.queued = null;
      state.needsCssSync = true;
      setMRef.current?.classList.toggle('is-on', nextTarget === 0);
      setNRef.current?.classList.toggle('is-on', nextTarget === 1);
      document.documentElement.style.setProperty('--k', String(nextTarget));
      document.documentElement.style.setProperty('--k2', String(nextTarget));
      document.documentElement.style.setProperty('--sink', '0px');
      return;
    }

    if (state.animating) {
      state.queued = nextTarget;
    } else {
      state.target = nextTarget;
      state.from = state.k;
      state.start = state.clock;
      state.swapped = false;
      state.animating = true;
      state.needsCssSync = true;
    }
  }, [mode]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const gl = cv.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });

    const U: Record<string, WebGLUniformLocation | null> = {};

    if (gl) {
      const vs = `#version 300 es
      void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0,1);}`;

      const fs = `#version 300 es
      precision mediump float;
      uniform vec2 R;uniform float T,S,K;out vec4 O;
      float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float a=.5,s=0.;mat2 m=mat2(1.6,1.2,-1.2,1.6);p=mat2(.8,.6,-.6,.8)*p+5.3;for(int i=0;i<5;i++){s+=a*n(p);p=m*p;a*=.5;}return s;}
      void main(){
        vec2 uv=gl_FragCoord.xy/R;uv.y=1.-uv.y;
        float asp=R.x/R.y;vec2 p=vec2(uv.x*asp,uv.y);
        float t=T*.05;
        vec2 w=vec2(fbm(p*1.3+vec2(t,-t*.6)),fbm(p*1.3+vec2(-t*.8,t)+7.));
        float d=fbm(p*1.9+w*1.7+vec2(t*1.6,-t*1.1+S*.5));
        float e=fbm(p*.9-w+vec2(-t,t*.5)+3.);
        float low=smoothstep(.70,1.04,uv.y+(d-.5)*.34);
        float side=smoothstep(.2,.0,uv.x+(e-.5)*.28)+smoothstep(.8,1.,uv.x+(e-.5)*.28);
        side*=smoothstep(.25,.6,uv.y)*.2;
        float wisps=smoothstep(.5,.78,d)*smoothstep(.22,.5,uv.y)*smoothstep(.86,.6,uv.y)*.18;
        float rest=clamp(low+side+wisps,0.,1.);
        float front=1.02-S*.68;
        float rise=smoothstep(front-.02,front+.26,uv.y+(d-.5)*.5);
        float haze=S*(.3+.46*d);
        float a=clamp(max(rest,max(rise*.97,haze)),0.,1.);
        vec3 dayA=vec3(.97,.93,.84),dayB=vec3(.79,.78,.71);
        vec3 nitA=vec3(.40,.45,.57),nitB=vec3(.15,.19,.29);
        vec3 c=mix(mix(dayB,dayA,d*1.15),mix(nitB,nitA,d*1.1),K);
        float porch=exp(-dot((uv-vec2(.72,.74))*vec2(1.7,2.6),(uv-vec2(.72,.74))*vec2(1.7,2.6))*3.2);
        c=mix(c,vec3(.86,.55,.27),K*porch*.42*(1.-S));
        O=vec4(c*a,a);
      }`;

      const compileShader = (type: number, src: string) => {
        const sh = gl.createShader(type);
        if (!sh) return null;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(sh));
        }
        return sh;
      };

      const vShader = compileShader(gl.VERTEX_SHADER, vs);
      const fShader = compileShader(gl.FRAGMENT_SHADER, fs);
      const program = gl.createProgram();
      if (program && vShader && fShader) {
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        for (const name of ['R', 'T', 'S', 'K']) {
          U[name] = gl.getUniformLocation(program, name);
        }
      }
    }

    const updateSize = () => {
      if (!gl) return;
      const w = Math.round(Math.min(window.innerWidth, MAX_FOG_WIDTH));
      const h = Math.round((w * window.innerHeight) / Math.max(1, window.innerWidth));
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    window.addEventListener('resize', updateSize, { passive: true });
    updateSize();

    let rafId = 0;
    const rootStyle = document.documentElement.style;

    const frame = (now: number) => {
      rafId = window.requestAnimationFrame(frame);

      if (document.hidden) return;

      const state = animRef.current;
      state.clock = now;
      const d = now - state.start;
      let y = 0;
      let s = 0;
      let dip = 0;
      let k2 = state.k;

      if (state.animating) {
        if (d < SINK) {
          const x = d / SINK;
          y = x * x * (3 - 2 * x) * DEPTH;
        } else {
          if (!state.swapped) {
            state.swapped = true;
            setMRef.current?.classList.toggle('is-on', state.target === 0);
            setNRef.current?.classList.toggle('is-on', state.target === 1);
          }
          const x = clamp((d - SINK) / RISE);
          y = Math.pow(1 - x, 3.4) * DEPTH;
        }

        s =
          smooth(0, SINK * 0.92, d) *
          (1 - smooth(SINK + 70, SINK + RISE * 0.92, d));
        dip = smooth(30, 190, d) * (1 - smooth(330, 720, d));
        state.k = state.from + (state.target - state.from) * smooth(120, 520, d);
        k2 = state.from + (state.target - state.from) * smooth(340, 760, d);

        if (d >= SINK + RISE) {
          state.animating = false;
          state.k = k2 = state.target;
          y = s = dip = 0;
          state.needsCssSync = true;
          if (state.queued !== null && state.queued !== state.target) {
            const nextQ = state.queued;
            state.queued = null;
            state.target = nextQ;
            state.from = state.k;
            state.start = now;
            state.swapped = false;
            state.animating = true;
          } else {
            state.queued = null;
          }
        }

        rootStyle.setProperty('--sink', `${(y * window.innerHeight).toFixed(1)}px`);
        rootStyle.setProperty('--k', state.k.toFixed(3));
        rootStyle.setProperty('--k2', k2.toFixed(3));
        rootStyle.setProperty('--dip', dip.toFixed(3));
      } else if (state.needsCssSync) {
        state.needsCssSync = false;
        rootStyle.setProperty('--sink', '0px');
        rootStyle.setProperty('--k', state.k.toFixed(3));
        rootStyle.setProperty('--k2', state.k.toFixed(3));
        rootStyle.setProperty('--dip', '0');
      }

      if (gl) {
        if (
          !state.animating &&
          now - state.lastFogRender < IDLE_FRAME_INTERVAL_MS
        ) {
          return;
        }
        state.lastFogRender = now;
        gl.uniform2f(U.R, cv.width, cv.height);
        gl.uniform1f(U.T, now / 1000);
        gl.uniform1f(U.S, s);
        gl.uniform1f(U.K, state.k);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div className="lumen-bg" aria-hidden="true">
      <div className="lumen-layer lumen-sky">
        <img
          alt=""
          src={IMG_SKY_MORNING}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <img
          alt=""
          className="lumen-sky-night"
          src={IMG_SKY_NIGHT}
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="lumen-layer lumen-home">
        <div ref={setMRef} className="lumen-set">
          <div className="lumen-layer lumen-ground">
            <img
              alt=""
              src={IMG_GROUND_MORNING}
              decoding="async"
              fetchPriority="low"
              referrerPolicy="no-referrer"
            />
          </div>
          <img
            className="lumen-cut"
            alt=""
            src={IMG_CUT_MORNING}
            decoding="async"
            fetchPriority="low"
            referrerPolicy="no-referrer"
          />
        </div>

        <div ref={setNRef} className="lumen-set is-on">
          <div className="lumen-layer lumen-ground">
            <img
              alt=""
              src={IMG_GROUND_NIGHT}
              decoding="async"
              fetchPriority="high"
              referrerPolicy="no-referrer"
            />
          </div>
          <img
            className="lumen-cut"
            alt=""
            src={IMG_CUT_NIGHT}
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="lumen-tilt" />
      <canvas ref={canvasRef} className="lumen-fog" />
    </div>
  );
}
