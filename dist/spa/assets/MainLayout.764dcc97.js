import { k as createComponent, c as computed, h, l as hSlot, r as ref, m as isRuntimeSsrPreHydration, o as onMounted, n as onBeforeUnmount, p as noop, q as nextTick, g as getCurrentInstance, t as listenOpts, i as inject, u as emptyRenderFn, w as watch, v as hUniqueSlot, x as layoutKey, y as useDarkProps, z as useDark, A as isKeyCode, B as stopAndPrevent, H as History, C as client, D as getEventPath, E as onDeactivated, G as withDirectives, I as hDir, J as TouchPan, K as between, L as provide, M as pageContainerKey, N as reactive, a as onUnmounted, O as hMergeSlot, P as resolveComponent, Q as openBlock, R as createBlock, S as withCtx, f as createVNode, U as createBaseVNode, V as normalizeClass, W as createTextVNode, X as QSlider, Y as pushScopeId, Z as popScopeId, _ as _export_sfc, d as defineComponent } from "./index.f08ad2f1.js";
import { u as useRouterLinkProps, a as useRouterLink, Q as QBtn } from "./QBtn.1b6d240f.js";
import { v as vmHasRouter, c as css, g as getElement, a as vmIsDestroyed } from "./vm.b069c695.js";
import "./QSpinner.1517f046.js";
import "./use-size.cd9ed164.js";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var FileSaver_min = { exports: {} };
(function(module, exports) {
  (function(a, b) {
    b();
  })(commonjsGlobal, function() {
    function b(a2, b2) {
      return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
    }
    function c(a2, b2, c2) {
      var d2 = new XMLHttpRequest();
      d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
        g(d2.response, b2, c2);
      }, d2.onerror = function() {
        console.error("could not download file");
      }, d2.send();
    }
    function d(a2) {
      var b2 = new XMLHttpRequest();
      b2.open("HEAD", a2, false);
      try {
        b2.send();
      } catch (a3) {
      }
      return 200 <= b2.status && 299 >= b2.status;
    }
    function e(a2) {
      try {
        a2.dispatchEvent(new MouseEvent("click"));
      } catch (c2) {
        var b2 = document.createEvent("MouseEvents");
        b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
      }
    }
    var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
    } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h2) {
      var i = f.URL || f.webkitURL, j = document.createElement("a");
      g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h2) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
        i.revokeObjectURL(j.href);
      }, 4e4), setTimeout(function() {
        e(j);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h2) {
      if (g2 = g2 || f2.name || "download", "string" != typeof f2)
        navigator.msSaveOrOpenBlob(b(f2, h2), g2);
      else if (d(f2))
        c(f2, g2, h2);
      else {
        var i = document.createElement("a");
        i.href = f2, i.target = "_blank", setTimeout(function() {
          e(i);
        });
      }
    } : function(b2, d2, e2, g2) {
      if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2)
        return c(b2, d2, e2);
      var h2 = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((j || h2 && i || a) && "undefined" != typeof FileReader) {
        var k = new FileReader();
        k.onloadend = function() {
          var a2 = k.result;
          a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
        }, k.readAsDataURL(b2);
      } else {
        var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
        g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
          l.revokeObjectURL(m);
        }, 4e4);
      }
    });
    f.saveAs = g.saveAs = g, module.exports = g;
  });
})(FileSaver_min);
var QToolbar = createComponent({
  name: "QToolbar",
  props: {
    inset: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar row no-wrap items-center" + (props.inset === true ? " q-toolbar--inset" : "")
    );
    return () => h("div", { class: classes.value, role: "toolbar" }, hSlot(slots.default));
  }
});
function useCanRender() {
  const canRender = ref(!isRuntimeSsrPreHydration.value);
  if (canRender.value === false) {
    onMounted(() => {
      canRender.value = true;
    });
  }
  return canRender;
}
const hasObserver = typeof ResizeObserver !== "undefined";
const resizeProps = hasObserver === true ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
var QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    let timer = null, targetEl, size2 = { width: -1, height: -1 };
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (timer === null) {
        timer = setTimeout(emitEvent, props.debounce);
      }
    }
    function emitEvent() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (targetEl) {
        const { offsetWidth: width, offsetHeight: height } = targetEl;
        if (width !== size2.width || height !== size2.height) {
          size2 = { width, height };
          emit("resize", size2);
        }
      }
    }
    const { proxy } = getCurrentInstance();
    if (hasObserver === true) {
      let observer;
      const init = (stop) => {
        targetEl = proxy.$el.parentNode;
        if (targetEl) {
          observer = new ResizeObserver(trigger);
          observer.observe(targetEl);
          emitEvent();
        } else if (stop !== true) {
          nextTick(() => {
            init(true);
          });
        }
      };
      onMounted(() => {
        init();
      });
      onBeforeUnmount(() => {
        timer !== null && clearTimeout(timer);
        if (observer !== void 0) {
          if (observer.disconnect !== void 0) {
            observer.disconnect();
          } else if (targetEl) {
            observer.unobserve(targetEl);
          }
        }
      });
      return noop;
    } else {
      let cleanup = function() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        if (curDocView !== void 0) {
          if (curDocView.removeEventListener !== void 0) {
            curDocView.removeEventListener("resize", trigger, listenOpts.passive);
          }
          curDocView = void 0;
        }
      }, onObjLoad = function() {
        cleanup();
        if (targetEl && targetEl.contentDocument) {
          curDocView = targetEl.contentDocument.defaultView;
          curDocView.addEventListener("resize", trigger, listenOpts.passive);
          emitEvent();
        }
      };
      const canRender = useCanRender();
      let curDocView;
      onMounted(() => {
        nextTick(() => {
          targetEl = proxy.$el;
          targetEl && onObjLoad();
        });
      });
      onBeforeUnmount(cleanup);
      proxy.trigger = trigger;
      return () => {
        if (canRender.value === true) {
          return h("object", {
            style: resizeProps.style,
            tabindex: -1,
            type: "text/html",
            data: resizeProps.url,
            "aria-hidden": "true",
            onLoad: onObjLoad
          });
        }
      };
    }
  }
});
var QHeader = createComponent({
  name: "QHeader",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QHeader needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size2 = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("H") > -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size2.value : 0;
      }
      const offset2 = size2.value - $layout.scroll.value.position;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-header q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-top" + (props.bordered === true ? " q-header--bordered" : "") + (hidden.value === true ? " q-header--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.top, css2 = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css2[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css2[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css2;
    });
    function updateLayout(prop, val) {
      $layout.update("header", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size2, height);
      updateLayout("size", height);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch($layout.scroll, (scroll) => {
      props.reveal === true && updateLocal(
        revealed,
        scroll.direction === "up" || scroll.position <= props.revealOffset || scroll.position - scroll.inflectionPoint < 100
      );
    });
    const instance = {};
    $layout.instances.header = instance;
    props.modelValue === true && updateLayout("size", size2.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hUniqueSlot(slots.default, []);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      child.push(
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      );
      return h("header", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
var QItem = createComponent({
  name: "QItem",
  props: {
    ...useDarkProps,
    ...useRouterLinkProps,
    tag: {
      type: String,
      default: "div"
    },
    active: {
      type: Boolean,
      default: null
    },
    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,
    tabindex: [String, Number],
    focused: Boolean,
    manualFocus: Boolean
  },
  emits: ["click", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink();
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    const isActionable = computed(
      () => props.clickable === true || hasLink.value === true || props.tag === "label"
    );
    const isClickable = computed(
      () => props.disable !== true && isActionable.value === true
    );
    const classes = computed(
      () => "q-item q-item-type row no-wrap" + (props.dense === true ? " q-item--dense" : "") + (isDark.value === true ? " q-item--dark" : "") + (hasLink.value === true && props.active === null ? linkClass.value : props.active === true ? ` q-item--active${props.activeClass !== void 0 ? ` ${props.activeClass}` : ""}` : "") + (props.disable === true ? " disabled" : "") + (isClickable.value === true ? " q-item--clickable q-link cursor-pointer " + (props.manualFocus === true ? "q-manual-focusable" : "q-focusable q-hoverable") + (props.focused === true ? " q-manual-focusable--focused" : "") : "")
    );
    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: 16 + props.insetLevel * 56 + "px"
      };
    });
    function onClick(e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          } else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }
        navigateOnClick(e);
      }
    }
    function onKeyup(e) {
      if (isClickable.value === true && isKeyCode(e, 13) === true) {
        stopAndPrevent(e);
        e.qKeyEvent = true;
        const evt = new MouseEvent("click", e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }
      emit("keyup", e);
    }
    function getContent() {
      const child = hUniqueSlot(slots.default, []);
      isClickable.value === true && child.unshift(
        h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef })
      );
      return child;
    }
    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        role: "listitem",
        onClick,
        onKeyup
      };
      if (isClickable.value === true) {
        data.tabindex = props.tabindex || "0";
        Object.assign(data, linkAttrs.value);
      } else if (isActionable.value === true) {
        data["aria-disabled"] = "true";
      }
      return h(
        linkTag.value,
        data,
        getContent()
      );
    };
  }
});
var QList = createComponent({
  name: "QList",
  props: {
    ...useDarkProps,
    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean,
    tag: {
      type: String,
      default: "div"
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(
      () => "q-list" + (props.bordered === true ? " q-list--bordered" : "") + (props.dense === true ? " q-list--dense" : "") + (props.separator === true ? " q-list--separator" : "") + (isDark.value === true ? " q-list--dark" : "") + (props.padding === true ? " q-list--padding" : "")
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  hideOnRouteChange,
  handleShow,
  handleHide,
  processOnMount
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) {
      return;
    }
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) {
      return;
    }
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, href, closeTimer = null;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index = 0; index < path.length; index++) {
    const el = path[index];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) {
    return;
  }
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    href = window.location.href;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    if (window.location.href === href) {
      window.scrollTo(scrollPositionX, scrollPositionY);
    }
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
      return;
    }
    if (registered > 1) {
      return;
    }
  } else {
    if (registered === 0) {
      return;
    }
    registered--;
    if (registered > 0) {
      return;
    }
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      closeTimer !== null && clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = null;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
function useTimeout() {
  let timer = null;
  const vm = getCurrentInstance();
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout();
      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(fn, delay);
      }
    }
  };
}
const duration = 150;
var QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    noMiniAnimation: Boolean,
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "onLayout",
    "miniState"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QDrawer needs to be child of QLayout");
      return emptyRenderFn;
    }
    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(
      props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint
    );
    const isMini = computed(
      () => props.mini === true && belowBreakpoint.value !== true
    );
    const size2 = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true
    );
    const hideOnRouteChange = computed(
      () => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance !== void 0 && otherInstance.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size2.value);
      cleanup();
      if (noEvent !== true) {
        registerTimeout(() => {
          emit("hide", evt);
        }, duration);
      } else {
        removeTimeout();
      }
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(
      () => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(
      size2.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size2.value : 0);
    const fixed = computed(
      () => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") > -1 || $q.platform.is.ios === true && $layout.isContainer.value === true
    );
    const onLayout = computed(
      () => props.overlay === false && showing.value === true && belowBreakpoint.value === false
    );
    const onScreenOverlay = computed(
      () => props.overlay === true && showing.value === true && belowBreakpoint.value === false
    );
    const backdropClass = computed(
      () => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : "")
    );
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css2 = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css2.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css2.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css2.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css2.bottom = `${$layout.footer.size}px`;
        }
      }
      return css2;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size2.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(
      () => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto")
    );
    const classes = computed(
      () => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : ""))
    );
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size2.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("onLayout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size2, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size2.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.noMiniAnimation)
        return;
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("miniState", val);
    });
    function applyPosition(position) {
      if (position === void 0) {
        nextTick(() => {
          position = showing.value === true ? 0 : size2.value;
          applyPosition(stateDirection.value * position);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position) === size2.value)) {
          position += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      timerMini !== null && clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        timerMini = null;
        flagMiniAnimate.value = false;
        if (vm && vm.proxy && vm.proxy.$el) {
          vm.proxy.$el.classList.remove("q-drawer--mini-animate");
        }
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size2.value, position = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position, 0) : Math.min(0, position - width)
      );
      applyBackdrop(
        between(position / width, 0, 1)
      );
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size2.value, dir = evt.direction === props.side, position = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position);
      applyBackdrop(between(1 - position / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size3) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size3);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size2.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("onLayout", onLayout.value);
      emit("miniState", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher !== void 0 && layoutTotalWidthWatcher();
      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h("div", {
              key: "open",
              class: `q-drawer__opener fixed-${props.side}`,
              "aria-hidden": "true"
            }),
            openDirective.value
          )
        );
        child.push(
          hDir(
            "div",
            {
              ref: "backdrop",
              class: backdropClass.value,
              style: backdropStyle.value,
              "aria-hidden": "true",
              onClick: hide
            },
            void 0,
            "backdrop",
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h(
          "div",
          {
            ...attrs,
            key: "" + mini,
            class: [
              contentClass.value,
              attrs.class
            ]
          },
          mini === true ? slots.mini() : hSlot(slots.default)
        )
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(
          h("div", {
            class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
          })
        );
      }
      child.push(
        hDir(
          "aside",
          { ref: "content", class: classes.value, style: style.value },
          content,
          "contentclose",
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
var QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPageContainer needs to be child of QLayout");
      return emptyRenderFn;
    }
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css2 = {};
      if ($layout.header.space === true) {
        css2.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css2.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css2;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
const { passive } = listenOpts;
const axisValues = ["both", "horizontal", "vertical"];
var QScrollObserver = createComponent({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (v) => axisValues.includes(v),
      default: "vertical"
    },
    debounce: [String, Number],
    scrollTarget: {
      default: void 0
    }
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },
      direction: "down",
      directionChanged: false,
      delta: {
        top: 0,
        left: 0
      },
      inflectionPoint: {
        top: 0,
        left: 0
      }
    };
    let clearTimer = null, localScrollTarget, parentEl;
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function emitEvent() {
      clearTimer !== null && clearTimer();
      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);
      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };
      if (props.axis === "vertical" && delta.top === 0 || props.axis === "horizontal" && delta.left === 0) {
        return;
      }
      const curDir = Math.abs(delta.top) >= Math.abs(delta.left) ? delta.top < 0 ? "up" : "down" : delta.left < 0 ? "left" : "right";
      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;
      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }
      emit("scroll", { ...scroll });
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener("scroll", trigger, passive);
      trigger(true);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", trigger, passive);
        localScrollTarget = void 0;
      }
    }
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (clearTimer === null) {
        const [timer, fn] = props.debounce ? [setTimeout(emitEvent, props.debounce), clearTimeout] : [requestAnimationFrame(emitEvent), cancelAnimationFrame];
        clearTimer = () => {
          fn(timer);
          clearTimer = null;
        };
      }
    }
    const { proxy } = getCurrentInstance();
    watch(() => proxy.$q.lang.rtl, emitEvent);
    onMounted(() => {
      parentEl = proxy.$el.parentNode;
      configureScrollTarget();
    });
    onBeforeUnmount(() => {
      clearTimer !== null && clearTimer();
      unconfigureScrollTarget();
    });
    Object.assign(proxy, {
      trigger,
      getPosition: () => scroll
    });
    return noop;
  }
});
var QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(
      () => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard")
    );
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scrollHeight", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let animateTimer = null;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove("q-body--layout-animate");
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    if (getScrollbarWidth() > 0) {
      let restoreScrollbar = function() {
        timer = null;
        el.classList.remove("hide-scrollbar");
      }, hideScrollbar = function() {
        if (timer === null) {
          if (el.scrollHeight > $q.screen.height) {
            return;
          }
          el.classList.add("hide-scrollbar");
        } else {
          clearTimeout(timer);
        }
        timer = setTimeout(restoreScrollbar, 300);
      }, updateScrollEvent = function(action) {
        if (timer !== null && action === "remove") {
          clearTimeout(timer);
          restoreScrollbar();
        }
        window[`${action}EventListener`]("resize", hideScrollbar);
      };
      let timer = null;
      const el = document.body;
      watch(
        () => props.container !== true ? "add" : "remove",
        updateScrollEvent
      );
      props.container !== true && updateScrollEvent("add");
      onUnmounted(() => {
        updateScrollEvent("remove");
      });
    }
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-3bd19c82"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "big" }, "\u5927", -1));
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lHh Lpr lFf" }, {
    default: withCtx(() => [
      createVNode(QHeader, { elevated: "" }, {
        default: withCtx(() => [
          createVNode(QToolbar, null, {
            default: withCtx(() => [
              createVNode(QBtn, {
                flat: "",
                dense: "",
                round: "",
                icon: "menu",
                "aria-label": "Menu",
                onClick: _ctx.toggleLeftDrawer
              }, null, 8, ["onClick"]),
              createVNode(QBtn, {
                onClick: _ctx.copyLink,
                flat: "",
                round: "",
                icon: "ios_share",
                "aria-label": "Share",
                label: "Share"
              }, null, 8, ["onClick"]),
              createVNode(QBtn, {
                onClick: _ctx.downloadSteps,
                flat: "",
                round: "",
                icon: "cloud_download",
                "aria-label": "Download"
              }, null, 8, ["onClick"]),
              createVNode(QBtn, {
                flat: "",
                round: "",
                icon: "cloud_upload",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.clickFileUpload())
              }),
              createBaseVNode("input", {
                type: "file",
                accept: ".md",
                onChange: _cache[1] || (_cache[1] = (...args) => _ctx.handleFileUpload && _ctx.handleFileUpload(...args)),
                ref: "fileInput",
                style: { "display": "none" }
              }, null, 544)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDrawer, {
        modelValue: _ctx.leftDrawerOpen,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.leftDrawerOpen = $event),
        "show-if-above": "",
        bordered: ""
      }, {
        default: withCtx(() => [
          createVNode(QList, null, {
            default: withCtx(() => [
              createVNode(QItem, null, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    class: normalizeClass({ active: _ctx.isIn("intro") }),
                    flat: "",
                    dense: "",
                    icon: "info",
                    onClick: _ctx.goIntro
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u8AAA\u660E")
                    ]),
                    _: 1
                  }, 8, ["class", "onClick"])
                ]),
                _: 1
              }),
              createVNode(QItem, null, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    class: normalizeClass({ active: _ctx.isIn("edit") }),
                    flat: "",
                    dense: "",
                    icon: "edit",
                    onClick: _ctx.goEdit
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7DE8\u8F2F")
                    ]),
                    _: 1
                  }, 8, ["class", "onClick"])
                ]),
                _: 1
              }),
              createVNode(QItem, null, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    class: normalizeClass({ active: _ctx.isIn("search") }),
                    flat: "",
                    dense: "",
                    icon: "link",
                    onClick: _ctx.goSearch
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u641C\u8A62")
                    ]),
                    _: 1
                  }, 8, ["class", "onClick"])
                ]),
                _: 1
              }),
              createVNode(QItem, null, {
                default: withCtx(() => [
                  createTextVNode("\u5C0F"),
                  createVNode(QSlider, {
                    modelValue: _ctx.font_size,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.font_size = $event),
                    min: 10,
                    max: 30,
                    label: "",
                    "label-value": _ctx.font_size + "px",
                    color: "primary"
                  }, null, 8, ["modelValue", "label-value"]),
                  _hoisted_1
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(_component_router_view, { font_size: _ctx.font_size }, null, 8, ["font_size"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var MainLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "MainLayout",
  components: {
    QSlider
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const font_size = ref(16);
    return {
      hash: ref(window.location.hash || ""),
      font_size,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  },
  methods: {
    isIn(path) {
      console.log(this.$route.path.indexOf(path) > -1);
      return this.$route.path.indexOf(path) > -1;
    },
    goIntro() {
      this.$router.push("/intro/" + this.$route.params.steps);
    },
    goEdit() {
      this.$router.push("/edit/" + this.$route.params.steps);
    },
    goSearch() {
      this.$router.push("/search/" + this.$route.params.steps);
    },
    editStep() {
      if (this.$route.name == "EdiTor") {
        alert("You are already editing this step.");
        return;
      }
      this.$router.push(
        "/edit/_" + this.hash.replace("edit/", "").replace("_/", "")
      );
    },
    downloadSteps() {
      const title = window.prompt("Please Enter a Title:");
      if (!title)
        return;
      const steps = this.$route.params.steps.split(/%20|\s/);
      let markdownContent = steps.map((step, index) => `${index + 1}. ${step}`).join("\n");
      markdownContent = "# " + title + "\n\n" + markdownContent;
      const blob = new Blob([markdownContent], {
        type: "text/markdown;charset=utf-8"
      });
      FileSaver_min.exports.saveAs(blob, title + ".md");
    },
    clickFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          const steps = this.parseMarkdown(content);
          const stepsJoined = steps.join(" ");
          this.$router.push({
            path: `/edit/${encodeURIComponent(stepsJoined)}`
          });
        };
        reader.onerror = (error) => {
          console.error("File reading error:", error);
          alert("An error occurred while reading the file.");
        };
        reader.readAsText(file);
      }
    },
    parseMarkdown(content) {
      const lines = content.split("\n");
      const steps = lines.filter((line) => line.match(/^\d+\.\s+/)).map((line) => line.replace(/^\d+\.\s+/, ""));
      return steps;
    },
    copyLink() {
      if (!document.hasFocus()) {
        alert("Document does not have focus, cannot copy text.");
        return;
      }
      const copyText = "https://hackstep.pages.dev" + this.$route.path;
      navigator.clipboard.writeText(copyText).then(() => {
        window.alert("Copied the link: " + copyText);
      }).catch((err) => {
        console.error("Could not copy text: ", err);
      });
    }
  }
});
var MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__scopeId", "data-v-3bd19c82"], ["__file", "MainLayout.vue"]]);
export { MainLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC43NjRkY2M5Ny5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZpbGUtc2F2ZXIvZGlzdC9GaWxlU2F2ZXIubWluLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90b29sYmFyL1FUb29sYmFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtY2FuLXJlbmRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaGVhZGVyL1FIZWFkZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUxpc3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1oaXN0b3J5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtbW9kZWwtdG9nZ2xlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJldmVudC1zY3JvbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wcmV2ZW50LXNjcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2RyYXdlci9RRHJhd2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlQ29udGFpbmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zY3JvbGwtb2JzZXJ2ZXIvUVNjcm9sbE9ic2VydmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9sYXlvdXQvUUxheW91dC5qcyIsIi4uLy4uLy4uL3NyYy9sYXlvdXRzL01haW5MYXlvdXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyliKCk7ZWxzZXtiKCksYS5GaWxlU2F2ZXI9e2V4cG9ydHM6e319LmV4cG9ydHN9fSkodGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYj9iPXthdXRvQm9tOiExfTpcIm9iamVjdFwiIT10eXBlb2YgYiYmKGNvbnNvbGUud2FybihcIkRlcHJlY2F0ZWQ6IEV4cGVjdGVkIHRoaXJkIGFyZ3VtZW50IHRvIGJlIGEgb2JqZWN0XCIpLGI9e2F1dG9Cb206IWJ9KSxiLmF1dG9Cb20mJi9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGEudHlwZSk/bmV3IEJsb2IoW1wiXFx1RkVGRlwiLGFdLHt0eXBlOmEudHlwZX0pOmF9ZnVuY3Rpb24gYyhhLGIsYyl7dmFyIGQ9bmV3IFhNTEh0dHBSZXF1ZXN0O2Qub3BlbihcIkdFVFwiLGEpLGQucmVzcG9uc2VUeXBlPVwiYmxvYlwiLGQub25sb2FkPWZ1bmN0aW9uKCl7ZyhkLnJlc3BvbnNlLGIsYyl9LGQub25lcnJvcj1mdW5jdGlvbigpe2NvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZG93bmxvYWQgZmlsZVwiKX0sZC5zZW5kKCl9ZnVuY3Rpb24gZChhKXt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiSEVBRFwiLGEsITEpO3RyeXtiLnNlbmQoKX1jYXRjaChhKXt9cmV0dXJuIDIwMDw9Yi5zdGF0dXMmJjI5OT49Yi5zdGF0dXN9ZnVuY3Rpb24gZShhKXt0cnl7YS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpfWNhdGNoKGMpe3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7Yi5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsd2luZG93LDAsMCwwLDgwLDIwLCExLCExLCExLCExLDAsbnVsbCksYS5kaXNwYXRjaEV2ZW50KGIpfX12YXIgZj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cud2luZG93PT09d2luZG93P3dpbmRvdzpcIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZj9zZWxmOlwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWw/Z2xvYmFsOnZvaWQgMCxhPWYubmF2aWdhdG9yJiYvTWFjaW50b3NoLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpJiYvQXBwbGVXZWJLaXQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkmJiEvU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLGc9Zi5zYXZlQXN8fChcIm9iamVjdFwiIT10eXBlb2Ygd2luZG93fHx3aW5kb3chPT1mP2Z1bmN0aW9uKCl7fTpcImRvd25sb2FkXCJpbiBIVE1MQW5jaG9yRWxlbWVudC5wcm90b3R5cGUmJiFhP2Z1bmN0aW9uKGIsZyxoKXt2YXIgaT1mLlVSTHx8Zi53ZWJraXRVUkwsaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtnPWd8fGIubmFtZXx8XCJkb3dubG9hZFwiLGouZG93bmxvYWQ9ZyxqLnJlbD1cIm5vb3BlbmVyXCIsXCJzdHJpbmdcIj09dHlwZW9mIGI/KGouaHJlZj1iLGoub3JpZ2luPT09bG9jYXRpb24ub3JpZ2luP2Uoaik6ZChqLmhyZWYpP2MoYixnLGgpOmUoaixqLnRhcmdldD1cIl9ibGFua1wiKSk6KGouaHJlZj1pLmNyZWF0ZU9iamVjdFVSTChiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5yZXZva2VPYmplY3RVUkwoai5ocmVmKX0sNEU0KSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShqKX0sMCkpfTpcIm1zU2F2ZU9yT3BlbkJsb2JcImluIG5hdmlnYXRvcj9mdW5jdGlvbihmLGcsaCl7aWYoZz1nfHxmLm5hbWV8fFwiZG93bmxvYWRcIixcInN0cmluZ1wiIT10eXBlb2YgZiluYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihiKGYsaCksZyk7ZWxzZSBpZihkKGYpKWMoZixnLGgpO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7aS5ocmVmPWYsaS50YXJnZXQ9XCJfYmxhbmtcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShpKX0pfX06ZnVuY3Rpb24oYixkLGUsZyl7aWYoZz1nfHxvcGVuKFwiXCIsXCJfYmxhbmtcIiksZyYmKGcuZG9jdW1lbnQudGl0bGU9Zy5kb2N1bWVudC5ib2R5LmlubmVyVGV4dD1cImRvd25sb2FkaW5nLi4uXCIpLFwic3RyaW5nXCI9PXR5cGVvZiBiKXJldHVybiBjKGIsZCxlKTt2YXIgaD1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiPT09Yi50eXBlLGk9L2NvbnN0cnVjdG9yL2kudGVzdChmLkhUTUxFbGVtZW50KXx8Zi5zYWZhcmksaj0vQ3JpT1NcXC9bXFxkXSsvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoKGp8fGgmJml8fGEpJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcil7dmFyIGs9bmV3IEZpbGVSZWFkZXI7ay5vbmxvYWRlbmQ9ZnVuY3Rpb24oKXt2YXIgYT1rLnJlc3VsdDthPWo/YTphLnJlcGxhY2UoL15kYXRhOlteO10qOy8sXCJkYXRhOmF0dGFjaG1lbnQvZmlsZTtcIiksZz9nLmxvY2F0aW9uLmhyZWY9YTpsb2NhdGlvbj1hLGc9bnVsbH0say5yZWFkQXNEYXRhVVJMKGIpfWVsc2V7dmFyIGw9Zi5VUkx8fGYud2Via2l0VVJMLG09bC5jcmVhdGVPYmplY3RVUkwoYik7Zz9nLmxvY2F0aW9uPW06bG9jYXRpb24uaHJlZj1tLGc9bnVsbCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bC5yZXZva2VPYmplY3RVUkwobSl9LDRFNCl9fSk7Zi5zYXZlQXM9Zy5zYXZlQXM9ZyxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9Zyl9KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmlsZVNhdmVyLm1pbi5qcy5tYXAiLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvb2xiYXInLFxuXG4gIHByb3BzOiB7XG4gICAgaW5zZXQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdG9vbGJhciByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5pbnNldCA9PT0gdHJ1ZSA/ICcgcS10b29sYmFyLS1pbnNldCcgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSwgcm9sZTogJ3Rvb2xiYXInIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbi8vIHVzaW5nIGl0IHRvIG1hbmFnZSBTU1IgcmVuZGVyaW5nIHdpdGggYmVzdCBwZXJmb3JtYW5jZVxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBjYW5SZW5kZXIgPSByZWYoIWlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSlcblxuICBpZiAoY2FuUmVuZGVyLnZhbHVlID09PSBmYWxzZSkge1xuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBjYW5SZW5kZXIudmFsdWUgPSB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBjYW5SZW5kZXJcbn1cbiIsImltcG9ydCB7IGgsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQ2FuUmVuZGVyIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWNhbi1yZW5kZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgbGlzdGVuT3B0cywgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuXG5jb25zdCBoYXNPYnNlcnZlciA9IHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCdcbmNvbnN0IHJlc2l6ZVByb3BzID0gaGFzT2JzZXJ2ZXIgPT09IHRydWVcbiAgPyB7fVxuICA6IHtcbiAgICAgIHN0eWxlOiAnZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93OmhpZGRlbjtwb2ludGVyLWV2ZW50czpub25lO3otaW5kZXg6LTE7JyxcbiAgICAgIHVybDogJ2Fib3V0OmJsYW5rJ1xuICAgIH1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FSZXNpemVPYnNlcnZlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBkZWJvdW5jZToge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMTAwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXNpemUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHsgcmV0dXJuIG5vb3AgfVxuXG4gICAgbGV0IHRpbWVyID0gbnVsbCwgdGFyZ2V0RWwsIHNpemUgPSB7IHdpZHRoOiAtMSwgaGVpZ2h0OiAtMSB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyIChpbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmRlYm91bmNlID09PSAwIHx8IHByb3BzLmRlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlbWl0RXZlbnQsIHByb3BzLmRlYm91bmNlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRFdmVudCAoKSB7XG4gICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldEVsKSB7XG4gICAgICAgIGNvbnN0IHsgb2Zmc2V0V2lkdGg6IHdpZHRoLCBvZmZzZXRIZWlnaHQ6IGhlaWdodCB9ID0gdGFyZ2V0RWxcblxuICAgICAgICBpZiAod2lkdGggIT09IHNpemUud2lkdGggfHwgaGVpZ2h0ICE9PSBzaXplLmhlaWdodCkge1xuICAgICAgICAgIHNpemUgPSB7IHdpZHRoLCBoZWlnaHQgfVxuICAgICAgICAgIGVtaXQoJ3Jlc2l6ZScsIHNpemUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgaWYgKGhhc09ic2VydmVyID09PSB0cnVlKSB7XG4gICAgICBsZXQgb2JzZXJ2ZXJcblxuICAgICAgLy8gaW5pdGlhbGl6ZSBhcyBzb29uIGFzIHBvc3NpYmxlXG4gICAgICBjb25zdCBpbml0ID0gc3RvcCA9PiB7XG4gICAgICAgIHRhcmdldEVsID0gcHJveHkuJGVsLnBhcmVudE5vZGVcblxuICAgICAgICBpZiAodGFyZ2V0RWwpIHtcbiAgICAgICAgICBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0cmlnZ2VyKVxuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0RWwpXG4gICAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdG9wICE9PSB0cnVlKSB7XG4gICAgICAgICAgbmV4dFRpY2soKCkgPT4geyBpbml0KHRydWUpIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25Nb3VudGVkKCgpID0+IHsgaW5pdCgpIH0pXG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAgIHRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lcilcblxuICAgICAgICBpZiAob2JzZXJ2ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5kaXNjb25uZWN0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh0YXJnZXRFbCkgeyAvLyBGRiBmb3IgQW5kcm9pZFxuICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKHRhcmdldEVsKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9XG4gICAgZWxzZSB7IC8vIG5vIG9ic2VydmVyLCBzbyBmYWxsYmFjayB0byBvbGQgaWZyYW1lIG1ldGhvZFxuICAgICAgY29uc3QgY2FuUmVuZGVyID0gdXNlQ2FuUmVuZGVyKClcblxuICAgICAgbGV0IGN1ckRvY1ZpZXdcblxuICAgICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJEb2NWaWV3ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAvLyBpT1MgaXMgZnV6enksIG5lZWQgdG8gY2hlY2sgaXQgZmlyc3RcbiAgICAgICAgICBpZiAoY3VyRG9jVmlldy5yZW1vdmVFdmVudExpc3RlbmVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGN1ckRvY1ZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdHJpZ2dlciwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJEb2NWaWV3ID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25PYmpMb2FkICgpIHtcbiAgICAgICAgY2xlYW51cCgpXG5cbiAgICAgICAgaWYgKHRhcmdldEVsICYmIHRhcmdldEVsLmNvbnRlbnREb2N1bWVudCkge1xuICAgICAgICAgIGN1ckRvY1ZpZXcgPSB0YXJnZXRFbC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgICAgICAgICBjdXJEb2NWaWV3LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRyaWdnZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcbiAgICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICB0YXJnZXRFbCA9IHByb3h5LiRlbFxuICAgICAgICAgIHRhcmdldEVsICYmIG9uT2JqTG9hZCgpXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBvbkJlZm9yZVVubW91bnQoY2xlYW51cClcblxuICAgICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RcbiAgICAgIHByb3h5LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChjYW5SZW5kZXIudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gaCgnb2JqZWN0Jywge1xuICAgICAgICAgICAgc3R5bGU6IHJlc2l6ZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgdGFiaW5kZXg6IC0xLCAvLyBmaXggZm9yIEZpcmVmb3hcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2h0bWwnLFxuICAgICAgICAgICAgZGF0YTogcmVzaXplUHJvcHMudXJsLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICAgb25Mb2FkOiBvbk9iakxvYWRcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoVW5pcXVlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUhlYWRlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgcmV2ZWFsOiBCb29sZWFuLFxuICAgIHJldmVhbE9mZnNldDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMjUwXG4gICAgfSxcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBlbGV2YXRlZDogQm9vbGVhbixcblxuICAgIGhlaWdodEhpbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDUwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXZlYWwnLCAnZm9jdXNpbicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRSGVhZGVyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcmVmKHBhcnNlSW50KHByb3BzLmhlaWdodEhpbnQsIDEwKSlcbiAgICBjb25zdCByZXZlYWxlZCA9IHJlZih0cnVlKVxuXG4gICAgY29uc3QgZml4ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucmV2ZWFsID09PSB0cnVlXG4gICAgICB8fCAkbGF5b3V0LnZpZXcudmFsdWUuaW5kZXhPZignSCcpID4gLTFcbiAgICAgIHx8ICgkcS5wbGF0Zm9ybS5pcy5pb3MgJiYgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCBvZmZzZXQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiByZXZlYWxlZC52YWx1ZSA9PT0gdHJ1ZSA/IHNpemUudmFsdWUgOiAwXG4gICAgICB9XG4gICAgICBjb25zdCBvZmZzZXQgPSBzaXplLnZhbHVlIC0gJGxheW91dC5zY3JvbGwudmFsdWUucG9zaXRpb25cbiAgICAgIHJldHVybiBvZmZzZXQgPiAwID8gb2Zmc2V0IDogMFxuICAgIH0pXG5cbiAgICBjb25zdCBoaWRkZW4gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlXG4gICAgICB8fCAoZml4ZWQudmFsdWUgPT09IHRydWUgJiYgcmV2ZWFsZWQudmFsdWUgIT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3QgcmV2ZWFsT25Gb2N1cyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5yZXZlYWwgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWhlYWRlciBxLWxheW91dF9fc2VjdGlvbi0tbWFyZ2luYWwgJ1xuICAgICAgKyAoZml4ZWQudmFsdWUgPT09IHRydWUgPyAnZml4ZWQnIDogJ2Fic29sdXRlJykgKyAnLXRvcCdcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWhlYWRlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChoaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtaGVhZGVyLS1oaWRkZW4nIDogJycpXG4gICAgICArIChwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlID8gJyBxLWxheW91dC0tcHJldmVudC1mb2N1cycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIHZpZXcgPSAkbGF5b3V0LnJvd3MudmFsdWUudG9wLFxuICAgICAgICBjc3MgPSB7fVxuXG4gICAgICBpZiAodmlld1sgMCBdID09PSAnbCcgJiYgJGxheW91dC5sZWZ0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgJHEubGFuZy5ydGwgPT09IHRydWUgPyAncmlnaHQnIDogJ2xlZnQnIF0gPSBgJHsgJGxheW91dC5sZWZ0LnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKHZpZXdbIDIgXSA9PT0gJ3InICYmICRsYXlvdXQucmlnaHQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXSA9IGAkeyAkbGF5b3V0LnJpZ2h0LnNpemUgfXB4YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxheW91dCAocHJvcCwgdmFsKSB7XG4gICAgICAkbGF5b3V0LnVwZGF0ZSgnaGVhZGVyJywgcHJvcCwgdmFsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsIChwcm9wLCB2YWwpIHtcbiAgICAgIGlmIChwcm9wLnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgcHJvcC52YWx1ZSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVzaXplICh7IGhlaWdodCB9KSB7XG4gICAgICB1cGRhdGVMb2NhbChzaXplLCBoZWlnaHQpXG4gICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCBoZWlnaHQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c2luIChldnQpIHtcbiAgICAgIGlmIChyZXZlYWxPbkZvY3VzLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZUxvY2FsKHJldmVhbGVkLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdmb2N1c2luJywgZXZ0KVxuICAgIH1cblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIHZhbCA9PiB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgdmFsKVxuICAgICAgdXBkYXRlTG9jYWwocmV2ZWFsZWQsIHRydWUpXG4gICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgIH0pXG5cbiAgICB3YXRjaChvZmZzZXQsIHZhbCA9PiB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMucmV2ZWFsLCB2YWwgPT4ge1xuICAgICAgdmFsID09PSBmYWxzZSAmJiB1cGRhdGVMb2NhbChyZXZlYWxlZCwgcHJvcHMubW9kZWxWYWx1ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2gocmV2ZWFsZWQsIHZhbCA9PiB7XG4gICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgZW1pdCgncmV2ZWFsJywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgkbGF5b3V0LnNjcm9sbCwgc2Nyb2xsID0+IHtcbiAgICAgIHByb3BzLnJldmVhbCA9PT0gdHJ1ZSAmJiB1cGRhdGVMb2NhbChyZXZlYWxlZCxcbiAgICAgICAgc2Nyb2xsLmRpcmVjdGlvbiA9PT0gJ3VwJ1xuICAgICAgICB8fCBzY3JvbGwucG9zaXRpb24gPD0gcHJvcHMucmV2ZWFsT2Zmc2V0XG4gICAgICAgIHx8IHNjcm9sbC5wb3NpdGlvbiAtIHNjcm9sbC5pbmZsZWN0aW9uUG9pbnQgPCAxMDBcbiAgICAgIClcbiAgICB9KVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSB7fVxuXG4gICAgJGxheW91dC5pbnN0YW5jZXMuaGVhZGVyID0gaW5zdGFuY2VcbiAgICBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIHVwZGF0ZUxheW91dCgnc2l6ZScsIHNpemUudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIHByb3BzLm1vZGVsVmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCBvZmZzZXQudmFsdWUpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgaWYgKCRsYXlvdXQuaW5zdGFuY2VzLmhlYWRlciA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXMuaGVhZGVyID0gdm9pZCAwXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcblxuICAgICAgcHJvcHMuZWxldmF0ZWQgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1sYXlvdXRfX3NoYWRvdyBhYnNvbHV0ZS1mdWxsIG92ZXJmbG93LWhpZGRlbiBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHtcbiAgICAgICAgICBkZWJvdW5jZTogMCxcbiAgICAgICAgICBvblJlc2l6ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnaGVhZGVyJywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICBvbkZvY3VzaW5cbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhVbmlxdWVTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSXRlbScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICBhY3RpdmU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIGNsaWNrYWJsZTogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBpbnNldExldmVsOiBOdW1iZXIsXG5cbiAgICB0YWJpbmRleDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgZm9jdXNlZDogQm9vbGVhbixcbiAgICBtYW51YWxGb2N1czogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbICdjbGljaycsICdrZXl1cCcgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHsgaGFzTGluaywgbGlua0F0dHJzLCBsaW5rQ2xhc3MsIGxpbmtUYWcsIG5hdmlnYXRlT25DbGljayB9ID0gdXNlUm91dGVyTGluaygpXG5cbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgaXNBY3Rpb25hYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBoYXNMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICAgIHx8IHByb3BzLnRhZyA9PT0gJ2xhYmVsJ1xuICAgIClcblxuICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaXNBY3Rpb25hYmxlLnZhbHVlID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtIHEtaXRlbS10eXBlIHJvdyBuby13cmFwJ1xuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtaXRlbS0tZGVuc2UnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtaXRlbS0tZGFyaycgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBoYXNMaW5rLnZhbHVlID09PSB0cnVlICYmIHByb3BzLmFjdGl2ZSA9PT0gbnVsbFxuICAgICAgICAgID8gbGlua0NsYXNzLnZhbHVlXG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgIHByb3BzLmFjdGl2ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gYCBxLWl0ZW0tLWFjdGl2ZSR7IHByb3BzLmFjdGl2ZUNsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmFjdGl2ZUNsYXNzIH1gIDogJycgfWBcbiAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICApXG4gICAgICApXG4gICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLWl0ZW0tLWNsaWNrYWJsZSBxLWxpbmsgY3Vyc29yLXBvaW50ZXIgJ1xuICAgICAgICAgICAgKyAocHJvcHMubWFudWFsRm9jdXMgPT09IHRydWUgPyAncS1tYW51YWwtZm9jdXNhYmxlJyA6ICdxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZScpXG4gICAgICAgICAgICArIChwcm9wcy5mb2N1c2VkID09PSB0cnVlID8gJyBxLW1hbnVhbC1mb2N1c2FibGUtLWZvY3VzZWQnIDogJycpXG4gICAgICAgICAgOiAnJ1xuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmluc2V0TGV2ZWwgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCdcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFsgJ3BhZGRpbmcnICsgZGlyIF06ICgxNiArIHByb3BzLmluc2V0TGV2ZWwgKiA1NikgKyAncHgnXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoYmx1clRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChlLnFLZXlFdmVudCAhPT0gdHJ1ZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gYmx1clRhcmdldFJlZi52YWx1ZSkge1xuICAgICAgICAgICAgcm9vdFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmF2aWdhdGVPbkNsaWNrKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIGlzS2V5Q29kZShlLCAxMykgPT09IHRydWUpIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgICAgICAvLyBmb3IgcmlwcGxlXG4gICAgICAgIGUucUtleUV2ZW50ID0gdHJ1ZVxuXG4gICAgICAgIC8vIGZvciBjbGljayB0cmlnZ2VyXG4gICAgICAgIGNvbnN0IGV2dCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycsIGUpXG4gICAgICAgIGV2dC5xS2V5RXZlbnQgPSB0cnVlXG4gICAgICAgIHJvb3RSZWYudmFsdWUuZGlzcGF0Y2hFdmVudChldnQpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2tleXVwJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gaFVuaXF1ZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW10pXG5cbiAgICAgIGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnVuc2hpZnQoXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWZvY3VzLWhlbHBlcicsIHRhYmluZGV4OiAtMSwgcmVmOiBibHVyVGFyZ2V0UmVmIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICByZWY6IHJvb3RSZWYsXG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAgIHJvbGU6ICdsaXN0aXRlbScsXG4gICAgICAgIG9uQ2xpY2ssXG4gICAgICAgIG9uS2V5dXBcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGEudGFiaW5kZXggPSBwcm9wcy50YWJpbmRleCB8fCAnMCdcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCBsaW5rQXR0cnMudmFsdWUpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZGF0YVsgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoXG4gICAgICAgIGxpbmtUYWcudmFsdWUsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdldENvbnRlbnQoKVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRTGlzdCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBzZXBhcmF0b3I6IEJvb2xlYW4sXG4gICAgcGFkZGluZzogQm9vbGVhbixcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWxpc3QnXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1saXN0LS1ib3JkZXJlZCcgOiAnJylcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWxpc3QtLWRlbnNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc2VwYXJhdG9yID09PSB0cnVlID8gJyBxLWxpc3QtLXNlcGFyYXRvcicgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1saXN0LS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMucGFkZGluZyA9PT0gdHJ1ZSA/ICcgcS1saXN0LS1wYWRkaW5nJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKHByb3BzLnRhZywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKSB7XG4gIGxldCBoaXN0b3J5RW50cnlcblxuICBmdW5jdGlvbiByZW1vdmVGcm9tSGlzdG9yeSAoKSB7XG4gICAgaWYgKGhpc3RvcnlFbnRyeSAhPT0gdm9pZCAwKSB7XG4gICAgICBIaXN0b3J5LnJlbW92ZShoaXN0b3J5RW50cnkpXG4gICAgICBoaXN0b3J5RW50cnkgPSB2b2lkIDBcbiAgICB9XG4gIH1cblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcmVtb3ZlRnJvbUhpc3RvcnkoKVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlRnJvbUhpc3RvcnksXG5cbiAgICBhZGRUb0hpc3RvcnkgKCkge1xuICAgICAgaGlzdG9yeUVudHJ5ID0ge1xuICAgICAgICBjb25kaXRpb246ICgpID0+IGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlLFxuICAgICAgICBoYW5kbGVyOiBoaWRlXG4gICAgICB9XG5cbiAgICAgIEhpc3RvcnkuYWRkKGhpc3RvcnlFbnRyeSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHdhdGNoLCBuZXh0VGljaywgb25Nb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcblxuICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IFsgRnVuY3Rpb24sIEFycmF5IF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlRW1pdHMgPSBbXG4gICdiZWZvcmVTaG93JywgJ3Nob3cnLCAnYmVmb3JlSGlkZScsICdoaWRlJ1xuXVxuXG4vLyBoYW5kbGVTaG93L2hhbmRsZUhpZGUgLT4gcmVtb3ZlVGljaygpLCBzZWxmICgmIGVtaXQgc2hvdylcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHtcbiAgc2hvd2luZyxcbiAgY2FuU2hvdywgLy8gb3B0aW9uYWxcbiAgaGlkZU9uUm91dGVDaGFuZ2UsIC8vIG9wdGlvbmFsXG4gIGhhbmRsZVNob3csIC8vIG9wdGlvbmFsXG4gIGhhbmRsZUhpZGUsIC8vIG9wdGlvbmFsXG4gIHByb2Nlc3NPbk1vdW50IC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IHBheWxvYWRcblxuICBmdW5jdGlvbiB0b2dnbGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBoaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzaG93KGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93IChldnQpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICB8fCAoZXZ0ICE9PSB2b2lkIDAgJiYgZXZ0LnFBbmNob3JIYW5kbGVkID09PSB0cnVlKVxuICAgICAgfHwgKGNhblNob3cgIT09IHZvaWQgMCAmJiBjYW5TaG93KGV2dCkgIT09IHRydWUpXG4gICAgKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG5cbiAgICBpZiAobGlzdGVuZXIgPT09IHRydWUgJiYgX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc1Nob3coZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTaG93IChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2hvd2luZy52YWx1ZSA9IHRydWVcblxuICAgIGVtaXQoJ2JlZm9yZVNob3cnLCBldnQpXG5cbiAgICBpZiAoaGFuZGxlU2hvdyAhPT0gdm9pZCAwKSB7XG4gICAgICBoYW5kbGVTaG93KGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUgKGV2dCkge1xuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gfHwgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuXG4gICAgaWYgKGxpc3RlbmVyID09PSB0cnVlICYmIF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIHBheWxvYWQgPSBldnRcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IGV2dCkge1xuICAgICAgICAgIHBheWxvYWQgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCB8fCBsaXN0ZW5lciA9PT0gZmFsc2UgfHwgX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgICBwcm9jZXNzSGlkZShldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0hpZGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2hvd2luZy52YWx1ZSA9IGZhbHNlXG5cbiAgICBlbWl0KCdiZWZvcmVIaWRlJywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZUhpZGUgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlSGlkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzTW9kZWxDaGFuZ2UgKHZhbCkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlICYmIHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCh2YWwgPT09IHRydWUpICE9PSBzaG93aW5nLnZhbHVlKSB7XG4gICAgICBjb25zdCBmbiA9IHZhbCA9PT0gdHJ1ZSA/IHByb2Nlc3NTaG93IDogcHJvY2Vzc0hpZGVcbiAgICAgIGZuKHBheWxvYWQpXG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgcHJvY2Vzc01vZGVsQ2hhbmdlKVxuXG4gIGlmIChoaWRlT25Sb3V0ZUNoYW5nZSAhPT0gdm9pZCAwICYmIHZtSGFzUm91dGVyKHZtKSA9PT0gdHJ1ZSkge1xuICAgIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgICAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaGlkZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByb2Nlc3NPbk1vdW50ID09PSB0cnVlICYmIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJvY2Vzc01vZGVsQ2hhbmdlKHByb3BzLm1vZGVsVmFsdWUpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIGNvbnN0IHB1YmxpY01ldGhvZHMgPSB7IHNob3csIGhpZGUsIHRvZ2dsZSB9XG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHB1YmxpY01ldGhvZHMpXG5cbiAgcmV0dXJuIHB1YmxpY01ldGhvZHNcbn1cbiIsImltcG9ydCB7IGNzcywgZ2V0RWxlbWVudCB9IGZyb20gJy4vZG9tLmpzJ1xuXG5jb25zdCBzY3JvbGxUYXJnZXRzID0gX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8gW11cbiAgOiBbIG51bGwsIGRvY3VtZW50LCBkb2N1bWVudC5ib2R5LCBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsVGFyZ2V0IChlbCwgdGFyZ2V0RWwpIHtcbiAgbGV0IHRhcmdldCA9IGdldEVsZW1lbnQodGFyZ2V0RWwpXG5cbiAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7XG4gICAgaWYgKGVsID09PSB2b2lkIDAgfHwgZWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB3aW5kb3dcbiAgICB9XG5cbiAgICB0YXJnZXQgPSBlbC5jbG9zZXN0KCcuc2Nyb2xsLC5zY3JvbGwteSwub3ZlcmZsb3ctYXV0bycpXG4gIH1cblxuICByZXR1cm4gc2Nyb2xsVGFyZ2V0cy5pbmNsdWRlcyh0YXJnZXQpXG4gICAgPyB3aW5kb3dcbiAgICA6IHRhcmdldFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0IChlbCkge1xuICByZXR1cm4gKGVsID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogZWwpLnNjcm9sbEhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsV2lkdGggKGVsKSB7XG4gIHJldHVybiAoZWwgPT09IHdpbmRvdyA/IGRvY3VtZW50LmJvZHkgOiBlbCkuc2Nyb2xsV2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCkge1xuICByZXR1cm4gc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwXG4gICAgOiBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCkge1xuICByZXR1cm4gc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMFxuICAgIDogc2Nyb2xsVGFyZ2V0LnNjcm9sbExlZnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1WZXJ0aWNhbFNjcm9sbFRvIChlbCwgdG8sIGR1cmF0aW9uID0gMCAvKiAsIHByZXZUaW1lICovKSB7XG4gIGNvbnN0IHByZXZUaW1lID0gYXJndW1lbnRzWyAzIF0gPT09IHZvaWQgMCA/IHBlcmZvcm1hbmNlLm5vdygpIDogYXJndW1lbnRzWyAzIF1cbiAgY29uc3QgcG9zID0gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihlbClcblxuICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgIGlmIChwb3MgIT09IHRvKSB7XG4gICAgICBzZXRTY3JvbGwoZWwsIHRvKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShub3dUaW1lID0+IHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSBub3dUaW1lIC0gcHJldlRpbWVcbiAgICBjb25zdCBuZXdQb3MgPSBwb3MgKyAodG8gLSBwb3MpIC8gTWF0aC5tYXgoZnJhbWVUaW1lLCBkdXJhdGlvbikgKiBmcmFtZVRpbWVcbiAgICBzZXRTY3JvbGwoZWwsIG5ld1BvcylcbiAgICBpZiAobmV3UG9zICE9PSB0bykge1xuICAgICAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8oZWwsIHRvLCBkdXJhdGlvbiAtIGZyYW1lVGltZSwgbm93VGltZSlcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltSG9yaXpvbnRhbFNjcm9sbFRvIChlbCwgdG8sIGR1cmF0aW9uID0gMCAvKiAsIHByZXZUaW1lICovKSB7XG4gIGNvbnN0IHByZXZUaW1lID0gYXJndW1lbnRzWyAzIF0gPT09IHZvaWQgMCA/IHBlcmZvcm1hbmNlLm5vdygpIDogYXJndW1lbnRzWyAzIF1cbiAgY29uc3QgcG9zID0gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKGVsKVxuXG4gIGlmIChkdXJhdGlvbiA8PSAwKSB7XG4gICAgaWYgKHBvcyAhPT0gdG8pIHtcbiAgICAgIHNldEhvcml6b250YWxTY3JvbGwoZWwsIHRvKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShub3dUaW1lID0+IHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSBub3dUaW1lIC0gcHJldlRpbWVcbiAgICBjb25zdCBuZXdQb3MgPSBwb3MgKyAodG8gLSBwb3MpIC8gTWF0aC5tYXgoZnJhbWVUaW1lLCBkdXJhdGlvbikgKiBmcmFtZVRpbWVcbiAgICBzZXRIb3Jpem9udGFsU2Nyb2xsKGVsLCBuZXdQb3MpXG4gICAgaWYgKG5ld1BvcyAhPT0gdG8pIHtcbiAgICAgIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8oZWwsIHRvLCBkdXJhdGlvbiAtIGZyYW1lVGltZSwgbm93VGltZSlcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHNldFNjcm9sbCAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpIHtcbiAgaWYgKHNjcm9sbFRhcmdldCA9PT0gd2luZG93KSB7XG4gICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgb2Zmc2V0KVxuICAgIHJldHVyblxuICB9XG4gIHNjcm9sbFRhcmdldC5zY3JvbGxUb3AgPSBvZmZzZXRcbn1cblxuZnVuY3Rpb24gc2V0SG9yaXpvbnRhbFNjcm9sbCAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpIHtcbiAgaWYgKHNjcm9sbFRhcmdldCA9PT0gd2luZG93KSB7XG4gICAgd2luZG93LnNjcm9sbFRvKG9mZnNldCwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApXG4gICAgcmV0dXJuXG4gIH1cbiAgc2Nyb2xsVGFyZ2V0LnNjcm9sbExlZnQgPSBvZmZzZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCwgb2Zmc2V0LCBkdXJhdGlvbikge1xuICBpZiAoZHVyYXRpb24pIHtcbiAgICBhbmltVmVydGljYWxTY3JvbGxUbyhzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgcmV0dXJuXG4gIH1cbiAgc2V0U2Nyb2xsKHNjcm9sbFRhcmdldCwgb2Zmc2V0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgYW5pbUhvcml6b250YWxTY3JvbGxUbyhzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgcmV0dXJuXG4gIH1cbiAgc2V0SG9yaXpvbnRhbFNjcm9sbChzY3JvbGxUYXJnZXQsIG9mZnNldClcbn1cblxubGV0IHNpemVcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCAoKSB7XG4gIGlmIChzaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc2l6ZVxuICB9XG5cbiAgY29uc3RcbiAgICBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSxcbiAgICBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgY3NzKGlubmVyLCB7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcyMDBweCdcbiAgfSlcbiAgY3NzKG91dGVyLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMHB4JyxcbiAgICBsZWZ0OiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICB3aWR0aDogJzIwMHB4JyxcbiAgICBoZWlnaHQ6ICcxNTBweCcsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gIH0pXG5cbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcilcblxuICBjb25zdCB3MSA9IGlubmVyLm9mZnNldFdpZHRoXG4gIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcbiAgbGV0IHcyID0gaW5uZXIub2Zmc2V0V2lkdGhcblxuICBpZiAodzEgPT09IHcyKSB7XG4gICAgdzIgPSBvdXRlci5jbGllbnRXaWR0aFxuICB9XG5cbiAgb3V0ZXIucmVtb3ZlKClcbiAgc2l6ZSA9IHcxIC0gdzJcblxuICByZXR1cm4gc2l6ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzU2Nyb2xsYmFyIChlbCwgb25ZID0gdHJ1ZSkge1xuICBpZiAoIWVsIHx8IGVsLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIG9uWVxuICAgID8gKFxuICAgICAgICBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgJiYgKFxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJylcbiAgICAgICAgICB8fCBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJmbG93LWF1dG8nKVxuICAgICAgICAgIHx8IFsgJ2F1dG8nLCAnc2Nyb2xsJyBdLmluY2x1ZGVzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsgJ292ZXJmbG93LXknIF0pXG4gICAgICAgIClcbiAgICAgIClcbiAgICA6IChcbiAgICAgICAgZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCAmJiAoXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzY3JvbGwnKVxuICAgICAgICAgIHx8IGVsLmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmZsb3ctYXV0bycpXG4gICAgICAgICAgfHwgWyAnYXV0bycsICdzY3JvbGwnIF0uaW5jbHVkZXMod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpWyAnb3ZlcmZsb3cteCcgXSlcbiAgICAgICAgKVxuICAgICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFNjcm9sbFRhcmdldCxcblxuICBnZXRTY3JvbGxIZWlnaHQsXG4gIGdldFNjcm9sbFdpZHRoLFxuXG4gIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sXG4gIGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbixcblxuICBhbmltVmVydGljYWxTY3JvbGxUbyxcbiAgYW5pbUhvcml6b250YWxTY3JvbGxUbyxcblxuICBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLFxuICBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sXG5cbiAgZ2V0U2Nyb2xsYmFyV2lkdGgsXG4gIGhhc1Njcm9sbGJhclxufVxuIiwiaW1wb3J0IHsgZ2V0RXZlbnRQYXRoLCBsaXN0ZW5PcHRzLCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaGFzU2Nyb2xsYmFyLCBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLCBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gfSBmcm9tICcuLi91dGlscy9zY3JvbGwuanMnXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5sZXRcbiAgcmVnaXN0ZXJlZCA9IDAsXG4gIHNjcm9sbFBvc2l0aW9uWCxcbiAgc2Nyb2xsUG9zaXRpb25ZLFxuICBtYXhTY3JvbGxUb3AsXG4gIHZwUGVuZGluZ1VwZGF0ZSA9IGZhbHNlLFxuICBib2R5TGVmdCxcbiAgYm9keVRvcCxcbiAgaHJlZixcbiAgY2xvc2VUaW1lciA9IG51bGxcblxuZnVuY3Rpb24gb25XaGVlbCAoZSkge1xuICBpZiAoc2hvdWxkUHJldmVudFNjcm9sbChlKSkge1xuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvdWxkUHJldmVudFNjcm9sbCAoZSkge1xuICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmJvZHkgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWxheW91dF9fYmFja2Ryb3AnKSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBjb25zdFxuICAgIHBhdGggPSBnZXRFdmVudFBhdGgoZSksXG4gICAgc2hpZnQgPSBlLnNoaWZ0S2V5ICYmICFlLmRlbHRhWCxcbiAgICBzY3JvbGxZID0gIXNoaWZ0ICYmIE1hdGguYWJzKGUuZGVsdGFYKSA8PSBNYXRoLmFicyhlLmRlbHRhWSksXG4gICAgZGVsdGEgPSBzaGlmdCB8fCBzY3JvbGxZID8gZS5kZWx0YVkgOiBlLmRlbHRhWFxuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsID0gcGF0aFsgaW5kZXggXVxuXG4gICAgaWYgKGhhc1Njcm9sbGJhcihlbCwgc2Nyb2xsWSkpIHtcbiAgICAgIHJldHVybiBzY3JvbGxZXG4gICAgICAgID8gKFxuICAgICAgICAgICAgZGVsdGEgPCAwICYmIGVsLnNjcm9sbFRvcCA9PT0gMFxuICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgOiBkZWx0YSA+IDAgJiYgZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID09PSBlbC5zY3JvbGxIZWlnaHRcbiAgICAgICAgICApXG4gICAgICAgIDogKFxuICAgICAgICAgICAgZGVsdGEgPCAwICYmIGVsLnNjcm9sbExlZnQgPT09IDBcbiAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgIDogZGVsdGEgPiAwICYmIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRXaWR0aCA9PT0gZWwuc2Nyb2xsV2lkdGhcbiAgICAgICAgICApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gb25BcHBsZVNjcm9sbCAoZSkge1xuICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50KSB7XG4gICAgLy8gcmVxdWlyZWQsIG90aGVyd2lzZSBpT1MgYmxvY2tzIGZ1cnRoZXIgc2Nyb2xsaW5nXG4gICAgLy8gdW50aWwgdGhlIG1vYmlsZSBzY3JvbGxiYXIgZGlzc2FwcGVhcnNcbiAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkFwcGxlUmVzaXplIChldnQpIHtcbiAgaWYgKHZwUGVuZGluZ1VwZGF0ZSA9PT0gdHJ1ZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdnBQZW5kaW5nVXBkYXRlID0gdHJ1ZVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgdnBQZW5kaW5nVXBkYXRlID0gZmFsc2VcblxuICAgIGNvbnN0XG4gICAgICB7IGhlaWdodCB9ID0gZXZ0LnRhcmdldCxcbiAgICAgIHsgY2xpZW50SGVpZ2h0LCBzY3JvbGxUb3AgfSA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnRcblxuICAgIGlmIChtYXhTY3JvbGxUb3AgPT09IHZvaWQgMCB8fCBoZWlnaHQgIT09IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgbWF4U2Nyb2xsVG9wID0gY2xpZW50SGVpZ2h0IC0gaGVpZ2h0XG4gICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICAgIH1cblxuICAgIGlmIChzY3JvbGxUb3AgPiBtYXhTY3JvbGxUb3ApIHtcbiAgICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wIC09IE1hdGguY2VpbCgoc2Nyb2xsVG9wIC0gbWF4U2Nyb2xsVG9wKSAvIDgpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBhcHBseSAoYWN0aW9uKSB7XG4gIGNvbnN0XG4gICAgYm9keSA9IGRvY3VtZW50LmJvZHksXG4gICAgaGFzVmlld3BvcnQgPSB3aW5kb3cudmlzdWFsVmlld3BvcnQgIT09IHZvaWQgMFxuXG4gIGlmIChhY3Rpb24gPT09ICdhZGQnKSB7XG4gICAgY29uc3QgeyBvdmVyZmxvd1ksIG92ZXJmbG93WCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9keSlcblxuICAgIHNjcm9sbFBvc2l0aW9uWCA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbih3aW5kb3cpXG4gICAgc2Nyb2xsUG9zaXRpb25ZID0gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbih3aW5kb3cpXG4gICAgYm9keUxlZnQgPSBib2R5LnN0eWxlLmxlZnRcbiAgICBib2R5VG9wID0gYm9keS5zdHlsZS50b3BcblxuICAgIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gICAgYm9keS5zdHlsZS5sZWZ0ID0gYC0keyBzY3JvbGxQb3NpdGlvblggfXB4YFxuICAgIGJvZHkuc3R5bGUudG9wID0gYC0keyBzY3JvbGxQb3NpdGlvblkgfXB4YFxuXG4gICAgaWYgKG92ZXJmbG93WCAhPT0gJ2hpZGRlbicgJiYgKG92ZXJmbG93WCA9PT0gJ3Njcm9sbCcgfHwgYm9keS5zY3JvbGxXaWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSkge1xuICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci14JylcbiAgICB9XG4gICAgaWYgKG92ZXJmbG93WSAhPT0gJ2hpZGRlbicgJiYgKG92ZXJmbG93WSA9PT0gJ3Njcm9sbCcgfHwgYm9keS5zY3JvbGxIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpKSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXknKVxuICAgIH1cblxuICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1wcmV2ZW50LXNjcm9sbCcpXG4gICAgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCA9IHRydWVcblxuICAgIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICBpZiAoaGFzVmlld3BvcnQgPT09IHRydWUpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB3aW5kb3cudmlzdWFsVmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25BcHBsZVJlc2l6ZSwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVTY3JvbGwsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlICYmIGNsaWVudC5pcy5tYWMgPT09IHRydWUpIHtcbiAgICAvLyByZWYuIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTcvMDEvc2Nyb2xsaW5nLWludGVydmVudGlvblxuICAgIHdpbmRvd1sgYCR7IGFjdGlvbiB9RXZlbnRMaXN0ZW5lcmAgXSgnd2hlZWwnLCBvbldoZWVsLCBsaXN0ZW5PcHRzLm5vdFBhc3NpdmUpXG4gIH1cblxuICBpZiAoYWN0aW9uID09PSAncmVtb3ZlJykge1xuICAgIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICBpZiAoaGFzVmlld3BvcnQgPT09IHRydWUpIHtcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlU2Nyb2xsLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1wcmV2ZW50LXNjcm9sbCcpXG4gICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci14JylcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXknKVxuXG4gICAgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCA9IGZhbHNlXG5cbiAgICBib2R5LnN0eWxlLmxlZnQgPSBib2R5TGVmdFxuICAgIGJvZHkuc3R5bGUudG9wID0gYm9keVRvcFxuXG4gICAgLy8gc2Nyb2xsIGJhY2sgb25seSBpZiByb3V0ZSBoYXMgbm90IGNoYW5nZWRcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYgPT09IGhyZWYpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGxQb3NpdGlvblgsIHNjcm9sbFBvc2l0aW9uWSlcbiAgICB9XG5cbiAgICBtYXhTY3JvbGxUb3AgPSB2b2lkIDBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgbGV0IGFjdGlvbiA9ICdhZGQnXG5cbiAgaWYgKHN0YXRlID09PSB0cnVlKSB7XG4gICAgcmVnaXN0ZXJlZCsrXG5cbiAgICBpZiAoY2xvc2VUaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZXIpXG4gICAgICBjbG9zZVRpbWVyID0gbnVsbFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHJlZ2lzdGVyZWQgPiAxKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHJlZ2lzdGVyZWQgPT09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJlZ2lzdGVyZWQtLVxuXG4gICAgaWYgKHJlZ2lzdGVyZWQgPiAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBhY3Rpb24gPSAncmVtb3ZlJ1xuXG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUgJiYgY2xpZW50LmlzLm5hdGl2ZU1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgY2xvc2VUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoY2xvc2VUaW1lcilcbiAgICAgIGNsb3NlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYXBwbHkoYWN0aW9uKVxuICAgICAgICBjbG9zZVRpbWVyID0gbnVsbFxuICAgICAgfSwgMTAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgYXBwbHkoYWN0aW9uKVxufVxuIiwiaW1wb3J0IHByZXZlbnRTY3JvbGwgZnJvbSAnLi4vLi4vdXRpbHMvcHJldmVudC1zY3JvbGwuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGN1cnJlbnRTdGF0ZVxuXG4gIHJldHVybiB7XG4gICAgcHJldmVudEJvZHlTY3JvbGwgKHN0YXRlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlICE9PSBjdXJyZW50U3RhdGVcbiAgICAgICAgJiYgKGN1cnJlbnRTdGF0ZSAhPT0gdm9pZCAwIHx8IHN0YXRlID09PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlXG4gICAgICAgIHByZXZlbnRTY3JvbGwoc3RhdGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0uanMnXG5cbi8qXG4gKiBVc2FnZTpcbiAqICAgIHJlZ2lzdGVyVGltZW91dChmblssIGRlbGF5XSlcbiAqICAgIHJlbW92ZVRpbWVvdXQoKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHRpbWVyID0gbnVsbFxuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGltZW91dCAoKSB7XG4gICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICB0aW1lciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBvbkRlYWN0aXZhdGVkKHJlbW92ZVRpbWVvdXQpXG4gIG9uQmVmb3JlVW5tb3VudChyZW1vdmVUaW1lb3V0KVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlVGltZW91dCxcblxuICAgIHJlZ2lzdGVyVGltZW91dCAoZm4sIGRlbGF5KSB7XG4gICAgICByZW1vdmVUaW1lb3V0KHRpbWVyKVxuXG4gICAgICBpZiAodm1Jc0Rlc3Ryb3llZCh2bSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmbiwgZGVsYXkpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCB3aXRoRGlyZWN0aXZlcywgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIaXN0b3J5IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWhpc3RvcnkuanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VQcmV2ZW50U2Nyb2xsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXByZXZlbnQtc2Nyb2xsLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGltZW91dC5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCBUb3VjaFBhbiBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL1RvdWNoUGFuLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQuanMnXG5pbXBvcnQgeyBoU2xvdCwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5jb25zdCBkdXJhdGlvbiA9IDE1MFxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUURyYXdlcicsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgc2lkZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xlZnQnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2xlZnQnLCAncmlnaHQnIF0uaW5jbHVkZXModilcbiAgICB9LFxuXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDMwMFxuICAgIH0sXG5cbiAgICBtaW5pOiBCb29sZWFuLFxuICAgIG1pbmlUb092ZXJsYXk6IEJvb2xlYW4sXG4gICAgbWluaVdpZHRoOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiA1N1xuICAgIH0sXG4gICAgbm9NaW5pQW5pbWF0aW9uOiBCb29sZWFuLFxuXG4gICAgYnJlYWtwb2ludDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMTAyM1xuICAgIH0sXG4gICAgc2hvd0lmQWJvdmU6IEJvb2xlYW4sXG5cbiAgICBiZWhhdmlvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RlZmF1bHQnLCAnZGVza3RvcCcsICdtb2JpbGUnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZGVmYXVsdCdcbiAgICB9LFxuXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZWxldmF0ZWQ6IEJvb2xlYW4sXG5cbiAgICBvdmVybGF5OiBCb29sZWFuLFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgbm9Td2lwZU9wZW46IEJvb2xlYW4sXG4gICAgbm9Td2lwZUNsb3NlOiBCb29sZWFuLFxuICAgIG5vU3dpcGVCYWNrZHJvcDogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnb25MYXlvdXQnLCAnbWluaVN0YXRlJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IHZtXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCB7IHByZXZlbnRCb2R5U2Nyb2xsIH0gPSB1c2VQcmV2ZW50U2Nyb2xsKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCwgcmVtb3ZlVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUURyYXdlciBuZWVkcyB0byBiZSBjaGlsZCBvZiBRTGF5b3V0JylcbiAgICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gICAgfVxuXG4gICAgbGV0IGxhc3REZXNrdG9wU3RhdGUsIHRpbWVyTWluaSA9IG51bGwsIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyXG5cbiAgICBjb25zdCBiZWxvd0JyZWFrcG9pbnQgPSByZWYoXG4gICAgICBwcm9wcy5iZWhhdmlvciA9PT0gJ21vYmlsZSdcbiAgICAgIHx8IChwcm9wcy5iZWhhdmlvciAhPT0gJ2Rlc2t0b3AnICYmICRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSA8PSBwcm9wcy5icmVha3BvaW50KVxuICAgIClcblxuICAgIGNvbnN0IGlzTWluaSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5taW5pID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IHNpemUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBpc01pbmkudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5taW5pV2lkdGhcbiAgICAgICAgOiBwcm9wcy53aWR0aFxuICAgICkpXG5cbiAgICBjb25zdCBzaG93aW5nID0gcmVmKFxuICAgICAgcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZVxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSB8fCBvblNjcmVlbk92ZXJsYXkudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0LCBub0V2ZW50KSB7XG4gICAgICBhZGRUb0hpc3RvcnkoKVxuXG4gICAgICBldnQgIT09IGZhbHNlICYmICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICBhcHBseVBvc2l0aW9uKDApXG5cbiAgICAgIGlmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb3RoZXJJbnN0YW5jZSA9ICRsYXlvdXQuaW5zdGFuY2VzWyBvdGhlclNpZGUudmFsdWUgXVxuICAgICAgICBpZiAob3RoZXJJbnN0YW5jZSAhPT0gdm9pZCAwICYmIG90aGVySW5zdGFuY2UuYmVsb3dCcmVha3BvaW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgb3RoZXJJbnN0YW5jZS5oaWRlKGZhbHNlKVxuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlCYWNrZHJvcCgxKVxuICAgICAgICAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlICYmIHByZXZlbnRCb2R5U2Nyb2xsKHRydWUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICBldnQgIT09IGZhbHNlICYmIHNldFNjcm9sbGFibGUoZmFsc2UpXG4gICAgICB9XG5cbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGV2dCAhPT0gZmFsc2UgJiYgc2V0U2Nyb2xsYWJsZSh0cnVlKVxuICAgICAgICBub0V2ZW50ICE9PSB0cnVlICYmIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgICB9LCBkdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQsIG5vRXZlbnQpIHtcbiAgICAgIHJlbW92ZUZyb21IaXN0b3J5KClcblxuICAgICAgZXZ0ICE9PSBmYWxzZSAmJiAkbGF5b3V0LmFuaW1hdGUoKVxuXG4gICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogc2l6ZS52YWx1ZSlcblxuICAgICAgY2xlYW51cCgpXG5cbiAgICAgIGlmIChub0V2ZW50ICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7IGVtaXQoJ2hpZGUnLCBldnQpIH0sIGR1cmF0aW9uKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVRpbWVvdXQoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgc2hvdywgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZyxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgaGFuZGxlU2hvdyxcbiAgICAgIGhhbmRsZUhpZGVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBhZGRUb0hpc3RvcnksIHJlbW92ZUZyb21IaXN0b3J5IH0gPSB1c2VIaXN0b3J5KHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgICBiZWxvd0JyZWFrcG9pbnQsXG4gICAgICBoaWRlXG4gICAgfVxuXG4gICAgY29uc3QgcmlnaHRTaWRlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2lkZSA9PT0gJ3JpZ2h0JylcblxuICAgIGNvbnN0IHN0YXRlRGlyZWN0aW9uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiAocmlnaHRTaWRlLnZhbHVlID09PSB0cnVlID8gMSA6IC0xKVxuICAgIClcblxuICAgIGNvbnN0IGZsYWdCYWNrZHJvcEJnID0gcmVmKDApXG4gICAgY29uc3QgZmxhZ1Bhbm5pbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgZmxhZ01pbmlBbmltYXRlID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGZsYWdDb250ZW50UG9zaXRpb24gPSByZWYoIC8vIHN0YXJ0aW5nIHdpdGggXCJoaWRkZW5cIiBmb3IgU1NSXG4gICAgICBzaXplLnZhbHVlICogc3RhdGVEaXJlY3Rpb24udmFsdWVcbiAgICApXG5cbiAgICBjb25zdCBvdGhlclNpZGUgPSBjb21wdXRlZCgoKSA9PiAocmlnaHRTaWRlLnZhbHVlID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JykpXG4gICAgY29uc3Qgb2Zmc2V0ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAgID8gKHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWUgPyBwcm9wcy5taW5pV2lkdGggOiBzaXplLnZhbHVlKVxuICAgICAgICA6IDBcbiAgICApKVxuXG4gICAgY29uc3QgZml4ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgfHwgcHJvcHMubWluaVRvT3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgfHwgJGxheW91dC52aWV3LnZhbHVlLmluZGV4T2YocmlnaHRTaWRlLnZhbHVlID8gJ1InIDogJ0wnKSA+IC0xXG4gICAgICB8fCAoJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlICYmICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3Qgb25MYXlvdXQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gZmFsc2VcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICApXG5cbiAgICBjb25zdCBvblNjcmVlbk92ZXJsYXkgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ2Z1bGxzY3JlZW4gcS1kcmF3ZXJfX2JhY2tkcm9wJ1xuICAgICAgKyAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UgJiYgZmxhZ1Bhbm5pbmcudmFsdWUgPT09IGZhbHNlID8gJyBoaWRkZW4nIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgYmFja2Ryb3BTdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGByZ2JhKDAsMCwwLCR7IGZsYWdCYWNrZHJvcEJnLnZhbHVlICogMC40IH0pYFxuICAgIH0pKVxuXG4gICAgY29uc3QgaGVhZGVyU2xvdCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQucm93cy52YWx1ZS50b3BbIDIgXSA9PT0gJ3InXG4gICAgICAgIDogJGxheW91dC5yb3dzLnZhbHVlLnRvcFsgMCBdID09PSAnbCdcbiAgICApKVxuXG4gICAgY29uc3QgZm9vdGVyU2xvdCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b21bIDIgXSA9PT0gJ3InXG4gICAgICAgIDogJGxheW91dC5yb3dzLnZhbHVlLmJvdHRvbVsgMCBdID09PSAnbCdcbiAgICApKVxuXG4gICAgY29uc3QgYWJvdmVTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNzcyA9IHt9XG5cbiAgICAgIGlmICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSAmJiBoZWFkZXJTbG90LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MudG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLm9mZnNldCB9cHhgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MudG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLnNpemUgfXB4YFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSAmJiBmb290ZXJTbG90LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MuYm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLm9mZnNldCB9cHhgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MuYm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLnNpemUgfXB4YFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGAkeyBzaXplLnZhbHVlIH1weGAsXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHsgZmxhZ0NvbnRlbnRQb3NpdGlvbi52YWx1ZSB9cHgpYFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gc3R5bGVcbiAgICAgICAgOiBPYmplY3QuYXNzaWduKHN0eWxlLCBhYm92ZVN0eWxlLnZhbHVlKVxuICAgIH0pXG5cbiAgICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZHJhd2VyX19jb250ZW50IGZpdCAnXG4gICAgICArICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlID8gJ3Njcm9sbCcgOiAnb3ZlcmZsb3ctYXV0bycpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1kcmF3ZXIgcS1kcmF3ZXItLSR7IHByb3BzLnNpZGUgfWBcbiAgICAgICsgKGZsYWdNaW5pQW5pbWF0ZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLW1pbmktYW5pbWF0ZScgOiAnJylcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWRyYXdlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBuby10cmFuc2l0aW9uJ1xuICAgICAgICAgIDogKHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgcS1sYXlvdXQtLXByZXZlbnQtZm9jdXMnKVxuICAgICAgKVxuICAgICAgKyAoXG4gICAgICAgIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBmaXhlZCBxLWRyYXdlci0tb24tdG9wIHEtZHJhd2VyLS1tb2JpbGUgcS1kcmF3ZXItLXRvcC1wYWRkaW5nJ1xuICAgICAgICAgIDogYCBxLWRyYXdlci0tJHsgaXNNaW5pLnZhbHVlID09PSB0cnVlID8gJ21pbmknIDogJ3N0YW5kYXJkJyB9YFxuICAgICAgICAgICsgKGZpeGVkLnZhbHVlID09PSB0cnVlIHx8IG9uTGF5b3V0LnZhbHVlICE9PSB0cnVlID8gJyBmaXhlZCcgOiAnJylcbiAgICAgICAgICArIChwcm9wcy5vdmVybGF5ID09PSB0cnVlIHx8IHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1vbi10b3AnIDogJycpXG4gICAgICAgICAgKyAoaGVhZGVyU2xvdC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLXRvcC1wYWRkaW5nJyA6ICcnKVxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IG9wZW5EaXJlY3RpdmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBwcm9wcy5ub1N3aXBlT3BlbiAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBwcm9wcy5zaWRlIDogb3RoZXJTaWRlLnZhbHVlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uT3BlblBhbixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICB7XG4gICAgICAgICAgWyBkaXIgXTogdHJ1ZSxcbiAgICAgICAgICBtb3VzZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdIF1cbiAgICB9KVxuXG4gICAgY29uc3QgY29udGVudENsb3NlRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vU3dpcGVDbG9zZSAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBvdGhlclNpZGUudmFsdWUgOiBwcm9wcy5zaWRlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uQ2xvc2VQYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IGJhY2tkcm9wQ2xvc2VEaXJlY3RpdmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vU3dpcGVCYWNrZHJvcCAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBvdGhlclNpZGUudmFsdWUgOiBwcm9wcy5zaWRlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uQ2xvc2VQYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWUsXG4gICAgICAgICAgbW91c2VBbGxEaXI6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJlbG93QnJlYWtwb2ludCAoKSB7XG4gICAgICB1cGRhdGVMb2NhbChiZWxvd0JyZWFrcG9pbnQsIChcbiAgICAgICAgcHJvcHMuYmVoYXZpb3IgPT09ICdtb2JpbGUnXG4gICAgICAgIHx8IChwcm9wcy5iZWhhdmlvciAhPT0gJ2Rlc2t0b3AnICYmICRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSA8PSBwcm9wcy5icmVha3BvaW50KVxuICAgICAgKSlcbiAgICB9XG5cbiAgICB3YXRjaChiZWxvd0JyZWFrcG9pbnQsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7IC8vIGZyb20gbGcgdG8geHNcbiAgICAgICAgbGFzdERlc2t0b3BTdGF0ZSA9IHNob3dpbmcudmFsdWVcbiAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBoaWRlKGZhbHNlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXG4gICAgICAgIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAgICYmIHByb3BzLmJlaGF2aW9yICE9PSAnbW9iaWxlJ1xuICAgICAgICAmJiBsYXN0RGVza3RvcFN0YXRlICE9PSBmYWxzZVxuICAgICAgKSB7IC8vIGZyb20geHMgdG8gbGdcbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKDApXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICAgIGNsZWFudXAoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNob3coZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuc2lkZSwgKG5ld1NpZGUsIG9sZFNpZGUpID0+IHtcbiAgICAgIGlmICgkbGF5b3V0Lmluc3RhbmNlc1sgb2xkU2lkZSBdID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgb2xkU2lkZSBdID0gdm9pZCAwXG4gICAgICAgICRsYXlvdXRbIG9sZFNpZGUgXS5zcGFjZSA9IGZhbHNlXG4gICAgICAgICRsYXlvdXRbIG9sZFNpZGUgXS5vZmZzZXQgPSAwXG4gICAgICB9XG5cbiAgICAgICRsYXlvdXQuaW5zdGFuY2VzWyBuZXdTaWRlIF0gPSBpbnN0YW5jZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLnNpemUgPSBzaXplLnZhbHVlXG4gICAgICAkbGF5b3V0WyBuZXdTaWRlIF0uc3BhY2UgPSBvbkxheW91dC52YWx1ZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLm9mZnNldCA9IG9mZnNldC52YWx1ZVxuICAgIH0pXG5cbiAgICB3YXRjaCgkbGF5b3V0LnRvdGFsV2lkdGgsICgpID0+IHtcbiAgICAgIGlmICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlIHx8IGRvY3VtZW50LnFTY3JvbGxQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlQmVsb3dCcmVha3BvaW50KClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goXG4gICAgICAoKSA9PiBwcm9wcy5iZWhhdmlvciArIHByb3BzLmJyZWFrcG9pbnQsXG4gICAgICB1cGRhdGVCZWxvd0JyZWFrcG9pbnRcbiAgICApXG5cbiAgICB3YXRjaCgkbGF5b3V0LmlzQ29udGFpbmVyLCB2YWwgPT4ge1xuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcmV2ZW50Qm9keVNjcm9sbCh2YWwgIT09IHRydWUpXG4gICAgICB2YWwgPT09IHRydWUgJiYgdXBkYXRlQmVsb3dCcmVha3BvaW50KClcbiAgICB9KVxuXG4gICAgd2F0Y2goJGxheW91dC5zY3JvbGxiYXJXaWR0aCwgKCkgPT4ge1xuICAgICAgYXBwbHlQb3NpdGlvbihzaG93aW5nLnZhbHVlID09PSB0cnVlID8gMCA6IHZvaWQgMClcbiAgICB9KVxuXG4gICAgd2F0Y2gob2Zmc2V0LCB2YWwgPT4geyB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIHZhbCkgfSlcblxuICAgIHdhdGNoKG9uTGF5b3V0LCB2YWwgPT4ge1xuICAgICAgZW1pdCgnb25MYXlvdXQnLCB2YWwpXG4gICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaChyaWdodFNpZGUsICgpID0+IHsgYXBwbHlQb3NpdGlvbigpIH0pXG5cbiAgICB3YXRjaChzaXplLCB2YWwgPT4ge1xuICAgICAgYXBwbHlQb3NpdGlvbigpXG4gICAgICB1cGRhdGVTaXplT25MYXlvdXQocHJvcHMubWluaVRvT3ZlcmxheSwgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5taW5pVG9PdmVybGF5LCB2YWwgPT4ge1xuICAgICAgdXBkYXRlU2l6ZU9uTGF5b3V0KHZhbCwgc2l6ZS52YWx1ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gJHEubGFuZy5ydGwsICgpID0+IHsgYXBwbHlQb3NpdGlvbigpIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5taW5pLCAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubm9NaW5pQW5pbWF0aW9uKSByZXR1cm5cbiAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGFuaW1hdGVNaW5pKClcbiAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goaXNNaW5pLCB2YWwgPT4geyBlbWl0KCdtaW5pU3RhdGUnLCB2YWwpIH0pXG5cbiAgICBmdW5jdGlvbiBhcHBseVBvc2l0aW9uIChwb3NpdGlvbikge1xuICAgICAgaWYgKHBvc2l0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHBvc2l0aW9uID0gc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiBzaXplLnZhbHVlXG4gICAgICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHBvc2l0aW9uKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgJiYgcmlnaHRTaWRlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgJiYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSB8fCBNYXRoLmFicyhwb3NpdGlvbikgPT09IHNpemUudmFsdWUpXG4gICAgICAgICkge1xuICAgICAgICAgIHBvc2l0aW9uICs9IHN0YXRlRGlyZWN0aW9uLnZhbHVlICogJGxheW91dC5zY3JvbGxiYXJXaWR0aC52YWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgZmxhZ0NvbnRlbnRQb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwbHlCYWNrZHJvcCAoeCkge1xuICAgICAgZmxhZ0JhY2tkcm9wQmcudmFsdWUgPSB4XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U2Nyb2xsYWJsZSAodikge1xuICAgICAgY29uc3QgYWN0aW9uID0gdiA9PT0gdHJ1ZVxuICAgICAgICA/ICdyZW1vdmUnXG4gICAgICAgIDogKCRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgIT09IHRydWUgPyAnYWRkJyA6ICcnKVxuXG4gICAgICBhY3Rpb24gIT09ICcnICYmIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0WyBhY3Rpb24gXSgncS1ib2R5LS1kcmF3ZXItdG9nZ2xlJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlTWluaSAoKSB7XG4gICAgICB0aW1lck1pbmkgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyTWluaSlcblxuICAgICAgaWYgKHZtLnByb3h5ICYmIHZtLnByb3h5LiRlbCkge1xuICAgICAgICAvLyBuZWVkIHRvIHNwZWVkIGl0IHVwIGFuZCBhcHBseSBpdCBpbW1lZGlhdGVseSxcbiAgICAgICAgLy8gZXZlbiBmYXN0ZXIgdGhhbiBWdWUncyBuZXh0VGljayFcbiAgICAgICAgdm0ucHJveHkuJGVsLmNsYXNzTGlzdC5hZGQoJ3EtZHJhd2VyLS1taW5pLWFuaW1hdGUnKVxuICAgICAgfVxuXG4gICAgICBmbGFnTWluaUFuaW1hdGUudmFsdWUgPSB0cnVlXG4gICAgICB0aW1lck1pbmkgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXJNaW5pID0gbnVsbFxuICAgICAgICBmbGFnTWluaUFuaW1hdGUudmFsdWUgPSBmYWxzZVxuICAgICAgICBpZiAodm0gJiYgdm0ucHJveHkgJiYgdm0ucHJveHkuJGVsKSB7XG4gICAgICAgICAgdm0ucHJveHkuJGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3EtZHJhd2VyLS1taW5pLWFuaW1hdGUnKVxuICAgICAgICB9XG4gICAgICB9LCAxNTApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25PcGVuUGFuIChldnQpIHtcbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICAvLyBzb21lIGJyb3dzZXJzIG1pZ2h0IGNhcHR1cmUgYW5kIHRyaWdnZXIgdGhpc1xuICAgICAgICAvLyBldmVuIGlmIERyYXdlciBoYXMganVzdCBiZWVuIG9wZW5lZCAoYnV0IGFuaW1hdGlvbiBpcyBzdGlsbCBwZW5kaW5nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgd2lkdGggPSBzaXplLnZhbHVlLFxuICAgICAgICBwb3NpdGlvbiA9IGJldHdlZW4oZXZ0LmRpc3RhbmNlLngsIDAsIHdpZHRoKVxuXG4gICAgICBpZiAoZXZ0LmlzRmluYWwgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb3BlbmVkID0gcG9zaXRpb24gPj0gTWF0aC5taW4oNzUsIHdpZHRoKVxuXG4gICAgICAgIGlmIChvcGVuZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBzaG93KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgICAgIGFwcGx5QmFja2Ryb3AoMClcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogd2lkdGgpXG4gICAgICAgIH1cblxuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBhcHBseVBvc2l0aW9uKFxuICAgICAgICAoJHEubGFuZy5ydGwgPT09IHRydWUgPyByaWdodFNpZGUudmFsdWUgIT09IHRydWUgOiByaWdodFNpZGUudmFsdWUpXG4gICAgICAgICAgPyBNYXRoLm1heCh3aWR0aCAtIHBvc2l0aW9uLCAwKVxuICAgICAgICAgIDogTWF0aC5taW4oMCwgcG9zaXRpb24gLSB3aWR0aClcbiAgICAgIClcbiAgICAgIGFwcGx5QmFja2Ryb3AoXG4gICAgICAgIGJldHdlZW4ocG9zaXRpb24gLyB3aWR0aCwgMCwgMSlcbiAgICAgIClcblxuICAgICAgaWYgKGV2dC5pc0ZpcnN0ID09PSB0cnVlKSB7XG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xvc2VQYW4gKGV2dCkge1xuICAgICAgaWYgKHNob3dpbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgLy8gc29tZSBicm93c2VycyBtaWdodCBjYXB0dXJlIGFuZCB0cmlnZ2VyIHRoaXNcbiAgICAgICAgLy8gZXZlbiBpZiBEcmF3ZXIgaGFzIGp1c3QgYmVlbiBjbG9zZWQgKGJ1dCBhbmltYXRpb24gaXMgc3RpbGwgcGVuZGluZylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHdpZHRoID0gc2l6ZS52YWx1ZSxcbiAgICAgICAgZGlyID0gZXZ0LmRpcmVjdGlvbiA9PT0gcHJvcHMuc2lkZSxcbiAgICAgICAgcG9zaXRpb24gPSAoJHEubGFuZy5ydGwgPT09IHRydWUgPyBkaXIgIT09IHRydWUgOiBkaXIpXG4gICAgICAgICAgPyBiZXR3ZWVuKGV2dC5kaXN0YW5jZS54LCAwLCB3aWR0aClcbiAgICAgICAgICA6IDBcblxuICAgICAgaWYgKGV2dC5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG9wZW5lZCA9IE1hdGguYWJzKHBvc2l0aW9uKSA8IE1hdGgubWluKDc1LCB3aWR0aClcblxuICAgICAgICBpZiAob3BlbmVkID09PSB0cnVlKSB7XG4gICAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgICAgICBhcHBseUJhY2tkcm9wKDEpXG4gICAgICAgICAgYXBwbHlQb3NpdGlvbigwKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGhpZGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHBvc2l0aW9uKVxuICAgICAgYXBwbHlCYWNrZHJvcChiZXR3ZWVuKDEgLSBwb3NpdGlvbiAvIHdpZHRoLCAwLCAxKSlcblxuICAgICAgaWYgKGV2dC5pc0ZpcnN0ID09PSB0cnVlKSB7XG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgcHJldmVudEJvZHlTY3JvbGwoZmFsc2UpXG4gICAgICBzZXRTY3JvbGxhYmxlKHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGF5b3V0IChwcm9wLCB2YWwpIHtcbiAgICAgICRsYXlvdXQudXBkYXRlKHByb3BzLnNpZGUsIHByb3AsIHZhbClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbCAocHJvcCwgdmFsKSB7XG4gICAgICBpZiAocHJvcC52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgIHByb3AudmFsdWUgPSB2YWxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTaXplT25MYXlvdXQgKG1pbmlUb092ZXJsYXksIHNpemUpIHtcbiAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIG1pbmlUb092ZXJsYXkgPT09IHRydWUgPyBwcm9wcy5taW5pV2lkdGggOiBzaXplKVxuICAgIH1cblxuICAgICRsYXlvdXQuaW5zdGFuY2VzWyBwcm9wcy5zaWRlIF0gPSBpbnN0YW5jZVxuICAgIHVwZGF0ZVNpemVPbkxheW91dChwcm9wcy5taW5pVG9PdmVybGF5LCBzaXplLnZhbHVlKVxuICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCBvbkxheW91dC52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIG9mZnNldC52YWx1ZSlcblxuICAgIGlmIChcbiAgICAgIHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlXG4gICAgICAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuICAgICkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB0cnVlKVxuICAgIH1cblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBlbWl0KCdvbkxheW91dCcsIG9uTGF5b3V0LnZhbHVlKVxuICAgICAgZW1pdCgnbWluaVN0YXRlJywgaXNNaW5pLnZhbHVlKVxuXG4gICAgICBsYXN0RGVza3RvcFN0YXRlID0gcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWVcblxuICAgICAgY29uc3QgZm4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyBoYW5kbGVTaG93IDogaGFuZGxlSGlkZVxuICAgICAgICBhY3Rpb24oZmFsc2UsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIGlmICgkbGF5b3V0LnRvdGFsV2lkdGgudmFsdWUgIT09IDApIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgYWxsIGNvbXB1dGVkIHByb3BlcnRpZXNcbiAgICAgICAgLy8gaGF2ZSBiZWVuIHVwZGF0ZWQgYmVmb3JlIGNhbGxpbmcgaGFuZGxlU2hvdy9oYW5kbGVIaWRlKClcbiAgICAgICAgbmV4dFRpY2soZm4pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciA9IHdhdGNoKCRsYXlvdXQudG90YWxXaWR0aCwgKCkgPT4ge1xuICAgICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlcigpXG4gICAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyID0gdm9pZCAwXG5cbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzaG93KGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGZuKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyICE9PSB2b2lkIDAgJiYgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIoKVxuXG4gICAgICBpZiAodGltZXJNaW5pICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lck1pbmkpXG4gICAgICAgIHRpbWVyTWluaSA9IG51bGxcbiAgICAgIH1cblxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBjbGVhbnVwKClcblxuICAgICAgaWYgKCRsYXlvdXQuaW5zdGFuY2VzWyBwcm9wcy5zaWRlIF0gPT09IGluc3RhbmNlKSB7XG4gICAgICAgICRsYXlvdXQuaW5zdGFuY2VzWyBwcm9wcy5zaWRlIF0gPSB2b2lkIDBcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzaXplJywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCAwKVxuICAgICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtdXG5cbiAgICAgIGlmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcHJvcHMubm9Td2lwZU9wZW4gPT09IGZhbHNlICYmIGNoaWxkLnB1c2goXG4gICAgICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGtleTogJ29wZW4nLFxuICAgICAgICAgICAgICBjbGFzczogYHEtZHJhd2VyX19vcGVuZXIgZml4ZWQtJHsgcHJvcHMuc2lkZSB9YCxcbiAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9wZW5EaXJlY3RpdmUudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIClcblxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGhEaXIoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmVmOiAnYmFja2Ryb3AnLFxuICAgICAgICAgICAgICBjbGFzczogYmFja2Ryb3BDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IGJhY2tkcm9wU3R5bGUudmFsdWUsXG4gICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgICAgb25DbGljazogaGlkZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgICdiYWNrZHJvcCcsXG4gICAgICAgICAgICBwcm9wcy5ub1N3aXBlQmFja2Ryb3AgIT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAgICgpID0+IGJhY2tkcm9wQ2xvc2VEaXJlY3RpdmUudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWluaSA9IGlzTWluaS52YWx1ZSA9PT0gdHJ1ZSAmJiBzbG90cy5taW5pICE9PSB2b2lkIDBcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICBrZXk6ICcnICsgbWluaSwgLy8gcmVxdWlyZWQgb3RoZXJ3aXNlIFZ1ZSB3aWxsIG5vdCBkaWZmIGNvcnJlY3RseVxuICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICBjb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgICAgIF1cbiAgICAgICAgfSwgbWluaSA9PT0gdHJ1ZVxuICAgICAgICAgID8gc2xvdHMubWluaSgpXG4gICAgICAgICAgOiBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgICApXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5lbGV2YXRlZCA9PT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0X19zaGFkb3cgYWJzb2x1dGUtZnVsbCBvdmVyZmxvdy1oaWRkZW4gbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoRGlyKFxuICAgICAgICAgICdhc2lkZScsXG4gICAgICAgICAgeyByZWY6ICdjb250ZW50JywgY2xhc3M6IGNsYXNzZXMudmFsdWUsIHN0eWxlOiBzdHlsZS52YWx1ZSB9LFxuICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgJ2NvbnRlbnRjbG9zZScsXG4gICAgICAgICAgcHJvcHMubm9Td2lwZUNsb3NlICE9PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICAoKSA9PiBjb250ZW50Q2xvc2VEaXJlY3RpdmUudmFsdWVcbiAgICAgICAgKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2JywgeyBjbGFzczogJ3EtZHJhd2VyLWNvbnRhaW5lcicgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIHByb3ZpZGUsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnZUNvbnRhaW5lcicsXG5cbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRUGFnZUNvbnRhaW5lciBuZWVkcyB0byBiZSBjaGlsZCBvZiBRTGF5b3V0JylcbiAgICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gICAgfVxuXG4gICAgcHJvdmlkZShwYWdlQ29udGFpbmVyS2V5LCB0cnVlKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBjc3MgPSB7fVxuXG4gICAgICBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzLnBhZGRpbmdUb3AgPSBgJHsgJGxheW91dC5oZWFkZXIuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoJGxheW91dC5yaWdodC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbIGBwYWRkaW5nJHsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnTGVmdCcgOiAnUmlnaHQnIH1gIF0gPSBgJHsgJGxheW91dC5yaWdodC5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3MucGFkZGluZ0JvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICgkbGF5b3V0LmxlZnQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyBgcGFkZGluZyR7ICRxLmxhbmcucnRsID09PSB0cnVlID8gJ1JpZ2h0JyA6ICdMZWZ0JyB9YCBdID0gYCR7ICRsYXlvdXQubGVmdC5zaXplIH1weGBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzc1xuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLXBhZ2UtY29udGFpbmVyJyxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgd2F0Y2gsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0U2Nyb2xsVGFyZ2V0LCBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLCBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwuanMnXG5pbXBvcnQgeyBsaXN0ZW5PcHRzLCBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5cbmNvbnN0IHsgcGFzc2l2ZSB9ID0gbGlzdGVuT3B0c1xuY29uc3QgYXhpc1ZhbHVlcyA9IFsgJ2JvdGgnLCAnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCcgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNjcm9sbE9ic2VydmVyJyxcblxuICBwcm9wczoge1xuICAgIGF4aXM6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBheGlzVmFsdWVzLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ3ZlcnRpY2FsJ1xuICAgIH0sXG5cbiAgICBkZWJvdW5jZTogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiB7XG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Njcm9sbCcgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCB9KSB7XG4gICAgY29uc3Qgc2Nyb2xsID0ge1xuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9LFxuXG4gICAgICBkaXJlY3Rpb246ICdkb3duJyxcbiAgICAgIGRpcmVjdGlvbkNoYW5nZWQ6IGZhbHNlLFxuXG4gICAgICBkZWx0YToge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDBcbiAgICAgIH0sXG5cbiAgICAgIGluZmxlY3Rpb25Qb2ludDoge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY2xlYXJUaW1lciA9IG51bGwsIGxvY2FsU2Nyb2xsVGFyZ2V0LCBwYXJlbnRFbFxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuc2Nyb2xsVGFyZ2V0LCAoKSA9PiB7XG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBlbWl0RXZlbnQgKCkge1xuICAgICAgY2xlYXJUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVyKClcblxuICAgICAgY29uc3QgdG9wID0gTWF0aC5tYXgoMCwgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldCkpXG4gICAgICBjb25zdCBsZWZ0ID0gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKGxvY2FsU2Nyb2xsVGFyZ2V0KVxuXG4gICAgICBjb25zdCBkZWx0YSA9IHtcbiAgICAgICAgdG9wOiB0b3AgLSBzY3JvbGwucG9zaXRpb24udG9wLFxuICAgICAgICBsZWZ0OiBsZWZ0IC0gc2Nyb2xsLnBvc2l0aW9uLmxlZnRcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAocHJvcHMuYXhpcyA9PT0gJ3ZlcnRpY2FsJyAmJiBkZWx0YS50b3AgPT09IDApXG4gICAgICAgIHx8IChwcm9wcy5heGlzID09PSAnaG9yaXpvbnRhbCcgJiYgZGVsdGEubGVmdCA9PT0gMClcbiAgICAgICkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VyRGlyID0gTWF0aC5hYnMoZGVsdGEudG9wKSA+PSBNYXRoLmFicyhkZWx0YS5sZWZ0KVxuICAgICAgICA/IChkZWx0YS50b3AgPCAwID8gJ3VwJyA6ICdkb3duJylcbiAgICAgICAgOiAoZGVsdGEubGVmdCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnKVxuXG4gICAgICBzY3JvbGwucG9zaXRpb24gPSB7IHRvcCwgbGVmdCB9XG4gICAgICBzY3JvbGwuZGlyZWN0aW9uQ2hhbmdlZCA9IHNjcm9sbC5kaXJlY3Rpb24gIT09IGN1ckRpclxuICAgICAgc2Nyb2xsLmRlbHRhID0gZGVsdGFcblxuICAgICAgaWYgKHNjcm9sbC5kaXJlY3Rpb25DaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgIHNjcm9sbC5kaXJlY3Rpb24gPSBjdXJEaXJcbiAgICAgICAgc2Nyb2xsLmluZmxlY3Rpb25Qb2ludCA9IHNjcm9sbC5wb3NpdGlvblxuICAgICAgfVxuXG4gICAgICBlbWl0KCdzY3JvbGwnLCB7IC4uLnNjcm9sbCB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgICBsb2NhbFNjcm9sbFRhcmdldCA9IGdldFNjcm9sbFRhcmdldChwYXJlbnRFbCwgcHJvcHMuc2Nyb2xsVGFyZ2V0KVxuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJpZ2dlciwgcGFzc2l2ZSlcbiAgICAgIHRyaWdnZXIodHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgICBpZiAobG9jYWxTY3JvbGxUYXJnZXQgIT09IHZvaWQgMCkge1xuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmlnZ2VyLCBwYXNzaXZlKVxuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldCA9IHZvaWQgMFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyaWdnZXIgKGltbWVkaWF0ZWx5KSB7XG4gICAgICBpZiAoaW1tZWRpYXRlbHkgPT09IHRydWUgfHwgcHJvcHMuZGVib3VuY2UgPT09IDAgfHwgcHJvcHMuZGVib3VuY2UgPT09ICcwJykge1xuICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY2xlYXJUaW1lciA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBbIHRpbWVyLCBmbiBdID0gcHJvcHMuZGVib3VuY2VcbiAgICAgICAgICA/IFsgc2V0VGltZW91dChlbWl0RXZlbnQsIHByb3BzLmRlYm91bmNlKSwgY2xlYXJUaW1lb3V0IF1cbiAgICAgICAgICA6IFsgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGVtaXRFdmVudCksIGNhbmNlbEFuaW1hdGlvbkZyYW1lIF1cblxuICAgICAgICBjbGVhclRpbWVyID0gKCkgPT4ge1xuICAgICAgICAgIGZuKHRpbWVyKVxuICAgICAgICAgIGNsZWFyVGltZXIgPSBudWxsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJveHkuJHEubGFuZy5ydGwsIGVtaXRFdmVudClcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBwYXJlbnRFbCA9IHByb3h5LiRlbC5wYXJlbnROb2RlXG4gICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVyKClcbiAgICAgIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgdHJpZ2dlcixcbiAgICAgIGdldFBvc2l0aW9uOiAoKSA9PiBzY3JvbGxcbiAgICB9KVxuXG4gICAgcmV0dXJuIG5vb3BcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgcmVhY3RpdmUsIGNvbXB1dGVkLCB3YXRjaCwgcHJvdmlkZSwgb25Vbm1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IFFTY3JvbGxPYnNlcnZlciBmcm9tICcuLi9zY3JvbGwtb2JzZXJ2ZXIvUVNjcm9sbE9ic2VydmVyLmpzJ1xuaW1wb3J0IFFSZXNpemVPYnNlcnZlciBmcm9tICcuLi9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUxheW91dCcsXG5cbiAgcHJvcHM6IHtcbiAgICBjb250YWluZXI6IEJvb2xlYW4sXG4gICAgdmlldzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2hoaCBscHIgZmZmJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiAvXihofGwpaChofHIpIGxwciAoZnxsKWYoZnxyKSQvLnRlc3Qodi50b0xvd2VyQ2FzZSgpKVxuICAgIH0sXG5cbiAgICBvblNjcm9sbDogRnVuY3Rpb24sXG4gICAgb25TY3JvbGxIZWlnaHQ6IEZ1bmN0aW9uLFxuICAgIG9uUmVzaXplOiBGdW5jdGlvblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuXG4gICAgLy8gcGFnZSByZWxhdGVkXG4gICAgY29uc3QgaGVpZ2h0ID0gcmVmKCRxLnNjcmVlbi5oZWlnaHQpXG4gICAgY29uc3Qgd2lkdGggPSByZWYocHJvcHMuY29udGFpbmVyID09PSB0cnVlID8gMCA6ICRxLnNjcmVlbi53aWR0aClcbiAgICBjb25zdCBzY3JvbGwgPSByZWYoeyBwb3NpdGlvbjogMCwgZGlyZWN0aW9uOiAnZG93bicsIGluZmxlY3Rpb25Qb2ludDogMCB9KVxuXG4gICAgLy8gY29udGFpbmVyIG9ubHkgcHJvcFxuICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IHJlZigwKVxuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gcmVmKGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiBnZXRTY3JvbGxiYXJXaWR0aCgpKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1sYXlvdXQgcS1sYXlvdXQtLSdcbiAgICAgICsgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/ICdjb250YWluZXJpemVkJyA6ICdzdGFuZGFyZCcpXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5jb250YWluZXIgPT09IGZhbHNlXG4gICAgICAgID8geyBtaW5IZWlnaHQ6ICRxLnNjcmVlbi5oZWlnaHQgKyAncHgnIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIC8vIHVzZWQgYnkgY29udGFpbmVyIG9ubHlcbiAgICBjb25zdCB0YXJnZXRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbGJhcldpZHRoLnZhbHVlICE9PSAwXG4gICAgICAgID8geyBbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JyBdOiBgJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4YCB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBjb25zdCB0YXJnZXRDaGlsZFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2Nyb2xsYmFyV2lkdGgudmFsdWUgIT09IDBcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdOiAwLFxuICAgICAgICAgICAgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXTogYC0keyBzY3JvbGxiYXJXaWR0aC52YWx1ZSB9cHhgLFxuICAgICAgICAgICAgd2lkdGg6IGBjYWxjKDEwMCUgKyAkeyBzY3JvbGxiYXJXaWR0aC52YWx1ZSB9cHgpYFxuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4gICAgKSlcblxuICAgIGZ1bmN0aW9uIG9uUGFnZVNjcm9sbCAoZGF0YSkge1xuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSB8fCBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgcG9zaXRpb246IGRhdGEucG9zaXRpb24udG9wLFxuICAgICAgICAgIGRpcmVjdGlvbjogZGF0YS5kaXJlY3Rpb24sXG4gICAgICAgICAgZGlyZWN0aW9uQ2hhbmdlZDogZGF0YS5kaXJlY3Rpb25DaGFuZ2VkLFxuICAgICAgICAgIGluZmxlY3Rpb25Qb2ludDogZGF0YS5pbmZsZWN0aW9uUG9pbnQudG9wLFxuICAgICAgICAgIGRlbHRhOiBkYXRhLmRlbHRhLnRvcFxuICAgICAgICB9XG5cbiAgICAgICAgc2Nyb2xsLnZhbHVlID0gaW5mb1xuICAgICAgICBwcm9wcy5vblNjcm9sbCAhPT0gdm9pZCAwICYmIGVtaXQoJ3Njcm9sbCcsIGluZm8pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYWdlUmVzaXplIChkYXRhKSB7XG4gICAgICBjb25zdCB7IGhlaWdodDogbmV3SGVpZ2h0LCB3aWR0aDogbmV3V2lkdGggfSA9IGRhdGFcbiAgICAgIGxldCByZXNpemVkID0gZmFsc2VcblxuICAgICAgaWYgKGhlaWdodC52YWx1ZSAhPT0gbmV3SGVpZ2h0KSB7XG4gICAgICAgIHJlc2l6ZWQgPSB0cnVlXG4gICAgICAgIGhlaWdodC52YWx1ZSA9IG5ld0hlaWdodFxuICAgICAgICBwcm9wcy5vblNjcm9sbEhlaWdodCAhPT0gdm9pZCAwICYmIGVtaXQoJ3Njcm9sbEhlaWdodCcsIG5ld0hlaWdodClcbiAgICAgICAgdXBkYXRlU2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgfVxuICAgICAgaWYgKHdpZHRoLnZhbHVlICE9PSBuZXdXaWR0aCkge1xuICAgICAgICByZXNpemVkID0gdHJ1ZVxuICAgICAgICB3aWR0aC52YWx1ZSA9IG5ld1dpZHRoXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNpemVkID09PSB0cnVlICYmIHByb3BzLm9uUmVzaXplICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdCgncmVzaXplJywgZGF0YSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNvbnRhaW5lclJlc2l6ZSAoeyBoZWlnaHQgfSkge1xuICAgICAgaWYgKGNvbnRhaW5lckhlaWdodC52YWx1ZSAhPT0gaGVpZ2h0KSB7XG4gICAgICAgIGNvbnRhaW5lckhlaWdodC52YWx1ZSA9IGhlaWdodFxuICAgICAgICB1cGRhdGVTY3JvbGxiYXJXaWR0aCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsYmFyV2lkdGggKCkge1xuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IGhlaWdodC52YWx1ZSA+IGNvbnRhaW5lckhlaWdodC52YWx1ZVxuICAgICAgICAgID8gZ2V0U2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgICAgIDogMFxuXG4gICAgICAgIGlmIChzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gd2lkdGgpIHtcbiAgICAgICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSA9IHdpZHRoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYW5pbWF0ZVRpbWVyID0gbnVsbFxuXG4gICAgY29uc3QgJGxheW91dCA9IHtcbiAgICAgIGluc3RhbmNlczoge30sXG4gICAgICB2aWV3OiBjb21wdXRlZCgoKSA9PiBwcm9wcy52aWV3KSxcbiAgICAgIGlzQ29udGFpbmVyOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5jb250YWluZXIpLFxuXG4gICAgICByb290UmVmLFxuXG4gICAgICBoZWlnaHQsXG4gICAgICBjb250YWluZXJIZWlnaHQsXG4gICAgICBzY3JvbGxiYXJXaWR0aCxcbiAgICAgIHRvdGFsV2lkdGg6IGNvbXB1dGVkKCgpID0+IHdpZHRoLnZhbHVlICsgc2Nyb2xsYmFyV2lkdGgudmFsdWUpLFxuXG4gICAgICByb3dzOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwcm9wcy52aWV3LnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRvcDogcm93c1sgMCBdLnNwbGl0KCcnKSxcbiAgICAgICAgICBtaWRkbGU6IHJvd3NbIDEgXS5zcGxpdCgnJyksXG4gICAgICAgICAgYm90dG9tOiByb3dzWyAyIF0uc3BsaXQoJycpXG4gICAgICAgIH1cbiAgICAgIH0pLFxuXG4gICAgICBoZWFkZXI6IHJlYWN0aXZlKHsgc2l6ZTogMCwgb2Zmc2V0OiAwLCBzcGFjZTogZmFsc2UgfSksXG4gICAgICByaWdodDogcmVhY3RpdmUoeyBzaXplOiAzMDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgZm9vdGVyOiByZWFjdGl2ZSh7IHNpemU6IDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgbGVmdDogcmVhY3RpdmUoeyBzaXplOiAzMDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuXG4gICAgICBzY3JvbGwsXG5cbiAgICAgIGFuaW1hdGUgKCkge1xuICAgICAgICBpZiAoYW5pbWF0ZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGFuaW1hdGVUaW1lcilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tbGF5b3V0LWFuaW1hdGUnKVxuICAgICAgICB9XG5cbiAgICAgICAgYW5pbWF0ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1sYXlvdXQtYW5pbWF0ZScpXG4gICAgICAgIH0sIDE1NSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZSAocGFydCwgcHJvcCwgdmFsKSB7XG4gICAgICAgICRsYXlvdXRbIHBhcnQgXVsgcHJvcCBdID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvdmlkZShsYXlvdXRLZXksICRsYXlvdXQpXG5cbiAgICAvLyBwcmV2ZW50IHNjcm9sbGJhciBmbGlja2VyIHdoaWxlIHJlc2l6aW5nIHdpbmRvdyBoZWlnaHRcbiAgICAvLyBpZiBubyBwYWdlIHNjcm9sbGJhciBpcyBhbHJlYWR5IHByZXNlbnRcbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlICYmIGdldFNjcm9sbGJhcldpZHRoKCkgPiAwKSB7XG4gICAgICBsZXQgdGltZXIgPSBudWxsXG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmJvZHlcblxuICAgICAgZnVuY3Rpb24gcmVzdG9yZVNjcm9sbGJhciAoKSB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLXNjcm9sbGJhcicpXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhpZGVTY3JvbGxiYXIgKCkge1xuICAgICAgICBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAvLyBpZiBpdCBoYXMgbm8gc2Nyb2xsYmFyIHRoZW4gdGhlcmUncyBub3RoaW5nIHRvIGRvXG5cbiAgICAgICAgICBpZiAoZWwuc2Nyb2xsSGVpZ2h0ID4gJHEuc2NyZWVuLmhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGlkZS1zY3JvbGxiYXInKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChyZXN0b3JlU2Nyb2xsYmFyLCAzMDApXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEV2ZW50IChhY3Rpb24pIHtcbiAgICAgICAgaWYgKHRpbWVyICE9PSBudWxsICYmIGFjdGlvbiA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgcmVzdG9yZVNjcm9sbGJhcigpXG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3dbIGAkeyBhY3Rpb24gfUV2ZW50TGlzdGVuZXJgIF0oJ3Jlc2l6ZScsIGhpZGVTY3JvbGxiYXIpXG4gICAgICB9XG5cbiAgICAgIHdhdGNoKFxuICAgICAgICAoKSA9PiAocHJvcHMuY29udGFpbmVyICE9PSB0cnVlID8gJ2FkZCcgOiAncmVtb3ZlJyksXG4gICAgICAgIHVwZGF0ZVNjcm9sbEV2ZW50XG4gICAgICApXG5cbiAgICAgIHByb3BzLmNvbnRhaW5lciAhPT0gdHJ1ZSAmJiB1cGRhdGVTY3JvbGxFdmVudCgnYWRkJylcblxuICAgICAgb25Vbm1vdW50ZWQoKCkgPT4ge1xuICAgICAgICB1cGRhdGVTY3JvbGxFdmVudCgncmVtb3ZlJylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgaChRU2Nyb2xsT2JzZXJ2ZXIsIHsgb25TY3JvbGw6IG9uUGFnZVNjcm9sbCB9KSxcbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IG9uUGFnZVJlc2l6ZSB9KVxuICAgICAgXSlcblxuICAgICAgY29uc3QgbGF5b3V0ID0gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICByZWY6IHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/IHZvaWQgMCA6IHJvb3RSZWYsXG4gICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgfSwgY29udGVudClcblxuICAgICAgaWYgKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1sYXlvdXQtY29udGFpbmVyIG92ZXJmbG93LWhpZGRlbicsXG4gICAgICAgICAgcmVmOiByb290UmVmXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwgeyBvblJlc2l6ZTogb25Db250YWluZXJSZXNpemUgfSksXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdhYnNvbHV0ZS1mdWxsJyxcbiAgICAgICAgICAgIHN0eWxlOiB0YXJnZXRTdHlsZS52YWx1ZVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdzY3JvbGwnLFxuICAgICAgICAgICAgICBzdHlsZTogdGFyZ2V0Q2hpbGRTdHlsZS52YWx1ZVxuICAgICAgICAgICAgfSwgWyBsYXlvdXQgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGF5b3V0XG4gICAgfVxuICB9XG59KVxuIiwiPHRlbXBsYXRlIGxhbmc9XCJwdWdcIj5cbi8vIOS9v+eUqFB1Z+aooeadv+iqnuiogOWumue+qVZ1Zee1hOS7tueahOe1kOani1xucS1sYXlvdXQodmlldz1cImxIaCBMcHIgbEZmXCIpXG4gIHEtaGVhZGVyKGVsZXZhdGVkKVxuICAgIHEtdG9vbGJhclxuICAgICAgcS1idG4oZmxhdCwgZGVuc2UsIHJvdW5kLCBpY29uPVwibWVudVwiLCBhcmlhLWxhYmVsPVwiTWVudVwiLCBAY2xpY2s9XCJ0b2dnbGVMZWZ0RHJhd2VyXCIpXG4gICAgICBxLWJ0bihAY2xpY2s9XCJjb3B5TGlua1wiIGZsYXQgcm91bmQgaWNvbj1cImlvc19zaGFyZVwiIGFyaWEtbGFiZWw9XCJTaGFyZVwiIGxhYmVsPVwiU2hhcmVcIilcbiAgICAgIHEtYnRuKEBjbGljaz1cImRvd25sb2FkU3RlcHNcIiBmbGF0IHJvdW5kIGljb249XCJjbG91ZF9kb3dubG9hZFwiIGFyaWEtbGFiZWw9XCJEb3dubG9hZFwiKVxuICAgICAgcS1idG4oZmxhdCByb3VuZCBpY29uPVwiY2xvdWRfdXBsb2FkXCIgQGNsaWNrPVwiY2xpY2tGaWxlVXBsb2FkKClcIilcbiAgICAgIGlucHV0KHR5cGU9XCJmaWxlXCIgYWNjZXB0PVwiLm1kXCIgQGNoYW5nZT1cImhhbmRsZUZpbGVVcGxvYWRcIiByZWY9XCJmaWxlSW5wdXRcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIpXG5cblxuICBxLWRyYXdlcih2LW1vZGVsPVwibGVmdERyYXdlck9wZW5cIiwgc2hvdy1pZi1hYm92ZSwgYm9yZGVyZWQpXG4gICAgcS1saXN0XG4gICAgICBxLWl0ZW1cbiAgICAgICAgcS1idG4oOmNsYXNzPVwie2FjdGl2ZTogaXNJbignaW50cm8nKX1cIiwgZmxhdCwgZGVuc2UsIGljb24gPSBcImluZm9cIiwgQGNsaWNrPVwiZ29JbnRyb1wiKSDoqqrmmI5cbiAgICAgIHEtaXRlbVxuICAgICAgICBxLWJ0big6Y2xhc3M9XCJ7YWN0aXZlOiBpc0luKCdlZGl0Jyl9XCIsIGZsYXQsIGRlbnNlLCBpY29uID0gXCJlZGl0XCIsIEBjbGljaz1cImdvRWRpdFwiKSDnt6jovK9cbiAgICAgIHEtaXRlbVxuICAgICAgICBxLWJ0big6Y2xhc3M9XCJ7YWN0aXZlOiBpc0luKCdzZWFyY2gnKX1cIiwgZmxhdCwgZGVuc2UsIGljb24gPSBcImxpbmtcIiwgQGNsaWNrPVwiZ29TZWFyY2hcIikg5pCc6KmiXG4gICAgICBxLWl0ZW1cbiAgICAgICAgfCDlsI9cbiAgICAgICAgcS1zbGlkZXIodi1tb2RlbD1cImZvbnRfc2l6ZVwiIDptaW49XCIxMFwiIDptYXg9XCIzMFwiIGxhYmVsIDpsYWJlbC12YWx1ZT1cImZvbnRfc2l6ZSArICdweCdcIiBjb2xvcj1cInByaW1hcnlcIilcbiAgICAgICAgc3Bhbi5iaWcg5aSnXG4gIHEtcGFnZS1jb250YWluZXJcbiAgICAvLyDkvb/nlKhyb3V0ZXItdmlld+mhr+ekuuWfuuaWvOeVtuWJjei3r+eUseWcsOWdgOeahOWtkOe1hOS7tlxuICAgIHJvdXRlci12aWV3KDpmb250X3NpemU9XCJmb250X3NpemVcIilcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBRU2xpZGVyIH0gZnJvbSAncXVhc2FyJztcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50LCByZWYgfSBmcm9tICd2dWUnO1xuLy8gaW1wb3J0IHsgdXNlUm91dGUgfSBmcm9tICd2dWUtcm91dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ01haW5MYXlvdXQnLFxuICBjb21wb25lbnRzOiB7XG4gICAgUVNsaWRlcixcbiAgfSxcbiAgc2V0dXAoKSB7XG4gICAgLy8g5L2/55SoVnVlIDMgQ29tcG9zaXRpb24gQVBJ6YCy6KGM54uA5oWL566h55CGXG4gICAgY29uc3QgbGVmdERyYXdlck9wZW4gPSByZWYoZmFsc2UpO1xuICAgIGNvbnN0IGZvbnRfc2l6ZSA9IHJlZigxNik7IC8vIOmgkOioreWAvOeCujE2XG5cbiAgICByZXR1cm4ge1xuICAgICAgaGFzaDogcmVmKHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8ICcnKSxcbiAgICAgIGZvbnRfc2l6ZSxcbiAgICAgIGxlZnREcmF3ZXJPcGVuLFxuICAgICAgdG9nZ2xlTGVmdERyYXdlcigpIHtcbiAgICAgICAgLy8g5YiH5o+b5YG06YKK5oq95bGc55qE6ZaL5ZCI54uA5oWLXG4gICAgICAgIGxlZnREcmF3ZXJPcGVuLnZhbHVlID0gIWxlZnREcmF3ZXJPcGVuLnZhbHVlO1xuICAgICAgfSxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaXNJbihwYXRoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRyb3V0ZS5wYXRoLmluZGV4T2YocGF0aCkgPiAtMSk7XG4gICAgICByZXR1cm4gdGhpcy4kcm91dGUucGF0aC5pbmRleE9mKHBhdGgpID4gLTE7XG4gICAgfSxcbiAgICBnb0ludHJvKCkge1xuICAgICAgdGhpcy4kcm91dGVyLnB1c2goJy9pbnRyby8nICsgdGhpcy4kcm91dGUucGFyYW1zLnN0ZXBzKTtcbiAgICB9LFxuICAgIGdvRWRpdCgpIHtcbiAgICAgIHRoaXMuJHJvdXRlci5wdXNoKCcvZWRpdC8nICsgdGhpcy4kcm91dGUucGFyYW1zLnN0ZXBzKTtcbiAgICB9LFxuICAgIGdvU2VhcmNoKCkge1xuICAgICAgdGhpcy4kcm91dGVyLnB1c2goJy9zZWFyY2gvJyArIHRoaXMuJHJvdXRlLnBhcmFtcy5zdGVwcyk7XG4gICAgfSxcbiAgICBlZGl0U3RlcCgpIHtcbiAgICAgIC8vIOaqouafpeaYr+WQpuW3sue2k+WcqOe3qOi8r+mggemdou+8jOWmguaenOaYr++8jOWJh+mhr+ekuuaPkOekulxuICAgICAgaWYgKHRoaXMuJHJvdXRlLm5hbWUgPT0gJ0VkaVRvcicpIHtcbiAgICAgICAgYWxlcnQoJ1lvdSBhcmUgYWxyZWFkeSBlZGl0aW5nIHRoaXMgc3RlcC4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy4kcm91dGVyLnB1c2goXG4gICAgICAgICcvZWRpdC9fJyArIHRoaXMuaGFzaC5yZXBsYWNlKCdlZGl0LycsICcnKS5yZXBsYWNlKCdfLycsICcnKVxuICAgICAgKTtcbiAgICB9LFxuICAgIGRvd25sb2FkU3RlcHMoKSB7XG4gICAgICBjb25zdCB0aXRsZSA9IHdpbmRvdy5wcm9tcHQoJ1BsZWFzZSBFbnRlciBhIFRpdGxlOicpO1xuICAgICAgaWYgKCF0aXRsZSkgcmV0dXJuOyAvLyDnlKjmiLflj5bmtojovpPlhaXml7bpgIDlh7rlh73mlbBcblxuICAgICAgY29uc3Qgc3RlcHMgPSB0aGlzLiRyb3V0ZS5wYXJhbXMuc3RlcHMuc3BsaXQoLyUyMHxcXHMvKTtcbiAgICAgIGxldCBtYXJrZG93bkNvbnRlbnQgPSBzdGVwc1xuICAgICAgICAubWFwKChzdGVwLCBpbmRleCkgPT4gYCR7aW5kZXggKyAxfS4gJHtzdGVwfWApXG4gICAgICAgIC5qb2luKCdcXG4nKTtcbiAgICAgIG1hcmtkb3duQ29udGVudCA9ICcjICcgKyB0aXRsZSArICdcXG5cXG4nICsgbWFya2Rvd25Db250ZW50O1xuXG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW21hcmtkb3duQ29udGVudF0sIHtcbiAgICAgICAgdHlwZTogJ3RleHQvbWFya2Rvd247Y2hhcnNldD11dGYtOCcsXG4gICAgICB9KTtcbiAgICAgIHNhdmVBcyhibG9iLCB0aXRsZSArICcubWQnKTtcbiAgICB9LFxuICAgIGNsaWNrRmlsZVVwbG9hZCgpIHtcbiAgICAgIHRoaXMuJHJlZnMuZmlsZUlucHV0LmNsaWNrKCk7IC8vIOinuOeZvOaqlOahiOmBuOaTh1xuICAgIH0sXG4gICAgaGFuZGxlRmlsZVVwbG9hZChldmVudCkge1xuICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXTtcbiAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgY29uc3Qgc3RlcHMgPSB0aGlzLnBhcnNlTWFya2Rvd24oY29udGVudCk7XG4gICAgICAgICAgY29uc3Qgc3RlcHNKb2luZWQgPSBzdGVwcy5qb2luKCcgJyk7XG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe1xuICAgICAgICAgICAgcGF0aDogYC9lZGl0LyR7ZW5jb2RlVVJJQ29tcG9uZW50KHN0ZXBzSm9pbmVkKX1gLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZpbGUgcmVhZGluZyBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgYWxlcnQoJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJlYWRpbmcgdGhlIGZpbGUuJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcGFyc2VNYXJrZG93bihjb250ZW50KSB7XG4gICAgICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpO1xuICAgICAgY29uc3Qgc3RlcHMgPSBsaW5lc1xuICAgICAgICAuZmlsdGVyKChsaW5lKSA9PiBsaW5lLm1hdGNoKC9eXFxkK1xcLlxccysvKSlcbiAgICAgICAgLm1hcCgobGluZSkgPT4gbGluZS5yZXBsYWNlKC9eXFxkK1xcLlxccysvLCAnJykpO1xuICAgICAgcmV0dXJuIHN0ZXBzOyAvLyDov5Tlm57op6PmnpDlvoznmoTmraXpqZ/liJfooahcbiAgICB9LFxuICAgIGNvcHlMaW5rKCkge1xuICAgICAgLy8g6KSH6KO955W25YmN6aCB6Z2i55qE6YCj57WQ5Yiw5Ymq6LK857C/XG4gICAgICBpZiAoIWRvY3VtZW50Lmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgYWxlcnQoJ0RvY3VtZW50IGRvZXMgbm90IGhhdmUgZm9jdXMsIGNhbm5vdCBjb3B5IHRleHQuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvcHlUZXh0ID0gJ2h0dHBzOi8vaGFja3N0ZXAucGFnZXMuZGV2JyArIHRoaXMuJHJvdXRlLnBhdGg7XG4gICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkXG4gICAgICAgIC53cml0ZVRleHQoY29weVRleHQpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICB3aW5kb3cuYWxlcnQoJ0NvcGllZCB0aGUgbGluazogJyArIGNvcHlUZXh0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgY29weSB0ZXh0OiAnLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxufSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5hY3RpdmUge1xuICBib3JkZXItbGVmdDogM3B4IHNvbGlkICNjY2M7XG59XG4uYmlnIHtcbiAgZm9udC1zaXplOiAzMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogLTAuNWVtO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJ0aGlzIiwiYSIsImIiLCJjIiwiZCIsImdsb2JhbCIsImciLCJoIiwiZiIsImUiLCJzaXplIiwib2Zmc2V0IiwiY3NzIiwic3R5bGUiLCJoZWlnaHQiLCJ3aWR0aCIsInNhdmVBcyJdLCJtYXBw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
