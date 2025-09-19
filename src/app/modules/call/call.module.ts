import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallRoutingModule } from './call-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Pages
import { CallContactsPageComponent } from './pages/call-contacts-page/call-contacts-page.component';
import { CallRecentsPageComponent } from './pages/call-recents-page/call-recents-page.component';
import { CallKeypadPageComponent } from './pages/call-keypad-page/call-keypad-page.component';
import { CallVoicemalPageComponent } from './pages/call-voicemal-page/call-voicemal-page.component';
import { CallLayoutComponent } from './layout/call-layout.component';
import { CallFavoritesPageComponent  } from './pages/call-favorites-page/call-favorites-page.component';


//Components
import { CallTopBarComponent } from './components/call-top-bar/call-top-bar.component';
import { CallCardComponent } from './components/call-card/call-card.component';

@NgModule({
  declarations: [
    CallLayoutComponent,

    //Pages
    CallFavoritesPageComponent,
    CallRecentsPageComponent,
    CallContactsPageComponent,
    CallKeypadPageComponent,
    CallVoicemalPageComponent,

    //Components
    CallTopBarComponent,
    CallCardComponent

  ],
  imports: [
    CommonModule,
    CallRoutingModule,
    FontAwesomeModule
  ],
})
export class CallModule {}
