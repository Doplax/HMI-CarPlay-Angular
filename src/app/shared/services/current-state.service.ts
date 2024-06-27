import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  public isRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // Valor inicial para lockScreen
  public volumeLevel$: BehaviorSubject<number> = new BehaviorSubject<number>(50);

  constructor() { }

  switchRunningState(): void {
    this.isRunning$.next(!this.isRunning$.value);
  }

  getRunningState() {
    return this.isRunning$.asObservable();
  }

  turnUpVolume() {
    let currentVolumeLevel = this.volumeLevel$.value

    if (currentVolumeLevel < 100) {
      const newVolumeLevel =  this.volumeLevel$.value + 10
      this.volumeLevel$.next(newVolumeLevel);
    }
  }

  turnDownVolume() {
    let currentVolumeLevel = this.volumeLevel$.value

    if (currentVolumeLevel > 0) {
      const newVolumeLevel =  this.volumeLevel$.value - 10
      this.volumeLevel$.next(newVolumeLevel);
    }
  }

  getVolumeLevel() {
    return this.volumeLevel$.asObservable();
  }

}
