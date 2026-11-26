import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { AreaId, RenovationFormState } from '../types/renovation';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  isValidAlgerianPhone,
} from '../utils/whatsapp';
import { WizardProgress } from './WizardProgress';
import { StepAreaSelection } from './steps/StepAreaSelection';
import { StepConfirmation } from './steps/StepConfirmation';
import { StepCustomerInfo } from './steps/StepCustomerInfo';
import { StepProjectDetails } from './steps/StepProjectDetails';
import { StepPropertyType } from './steps/StepPropertyType';
import { StepServiceType } from './steps/StepServiceType';

const INITIAL_FORM_STATE: RenovationFormState = {
  propertyType: null,
  customPropertyNote: '',
  serviceType: null,
  customServiceNote: '',
  selectedAreas: [],
  customAreaNote: '',
  details: {
    description: '',
    areaSqm: '',
    startDate: '',
    photos: [],
  },
  customer: {
    fullName: '',
    phone: '',
    wilaya: '',
    municipality: '',
  },
};

interface ValidationErrors {
  propertyType?: string;
  serviceType?: string;
  selectedAreas?: string;
  details: {
    description?: string;
    areaSqm?: string;
    startDate?: string;
  };
  customer: {
    fullName?: string;
    phone?: string;
    wilaya?: string;
    municipality?: string;
  };
}

const EMPTY_ERRORS: ValidationErrors = {
  details: {},
  customer: {},
};

export function ServiceWizard() {
  const [formState, setFormState] =
    useState<RenovationFormState>(INITIAL_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(1);
  const [maxReachedStep, setMaxReachedStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>(EMPTY_ERRORS);
  const wizardTopRef = useRef<HTMLDivElement | null>(null);

  const scrollToWizardTop = () => {
    wizardTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateStep = (step: number): boolean => {
    const nextErrors: ValidationErrors = { details: {}, customer: {} };
    let valid = true;

    if (step === 1 && !formState.propertyType) {
      nextErrors.propertyType = 'يرجى اختيار نوع المكان للمتابعة.';
      valid = false;
    }

    if (step === 2 && !formState.serviceType) {
      nextErrors.serviceType = 'يرجى اختيار نوع الخدمة المطلوبة للمتابعة.';
      valid = false;
    }

    if (step === 3 && formState.selectedAreas.length === 0) {
      nextErrors.selectedAreas = 'يرجى اختيار مساحة واحدة على الأقل للعمل عليها.';
      valid = false;
    }

    if (step === 4) {
      const sqm = Number(formState.details.areaSqm);
      if (!formState.details.areaSqm || Number.isNaN(sqm) || sqm <= 0) {
        nextErrors.details.areaSqm = 'يرجى إدخال مساحة تقريبية صحيحة بالمتر المربع.';
        valid = false;
      }
      if (!formState.details.startDate) {
        nextErrors.details.startDate = 'يرجى تحديد تاريخ البدء المتوقع.';
        valid = false;
      }
      if (formState.details.description.trim().length < 5) {
        nextErrors.details.description =
          'يرجى كتابة وصف مختصر للأشغال المطلوبة (5 أحرف على الأقل).';
        valid = false;
      }
    }

    if (step === 5) {
      if (formState.customer.fullName.trim().length < 3) {
        nextErrors.customer.fullName = 'يرجى إدخال الاسم الكامل.';
        valid = false;
      }
      if (!isValidAlgerianPhone(formState.customer.phone)) {
        nextErrors.customer.phone =
          'يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0550123456).';
        valid = false;
      }
      if (!formState.customer.wilaya) {
        nextErrors.customer.wilaya = 'يرجى اختيار الولاية.';
        valid = false;
      }
      if (formState.customer.municipality.trim().length < 2) {
        nextErrors.customer.municipality = 'يرجى إدخال اسم البلدية.';
        valid = false;
      }
    }

    setErrors(nextErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    const nextStep = Math.min(6, currentStep + 1);
    setCurrentStep(nextStep);
    setMaxReachedStep((prev) => Math.max(prev, nextStep));
    scrollToWizardTop();
  };

  const handleBack = () => {
    setErrors(EMPTY_ERRORS);
    setCurrentStep((prev) => Math.max(1, prev - 1));
    scrollToWizardTop();
  };

  const handleJumpToStep = (step: number) => {
    setErrors(EMPTY_ERRORS);
    setIsSubmitted(false);
    setCurrentStep(step);
    scrollToWizardTop();
  };

  const handleToggleArea = (id: AreaId) => {
    setErrors((prev) => ({ ...prev, selectedAreas: undefined }));
    setFormState((prev) => {
      const exists = prev.selectedAreas.includes(id);
      return {
        ...prev,
        selectedAreas: exists
          ? prev.selectedAreas.filter((item) => item !== id)
          : [...prev.selectedAreas, id],
      };
    });
  };

  const handleSubmitOrder = () => {
    const message = buildWhatsAppMessage(formState);
    const whatsappUrl = buildWhatsAppUrl(message);
    setIsSubmitted(true);
    scrollToWizardTop();

    const anchor = document.createElement('a');
    anchor.href = whatsappUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleResetForm = () => {
    formState.details.photos.forEach((photo) => {
      URL.revokeObjectURL(photo.previewUrl);
    });
    setFormState(INITIAL_FORM_STATE);
    setErrors(EMPTY_ERRORS);
    setIsSubmitted(false);
    setCurrentStep(1);
    setMaxReachedStep(1);
    scrollToWizardTop();
  };

  return (
    <section
      id="booking-wizard"
      ref={wizardTopRef}
      className="py-14 sm:py-20 bg-transparent scroll-mt-16"
    >
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E3DAD0] bg-white/[0.97] p-5 sm:p-8 lg:p-10 shadow-[0_12px_36px_rgba(11,20,38,0.12)]">
          {!isSubmitted && (
            <WizardProgress
              currentStep={currentStep}
              maxReachedStep={maxReachedStep}
              onJumpToStep={handleJumpToStep}
            />
          )}

          <div className="min-h-[340px]">
            {currentStep === 1 && (
              <StepPropertyType
                selected={formState.propertyType}
                customNote={formState.customPropertyNote}
                onSelect={(id) => {
                  setErrors((prev) => ({ ...prev, propertyType: undefined }));
                  setFormState((prev) => ({ ...prev, propertyType: id }));
                }}
                onCustomNoteChange={(note) =>
                  setFormState((prev) => ({ ...prev, customPropertyNote: note }))
                }
                error={errors.propertyType}
              />
            )}

            {currentStep === 2 && (
              <StepServiceType
                selected={formState.serviceType}
                customNote={formState.customServiceNote}
                onSelect={(id) => {
                  setErrors((prev) => ({ ...prev, serviceType: undefined }));
                  setFormState((prev) => ({ ...prev, serviceType: id }));
                }}
                onCustomNoteChange={(note) =>
                  setFormState((prev) => ({ ...prev, customServiceNote: note }))
                }
                error={errors.serviceType}
              />
            )}

            {currentStep === 3 && (
              <StepAreaSelection
                selectedAreas={formState.selectedAreas}
                customAreaNote={formState.customAreaNote}
                onToggleArea={handleToggleArea}
                onCustomAreaNoteChange={(note) =>
                  setFormState((prev) => ({ ...prev, customAreaNote: note }))
                }
                error={errors.selectedAreas}
              />
            )}

            {currentStep === 4 && (
              <StepProjectDetails
                details={formState.details}
                onChange={(nextDetails) => {
                  setErrors((prev) => ({ ...prev, details: {} }));
                  setFormState((prev) => ({ ...prev, details: nextDetails }));
                }}
                errors={errors.details}
              />
            )}

            {currentStep === 5 && (
              <StepCustomerInfo
                customer={formState.customer}
                onChange={(nextCustomer) => {
                  setErrors((prev) => ({ ...prev, customer: {} }));
                  setFormState((prev) => ({ ...prev, customer: nextCustomer }));
                }}
                errors={errors.customer}
              />
            )}

            {currentStep === 6 && (
              <StepConfirmation
                formState={formState}
                isSubmitted={isSubmitted}
                onEditStep={handleJumpToStep}
                onSubmitOrder={handleSubmitOrder}
                onResetForm={handleResetForm}
              />
            )}
          </div>

          {currentStep < 6 && (
            <div className="mt-8 pt-6 border-t border-[#E3DAD0] flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl border border-[#D8CEC1] bg-white text-sm font-medium text-[#1E1D1B] hover:bg-[#F2ECE4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B]"
                >
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  <span>السابق</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-xl bg-[#1E1D1B] text-[#FAF8F5] text-sm sm:text-base font-medium hover:bg-[#33312D] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B]"
              >
                <span>{currentStep === 5 ? 'مراجعة الطلب' : 'التالي'}</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {currentStep === 6 && !isSubmitted && (
            <div className="mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-[#5E574F] hover:text-[#1E1D1B] hover:bg-[#FAF8F5] transition-colors"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                <span>العودة لتعديل معلومات العميل</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
