<!-- # animate-in-view

[![npm](https://img.shields.io/npm/dt/@neeravp/vue-3-animate-in-view.svg)]() -->

A simple Vue3 directive and a wrapper component to animate elements as they appear in viewport with TypeScript

## Installation

```sh
npm install @neeravp/vue-3-animate-in-view
# or
yarn add @neeravp/vue-3-animate-in-view
```

## Setup

Import to your `Vue` application

**Directive**

```javascript
import { createApp } from "vue";
import { AnimateInViewDirective } from "@neeravp/vue-3-animate-in-view";

const app = createApp({
  /*** options */
});
app.directive("animate-inview", AnimateInViewDirective);

app.mount("#app");
```

Directive can then be used normally on any element

```html
<div
  v-animate-inview="'fadeInSlide'"
  class="w-1/2 h-96 bg-gray-500 mx-auto opacity-0"
></div>
```

**Component**

```javascript
import { createApp } from "vue";
import { AnimateInViewComponent } from "@neeravp/vue-3-animate-in-view";

const app = createApp({
  /*** options */
});
app.component("animate-in-view", AnimateInViewComponent);

app.mount("#app");
```

Component can be used anywhere in the app now

```html
<animate-in-view animation="fadeInSlide">
  <div class="w-1/2 h-96 bg-red-500 mx-auto"></div>
</animate-in-view>
```

## Usage

Say we have declared two animations and classes to apply the animations

```html
<style>
  .fadeInSlide {
    animation: fadeInSlide 1s ease forwards 0.3s;
  }
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translate3d(10%, 10%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .fade {
    animation: fade 1s ease forwards;
  }

  @keyframes fade {
    to {
      opacity: 0.25;
    }
  }
</style>
```

Pass the desired class as a string literal (in single quotes) in your `Vue` template:

```html
<div v-animate-inview="'fade'">Animate me once upon scroll</div>
```

### Scroll Direction

To apply animation only on specific scroll direction,

**_Directive:_** pass the value as object

**_Component:_** pass an object to the `animation` prop.

On Downward scroll: the animation will only trigger the first time when scrolling down while element comes into the viewport.

```html
<!-- Directive -->
<div v-animate-inview="{down: 'fade'}">
  Animation will be triggered once while scrolling down when the element enters
  the viewport
</div>

<!-- Component -->
<animate-in-view :animation="{down: 'fade'}">
  <div>
    Animation will be triggered once while scrolling down when the element
    enters the viewport
  </div>
</animate-in-view>
```

On upward scroll: the animation will only trigger the first time when scrolling up while element comes into the viewport.

```html
<!-- Directive -->
<div v-animate-inview="{up: 'fadeInSlide'}">
  Animation will be triggered once while scrolling up when the element enters
  the viewport
</div>

<!-- Component -->
<animate-in-view :animation="{up: 'fadeInSlide'}">
  <div>
    Animation will be triggered once while scrolling up when the element enters
    the viewport
  </div>
</animate-in-view>
```

### Repeat Modifier and Prop

Note that by default the animation will only trigger once: the first time the element scrolled into view.

To repeat animation everytime the element is scrolled into view:

**_Directive:_** use the `repeat` modifier

**_Component:_** pass the `repeat` prop

```html
<!-- Directive -->
<div v-animate-inview.repeat="'fade'">Animate me upon scroll forever</div>

<!-- Component -->
<animate-in-view animation="'fade'" repeat>
  <div>Animate me upon scroll forever</div>
</animate-in-view>
```

To repeat the animation _everytime while scrolling down_

**_Directive:_** add the `repeat` modifier

**_Component:_** pass `repeat` as prop

```html
<!-- Directive -->
<div v-animate-inview.repeat="{down: 'fade'}">
  Animation will be triggered while scrolling down when the element enters the
  viewport
</div>

<!-- Component -->
<animate-in-view :animation="{down: 'fade'}" repeat>
  <div>
    Animation will be triggered while scrolling down when the element enters the
    viewport
  </div>
</animate-in-view>
```

### Multiple animations

Different animations can be used for each direction:

```html
<!-- Directive -->
<div v-animate-inview="{down: 'fade', up: 'fadeInSlide' }">
  Animation will be triggered whenever element enters the viewport, scrolling in
  any direction
</div>

<!-- Component -->
<animate-in-view :animation="{down: 'fade', up: 'fadeInSlide' }">
  <div>
    Animation will be triggered whenever element enters the viewport, scrolling
    in any direction
  </div>
</animate-in-view>
```

Note that by providing both `up` and `down` directions,

**_Directive:_** the `repeat` modifier is implicitly set.

**_Component:_** value of `repeat` prop is set to true implicitly

<!-- ## Demo -->

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
