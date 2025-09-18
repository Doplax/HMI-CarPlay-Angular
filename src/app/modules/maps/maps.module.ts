import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Pages
import { MapsPageComponent } from './pages/maps-page/maps-page.component';

//Components
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
    MapsRoutingModule,
    FontAwesomeModule
  ]
})
export class MapsModule { }
