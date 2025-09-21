import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastPageComponent } from './pages/podcast-page/podcast-page.component';
import { PodcastRoutingModule } from './podcast-routing.module';
import { SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    PodcastPageComponent
  ],
  imports: [
    CommonModule,
    PodcastRoutingModule,
    SharedModule
  ],
})
export class PodcastModule {}
