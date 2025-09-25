import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherPageComponent } from './pages/weather-page/weather-page.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { SharedModule} from '@shared/shared.module';
import { WeatherLayoutComponent } from './layout/weather-layout.component';


@NgModule({
  declarations: [
    WeatherLayoutComponent,
    WeatherPageComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    SharedModule,

  ],
})
export class WeatherModule {}
