
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
```javascript
import { createApp } from 'vue'
import Vue3AnimateInView from '@neeravp/vue-3-animate-in-view'

const app = createApp({/*** options */})
app.use(Vue3AnimateInView)
...
app.mount('#app')
```

## Usage
Say we have declared two animations and classes to apply the animations
```html
<style>
.fadeInSlide { animation: fadeInSlide 1s ease forwards 0.3s; }
@keyframes fadeInSlide {
    from { opacity: 0; transform: translate3d(10%, 10%, 0); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
}

.fade { animation: fade 1s ease forwards; }

@keyframes fade {
    to { opacity: 0.25; }
}
</style>
```

Pass the desired class as a string literal (in single quotes) in your `Vue` template:
```html
<div v-animate-inview="'fade'">Animate me once upon scroll</div>
```

### Scroll Direction
To apply animation only on specific scroll direction,

***Directive:*** pass the value as object

***Component:*** pass an object to the `animation` prop.

On Downward scroll: the animation will only trigger the first time when scrolling down while element comes into the viewport.

```html
<!-- Directive -->
<div v-animate-inview="{down: 'fade'}">Animation will be triggered once while scrolling down when the element enters the viewport</div>

<!-- Component -->
<animate-in-view :animation="{down: 'fade'}">
    <div>Animation will be triggered once while scrolling down when the element enters the viewport</div>
</animate-in-view>
```
On upward scroll: the animation will only trigger the first time when scrolling up while element comes into the viewport.
```html
<!-- Directive -->
<div v-animate-inview="{up: 'fadeInSlide'}">Animation will be triggered once while scrolling up when the element enters the viewport</div>

<!-- Component -->
<animate-in-view :animation="{up: 'fadeInSlide'}">
    <div>Animation will be triggered once while scrolling up when the element enters the viewport</div>
</animate-in-view>
```

### Repeat Modifier and Prop
Note that by default the animation will only trigger once: the first time the element scrolled into view.

To repeat animation everytime the element is scrolled into view:

***Directive:*** use the `repeat` modifier

***Component:*** pass the `repeat` prop
```html
<!-- Directive -->
<div v-animate-inview.repeat="'fade'">Animate me upon scroll forever</div>

<!-- Component -->
<animate-in-view animation="'fade'" repeat>
    <div>Animate me upon scroll forever</div>
</animate-in-view>
```

To repeat the animation *everytime while scrolling down*

***Directive:*** add the `repeat` modifier

***Component:*** pass `repeat` as prop

```html
<!-- Directive -->
<div v-animate-inview.repeat="{down: 'fade'}">Animation will be triggered while scrolling down when the element enters the viewport</div>

<!-- Component -->
<animate-in-view :animation="{down: 'fade'}" repeat>
    <div>Animation will be triggered while scrolling down when the element enters the viewport</div>
</animate-in-view>
```

### Multiple animations
Different animations can be used for each direction:
```html
<!-- Directive -->
<div v-animate-inview="{down: 'fade', up: 'fadeInSlide' }">Animation will be triggered whenever element enters the viewport, scrolling in any direction</div>

<!-- Component -->
<animate-in-view :animation="{down: 'fade', up: 'fadeInSlide' }">
    <div>Animation will be triggered whenever element enters the viewport, scrolling in any direction</div>
</animate-in-view>
```
Note that by providing both `up` and `down` directions,

***Directive:*** the `repeat` modifier is implicitly set.

***Component:*** value of `repeat` prop is set to true implicitly

<!-- ## Demo -->

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
