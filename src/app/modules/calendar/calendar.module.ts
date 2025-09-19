import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { CalendarLayoutComponent } from './layout/calendar-layout.component';
import { CalendarRoutingModule } from './calendar-routing.module';


@NgModule({
  declarations: [
    CalendarPageComponent,
    CalendarLayoutComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
