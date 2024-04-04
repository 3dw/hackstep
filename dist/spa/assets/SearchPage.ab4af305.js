import { k as createComponent, n as onBeforeUnmount, h, $ as Transition, r as ref, c as computed, G as withDirectives, g as getCurrentInstance, a3 as createDirective, C as client, an as getModifierDirections, p as noop, ao as shouldStart, ap as leftClick, a4 as addEvt, aq as preventDraggable, a6 as position, B as stopAndPrevent, ar as clearSelection, a5 as cleanEvt, w as watch, q as nextTick, l as hSlot, as as KeepAlive, i as inject, u as emptyRenderFn, at as stepperKey, y as useDarkProps, z as useDark, L as provide, O as hMergeSlot, I as hDir, _ as _export_sfc, d as defineComponent, al as useRoute, o as onMounted, Q as openBlock, R as createBlock, S as withCtx, f as createVNode, a7 as createElementBlock, a8 as renderList, F as Fragment, U as createBaseVNode, a9 as toDisplayString } from "./index.f08ad2f1.js";
import { Q as QIcon, R as Ripple, b as getNormalizedVNodes } from "./vm.b069c695.js";
import { Q as QPage } from "./QPage.a456cd1e.js";
import "./use-size.cd9ed164.js";
var QSlideTransition = createComponent({
  name: "QSlideTransition",
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit }) {
    let animating = false, doneFn, element;
    let timer = null, timerFallback = null, animListener, lastEvent;
    function cleanup() {
      doneFn && doneFn();
      doneFn = null;
      animating = false;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (timerFallback !== null) {
        clearTimeout(timerFallback);
        timerFallback = null;
      }
      element !== void 0 && element.removeEventListener("transitionend", animListener);
      animListener = null;
    }
    function begin(el, height, done) {
      if (height !== void 0) {
        el.style.height = `${height}px`;
      }
      el.style.transition = `height ${props.duration}ms cubic-bezier(.25, .8, .50, 1)`;
      animating = true;
      doneFn = done;
    }
    function end(el, event) {
      el.style.overflowY = null;
      el.style.height = null;
      el.style.transition = null;
      cleanup();
      event !== lastEvent && emit(event);
    }
    function onEnter(el, done) {
      let pos = 0;
      element = el;
      if (animating === true) {
        cleanup();
        pos = el.offsetHeight === el.scrollHeight ? 0 : void 0;
      } else {
        lastEvent = "hide";
        el.style.overflowY = "hidden";
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = `${el.scrollHeight}px`;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "show");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    function onLeave(el, done) {
      let pos;
      element = el;
      if (animating === true) {
        cleanup();
      } else {
        lastEvent = "show";
        el.style.overflowY = "hidden";
        pos = el.scrollHeight;
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = 0;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "hide");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    onBeforeUnmount(() => {
      animating === true && cleanup();
    });
    return () => h(Transition, {
      css: false,
      appear: props.appear,
      onEnter,
      onLeave
    }, slots.default);
  }
});
var StepHeader = createComponent({
  name: "StepHeader",
  props: {
    stepper: {},
    step: {},
    goToPanel: Function
  },
  setup(props, { attrs }) {
    const { proxy: { $q } } = getCurrentInstance();
    const blurRef = ref(null);
    const isActive = computed(() => props.stepper.modelValue === props.step.name);
    const isDisable = computed(() => {
      const opt = props.step.disable;
      return opt === true || opt === "";
    });
    const isError = computed(() => {
      const opt = props.step.error;
      return opt === true || opt === "";
    });
    const isDone = computed(() => {
      const opt = props.step.done;
      return isDisable.value === false && (opt === true || opt === "");
    });
    const headerNav = computed(() => {
      const opt = props.step.headerNav, nav = opt === true || opt === "" || opt === void 0;
      return isDisable.value === false && props.stepper.headerNav && nav;
    });
    const hasPrefix = computed(() => {
      return props.step.prefix && (isActive.value === false || props.stepper.activeIcon === "none") && (isError.value === false || props.stepper.errorIcon === "none") && (isDone.value === false || props.stepper.doneIcon === "none");
    });
    const icon = computed(() => {
      const defaultIcon = props.step.icon || props.stepper.inactiveIcon;
      if (isActive.value === true) {
        const icon2 = props.step.activeIcon || props.stepper.activeIcon;
        return icon2 === "none" ? defaultIcon : icon2 || $q.iconSet.stepper.active;
      }
      if (isError.value === true) {
        const icon2 = props.step.errorIcon || props.stepper.errorIcon;
        return icon2 === "none" ? defaultIcon : icon2 || $q.iconSet.stepper.error;
      }
      if (isDisable.value === false && isDone.value === true) {
        const icon2 = props.step.doneIcon || props.stepper.doneIcon;
        return icon2 === "none" ? defaultIcon : icon2 || $q.iconSet.stepper.done;
      }
      return defaultIcon;
    });
    const color = computed(() => {
      const errorColor = isError.value === true ? props.step.errorColor || props.stepper.errorColor : void 0;
      if (isActive.value === true) {
        const color2 = props.step.activeColor || props.stepper.activeColor || props.step.color;
        return color2 !== void 0 ? color2 : errorColor;
      }
      if (errorColor !== void 0) {
        return errorColor;
      }
      if (isDisable.value === false && isDone.value === true) {
        return props.step.doneColor || props.stepper.doneColor || props.step.color || props.stepper.inactiveColor;
      }
      return props.step.color || props.stepper.inactiveColor;
    });
    const classes = computed(() => {
      return "q-stepper__tab col-grow flex items-center no-wrap relative-position" + (color.value !== void 0 ? ` text-${color.value}` : "") + (isError.value === true ? " q-stepper__tab--error q-stepper__tab--error-with-" + (hasPrefix.value === true ? "prefix" : "icon") : "") + (isActive.value === true ? " q-stepper__tab--active" : "") + (isDone.value === true ? " q-stepper__tab--done" : "") + (headerNav.value === true ? " q-stepper__tab--navigation q-focusable q-hoverable" : "") + (isDisable.value === true ? " q-stepper__tab--disabled" : "");
    });
    const ripple = computed(() => props.stepper.headerNav !== true ? false : headerNav.value);
    function onActivate() {
      blurRef.value !== null && blurRef.value.focus();
      isActive.value === false && props.goToPanel(props.step.name);
    }
    function onKeyup(e) {
      if (e.keyCode === 13 && isActive.value === false) {
        props.goToPanel(props.step.name);
      }
    }
    return () => {
      const data = { class: classes.value };
      if (headerNav.value === true) {
        data.onClick = onActivate;
        data.onKeyup = onKeyup;
        Object.assign(
          data,
          isDisable.value === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: attrs.tabindex || 0 }
        );
      }
      const child = [
        h("div", { class: "q-focus-helper", tabindex: -1, ref: blurRef }),
        h("div", { class: "q-stepper__dot row flex-center q-stepper__line relative-position" }, [
          h("span", { class: "row flex-center" }, [
            hasPrefix.value === true ? props.step.prefix : h(QIcon, { name: icon.value })
          ])
        ])
      ];
      if (props.step.title !== void 0 && props.step.title !== null) {
        const content = [
          h("div", { class: "q-stepper__title" }, props.step.title)
        ];
        if (props.step.caption !== void 0 && props.step.caption !== null) {
          content.push(
            h("div", { class: "q-stepper__caption" }, props.step.caption)
          );
        }
        child.push(
          h("div", {
            class: "q-stepper__label q-stepper__line relative-position"
          }, content)
        );
      }
      return withDirectives(
        h("div", data, child),
        [[Ripple, ripple.value]]
      );
    };
  }
});
function parseArg(arg) {
  const data = [0.06, 6, 50];
  if (typeof arg === "string" && arg.length) {
    arg.split(":").forEach((val, index) => {
      const v = parseFloat(val);
      v && (data[index] = v);
    });
  }
  return data;
}
var TouchSwipe = createDirective(
  {
    name: "touch-swipe",
    beforeMount(el, { value, arg, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) {
        return;
      }
      const mouseCapture = modifiers.mouseCapture === true ? "Capture" : "";
      const ctx = {
        handler: value,
        sensitivity: parseArg(arg),
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", `notPassive${mouseCapture}`],
              [document, "mouseup", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "notPassiveCapture"],
              [target, "touchend", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          const pos = position(evt);
          ctx.event = {
            x: pos.left,
            y: pos.top,
            time: Date.now(),
            mouse: mouseEvent === true,
            dir: false
          };
        },
        move(evt) {
          if (ctx.event === void 0) {
            return;
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            return;
          }
          const time = Date.now() - ctx.event.time;
          if (time === 0) {
            return;
          }
          const pos = position(evt), distX = pos.left - ctx.event.x, absX = Math.abs(distX), distY = pos.top - ctx.event.y, absY = Math.abs(distY);
          if (ctx.event.mouse !== true) {
            if (absX < ctx.sensitivity[1] && absY < ctx.sensitivity[1]) {
              ctx.end(evt);
              return;
            }
          } else if (window.getSelection().toString() !== "") {
            ctx.end(evt);
            return;
          } else if (absX < ctx.sensitivity[2] && absY < ctx.sensitivity[2]) {
            return;
          }
          const velX = absX / time, velY = absY / time;
          if (ctx.direction.vertical === true && absX < absY && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = distY < 0 ? "up" : "down";
          }
          if (ctx.direction.horizontal === true && absX > absY && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = distX < 0 ? "left" : "right";
          }
          if (ctx.direction.up === true && absX < absY && distY < 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "up";
          }
          if (ctx.direction.down === true && absX < absY && distY > 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "down";
          }
          if (ctx.direction.left === true && absX > absY && distX < 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "left";
          }
          if (ctx.direction.right === true && absX > absY && distX > 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "right";
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            if (ctx.event.mouse === true) {
              document.body.classList.add("no-pointer-events--children");
              document.body.classList.add("non-selectable");
              clearSelection();
              ctx.styleCleanup = (withDelay) => {
                ctx.styleCleanup = void 0;
                document.body.classList.remove("non-selectable");
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelay === true) {
                  setTimeout(remove, 50);
                } else {
                  remove();
                }
              };
            }
            ctx.handler({
              evt,
              touch: ctx.event.mouse !== true,
              mouse: ctx.event.mouse,
              direction: ctx.event.dir,
              duration: time,
              distance: {
                x: absX,
                y: absY
              }
            });
          } else {
            ctx.end(evt);
          }
        },
        end(evt) {
          if (ctx.event === void 0) {
            return;
          }
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          ctx.styleCleanup !== void 0 && ctx.styleCleanup(true);
          evt !== void 0 && ctx.event.dir !== false && stopAndPrevent(evt);
          ctx.event = void 0;
        }
      };
      el.__qtouchswipe = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof bindings.value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup !== void 0 && ctx.styleCleanup();
        delete el.__qtouchswipe;
      }
    }
  }
);
function useCache() {
  const cache = /* @__PURE__ */ new Map();
  return {
    getCache: function(key, obj) {
      return cache[key] === void 0 ? cache[key] = obj : cache[key];
    },
    getCacheWithFn: function(key, fn) {
      return cache[key] === void 0 ? cache[key] = fn() : cache[key];
    }
  };
}
const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};
const PanelWrapper$1 = {
  setup(_, { slots }) {
    return () => h("div", {
      class: "q-panel scroll",
      role: "tabpanel"
    }, hSlot(slots.default));
  }
};
const usePanelProps = {
  modelValue: {
    required: true
  },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [String, Array, RegExp],
  keepAliveExclude: [String, Array, RegExp],
  keepAliveMax: Number
};
const usePanelEmits = ["update:modelValue", "beforeTransition", "transition"];
function usePanel() {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCacheWithFn } = useCache();
  let panels, forcedPanelTransition;
  const panelIndex = ref(null);
  const panelTransition = ref(null);
  function onSwipe(evt) {
    const dir = props.vertical === true ? "up" : "left";
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }
  const panelDirectives = computed(() => {
    return [[
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ]];
  });
  const transitionPrev = computed(
    () => props.transitionPrev || `slide-${props.vertical === true ? "down" : "right"}`
  );
  const transitionNext = computed(
    () => props.transitionNext || `slide-${props.vertical === true ? "up" : "left"}`
  );
  const transitionStyle = computed(
    () => `--q-transition-duration: ${props.transitionDuration}ms`
  );
  const contentKey = computed(() => typeof props.modelValue === "string" || typeof props.modelValue === "number" ? props.modelValue : String(props.modelValue));
  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));
  const needsUniqueKeepAliveWrapper = computed(
    () => props.keepAliveInclude !== void 0 || props.keepAliveExclude !== void 0
  );
  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true ? getPanelIndex(newVal) : -1;
    if (forcedPanelTransition !== true) {
      updatePanelTransition(
        index === -1 ? 0 : index < getPanelIndex(oldVal) ? -1 : 1
      );
    }
    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit("beforeTransition", newVal, oldVal);
      nextTick(() => {
        emit("transition", newVal, oldVal);
      });
    }
  });
  function nextPanel() {
    goToPanelByOffset(1);
  }
  function previousPanel() {
    goToPanelByOffset(-1);
  }
  function goToPanel(name) {
    emit("update:modelValue", name);
  }
  function isValidPanelName(name) {
    return name !== void 0 && name !== null && name !== "";
  }
  function getPanelIndex(name) {
    return panels.findIndex((panel) => {
      return panel.props.name === name && panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function getEnabledPanels() {
    return panels.filter((panel) => {
      return panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function updatePanelTransition(direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1 ? "q-transition--" + (direction === -1 ? transitionPrev.value : transitionNext.value) : null;
    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }
  function goToPanelByOffset(direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;
    while (index > -1 && index < panels.length) {
      const opt = panels[index];
      if (opt !== void 0 && opt.props.disable !== "" && opt.props.disable !== true) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit("update:modelValue", opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return;
      }
      index += direction;
    }
    if (props.infinite === true && panels.length !== 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }
  function updatePanelIndex() {
    const index = getPanelIndex(props.modelValue);
    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }
    return true;
  }
  function getPanelContentChild() {
    const panel = isValidPanelName(props.modelValue) === true && updatePanelIndex() && panels[panelIndex.value];
    return props.keepAlive === true ? [
      h(KeepAlive, keepAliveProps.value, [
        h(
          needsUniqueKeepAliveWrapper.value === true ? getCacheWithFn(contentKey.value, () => ({ ...PanelWrapper$1, name: contentKey.value })) : PanelWrapper$1,
          { key: contentKey.value, style: transitionStyle.value },
          () => panel
        )
      ])
    ] : [
      h("div", {
        class: "q-panel scroll",
        style: transitionStyle.value,
        key: contentKey.value,
        role: "tabpanel"
      }, [panel])
    ];
  }
  function getPanelContent() {
    if (panels.length === 0) {
      return;
    }
    return props.animated === true ? [h(Transition, { name: panelTransition.value }, getPanelContentChild)] : getPanelContentChild();
  }
  function updatePanelsList(slots) {
    panels = getNormalizedVNodes(
      hSlot(slots.default, [])
    ).filter(
      (panel) => panel.props !== null && panel.props.slot === void 0 && isValidPanelName(panel.props.name) === true
    );
    return panels.length;
  }
  function getPanels() {
    return panels;
  }
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });
  return {
    panelIndex,
    panelDirectives,
    updatePanelsList,
    updatePanelIndex,
    getPanelContent,
    getEnabledPanels,
    getPanels,
    isValidPanelName,
    keepAliveProps,
    needsUniqueKeepAliveWrapper,
    goToPanelByOffset,
    goToPanel,
    nextPanel,
    previousPanel
  };
}
function getStepWrapper(slots) {
  return h("div", {
    class: "q-stepper__step-content"
  }, [
    h("div", {
      class: "q-stepper__step-inner"
    }, hSlot(slots.default))
  ]);
}
const PanelWrapper = {
  setup(_, { slots }) {
    return () => getStepWrapper(slots);
  }
};
var QStep = createComponent({
  name: "QStep",
  props: {
    ...usePanelChildProps,
    icon: String,
    color: String,
    title: {
      type: String,
      required: true
    },
    caption: String,
    prefix: [String, Number],
    doneIcon: String,
    doneColor: String,
    activeIcon: String,
    activeColor: String,
    errorIcon: String,
    errorColor: String,
    headerNav: {
      type: Boolean,
      default: true
    },
    done: Boolean,
    error: Boolean,
    onScroll: [Function, Array]
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $stepper = inject(stepperKey, emptyRenderFn);
    if ($stepper === emptyRenderFn) {
      console.error("QStep needs to be a child of QStepper");
      return emptyRenderFn;
    }
    const { getCacheWithFn } = useCache();
    const rootRef = ref(null);
    const isActive = computed(() => $stepper.value.modelValue === props.name);
    const scrollEvent = computed(() => $q.platform.is.ios !== true && $q.platform.is.chrome === true || isActive.value !== true || $stepper.value.vertical !== true ? {} : {
      onScroll(e) {
        const { target } = e;
        if (target.scrollTop > 0) {
          target.scrollTop = 0;
        }
        props.onScroll !== void 0 && emit("scroll", e);
      }
    });
    const contentKey = computed(() => typeof props.name === "string" || typeof props.name === "number" ? props.name : String(props.name));
    function getStepContent() {
      const vertical = $stepper.value.vertical;
      if (vertical === true && $stepper.value.keepAlive === true) {
        return h(
          KeepAlive,
          $stepper.value.keepAliveProps.value,
          isActive.value === true ? [
            h(
              $stepper.value.needsUniqueKeepAliveWrapper.value === true ? getCacheWithFn(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value })) : PanelWrapper,
              { key: contentKey.value },
              slots.default
            )
          ] : void 0
        );
      }
      return vertical !== true || isActive.value === true ? getStepWrapper(slots) : void 0;
    }
    return () => h(
      "div",
      { ref: rootRef, class: "q-stepper__step", role: "tabpanel", ...scrollEvent.value },
      $stepper.value.vertical === true ? [
        h(StepHeader, {
          stepper: $stepper.value,
          step: props,
          goToPanel: $stepper.value.goToPanel
        }),
        $stepper.value.animated === true ? h(QSlideTransition, getStepContent) : getStepContent()
      ] : [getStepContent()]
    );
  }
});
const camelRE = /(-\w)/g;
function camelizeProps(props) {
  const acc = {};
  for (const key in props) {
    const newKey = key.replace(camelRE, (m) => m[1].toUpperCase());
    acc[newKey] = props[key];
  }
  return acc;
}
var QStepper = createComponent({
  name: "QStepper",
  props: {
    ...useDarkProps,
    ...usePanelProps,
    flat: Boolean,
    bordered: Boolean,
    alternativeLabels: Boolean,
    headerNav: Boolean,
    contracted: Boolean,
    headerClass: String,
    inactiveColor: String,
    inactiveIcon: String,
    doneIcon: String,
    doneColor: String,
    activeIcon: String,
    activeColor: String,
    errorIcon: String,
    errorColor: String
  },
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const {
      updatePanelsList,
      isValidPanelName,
      updatePanelIndex,
      getPanelContent,
      getPanels,
      panelDirectives,
      goToPanel,
      keepAliveProps,
      needsUniqueKeepAliveWrapper
    } = usePanel();
    provide(stepperKey, computed(() => ({
      goToPanel,
      keepAliveProps,
      needsUniqueKeepAliveWrapper,
      ...props
    })));
    const classes = computed(
      () => `q-stepper q-stepper--${props.vertical === true ? "vertical" : "horizontal"}` + (props.flat === true ? " q-stepper--flat" : "") + (props.bordered === true ? " q-stepper--bordered" : "") + (isDark.value === true ? " q-stepper--dark q-dark" : "")
    );
    const headerClasses = computed(
      () => `q-stepper__header row items-stretch justify-between q-stepper__header--${props.alternativeLabels === true ? "alternative" : "standard"}-labels` + (props.flat === false || props.bordered === true ? " q-stepper__header--border" : "") + (props.contracted === true ? " q-stepper__header--contracted" : "") + (props.headerClass !== void 0 ? ` ${props.headerClass}` : "")
    );
    function getContent() {
      const top = hSlot(slots.message, []);
      if (props.vertical === true) {
        isValidPanelName(props.modelValue) && updatePanelIndex();
        const content = h("div", {
          class: "q-stepper__content"
        }, hSlot(slots.default));
        return top === void 0 ? [content] : top.concat(content);
      }
      return [
        h(
          "div",
          { class: headerClasses.value },
          getPanels().map((panel) => {
            const step = camelizeProps(panel.props);
            return h(StepHeader, {
              key: step.name,
              stepper: props,
              step,
              goToPanel
            });
          })
        ),
        top,
        hDir(
          "div",
          { class: "q-stepper__content q-panel-parent" },
          getPanelContent(),
          "cont",
          props.swipeable,
          () => panelDirectives.value
        )
      ];
    }
    return () => {
      updatePanelsList(slots);
      return h("div", {
        class: classes.value
      }, hMergeSlot(slots.navigation, getContent()));
    };
  }
});
const _sfc_main = defineComponent({
  name: "StepsViewer",
  setup() {
    const step = ref(1);
    const steps = ref([
      { name: "Step1", id: 1 },
      { name: "Step2", id: 2 },
      { name: "Step3", id: 3 }
    ]);
    const route = useRoute();
    onMounted(() => {
      if (route.params.steps) {
        const routeSteps = route.params.steps.split(/%20|\s/);
        steps.value = routeSteps.map((name, idx) => ({
          id: idx + 1,
          name: decodeURIComponent(name.replace(/_/g, " "))
        }));
      }
    });
    watch(() => route.params.steps, (newSteps) => {
      if (newSteps) {
        const routeSteps = newSteps.split(/%20|\s/);
        steps.value = routeSteps.map((name, idx) => ({
          id: idx,
          name,
          editing: false
        }));
      }
    });
    const openInNewTab = (name) => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(name)}`;
      window.open(url, "_blank");
    };
    return {
      step,
      steps,
      openInNewTab
    };
  }
});
const _hoisted_1 = {
  class: "q-pa-md",
  style: { "height": "100%", "width": "100%" }
};
const _hoisted_2 = { style: { "text-decoration": "underline", "cursor": "pointer" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "flex flex-center" }, {
    default: withCtx(() => [
      createVNode(QStepper, {
        modelValue: _ctx.step,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.step = $event),
        vertical: "",
        color: "primary"
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.steps, (item) => {
            return openBlock(), createBlock(QStep, {
              style: { "min-width": "320px" },
              name: item.id.toString(),
              key: item.id,
              title: `\u5728Google\u4E0A\u641C\u8A62${item.name}`,
              icon: "search",
              clickable: "",
              onClick: ($event) => _ctx.openInNewTab(item.name)
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1, [
                  createBaseVNode("div", _hoisted_2, ' Click here to search "' + toDisplayString(item.name) + '" on Google ', 1)
                ])
              ]),
              _: 2
            }, 1032, ["name", "title", "onClick"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  });
}
var SearchPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "SearchPage.vue"]]);
export { SearchPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoUGFnZS5hYjRhZjMwNS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3N0ZXBwZXIvU3RlcEhlYWRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2RpcmVjdGl2ZXMvVG91Y2hTd2lwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWNhY2hlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcGFuZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3N0ZXBwZXIvUVN0ZXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3N0ZXBwZXIvUVN0ZXBwZXIuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvU2VhcmNoUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgb25CZWZvcmVVbm1vdW50LCBUcmFuc2l0aW9uIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTbGlkZVRyYW5zaXRpb24nLFxuXG4gIHByb3BzOiB7XG4gICAgYXBwZWFyOiBCb29sZWFuLFxuICAgIGR1cmF0aW9uOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAzMDBcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Nob3cnLCAnaGlkZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGxldCBhbmltYXRpbmcgPSBmYWxzZSwgZG9uZUZuLCBlbGVtZW50XG4gICAgbGV0IHRpbWVyID0gbnVsbCwgdGltZXJGYWxsYmFjayA9IG51bGwsIGFuaW1MaXN0ZW5lciwgbGFzdEV2ZW50XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIGRvbmVGbiAmJiBkb25lRm4oKVxuICAgICAgZG9uZUZuID0gbnVsbFxuICAgICAgYW5pbWF0aW5nID0gZmFsc2VcblxuICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lckZhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lckZhbGxiYWNrKVxuICAgICAgICB0aW1lckZhbGxiYWNrID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBlbGVtZW50ICE9PSB2b2lkIDAgJiYgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgYW5pbUxpc3RlbmVyID0gbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlZ2luIChlbCwgaGVpZ2h0LCBkb25lKSB7XG4gICAgICAvLyBoZXJlIG92ZXJmbG93WSBpcyAnaGlkZGVuJ1xuICAgICAgaWYgKGhlaWdodCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAkeyBoZWlnaHQgfXB4YFxuICAgICAgfVxuICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbiA9IGBoZWlnaHQgJHsgcHJvcHMuZHVyYXRpb24gfW1zIGN1YmljLWJlemllciguMjUsIC44LCAuNTAsIDEpYFxuXG4gICAgICBhbmltYXRpbmcgPSB0cnVlXG4gICAgICBkb25lRm4gPSBkb25lXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kIChlbCwgZXZlbnQpIHtcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9IG51bGxcbiAgICAgIGVsLnN0eWxlLmhlaWdodCA9IG51bGxcbiAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBudWxsXG4gICAgICBjbGVhbnVwKClcbiAgICAgIGV2ZW50ICE9PSBsYXN0RXZlbnQgJiYgZW1pdChldmVudClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVudGVyIChlbCwgZG9uZSkge1xuICAgICAgbGV0IHBvcyA9IDBcbiAgICAgIGVsZW1lbnQgPSBlbFxuXG4gICAgICAvLyBpZiBhbmltYXRpb25nIG92ZXJmbG93WSBpcyBhbHJlYWR5ICdoaWRkZW4nXG4gICAgICBpZiAoYW5pbWF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgIGNsZWFudXAoKVxuICAgICAgICBwb3MgPSBlbC5vZmZzZXRIZWlnaHQgPT09IGVsLnNjcm9sbEhlaWdodCA/IDAgOiB2b2lkIDBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnaGlkZSdcbiAgICAgICAgZWwuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbidcbiAgICAgIH1cblxuICAgICAgYmVnaW4oZWwsIHBvcywgZG9uZSlcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAkeyBlbC5zY3JvbGxIZWlnaHQgfXB4YFxuICAgICAgICBhbmltTGlzdGVuZXIgPSBldnQgPT4ge1xuICAgICAgICAgIHRpbWVyRmFsbGJhY2sgPSBudWxsXG5cbiAgICAgICAgICBpZiAoT2JqZWN0KGV2dCkgIT09IGV2dCB8fCBldnQudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICAgICAgZW5kKGVsLCAnc2hvdycpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhbmltTGlzdGVuZXIpXG4gICAgICAgIHRpbWVyRmFsbGJhY2sgPSBzZXRUaW1lb3V0KGFuaW1MaXN0ZW5lciwgcHJvcHMuZHVyYXRpb24gKiAxLjEpXG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25MZWF2ZSAoZWwsIGRvbmUpIHtcbiAgICAgIGxldCBwb3NcbiAgICAgIGVsZW1lbnQgPSBlbFxuXG4gICAgICBpZiAoYW5pbWF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgIGNsZWFudXAoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxhc3RFdmVudCA9ICdzaG93J1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIHNldCBvdmVyZmxvd1kgJ2hpZGRlbicgYmVmb3JlIGNhbGN1bGF0aW5nIHRoZSBoZWlnaHRcbiAgICAgICAgLy8gb3IgZWxzZSB3ZSBnZXQgc21hbGwgZGlmZmVyZW5jZXNcbiAgICAgICAgZWwuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbidcbiAgICAgICAgcG9zID0gZWwuc2Nyb2xsSGVpZ2h0XG4gICAgICB9XG5cbiAgICAgIGJlZ2luKGVsLCBwb3MsIGRvbmUpXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAwXG4gICAgICAgIGFuaW1MaXN0ZW5lciA9IGV2dCA9PiB7XG4gICAgICAgICAgdGltZXJGYWxsYmFjayA9IG51bGxcblxuICAgICAgICAgIGlmIChPYmplY3QoZXZ0KSAhPT0gZXZ0IHx8IGV2dC50YXJnZXQgPT09IGVsKSB7XG4gICAgICAgICAgICBlbmQoZWwsICdoaWRlJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGFuaW1MaXN0ZW5lcilcbiAgICAgICAgdGltZXJGYWxsYmFjayA9IHNldFRpbWVvdXQoYW5pbUxpc3RlbmVyLCBwcm9wcy5kdXJhdGlvbiAqIDEuMSlcbiAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgYW5pbWF0aW5nID09PSB0cnVlICYmIGNsZWFudXAoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaChUcmFuc2l0aW9uLCB7XG4gICAgICBjc3M6IGZhbHNlLFxuICAgICAgYXBwZWFyOiBwcm9wcy5hcHBlYXIsXG4gICAgICBvbkVudGVyLFxuICAgICAgb25MZWF2ZVxuICAgIH0sIHNsb3RzLmRlZmF1bHQpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3aXRoRGlyZWN0aXZlcywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBSaXBwbGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9SaXBwbGUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnU3RlcEhlYWRlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBzdGVwcGVyOiB7fSxcbiAgICBzdGVwOiB7fSxcbiAgICBnb1RvUGFuZWw6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGF0dHJzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgYmx1clJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgaXNBY3RpdmUgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGVwcGVyLm1vZGVsVmFsdWUgPT09IHByb3BzLnN0ZXAubmFtZSlcblxuICAgIGNvbnN0IGlzRGlzYWJsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG9wdCA9IHByb3BzLnN0ZXAuZGlzYWJsZVxuICAgICAgcmV0dXJuIG9wdCA9PT0gdHJ1ZSB8fCBvcHQgPT09ICcnXG4gICAgfSlcblxuICAgIGNvbnN0IGlzRXJyb3IgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBvcHQgPSBwcm9wcy5zdGVwLmVycm9yXG4gICAgICByZXR1cm4gb3B0ID09PSB0cnVlIHx8IG9wdCA9PT0gJydcbiAgICB9KVxuXG4gICAgY29uc3QgaXNEb25lID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgb3B0ID0gcHJvcHMuc3RlcC5kb25lXG4gICAgICByZXR1cm4gaXNEaXNhYmxlLnZhbHVlID09PSBmYWxzZSAmJiAob3B0ID09PSB0cnVlIHx8IG9wdCA9PT0gJycpXG4gICAgfSlcblxuICAgIGNvbnN0IGhlYWRlck5hdiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIG9wdCA9IHByb3BzLnN0ZXAuaGVhZGVyTmF2LFxuICAgICAgICBuYXYgPSBvcHQgPT09IHRydWUgfHwgb3B0ID09PSAnJyB8fCBvcHQgPT09IHZvaWQgMFxuXG4gICAgICByZXR1cm4gaXNEaXNhYmxlLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAmJiBwcm9wcy5zdGVwcGVyLmhlYWRlck5hdlxuICAgICAgICAmJiBuYXZcbiAgICB9KVxuXG4gICAgY29uc3QgaGFzUHJlZml4ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIHByb3BzLnN0ZXAucHJlZml4XG4gICAgICAgICYmIChpc0FjdGl2ZS52YWx1ZSA9PT0gZmFsc2UgfHwgcHJvcHMuc3RlcHBlci5hY3RpdmVJY29uID09PSAnbm9uZScpXG4gICAgICAgICYmIChpc0Vycm9yLnZhbHVlID09PSBmYWxzZSB8fCBwcm9wcy5zdGVwcGVyLmVycm9ySWNvbiA9PT0gJ25vbmUnKVxuICAgICAgICAmJiAoaXNEb25lLnZhbHVlID09PSBmYWxzZSB8fCBwcm9wcy5zdGVwcGVyLmRvbmVJY29uID09PSAnbm9uZScpXG4gICAgfSlcblxuICAgIGNvbnN0IGljb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkZWZhdWx0SWNvbiA9IHByb3BzLnN0ZXAuaWNvbiB8fCBwcm9wcy5zdGVwcGVyLmluYWN0aXZlSWNvblxuXG4gICAgICBpZiAoaXNBY3RpdmUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaWNvbiA9IHByb3BzLnN0ZXAuYWN0aXZlSWNvbiB8fCBwcm9wcy5zdGVwcGVyLmFjdGl2ZUljb25cbiAgICAgICAgcmV0dXJuIGljb24gPT09ICdub25lJ1xuICAgICAgICAgID8gZGVmYXVsdEljb25cbiAgICAgICAgICA6IGljb24gfHwgJHEuaWNvblNldC5zdGVwcGVyLmFjdGl2ZVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpY29uID0gcHJvcHMuc3RlcC5lcnJvckljb24gfHwgcHJvcHMuc3RlcHBlci5lcnJvckljb25cbiAgICAgICAgcmV0dXJuIGljb24gPT09ICdub25lJ1xuICAgICAgICAgID8gZGVmYXVsdEljb25cbiAgICAgICAgICA6IGljb24gfHwgJHEuaWNvblNldC5zdGVwcGVyLmVycm9yXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Rpc2FibGUudmFsdWUgPT09IGZhbHNlICYmIGlzRG9uZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpY29uID0gcHJvcHMuc3RlcC5kb25lSWNvbiB8fCBwcm9wcy5zdGVwcGVyLmRvbmVJY29uXG4gICAgICAgIHJldHVybiBpY29uID09PSAnbm9uZSdcbiAgICAgICAgICA/IGRlZmF1bHRJY29uXG4gICAgICAgICAgOiBpY29uIHx8ICRxLmljb25TZXQuc3RlcHBlci5kb25lXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0SWNvblxuICAgIH0pXG5cbiAgICBjb25zdCBjb2xvciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yQ29sb3IgPSBpc0Vycm9yLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuc3RlcC5lcnJvckNvbG9yIHx8IHByb3BzLnN0ZXBwZXIuZXJyb3JDb2xvclxuICAgICAgICA6IHZvaWQgMFxuXG4gICAgICBpZiAoaXNBY3RpdmUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBwcm9wcy5zdGVwLmFjdGl2ZUNvbG9yIHx8IHByb3BzLnN0ZXBwZXIuYWN0aXZlQ29sb3IgfHwgcHJvcHMuc3RlcC5jb2xvclxuICAgICAgICByZXR1cm4gY29sb3IgIT09IHZvaWQgMFxuICAgICAgICAgID8gY29sb3JcbiAgICAgICAgICA6IGVycm9yQ29sb3JcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvckNvbG9yICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGVycm9yQ29sb3JcbiAgICAgIH1cbiAgICAgIGlmIChpc0Rpc2FibGUudmFsdWUgPT09IGZhbHNlICYmIGlzRG9uZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gcHJvcHMuc3RlcC5kb25lQ29sb3IgfHwgcHJvcHMuc3RlcHBlci5kb25lQ29sb3IgfHwgcHJvcHMuc3RlcC5jb2xvciB8fCBwcm9wcy5zdGVwcGVyLmluYWN0aXZlQ29sb3JcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb3BzLnN0ZXAuY29sb3IgfHwgcHJvcHMuc3RlcHBlci5pbmFjdGl2ZUNvbG9yXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gJ3Etc3RlcHBlcl9fdGFiIGNvbC1ncm93IGZsZXggaXRlbXMtY2VudGVyIG5vLXdyYXAgcmVsYXRpdmUtcG9zaXRpb24nXG4gICAgICAgICsgKGNvbG9yLnZhbHVlICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgY29sb3IudmFsdWUgfWAgOiAnJylcbiAgICAgICAgKyAoaXNFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLXN0ZXBwZXJfX3RhYi0tZXJyb3IgcS1zdGVwcGVyX190YWItLWVycm9yLXdpdGgtJyArIChoYXNQcmVmaXgudmFsdWUgPT09IHRydWUgPyAncHJlZml4JyA6ICdpY29uJylcbiAgICAgICAgICA6ICcnKVxuICAgICAgICArIChpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zdGVwcGVyX190YWItLWFjdGl2ZScgOiAnJylcbiAgICAgICAgKyAoaXNEb25lLnZhbHVlID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX3RhYi0tZG9uZScgOiAnJylcbiAgICAgICAgKyAoaGVhZGVyTmF2LnZhbHVlID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX3RhYi0tbmF2aWdhdGlvbiBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAoaXNEaXNhYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX3RhYi0tZGlzYWJsZWQnIDogJycpXG4gICAgfSlcblxuICAgIGNvbnN0IHJpcHBsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnN0ZXBwZXIuaGVhZGVyTmF2ICE9PSB0cnVlXG4gICAgICAgID8gZmFsc2VcbiAgICAgICAgOiBoZWFkZXJOYXYudmFsdWVcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gb25BY3RpdmF0ZSAoKSB7XG4gICAgICBibHVyUmVmLnZhbHVlICE9PSBudWxsICYmIGJsdXJSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgaXNBY3RpdmUudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLmdvVG9QYW5lbChwcm9wcy5zdGVwLm5hbWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgaXNBY3RpdmUudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIHByb3BzLmdvVG9QYW5lbChwcm9wcy5zdGVwLm5hbWUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH1cblxuICAgICAgaWYgKGhlYWRlck5hdi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBvbkFjdGl2YXRlXG4gICAgICAgIGRhdGEub25LZXl1cCA9IG9uS2V5dXBcblxuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsXG4gICAgICAgICAgaXNEaXNhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IHsgdGFiaW5kZXg6IC0xLCAnYXJpYS1kaXNhYmxlZCc6ICd0cnVlJyB9XG4gICAgICAgICAgICA6IHsgdGFiaW5kZXg6IGF0dHJzLnRhYmluZGV4IHx8IDAgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLCB0YWJpbmRleDogLTEsIHJlZjogYmx1clJlZiB9KSxcblxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1zdGVwcGVyX19kb3Qgcm93IGZsZXgtY2VudGVyIHEtc3RlcHBlcl9fbGluZSByZWxhdGl2ZS1wb3NpdGlvbicgfSwgW1xuICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiAncm93IGZsZXgtY2VudGVyJyB9LCBbXG4gICAgICAgICAgICBoYXNQcmVmaXgudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBwcm9wcy5zdGVwLnByZWZpeFxuICAgICAgICAgICAgICA6IGgoUUljb24sIHsgbmFtZTogaWNvbi52YWx1ZSB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5zdGVwLnRpdGxlICE9PSB2b2lkIDAgJiYgcHJvcHMuc3RlcC50aXRsZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXN0ZXBwZXJfX3RpdGxlJyB9LCBwcm9wcy5zdGVwLnRpdGxlKVxuICAgICAgICBdXG5cbiAgICAgICAgaWYgKHByb3BzLnN0ZXAuY2FwdGlvbiAhPT0gdm9pZCAwICYmIHByb3BzLnN0ZXAuY2FwdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXN0ZXBwZXJfX2NhcHRpb24nIH0sIHByb3BzLnN0ZXAuY2FwdGlvbilcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1zdGVwcGVyX19sYWJlbCBxLXN0ZXBwZXJfX2xpbmUgcmVsYXRpdmUtcG9zaXRpb24nXG4gICAgICAgICAgfSwgY29udGVudClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIGRhdGEsIGNoaWxkKSxcbiAgICAgICAgWyBbIFJpcHBsZSwgcmlwcGxlLnZhbHVlIF0gXVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0TW9kaWZpZXJEaXJlY3Rpb25zLCBzaG91bGRTdGFydCB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvdG91Y2guanMnXG5pbXBvcnQgeyBhZGRFdnQsIGNsZWFuRXZ0LCBwb3NpdGlvbiwgbGVmdENsaWNrLCBzdG9wQW5kUHJldmVudCwgcHJldmVudERyYWdnYWJsZSwgbm9vcCB9IGZyb20gJy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgY2xlYXJTZWxlY3Rpb24gfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3NlbGVjdGlvbi5qcydcbmltcG9ydCBnZXRTU1JQcm9wcyBmcm9tICcuLi91dGlscy9wcml2YXRlL25vb3Atc3NyLWRpcmVjdGl2ZS10cmFuc2Zvcm0uanMnXG5cbmZ1bmN0aW9uIHBhcnNlQXJnIChhcmcpIHtcbiAgLy8gZGVsdGEgKG1pbiB2ZWxvY2l0eSAtLSBkaXN0IC8gdGltZSlcbiAgLy8gbW9iaWxlIG1pbiBkaXN0YW5jZSBvbiBmaXJzdCBtb3ZlXG4gIC8vIGRlc2t0b3AgbWluIGRpc3RhbmNlIHVudGlsIGRlY2lkaW5nIGlmIGl0J3MgYSBzd2lwZSBvciBub3RcbiAgY29uc3QgZGF0YSA9IFsgMC4wNiwgNiwgNTAgXVxuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyAmJiBhcmcubGVuZ3RoKSB7XG4gICAgYXJnLnNwbGl0KCc6JykuZm9yRWFjaCgodmFsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdiA9IHBhcnNlRmxvYXQodmFsKVxuICAgICAgdiAmJiAoZGF0YVsgaW5kZXggXSA9IHYpXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBkYXRhXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICd0b3VjaC1zd2lwZScsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAndG91Y2gtc3dpcGUnLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIHsgdmFsdWUsIGFyZywgbW9kaWZpZXJzIH0pIHtcbiAgICAgICAgLy8gZWFybHkgcmV0dXJuLCB3ZSBkb24ndCBuZWVkIHRvIGRvIGFueXRoaW5nXG4gICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgIT09IHRydWUgJiYgY2xpZW50Lmhhcy50b3VjaCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VDYXB0dXJlID0gbW9kaWZpZXJzLm1vdXNlQ2FwdHVyZSA9PT0gdHJ1ZSA/ICdDYXB0dXJlJyA6ICcnXG5cbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgIGhhbmRsZXI6IHZhbHVlLFxuICAgICAgICAgIHNlbnNpdGl2aXR5OiBwYXJzZUFyZyhhcmcpLFxuICAgICAgICAgIGRpcmVjdGlvbjogZ2V0TW9kaWZpZXJEaXJlY3Rpb25zKG1vZGlmaWVycyksXG5cbiAgICAgICAgICBub29wLFxuXG4gICAgICAgICAgbW91c2VTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RhcnQoZXZ0LCBjdHgpICYmIGxlZnRDbGljayhldnQpKSB7XG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdtb3VzZW1vdmUnLCAnbW92ZScsIGBub3RQYXNzaXZlJHsgbW91c2VDYXB0dXJlIH1gIF0sXG4gICAgICAgICAgICAgICAgWyBkb2N1bWVudCwgJ21vdXNldXAnLCAnZW5kJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIGN0eC5zdGFydChldnQsIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHRvdWNoU3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0YXJ0KGV2dCwgY3R4KSkge1xuICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2htb3ZlJywgJ21vdmUnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdlbmQnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdlbmQnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc3RhcnQgKGV2dCwgbW91c2VFdmVudCkge1xuICAgICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgdHJ1ZSlcblxuICAgICAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb24oZXZ0KVxuXG4gICAgICAgICAgICBjdHguZXZlbnQgPSB7XG4gICAgICAgICAgICAgIHg6IHBvcy5sZWZ0LFxuICAgICAgICAgICAgICB5OiBwb3MudG9wLFxuICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICBtb3VzZTogbW91c2VFdmVudCA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICAgZGlyOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBtb3ZlIChldnQpIHtcbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5kaXIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpIC0gY3R4LmV2ZW50LnRpbWVcblxuICAgICAgICAgICAgaWYgKHRpbWUgPT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHBvcyA9IHBvc2l0aW9uKGV2dCksXG4gICAgICAgICAgICAgIGRpc3RYID0gcG9zLmxlZnQgLSBjdHguZXZlbnQueCxcbiAgICAgICAgICAgICAgYWJzWCA9IE1hdGguYWJzKGRpc3RYKSxcbiAgICAgICAgICAgICAgZGlzdFkgPSBwb3MudG9wIC0gY3R4LmV2ZW50LnksXG4gICAgICAgICAgICAgIGFic1kgPSBNYXRoLmFicyhkaXN0WSlcblxuICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5tb3VzZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBpZiAoYWJzWCA8IGN0eC5zZW5zaXRpdml0eVsgMSBdICYmIGFic1kgPCBjdHguc2Vuc2l0aXZpdHlbIDEgXSkge1xuICAgICAgICAgICAgICAgIGN0eC5lbmQoZXZ0KVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpcyB1c2VyIHRyeWluZyB0byBzZWxlY3QgdGV4dD9cbiAgICAgICAgICAgIC8vIGlmIHNvLCB0aGVuIHNvbWV0aGluZyBzaG91bGQgYmUgcmVwb3J0ZWQgaGVyZVxuICAgICAgICAgICAgLy8gKHByZXZpb3VzIHNlbGVjdGlvbiwgaWYgYW55LCB3YXMgZGlzY2FyZGVkIHdoZW4gc3dpcGUgc3RhcnRlZClcbiAgICAgICAgICAgIGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpICE9PSAnJykge1xuICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhYnNYIDwgY3R4LnNlbnNpdGl2aXR5WyAyIF0gJiYgYWJzWSA8IGN0eC5zZW5zaXRpdml0eVsgMiBdKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICB2ZWxYID0gYWJzWCAvIHRpbWUsXG4gICAgICAgICAgICAgIHZlbFkgPSBhYnNZIC8gdGltZVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24udmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IGFic1lcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxZID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gZGlzdFkgPCAwID8gJ3VwJyA6ICdkb3duJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uaG9yaXpvbnRhbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYID4gYWJzWVxuICAgICAgICAgICAgICAmJiBhYnNZIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFggPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSBkaXN0WCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi51cCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYIDwgYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WSA8IDBcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxZID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ3VwJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uZG93biA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYIDwgYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WSA+IDBcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxZID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ2Rvd24nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPiBhYnNZXG4gICAgICAgICAgICAgICYmIGRpc3RYIDwgMFxuICAgICAgICAgICAgICAmJiBhYnNZIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFggPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSAnbGVmdCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPiBhYnNZXG4gICAgICAgICAgICAgICYmIGRpc3RYID4gMFxuICAgICAgICAgICAgICAmJiBhYnNZIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFggPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSAncmlnaHQnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQuZGlyICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5tb3VzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcbiAgICAgICAgICAgICAgICBjbGVhclNlbGVjdGlvbigpXG5cbiAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gd2l0aERlbGF5ID0+IHtcbiAgICAgICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB2b2lkIDBcblxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby1wb2ludGVyLWV2ZW50cy0tY2hpbGRyZW4nKVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAod2l0aERlbGF5ID09PSB0cnVlKSB7IHNldFRpbWVvdXQocmVtb3ZlLCA1MCkgfVxuICAgICAgICAgICAgICAgICAgZWxzZSB7IHJlbW92ZSgpIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjdHguaGFuZGxlcih7XG4gICAgICAgICAgICAgICAgZXZ0LFxuICAgICAgICAgICAgICAgIHRvdWNoOiBjdHguZXZlbnQubW91c2UgIT09IHRydWUsXG4gICAgICAgICAgICAgICAgbW91c2U6IGN0eC5ldmVudC5tb3VzZSxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGN0eC5ldmVudC5kaXIsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IHRpbWUsXG4gICAgICAgICAgICAgICAgZGlzdGFuY2U6IHtcbiAgICAgICAgICAgICAgICAgIHg6IGFic1gsXG4gICAgICAgICAgICAgICAgICB5OiBhYnNZXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGN0eC5lbmQoZXZ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlbmQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKGN0eC5ldmVudCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcbiAgICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIGZhbHNlKVxuICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCAhPT0gdm9pZCAwICYmIGN0eC5zdHlsZUNsZWFudXAodHJ1ZSlcbiAgICAgICAgICAgIGV2dCAhPT0gdm9pZCAwICYmIGN0eC5ldmVudC5kaXIgIT09IGZhbHNlICYmIHN0b3BBbmRQcmV2ZW50KGV2dClcblxuICAgICAgICAgICAgY3R4LmV2ZW50ID0gdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xdG91Y2hzd2lwZSA9IGN0eFxuXG4gICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgIGNvbnN0IGNhcHR1cmUgPSBtb2RpZmllcnMubW91c2VDYXB0dXJlID09PSB0cnVlIHx8IG1vZGlmaWVycy5tb3VzZWNhcHR1cmUgPT09IHRydWVcbiAgICAgICAgICAgID8gJ0NhcHR1cmUnXG4gICAgICAgICAgICA6ICcnXG5cbiAgICAgICAgICBhZGRFdnQoY3R4LCAnbWFpbicsIFtcbiAgICAgICAgICAgIFsgZWwsICdtb3VzZWRvd24nLCAnbW91c2VTdGFydCcsIGBwYXNzaXZlJHsgY2FwdHVyZSB9YCBdXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWVudC5oYXMudG91Y2ggPT09IHRydWUgJiYgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgWyBlbCwgJ3RvdWNoc3RhcnQnLCAndG91Y2hTdGFydCcsIGBwYXNzaXZlJHsgbW9kaWZpZXJzLmNhcHR1cmUgPT09IHRydWUgPyAnQ2FwdHVyZScgOiAnJyB9YCBdLFxuICAgICAgICAgIFsgZWwsICd0b3VjaG1vdmUnLCAnbm9vcCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXSAvLyBjYW5ub3QgYmUgcGFzc2l2ZSAoZXg6IGlPUyBzY3JvbGwpXG4gICAgICAgIF0pXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgYmluZGluZ3MpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xdG91Y2hzd2lwZVxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChiaW5kaW5ncy5vbGRWYWx1ZSAhPT0gYmluZGluZ3MudmFsdWUpIHtcbiAgICAgICAgICAgIHR5cGVvZiBiaW5kaW5ncy52YWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiBjdHguZW5kKClcbiAgICAgICAgICAgIGN0eC5oYW5kbGVyID0gYmluZGluZ3MudmFsdWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdHguZGlyZWN0aW9uID0gZ2V0TW9kaWZpZXJEaXJlY3Rpb25zKGJpbmRpbmdzLm1vZGlmaWVycylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudCAoZWwpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xdG91Y2hzd2lwZVxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ21haW4nKVxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuXG4gICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgZmFsc2UpXG4gICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCAhPT0gdm9pZCAwICYmIGN0eC5zdHlsZUNsZWFudXAoKVxuXG4gICAgICAgICAgZGVsZXRlIGVsLl9fcXRvdWNoc3dpcGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbilcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgY2FjaGUgPSBuZXcgTWFwKClcblxuICByZXR1cm4ge1xuICAgIGdldENhY2hlOiBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgICAgID8gZnVuY3Rpb24gKF8sIG9iaikgeyByZXR1cm4gb2JqIH1cbiAgICAgIDogZnVuY3Rpb24gKGtleSwgb2JqKSB7XG4gICAgICAgIHJldHVybiBjYWNoZVsga2V5IF0gPT09IHZvaWQgMFxuICAgICAgICAgID8gKGNhY2hlWyBrZXkgXSA9IG9iailcbiAgICAgICAgICA6IGNhY2hlWyBrZXkgXVxuICAgICAgfSxcblxuICAgIGdldENhY2hlV2l0aEZuOiBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgICAgID8gZnVuY3Rpb24gKF8sIGZuKSB7IHJldHVybiBmbigpIH1cbiAgICAgIDogZnVuY3Rpb24gKGtleSwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlWyBrZXkgXSA9PT0gdm9pZCAwXG4gICAgICAgICAgPyAoY2FjaGVbIGtleSBdID0gZm4oKSlcbiAgICAgICAgICA6IGNhY2hlWyBrZXkgXVxuICAgICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSwgVHJhbnNpdGlvbiwgS2VlcEFsaXZlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgVG91Y2hTd2lwZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL1RvdWNoU3dpcGUuanMnXG5cbmltcG9ydCB1c2VDYWNoZSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1jYWNoZS5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGdldE5vcm1hbGl6ZWRWTm9kZXMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlUGFuZWxDaGlsZFByb3BzID0ge1xuICBuYW1lOiB7IHJlcXVpcmVkOiB0cnVlIH0sXG4gIGRpc2FibGU6IEJvb2xlYW5cbn1cblxuY29uc3QgUGFuZWxXcmFwcGVyID0ge1xuICBzZXR1cCAoXywgeyBzbG90cyB9KSB7XG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1wYW5lbCBzY3JvbGwnLFxuICAgICAgcm9sZTogJ3RhYnBhbmVsJ1xuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1c2VQYW5lbFByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7XG4gICAgcmVxdWlyZWQ6IHRydWVcbiAgfSxcblxuICBhbmltYXRlZDogQm9vbGVhbixcbiAgaW5maW5pdGU6IEJvb2xlYW4sXG4gIHN3aXBlYWJsZTogQm9vbGVhbixcbiAgdmVydGljYWw6IEJvb2xlYW4sXG5cbiAgdHJhbnNpdGlvblByZXY6IFN0cmluZyxcbiAgdHJhbnNpdGlvbk5leHQ6IFN0cmluZyxcbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiB7XG4gICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgIGRlZmF1bHQ6IDMwMFxuICB9LFxuXG4gIGtlZXBBbGl2ZTogQm9vbGVhbixcbiAga2VlcEFsaXZlSW5jbHVkZTogWyBTdHJpbmcsIEFycmF5LCBSZWdFeHAgXSxcbiAga2VlcEFsaXZlRXhjbHVkZTogWyBTdHJpbmcsIEFycmF5LCBSZWdFeHAgXSxcbiAga2VlcEFsaXZlTWF4OiBOdW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVBhbmVsRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdiZWZvcmVUcmFuc2l0aW9uJywgJ3RyYW5zaXRpb24nIF1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBnZXRDYWNoZVdpdGhGbiB9ID0gdXNlQ2FjaGUoKVxuXG4gIGxldCBwYW5lbHMsIGZvcmNlZFBhbmVsVHJhbnNpdGlvblxuXG4gIGNvbnN0IHBhbmVsSW5kZXggPSByZWYobnVsbClcbiAgY29uc3QgcGFuZWxUcmFuc2l0aW9uID0gcmVmKG51bGwpXG5cbiAgZnVuY3Rpb24gb25Td2lwZSAoZXZ0KSB7XG4gICAgY29uc3QgZGlyID0gcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAndXAnIDogJ2xlZnQnXG4gICAgZ29Ub1BhbmVsQnlPZmZzZXQoKHByb3h5LiRxLmxhbmcucnRsID09PSB0cnVlID8gLTEgOiAxKSAqIChldnQuZGlyZWN0aW9uID09PSBkaXIgPyAxIDogLTEpKVxuICB9XG5cbiAgY29uc3QgcGFuZWxEaXJlY3RpdmVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIC8vIGlmIHByb3BzLnN3aXBlYWJsZVxuICAgIHJldHVybiBbIFtcbiAgICAgIFRvdWNoU3dpcGUsXG4gICAgICBvblN3aXBlLFxuICAgICAgdm9pZCAwLFxuICAgICAge1xuICAgICAgICBob3Jpem9udGFsOiBwcm9wcy52ZXJ0aWNhbCAhPT0gdHJ1ZSxcbiAgICAgICAgdmVydGljYWw6IHByb3BzLnZlcnRpY2FsLFxuICAgICAgICBtb3VzZTogdHJ1ZVxuICAgICAgfVxuICAgIF0gXVxuICB9KVxuXG4gIGNvbnN0IHRyYW5zaXRpb25QcmV2ID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy50cmFuc2l0aW9uUHJldiB8fCBgc2xpZGUtJHsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnZG93bicgOiAncmlnaHQnIH1gXG4gIClcblxuICBjb25zdCB0cmFuc2l0aW9uTmV4dCA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMudHJhbnNpdGlvbk5leHQgfHwgYHNsaWRlLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3VwJyA6ICdsZWZ0JyB9YFxuICApXG5cbiAgY29uc3QgdHJhbnNpdGlvblN0eWxlID0gY29tcHV0ZWQoXG4gICAgKCkgPT4gYC0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAkeyBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24gfW1zYFxuICApXG5cbiAgY29uc3QgY29udGVudEtleSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdudW1iZXInXG4gICAgICA/IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgIDogU3RyaW5nKHByb3BzLm1vZGVsVmFsdWUpXG4gICkpXG5cbiAgY29uc3Qga2VlcEFsaXZlUHJvcHMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgIGluY2x1ZGU6IHByb3BzLmtlZXBBbGl2ZUluY2x1ZGUsXG4gICAgZXhjbHVkZTogcHJvcHMua2VlcEFsaXZlRXhjbHVkZSxcbiAgICBtYXg6IHByb3BzLmtlZXBBbGl2ZU1heFxuICB9KSlcblxuICBjb25zdCBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXIgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmtlZXBBbGl2ZUluY2x1ZGUgIT09IHZvaWQgMFxuICAgIHx8IHByb3BzLmtlZXBBbGl2ZUV4Y2x1ZGUgIT09IHZvaWQgMFxuICApXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgKG5ld1ZhbCwgb2xkVmFsKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBpc1ZhbGlkUGFuZWxOYW1lKG5ld1ZhbCkgPT09IHRydWVcbiAgICAgID8gZ2V0UGFuZWxJbmRleChuZXdWYWwpXG4gICAgICA6IC0xXG5cbiAgICBpZiAoZm9yY2VkUGFuZWxUcmFuc2l0aW9uICE9PSB0cnVlKSB7XG4gICAgICB1cGRhdGVQYW5lbFRyYW5zaXRpb24oXG4gICAgICAgIGluZGV4ID09PSAtMSA/IDAgOiAoaW5kZXggPCBnZXRQYW5lbEluZGV4KG9sZFZhbCkgPyAtMSA6IDEpXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHBhbmVsSW5kZXgudmFsdWUgIT09IGluZGV4KSB7XG4gICAgICBwYW5lbEluZGV4LnZhbHVlID0gaW5kZXhcbiAgICAgIGVtaXQoJ2JlZm9yZVRyYW5zaXRpb24nLCBuZXdWYWwsIG9sZFZhbClcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgZW1pdCgndHJhbnNpdGlvbicsIG5ld1ZhbCwgb2xkVmFsKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gbmV4dFBhbmVsICgpIHsgZ29Ub1BhbmVsQnlPZmZzZXQoMSkgfVxuICBmdW5jdGlvbiBwcmV2aW91c1BhbmVsICgpIHsgZ29Ub1BhbmVsQnlPZmZzZXQoLTEpIH1cblxuICBmdW5jdGlvbiBnb1RvUGFuZWwgKG5hbWUpIHtcbiAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG5hbWUpXG4gIH1cblxuICBmdW5jdGlvbiBpc1ZhbGlkUGFuZWxOYW1lIChuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUgIT09IHZvaWQgMCAmJiBuYW1lICE9PSBudWxsICYmIG5hbWUgIT09ICcnXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYW5lbEluZGV4IChuYW1lKSB7XG4gICAgcmV0dXJuIHBhbmVscy5maW5kSW5kZXgocGFuZWwgPT4ge1xuICAgICAgcmV0dXJuIHBhbmVsLnByb3BzLm5hbWUgPT09IG5hbWVcbiAgICAgICAgJiYgcGFuZWwucHJvcHMuZGlzYWJsZSAhPT0gJydcbiAgICAgICAgJiYgcGFuZWwucHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRFbmFibGVkUGFuZWxzICgpIHtcbiAgICByZXR1cm4gcGFuZWxzLmZpbHRlcihwYW5lbCA9PiB7XG4gICAgICByZXR1cm4gcGFuZWwucHJvcHMuZGlzYWJsZSAhPT0gJydcbiAgICAgICAgJiYgcGFuZWwucHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQYW5lbFRyYW5zaXRpb24gKGRpcmVjdGlvbikge1xuICAgIGNvbnN0IHZhbCA9IGRpcmVjdGlvbiAhPT0gMCAmJiBwcm9wcy5hbmltYXRlZCA9PT0gdHJ1ZSAmJiBwYW5lbEluZGV4LnZhbHVlICE9PSAtMVxuICAgICAgPyAncS10cmFuc2l0aW9uLS0nICsgKGRpcmVjdGlvbiA9PT0gLTEgPyB0cmFuc2l0aW9uUHJldi52YWx1ZSA6IHRyYW5zaXRpb25OZXh0LnZhbHVlKVxuICAgICAgOiBudWxsXG5cbiAgICBpZiAocGFuZWxUcmFuc2l0aW9uLnZhbHVlICE9PSB2YWwpIHtcbiAgICAgIHBhbmVsVHJhbnNpdGlvbi52YWx1ZSA9IHZhbFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdvVG9QYW5lbEJ5T2Zmc2V0IChkaXJlY3Rpb24sIHN0YXJ0SW5kZXggPSBwYW5lbEluZGV4LnZhbHVlKSB7XG4gICAgbGV0IGluZGV4ID0gc3RhcnRJbmRleCArIGRpcmVjdGlvblxuXG4gICAgd2hpbGUgKGluZGV4ID4gLTEgJiYgaW5kZXggPCBwYW5lbHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBvcHQgPSBwYW5lbHNbIGluZGV4IF1cblxuICAgICAgaWYgKFxuICAgICAgICBvcHQgIT09IHZvaWQgMFxuICAgICAgICAmJiBvcHQucHJvcHMuZGlzYWJsZSAhPT0gJydcbiAgICAgICAgJiYgb3B0LnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICB1cGRhdGVQYW5lbFRyYW5zaXRpb24oZGlyZWN0aW9uKVxuICAgICAgICBmb3JjZWRQYW5lbFRyYW5zaXRpb24gPSB0cnVlXG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgb3B0LnByb3BzLm5hbWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGZvcmNlZFBhbmVsVHJhbnNpdGlvbiA9IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpbmRleCArPSBkaXJlY3Rpb25cbiAgICB9XG5cbiAgICBpZiAocHJvcHMuaW5maW5pdGUgPT09IHRydWUgJiYgcGFuZWxzLmxlbmd0aCAhPT0gMCAmJiBzdGFydEluZGV4ICE9PSAtMSAmJiBzdGFydEluZGV4ICE9PSBwYW5lbHMubGVuZ3RoKSB7XG4gICAgICBnb1RvUGFuZWxCeU9mZnNldChkaXJlY3Rpb24sIGRpcmVjdGlvbiA9PT0gLTEgPyBwYW5lbHMubGVuZ3RoIDogLTEpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFuZWxJbmRleCAoKSB7XG4gICAgY29uc3QgaW5kZXggPSBnZXRQYW5lbEluZGV4KHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBpZiAocGFuZWxJbmRleC52YWx1ZSAhPT0gaW5kZXgpIHtcbiAgICAgIHBhbmVsSW5kZXgudmFsdWUgPSBpbmRleFxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYW5lbENvbnRlbnRDaGlsZCAoKSB7XG4gICAgY29uc3QgcGFuZWwgPSBpc1ZhbGlkUGFuZWxOYW1lKHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlXG4gICAgICAmJiB1cGRhdGVQYW5lbEluZGV4KClcbiAgICAgICYmIHBhbmVsc1sgcGFuZWxJbmRleC52YWx1ZSBdXG5cbiAgICByZXR1cm4gcHJvcHMua2VlcEFsaXZlID09PSB0cnVlXG4gICAgICA/IFtcbiAgICAgICAgICBoKEtlZXBBbGl2ZSwga2VlcEFsaXZlUHJvcHMudmFsdWUsIFtcbiAgICAgICAgICAgIGgoXG4gICAgICAgICAgICAgIG5lZWRzVW5pcXVlS2VlcEFsaXZlV3JhcHBlci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gZ2V0Q2FjaGVXaXRoRm4oY29udGVudEtleS52YWx1ZSwgKCkgPT4gKHsgLi4uUGFuZWxXcmFwcGVyLCBuYW1lOiBjb250ZW50S2V5LnZhbHVlIH0pKVxuICAgICAgICAgICAgICAgIDogUGFuZWxXcmFwcGVyLFxuICAgICAgICAgICAgICB7IGtleTogY29udGVudEtleS52YWx1ZSwgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSB9LFxuICAgICAgICAgICAgICAoKSA9PiBwYW5lbFxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF1cbiAgICAgIDogW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1wYW5lbCBzY3JvbGwnLFxuICAgICAgICAgICAgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSxcbiAgICAgICAgICAgIGtleTogY29udGVudEtleS52YWx1ZSxcbiAgICAgICAgICAgIHJvbGU6ICd0YWJwYW5lbCdcbiAgICAgICAgICB9LCBbIHBhbmVsIF0pXG4gICAgICAgIF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVsQ29udGVudCAoKSB7XG4gICAgaWYgKHBhbmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5hbmltYXRlZCA9PT0gdHJ1ZVxuICAgICAgPyBbIGgoVHJhbnNpdGlvbiwgeyBuYW1lOiBwYW5lbFRyYW5zaXRpb24udmFsdWUgfSwgZ2V0UGFuZWxDb250ZW50Q2hpbGQpIF1cbiAgICAgIDogZ2V0UGFuZWxDb250ZW50Q2hpbGQoKVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFuZWxzTGlzdCAoc2xvdHMpIHtcbiAgICBwYW5lbHMgPSBnZXROb3JtYWxpemVkVk5vZGVzKFxuICAgICAgaFNsb3Qoc2xvdHMuZGVmYXVsdCwgW10pXG4gICAgKS5maWx0ZXIoXG4gICAgICBwYW5lbCA9PiBwYW5lbC5wcm9wcyAhPT0gbnVsbFxuICAgICAgICAmJiBwYW5lbC5wcm9wcy5zbG90ID09PSB2b2lkIDBcbiAgICAgICAgJiYgaXNWYWxpZFBhbmVsTmFtZShwYW5lbC5wcm9wcy5uYW1lKSA9PT0gdHJ1ZVxuICAgIClcblxuICAgIHJldHVybiBwYW5lbHMubGVuZ3RoXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYW5lbHMgKCkge1xuICAgIHJldHVybiBwYW5lbHNcbiAgfVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgbmV4dDogbmV4dFBhbmVsLFxuICAgIHByZXZpb3VzOiBwcmV2aW91c1BhbmVsLFxuICAgIGdvVG86IGdvVG9QYW5lbFxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcGFuZWxJbmRleCxcbiAgICBwYW5lbERpcmVjdGl2ZXMsXG5cbiAgICB1cGRhdGVQYW5lbHNMaXN0LFxuICAgIHVwZGF0ZVBhbmVsSW5kZXgsXG5cbiAgICBnZXRQYW5lbENvbnRlbnQsXG4gICAgZ2V0RW5hYmxlZFBhbmVscyxcbiAgICBnZXRQYW5lbHMsXG5cbiAgICBpc1ZhbGlkUGFuZWxOYW1lLFxuXG4gICAga2VlcEFsaXZlUHJvcHMsXG4gICAgbmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyLFxuXG4gICAgZ29Ub1BhbmVsQnlPZmZzZXQsXG4gICAgZ29Ub1BhbmVsLFxuXG4gICAgbmV4dFBhbmVsLFxuICAgIHByZXZpb3VzUGFuZWxcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UsIEtlZXBBbGl2ZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFTbGlkZVRyYW5zaXRpb24gZnJvbSAnLi4vc2xpZGUtdHJhbnNpdGlvbi9RU2xpZGVUcmFuc2l0aW9uLmpzJ1xuaW1wb3J0IFN0ZXBIZWFkZXIgZnJvbSAnLi9TdGVwSGVhZGVyLmpzJ1xuXG5pbXBvcnQgeyB1c2VQYW5lbENoaWxkUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wYW5lbC5qcydcbmltcG9ydCB1c2VDYWNoZSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1jYWNoZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdGVwcGVyS2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZnVuY3Rpb24gZ2V0U3RlcFdyYXBwZXIgKHNsb3RzKSB7XG4gIHJldHVybiBoKCdkaXYnLCB7XG4gICAgY2xhc3M6ICdxLXN0ZXBwZXJfX3N0ZXAtY29udGVudCdcbiAgfSwgW1xuICAgIGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1zdGVwcGVyX19zdGVwLWlubmVyJ1xuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICBdKVxufVxuXG5jb25zdCBQYW5lbFdyYXBwZXIgPSB7XG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gZ2V0U3RlcFdyYXBwZXIoc2xvdHMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTdGVwJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVBhbmVsQ2hpbGRQcm9wcyxcblxuICAgIGljb246IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgY2FwdGlvbjogU3RyaW5nLFxuICAgIHByZWZpeDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgZG9uZUljb246IFN0cmluZyxcbiAgICBkb25lQ29sb3I6IFN0cmluZyxcbiAgICBhY3RpdmVJY29uOiBTdHJpbmcsXG4gICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcbiAgICBlcnJvckljb246IFN0cmluZyxcbiAgICBlcnJvckNvbG9yOiBTdHJpbmcsXG5cbiAgICBoZWFkZXJOYXY6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBkb25lOiBCb29sZWFuLFxuICAgIGVycm9yOiBCb29sZWFuLFxuXG4gICAgb25TY3JvbGw6IFsgRnVuY3Rpb24sIEFycmF5IF1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRzdGVwcGVyID0gaW5qZWN0KHN0ZXBwZXJLZXksIGVtcHR5UmVuZGVyRm4pXG4gICAgaWYgKCRzdGVwcGVyID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRU3RlcCBuZWVkcyB0byBiZSBhIGNoaWxkIG9mIFFTdGVwcGVyJylcbiAgICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gICAgfVxuXG4gICAgY29uc3QgeyBnZXRDYWNoZVdpdGhGbiB9ID0gdXNlQ2FjaGUoKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgaXNBY3RpdmUgPSBjb21wdXRlZCgoKSA9PiAkc3RlcHBlci52YWx1ZS5tb2RlbFZhbHVlID09PSBwcm9wcy5uYW1lKVxuXG4gICAgY29uc3Qgc2Nyb2xsRXZlbnQgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAoJHEucGxhdGZvcm0uaXMuaW9zICE9PSB0cnVlICYmICRxLnBsYXRmb3JtLmlzLmNocm9tZSA9PT0gdHJ1ZSlcbiAgICAgICAgfHwgaXNBY3RpdmUudmFsdWUgIT09IHRydWVcbiAgICAgICAgfHwgJHN0ZXBwZXIudmFsdWUudmVydGljYWwgIT09IHRydWVcbiAgICAgICAgPyB7fVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIG9uU2Nyb2xsIChlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBlXG4gICAgICAgICAgICAgIGlmICh0YXJnZXQuc2Nyb2xsVG9wID4gMCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5zY3JvbGxUb3AgPSAwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcHJvcHMub25TY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGwnLCBlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICApKVxuXG4gICAgY29uc3QgY29udGVudEtleSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHR5cGVvZiBwcm9wcy5uYW1lID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcHJvcHMubmFtZSA9PT0gJ251bWJlcidcbiAgICAgICAgPyBwcm9wcy5uYW1lXG4gICAgICAgIDogU3RyaW5nKHByb3BzLm5hbWUpXG4gICAgKSlcblxuICAgIGZ1bmN0aW9uIGdldFN0ZXBDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IHZlcnRpY2FsID0gJHN0ZXBwZXIudmFsdWUudmVydGljYWxcblxuICAgICAgaWYgKHZlcnRpY2FsID09PSB0cnVlICYmICRzdGVwcGVyLnZhbHVlLmtlZXBBbGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaChcbiAgICAgICAgICBLZWVwQWxpdmUsXG4gICAgICAgICAgJHN0ZXBwZXIudmFsdWUua2VlcEFsaXZlUHJvcHMudmFsdWUsXG4gICAgICAgICAgaXNBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIGgoXG4gICAgICAgICAgICAgICAgICAkc3RlcHBlci52YWx1ZS5uZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXIudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgPyBnZXRDYWNoZVdpdGhGbihjb250ZW50S2V5LnZhbHVlLCAoKSA9PiAoeyAuLi5QYW5lbFdyYXBwZXIsIG5hbWU6IGNvbnRlbnRLZXkudmFsdWUgfSkpXG4gICAgICAgICAgICAgICAgICAgIDogUGFuZWxXcmFwcGVyLFxuICAgICAgICAgICAgICAgICAgeyBrZXk6IGNvbnRlbnRLZXkudmFsdWUgfSxcbiAgICAgICAgICAgICAgICAgIHNsb3RzLmRlZmF1bHRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZlcnRpY2FsICE9PSB0cnVlIHx8IGlzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gZ2V0U3RlcFdyYXBwZXIoc2xvdHMpXG4gICAgICAgIDogdm9pZCAwXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGgoXG4gICAgICAnZGl2JyxcbiAgICAgIHsgcmVmOiByb290UmVmLCBjbGFzczogJ3Etc3RlcHBlcl9fc3RlcCcsIHJvbGU6ICd0YWJwYW5lbCcsIC4uLnNjcm9sbEV2ZW50LnZhbHVlIH0sXG4gICAgICAkc3RlcHBlci52YWx1ZS52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGgoU3RlcEhlYWRlciwge1xuICAgICAgICAgICAgICBzdGVwcGVyOiAkc3RlcHBlci52YWx1ZSxcbiAgICAgICAgICAgICAgc3RlcDogcHJvcHMsXG4gICAgICAgICAgICAgIGdvVG9QYW5lbDogJHN0ZXBwZXIudmFsdWUuZ29Ub1BhbmVsXG4gICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgJHN0ZXBwZXIudmFsdWUuYW5pbWF0ZWQgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBoKFFTbGlkZVRyYW5zaXRpb24sIGdldFN0ZXBDb250ZW50KVxuICAgICAgICAgICAgICA6IGdldFN0ZXBDb250ZW50KClcbiAgICAgICAgICBdXG4gICAgICAgIDogWyBnZXRTdGVwQ29udGVudCgpIF1cbiAgICApXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgcHJvdmlkZSwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgU3RlcEhlYWRlciBmcm9tICcuL1N0ZXBIZWFkZXIuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlUGFuZWwsIHsgdXNlUGFuZWxQcm9wcywgdXNlUGFuZWxFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXBhbmVsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0ZXBwZXJLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5pbXBvcnQgeyBoU2xvdCwgaE1lcmdlU2xvdCwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5jb25zdCBjYW1lbFJFID0gLygtXFx3KS9nXG5cbmZ1bmN0aW9uIGNhbWVsaXplUHJvcHMgKHByb3BzKSB7XG4gIGNvbnN0IGFjYyA9IHt9XG4gIGZvciAoY29uc3Qga2V5IGluIHByb3BzKSB7XG4gICAgY29uc3QgbmV3S2V5ID0ga2V5LnJlcGxhY2UoY2FtZWxSRSwgbSA9PiBtWyAxIF0udG9VcHBlckNhc2UoKSlcbiAgICBhY2NbIG5ld0tleSBdID0gcHJvcHNbIGtleSBdXG4gIH1cbiAgcmV0dXJuIGFjY1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVN0ZXBwZXInLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVBhbmVsUHJvcHMsXG5cbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGFsdGVybmF0aXZlTGFiZWxzOiBCb29sZWFuLFxuICAgIGhlYWRlck5hdjogQm9vbGVhbixcbiAgICBjb250cmFjdGVkOiBCb29sZWFuLFxuICAgIGhlYWRlckNsYXNzOiBTdHJpbmcsXG5cbiAgICBpbmFjdGl2ZUNvbG9yOiBTdHJpbmcsXG4gICAgaW5hY3RpdmVJY29uOiBTdHJpbmcsXG4gICAgZG9uZUljb246IFN0cmluZyxcbiAgICBkb25lQ29sb3I6IFN0cmluZyxcbiAgICBhY3RpdmVJY29uOiBTdHJpbmcsXG4gICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcbiAgICBlcnJvckljb246IFN0cmluZyxcbiAgICBlcnJvckNvbG9yOiBTdHJpbmdcbiAgfSxcblxuICBlbWl0czogdXNlUGFuZWxFbWl0cyxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IHtcbiAgICAgIHVwZGF0ZVBhbmVsc0xpc3QsIGlzVmFsaWRQYW5lbE5hbWUsXG4gICAgICB1cGRhdGVQYW5lbEluZGV4LCBnZXRQYW5lbENvbnRlbnQsXG4gICAgICBnZXRQYW5lbHMsIHBhbmVsRGlyZWN0aXZlcywgZ29Ub1BhbmVsLFxuICAgICAga2VlcEFsaXZlUHJvcHMsIG5lZWRzVW5pcXVlS2VlcEFsaXZlV3JhcHBlclxuICAgIH0gPSB1c2VQYW5lbCgpXG5cbiAgICBwcm92aWRlKHN0ZXBwZXJLZXksIGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBnb1RvUGFuZWwsXG4gICAgICBrZWVwQWxpdmVQcm9wcyxcbiAgICAgIG5lZWRzVW5pcXVlS2VlcEFsaXZlV3JhcHBlcixcbiAgICAgIC4uLnByb3BzXG4gICAgfSkpKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1zdGVwcGVyIHEtc3RlcHBlci0tJHsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnIH1gXG4gICAgICArIChwcm9wcy5mbGF0ID09PSB0cnVlID8gJyBxLXN0ZXBwZXItLWZsYXQnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1zdGVwcGVyLS1ib3JkZXJlZCcgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zdGVwcGVyLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBoZWFkZXJDbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXN0ZXBwZXJfX2hlYWRlciByb3cgaXRlbXMtc3RyZXRjaCBqdXN0aWZ5LWJldHdlZW4nXG4gICAgICArIGAgcS1zdGVwcGVyX19oZWFkZXItLSR7IHByb3BzLmFsdGVybmF0aXZlTGFiZWxzID09PSB0cnVlID8gJ2FsdGVybmF0aXZlJyA6ICdzdGFuZGFyZCcgfS1sYWJlbHNgXG4gICAgICArIChwcm9wcy5mbGF0ID09PSBmYWxzZSB8fCBwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1zdGVwcGVyX19oZWFkZXItLWJvcmRlcicgOiAnJylcbiAgICAgICsgKHByb3BzLmNvbnRyYWN0ZWQgPT09IHRydWUgPyAnIHEtc3RlcHBlcl9faGVhZGVyLS1jb250cmFjdGVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuaGVhZGVyQ2xhc3MgIT09IHZvaWQgMCA/IGAgJHsgcHJvcHMuaGVhZGVyQ2xhc3MgfWAgOiAnJylcbiAgICApXG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IHRvcCA9IGhTbG90KHNsb3RzLm1lc3NhZ2UsIFtdKVxuXG4gICAgICBpZiAocHJvcHMudmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgaXNWYWxpZFBhbmVsTmFtZShwcm9wcy5tb2RlbFZhbHVlKSAmJiB1cGRhdGVQYW5lbEluZGV4KClcblxuICAgICAgICBjb25zdCBjb250ZW50ID0gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1zdGVwcGVyX19jb250ZW50J1xuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcblxuICAgICAgICByZXR1cm4gdG9wID09PSB2b2lkIDBcbiAgICAgICAgICA/IFsgY29udGVudCBdXG4gICAgICAgICAgOiB0b3AuY29uY2F0KGNvbnRlbnQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXG4gICAgICAgIGgoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgeyBjbGFzczogaGVhZGVyQ2xhc3Nlcy52YWx1ZSB9LFxuICAgICAgICAgIGdldFBhbmVscygpLm1hcChwYW5lbCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdGVwID0gY2FtZWxpemVQcm9wcyhwYW5lbC5wcm9wcylcblxuICAgICAgICAgICAgcmV0dXJuIGgoU3RlcEhlYWRlciwge1xuICAgICAgICAgICAgICBrZXk6IHN0ZXAubmFtZSxcbiAgICAgICAgICAgICAgc3RlcHBlcjogcHJvcHMsXG4gICAgICAgICAgICAgIHN0ZXAsXG4gICAgICAgICAgICAgIGdvVG9QYW5lbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuXG4gICAgICAgIHRvcCxcblxuICAgICAgICBoRGlyKFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHsgY2xhc3M6ICdxLXN0ZXBwZXJfX2NvbnRlbnQgcS1wYW5lbC1wYXJlbnQnIH0sXG4gICAgICAgICAgZ2V0UGFuZWxDb250ZW50KCksXG4gICAgICAgICAgJ2NvbnQnLFxuICAgICAgICAgIHByb3BzLnN3aXBlYWJsZSxcbiAgICAgICAgICAoKSA9PiBwYW5lbERpcmVjdGl2ZXMudmFsdWVcbiAgICAgICAgKVxuICAgICAgXVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1cGRhdGVQYW5lbHNMaXN0KHNsb3RzKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgICAgfSwgaE1lcmdlU2xvdChzbG90cy5uYXZpZ2F0aW9uLCBnZXRDb250ZW50KCkpKVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImZsZXggZmxleC1jZW50ZXJcIj5cbiAgICA8cS1zdGVwcGVyIHYtbW9kZWw9XCJzdGVwXCIgdmVydGljYWwgY29sb3I9XCJwcmltYXJ5XCI+XG4gICAgICA8cS1zdGVwXG4gICAgICAgIHN0eWxlPVwibWluLXdpZHRoOiAzMjBweDtcIlxuICAgICAgICB2LWZvcj1cIml0ZW0gaW4gc3RlcHNcIlxuICAgICAgICA6bmFtZT1cIml0ZW0uaWQudG9TdHJpbmcoKVwiXG4gICAgICAgIDprZXk9XCJpdGVtLmlkXCJcbiAgICAgICAgOnRpdGxlPVwiYOWcqEdvb2dsZeS4iuaQnOipoiR7aXRlbS5uYW1lfWBcIlxuICAgICAgICBpY29uPVwic2VhcmNoXCJcbiAgICAgICAgY2xpY2thYmxlXG4gICAgICAgIEBjbGljaz1cIm9wZW5Jbk5ld1RhYihpdGVtLm5hbWUpXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEtbWRcIiBzdHlsZT1cImhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7XCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyBjdXJzb3I6IHBvaW50ZXI7XCI+XG4gICAgICAgICAgICBDbGljayBoZXJlIHRvIHNlYXJjaCBcInt7IGl0ZW0ubmFtZSB9fVwiIG9uIEdvb2dsZVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1zdGVwPlxuICAgIDwvcS1zdGVwcGVyPlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBkZWZpbmVDb21wb25lbnQsIG9uTW91bnRlZCwgd2F0Y2gsIHJlZiB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyB1c2VSb3V0ZSB9IGZyb20gJ3Z1ZS1yb3V0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnU3RlcHNWaWV3ZXInLFxuICBzZXR1cCgpIHtcbiAgICBjb25zdCBzdGVwID0gcmVmKDEpO1xuICAgIGNvbnN0IHN0ZXBzID0gcmVmKFtcbiAgICAgIHsgbmFtZTogJ1N0ZXAxJywgaWQ6IDEgfSxcbiAgICAgIHsgbmFtZTogJ1N0ZXAyJywgaWQ6IDIgfSxcbiAgICAgIHsgbmFtZTogJ1N0ZXAzJywgaWQ6IDMgfSxcbiAgICBdKTtcblxuICAgIGNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBpZiAocm91dGUucGFyYW1zLnN0ZXBzKSB7XG4gICAgICAgIGNvbnN0IHJvdXRlU3RlcHMgPSByb3V0ZS5wYXJhbXMuc3RlcHMuc3BsaXQoLyUyMHxcXHMvKTtcbiAgICAgICAgc3RlcHMudmFsdWUgPSByb3V0ZVN0ZXBzLm1hcCgobmFtZSwgaWR4KSA9PiAoe1xuICAgICAgICAgIGlkOiBpZHggKyAxLFxuICAgICAgICAgIG5hbWU6IGRlY29kZVVSSUNvbXBvbmVudChuYW1lLnJlcGxhY2UoL18vZywgJyAnKSksXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHdhdGNoKCgpID0+IHJvdXRlLnBhcmFtcy5zdGVwcywgKG5ld1N0ZXBzKSA9PiB7XG4gICAgICAvLyDmm7TmlrBgc3RlcHNg5qih5Z6LXG4gICAgICBpZiAobmV3U3RlcHMpIHtcbiAgICAgICAgY29uc3Qgcm91dGVTdGVwcyA9IG5ld1N0ZXBzLnNwbGl0KC8lMjB8XFxzLyk7XG4gICAgICAgIHN0ZXBzLnZhbHVlID0gcm91dGVTdGVwcy5tYXAoKG5hbWUsIGlkeCkgPT4gKHtcbiAgICAgICAgICBpZDogaWR4LFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgZWRpdGluZzogZmFsc2UsXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG9wZW5Jbk5ld1RhYiA9IChuYW1lKSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX1gO1xuICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGVwLFxuICAgICAgc3RlcHMsXG4gICAgICBvcGVuSW5OZXdUYWIsXG4gICAgfTtcbiAgfSxcbn0pO1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiaWNvbiIsImNvbG9yIiwiUGFuZWxXcmFwcGVyIiwiX2NyZWF0ZUJsb2NrIiwiX3dpdGhDdHgiLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxJQUFBLG1CQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBRUQsT0FBTyxDQUFFLFFBQVEsTUFBUTtBQUFBLEVBRXpCLE1BQU8sT0FBTyxFQUFFLE9BQU8sS0FBSSxHQUFJO0FBQzdCLFFBQUksWUFBWSxPQUFPLFFBQVE7QUFDL0IsUUFBSSxRQUFRLE1BQU0sZ0JBQWdCLE1BQU0sY0FBYztBQUV0RCxhQUFTLFVBQVc7QUFDbEIsZ0JBQVUsT0FBUTtBQUNsQixlQUFTO0FBQ1Qsa0JBQVk7QUFFWixVQUFJLFVBQVUsTUFBTTtBQUNsQixxQkFBYSxLQUFLO0FBQ2xCLGdCQUFRO0FBQUEsTUFDVDtBQUVELFVBQUksa0JBQWtCLE1BQU07QUFDMUIscUJBQWEsYUFBYTtBQUMxQix3QkFBZ0I7QUFBQSxNQUNqQjtBQUVELGtCQUFZLFVBQVUsUUFBUSxvQkFBb0IsaUJBQWlCLFlBQVk7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
