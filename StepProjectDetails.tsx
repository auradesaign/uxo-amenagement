import { useRef } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import type { ProjectDetails, UploadedPhoto } from '../../types/renovation';

interface StepProjectDetailsProps {
  details: ProjectDetails;
  onChange: (next: ProjectDetails) => void;
  errors: {
    description?: string;
    areaSqm?: string;
    startDate?: string;
  };
}

export function StepProjectDetails({
  details,
  onChange,
  errors,
}: StepProjectDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const added: UploadedPhoto[] = [];
    const remainingSlots = Math.max(0, 6 - details.photos.length);

    Array.from(files)
      .slice(0, remainingSlots)
      .forEach((file) => {
        if (!file.type.startsWith('image/')) return;
        const sizeKb = Math.round(file.size / 1024);
        const sizeLabel =
          sizeKb >= 1024
            ? `${(sizeKb / 1024).toFixed(1)} MB`
            : `${Math.max(1, sizeKb)} KB`;

        added.push({
          id: `${file.name}-${file.lastModified}-${Math.random()
            .toString(36)
            .slice(2, 7)}`,
          name: file.name,
          sizeLabel,
          previewUrl: URL.createObjectURL(file),
        });
      });

    if (added.length > 0) {
      onChange({
        ...details,
        photos: [...details.photos, ...added],
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (photoId: string) => {
    const target = details.photos.find((p) => p.id === photoId);
    if (target) {
      URL.revokeObjectURL(target.previewUrl);
    }
    onChange({
      ...details,
      photos: details.photos.filter((p) => p.id !== photoId),
    });
  };

  const todayIso = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-medium text-[#8C6D46] mb-1.5">
          المرحلة الرابعة
          <span className="mx-2 text-[#C8BCAE]" aria-hidden="true">
            ·
          </span>
          <span className="font-latin">Détails du projet</span>
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
          تفاصيل المشروع والمواصفات الأولية
        </h2>
        <p className="text-sm text-[#5E574F] mt-2">
          زودنا بوصف مختصر للأشغال، المساحة التقريبية، وموعد الانطلاق المناسب لك.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="area-sqm"
              className="block text-sm font-semibold text-[#1E1D1B] mb-2"
            >
              المساحة التقريبية (م²) <span className="text-[#A3302B]">*</span>
            </label>
            <div className="relative">
              <input
                id="area-sqm"
                type="number"
                min={1}
                max={50000}
                inputMode="numeric"
                value={details.areaSqm}
                onChange={(e) =>
                  onChange({ ...details, areaSqm: e.target.value })
                }
                placeholder="مثال: 120"
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-white text-sm text-[#1E1D1B] tabular-nums placeholder:text-[#9A9084] focus:outline-none ${
                  errors.areaSqm
                    ? 'border-[#A3302B]'
                    : 'border-[#D8CEC1] focus:border-[#1E1D1B]'
                }`}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#736A60] pointer-events-none">
                م² / <span className="font-latin">m²</span>
              </span>
            </div>
            {errors.areaSqm && (
              <p role="alert" className="mt-1.5 text-xs font-medium text-[#A3302B]">
                {errors.areaSqm}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-semibold text-[#1E1D1B] mb-2"
            >
              تاريخ البدء المتوقع <span className="text-[#A3302B]">*</span>
            </label>
            <input
              id="start-date"
              type="date"
              min={todayIso}
              value={details.startDate}
              onChange={(e) =>
                onChange({ ...details, startDate: e.target.value })
              }
              className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-white text-sm text-[#1E1D1B] tabular-nums focus:outline-none ${
                errors.startDate
                  ? 'border-[#A3302B]'
                  : 'border-[#D8CEC1] focus:border-[#1E1D1B]'
              }`}
            />
            {errors.startDate && (
              <p role="alert" className="mt-1.5 text-xs font-medium text-[#A3302B]">
                {errors.startDate}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="project-description"
            className="block text-sm font-semibold text-[#1E1D1B] mb-2"
          >
            وصف المشروع والأشغال المطلوبة{' '}
            <span className="text-[#A3302B]">*</span>
          </label>
          <textarea
            id="project-description"
            rows={4}
            value={details.description}
            onChange={(e) =>
              onChange({ ...details, description: e.target.value })
            }
            placeholder="اشرح باختصار الحالة الحالية للمكان، النمط المفضل لديك، أو أي تفاصيل تقنية (مثل تبديل السباكة، إضافة جبس معلق، تغيير الأرضية...)"
            className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#1E1D1B] leading-relaxed placeholder:text-[#9A9084] focus:outline-none ${
              errors.description
                ? 'border-[#A3302B]'
                : 'border-[#D8CEC1] focus:border-[#1E1D1B]'
            }`}
          />
          {errors.description && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-[#A3302B]">
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <label
              htmlFor="project-photos"
              className="block text-sm font-semibold text-[#1E1D1B]"
            >
              إرفاق صور للمكان (اختياري)
            </label>
            <span className="text-xs text-[#736A60] tabular-nums">
              {details.photos.length} / 6 صور
            </span>
          </div>

          <div className="rounded-2xl border border-dashed border-[#CBBFAD] bg-[#FAF8F5] p-5 text-center">
            <input
              ref={fileInputRef}
              id="project-photos"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFilesSelected(e.target.files)}
              className="sr-only"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={details.photos.length >= 6}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl border border-[#D8CEC1] bg-white text-sm font-medium text-[#1E1D1B] hover:bg-[#F2ECE4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B]"
            >
              <ImagePlus className="w-4 h-4 text-[#8C6D46]" aria-hidden="true" />
              <span>اختيار صور من جهازك</span>
            </button>
            <p className="text-xs text-[#736A60] mt-2.5">
              يمكنك إرفاق صور المساحات الحالية لمساعدتنا على فهم الحالة بدقة، وستُرفق
              أسماؤها في ملخص الطلب لتتمكن من إرسالها مباشرة عبر واتساب.
            </p>
          </div>

          {details.photos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {details.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative rounded-xl border border-[#E3DAD0] bg-white overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-[#EAE2D7]">
                    <img
                      src={photo.previewUrl}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#1E1D1B] truncate">
                        {photo.name}
                      </p>
                      <p className="text-[11px] text-[#736A60] font-latin tabular-nums">
                        {photo.sizeLabel}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo.id)}
                      aria-label={`حذف صورة ${photo.name}`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#736A60] hover:text-[#A3302B] hover:bg-[#FAF8F5] transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
