import { computed, watch, defineComponent, ref, onMounted, onBeforeUnmount, pushScopeId, popScopeId, openBlock, createBlock, renderSlot, withScopeId } from 'vue';

const intersectionHandler = (isIntersectingFn, isInView) => function handleIntersection(entries) {
  entries.forEach(entry => {
    isIntersectingFn(entry, isInView);
  });
};

function observeElement(element, isInView, isIntersectingFn, options) {
  console.log(element);
  const handleIntersection = intersectionHandler(isIntersectingFn, isInView);
  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(element);
}

var useIntersectionObserver = {
  observeElement
};

let handler;

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
};

function apply(el, animation, repeat, isInView, scrollDirection) {
  // console.log(targetElement, propAnimation, propsRepeat)
  const animationClass = computed(() => {
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
  watch([isInView, scrollDirection], (newValues, previousValues) => {
    const [isInView, scrollDirection] = newValues;

    if (!repeat && isDirectionAgnostic()) {
      console.log('No Repeat & isDirectionAgnostic: true');
      return;
    } else if (!isInView) {
      console.log('Not in view');
      el.classList.remove(animationClass.value);
    } else if (isBiDirectional()) {
      console.log('isBiDirectional');
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
};

var script = defineComponent({
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
    const target = ref(null);
    const isInView = ref(false);
    const scrollDirection = ref('down');
    onMounted(() => {
      console.log(target.value);
      useAnimateInView.apply(target.value, props.animation, props.repeat, isInView, scrollDirection);
    });
    onBeforeUnmount(() => useAnimateInView.cleanup());
    return {
      target,
      isInView,
      scrollDirection
    };
  }

});

const _withId = /*#__PURE__*/withScopeId("data-v-679b8a2b");

pushScopeId("data-v-679b8a2b");

const _hoisted_1 = {
  class: "transition-all duration-1000",
  ref: "target"
};

popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("div", _hoisted_1, [renderSlot(_ctx.$slots, "default")], 512
  /* NEED_PATCH */
  );
});

script.render = render;
script.__scopeId = "data-v-679b8a2b";
script.__file = "src/components/AnimateInView.vue";

const animateInView = {
  mounted(el, binding) {
    console.log(binding);
    const isInView = ref(false);
    const scrollDirection = ref('down');
    const animation = binding.value;
    const repeat = binding.modifiers.repeat || false;
    useAnimateInView.apply(el, animation, repeat, isInView, scrollDirection);
  },

  beforeUnmount() {
    useAnimateInView.cleanup();
  }

};

const vue3AnimateInView = {
  install: (app, options) => {
    app.directive('animate-inview', animateInView);
    app.component('animate-in-view', script);
  }
};
// export { default as AnimateInViewDirective } from '@/directives/AnimateInView'

export default vue3AnimateInView;
export { script as AnimateInViewComponent, animateInView as AnimateInViewDirective };
