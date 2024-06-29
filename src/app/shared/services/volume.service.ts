import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VolumeService {
  public volumeLevel$: BehaviorSubject<number> = new BehaviorSubject<number>(
    50
  );
  public isVolumeVisible$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private visibilityTimerSubscription: Subscription | null = null; // Mantiene la suscripción al temporizador

  constructor() {}

  private triggerVisibility() {
    if (this.isVolumeVisible$.value === true) {
      // Si ya está visible, reiniciar el temporizador sin hacer nada más
      this.resetVisibilityTimer();
    } else {
      // Si no está visible, hacerlo visible y configurar el temporizador
      this.isVolumeVisible$.next(true);
      this.resetVisibilityTimer();
    }
  }
  private resetVisibilityTimer() {
    // Cancelar el temporizador actual si existe
    if (this.visibilityTimerSubscription) {
      this.visibilityTimerSubscription.unsubscribe();
    }
    // Crear un nuevo temporizador
    this.visibilityTimerSubscription = timer(3000).subscribe(() => {
      this.isVolumeVisible$.next(false);
    });
  }

  /** TODO: Review this method
   * Gradually changes the volume level, either increasing or decreasing it
   * by 10 units with smooth increments of 1 unit every 25 milliseconds.
   *
   * @param {boolean} isIncreasing - Indicates the direction of the volume change.
   *  - `true` to increase the volume.
   *  - `false` to decrease the volume.
   *
   * The function uses `setInterval` to change the volume by one unit every 25 milliseconds
   * until the target is reached, which is 10 units more or less than the current volume,
   * without exceeding the limits of 0 to 100.
   *
   * Usage example:
   * - `changeVolume(true)` will increase the volume.
   * - `changeVolume(false)` will decrease the volume.
   */
  changeVolume(isIncreasing: boolean) {
    this.triggerVisibility();

    const currentVolumeLevel = this.volumeLevel$.value;
    const incrementAmount = 1;
    const intervalTime = 25; // Adjusted for a smoother increment

    if (isIncreasing) {
      if (currentVolumeLevel < 100) {
        const targetVolumeLevel = Math.min(currentVolumeLevel + 10, 100);

        const interval = setInterval(() => {
          const updatedVolumeLevel = this.volumeLevel$.value;

          if (updatedVolumeLevel < targetVolumeLevel) {
            this.volumeLevel$.next(updatedVolumeLevel + incrementAmount);
          } else {
            clearInterval(interval);
          }
        }, intervalTime);
      }
    } else {
      if (currentVolumeLevel > 0) {
        const targetVolumeLevel = Math.max(currentVolumeLevel - 10, 0);

        const interval = setInterval(() => {
          const updatedVolumeLevel = this.volumeLevel$.value;

          if (updatedVolumeLevel > targetVolumeLevel) {
            this.volumeLevel$.next(updatedVolumeLevel - incrementAmount);
          } else {
            clearInterval(interval);
          }
        }, intervalTime);
      }
    }
  }

  getVolumeLevel() {
    return this.volumeLevel$.asObservable();
  }

  getVisibilityStatus() {
    return this.isVolumeVisible$.asObservable();
  }
}
