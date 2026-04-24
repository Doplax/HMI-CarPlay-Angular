import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './pages/settings-page.component';
import { SettingsLocationPageComponent } from './pages/settings-location-page.component';
import { SettingsMapStylePageComponent } from './pages/settings-map-style-page.component';

import { SharedModule } from '@src/app/shared/shared.module';
import { SettingsLayoutComponent } from './layout/settings-layout.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SettingsPageComponent,
    SettingsLocationPageComponent,
    SettingsMapStylePageComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule
  ]
})
export class SettingsModule { }
