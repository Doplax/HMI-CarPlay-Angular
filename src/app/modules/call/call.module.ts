import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallPageComponent } from './pages/call-page/call-page.component';
import { CallRoutingModule } from './call-routing.module';

@NgModule({
  declarations: [CallPageComponent],
  imports: [CommonModule, CallRoutingModule],
})
export class CallModule {}
