import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '@shared/shared.module';
import { SplitViewPageComponent } from './pages/split-view-page/split-view-page.component';



@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomePageComponent,
    NavigationComponent,
    SplitViewPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule

  ]
})
export class HomeModule { }
