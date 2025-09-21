import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '@shared/shared.module';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { MessagesLayoutComponent } from './layout/messages-layout.component';



@NgModule({
  declarations: [
    MessagesLayoutComponent,
    MessagesPageComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule
  ]
})
export class MessagesModule { }
