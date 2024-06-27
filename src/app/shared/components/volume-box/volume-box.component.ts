import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentStateService } from '../../services/current-state.service';

@Component({
  selector: 'app-volume-box',
  templateUrl: './volume-box.component.html',
  styleUrls: ['./volume-box.component.scss']
})
export class VolumeBoxComponent implements OnDestroy {

// Todo: is the better way to subscribe and unsubscribe? or passing props from the parent
  public volumeLevel!: number;
  private subscriptions: Subscription = new Subscription();



  constructor(private currentStateService: CurrentStateService){

    this.subscriptions.add(
      this.currentStateService.getVolumeLevel().subscribe(status => {
        this.volumeLevel = status;
        console.log(this.volumeLevel);
      })
    );
  }
   ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }



}
