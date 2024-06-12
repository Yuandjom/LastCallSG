// interfaces.ts

export interface StoreItem {
  name: string;
  finalPrice: number;
  originalPrice: number;
  discount: number;
  quantity: number;
  imageURL: string; // URL as string
  expiryDate: Date;
  description: string;
}

export interface Store {
  storeTitle: string;
  storeDistance: string;
  storeCategory: string;
  storeItemQuantity: number;
  storeLogo: number; // URL as string
  storeLatitude: number;
  storeLongitude: number;
  items: StoreItem[];
  storeAddress: string;
  storePostalCode: string;
  storeRating: number;
  storeEmailAddress:string;
}

