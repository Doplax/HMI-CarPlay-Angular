import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { SideBarComponent } from './components/side-bar/side-bar.component';
//import { DisplayComponent } from './components/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    //SideBarComponent,
    //DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
