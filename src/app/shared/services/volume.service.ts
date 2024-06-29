import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VolumeService {
  public volumeLevel$: BehaviorSubject<number> = new BehaviorSubject<number>(50);
  public isVolumeVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private visibilityTimerSubscription: Subscription | null = null;  // Tracks timer subscription

  constructor() {}

  // Manages visibility state of the volume control.
  private triggerVisibility() {
    if (!this.isVolumeVisible$.value) {
      this.isVolumeVisible$.next(true);
    }
    this.resetVisibilityTimer();
  }

  // Resets the visibility timer to hide volume control after 4 seconds.
  private resetVisibilityTimer() {
    this.visibilityTimerSubscription?.unsubscribe();
    this.visibilityTimerSubscription = timer(1700).subscribe(() => {
      this.isVolumeVisible$.next(false);
    });
  }

  /**
   * Changes volume by +/-10 with increments of 1 every 25ms.
   * @param isIncreasing - `true` to increase, `false` to decrease.
   */
  changeVolume(isIncreasing: boolean) {
    this.triggerVisibility();

    const currentVolumeLevel = this.volumeLevel$.value;
    const incrementAmount = 1;
    const intervalTime = 25;
    const targetVolumeLevel = isIncreasing
      ? Math.min(currentVolumeLevel + 10, 100)
      : Math.max(currentVolumeLevel - 10, 0);

    const interval = setInterval(() => {
      const updatedVolumeLevel = this.volumeLevel$.value;
      if ((isIncreasing && updatedVolumeLevel < targetVolumeLevel) ||
          (!isIncreasing && updatedVolumeLevel > targetVolumeLevel)) {
        this.volumeLevel$.next(updatedVolumeLevel + (isIncreasing ? incrementAmount : -incrementAmount));
      } else {
        clearInterval(interval);
      }
    }, intervalTime);
  }

  getVolumeLevel() {
    return this.volumeLevel$.asObservable();
  }

  getVisibilityStatus() {
    return this.isVolumeVisible$.asObservable();
  }
}
