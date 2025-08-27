import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'call',
    loadChildren: () =>
      import('@modules/call/call.module').then((m) => m.CallModule),
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('@modules/maps/maps-routing.module').then((m) => m.MapsRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
