import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './pages/settings-page.component';

import { SharedModule } from '@src/app/shared/shared.module';
import { SettingsLayoutComponent } from './layout/settings-layout.component';

@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
