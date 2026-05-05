import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { TranslatePipe } from '@shared/pipes/translate.pipe';

//Components
import {
  TitleSectionComponent,
  LockScreenComponent,
  VolumeBoxComponent,
  TopBarComponent,
  SideBarComponent,
} from '@shared/components/index';


@NgModule({
  declarations: [
    //Components
    TitleSectionComponent,
    LockScreenComponent,
    VolumeBoxComponent,
    TopBarComponent,
    SideBarComponent,

    //Pipes
    TranslatePipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    //Components
    TitleSectionComponent,
    LockScreenComponent,
    VolumeBoxComponent,
    TopBarComponent,
    SideBarComponent,

    //Pipes
    TranslatePipe,

    //Modules
    FontAwesomeModule,
    HttpClientModule,
    RouterModule
  ],
})
export class SharedModule {}
