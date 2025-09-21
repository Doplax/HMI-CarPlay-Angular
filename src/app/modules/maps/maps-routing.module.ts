import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { MapsLayoutComponent } from './layout/maps-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      {
        path: 'home',
        component: MapsPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
