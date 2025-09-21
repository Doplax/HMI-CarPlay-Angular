import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';

//Locale
//import localeES from '@angular/common/locales/es';
//import localeEN from '@angular/common/locales/en';

//import { registerLocaleData } from '@angular/common';
//import { CurrentStateService } from './shared/services/current-state.service';
//import { I18nService } from './shared/services/i18n.service';
//registerLocaleData(localeES);
//registerLocaleData(localeEN);

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, SharedModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    //{ provide: LOCALE_ID, useValue: I18nService.currentLang },
  ],
})
export class AppModule {}
