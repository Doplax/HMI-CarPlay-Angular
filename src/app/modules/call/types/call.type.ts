export enum CardType {
  'favorites',
  'recents',
  'contacts',
}


export interface CallCardData {
  name: string;
  time: string; // hora 00:00
  favorite?: boolean;
  deviceType?: 'mobile' | 'desktop';
}