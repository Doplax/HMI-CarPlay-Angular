import { TopBarTab } from '@shared/types/top-bar.type';

export const callTopBarTabs: TopBarTab[] = [
  { path: 'favorites', labelKey: 'TAB_FAVORITES', icon: 'star' },
  { path: 'recents',   labelKey: 'TAB_RECENTS',   icon: 'clock' },
  { path: 'contacts',  labelKey: 'TAB_CONTACTS',  icon: 'address-book' },
  { path: 'keypad',    labelKey: 'TAB_KEYPAD',    icon: 'table-cells-large' },
  { path: 'voicemail', labelKey: 'TAB_VOICEMAIL', icon: 'voicemail' },
];
