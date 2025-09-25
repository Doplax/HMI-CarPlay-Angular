import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './pages/settings-page.component';

import { SharedModule } from '@src/app/shared/shared.module';
import { SettingsLayoutComponent } from './layout/settings-layout.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class SettingsModule { }
