import { Component, OnDestroy } from '@angular/core';
import { CurrentStateService } from "@shared/services/current-state.service";
import { Subscription } from 'rxjs';
import { FontAwesomeIconsService } from './shared/services/font-awesome-icons.service';
import { SettingsService } from '@modules/settings/services/settings-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnDestroy {
  public isRunning: boolean = true;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fontAwesomeIconsService: FontAwesomeIconsService,  // Injected for side effects: icon registration at app startup
    private currentStateService: CurrentStateService,
    public settingsService: SettingsService,
  ) {
    this.subscriptions.add(
      this.currentStateService.getRunningState().subscribe(status => {
        this.isRunning = status;
      })
    );

    this.settingsService.updateCurrentLocation()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }



}
