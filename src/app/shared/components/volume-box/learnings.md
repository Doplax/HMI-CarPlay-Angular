Things I've Learned

# Purpose and Importance of HostBinding
HostBinding is used to apply effects to the parent container of the component. Therefore, we use HostBinding to apply effects on it. In my case, it was useful to apply a class that, through a transition, changes the z-index of the host, thus hiding and showing the box to avoid blocking the buttons.

# Usage of Transition

```css
transition: z-index 2s 2s, transform 0.5s 2s;
```

```css
transition: [property] [duration] [timing function] [delay];
```

**Property (`z-index`)**: This is the CSS property that will be animated.
**Duration (`2s`)**: This is the amount of time the animation will take, in this case, 2 seconds.
**Delay (`2s`)**: This is the time the animation will wait before starting, in this case, 2 seconds.

# Creation of the volume.service and its Implementation
On one hand, I learned to alter the value of a "local" variable in the component through a subscription (using asObservable from the service) to use it to trigger changes in the view.

# Use of Conditional ngClass
Using a Boolean to activate or deactivate a class from the view.
