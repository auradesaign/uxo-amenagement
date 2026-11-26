import { ArrowLeft } from 'lucide-react';
import type { TimeOfDayMode } from './AtmosphericBackground';

interface HeroSectionProps {
  onStartBooking: () => void;
  sceneMode: TimeOfDayMode;
  onChangeSceneMode: (mode: TimeOfDayMode) => void;
}

export function HeroSection({
  onStartBooking,
  sceneMode,
  onChangeSceneMode,
}: HeroSectionProps) {
  return (
    <section className="pt-10 pb-14 sm:pt-14 sm:pb-20 bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 py-2 sm:py-4 flex flex-col justify-center bg-transparent">
            <p
              style={{ color: 'var(--hero-accent)' }}
              className="text-xs sm:text-sm font-medium mb-3 tracking-wide drop-shadow-[0_1px_8px_rgba(11,20,38,0.28)]"
            >
              التجديد والتهيئة المعمارية في الجزائر
              <span className="mx-2 opacity-60" aria-hidden="true">
                ·
              </span>
              <span className="font-latin">Rénovation &amp; Aménagement</span>
            </p>

            <h1
              style={{ color: 'var(--hero-ink)' }}
              className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.18] text-balance mb-5 drop-shadow-[0_2px_14px_rgba(11,20,38,0.25)]"
            >
              حوّل مساحتك السكنية أو التجارية بتشطيب معماري متقن
            </h1>

            <p
              style={{ color: 'var(--hero-muted)' }}
              className="text-base sm:text-lg leading-relaxed max-w-xl mb-8 drop-shadow-[0_1px_10px_rgba(11,20,38,0.28)]"
            >
              من الترميم والتصليحات الدقيقة إلى التهيئة الداخلية الكاملة. حدد نوع
              العقار والمساحات المطلوبة في دقائق، واحصل على دراسة أولية ومرافقة
              هندسية مخصصة عبر ولايتك.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartBooking}
                style={{
                  backgroundColor: 'var(--cta-bg)',
                  color: 'var(--cta-fg)',
                }}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition-opacity whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>تحديد تفاصيل مشروعك</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#portfolio"
                style={{
                  color: 'var(--hero-ink)',
                  borderColor: 'var(--hero-border)',
                }}
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl border bg-white/10 backdrop-blur-md text-sm sm:text-base font-medium hover:bg-white/20 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                استكشاف أعمالنا
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 min-h-[220px] sm:min-h-[300px] lg:min-h-[420px] flex flex-col justify-end items-center lg:items-end p-2 sm:p-4">
            <div
              className="lumen-toggle w-full max-w-[360px] shadow-[0_12px_32px_rgba(11,20,38,0.28)]"
              role="group"
              aria-label="إضاءة الخلفية"
            >
              <button
                type="button"
                className="lumen-btn-m focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                aria-pressed={sceneMode === 'morning'}
                onClick={() => onChangeSceneMode('morning')}
              >
                <b>الصباح</b>
                <small className="font-latin">Morning Light</small>
              </button>
              <button
                type="button"
                className="lumen-btn-n focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                aria-pressed={sceneMode === 'night'}
                onClick={() => onChangeSceneMode('night')}
              >
                <b>الليل</b>
                <small className="font-latin">Night Dusk</small>
              </button>
            </div>
          </div>
        </div>

        <div
          style={{ borderColor: 'var(--hero-border)' }}
          className="mt-10 pt-8 border-t bg-transparent grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <div>
            <p
              style={{ color: 'var(--hero-ink)' }}
              className="text-2xl sm:text-3xl font-bold tabular-nums drop-shadow-[0_1px_8px_rgba(11,20,38,0.25)]"
            >
              +420
            </p>
            <p
              style={{ color: 'var(--hero-muted)' }}
              className="text-sm mt-1 drop-shadow-[0_1px_6px_rgba(11,20,38,0.25)]"
            >
              مشروع تجديد وتشطيب مكتمل
            </p>
          </div>
          <div>
            <p
              style={{ color: 'var(--hero-ink)' }}
              className="text-2xl sm:text-3xl font-bold tabular-nums drop-shadow-[0_1px_8px_rgba(11,20,38,0.25)]"
            >
              58 ولاية
            </p>
            <p
              style={{ color: 'var(--hero-muted)' }}
              className="text-sm mt-1 drop-shadow-[0_1px_6px_rgba(11,20,38,0.25)]"
            >
              تنسيق هندسي عبر كافة التراب الوطني
            </p>
          </div>
          <div>
            <p
              style={{ color: 'var(--hero-ink)' }}
              className="text-2xl sm:text-3xl font-bold tabular-nums drop-shadow-[0_1px_8px_rgba(11,20,38,0.25)]"
            >
              24 ساعة
            </p>
            <p
              style={{ color: 'var(--hero-muted)' }}
              className="text-sm mt-1 drop-shadow-[0_1px_6px_rgba(11,20,38,0.25)]"
            >
              معدل الاستجابة الأولية للطلبات
            </p>
          </div>
          <div>
            <p
              style={{ color: 'var(--hero-ink)' }}
              className="text-2xl sm:text-3xl font-bold tabular-nums drop-shadow-[0_1px_8px_rgba(11,20,38,0.25)]"
            >
              100%
            </p>
            <p
              style={{ color: 'var(--hero-muted)' }}
              className="text-sm mt-1 drop-shadow-[0_1px_6px_rgba(11,20,38,0.25)]"
            >
              وضوح في التسعير ومراحل التسليم
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
