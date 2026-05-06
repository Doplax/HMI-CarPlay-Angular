import { IconPrefix } from '@fortawesome/fontawesome-svg-core';

export interface TopBarTab {
  path: string;
  labelKey: string;
  icon: string;
  iconPrefix?: IconPrefix;
}
