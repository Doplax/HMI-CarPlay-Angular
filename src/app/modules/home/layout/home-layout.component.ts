import { Component } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { I18nService } from '@shared/services/i18n.service';

const slideAnimation = trigger('routeAnimation', [
  transition(':increment', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }),
    ], { optional: true }),
    query(':enter', [style({ transform: 'translateX(100%)' })], { optional: true }),
    group([
      query(':leave', [
        animate('350ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(-100%)' })),
      ], { optional: true }),
      query(':enter', [
        animate('350ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)' })),
      ], { optional: true }),
    ]),
  ]),
  transition(':decrement', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }),
    ], { optional: true }),
    query(':enter', [style({ transform: 'translateX(-100%)' })], { optional: true }),
    group([
      query(':leave', [
        animate('350ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(100%)' })),
      ], { optional: true }),
      query(':enter', [
        animate('350ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)' })),
      ], { optional: true }),
    ]),
  ]),
]);

@Component({
    selector: 'home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss'],
    standalone: false,
    animations: [slideAnimation],
})
export class HomeLayoutComponent {

  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('home', this.i18n.currentLang);
    console.log('Load HomeModule');
  }

  routeIndex(outlet: RouterOutlet): number {
    return outlet?.activatedRouteData?.['animationIndex'] ?? 0;
  }
}
