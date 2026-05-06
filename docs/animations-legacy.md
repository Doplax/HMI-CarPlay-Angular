# Route animations — legacy implementation (Angular Animations)

> This is the **first** implementation that was used for the horizontal slide between `/home` and `/home/split`. It is now obsolete: the functions it relies on (`trigger`, `transition`, `query`, `animate`, `style`, `group`) were marked as **deprecated in Angular 20.2** with planned removal in v23. It was replaced by the View Transitions API implementation (see `animations-current.md`).

## Overall idea

Angular Animations is an **imperative DSL** declared in TypeScript. You define a `trigger` with several `transition`s; each transition describes the steps for moving from one state to another. To animate the entry/exit of pages in a `<router-outlet>` you used the special `:enter` / `:leave` selectors inside `query()`, leveraging the fact that the router updates a value (binding `[@trigger]`) on the outlet wrapper every time the route changes.

## How it was wired in the project

### 1. Enable the animations engine

`app.module.ts` imported `BrowserAnimationsModule`:

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ...],
  ...
})
export class AppModule {}
```

Without that import, the `trigger`s registered in components were never evaluated.

### 2. Tag the routes with an identifier

Each child route carries a numeric value in its `data` to detect direction:

```ts
// home-routing.module.ts
const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomePageComponent, data: { animationIndex: 1 } },
      { path: 'split', component: SplitViewPageComponent, data: { animationIndex: 0 } },
    ],
  },
];
```

`split` = 0 (left), `home` = 1 (right). Same order as the dots in the navigation component.

### 3. Define the trigger in the parent component

In `home-layout.component.ts` the animation was declared with `:increment` and `:decrement` (transitions that fire when the trigger-bound value goes up or down respectively):

```ts
import { animate, group, query, style, transition, trigger } from '@angular/animations';

const slideAnimation = trigger('routeAnimation', [
  transition(':increment', [
    query(':enter, :leave', [
      style({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }),
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
    // mirror: the new one enters from the left, the old one leaves to the right
    ...
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
  routeIndex(outlet: RouterOutlet): number {
    return outlet?.activatedRouteData?.['animationIndex'] ?? 0;
  }
}
```

### 4. Bind the trigger to the outlet wrapper

```html
<!-- home-layout.component.html -->
<main>
  <div class="route-container" [@routeAnimation]="routeIndex(outlet)">
    <router-outlet #outlet="outlet"/>
  </div>
  <home-navigation/>
</main>
```

```scss
/* home-layout.component.scss */
.route-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden; /* clip during the slide */
}
```

## Flow when the user navigates

1. The user is on `/home` → the `[@routeAnimation]` binding is `1`.
2. They click the left dot → router navigates to `/home/split` → the binding becomes `0`.
3. Since the value went down (from 1 to 0), Angular fires the `:decrement` transition.
4. The transition steps run in order:
   - `query(':enter, :leave', ...)` selects the entering and leaving components and sets them to `position: absolute` so they overlap.
   - `query(':enter', [style({ transform: 'translateX(-100%)' })])` places the new page off-screen to the left.
   - `group([...])` runs in parallel:
     - the old one slides to the right (`translateX(100%)`),
     - the new one enters until `translateX(0)`.
5. After 350ms the animation finishes and Angular destroys the leaving component.

## Why it was discarded

- **Deprecated**: in Angular 20.2 the team marked `trigger`, `transition`, `query`, `animate`, `style`, `group`, `state`, `keyframes`, etc. as deprecated, scheduled for removal in v23. Message: "Use `animate.enter` or `animate.leave` instead."
- **A lot of code** for a conceptually simple transition.
- **Duplicated DOM during the animation**: having the entering and leaving components overlapped with `position: absolute` can cause scroll or focus issues.
- **Coupled to a global import** (`BrowserAnimationsModule`) and an extra JS payload even if you only animate a single screen.
- A new web API exists (View Transitions) that the browser supports natively and that the Angular Router has integrated since v17. That's the recommended direction.

## Files this version touched

- `src/app/app.module.ts` — `BrowserAnimationsModule` import.
- `src/app/modules/home/home-routing.module.ts` — `data.animationIndex` on each child route.
- `src/app/modules/home/layout/home-layout.component.ts` — `trigger` and `routeIndex` method.
- `src/app/modules/home/layout/home-layout.component.html` — `[@routeAnimation]` on the wrapper.
- `src/app/modules/home/layout/home-layout.component.scss` — `.route-container { overflow: hidden }`.
