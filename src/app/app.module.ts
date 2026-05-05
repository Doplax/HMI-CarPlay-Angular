import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRouteSnapshot, provideRouter, withViewTransitions } from '@angular/router';

import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';

function findAnimationIndex(snapshot: ActivatedRouteSnapshot): number | undefined {
  let current: ActivatedRouteSnapshot | null = snapshot;
  while (current) {
    const value = current.data?.['animationIndex'];
    if (typeof value === 'number') return value;
    current = current.firstChild;
  }
  return undefined;
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, FontAwesomeModule, SharedModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      appRoutes,
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition, from, to }) => {
          const fromIdx = findAnimationIndex(from);
          const toIdx = findAnimationIndex(to);
          if (fromIdx === undefined || toIdx === undefined || fromIdx === toIdx) {
            transition.skipTransition();
            return;
          }
          const direction = toIdx > fromIdx ? 'route-forward' : 'route-backward';
          document.documentElement.classList.add(direction);
          transition.finished.finally(() => {
            document.documentElement.classList.remove(direction);
          });
        },
      }),
    ),
  ],
})
export class AppModule {}
