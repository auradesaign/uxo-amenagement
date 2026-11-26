import { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Edit3,
  ExternalLink,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import { ALGERIA_WILAYAS } from '../../data/algeriaWilayas';
import {
  AREA_OPTIONS,
  PROPERTY_TYPES,
  SERVICE_TYPES,
} from '../../data/renovationData';
import type { RenovationFormState } from '../../types/renovation';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from '../../utils/whatsapp';

interface StepConfirmationProps {
  formState: RenovationFormState;
  isSubmitted: boolean;
  onEditStep: (step: number) => void;
  onSubmitOrder: () => void;
  onResetForm: () => void;
}

export function StepConfirmation({
  formState,
  isSubmitted,
  onEditStep,
  onSubmitOrder,
  onResetForm,
}: StepConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const property = PROPERTY_TYPES.find((p) => p.id === formState.propertyType);
  const service = SERVICE_TYPES.find((s) => s.id === formState.serviceType);
  const selectedAreas = AREA_OPTIONS.filter((a) =>
    formState.selectedAreas.includes(a.id)
  );
  const wilaya = ALGERIA_WILAYAS.find(
    (w) => w.code === formState.customer.wilaya
  );

  const whatsappMessage = buildWhatsAppMessage(formState);
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-4 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[#1E1D1B] text-[#FAF8F5] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>

        <p className="text-xs font-medium text-[#8C6D46] mb-2">
          تم تجهيز طلبك بنجاح
          <span className="mx-2 text-[#C8BCAE]" aria-hidden="true">
            ·
          </span>
          <span className="font-latin">Demande prête</span>
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1D1B] mb-3">
          شكراً لك، {formState.customer.fullName}
        </h2>

        <p className="text-sm sm:text-base text-[#5E574F] leading-relaxed mb-8">
          تم إعداد ملخص طلبك الكامل بنجاح. إذا لم تفتح نافذة واتساب تلقائياً،
          اضغط على الزر أدناه لإرسال الرسالة مباشرة إلى فريقنا.
          {formState.details.photos.length > 0 && (
            <span className="block mt-2 text-xs text-[#736A60]">
              ملاحظة: يمكنك إرفاق الصور الـ {formState.details.photos.length}{' '}
              التي اخترتها مباشرة داخل محادثة واتساب.
            </span>
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 py-3 rounded-xl bg-[#1E1D1B] text-[#FAF8F5] text-sm sm:text-base font-medium hover:bg-[#33312D] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B]"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span>فتح محادثة واتساب وإرسال الرسالة</span>
            <ExternalLink className="w-4 h-4 opacity-75" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center justify-center gap-2 min-h-[50px] px-5 py-3 rounded-xl border border-[#D8CEC1] bg-white text-[#1E1D1B] text-sm font-medium hover:bg-[#F2ECE4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B]"
          >
            <Copy className="w-4 h-4" aria-hidden="true" />
            <span>{copied ? 'تم نسخ نص الطلب' : 'نسخ نص الطلب'}</span>
          </button>
        </div>

        <div className="text-right rounded-2xl border border-[#E3DAD0] bg-[#FAF8F5] p-5 mb-6">
          <p className="text-xs font-semibold text-[#736A60] mb-2">
            معاينة الرسالة المُعدّة للإرسال:
          </p>
          <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#1E1D1B] leading-relaxed">
            {whatsappMessage}
          </pre>
        </div>

        <button
          type="button"
          onClick={onResetForm}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2 rounded-xl text-sm font-medium text-[#5E574F] hover:text-[#1E1D1B] hover:bg-[#F2ECE4] transition-colors"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>تقديم طلب جديد</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-medium text-[#8C6D46] mb-1.5">
          المرحلة السادسة والأخيرة
          <span className="mx-2 text-[#C8BCAE]" aria-hidden="true">
            ·
          </span>
          <span className="font-latin">Récapitulatif</span>
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
          مراجعة وتأكيد تفاصيل الطلب
        </h2>
        <p className="text-sm text-[#5E574F] mt-2">
          تأكد من صحة اختياراتك قبل إرسال الطلب، ويمكنك تعديل أي قسم مباشرة.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-[#E3DAD0] bg-white">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-medium text-[#736A60]">
                نوع العقار
              </span>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#8C6D46] hover:text-[#1E1D1B] transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>تعديل</span>
              </button>
            </div>
            <p className="text-base font-bold text-[#1E1D1B]">
              {property?.labelAr}{' '}
              <span className="text-xs font-normal font-latin text-[#736A60]">
                ({property?.labelFr})
              </span>
            </p>
            {property?.id === 'other' && formState.customPropertyNote.trim() && (
              <p className="text-xs text-[#5E574F] mt-1">
                {formState.customPropertyNote}
              </p>
            )}
          </div>

          <div className="p-5 rounded-2xl border border-[#E3DAD0] bg-white">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-medium text-[#736A60]">
                نوع الخدمة
              </span>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#8C6D46] hover:text-[#1E1D1B] transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>تعديل</span>
              </button>
            </div>
            <p className="text-base font-bold text-[#1E1D1B]">
              {service?.labelAr}{' '}
              <span className="text-xs font-normal font-latin text-[#736A60]">
                ({service?.labelFr})
              </span>
            </p>
            {service?.id === 'other' && formState.customServiceNote.trim() && (
              <p className="text-xs text-[#5E574F] mt-1">
                {formState.customServiceNote}
              </p>
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-[#E3DAD0] bg-white">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-medium text-[#736A60]">
              المساحات المختارة ({selectedAreas.length})
            </span>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8C6D46] hover:text-[#1E1D1B] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>تعديل</span>
            </button>
          </div>
          <div className="divide-y divide-[#EDE6DC]">
            {selectedAreas.map((area) => (
              <div
                key={area.id}
                className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-sm"
              >
                <span className="font-semibold text-[#1E1D1B]">
                  {area.labelAr}
                  {area.id === 'other' && formState.customAreaNote.trim()
                    ? ` — ${formState.customAreaNote.trim()}`
                    : ''}
                </span>
                <span className="text-xs font-latin text-[#736A60]">
                  {area.labelFr}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-[#E3DAD0] bg-white">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-medium text-[#736A60]">
              تفاصيل المشروع
            </span>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8C6D46] hover:text-[#1E1D1B] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>تعديل</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-3">
            <div>
              <span className="text-[#736A60]">المساحة التقريبية: </span>
              <span className="font-semibold text-[#1E1D1B] tabular-nums">
                {formState.details.areaSqm} م²
              </span>
            </div>
            <div>
              <span className="text-[#736A60]">تاريخ البدء المتوقع: </span>
              <span className="font-semibold text-[#1E1D1B] tabular-nums">
                {formState.details.startDate}
              </span>
            </div>
          </div>
          <p className="text-sm text-[#5E574F] leading-relaxed">
            {formState.details.description}
          </p>
          {formState.details.photos.length > 0 && (
            <p className="mt-3 text-xs text-[#736A60] tabular-nums">
              الصور المرفقة: {formState.details.photos.length} صور (
              {formState.details.photos.map((p) => p.name).join('، ')})
            </p>
          )}
        </div>

        <div className="p-5 rounded-2xl border border-[#E3DAD0] bg-white">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-medium text-[#736A60]">
              بيانات العميل
            </span>
            <button
              type="button"
              onClick={() => onEditStep(5)}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8C6D46] hover:text-[#1E1D1B] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>تعديل</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-[#736A60]">الاسم الكامل: </span>
              <span className="font-semibold text-[#1E1D1B]">
                {formState.customer.fullName}
              </span>
            </div>
            <div>
              <span className="text-[#736A60]">رقم الهاتف: </span>
              <span
                dir="ltr"
                className="inline-block font-semibold font-latin tabular-nums text-[#1E1D1B]"
              >
                {formState.customer.phone}
              </span>
            </div>
            <div>
              <span className="text-[#736A60]">الولاية: </span>
              <span className="font-semibold text-[#1E1D1B]">
                {wilaya
                  ? `${wilaya.code} - ${wilaya.nameAr} (${wilaya.nameFr})`
                  : formState.customer.wilaya}
              </span>
            </div>
            <div>
              <span className="text-[#736A60]">البلدية: </span>
              <span className="font-semibold text-[#1E1D1B]">
                {formState.customer.municipality}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#E3DAD0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <p className="text-xs text-[#736A60]">
          بالضغط على الزر سيتم توليد رسالة منظمة بكافة التفاصيل وفتح واتساب
          لإرسالها فوراً.
        </p>
        <button
          type="button"
          onClick={onSubmitOrder}
          className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-8 py-3.5 rounded-xl bg-[#1E1D1B] text-[#FAF8F5] text-base font-semibold hover:bg-[#33312D] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B]"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span>إرسال طلبي</span>
        </button>
      </div>
    </div>
  );
}
