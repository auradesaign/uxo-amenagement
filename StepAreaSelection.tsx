import { useState } from 'react';
import { Check, Compass } from 'lucide-react';
import { AREA_OPTIONS } from '../../data/renovationData';
import type { AreaId } from '../../types/renovation';

interface StepAreaSelectionProps {
  selectedAreas: AreaId[];
  customAreaNote: string;
  onToggleArea: (id: AreaId) => void;
  onCustomAreaNoteChange: (note: string) => void;
  error?: string;
}

export function StepAreaSelection({
  selectedAreas,
  customAreaNote,
  onToggleArea,
  onCustomAreaNoteChange,
  error,
}: StepAreaSelectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const hasOtherSelected = selectedAreas.includes('other');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
        <div>
          <p className="text-xs font-medium text-[#8C6D46] mb-1.5">
            المرحلة الثالثة
            <span className="mx-2 text-[#C8BCAE]" aria-hidden="true">
              ·
            </span>
            <span className="font-latin">Espaces à rénover</span>
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
            ما المكان الذي تريد العمل عليه؟
          </h2>
          <p className="text-sm text-[#5E574F] mt-2">
            يمكنك اختيار مساحة واحدة أو عدة مساحات معاً في نفس الطلب.
          </p>
        </div>

        <div className="text-sm font-medium text-[#5E574F] tabular-nums shrink-0">
          المختارة:{' '}
          <span className="text-[#1E1D1B] font-bold">
            {selectedAreas.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {AREA_OPTIONS.map((area) => {
          const isSelected = selectedAreas.includes(area.id);
          const showFallback = !area.image || failedImages[area.id];

          return (
            <button
              key={area.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onToggleArea(area.id)}
              className={`group relative text-right rounded-2xl border overflow-hidden transition-all duration-200 flex flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B] ${
                isSelected
                  ? 'border-[#1E1D1B] ring-2 ring-[#1E1D1B] bg-[#1E1D1B] text-[#FAF8F5]'
                  : 'border-[#E3DAD0] bg-white text-[#1E1D1B] hover:border-[#8C6D46]'
              }`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE2D7]">
                {!showFallback ? (
                  <img
                    src={area.image}
                    alt={`${area.labelAr} - ${area.labelFr}`}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [area.id]: true }))
                    }
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F2ECE4] to-[#E2D6C5] text-[#5E574F]">
                    <Compass
                      className="w-9 h-9 mb-2 text-[#8C6D46]"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium font-latin">
                      {area.labelFr}
                    </span>
                  </div>
                )}

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                <span
                  className={`absolute top-3 left-3 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-white bg-[#1E1D1B] text-white'
                      : 'border-white/80 bg-black/30 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="text-base font-bold">{area.labelAr}</span>
                  <span
                    className={`text-xs font-latin ${
                      isSelected ? 'text-[#D5C9B8]' : 'text-[#736A60]'
                    }`}
                  >
                    {area.labelFr}
                  </span>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isSelected ? 'text-[#DED6CC]' : 'text-[#5E574F]'
                  }`}
                >
                  {area.subtitleAr}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {hasOtherSelected && (
        <div className="mt-5 p-4 rounded-xl border border-[#E3DAD0] bg-[#FAF8F5]">
          <label
            htmlFor="custom-area-note"
            className="block text-sm font-medium text-[#1E1D1B] mb-2"
          >
            اذكر المساحة الإضافية المطلوبة (اختياري)
          </label>
          <input
            id="custom-area-note"
            type="text"
            value={customAreaNote}
            onChange={(e) => onCustomAreaNoteChange(e.target.value)}
            placeholder="مثال: الشرفة (Balcon)، السطح، الدرج، الحديقة..."
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
