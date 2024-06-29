import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VolumeService } from '@shared/services/volume.service';

@Component({
  selector: 'app-volume-box',
  templateUrl: './volume-box.component.html',
  styleUrls: ['./volume-box.component.scss']
})
export class VolumeBoxComponent implements OnDestroy {

// Todo: is the better way to subscribe and unsubscribe? or passing props from the parent
  public volumeLevel!: number;
  public isVisible: boolean = false;
  private subscriptions: Subscription = new Subscription();



  constructor(private volumeService: VolumeService){

    this.subscriptions.add(
      this.volumeService.getVolumeLevel().subscribe(status => {
        this.volumeLevel = status;
        console.log(this.volumeLevel);
      })
    );

    this.subscriptions.add(
      this.volumeService.getVisibilityStatus().subscribe(visible => {
        this.isVisible = visible;
      })
    );
  }
   ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }



}
