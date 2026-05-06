import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'home-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  icons = [0, 1];
  activeIndex = 1;

  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.syncActiveIndex(this.router.url);
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.syncActiveIndex(event.urlAfterRedirects));
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  prevIcon(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.navigate();
    }
  }

  nextIcon(): void {
    if (this.activeIndex < this.icons.length - 1) {
      this.activeIndex++;
      this.navigate();
    }
  }

  onIconClick(index: number): void {
    this.activeIndex = index;
    this.navigate();
  }

  private navigate(): void {
    if (this.activeIndex === 1) {
      this.router.navigate(['home']);
    } else if (this.activeIndex === 0) {
      this.router.navigate(['home/split']);
    }
  }

  private syncActiveIndex(url: string): void {
    if (url.startsWith('/home/split')) {
      this.activeIndex = 0;
    } else if (url.startsWith('/home')) {
      this.activeIndex = 1;
    }
  }
}
