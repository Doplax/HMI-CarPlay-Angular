import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './layout/home-layout.component';



@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule

  ]
})
export class HomeModule { }
