import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallPageComponent } from './pages/call-page/call-page.component';
import { CallRoutingModule } from './call-routing.module';
import { CallKeypadComponent } from './components/call-keypad/call-keypad.component';
import { CallTopBarComponent } from './components/call-top-bar/call-top-bar.component';

@NgModule({
  declarations: [CallPageComponent, CallKeypadComponent, CallTopBarComponent],
  imports: [CommonModule, CallRoutingModule],
})
export class CallModule {}
