import { WHATSAPP_BUSINESS_NUMBER } from '../config/contact';
import { ALGERIA_WILAYAS } from '../data/algeriaWilayas';
import {
  AREA_OPTIONS,
  PROPERTY_TYPES,
  SERVICE_TYPES,
} from '../data/renovationData';
import type { RenovationFormState } from '../types/renovation';

export function isValidAlgerianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().]/g, '');
  return /^(0[567]\d{8}|(\+?213)[567]\d{8}|0[234]\d{7})$/.test(cleaned);
}

export function buildWhatsAppMessage(state: RenovationFormState): string {
  const property = PROPERTY_TYPES.find((p) => p.id === state.propertyType);
  const service = SERVICE_TYPES.find((s) => s.id === state.serviceType);
  const areas = AREA_OPTIONS.filter((a) => state.selectedAreas.includes(a.id));
  const wilaya = ALGERIA_WILAYAS.find((w) => w.code === state.customer.wilaya);

  const propertyLabel = property
    ? `${property.labelAr} (${property.labelFr})${
        property.id === 'other' && state.customPropertyNote.trim()
          ? ` — ${state.customPropertyNote.trim()}`
          : ''
      }`
    : 'غير محدد';

  const serviceLabel = service
    ? `${service.labelAr} (${service.labelFr})${
        service.id === 'other' && state.customServiceNote.trim()
          ? ` — ${state.customServiceNote.trim()}`
          : ''
      }`
    : 'غير محدد';

  const areasLines =
    areas.length > 0
      ? areas
          .map((a) => {
            if (a.id === 'other' && state.customAreaNote.trim()) {
              return `• ${a.labelAr} (${a.labelFr}): ${state.customAreaNote.trim()}`;
            }
            return `• ${a.labelAr} (${a.labelFr})`;
          })
          .join('\n')
      : '• غير محدد';

  const wilayaLabel = wilaya
    ? `${wilaya.code} - ${wilaya.nameAr} (${wilaya.nameFr})`
    : state.customer.wilaya;

  const photosNote =
    state.details.photos.length > 0
      ? `نعم (${state.details.photos.length} صور جاهزة للإرفاق في المحادثة: ${state.details.photos
          .map((p) => p.name)
          .join('، ')})`
      : 'لا توجد صور مرفقة';

  const lines = [
    'السلام عليكم، أرغب في طلب خدمة تجديد / تهيئة عبر منصة مِعمار:',
    '',
    '— تفاصيل العقار والخدمة —',
    `نوع المكان: ${propertyLabel}`,
    `نوع الخدمة: ${serviceLabel}`,
    '',
    '— المساحات المختارة للعمل —',
    areasLines,
    '',
    '— مواصفات المشروع —',
    `المساحة التقريبية: ${state.details.areaSqm ? `${state.details.areaSqm} م²` : 'غير محددة'}`,
    `تاريخ البدء المتوقع: ${state.details.startDate || 'غير محدد'}`,
    `وصف المشروع: ${state.details.description.trim() || 'لم يضف وصف إضافي'}`,
    `الصور المرفقة: ${photosNote}`,
    '',
    '— معلومات التواصل والموقع —',
    `الاسم الكامل: ${state.customer.fullName.trim()}`,
    `رقم الهاتف: ${state.customer.phone.trim()}`,
    `الولاية: ${wilayaLabel}`,
    `البلدية: ${state.customer.municipality.trim()}`,
  ];

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  const sanitizedNumber = WHATSAPP_BUSINESS_NUMBER.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);
  if (!sanitizedNumber || sanitizedNumber.includes('X')) {
    return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
  }
  return `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;
}
