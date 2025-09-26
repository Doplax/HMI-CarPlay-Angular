import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('@modules/books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('@modules/calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: 'call',
    loadChildren: () =>
      import('@modules/call/call.module').then((m) => m.CallModule),
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('@modules/maps/maps.module').then((m) => m.MapsModule),
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('@modules/messages/messages.module').then((m) => m.MessagesModule),
  },
  {
    path: 'music',
    loadChildren: () =>
      import('@modules/music/music.module').then((m) => m.MusicModule),
  },
  {
    path: 'weather',
    loadChildren: () =>
      import('@modules/weather/weather.module').then((m) => m.WeatherModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('@modules/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'podcast',
    loadChildren: () =>
      import('@modules/podcast/podcast.module').then((m) => m.PodcastModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
