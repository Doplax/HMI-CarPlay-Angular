import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallRoutingModule } from './call-routing.module';
import { CallContactsPageComponent } from './pages/call-contacts-page/call-contacts-page.component';
import { CallRecentsPageComponent } from './pages/call-recents-page/call-recents-page.component';
import { CallKeypadPageComponent } from './pages/call-keypad-page/call-keypad-page.component';
import { CallVoicemalPageComponent } from './pages/call-voicemal-page/call-voicemal-page.component';
import { CallLayoutPageComponent } from './pages/call-layout-page/call-layout-page.component';
import { CallTopBarComponent } from './components/call-top-bar/call-top-bar.component';

@NgModule({
  declarations: [
    //Pages
    CallLayoutPageComponent,
    CallContactsPageComponent,
    CallRecentsPageComponent,
    CallContactsPageComponent,
    CallKeypadPageComponent,
    CallVoicemalPageComponent,
    //Components
    CallTopBarComponent,

  ],
  imports: [CommonModule, CallRoutingModule],
})
export class CallModule {}
