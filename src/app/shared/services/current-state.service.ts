import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  public isRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // Valor inicial

  constructor() { }

  switchRunningState(): void {
    this.isRunning$.next(!this.isRunning$.value);
  }

  getRunningState() {
    return this.isRunning$.asObservable();
  }

}
