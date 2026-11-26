import {
  Building2,
  Check,
  Home,
  Landmark,
  PlusSquare,
  Store,
} from 'lucide-react';
import { PROPERTY_TYPES } from '../../data/renovationData';
import type { PropertyTypeId } from '../../types/renovation';

interface StepPropertyTypeProps {
  selected: PropertyTypeId | null;
  customNote: string;
  onSelect: (id: PropertyTypeId) => void;
  onCustomNoteChange: (note: string) => void;
  error?: string;
}

const PROPERTY_ICONS: Record<PropertyTypeId, typeof Home> = {
  house: Home,
  commercial: Store,
  apartment: Building2,
  villa: Landmark,
  other: PlusSquare,
};

export function StepPropertyType({
  selected,
  customNote,
  onSelect,
  onCustomNoteChange,
  error,
}: StepPropertyTypeProps) {
  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-medium text-[#8C6D46] mb-1.5">
          المرحلة الأولى
          <span className="mx-2 text-[#C8BCAE]" aria-hidden="true">
            ·
          </span>
          <span className="font-latin">Type de bien</span>
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
          ما نوع المكان الذي تريد تجديده؟
        </h2>
        <p className="text-sm text-[#5E574F] mt-2">
          اختر طبيعة العقار لنتمكن من تكييف الدراسة التقنية والفريق المختص.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="ما نوع المكان الذي تريد تجديده؟"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {PROPERTY_TYPES.map((item) => {
          const Icon = PROPERTY_ICONS[item.id];
          const isSelected = selected === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(item.id)}
              className={`group relative text-right p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between min-h-[144px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B] ${
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
            htmlFor="custom-property-note"
            className="block text-sm font-medium text-[#1E1D1B] mb-2"
          >
            حدد نوع المكان (اختياري)
          </label>
          <input
            id="custom-property-note"
            type="text"
            value={customNote}
            onChange={(e) => onCustomNoteChange(e.target.value)}
            placeholder="مثال: عيادة طبية، مخزن، مطعم، مكتب..."
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
