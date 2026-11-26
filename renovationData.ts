import heroArchitectureImg from '../assets/images/hero_architecture_1795689861203.jpg';
import areaBathroomImg from '../assets/images/area_bathroom_1795689861222.jpg';
import areaSalonImg from '../assets/images/area_salon_1795689861493.jpg';
import areaKitchenImg from '../assets/images/area_kitchen_1795689861834.jpg';
import areaBedroomImg from '../assets/images/area_bedroom_1795689862296.jpg';
import areaFacadeImg from '../assets/images/area_facade_1795689863029.jpg';
import areaFlooringImg from '../assets/images/area_flooring_1795689863653.jpg';
import areaWallsPaintImg from '../assets/images/area_walls_paint_1795689863761.jpg';
import areaCeilingImg from '../assets/images/area_ceiling_1795689863274.jpg';

import type {
  AreaOption,
  PropertyTypeId,
  SelectableOption,
  ServiceTypeId,
} from '../types/renovation';

export const HERO_IMAGE = heroArchitectureImg;

export const PROPERTY_TYPES: SelectableOption<PropertyTypeId>[] = [
  {
    id: 'house',
    labelAr: 'منزل',
    labelFr: 'Maison',
    descriptionAr: 'منزل عائلي مستقل أو متعدد الطوابق يحتاج إلى تجديد أو تحسين.',
  },
  {
    id: 'commercial',
    labelAr: 'محل تجاري',
    labelFr: 'Local commercial',
    descriptionAr: 'مساحة تجارية، مكتب، عيادة أو صالة عرض بتشطيب احترافي.',
  },
  {
    id: 'apartment',
    labelAr: 'شقة',
    labelFr: 'Appartement',
    descriptionAr: 'شقة سكنية داخل عمارة مع مراعاة استغلال المساحات والهدوء.',
  },
  {
    id: 'villa',
    labelAr: 'فيلا',
    labelFr: 'Villa',
    descriptionAr: 'تأهيل شامل للواجهات، الحدائق والمساحات الداخلية الواسعة.',
  },
  {
    id: 'other',
    labelAr: 'أخرى',
    labelFr: 'Autre',
    descriptionAr: 'مشروع عقاري خاص، مبنى إداري، استوديو أو مساحة مخصصة.',
  },
];

export const SERVICE_TYPES: SelectableOption<ServiceTypeId>[] = [
  {
    id: 'renovation',
    labelAr: 'تجديد',
    labelFr: 'Rénovation',
    descriptionAr: 'إعادة تأهيل وتحديث شامل للشبكات، الأرضيات، الجدران والتجهيزات.',
  },
  {
    id: 'repair',
    labelAr: 'ترميم',
    labelFr: 'Réparation',
    descriptionAr: 'معالجة التسربات، الرطوبة، التشققات الإنشائية وأعطاب السباكة والكهرباء.',
  },
  {
    id: 'interior',
    labelAr: 'تهيئة داخلية',
    labelFr: 'Aménagement intérieur',
    descriptionAr: 'إعادة توزيع الغرف، الأسقف المعلقة، الخزائن المدمجة والإضاءة المعمارية.',
  },
  {
    id: 'finishing',
    labelAr: 'تشطيب',
    labelFr: 'Finition',
    descriptionAr: 'الأعمال النهائية للمباني الجديدة: السيراميك، الطلاء، النجارة والواجهة.',
  },
  {
    id: 'other',
    labelAr: 'أخرى',
    labelFr: 'Autre',
    descriptionAr: 'خدمة متخصصة أو تدخل تقني حسب طبيعة وحالة العقار.',
  },
];

export const AREA_OPTIONS: AreaOption[] = [
  {
    id: 'bathroom',
    labelAr: 'الحمام / الدوش',
    labelFr: 'Salle de bain / Douche',
    subtitleAr: 'عزل مائي، ترصيص وتجهيزات عصرية',
    image: areaBathroomImg,
  },
  {
    id: 'salon',
    labelAr: 'الصالون',
    labelFr: 'Salon',
    subtitleAr: 'تصميم راقٍ وإضاءة مدمجة متوازنة',
    image: areaSalonImg,
  },
  {
    id: 'kitchen',
    labelAr: 'المطبخ',
    labelFr: 'Cuisine',
    subtitleAr: 'خزائن عملية وأسطح مقاومة للحرارة',
    image: areaKitchenImg,
  },
  {
    id: 'bedroom',
    labelAr: 'غرفة النوم',
    labelFr: 'Chambre',
    subtitleAr: 'عزل صوتي، دهانات هادئة وأرضيات دافئة',
    image: areaBedroomImg,
  },
  {
    id: 'facade',
    labelAr: 'الواجهة الخارجية',
    labelFr: 'Façade',
    subtitleAr: 'تلبيس حجري، دهان خارجي وواجهات زجاجية',
    image: areaFacadeImg,
  },
  {
    id: 'flooring',
    labelAr: 'الأرضيات',
    labelFr: 'Sols',
    subtitleAr: 'بورسلان، رخام، باركيه وتقويم المستويات',
    image: areaFlooringImg,
  },
  {
    id: 'walls',
    labelAr: 'الجدران والطلاء',
    labelFr: 'Murs et peinture',
    subtitleAr: 'تجهيز الأسطح، طلاء معدني وديكورات جدارية',
    image: areaWallsPaintImg,
  },
  {
    id: 'ceiling',
    labelAr: 'السقف',
    labelFr: 'Plafond',
    subtitleAr: 'أسقف جبسية BA13 وإنارة خطية مخفية',
    image: areaCeilingImg,
  },
  {
    id: 'other',
    labelAr: 'أخرى',
    labelFr: 'Autre',
    subtitleAr: 'شرفة، درج، مدخل أو مساحة مخصصة أخرى',
  },
];

export const PORTFOLIO_CASES = [
  {
    id: 'hydra-villa',
    titleAr: 'تجديد شامل لفيلا سكنية بحيدرة',
    locationAr: 'الجزائر العاصمة',
    categoryAr: 'تجديد وتهيئة داخلية',
    areaMetric: '340 م²',
    durationMetric: '11 أسبوعاً',
    image: heroArchitectureImg,
    summaryAr:
      'إعادة توزيع المساحات الأرضية، تركيب واجهات ألمنيوم عازلة للحرارة وتلبيس الجدران بحجر الترافرتين الطبيعي.',
  },
  {
    id: 'oran-boutique',
    titleAr: 'تهيئة وتشطيب صالة عرض تجارية',
    locationAr: 'وهران',
    categoryAr: 'محل تجاري · تشطيب',
    areaMetric: '165 م²',
    durationMetric: '6 أسابيع',
    image: areaSalonImg,
    summaryAr:
      'أعمال الأسقف الجبسية مع إضاءة معمارية موجهة، أرضيات بورسلان مقاس كبير ودهان معدني مقاوم للاحتكاك.',
  },
  {
    id: 'constantine-kitchen',
    titleAr: 'تحديث مطبخ وحمامات شقة عائلية',
    locationAr: 'قسنطينة',
    categoryAr: 'شقة · تجديد جزئي',
    areaMetric: '85 م²',
    durationMetric: '4 أسابيع',
    image: areaKitchenImg,
    summaryAr:
      'تبديل كامل لشبكة الترصيص الصحي، تركيب مطبخ مفتوح بخشب البلوط والسطح الحجري مع حمام عصري بدوش إيطالي.',
  },
];
