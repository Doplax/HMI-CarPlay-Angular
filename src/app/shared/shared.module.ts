import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Components
import {
  TitleSectionComponent,
  LockScreenComponent,
  VolumeBoxComponent,
  TopBarComponent,
  SideBarComponent,
} from '@shared/components/index';


//Locale
import localeES from '@angular/common/locales/es';
import localeFrCA from '@angular/common/locales/en';

import { registerLocaleData } from '@angular/common';
registerLocaleData(localeES);
registerLocaleData(localeFrCA);


@NgModule({
  declarations: [
    TitleSectionComponent,
    LockScreenComponent,
    VolumeBoxComponent,
    TopBarComponent,
    SideBarComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    //Components
    TitleSectionComponent,
    LockScreenComponent,
    VolumeBoxComponent,
    TopBarComponent,
    SideBarComponent,

    //Modules
    FontAwesomeModule,
  ],
})
export class SharedModule {}
