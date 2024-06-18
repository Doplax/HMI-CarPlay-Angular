import { Component, OnDestroy } from '@angular/core';
import { CurrentStateService } from "@shared/services/current-state.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public isRunning: boolean = true;
  private subscriptions: Subscription = new Subscription();

  constructor(private currentStateService: CurrentStateService) {
    this.subscriptions.add(
      this.currentStateService.getRunningState().subscribe(status => {
        this.isRunning = status;
        this.isRunning = false ; // TODO: Delete this line

      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
