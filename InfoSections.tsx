import { useState } from 'react';
import { BRAND_NAME_AR, BRAND_NAME_FR } from '../config/contact';
import { PORTFOLIO_CASES } from '../data/renovationData';

export function InfoSections() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const workflowSteps = [
    {
      num: '01',
      title: 'تحديد الاحتياجات والمساحات',
      subtitleFr: 'Cahier des charges initial',
      description:
        'اختر نوع العقار والخدمة والغرف المعنية عبر النموذج التفاعلي أعلاه مع إمكانية إضافة المساحة التقريبية والصور.',
    },
    {
      num: '02',
      title: 'معاينة وتقدير تقني شفاف',
      subtitleFr: 'Visite & Devis détaillé',
      description:
        'يتواصل معك فريقنا لترتيب زيارة ميدانية أو دراسة المخططات وتقديم كشف كمي وتقدير مالي واضح حسب المواد المختارة.',
    },
    {
      num: '03',
      title: 'تنفيذ منضبط وتسليم مضمون',
      subtitleFr: 'Exécution & Finition',
      description:
        'تنفيذ الأشغال عبر فرق متخصصة في السباكة، الكهرباء، الجبس، البلاط والطلاء مع متابعة مستمرة حتى استلام المفاتيح.',
    },
  ];

  return (
    <>
      <section
        id="how-it-works"
        className="py-16 sm:py-20 border-t bg-transparent"
        style={{ borderColor: 'var(--hero-border)' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p
              style={{ color: 'var(--hero-accent)' }}
              className="text-xs sm:text-sm font-medium mb-2"
            >
              منهجية العمل
              <span className="mx-2 opacity-60" aria-hidden="true">
                ·
              </span>
              <span className="font-latin">Notre Approche</span>
            </p>
            <h2
              style={{ color: 'var(--hero-ink)' }}
              className="text-2xl sm:text-3xl font-bold text-balance drop-shadow-[0_1px_10px_rgba(11,20,38,0.22)]"
            >
              ثلاث مراحل واضحة من الطلب الأولي حتى التسليم النهائي
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {workflowSteps.map((item) => (
              <div
                key={item.num}
                className="p-7 rounded-2xl border border-[#E3DAD0] bg-[#FAF8F5] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <span className="text-3xl font-bold text-[#8C6D46] font-latin tabular-nums">
                      {item.num}
                    </span>
                    <span className="text-xs text-[#736A60] font-latin">
                      {item.subtitleFr}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1E1D1B] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5E574F] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="py-16 sm:py-20 border-t bg-transparent"
        style={{ borderColor: 'var(--hero-border)' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p
                style={{ color: 'var(--hero-accent)' }}
                className="text-xs sm:text-sm font-medium mb-2"
              >
                مشاريع منجزة
                <span className="mx-2 opacity-60" aria-hidden="true">
                  ·
                </span>
                <span className="font-latin">Réalisations Récentes</span>
              </p>
              <h2
                style={{ color: 'var(--hero-ink)' }}
                className="text-2xl sm:text-3xl font-bold text-balance drop-shadow-[0_1px_10px_rgba(11,20,38,0.22)]"
              >
                نماذج من أعمال التجديد والتهيئة في الجزائر
              </h2>
            </div>
            <a
              href="#booking-wizard"
              style={{ color: 'var(--hero-ink)' }}
              className="text-sm font-semibold underline underline-offset-8 hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
            >
              اطلب مشروعاً مماثلاً
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PORTFOLIO_CASES.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-[#E3DAD0] bg-white overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#EAE2D7] overflow-hidden">
                  {!failedImages[project.id] ? (
                    <img
                      src={project.image}
                      alt={project.titleAr}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [project.id]: true,
                        }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6 text-sm text-[#736A60]">
                      {project.titleAr}
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#736A60] mb-2">
                      <span>{project.locationAr}</span>
                      <span className="mx-2 text-[#C8BCAE]" aria-hidden="true">
                        ·
                      </span>
                      <span>{project.categoryAr}</span>
                    </p>
                    <h3 className="text-lg font-bold text-[#1E1D1B] mb-2">
                      {project.titleAr}
                    </h3>
                    <p className="text-sm text-[#5E574F] leading-relaxed mb-5">
                      {project.summaryAr}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EDE6DC] flex items-center justify-between text-xs text-[#5E574F] tabular-nums">
                    <span>المساحة: {project.areaMetric}</span>
                    <span>المدة: {project.durationMetric}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="footer-contact"
        className="border-t border-[#E3DAD0]/40 bg-[#1E1D1B]/[0.96] text-[#FAF8F5] py-12"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/15">
            <div>
              <p className="text-xl font-bold mb-1">
                {BRAND_NAME_AR}
                <span className="mx-2 text-white/30" aria-hidden="true">
                  ·
                </span>
                <span className="font-latin text-base font-medium text-[#D5C9B8]">
                  {BRAND_NAME_FR}
                </span>
              </p>
              <p className="text-sm text-[#BFB7AC] max-w-md">
                خدمات التجديد، الترميم، التهيئة الداخلية والتشطيب للمنازل
                والشقق والمحلات التجارية في جميع ولايات الجزائر الـ 58.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#D5C9B8]">
              <a href="#booking-wizard" className="hover:text-white transition-colors">
                نموذج الطلب
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                آلية العمل
              </a>
              <a href="#portfolio" className="hover:text-white transition-colors">
                نماذج الأعمال
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9A9084]">
            <p>© {new Date().getFullYear()} {BRAND_NAME_AR}. جميع الحقوق محفوظة.</p>
            <p className="font-latin">Algérie · 58 Wilayas</p>
          </div>
        </div>
      </footer>
    </>
  );
}
