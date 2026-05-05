# Route animations — current implementation (View Transitions API)

> This is the **current** implementation of the horizontal slide between `/home` and `/home/split`. It replaces the one based on `@angular/animations` (see `animations-legacy.md`).

## Overall idea

The [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) is a **browser** API: when you call `document.startViewTransition(callback)` the browser takes a "snapshot" of the current DOM, runs your callback (which mutates the DOM), takes a second snapshot, and animates the transition between both snapshots as pseudo-elements (`::view-transition-old`, `::view-transition-new`). The whole animation is described in **plain CSS**.

Angular 19+ ships the `withViewTransitions()` integration for `provideRouter`. It wraps every router navigation in `document.startViewTransition`, so any router tree change is automatically animated by the browser.

## How it is wired in the project

### 1. Enable the router integration

You must use `provideRouter` (not `RouterModule.forRoot`) because router *features* are injected as providers:

```ts
// src/app/app-routing.module.ts
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule) },
  // ... other lazy modules
];
```

```ts
// src/app/app.module.ts
import { ActivatedRouteSnapshot, provideRouter, withViewTransitions } from '@angular/router';
import { appRoutes } from './app-routing.module';

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
```

Notes:
- `skipInitialTransition: true` prevents the very first app load from doing a weird fade.
- `onViewTransitionCreated` receives `from` and `to` (`ActivatedRouteSnapshot`s). We walk down `firstChild` until we find the `data.animationIndex` we already use for the navigation dots.
- If the navigation isn't between two routes that both have `animationIndex` (e.g. navigating from `/home` to `/music`) we call `transition.skipTransition()` and the browser just does a regular un-animated navigation.
- If both indices are valid: we add `route-forward` or `route-backward` to `<html>` and remove it when `transition.finished` resolves. The CSS does everything else.

### 2. Mark the area to animate with `view-transition-name`

We only want to animate the container that holds the outlet, **not** the navigation dots bar. To do that we give it its own `view-transition-name`:

```html
<!-- src/app/modules/home/layout/home-layout.component.html -->
<main>
  <div class="route-container">
    <router-outlet/>
  </div>
  <home-navigation/>
</main>
```

```scss
/* src/app/modules/home/layout/home-layout.component.scss */
.route-container {
  position: relative;
  height: 100%;
  width: 100%;
  view-transition-name: home-content;
}
```

Any element with a `view-transition-name` is "extracted" from the root snapshot and animated separately. Everything else falls into `::view-transition-*(root)`.

### 3. Define the animations in global CSS

```scss
/* src/styles.scss */

// 1) Cancel the default cross-fade for root: the rest (the navigation bar,
//    the car frame, etc.) should not animate.
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}

// 2) Clip the snapshot to the original element's box, so the slide doesn't
//    spill over the car frame.
::view-transition-group(home-content),
::view-transition-image-pair(home-content) {
  overflow: hidden;
}

// 3) Slide keyframes.
@keyframes route-slide-from-right { from { transform: translateX(100%); } }
@keyframes route-slide-to-left    { to   { transform: translateX(-100%); } }
@keyframes route-slide-from-left  { from { transform: translateX(-100%); } }
@keyframes route-slide-to-right   { to   { transform: translateX(100%); } }

// 4) "Forward" direction (animationIndex goes up, e.g. split → home):
//    the old one leaves to the left, the new one enters from the right.
html.route-forward::view-transition-old(home-content) {
  animation: 350ms cubic-bezier(0.4, 0, 0.2, 1) both route-slide-to-left;
}
html.route-forward::view-transition-new(home-content) {
  animation: 350ms cubic-bezier(0.4, 0, 0.2, 1) both route-slide-from-right;
}

// 5) "Backward" direction (animationIndex goes down, e.g. home → split): mirror.
html.route-backward::view-transition-old(home-content) {
  animation: 350ms cubic-bezier(0.4, 0, 0.2, 1) both route-slide-to-right;
}
html.route-backward::view-transition-new(home-content) {
  animation: 350ms cubic-bezier(0.4, 0, 0.2, 1) both route-slide-from-left;
}
```

## Step-by-step flow when the user navigates

1. The user is on `/home` (`animationIndex: 1`) and clicks the left dot.
2. The router starts the navigation to `/home/split` (`animationIndex: 0`). The integration intercepts the activation and calls `document.startViewTransition(...)`.
3. Before applying the change, the browser captures the current DOM state as pseudo-elements:
   - everything that does NOT have its own `view-transition-name` falls into `::view-transition-old(root)`,
   - the `.route-container` is captured as `::view-transition-old(home-content)`.
4. Our `onViewTransitionCreated` callback fires: it detects `0 < 1` → "backward" → adds `route-backward` to `<html>`.
5. The router renders the new tree. The browser captures the new state as `::view-transition-new(...)`.
6. The browser runs the CSS animation:
   - `root` has no animation (we cancelled it in step 1 of the CSS).
   - old `home-content`: `route-slide-to-right` (350ms).
   - new `home-content`: `route-slide-from-left` (350ms).
   - The `overflow: hidden` on `::view-transition-group(home-content)` clips anything that goes outside.
7. When it finishes, the browser cleans up the pseudo-elements. `transition.finished` resolves and our `.finally` removes the `route-backward` class from `<html>`.

## Advantages over the legacy version

- **Much less JS code**: the animation logic lives in CSS, which the browser optimizes and composites on the GPU.
- **No real DOM duplication**: the copies are browser-managed snapshots, not extra Angular nodes. Doesn't interfere with component state.
- **Also works for any other element on the page**: if two routes share an element with the same `view-transition-name`, the browser automatically morphs between positions (handy if we later want Hero-style transitions).
- **Stable, future-proof API**: `@angular/animations` is deprecated; `withViewTransitions` is in *developer preview* in Angular but the underlying web API is a standard.

## Caveats / things to keep in mind

- **Browser support**: View Transitions has shipped in Chromium since 111 and Safari since 18.2. Firefox doesn't support it yet. Since the HMI runs on Chromium it isn't a problem, but if other browsers needed support in the future, navigation would just happen without the animation (silently ignored).
- **`provideRouter` vs `RouterModule.forRoot`**: router *features* (including `withViewTransitions`) require `provideRouter`. That's why `AppRoutingModule` was migrated to an `appRoutes` constant. Child modules still use `RouterModule.forChild(...)` unchanged.
- **Clipping the snapshot**: the snapshot is rendered in a layer above the viewport, so the original DOM's `overflow: hidden` doesn't apply. You have to add it explicitly to `::view-transition-group(...)` (and/or `::view-transition-image-pair(...)`) so the slide doesn't leak past the car frame.
- **Don't animate everything else**: if we didn't add `animation: none` to `::view-transition-old/new(root)`, the browser would do a default cross-fade over the rest of the page (the dots bar, the frame, etc.), causing a subtle flicker.

## Files this version touches

- `src/app/app-routing.module.ts` — exports `appRoutes` (constant, no NgModule).
- `src/app/app.module.ts` — `provideRouter(appRoutes, withViewTransitions({...}))` with the direction-detecting callback.
- `src/app/modules/home/home-routing.module.ts` — `data.animationIndex` on each child route (unchanged from the legacy version, we still use it).
- `src/app/modules/home/layout/home-layout.component.ts` — just the component; all animation logic has been moved out.
- `src/app/modules/home/layout/home-layout.component.html` — the container is still there but it no longer has the `[@trigger]` binding.
- `src/app/modules/home/layout/home-layout.component.scss` — `view-transition-name: home-content` on `.route-container`.
- `src/styles.scss` — keyframes and `::view-transition-*` rules for direction and clipping.
