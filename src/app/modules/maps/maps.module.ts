import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { MapsRoutingModule } from './maps-routing.module';
import { MapsNavigationControllersComponent } from './components/maps-navigation-controllers/maps-navigation-controllers.component';
import { MapsSearchBoxComponent } from './components/maps-search-box/maps-search-box.component';


@NgModule({
  declarations: [
    MapsPageComponent,
    MapsNavigationControllersComponent,
    MapsSearchBoxComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
