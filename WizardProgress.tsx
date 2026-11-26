import { Check } from 'lucide-react';

export interface WizardStepMeta {
  step: number;
  titleAr: string;
  shortLabelAr: string;
}

export const WIZARD_STEPS: WizardStepMeta[] = [
  { step: 1, titleAr: 'نوع العقار', shortLabelAr: 'العقار' },
  { step: 2, titleAr: 'نوع الخدمة', shortLabelAr: 'الخدمة' },
  { step: 3, titleAr: 'المساحات المطلوبة', shortLabelAr: 'المساحات' },
  { step: 4, titleAr: 'تفاصيل المشروع', shortLabelAr: 'التفاصيل' },
  { step: 5, titleAr: 'معلومات العميل', shortLabelAr: 'المعلومات' },
  { step: 6, titleAr: 'ملخص وتأكيد الطلب', shortLabelAr: 'التأكيد' },
];

interface WizardProgressProps {
  currentStep: number;
  maxReachedStep: number;
  onJumpToStep: (step: number) => void;
}

export function WizardProgress({
  currentStep,
  maxReachedStep,
  onJumpToStep,
}: WizardProgressProps) {
  const progressPercent = Math.round(
    ((currentStep - 1) / (WIZARD_STEPS.length - 1)) * 100
  );

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="text-sm text-[#5E574F]">
          <span className="font-semibold text-[#1E1D1B] tabular-nums">
            الخطوة {currentStep} من {WIZARD_STEPS.length}
          </span>
          <span className="mx-2 text-[#C8BCAE]" aria-hidden="true">
            ·
          </span>
          <span>{WIZARD_STEPS[currentStep - 1]?.titleAr}</span>
        </div>
        <span className="text-xs font-medium text-[#736A60] tabular-nums">
          {progressPercent}% مكتمل
        </span>
      </div>

      <div
        className="w-full h-1.5 bg-[#EAE2D7] rounded-full overflow-hidden mb-5"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="تقدم مراحل الطلب"
      >
        <div
          className="h-full bg-[#1E1D1B] transition-all duration-300 ease-out"
          style={{ width: `${Math.max(8, progressPercent)}%` }}
        />
      </div>

      <nav aria-label="خطوات النموذج" className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {WIZARD_STEPS.map((item) => {
          const isCurrent = item.step === currentStep;
          const isCompleted = item.step < currentStep;
          const isClickable = item.step <= maxReachedStep && item.step !== currentStep;

          return (
            <button
              key={item.step}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onJumpToStep(item.step)}
              aria-current={isCurrent ? 'step' : undefined}
              className={`flex items-center justify-center sm:justify-start gap-2 min-h-[42px] px-3 py-2 rounded-xl border text-xs font-medium transition-colors whitespace-nowrap ${
                isCurrent
                  ? 'border-[#1E1D1B] bg-[#1E1D1B] text-[#FAF8F5]'
                  : isCompleted
                    ? 'border-[#D5C9B8] bg-[#F2ECE4] text-[#1E1D1B] hover:border-[#8C6D46] cursor-pointer'
                    : isClickable
                      ? 'border-[#E3DAD0] bg-white text-[#1E1D1B] hover:bg-[#FAF8F5] cursor-pointer'
                      : 'border-[#EDE6DC] bg-[#FAF8F5] text-[#9A9084] cursor-not-allowed'
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B]`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold tabular-nums shrink-0 ${
                  isCurrent
                    ? 'bg-white/20 text-white'
                    : isCompleted
                      ? 'bg-[#1E1D1B] text-white'
                      : 'bg-[#EAE2D7] text-[#5E574F]'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3" aria-hidden="true" />
                ) : (
                  item.step
                )}
              </span>
              <span className="truncate">{item.shortLabelAr}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
