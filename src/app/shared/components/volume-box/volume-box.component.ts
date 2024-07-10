import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VolumeService } from '@shared/services/volume.service';

@Component({
  selector: 'app-volume-box',
  templateUrl: './volume-box.component.html',
  styleUrls: ['./volume-box.component.scss'],
})
export class VolumeBoxComponent implements OnDestroy {
  // Todo: is the better way to subscribe and unsubscribe? or passing props from the parent
  public volumeLevel!: number;
  public isVisible: boolean = false;
  private subscriptions: Subscription = new Subscription();

  @HostBinding('class.isVisible') get showHost(): boolean {
    return this.isVisible === true;
  }

  constructor(private volumeService: VolumeService) {
    this.subscriptions.add(
      this.volumeService.getVolumeLevel().subscribe((status) => {
        this.volumeLevel = status;
      })
    );

    this.subscriptions.add(
      this.volumeService.getVisibilityStatus().subscribe((visible) => {
        this.isVisible = visible;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
