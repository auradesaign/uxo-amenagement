import { ALGERIA_WILAYAS } from '../../data/algeriaWilayas';
import type { CustomerInfo } from '../../types/renovation';

interface StepCustomerInfoProps {
  customer: CustomerInfo;
  onChange: (next: CustomerInfo) => void;
  errors: {
    fullName?: string;
    phone?: string;
    wilaya?: string;
    municipality?: string;
  };
}

export function StepCustomerInfo({
  customer,
  onChange,
  errors,
}: StepCustomerInfoProps) {
  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-medium text-[#8C6D46] mb-1.5">
          المرحلة الخامسة
          <span className="mx-2 text-[#C8BCAE]" aria-hidden="true">
            ·
          </span>
          <span className="font-latin">Coordonnées du client</span>
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
          معلومات التواصل والموقع الجغرافي
        </h2>
        <p className="text-sm text-[#5E574F] mt-2">
          أدخل بياناتك ليتمكن فريقنا المختص في ولايتك من التواصل معك وتأكيد الموعد.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="customer-full-name"
            className="block text-sm font-semibold text-[#1E1D1B] mb-2"
          >
            الاسم الكامل <span className="text-[#A3302B]">*</span>
          </label>
          <input
            id="customer-full-name"
            type="text"
            autoComplete="name"
            value={customer.fullName}
            onChange={(e) =>
              onChange({ ...customer, fullName: e.target.value })
            }
            placeholder="مثال: أمين بن علي"
            className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-white text-sm text-[#1E1D1B] placeholder:text-[#9A9084] focus:outline-none ${
              errors.fullName
                ? 'border-[#A3302B]'
                : 'border-[#D8CEC1] focus:border-[#1E1D1B]'
            }`}
          />
          {errors.fullName && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-[#A3302B]">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="customer-phone"
            className="block text-sm font-semibold text-[#1E1D1B] mb-2"
          >
            رقم الهاتف <span className="text-[#A3302B]">*</span>
          </label>
          <input
            id="customer-phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            inputMode="tel"
            value={customer.phone}
            onChange={(e) => onChange({ ...customer, phone: e.target.value })}
            placeholder="0550 12 34 56"
            className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-white text-sm text-right font-latin tabular-nums text-[#1E1D1B] placeholder:text-[#9A9084] focus:outline-none ${
              errors.phone
                ? 'border-[#A3302B]'
                : 'border-[#D8CEC1] focus:border-[#1E1D1B]'
            }`}
          />
          {errors.phone && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-[#A3302B]">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="customer-wilaya"
            className="block text-sm font-semibold text-[#1E1D1B] mb-2"
          >
            الولاية (<span className="font-latin">Wilaya</span>){' '}
            <span className="text-[#A3302B]">*</span>
          </label>
          <select
            id="customer-wilaya"
            value={customer.wilaya}
            onChange={(e) => onChange({ ...customer, wilaya: e.target.value })}
            className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-white text-sm text-[#1E1D1B] focus:outline-none ${
              errors.wilaya
                ? 'border-[#A3302B]'
                : 'border-[#D8CEC1] focus:border-[#1E1D1B]'
            }`}
          >
            <option value="">اختر الولاية...</option>
            {ALGERIA_WILAYAS.map((w) => (
              <option key={w.code} value={w.code}>
                {w.code} - {w.nameAr} ({w.nameFr})
              </option>
            ))}
          </select>
          {errors.wilaya && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-[#A3302B]">
              {errors.wilaya}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="customer-municipality"
            className="block text-sm font-semibold text-[#1E1D1B] mb-2"
          >
            البلدية (<span className="font-latin">Commune</span>){' '}
            <span className="text-[#A3302B]">*</span>
          </label>
          <input
            id="customer-municipality"
            type="text"
            value={customer.municipality}
            onChange={(e) =>
              onChange({ ...customer, municipality: e.target.value })
            }
            placeholder="مثال: حيدرة، بئر الجير، الخروب..."
            className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-white text-sm text-[#1E1D1B] placeholder:text-[#9A9084] focus:outline-none ${
              errors.municipality
                ? 'border-[#A3302B]'
                : 'border-[#D8CEC1] focus:border-[#1E1D1B]'
            }`}
          />
          {errors.municipality && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-[#A3302B]">
              {errors.municipality}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
