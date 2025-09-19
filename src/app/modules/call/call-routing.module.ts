import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallRecentsPageComponent } from './pages/call-recents-page/call-recents-page.component';
import { CallFavoritesPageComponent } from './pages/call-favorites-page/call-favorites-page.component';
import { CallContactsPageComponent } from './pages/call-contacts-page/call-contacts-page.component';
import { CallKeypadPageComponent } from './pages/call-keypad-page/call-keypad-page.component';
import { CallVoicemalPageComponent } from './pages/call-voicemal-page/call-voicemal-page.component';
import { CallLayoutComponent } from './layout/call-layout.component';

const routes: Routes = [
  { path: '', component: CallLayoutComponent,
    children: [
      {path: '', redirectTo: 'favorites', pathMatch: 'full' }, // <-- Redirects /call to /call/favorites
      {path: 'favorites', component: CallFavoritesPageComponent},
      {path: 'recents', component: CallRecentsPageComponent},
      {path: 'contacts', component: CallContactsPageComponent},
      {path: 'keypad', component: CallKeypadPageComponent},
      {path: 'voicemail', component: CallVoicemalPageComponent},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallRoutingModule { }
