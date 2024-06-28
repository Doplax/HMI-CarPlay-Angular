import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallPageComponent } from './pages/call-page/call-page.component';
import { CallRoutingModule } from './call-routing.module';
import { CallKeypadComponent } from './components/call-keypad/call-keypad.component';

@NgModule({
  declarations: [CallPageComponent, CallKeypadComponent],
  imports: [CommonModule, CallRoutingModule],
})
export class CallModule {}
