'use strict';var vue=require('vue');const intersectionHandler = (isIntersectingFn, isInView) => function handleIntersection(entries) {
  entries.forEach(entry => {
    isIntersectingFn(entry, isInView);
  });
};

function observeElement(element, isInView, isIntersectingFn, options) {
  const handleIntersection = intersectionHandler(isIntersectingFn, isInView);
  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(element);
}

var useIntersectionObserver = {
  observeElement
};let handler;

function detectScrollDirection(scrollDetectionHandler) {
  let lastScrollTop = window.pageYOffset;
  let ticking = false;

  handler = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        // execute scrollDetectionHandler
        scrollDetectionHandler(lastScrollTop, currentScrollTop);
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handler);
}

function removeEventListener() {
  window.removeEventListener("scroll", handler);
}

var useScrollObserver = {
  detectScrollDirection,
  removeEventListener
};function apply(el, animation, repeat, isInView, scrollDirection) {
  // console.log(targetElement, propAnimation, propsRepeat)
  const animationClass = vue.computed(() => {
    let _animationClass = '';

    if (typeof animation === 'string') {
      _animationClass = animation;
    }

    if (typeof animation === 'object') {
      _animationClass = scrollDirection.value === 'down' ? animation.down : animation.up;
    }

    return _animationClass;
  });

  const scrollCallback = (lastScrollTop, currentScrollTop) => {
    scrollDirection.value = currentScrollTop < lastScrollTop ? 'up' : 'down';
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  const intersectCallback = (entry, isInView) => {
    if (entry.isIntersecting) {
      el.classList.add(animationClass.value);
      isInView.value = true;
    } else {
      // el.classList.remove(animationClass.value)
      isInView.value = false;
    }
  };

  const isDirectionAgnostic = () => {
    return typeof animation === 'string';
  };

  const isBiDirectional = () => {
    return !!(typeof animation === 'object' && animation.up !== '' && animation.down !== '');
  };

  useIntersectionObserver.observeElement(el, isInView, intersectCallback);
  useScrollObserver.detectScrollDirection(scrollCallback);
  vue.watch([isInView, scrollDirection], (newValues, previousValues) => {
    const [isInView, scrollDirection] = newValues;

    if (!repeat && isDirectionAgnostic()) {
      return;
    } else if (!isInView) {
      el.classList.remove(animationClass.value);
    } else if (isBiDirectional()) {
      animation = animation;

      if (scrollDirection === 'up') {
        el.classList.remove(animation.down);
        el.classList.add(animationClass.value);
      }

      if (scrollDirection === 'down') {
        el.classList.remove(animation.up);
        el.classList.add(animationClass.value);
      }
    }
  });
}

function cleanup() {
  useScrollObserver.removeEventListener();
}

var useAnimateInView = {
  apply,
  cleanup
};var script = vue.defineComponent({
  name: 'AnimateInView',
  props: {
    threshold: {
      type: Number,
      default: 10
    },
    animation: {
      type: [String, Object],
      default: "fadeInSlide"
    },
    repeat: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const target = vue.ref(null);
    const isInView = vue.ref(false);
    const scrollDirection = vue.ref('down');
    vue.onMounted(() => {
      useAnimateInView.apply(target.value, props.animation, props.repeat, isInView, scrollDirection);
    });
    vue.onBeforeUnmount(() => useAnimateInView.cleanup());
    return {
      target,
      isInView,
      scrollDirection
    };
  }

});const _withId = /*#__PURE__*/vue.withScopeId("data-v-679b8a2b");

vue.pushScopeId("data-v-679b8a2b");

const _hoisted_1 = {
  class: "transition-all duration-1000",
  ref: "target"
};

vue.popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [vue.renderSlot(_ctx.$slots, "default")], 512
  /* NEED_PATCH */
  );
});function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = "\n.transition-all[data-v-679b8a2b] {\n    transition-property: all;\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transition-duration: 150ms;\n}\n.duration-1000[data-v-679b8a2b] {\n    transition-duration: 1000ms;\n}\n";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-679b8a2b";
script.__file = "src/components/AnimateInView.vue";const animateInView = {
  mounted(el, binding) {
    const isInView = vue.ref(false);
    const scrollDirection = vue.ref('down');
    const animation = binding.value;
    const repeat = binding.modifiers.repeat || false;
    useAnimateInView.apply(el, animation, repeat, isInView, scrollDirection);
  },

  beforeUnmount() {
    useAnimateInView.cleanup();
  }

};const vue3AnimateInView = {
  install: (app, options) => {
    app.directive('animate-inview', animateInView);
    app.component('animate-in-view', script);
  }
};
// export { default as AnimateInViewDirective } from '@/directives/AnimateInView'
var components=/*#__PURE__*/Object.freeze({__proto__:null,AnimateInViewComponent: script});var directives=/*#__PURE__*/Object.freeze({__proto__:null,AnimateInViewDirective: animateInView});// iife/cjs usage extends esm default export - so import it all
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(([componentName, component]) => {
  if (componentName !== 'default') {
    const key = componentName;
    const val = component;
    vue3AnimateInView[key] = val;
  }
});
Object.entries(directives).forEach(([directiveName, directive]) => {
  if (directiveName !== 'default') {
    const key = directiveName;
    const val = directive;
    vue3AnimateInView[key] = val;
  }
});module.exports=vue3AnimateInView;