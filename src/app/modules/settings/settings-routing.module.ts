import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPageComponent } from './pages/settings-page.component';
import { SettingsLocationPageComponent } from './pages/settings-location-page.component';
import { SettingsMapStylePageComponent } from './pages/settings-map-style-page.component';
import { SettingsLayoutComponent } from './layout/settings-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SettingsLayoutComponent,
    children: [
      {
        path: 'home',
        component: SettingsPageComponent,
      },
      {
        path: 'location',
        component: SettingsLocationPageComponent,
      },
      {
        path: 'map-style',
        component: SettingsMapStylePageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
