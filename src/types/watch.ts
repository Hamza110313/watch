export enum WatchCategory {
  ALL = 'All',
  MALE = 'Male',
  FEMALE = 'Female',
  KIDS = 'Kids',
  WALL_CLOCKS = 'Wall Clocks',
  OTHER = 'Other',
}

export type WatchSectionCategory =
  | WatchCategory.MALE
  | WatchCategory.FEMALE
  | WatchCategory.KIDS
  | WatchCategory.WALL_CLOCKS
  | WatchCategory.OTHER;

export enum MovementFilter {
  ALL = 'All Designs',
  AUTOMATIC = 'Automatic',
  HAND_WOUND = 'Hand-Wound',
  QUARTZ_SOLAR = 'Quartz & Solar',
  WALL_CLOCKS = 'Wall Clocks',
  ACCESSORIES = 'Objects & Winders',
}

export enum PhotoViewMode {
  STUDIO = 'studio',
  MODEL = 'model',
}

export enum SortOption {
  FEATURED = 'featured',
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
}

export interface WatchVariant {
  id: string;
  label: string;
  swatchHex: string;
}

export interface WatchPhoto {
  url: string;
  caption: string;
  alt: string;
  kind: 'studio' | 'model' | 'detail';
}

export interface WatchSpec {
  caliber: string;
  caseSize: string;
  waterResistance: string;
  crystal: string;
  material: string;
}

export interface WatchProduct {
  id: string;
  reference: string;
  name: string;
  category: WatchSectionCategory;
  movementType: string;
  movementGroup: Exclude<MovementFilter, MovementFilter.ALL>;
  designStyle: string;
  price: number;
  image: string;
  imageAlt: string;
  gallery: WatchPhoto[];
  tagline: string;
  description: string;
  availabilityNote?: string;
  variants: WatchVariant[];
  specs: WatchSpec;
}

export interface CartItem {
  product: WatchProduct;
  variant: WatchVariant;
  quantity: number;
}

export type PaymentMethod = 'card' | 'cod';

export interface OrderConfirmation {
  orderNumber: string;
  customerName: string;
  email: string;
  address: string;
  paymentMethod: PaymentMethod;
  total: number;
  itemCount: number;
  placedAt?: string;
}

export type ReturnResolution = 'refund' | 'exchange' | 'credit';

export interface ReturnRequest {
  returnId: string;
  orderNumber: string;
  email: string;
  watchReference: string;
  daysSinceDelivery: number;
  reason: string;
  resolution: ReturnResolution;
  conditionConfirmed: boolean;
  submittedAt: string;
  status: 'Approved for Pickup';
}

export interface RegisteredMember {
  memberId: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  postalCode: string;
  preferredCategory: WatchCategory;
  registeredWatches: string[];
  welcomeCreditAvailable: boolean;
  receiveUpdates: boolean;
  registeredAt: string;
}


