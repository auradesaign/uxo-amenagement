import {
  Check,
  Hammer,
  Layers,
  PaintRoller,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { SERVICE_TYPES } from '../../data/renovationData';
import type { ServiceTypeId } from '../../types/renovation';

interface StepServiceTypeProps {
  selected: ServiceTypeId | null;
  customNote: string;
  onSelect: (id: ServiceTypeId) => void;
  onCustomNoteChange: (note: string) => void;
  error?: string;
}

const SERVICE_ICONS: Record<ServiceTypeId, typeof Hammer> = {
  renovation: Hammer,
  repair: Wrench,
  interior: Layers,
  finishing: PaintRoller,
  other: Sparkles,
};

export function StepServiceType({
  selected,
  customNote,
  onSelect,
  onCustomNoteChange,
  error,
}: StepServiceTypeProps) {
  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-medium text-[#8C6D46] mb-1.5">
          المرحلة الثانية
          <span className="mx-2 text-[#C8BCAE]" aria-hidden="true">
            ·
          </span>
          <span className="font-latin">Type de prestation</span>
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
          ما نوع الخدمة التي تحتاجها؟
        </h2>
        <p className="text-sm text-[#5E574F] mt-2">
          اختر طبيعة التدخل المطلوب لمشروعك في الوقت الحالي.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="ما نوع الخدمة التي تحتاجها؟"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {SERVICE_TYPES.map((item) => {
          const Icon = SERVICE_ICONS[item.id];
          const isSelected = selected === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(item.id)}
              className={`text-right p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between min-h-[150px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B] ${
                isSelected
                  ? 'border-[#1E1D1B] bg-[#1E1D1B] text-[#FAF8F5] shadow-sm'
                  : 'border-[#E3DAD0] bg-white text-[#1E1D1B] hover:border-[#8C6D46] hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-white/15 text-[#FAF8F5]'
                      : 'bg-[#F2ECE4] text-[#1E1D1B]'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <span
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-white bg-white text-[#1E1D1B]'
                      : 'border-[#D5C9B8] bg-transparent text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <span className="text-lg font-bold">{item.labelAr}</span>
                  <span
                    className={`text-xs font-latin ${
                      isSelected ? 'text-[#D5C9B8]' : 'text-[#736A60]'
                    }`}
                  >
                    {item.labelFr}
                  </span>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isSelected ? 'text-[#DED6CC]' : 'text-[#5E574F]'
                  }`}
                >
                  {item.descriptionAr}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {selected === 'other' && (
        <div className="mt-5 p-4 rounded-xl border border-[#E3DAD0] bg-[#FAF8F5]">
          <label
            htmlFor="custom-service-note"
            className="block text-sm font-medium text-[#1E1D1B] mb-2"
          >
            وضّح الخدمة المطلوبة (اختياري)
          </label>
          <input
            id="custom-service-note"
            type="text"
            value={customNote}
            onChange={(e) => onCustomNoteChange(e.target.value)}
            placeholder="مثال: عزل حراري، تركيب واجهة زجاجية، نجارة مخصصة..."
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#D8CEC1] bg-white text-sm text-[#1E1D1B] placeholder:text-[#9A9084] focus:border-[#1E1D1B] focus:outline-none"
          />
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-[#A3302B]">
          {error}
        </p>
      )}
    </div>
  );
}
