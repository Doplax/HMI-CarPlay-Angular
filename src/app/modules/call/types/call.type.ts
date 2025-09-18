export enum CardTypeEnum {
  'favorites',
  'recents',
  'contacts',
}

export type DeviceType = 'desktop' | 'mobile';

export interface CallContactData {
  name: string;
  time?:string,
  phoneNumber?: string;
  isFavorite?: boolean;
  deviceType?: DeviceType;
  image?: string;
}

