import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from '@shared/components/side-bar/side-bar.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { LockScreenComponent } from '@shared/components/lock-screen/lock-screen.component';
import { VolumeBoxComponent } from '@shared/components/volume-box/volume-box.component';
import { TopBarComponent } from '@shared/components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    LockScreenComponent,
    VolumeBoxComponent,
    TopBarComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
