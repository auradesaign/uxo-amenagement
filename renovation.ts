export type PropertyTypeId =
  | 'house'
  | 'commercial'
  | 'apartment'
  | 'villa'
  | 'other';

export type ServiceTypeId =
  | 'renovation'
  | 'repair'
  | 'interior'
  | 'finishing'
  | 'other';

export type AreaId =
  | 'bathroom'
  | 'salon'
  | 'kitchen'
  | 'bedroom'
  | 'facade'
  | 'flooring'
  | 'walls'
  | 'ceiling'
  | 'other';

export interface SelectableOption<T extends string> {
  id: T;
  labelAr: string;
  labelFr: string;
  descriptionAr: string;
}

export interface AreaOption {
  id: AreaId;
  labelAr: string;
  labelFr: string;
  subtitleAr: string;
  image?: string;
}

export interface UploadedPhoto {
  id: string;
  name: string;
  sizeLabel: string;
  previewUrl: string;
}

export interface ProjectDetails {
  description: string;
  areaSqm: string;
  startDate: string;
  photos: UploadedPhoto[];
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  wilaya: string;
  municipality: string;
}

export interface RenovationFormState {
  propertyType: PropertyTypeId | null;
  customPropertyNote: string;
  serviceType: ServiceTypeId | null;
  customServiceNote: string;
  selectedAreas: AreaId[];
  customAreaNote: string;
  details: ProjectDetails;
  customer: CustomerInfo;
}
