import { d as defineComponent, h, P as resolveComponent, i as inject, w as watch, o as onMounted, n as onBeforeUnmount, aa as formKey, g as getCurrentInstance, r as ref, c as computed, ab as debounce, ac as injectProp, ad as onBeforeUpdate, B as stopAndPrevent, q as nextTick, E as onDeactivated, ae as onActivated, m as isRuntimeSsrPreHydration, a0 as prevent, y as useDarkProps, z as useDark, l as hSlot, $ as Transition, af as shouldIgnoreKey, C as client, k as createComponent, ag as useFormProps, ah as useFormInputNameAttr, a1 as stop, Q as openBlock, R as createBlock, S as withCtx, f as createVNode, a7 as createElementBlock, a8 as renderList, F as Fragment, U as createBaseVNode, ai as withKeys, aj as normalizeStyle, a9 as toDisplayString, Y as pushScopeId, Z as popScopeId, _ as _export_sfc, ak as toRefs, al as useRoute, am as useRouter } from "./index.f08ad2f1.js";
import { Q as QIcon } from "./vm.b069c695.js";
import { Q as QSpinner } from "./QSpinner.1517f046.js";
import { Q as QBtn } from "./QBtn.1b6d240f.js";
import { Q as QPage } from "./QPage.a456cd1e.js";
import "./use-size.cd9ed164.js";
/*!
  * vue-draggable-next v2.2.0
  * (c) 2023 Anish George
  * @license MIT
  */
/**!
 * Sortable 1.14.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
var version = "1.14.0";
function userAgent(pattern) {
  if (typeof window !== "undefined" && window.navigator) {
    return !!/* @__PURE__ */ navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches(el, selector) {
  if (!selector)
    return;
  selector[0] === ">" && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}
function closest(el, selector, ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === ">" ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx)
        break;
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? "add" : "remove"](name);
    } else {
      var className = (" " + el.className + " ").replace(R_SPACE, " ").replace(" " + name + " ", " ");
      el.className = (className + (state ? " " + name : "")).replace(R_SPACE, " ");
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, "");
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf("webkit") === -1) {
        prop = "-webkit-" + prop;
      }
      style[prop] = val + (typeof val === "string" ? "" : "px");
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = "";
  if (typeof el === "string") {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, "transform");
      if (transform && transform !== "none") {
        appliedTransforms = transform + " " + appliedTransforms;
      }
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;
    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }
    return list;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window)
    return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    container = container || el.parentNode;
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, "transform") !== "none" || relativeToNonStaticParent && css(container, "position") !== "static")) {
          var containerRect = container.getBoundingClientRect();
          top -= containerRect.top + parseInt(css(container, "border-top-width"));
          left -= containerRect.left + parseInt(css(container, "border-left-width"));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    var elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true), elSideVal = getRect(el)[elSide];
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide], visible = void 0;
    if (parentSide === "top" || parentSide === "left") {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }
    if (!visible)
      return parent;
    if (parent === getWindowScrollingElement())
      break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}
function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0, i = 0, children = el.children;
  while (i < children.length) {
    if (children[i].style.display !== "none" && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, "display") === "none" || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}
function index(el, selector) {
  var index2 = 0;
  if (!el || !el.parentNode) {
    return -1;
  }
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== "TEMPLATE" && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index2++;
    }
  }
  return index2;
}
function getRelativeScrollOffset(el) {
  var offsetLeft = 0, offsetTop = 0, winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el), scaleX = elMatrix.a, scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}
function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i))
      continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key])
        return Number(i);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  if (!el || !el.getBoundingClientRect)
    return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;
  do {
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);
      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll") || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll")) {
        if (!elem.getBoundingClientRect || elem === document.body)
          return getWindowScrollingElement();
        if (gotSelf || includeSelf)
          return elem;
        gotSelf = true;
      }
    }
  } while (elem = elem.parentNode);
  return getWindowScrollingElement();
}
function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function() {
    if (!_throttleTimeout) {
      var args = arguments, _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function() {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
var expando = "Sortable" + new Date().getTime();
function AnimationStateManager() {
  var animationStates = [], animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation)
        return;
      var children = [].slice.call(this.el.children);
      children.forEach(function(child) {
        if (css(child, "display") === "none" || child === Sortable.ghost)
          return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === "function")
          callback();
        return;
      }
      var animating = false, animationTime = 0;
      animationStates.forEach(function(state) {
        var time = 0, target = state.target, fromRect = target.fromRect, toRect = getRect(target), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target, true);
        if (targetMatrix) {
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function() {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === "function")
          callback();
      } else {
        animationCallbackId = setTimeout(function() {
          if (typeof callback === "function")
            callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, "transition", "");
        css(target, "transform", "");
        var elMatrix = matrix(this.el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d, translateX = (currentRect.left - toRect.left) / (scaleX || 1), translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, "transform", "translate3d(" + translateX + "px," + translateY + "px,0)");
        this.forRepaintDummy = repaint(target);
        css(target, "transition", "transform " + duration + "ms" + (this.options.easing ? " " + this.options.easing : ""));
        css(target, "transform", "translate3d(0,0,0)");
        typeof target.animated === "number" && clearTimeout(target.animated);
        target.animated = setTimeout(function() {
          css(target, "transition", "");
          css(target, "transform", "");
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}
var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    for (var option2 in defaults) {
      if (defaults.hasOwnProperty(option2) && !(option2 in plugin)) {
        plugin[option2] = defaults[option2];
      }
    }
    plugins.forEach(function(p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function() {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + "Global";
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName])
        return;
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable
        }, evt));
      }
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults2, options) {
    plugins.forEach(function(plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault)
        return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized;
      _extends(defaults2, initialized.defaults);
    });
    for (var option2 in sortable.options) {
      if (!sortable.options.hasOwnProperty(option2))
        continue;
      var modified = this.modifyOption(sortable, option2, sortable.options[option2]);
      if (typeof modified !== "undefined") {
        sortable.options[option2] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function(plugin) {
      if (typeof plugin.eventProperties !== "function")
        return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function(plugin) {
      if (!sortable[plugin.pluginName])
        return;
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === "function") {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};
function dispatchEvent(_ref) {
  var sortable = _ref.sortable, rootEl2 = _ref.rootEl, name = _ref.name, targetEl = _ref.targetEl, cloneEl2 = _ref.cloneEl, toEl = _ref.toEl, fromEl = _ref.fromEl, oldIndex2 = _ref.oldIndex, newIndex2 = _ref.newIndex, oldDraggableIndex2 = _ref.oldDraggableIndex, newDraggableIndex2 = _ref.newDraggableIndex, originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl2 && rootEl2[expando];
  if (!sortable)
    return;
  var evt, options = sortable.options, onName = "on" + name.charAt(0).toUpperCase() + name.substr(1);
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl2;
  evt.from = fromEl || rootEl2;
  evt.item = targetEl || rootEl2;
  evt.clone = cloneEl2;
  evt.oldIndex = oldIndex2;
  evt.newIndex = newIndex2;
  evt.oldDraggableIndex = oldDraggableIndex2;
  evt.newDraggableIndex = newDraggableIndex2;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable2 ? putSortable2.lastPutMode : void 0;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option2 in allEventProperties) {
    evt[option2] = allEventProperties[option2];
  }
  if (rootEl2) {
    rootEl2.dispatchEvent(evt);
  }
  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}
var _excluded = ["evt"];
var pluginEvent2 = function pluginEvent3(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, originalEvent = _ref.evt, data = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    dragStarted: moved,
    putSortable,
    activeSortable: Sortable.active,
    originalEvent,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable,
        name,
        originalEvent
      });
    }
  }, data));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable,
    cloneEl,
    targetEl: dragEl,
    rootEl,
    oldIndex,
    oldDraggableIndex,
    newIndex,
    newDraggableIndex
  }, info));
}
var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [];
var documentExists = typeof document !== "undefined", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
  if (!documentExists)
    return;
  if (IE11OrLess) {
    return false;
  }
  var el = document.createElement("x");
  el.style.cssText = "pointer-events:auto";
  return el.style.pointerEvents === "auto";
}(), _detectDirection = function _detectDirection2(el, options) {
  var elCSS = css(el), elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth), child1 = getChild(el, 0, options), child2 = getChild(el, 1, options), firstChildCSS = child1 && css(child1), secondChildCSS = child2 && css(child2), firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width, secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
  if (elCSS.display === "flex") {
    return elCSS.flexDirection === "column" || elCSS.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  }
  if (elCSS.display === "grid") {
    return elCSS.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  }
  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== "none") {
    var touchingSideChild2 = firstChildCSS["float"] === "left" ? "left" : "right";
    return child2 && (secondChildCSS.clear === "both" || secondChildCSS.clear === touchingSideChild2) ? "vertical" : "horizontal";
  }
  return child1 && (firstChildCSS.display === "block" || firstChildCSS.display === "flex" || firstChildCSS.display === "table" || firstChildCSS.display === "grid" || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none" || child2 && elCSS[CSSFloatProperty] === "none" && firstChildWidth + secondChildWidth > elWidth) ? "vertical" : "horizontal";
}, _dragElInRowColumn = function _dragElInRowColumn2(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top, dragElS2Opp = vertical ? dragRect.right : dragRect.bottom, dragElOppLength = vertical ? dragRect.width : dragRect.height, targetS1Opp = vertical ? targetRect.left : targetRect.top, targetS2Opp = vertical ? targetRect.right : targetRect.bottom, targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
}, _detectNearestEmptySortable = function _detectNearestEmptySortable2(x, y) {
  var ret;
  sortables.some(function(sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable))
      return;
    var rect = getRect(sortable), insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold, insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
}, _prepareGroup = function _prepareGroup2(options) {
  function toFn(value, pull) {
    return function(to, from, dragEl2, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
      if (value == null && (pull || sameGroup)) {
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === "clone") {
        return value;
      } else if (typeof value === "function") {
        return toFn(value(to, from, dragEl2, evt), pull)(to, from, dragEl2, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === "string" && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }
  var group = {};
  var originalGroup = options.group;
  if (!originalGroup || _typeof(originalGroup) != "object") {
    originalGroup = {
      name: originalGroup
    };
  }
  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
}, _hideGhostForTarget = function _hideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "none");
  }
}, _unhideGhostForTarget = function _unhideGhostForTarget2() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, "display", "");
  }
};
if (documentExists) {
  document.addEventListener("click", function(evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent2(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      var event = {};
      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl2(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el;
  this.options = options = _extends({}, options);
  el[expando] = this;
  var defaults2 = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    invertSwap: false,
    invertedSwapThreshold: null,
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl2) {
      dataTransfer.setData("Text", dragEl2.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults2);
  for (var name in defaults2) {
    !(name in options) && (options[name] = defaults2[name]);
  }
  _prepareGroup(options);
  for (var fn in this) {
    if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
      this[fn] = this[fn].bind(this);
    }
  }
  this.nativeDraggable = options.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    this.options.touchStartThreshold = 1;
  }
  if (options.supportPointer) {
    on(el, "pointerdown", this._onTapStart);
  } else {
    on(el, "mousedown", this._onTapStart);
    on(el, "touchstart", this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, "dragover", this);
    on(el, "dragenter", this);
  }
  sortables.push(this.el);
  options.store && options.store.get && this.sort(options.store.get(this) || []);
  _extends(this, AnimationStateManager());
}
Sortable.prototype = {
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === "function" ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(evt) {
    if (!evt.cancelable)
      return;
    var _this = this, el = this.el, options = this.options, preventOnFilter = options.preventOnFilter, type = evt.type, touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === "touch" && evt, target = (touch || evt).target, originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target, filter = options.filter;
    _saveInputCheckedState(el);
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return;
    }
    if (originalTarget.isContentEditable) {
      return;
    }
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === "SELECT") {
      return;
    }
    target = closest(target, options.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      return;
    }
    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable);
    if (typeof filter === "function") {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: "filter",
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent2("filter", _this, {
          evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    } else if (filter) {
      filter = filter.split(",").some(function(criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: "filter",
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent2("filter", _this, {
            evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return;
      }
    }
    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    }
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(evt, touch, target) {
    var _this = this, el = _this.el, options = _this.options, ownerDocument = el.ownerDocument, dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style["will-change"] = "all";
      dragStartFn = function dragStartFn2() {
        pluginEvent2("delayEnded", _this, {
          evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }
        _this._triggerDragStart(evt, touch);
        _dispatchEvent({
          sortable: _this,
          name: "choose",
          originalEvent: evt
        });
        toggleClass(dragEl, options.chosenClass, true);
      };
      options.ignore.split(",").forEach(function(criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
      on(ownerDocument, "mouseup", _this._onDrop);
      on(ownerDocument, "touchend", _this._onDrop);
      on(ownerDocument, "touchcancel", _this._onDrop);
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent2("delayStart", this, {
        evt
      });
      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        on(ownerDocument, "mouseup", _this._disableDelayedDrag);
        on(ownerDocument, "touchend", _this._disableDelayedDrag);
        on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
        on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
        on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, "pointermove", _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._disableDelayedDrag);
    off(ownerDocument, "touchend", this._disableDelayedDrag);
    off(ownerDocument, "touchcancel", this._disableDelayedDrag);
    off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
    off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(evt, touch) {
    touch = touch || evt.pointerType == "touch" && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, "pointermove", this._onTouchMove);
      } else if (touch) {
        on(document, "touchmove", this._onTouchMove);
      } else {
        on(document, "mousemove", this._onTouchMove);
      }
    } else {
      on(dragEl, "dragend", this);
      on(rootEl, "dragstart", this._onDragStart);
    }
    try {
      if (document.selection) {
        _nextTick(function() {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {
    }
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent2("dragStarted", this, {
        evt
      });
      if (this.nativeDraggable) {
        on(document, "dragover", _checkOutsideTargetEl);
      }
      var options = this.options;
      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();
      _dispatchEvent({
        sortable: this,
        name: "start",
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent)
          break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent;
        } while (parent = parent.parentNode);
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(evt) {
    if (tapEvt) {
      var options = this.options, fallbackTolerance = options.fallbackTolerance, fallbackOffset = options.fallbackOffset, touch = evt.touches ? evt.touches[0] : evt, ghostMatrix = ghostEl && matrix(ghostEl, true), scaleX = ghostEl && ghostMatrix && ghostMatrix.a, scaleY = ghostEl && ghostMatrix && ghostMatrix.d, relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1), dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, "webkitTransform", cssMatrix);
        css(ghostEl, "mozTransform", cssMatrix);
        css(ghostEl, "msTransform", cssMatrix);
        css(ghostEl, "transform", cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl, rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container), options = this.options;
      if (PositionGhostAbsolutely) {
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document)
            ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, "transition", "");
      css(ghostEl, "transform", "");
      css(ghostEl, "box-sizing", "border-box");
      css(ghostEl, "margin", 0);
      css(ghostEl, "top", rect.top);
      css(ghostEl, "left", rect.left);
      css(ghostEl, "width", rect.width);
      css(ghostEl, "height", rect.height);
      css(ghostEl, "opacity", "0.8");
      css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed");
      css(ghostEl, "zIndex", "100000");
      css(ghostEl, "pointerEvents", "none");
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);
      css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
    }
  },
  _onDragStart: function _onDragStart(evt, fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent2("dragStart", this, {
      evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent2("setupClone", this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.draggable = false;
      cloneEl.style["will-change"] = "";
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }
    _this.cloneId = _nextTick(function() {
      pluginEvent2("clone", _this);
      if (Sortable.eventCanceled)
        return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: "clone"
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true);
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      off(document, "mouseup", _this._onDrop);
      off(document, "touchend", _this._onDrop);
      off(document, "touchcancel", _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = "move";
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, "drop", _this);
      css(dragEl, "transform", "translateZ(0)");
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, "selectstart", _this);
    moved = true;
    if (Safari) {
      css(document.body, "user-select", "none");
    }
  },
  _onDragOver: function _onDragOver(evt) {
    var el = this.el, target = evt.target, dragRect, targetRect, revert, options = this.options, group = options.group, activeSortable = Sortable.active, isOwner = activeGroup === group, canSort = options.sort, fromSortable = putSortable || activeSortable, vertical, _this = this, completedFired = false;
    if (_silent)
      return;
    function dragOverEvent(name, extra) {
      pluginEvent2(name, _this, _objectSpread2({
        evt,
        isOwner,
        axis: vertical ? "vertical" : "horizontal",
        revert,
        dragRect,
        targetRect,
        canSort,
        fromSortable,
        target,
        completed,
        onMove: function onMove(target2, after2) {
          return _onMove(rootEl, el, dragEl, dragRect, target2, getRect(target2), evt, after2);
        },
        changed
      }, extra));
    }
    function capture() {
      dragOverEvent("dragOverAnimationCapture");
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }
    function completed(insertion) {
      dragOverEvent("dragOverCompleted", {
        insertion
      });
      if (insertion) {
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function() {
          dragOverEvent("dragOverAnimationComplete");
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }
      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      _dispatchEvent({
        sortable: _this,
        name: "change",
        toEl: el,
        newIndex,
        newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options.draggable, el, true);
    dragOverEvent("dragOver");
    if (Sortable.eventCanceled)
      return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === "vertical";
      dragRect = getRect(dragEl);
      dragOverEvent("dragOverValid");
      if (Sortable.eventCanceled)
        return completedFired;
      if (revert) {
        parentEl = rootEl;
        capture();
        this._hideClone();
        dragOverEvent("revert");
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        if (elLastChild === dragEl) {
          return completed(false);
        }
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          el.appendChild(dragEl);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        var firstChild = getChild(el, 0, options, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el;
          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0, targetBeforeFirstSwap, differentLevel = dragEl.parentNode !== el, differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical), side1 = vertical ? "top" : "left", scrolledPastTop = isScrolledPast(target, "top", "top") || isScrolledPast(dragEl, "top", "top"), scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, "display") === "none" || sibling === ghostEl));
        }
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling, after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          }
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode;
          if (targetBeforeFirstSwap !== void 0 && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, "mousemove", this._onTouchMove);
    off(document, "touchmove", this._onTouchMove);
    off(document, "pointermove", this._onTouchMove);
    off(document, "dragover", nearestEmptyInsertDetectEvent);
    off(document, "mousemove", nearestEmptyInsertDetectEvent);
    off(document, "touchmove", nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, "mouseup", this._onDrop);
    off(ownerDocument, "touchend", this._onDrop);
    off(ownerDocument, "pointerup", this._onDrop);
    off(ownerDocument, "touchcancel", this._onDrop);
    off(document, "selectstart", this);
  },
  _onDrop: function _onDrop(evt) {
    var el = this.el, options = this.options;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent2("drop", this, {
      evt
    });
    parentEl = dragEl && dragEl.parentNode;
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);
    if (this.nativeDraggable) {
      off(document, "drop", this);
      off(el, "dragstart", this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, "user-select", "");
    }
    css(dragEl, "transform", "");
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") {
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, "dragend", this);
        }
        _disableDraggable(dragEl);
        dragEl.style["will-change"] = "";
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);
        _dispatchEvent({
          sortable: this,
          name: "unchoose",
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            _dispatchEvent({
              rootEl: parentEl,
              name: "add",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "remove",
              toEl: parentEl,
              originalEvent: evt
            });
            _dispatchEvent({
              rootEl: parentEl,
              name: "sort",
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: "sort",
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              _dispatchEvent({
                sortable: this,
                name: "update",
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: "end",
            toEl: parentEl,
            originalEvent: evt
          });
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent2("nulling", this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function(el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(evt) {
    switch (evt.type) {
      case "drop":
      case "dragend":
        this._onDrop(evt);
        break;
      case "dragenter":
      case "dragover":
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case "selectstart":
        evt.preventDefault();
        break;
    }
  },
  toArray: function toArray() {
    var order = [], el, children = this.el.children, i = 0, n = children.length, options = this.options;
    for (; i < n; i++) {
      el = children[i];
      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  sort: function sort(order, useAnimation) {
    var items = {}, rootEl2 = this.el;
    this.toArray().forEach(function(id, i) {
      var el = rootEl2.children[i];
      if (closest(el, this.options.draggable, rootEl2, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function(id) {
      if (items[id]) {
        rootEl2.removeChild(items[id]);
        rootEl2.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  option: function option(name, value) {
    var options = this.options;
    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== "undefined") {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }
      if (name === "group") {
        _prepareGroup(options);
      }
    }
  },
  destroy: function destroy() {
    pluginEvent2("destroy", this);
    var el = this.el;
    el[expando] = null;
    off(el, "mousedown", this._onTapStart);
    off(el, "touchstart", this._onTapStart);
    off(el, "pointerdown", this._onTapStart);
    if (this.nativeDraggable) {
      off(el, "dragover", this);
      off(el, "dragenter", this);
    }
    Array.prototype.forEach.call(el.querySelectorAll("[draggable]"), function(el2) {
      el2.removeAttribute("draggable");
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent2("hideClone", this);
      if (Sortable.eventCanceled)
        return;
      css(cloneEl, "display", "none");
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable2) {
    if (putSortable2.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent2("showClone", this);
      if (Sortable.eventCanceled)
        return;
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, "display", "");
      cloneHidden = false;
    }
  }
};
function _globalDragOver(evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = "move";
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl2, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt, sortable = fromEl[expando], onMoveFn = sortable.options.onMove, retVal;
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent("move", {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent("Event");
    evt.initEvent("move", true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl2;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var spacer = 10;
  return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX, targetLength = vertical ? targetRect.height : targetRect.width, targetS1 = vertical ? targetRect.top : targetRect.left, targetS2 = vertical ? targetRect.bottom : targetRect.right, invert = false;
  if (!invertSwap) {
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent, i = str.length, sum = 0;
  while (i--) {
    sum += str.charCodeAt(i);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName("input");
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}
if (documentExists) {
  on(document, "touchmove", function(evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}
Sortable.utils = {
  on,
  off,
  css,
  find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend,
  throttle,
  closest,
  toggleClass,
  clone,
  index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild
};
Sortable.get = function(element) {
  return element[expando];
};
Sortable.mount = function() {
  for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins2[_key] = arguments[_key];
  }
  if (plugins2[0].constructor === Array)
    plugins2 = plugins2[0];
  plugins2.forEach(function(plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils)
      Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
Sortable.create = function(el, options) {
  return new Sortable(el, options);
};
Sortable.version = version;
var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, "dragover", this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, "touchmove", this._handleFallbackAutoScroll);
        } else {
          on(document, "mousemove", this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop3() {
      if (this.sortable.nativeDraggable) {
        off(document, "dragover", this._handleAutoScroll);
      } else {
        off(document, "pointermove", this._handleFallbackAutoScroll);
        off(document, "touchmove", this._handleFallbackAutoScroll);
        off(document, "mousemove", this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt;
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback);
        var ogElemScroller = getParentAutoScrollElement(elem, true);
        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          pointerElemChangedInterval = setInterval(function() {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function(autoScroll2) {
    clearInterval(autoScroll2.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function(evt, options, rootEl2, isFallback) {
  if (!options.scroll)
    return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX, y = (evt.touches ? evt.touches[0] : evt).clientY, sens = options.scrollSensitivity, speed = options.scrollSpeed, winScroller = getWindowScrollingElement();
  var scrollThisInstance = false, scrollCustomFn;
  if (scrollRootEl !== rootEl2) {
    scrollRootEl = rootEl2;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl2, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent, rect = getRect(el), top = rect.top, bottom = rect.bottom, left = rect.left, right = rect.right, width = rect.width, height = rect.height, canScrollX = void 0, canScrollY = void 0, scrollWidth = el.scrollWidth, scrollHeight = el.scrollHeight, elCSS = css(el), scrollPosX = el.scrollLeft, scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll" || elCSS.overflowX === "visible");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll" || elCSS.overflowY === "visible");
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === "auto" || elCSS.overflowX === "scroll");
      canScrollY = height < scrollHeight && (elCSS.overflowY === "auto" || elCSS.overflowY === "scroll");
    }
    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        autoScrolls[layersOut].pid = setInterval(function() {
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1);
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === "function") {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== "continue") {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance;
}, 30);
var drop = function drop2(_ref) {
  var originalEvent = _ref.originalEvent, putSortable2 = _ref.putSortable, dragEl2 = _ref.dragEl, activeSortable = _ref.activeSortable, dispatchSortableEvent = _ref.dispatchSortableEvent, hideGhostForTarget = _ref.hideGhostForTarget, unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent)
    return;
  var toSortable = putSortable2 || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent("spill");
    this.onSpill({
      dragEl: dragEl2,
      putSortable: putSortable2
    });
  }
};
function Revert() {
}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex2 = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex2;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl2 = _ref3.dragEl, putSortable2 = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable2) {
      putSortable2.captureAnimationState();
    }
    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl2, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl2);
    }
    this.sortable.animateAll();
    if (putSortable2) {
      putSortable2.animateAll();
    }
  },
  drop
};
_extends(Revert, {
  pluginName: "revertOnSpill"
});
function Remove() {
}
Remove.prototype = {
  onSpill: function onSpill2(_ref4) {
    var dragEl2 = _ref4.dragEl, putSortable2 = _ref4.putSortable;
    var parentSortable = putSortable2 || this.sortable;
    parentSortable.captureAnimationState();
    dragEl2.parentNode && dragEl2.parentNode.removeChild(dragEl2);
    parentSortable.animateAll();
  },
  drop
};
_extends(Remove, {
  pluginName: "removeOnSpill"
});
Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);
function getConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  }
  return global.console;
}
const console$1 = getConsole();
function cached(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
const regex = /-(\w)/g;
const camelize = cached((str) => str.replace(regex, (_, c) => c ? c.toUpperCase() : ""));
function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}
function insertNodeAt(fatherNode, node, position) {
  const refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}
function computeVmIndex(vnodes, element) {
  return Object.values(vnodes).indexOf(element);
}
function computeIndexes(slots, children, isTransition2, footerOffset) {
  if (!slots) {
    return [];
  }
  const elmFromNodes = Object.values(slots);
  const footerIndex = children.length - footerOffset;
  const rawIndexes = [...children].map((elt, idx) => idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt));
  return rawIndexes;
}
function emit(evtName, evtData) {
  this.$nextTick(() => this.$emit(evtName.toLowerCase(), evtData));
}
function delegateAndEmit(evtName) {
  return (evtData) => {
    if (this.realList !== null) {
      this["onDrag" + evtName](evtData);
    }
    emit.call(this, evtName, evtData);
  };
}
function isTransitionName(name) {
  return ["transition-group", "TransitionGroup"].includes(name);
}
function isTransition(slots) {
  if (!slots || slots.length !== 1) {
    return false;
  }
  const [{ type }] = slots;
  if (!type) {
    return false;
  }
  return isTransitionName(type.name);
}
function getComponentAttributes($attrs, componentData) {
  if (!componentData) {
    return $attrs;
  }
  return { ...componentData.props, ...componentData.attrs };
}
const eventsListened = ["Start", "Add", "Remove", "Update", "End"];
const eventsToEmit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
const readonlyProperties = ["Move", ...eventsListened, ...eventsToEmit].map((evt) => "on" + evt);
let draggingElement = null;
const props = {
  options: Object,
  list: {
    type: Array,
    required: false,
    default: null
  },
  noTransitionOnDrag: {
    type: Boolean,
    default: false
  },
  clone: {
    type: Function,
    default: (original) => {
      return original;
    }
  },
  tag: {
    type: String,
    default: "div"
  },
  move: {
    type: Function,
    default: null
  },
  componentData: {
    type: Object,
    required: false,
    default: null
  },
  component: {
    type: String,
    default: null
  },
  modelValue: {
    type: Array,
    required: false,
    default: null
  }
};
const VueDraggableNext = defineComponent({
  name: "VueDraggableNext",
  inheritAttrs: false,
  emits: [
    "update:modelValue",
    "move",
    "change",
    ...eventsListened.map((s) => s.toLowerCase()),
    ...eventsToEmit.map((s) => s.toLowerCase())
  ],
  props,
  data() {
    return {
      transitionMode: false,
      noneFunctionalComponentMode: false,
      headerOffset: 0,
      footerOffset: 0,
      _sortable: {},
      visibleIndexes: [],
      context: {}
    };
  },
  render() {
    const slots = this.$slots.default ? this.$slots.default() : null;
    const attrs = getComponentAttributes(this.$attrs, this.componentData);
    if (!slots)
      return h(this.getTag(), attrs, []);
    this.transitionMode = isTransition(slots);
    return h(this.getTag(), attrs, slots);
  },
  created() {
    if (this.list !== null && this.modelValue !== null) {
      console$1.error("list props are mutually exclusive! Please set one.");
    }
  },
  mounted() {
    const optionsAdded = {};
    eventsListened.forEach((elt) => {
      optionsAdded["on" + elt] = delegateAndEmit.call(this, elt);
    });
    eventsToEmit.forEach((elt) => {
      optionsAdded["on" + elt] = emit.bind(this, elt);
    });
    const attributes = Object.keys(this.$attrs).reduce((res, key) => {
      res[camelize(key)] = this.$attrs[key];
      return res;
    }, {});
    const options = Object.assign({}, attributes, optionsAdded, {
      onMove: (evt, originalEvent) => {
        return this.onDragMove(evt, originalEvent);
      }
    });
    !("draggable" in options) && (options.draggable = ">*");
    const targetDomElement = this.$el.nodeType === 1 ? this.$el : this.$el.parentElement;
    this._sortable = new Sortable(targetDomElement, options);
    targetDomElement.__draggable_component__ = this;
    this.computeIndexes();
  },
  beforeUnmount() {
    try {
      if (this._sortable !== void 0)
        this._sortable.destroy();
    } catch (error) {
    }
  },
  computed: {
    realList() {
      return this.list ? this.list : this.modelValue;
    }
  },
  watch: {
    $attrs: {
      handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    },
    realList() {
      this.computeIndexes();
    }
  },
  methods: {
    getTag() {
      return this.component ? resolveComponent(this.component) : this.tag;
    },
    updateOptions(newOptionValue) {
      for (var property in newOptionValue) {
        const value = camelize(property);
        if (readonlyProperties.indexOf(value) === -1) {
          this._sortable.option(value, newOptionValue[property]);
        }
      }
    },
    getChildrenNodes() {
      return this.$el.children;
    },
    computeIndexes() {
      this.$nextTick(() => {
        this.visibleIndexes = computeIndexes(this.getChildrenNodes(), this.$el.children, this.transitionMode, this.footerOffset);
      });
    },
    getUnderlyingVm(htmlElt) {
      const index2 = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
      if (index2 === -1) {
        return null;
      }
      const element = this.realList[index2];
      return { index: index2, element };
    },
    emitChanges(evt) {
      this.$nextTick(() => {
        this.$emit("change", evt);
      });
    },
    alterList(onList) {
      if (this.list) {
        onList(this.list);
        return;
      }
      const newList = [...this.modelValue];
      onList(newList);
      this.$emit("update:modelValue", newList);
    },
    spliceList() {
      const spliceList = (list) => list.splice(...arguments);
      this.alterList(spliceList);
    },
    updatePosition(oldIndex2, newIndex2) {
      const updatePosition = (list) => list.splice(newIndex2, 0, list.splice(oldIndex2, 1)[0]);
      this.alterList(updatePosition);
    },
    getVmIndex(domIndex) {
      const indexes = this.visibleIndexes;
      const numberIndexes = indexes.length;
      return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
    },
    getComponent() {
      return this.$slots.default ? this.$slots.default()[0].componentInstance : null;
    },
    resetTransitionData(index2) {
      if (!this.noTransitionOnDrag || !this.transitionMode) {
        return;
      }
      var nodes = this.getChildrenNodes();
      nodes[index2].data = null;
      const transitionContainer = this.getComponent();
      transitionContainer.children = [];
      transitionContainer.kept = void 0;
    },
    onDragStart(evt) {
      this.computeIndexes();
      this.context = this.getUnderlyingVm(evt.item);
      if (!this.context)
        return;
      evt.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = evt.item;
    },
    onDragAdd(evt) {
      const element = evt.item._underlying_vm_;
      if (element === void 0) {
        return;
      }
      removeNode(evt.item);
      const newIndex2 = this.getVmIndex(evt.newIndex);
      this.spliceList(newIndex2, 0, element);
      this.computeIndexes();
      const added = { element, newIndex: newIndex2 };
      this.emitChanges({ added });
    },
    onDragRemove(evt) {
      insertNodeAt(this.$el, evt.item, evt.oldIndex);
      if (evt.pullMode === "clone") {
        removeNode(evt.clone);
        return;
      }
      if (!this.context)
        return;
      const oldIndex2 = this.context.index;
      this.spliceList(oldIndex2, 1);
      const removed = { element: this.context.element, oldIndex: oldIndex2 };
      this.resetTransitionData(oldIndex2);
      this.emitChanges({ removed });
    },
    onDragUpdate(evt) {
      removeNode(evt.item);
      insertNodeAt(evt.from, evt.item, evt.oldIndex);
      const oldIndex2 = this.context.index;
      const newIndex2 = this.getVmIndex(evt.newIndex);
      this.updatePosition(oldIndex2, newIndex2);
      const moved2 = { element: this.context.element, oldIndex: oldIndex2, newIndex: newIndex2 };
      this.emitChanges({ moved: moved2 });
    },
    updateProperty(evt, propertyName) {
      evt.hasOwnProperty(propertyName) && (evt[propertyName] += this.headerOffset);
    },
    onDragMove(evt, originalEvent) {
      const onMove = this.move;
      if (!onMove || !this.realList) {
        return true;
      }
      const relatedContext = this.getRelatedContextFromMoveEvent(evt);
      const draggedContext = this.context;
      const futureIndex = this.computeFutureIndex(relatedContext, evt);
      Object.assign(draggedContext, { futureIndex });
      const sendEvt = Object.assign({}, evt, {
        relatedContext,
        draggedContext
      });
      return onMove(sendEvt, originalEvent);
    },
    onDragEnd() {
      this.computeIndexes();
      draggingElement = null;
    },
    getTrargetedComponent(htmElement) {
      return htmElement.__draggable_component__;
    },
    getRelatedContextFromMoveEvent({ to, related }) {
      const component = this.getTrargetedComponent(to);
      if (!component) {
        return { component };
      }
      const list = component.realList;
      const context = { list, component };
      if (to !== related && list && component.getUnderlyingVm) {
        const destination = component.getUnderlyingVm(related);
        if (destination) {
          return Object.assign(destination, context);
        }
      }
      return context;
    },
    computeFutureIndex(relatedContext, evt) {
      const domChildren = [...evt.to.children].filter((el) => el.style["display"] !== "none");
      if (domChildren.length === 0)
        return 0;
      const currentDOMIndex = domChildren.indexOf(evt.related);
      const currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
      const draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
    }
  }
});
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props: props2, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props2.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props2.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props2.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props: props2, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props2.rules !== void 0 && props2.rules !== null && props2.rules.length !== 0
  );
  const hasActiveRules = computed(
    () => props2.disable !== true && hasRules.value === true
  );
  const hasError = computed(
    () => props2.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props2.errorMessage === "string" && props2.errorMessage.length !== 0 ? props2.errorMessage : innerErrorMessage.value);
  watch(() => props2.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props2.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props2.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false;
      }
    } else if (isDirtyModel.value === false) {
      isDirtyModel.value = true;
      if (hasActiveRules.value === true && props2.lazyRules !== "ondemand" && innerLoading.value === false) {
        debouncedValidate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props2.modelValue) {
    if (hasActiveRules.value !== true) {
      return true;
    }
    const index2 = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props2.rules.length; i++) {
      const rule = props2.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index2 === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index2 === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index2 === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  function validateIfNeeded(changedRules) {
    if (hasActiveRules.value === true && props2.lazyRules !== "ondemand" && (isDirtyModel.value === true || props2.lazyRules !== true && changedRules !== true)) {
      debouncedValidate();
    }
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs, vnode) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
let queue = [];
let waitFlags = [];
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length !== 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popupShow", "popupHide"];
function useFieldState() {
  const { props: props2, attrs, proxy, vnode } = getCurrentInstance();
  const isDark = useDark(props2, proxy.$q);
  return {
    isDark,
    editable: computed(
      () => props2.disable !== true && props2.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(attrs, vnode),
    targetUid: ref(getTargetUid(props2.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props: props2, emit: emit2, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props2.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit2("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props2.counter !== false) {
        const len = typeof props2.modelValue === "string" || typeof props2.modelValue === "number" ? ("" + props2.modelValue).length : Array.isArray(props2.modelValue) === true ? props2.modelValue.length : 0;
        const max = props2.maxlength !== void 0 ? props2.maxlength : props2.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props2.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props2.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props2.bottomSlots === true || props2.hint !== void 0 || hasRules.value === true || props2.counter === true || props2.error !== null
  );
  const styleType = computed(() => {
    if (props2.filled === true) {
      return "filled";
    }
    if (props2.outlined === true) {
      return "outlined";
    }
    if (props2.borderless === true) {
      return "borderless";
    }
    if (props2.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props2.rounded === true ? " q-field--rounded" : "") + (props2.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props2.dense === true ? " q-field--dense" : "") + (props2.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props2.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props2.disable === true ? " q-field--disabled" : props2.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props2.bgColor !== void 0 ? ` bg-${props2.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props2.standout === "string" && props2.standout.length !== 0 && state.focused.value === true ? ` ${props2.standout}` : props2.color !== void 0 ? ` text-${props2.color}` : "")
  );
  const hasLabel = computed(
    () => props2.labelSlot === true || props2.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props2.labelColor !== void 0 && hasError.value !== true ? ` text-${props2.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props2.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props2.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props2.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props2.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit2("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit2("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props2.type === "file") {
      state.inputRef.value.value = null;
    }
    emit2("update:modelValue", null);
    emit2("clear", props2.modelValue);
    nextTick(() => {
      resetValidation();
      if ($q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props2.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props2.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props2.color })]
        )
      );
    } else if (props2.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            tag: "button",
            name: props2.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            type: "button",
            "aria-hidden": null,
            role: null,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props2.prefix !== void 0 && props2.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props2.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props2.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props2.label))
    );
    props2.suffix !== void 0 && props2.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props2.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props2.hideHint !== true || state.focused.value === true) {
      if (props2.hint !== void 0) {
        msg = [h("div", props2.hint)];
        key = `q--slot-hint-${props2.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props2.counter === true || slots.counter !== void 0;
    if (props2.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props2.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props2.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props2.autofocus === true && proxy.focus();
  });
  onMounted(() => {
    if (isRuntimeSsrPreHydration.value === true && props2.for === void 0) {
      state.targetUid.value = getTargetUid();
    }
    props2.autofocus === true && proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props2.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h("label", {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props2, emit2, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props2.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props2.type);
  }
  watch(() => props2.type + props2.autogrow, updateMaskInternals);
  watch(() => props2.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props2.modelValue !== val && emit2("update:modelValue", val);
    }
  });
  watch(() => props2.fillMask + props2.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props2.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props2.modelValue));
      return props2.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props2.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props2.mask !== void 0 && props2.mask.length !== 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props2.mask] === void 0 ? props2.mask : NAMED_MASKS[props2.mask], fillChar = typeof props2.fillMask === "string" && props2.fillMask.length !== 0 ? props2.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props2.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index2) => {
      if (index2 === 0 && props2.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index2 === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props2.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props2.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props2.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props2.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props2.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[i] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props2.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props2.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });
    const val = props2.unmaskedValue === true ? unmaskValue(masked) : masked;
    String(props2.modelValue) !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break;
        }
      }
      if (i < 0 && maskMarked[cursor] !== void 0 && maskMarked[cursor] !== MARKER) {
        return moveCursor.right(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    right(inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          cursor = i;
        }
      }
      if (i > limit && maskMarked[cursor - 1] !== void 0 && maskMarked[cursor - 1] !== MARKER) {
        return moveCursor.left(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    },
    leftReverse(inp, cursor) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          cursor = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[cursor] !== void 0 && localMaskMarked[cursor] !== MARKER) {
        return moveCursor.rightReverse(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    rightReverse(inp, cursor) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break;
        }
      }
      if (i > limit && localMaskMarked[cursor - 1] !== void 0 && localMaskMarked[cursor - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    }
  };
  function onMaskedClick(e) {
    emit2("click", e);
    selectionAnchor = void 0;
  }
  function onMaskedKeydown(e) {
    emit2("keydown", e);
    if (shouldIgnoreKey(e) === true || e.altKey === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === "forward" ? start : end;
      }
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props2.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);
      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), "forward");
      }
    } else if (e.keyCode === 8 && props2.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, "backward");
    } else if (e.keyCode === 46 && props2.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, "forward");
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props2.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props2.reverseFillMask === true && val.length !== 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  };
}
function useFileFormDomProps(props2, typeGuard) {
  function getFormDomProps() {
    const model = props2.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props2.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) {
        return;
      }
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
var QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "click",
    "animationend"
  ],
  setup(props2, { emit: emit2, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props2);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props2, emit2, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props2, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(
      () => props2.type === "textarea" || props2.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props2.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        evt.onClick = onMaskedClick;
      }
      if (props2.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props2.autofocus === true || void 0,
        rows: props2.type === "textarea" ? 6 : void 0,
        "aria-label": props2.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props2.maxlength,
        disabled: props2.disable === true,
        readonly: props2.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props2.type;
      }
      if (props2.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props2.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props2.modelValue;
      }
    });
    watch(() => props2.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props2.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props2.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props2.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props2.dense, () => {
      props2.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props2.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit2("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) {
        return;
      }
      if (props2.type === "file") {
        emit2("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props2.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit2("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;
        if (props2.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props2.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit2("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props2.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props2.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props2.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { scrollTop } = inp;
          const { overflowY, maxHeight } = $q.platform.is.firefox === true ? {} : window.getComputedStyle(inp);
          const changeOverflow = overflowY !== void 0 && overflowY !== "scroll";
          changeOverflow === true && (inp.style.overflowY = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? "auto" : "hidden");
          parentStyle.marginBottom = "";
          inp.scrollTop = scrollTop;
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      emit2("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props2.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props2.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props2.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props2.type !== "file" && typeof props2.shadowText === "string" && props2.shadowText.length !== 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true && (props2.type !== "number" || isNaN(innerValue.value) === false) || fieldValueIsFilled(props2.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props2.inputClass
          ],
          style: props2.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props2.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props2.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-9793511e"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "filler" }, null, -1));
const _hoisted_2 = {
  class: "row",
  "fixed-bottom-right": ""
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_draggable = resolveComponent("draggable");
  return openBlock(), createBlock(QPage, { class: "row items-center justify-evenly" }, {
    default: withCtx(() => [
      createVNode(_component_draggable, {
        class: "dragArea list-group w-full",
        modelValue: _ctx.steps,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.steps = $event),
        onChange: _ctx.onChange
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.steps, (step, idx) => {
            return openBlock(), createElementBlock("div", {
              class: "item flex row justify-between align-center",
              key: step.id
            }, [
              step.editing ? (openBlock(), createBlock(QInput, {
                key: 0,
                class: "filled",
                autofocus: true,
                modelValue: step.name,
                "onUpdate:modelValue": ($event) => step.name = $event,
                dense: "",
                ref_for: true,
                ref: `input-${step.id}`,
                onBlur: ($event) => _ctx.finishEdit(step),
                onKeyup: withKeys(($event) => _ctx.finishEdit(step), ["enter"])
              }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur", "onKeyup"])) : (openBlock(), createElementBlock("div", {
                key: 1,
                style: normalizeStyle({ "font-size": _ctx.fontSizeRef + "px" })
              }, toDisplayString(step.name), 5)),
              _hoisted_1,
              createVNode(QBtn, {
                class: "small",
                color: "primary",
                flat: "",
                dense: "",
                onClick: ($event) => _ctx.editStep(step),
                icon: "edit"
              }, null, 8, ["onClick"]),
              createVNode(QBtn, {
                class: "small",
                color: "red",
                flat: "",
                dense: "",
                onClick: ($event) => _ctx.removeStep(step.id),
                icon: "delete"
              }, null, 8, ["onClick"])
            ]);
          }), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "onChange"]),
      createBaseVNode("div", _hoisted_2, [
        createVNode(QBtn, {
          class: "q-ma-md",
          color: "green",
          onClick: _ctx.addNewStep,
          icon: "add",
          label: "Add Step"
        }, null, 8, ["onClick"]),
        createVNode(QBtn, {
          class: "q-ma-md",
          color: "red",
          onClick: _ctx.removeLastStep,
          icon: "delete",
          label: "Remove Last Step"
        }, null, 8, ["onClick"])
      ])
    ]),
    _: 1
  });
}
var StepPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "EdiTor",
  props: {
    font_size: {
      type: Number,
      default: 16
    }
  },
  components: {
    draggable: VueDraggableNext
  },
  setup(props2) {
    const { font_size: fontSizeRef } = toRefs(props2);
    const steps = ref([
      { name: "Step1", id: 0, editing: false },
      { name: "Step2", id: 1, editing: false },
      { name: "Step3", id: 2, editing: false }
    ]);
    const route = useRoute();
    const router = useRouter();
    const onChange = () => {
      const path = "/edit/" + steps.value.map((o) => {
        return encodeURIComponent(o.name.replace(/\s/g, "_"));
      }).join("%20");
      router.push(path);
    };
    const editStep = (step) => {
      console.log("start edit!");
      step.editing = true;
      nextTick(() => {
        const inputRef = `input-${step.id}`;
        const inputElement = refs[inputRef];
        if (inputElement && inputElement.$el) {
          inputElement.$el.focus();
        }
      });
    };
    const finishEdit = (step) => {
      console.log("end edit!");
      step.editing = false;
      onChange();
    };
    const addNewStep = () => {
      const newId = steps.value.length ? Math.max(...steps.value.map((step) => step.id)) + 1 : 0;
      steps.value.push({
        name: "step" + (steps.value.length ? Math.max(...steps.value.map((step) => step.id)) + 2 : 1),
        id: newId,
        editing: false
      });
      onChange();
    };
    const removeLastStep = () => {
      if (steps.value.length > 0) {
        steps.value.pop();
        onChange();
      }
    };
    const removeStep = (id) => {
      const index2 = steps.value.findIndex((step) => step.id === id);
      if (index2 !== -1) {
        steps.value.splice(index2, 1);
        onChange();
      }
    };
    onMounted(() => {
      if (route.params.steps) {
        const routeSteps = route.params.steps.split(/%20|\s/);
        steps.value = routeSteps.map((name, idx) => ({
          id: idx,
          name,
          editing: false
        }));
      }
    });
    watch(
      () => route.params.steps,
      (newSteps) => {
        if (newSteps) {
          const routeSteps = newSteps.split(/%20|\s/);
          steps.value = routeSteps.map((name, idx) => ({
            id: idx,
            name,
            editing: false
          }));
        }
      }
    );
    return {
      fontSizeRef,
      steps,
      editStep,
      finishEdit,
      addNewStep,
      removeLastStep,
      removeStep,
      onChange
    };
  }
});
var StepPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__scopeId", "data-v-9793511e"], ["__file", "StepPage.vue"]]);
export { StepPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcFBhZ2UuMGI2NTgyZTAuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtZHJhZ2dhYmxlLW5leHQvZGlzdC92dWUtZHJhZ2dhYmxlLW5leHQuZXNtLWJ1bmRsZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtZm9ybS1jaGlsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3BhdHRlcm5zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdmFsaWRhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zcGxpdC1hdHRycy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3VpZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpZWxkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnB1dC91c2UtbWFzay5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUtZG9tLXByb3BzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnB1dC9RSW5wdXQuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvU3RlcFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICAqIHZ1ZS1kcmFnZ2FibGUtbmV4dCB2Mi4yLjBcbiAgKiAoYykgMjAyMyBBbmlzaCBHZW9yZ2VcbiAgKiBAbGljZW5zZSBNSVRcbiAgKi9cbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgaCwgcmVzb2x2ZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSc7XG5cbi8qKiFcbiAqIFNvcnRhYmxlIDEuMTQuMFxuICogQGF1dGhvclx0UnViYVhhICAgPHRyYXNoQHJ1YmF4YS5vcmc+XG4gKiBAYXV0aG9yXHRvd2VubSAgICA8b3dlbjIzMzU1QGdtYWlsLmNvbT5cbiAqIEBsaWNlbnNlIE1JVFxuICovXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7XG5cbiAgICBpZiAoZW51bWVyYWJsZU9ubHkpIHtcbiAgICAgIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpO1xuICB9XG5cbiAgcmV0dXJuIGtleXM7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuXG4gICAgaWYgKGkgJSAyKSB7XG4gICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuXG4gIHZhciB0YXJnZXQgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcblxuICB2YXIga2V5LCBpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHNvdXJjZVN5bWJvbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc291cmNlU3ltYm9sS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gc291cmNlU3ltYm9sS2V5c1tpXTtcbiAgICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG52YXIgdmVyc2lvbiA9IFwiMS4xNC4wXCI7XG5cbmZ1bmN0aW9uIHVzZXJBZ2VudChwYXR0ZXJuKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubmF2aWdhdG9yKSB7XG4gICAgcmV0dXJuICEhIC8qQF9fUFVSRV9fKi9uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKHBhdHRlcm4pO1xuICB9XG59XG5cbnZhciBJRTExT3JMZXNzID0gdXNlckFnZW50KC8oPzpUcmlkZW50LipydlsgOl0/MTFcXC58bXNpZXxpZW1vYmlsZXxXaW5kb3dzIFBob25lKS9pKTtcbnZhciBFZGdlID0gdXNlckFnZW50KC9FZGdlL2kpO1xudmFyIEZpcmVGb3ggPSB1c2VyQWdlbnQoL2ZpcmVmb3gvaSk7XG52YXIgU2FmYXJpID0gdXNlckFnZW50KC9zYWZhcmkvaSkgJiYgIXVzZXJBZ2VudCgvY2hyb21lL2kpICYmICF1c2VyQWdlbnQoL2FuZHJvaWQvaSk7XG52YXIgSU9TID0gdXNlckFnZW50KC9pUChhZHxvZHxob25lKS9pKTtcbnZhciBDaHJvbWVGb3JBbmRyb2lkID0gdXNlckFnZW50KC9jaHJvbWUvaSkgJiYgdXNlckFnZW50KC9hbmRyb2lkL2kpO1xuXG52YXIgY2FwdHVyZU1vZGUgPSB7XG4gIGNhcHR1cmU6IGZhbHNlLFxuICBwYXNzaXZlOiBmYWxzZVxufTtcblxuZnVuY3Rpb24gb24oZWwsIGV2ZW50LCBmbikge1xuICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgIUlFMTFPckxlc3MgJiYgY2FwdHVyZU1vZGUpO1xufVxuXG5mdW5jdGlvbiBvZmYoZWwsIGV2ZW50LCBmbikge1xuICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgIUlFMTFPckxlc3MgJiYgY2FwdHVyZU1vZGUpO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzKFxuLyoqSFRNTEVsZW1lbnQqL1xuZWwsXG4vKipTdHJpbmcqL1xuc2VsZWN0b3IpIHtcbiAgaWYgKCFzZWxlY3RvcikgcmV0dXJuO1xuICBzZWxlY3RvclswXSA9PT0gJz4nICYmIChzZWxlY3RvciA9IHNlbGVjdG9yLnN1YnN0cmluZygxKSk7XG5cbiAgaWYgKGVsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChlbC5tYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiBlbC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwubXNNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGVsLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFBhcmVudE9ySG9zdChlbCkge1xuICByZXR1cm4gZWwuaG9zdCAmJiBlbCAhPT0gZG9jdW1lbnQgJiYgZWwuaG9zdC5ub2RlVHlwZSA/IGVsLmhvc3QgOiBlbC5wYXJlbnROb2RlO1xufVxuXG5mdW5jdGlvbiBjbG9zZXN0KFxuLyoqSFRNTEVsZW1lbnQqL1xuZWwsXG4vKipTdHJpbmcqL1xuc2VsZWN0b3IsXG4vKipIVE1MRWxlbWVudCovXG5jdHgsIGluY2x1ZGVDVFgpIHtcbiAgaWYgKGVsKSB7XG4gICAgY3R4ID0gY3R4IHx8IGRvY3VtZW50O1xuXG4gICAgZG8ge1xuICAgICAgaWYgKHNlbGVjdG9yICE9IG51bGwgJiYgKHNlbGVjdG9yWzBdID09PSAnPicgPyBlbC5wYXJlbnROb2RlID09PSBjdHggJiYgbWF0Y2hlcyhlbCwgc2VsZWN0b3IpIDogbWF0Y2hlcyhlbCwgc2VsZWN0b3IpKSB8fCBpbmNsdWRlQ1RYICYmIGVsID09PSBjdHgpIHtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwgPT09IGN0eCkgYnJlYWs7XG4gICAgICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG4gICAgfSB3aGlsZSAoZWwgPSBnZXRQYXJlbnRPckhvc3QoZWwpKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgUl9TUEFDRSA9IC9cXHMrL2c7XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsLCBuYW1lLCBzdGF0ZSkge1xuICBpZiAoZWwgJiYgbmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdFtzdGF0ZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gKCcgJyArIGVsLmNsYXNzTmFtZSArICcgJykucmVwbGFjZShSX1NQQUNFLCAnICcpLnJlcGxhY2UoJyAnICsgbmFtZSArICcgJywgJyAnKTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IChjbGFzc05hbWUgKyAoc3RhdGUgPyAnICcgKyBuYW1lIDogJycpKS5yZXBsYWNlKFJfU1BBQ0UsICcgJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNzcyhlbCwgcHJvcCwgdmFsKSB7XG4gIHZhciBzdHlsZSA9IGVsICYmIGVsLnN0eWxlO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIGlmICh2YWwgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKGRvY3VtZW50LmRlZmF1bHRWaWV3ICYmIGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICAgICAgdmFsID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgJycpO1xuICAgICAgfSBlbHNlIGlmIChlbC5jdXJyZW50U3R5bGUpIHtcbiAgICAgICAgdmFsID0gZWwuY3VycmVudFN0eWxlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvcCA9PT0gdm9pZCAwID8gdmFsIDogdmFsW3Byb3BdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIShwcm9wIGluIHN0eWxlKSAmJiBwcm9wLmluZGV4T2YoJ3dlYmtpdCcpID09PSAtMSkge1xuICAgICAgICBwcm9wID0gJy13ZWJraXQtJyArIHByb3A7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlW3Byb3BdID0gdmFsICsgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gJycgOiAncHgnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF0cml4KGVsLCBzZWxmT25seSkge1xuICB2YXIgYXBwbGllZFRyYW5zZm9ybXMgPSAnJztcblxuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgIGFwcGxpZWRUcmFuc2Zvcm1zID0gZWw7XG4gIH0gZWxzZSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRyYW5zZm9ybSA9IGNzcyhlbCwgJ3RyYW5zZm9ybScpO1xuXG4gICAgICBpZiAodHJhbnNmb3JtICYmIHRyYW5zZm9ybSAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGFwcGxpZWRUcmFuc2Zvcm1zID0gdHJhbnNmb3JtICsgJyAnICsgYXBwbGllZFRyYW5zZm9ybXM7XG4gICAgICB9XG4gICAgICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cbiAgICB9IHdoaWxlICghc2VsZk9ubHkgJiYgKGVsID0gZWwucGFyZW50Tm9kZSkpO1xuICB9XG5cbiAgdmFyIG1hdHJpeEZuID0gd2luZG93LkRPTU1hdHJpeCB8fCB3aW5kb3cuV2ViS2l0Q1NTTWF0cml4IHx8IHdpbmRvdy5DU1NNYXRyaXggfHwgd2luZG93Lk1TQ1NTTWF0cml4O1xuICAvKmpzaGludCAtVzA1NiAqL1xuXG4gIHJldHVybiBtYXRyaXhGbiAmJiBuZXcgbWF0cml4Rm4oYXBwbGllZFRyYW5zZm9ybXMpO1xufVxuXG5mdW5jdGlvbiBmaW5kKGN0eCwgdGFnTmFtZSwgaXRlcmF0b3IpIHtcbiAgaWYgKGN0eCkge1xuICAgIHZhciBsaXN0ID0gY3R4LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgbiA9IGxpc3QubGVuZ3RoO1xuXG4gICAgaWYgKGl0ZXJhdG9yKSB7XG4gICAgICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgICAgICBpdGVyYXRvcihsaXN0W2ldLCBpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIHJldHVybiBbXTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsaW5nRWxlbWVudCgpIHtcbiAgdmFyIHNjcm9sbGluZ0VsZW1lbnQgPSBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50O1xuXG4gIGlmIChzY3JvbGxpbmdFbGVtZW50KSB7XG4gICAgcmV0dXJuIHNjcm9sbGluZ0VsZW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBcImJvdW5kaW5nIGNsaWVudCByZWN0XCIgb2YgZ2l2ZW4gZWxlbWVudFxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsICAgICAgICAgICAgICAgICAgICAgICBUaGUgZWxlbWVudCB3aG9zZSBib3VuZGluZ0NsaWVudFJlY3QgaXMgd2FudGVkXG4gKiBAcGFyYW0gIHtbQm9vbGVhbl19IHJlbGF0aXZlVG9Db250YWluaW5nQmxvY2sgIFdoZXRoZXIgdGhlIHJlY3Qgc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBjb250YWluaW5nIGJsb2NrIG9mIChpbmNsdWRpbmcpIHRoZSBjb250YWluZXJcbiAqIEBwYXJhbSAge1tCb29sZWFuXX0gcmVsYXRpdmVUb05vblN0YXRpY1BhcmVudCAgV2hldGhlciB0aGUgcmVjdCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIHJlbGF0aXZlIHBhcmVudCBvZiAoaW5jbHVkaW5nKSB0aGUgY29udGFpZW5yXG4gKiBAcGFyYW0gIHtbQm9vbGVhbl19IHVuZG9TY2FsZSAgICAgICAgICAgICAgICAgIFdoZXRoZXIgdGhlIGNvbnRhaW5lcidzIHNjYWxlKCkgc2hvdWxkIGJlIHVuZG9uZVxuICogQHBhcmFtICB7W0hUTUxFbGVtZW50XX0gY29udGFpbmVyICAgICAgICAgICAgICBUaGUgcGFyZW50IHRoZSBlbGVtZW50IHdpbGwgYmUgcGxhY2VkIGluXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBib3VuZGluZ0NsaWVudFJlY3Qgb2YgZWwsIHdpdGggc3BlY2lmaWVkIGFkanVzdG1lbnRzXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRSZWN0KGVsLCByZWxhdGl2ZVRvQ29udGFpbmluZ0Jsb2NrLCByZWxhdGl2ZVRvTm9uU3RhdGljUGFyZW50LCB1bmRvU2NhbGUsIGNvbnRhaW5lcikge1xuICBpZiAoIWVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCAmJiBlbCAhPT0gd2luZG93KSByZXR1cm47XG4gIHZhciBlbFJlY3QsIHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCwgaGVpZ2h0LCB3aWR0aDtcblxuICBpZiAoZWwgIT09IHdpbmRvdyAmJiBlbC5wYXJlbnROb2RlICYmIGVsICE9PSBnZXRXaW5kb3dTY3JvbGxpbmdFbGVtZW50KCkpIHtcbiAgICBlbFJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0b3AgPSBlbFJlY3QudG9wO1xuICAgIGxlZnQgPSBlbFJlY3QubGVmdDtcbiAgICBib3R0b20gPSBlbFJlY3QuYm90dG9tO1xuICAgIHJpZ2h0ID0gZWxSZWN0LnJpZ2h0O1xuICAgIGhlaWdodCA9IGVsUmVjdC5oZWlnaHQ7XG4gICAgd2lkdGggPSBlbFJlY3Qud2lkdGg7XG4gIH0gZWxzZSB7XG4gICAgdG9wID0gMDtcbiAgICBsZWZ0ID0gMDtcbiAgICBib3R0b20gPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgcmlnaHQgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgfVxuXG4gIGlmICgocmVsYXRpdmVUb0NvbnRhaW5pbmdCbG9jayB8fCByZWxhdGl2ZVRvTm9uU3RhdGljUGFyZW50KSAmJiBlbCAhPT0gd2luZG93KSB7XG4gICAgLy8gQWRqdXN0IGZvciB0cmFuc2xhdGUoKVxuICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBlbC5wYXJlbnROb2RlOyAvLyBzb2x2ZXMgIzExMjMgKHNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM3OTUzODA2LzYwODgzMTIpXG4gICAgLy8gTm90IG5lZWRlZCBvbiA8PSBJRTExXG5cbiAgICBpZiAoIUlFMTFPckxlc3MpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICYmIChjc3MoY29udGFpbmVyLCAndHJhbnNmb3JtJykgIT09ICdub25lJyB8fCByZWxhdGl2ZVRvTm9uU3RhdGljUGFyZW50ICYmIGNzcyhjb250YWluZXIsICdwb3NpdGlvbicpICE9PSAnc3RhdGljJykpIHtcbiAgICAgICAgICB2YXIgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgLy8gU2V0IHJlbGF0aXZlIHRvIGVkZ2VzIG9mIHBhZGRpbmcgYm94IG9mIGNvbnRhaW5lclxuXG4gICAgICAgICAgdG9wIC09IGNvbnRhaW5lclJlY3QudG9wICsgcGFyc2VJbnQoY3NzKGNvbnRhaW5lciwgJ2JvcmRlci10b3Atd2lkdGgnKSk7XG4gICAgICAgICAgbGVmdCAtPSBjb250YWluZXJSZWN0LmxlZnQgKyBwYXJzZUludChjc3MoY29udGFpbmVyLCAnYm9yZGVyLWxlZnQtd2lkdGgnKSk7XG4gICAgICAgICAgYm90dG9tID0gdG9wICsgZWxSZWN0LmhlaWdodDtcbiAgICAgICAgICByaWdodCA9IGxlZnQgKyBlbFJlY3Qud2lkdGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLyoganNoaW50IGJvc3M6dHJ1ZSAqL1xuXG4gICAgICB9IHdoaWxlIChjb250YWluZXIgPSBjb250YWluZXIucGFyZW50Tm9kZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHVuZG9TY2FsZSAmJiBlbCAhPT0gd2luZG93KSB7XG4gICAgLy8gQWRqdXN0IGZvciBzY2FsZSgpXG4gICAgdmFyIGVsTWF0cml4ID0gbWF0cml4KGNvbnRhaW5lciB8fCBlbCksXG4gICAgICAgIHNjYWxlWCA9IGVsTWF0cml4ICYmIGVsTWF0cml4LmEsXG4gICAgICAgIHNjYWxlWSA9IGVsTWF0cml4ICYmIGVsTWF0cml4LmQ7XG5cbiAgICBpZiAoZWxNYXRyaXgpIHtcbiAgICAgIHRvcCAvPSBzY2FsZVk7XG4gICAgICBsZWZ0IC89IHNjYWxlWDtcbiAgICAgIHdpZHRoIC89IHNjYWxlWDtcbiAgICAgIGhlaWdodCAvPSBzY2FsZVk7XG4gICAgICBib3R0b20gPSB0b3AgKyBoZWlnaHQ7XG4gICAgICByaWdodCA9IGxlZnQgKyB3aWR0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogdG9wLFxuICAgIGxlZnQ6IGxlZnQsXG4gICAgYm90dG9tOiBib3R0b20sXG4gICAgcmlnaHQ6IHJpZ2h0LFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufVxuLyoqXG4gKiBDaGVja3MgaWYgYSBzaWRlIG9mIGFuIGVsZW1lbnQgaXMgc2Nyb2xsZWQgcGFzdCBhIHNpZGUgb2YgaXRzIHBhcmVudHNcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgZWwgICAgICAgICAgIFRoZSBlbGVtZW50IHdobydzIHNpZGUgYmVpbmcgc2Nyb2xsZWQgb3V0IG9mIHZpZXcgaXMgaW4gcXVlc3Rpb25cbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgZWxTaWRlICAgICAgIFNpZGUgb2YgdGhlIGVsZW1lbnQgaW4gcXVlc3Rpb24gKCd0b3AnLCAnbGVmdCcsICdyaWdodCcsICdib3R0b20nKVxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICBwYXJlbnRTaWRlICAgU2lkZSBvZiB0aGUgcGFyZW50IGluIHF1ZXN0aW9uICgndG9wJywgJ2xlZnQnLCAncmlnaHQnLCAnYm90dG9tJylcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAgICAgICAgICAgICAgIFRoZSBwYXJlbnQgc2Nyb2xsIGVsZW1lbnQgdGhhdCB0aGUgZWwncyBzaWRlIGlzIHNjcm9sbGVkIHBhc3QsIG9yIG51bGwgaWYgdGhlcmUgaXMgbm8gc3VjaCBlbGVtZW50XG4gKi9cblxuXG5mdW5jdGlvbiBpc1Njcm9sbGVkUGFzdChlbCwgZWxTaWRlLCBwYXJlbnRTaWRlKSB7XG4gIHZhciBwYXJlbnQgPSBnZXRQYXJlbnRBdXRvU2Nyb2xsRWxlbWVudChlbCwgdHJ1ZSksXG4gICAgICBlbFNpZGVWYWwgPSBnZXRSZWN0KGVsKVtlbFNpZGVdO1xuICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cbiAgd2hpbGUgKHBhcmVudCkge1xuICAgIHZhciBwYXJlbnRTaWRlVmFsID0gZ2V0UmVjdChwYXJlbnQpW3BhcmVudFNpZGVdLFxuICAgICAgICB2aXNpYmxlID0gdm9pZCAwO1xuXG4gICAgaWYgKHBhcmVudFNpZGUgPT09ICd0b3AnIHx8IHBhcmVudFNpZGUgPT09ICdsZWZ0Jykge1xuICAgICAgdmlzaWJsZSA9IGVsU2lkZVZhbCA+PSBwYXJlbnRTaWRlVmFsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aXNpYmxlID0gZWxTaWRlVmFsIDw9IHBhcmVudFNpZGVWYWw7XG4gICAgfVxuXG4gICAgaWYgKCF2aXNpYmxlKSByZXR1cm4gcGFyZW50O1xuICAgIGlmIChwYXJlbnQgPT09IGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKSkgYnJlYWs7XG4gICAgcGFyZW50ID0gZ2V0UGFyZW50QXV0b1Njcm9sbEVsZW1lbnQocGFyZW50LCBmYWxzZSk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIEdldHMgbnRoIGNoaWxkIG9mIGVsLCBpZ25vcmluZyBoaWRkZW4gY2hpbGRyZW4sIHNvcnRhYmxlJ3MgZWxlbWVudHMgKGRvZXMgbm90IGlnbm9yZSBjbG9uZSBpZiBpdCdzIHZpc2libGUpXG4gKiBhbmQgbm9uLWRyYWdnYWJsZSBlbGVtZW50c1xuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsICAgICAgIFRoZSBwYXJlbnQgZWxlbWVudFxuICogQHBhcmFtICB7TnVtYmVyfSBjaGlsZE51bSAgICAgIFRoZSBpbmRleCBvZiB0aGUgY2hpbGRcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyAgICAgICBQYXJlbnQgU29ydGFibGUncyBvcHRpb25zXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gICAgICAgICAgVGhlIGNoaWxkIGF0IGluZGV4IGNoaWxkTnVtLCBvciBudWxsIGlmIG5vdCBmb3VuZFxuICovXG5cblxuZnVuY3Rpb24gZ2V0Q2hpbGQoZWwsIGNoaWxkTnVtLCBvcHRpb25zLCBpbmNsdWRlRHJhZ0VsKSB7XG4gIHZhciBjdXJyZW50Q2hpbGQgPSAwLFxuICAgICAgaSA9IDAsXG4gICAgICBjaGlsZHJlbiA9IGVsLmNoaWxkcmVuO1xuXG4gIHdoaWxlIChpIDwgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgaWYgKGNoaWxkcmVuW2ldLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJyAmJiBjaGlsZHJlbltpXSAhPT0gU29ydGFibGUuZ2hvc3QgJiYgKGluY2x1ZGVEcmFnRWwgfHwgY2hpbGRyZW5baV0gIT09IFNvcnRhYmxlLmRyYWdnZWQpICYmIGNsb3Nlc3QoY2hpbGRyZW5baV0sIG9wdGlvbnMuZHJhZ2dhYmxlLCBlbCwgZmFsc2UpKSB7XG4gICAgICBpZiAoY3VycmVudENoaWxkID09PSBjaGlsZE51bSkge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW5baV07XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRDaGlsZCsrO1xuICAgIH1cblxuICAgIGkrKztcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuLyoqXG4gKiBHZXRzIHRoZSBsYXN0IGNoaWxkIGluIHRoZSBlbCwgaWdub3JpbmcgZ2hvc3RFbCBvciBpbnZpc2libGUgZWxlbWVudHMgKGNsb25lcylcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICAgICBQYXJlbnQgZWxlbWVudFxuICogQHBhcmFtICB7c2VsZWN0b3J9IHNlbGVjdG9yICAgIEFueSBvdGhlciBlbGVtZW50cyB0aGF0IHNob3VsZCBiZSBpZ25vcmVkXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gICAgICAgICAgVGhlIGxhc3QgY2hpbGQsIGlnbm9yaW5nIGdob3N0RWxcbiAqL1xuXG5cbmZ1bmN0aW9uIGxhc3RDaGlsZChlbCwgc2VsZWN0b3IpIHtcbiAgdmFyIGxhc3QgPSBlbC5sYXN0RWxlbWVudENoaWxkO1xuXG4gIHdoaWxlIChsYXN0ICYmIChsYXN0ID09PSBTb3J0YWJsZS5naG9zdCB8fCBjc3MobGFzdCwgJ2Rpc3BsYXknKSA9PT0gJ25vbmUnIHx8IHNlbGVjdG9yICYmICFtYXRjaGVzKGxhc3QsIHNlbGVjdG9yKSkpIHtcbiAgICBsYXN0ID0gbGFzdC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIGxhc3QgfHwgbnVsbDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggb2YgYW4gZWxlbWVudCB3aXRoaW4gaXRzIHBhcmVudCBmb3IgYSBzZWxlY3RlZCBzZXQgb2ZcbiAqIGVsZW1lbnRzXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxcbiAqIEBwYXJhbSAge3NlbGVjdG9yfSBzZWxlY3RvclxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5cblxuZnVuY3Rpb24gaW5kZXgoZWwsIHNlbGVjdG9yKSB7XG4gIHZhciBpbmRleCA9IDA7XG5cbiAgaWYgKCFlbCB8fCAhZWwucGFyZW50Tm9kZSkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cblxuICB3aGlsZSAoZWwgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgaWYgKGVsLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdURU1QTEFURScgJiYgZWwgIT09IFNvcnRhYmxlLmNsb25lICYmICghc2VsZWN0b3IgfHwgbWF0Y2hlcyhlbCwgc2VsZWN0b3IpKSkge1xuICAgICAgaW5kZXgrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIHNjcm9sbCBvZmZzZXQgb2YgdGhlIGdpdmVuIGVsZW1lbnQsIGFkZGVkIHdpdGggYWxsIHRoZSBzY3JvbGwgb2Zmc2V0cyBvZiBwYXJlbnQgZWxlbWVudHMuXG4gKiBUaGUgdmFsdWUgaXMgcmV0dXJuZWQgaW4gcmVhbCBwaXhlbHMuXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge0FycmF5fSAgICAgICAgICAgICBPZmZzZXRzIGluIHRoZSBmb3JtYXQgb2YgW2xlZnQsIHRvcF1cbiAqL1xuXG5cbmZ1bmN0aW9uIGdldFJlbGF0aXZlU2Nyb2xsT2Zmc2V0KGVsKSB7XG4gIHZhciBvZmZzZXRMZWZ0ID0gMCxcbiAgICAgIG9mZnNldFRvcCA9IDAsXG4gICAgICB3aW5TY3JvbGxlciA9IGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKTtcblxuICBpZiAoZWwpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgZWxNYXRyaXggPSBtYXRyaXgoZWwpLFxuICAgICAgICAgIHNjYWxlWCA9IGVsTWF0cml4LmEsXG4gICAgICAgICAgc2NhbGVZID0gZWxNYXRyaXguZDtcbiAgICAgIG9mZnNldExlZnQgKz0gZWwuc2Nyb2xsTGVmdCAqIHNjYWxlWDtcbiAgICAgIG9mZnNldFRvcCArPSBlbC5zY3JvbGxUb3AgKiBzY2FsZVk7XG4gICAgfSB3aGlsZSAoZWwgIT09IHdpblNjcm9sbGVyICYmIChlbCA9IGVsLnBhcmVudE5vZGUpKTtcbiAgfVxuXG4gIHJldHVybiBbb2Zmc2V0TGVmdCwgb2Zmc2V0VG9wXTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG9iamVjdCB3aXRoaW4gdGhlIGdpdmVuIGFycmF5XG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyICAgQXJyYXkgdGhhdCBtYXkgb3IgbWF5IG5vdCBob2xkIHRoZSBvYmplY3RcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqICBBbiBvYmplY3QgdGhhdCBoYXMgYSBrZXktdmFsdWUgcGFpciB1bmlxdWUgdG8gYW5kIGlkZW50aWNhbCB0byBhIGtleS12YWx1ZSBwYWlyIGluIHRoZSBvYmplY3QgeW91IHdhbnQgdG8gZmluZFxuICogQHJldHVybiB7TnVtYmVyfSAgICAgIFRoZSBpbmRleCBvZiB0aGUgb2JqZWN0IGluIHRoZSBhcnJheSwgb3IgLTFcbiAqL1xuXG5cbmZ1bmN0aW9uIGluZGV4T2ZPYmplY3QoYXJyLCBvYmopIHtcbiAgZm9yICh2YXIgaSBpbiBhcnIpIHtcbiAgICBpZiAoIWFyci5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkgJiYgb2JqW2tleV0gPT09IGFycltpXVtrZXldKSByZXR1cm4gTnVtYmVyKGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyZW50QXV0b1Njcm9sbEVsZW1lbnQoZWwsIGluY2x1ZGVTZWxmKSB7XG4gIC8vIHNraXAgdG8gd2luZG93XG4gIGlmICghZWwgfHwgIWVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkgcmV0dXJuIGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKTtcbiAgdmFyIGVsZW0gPSBlbDtcbiAgdmFyIGdvdFNlbGYgPSBmYWxzZTtcblxuICBkbyB7XG4gICAgLy8gd2UgZG9uJ3QgbmVlZCB0byBnZXQgZWxlbSBjc3MgaWYgaXQgaXNuJ3QgZXZlbiBvdmVyZmxvd2luZyBpbiB0aGUgZmlyc3QgcGxhY2UgKHBlcmZvcm1hbmNlKVxuICAgIGlmIChlbGVtLmNsaWVudFdpZHRoIDwgZWxlbS5zY3JvbGxXaWR0aCB8fCBlbGVtLmNsaWVudEhlaWdodCA8IGVsZW0uc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICB2YXIgZWxlbUNTUyA9IGNzcyhlbGVtKTtcblxuICAgICAgaWYgKGVsZW0uY2xpZW50V2lkdGggPCBlbGVtLnNjcm9sbFdpZHRoICYmIChlbGVtQ1NTLm92ZXJmbG93WCA9PSAnYXV0bycgfHwgZWxlbUNTUy5vdmVyZmxvd1ggPT0gJ3Njcm9sbCcpIHx8IGVsZW0uY2xpZW50SGVpZ2h0IDwgZWxlbS5zY3JvbGxIZWlnaHQgJiYgKGVsZW1DU1Mub3ZlcmZsb3dZID09ICdhdXRvJyB8fCBlbGVtQ1NTLm92ZXJmbG93WSA9PSAnc2Nyb2xsJykpIHtcbiAgICAgICAgaWYgKCFlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCB8fCBlbGVtID09PSBkb2N1bWVudC5ib2R5KSByZXR1cm4gZ2V0V2luZG93U2Nyb2xsaW5nRWxlbWVudCgpO1xuICAgICAgICBpZiAoZ290U2VsZiB8fCBpbmNsdWRlU2VsZikgcmV0dXJuIGVsZW07XG4gICAgICAgIGdvdFNlbGYgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG5cbiAgfSB3aGlsZSAoZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSk7XG5cbiAgcmV0dXJuIGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKGRzdCwgc3JjKSB7XG4gIGlmIChkc3QgJiYgc3JjKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgICAgaWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGRzdFtrZXldID0gc3JjW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRzdDtcbn1cblxuZnVuY3Rpb24gaXNSZWN0RXF1YWwocmVjdDEsIHJlY3QyKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKHJlY3QxLnRvcCkgPT09IE1hdGgucm91bmQocmVjdDIudG9wKSAmJiBNYXRoLnJvdW5kKHJlY3QxLmxlZnQpID09PSBNYXRoLnJvdW5kKHJlY3QyLmxlZnQpICYmIE1hdGgucm91bmQocmVjdDEuaGVpZ2h0KSA9PT0gTWF0aC5yb3VuZChyZWN0Mi5oZWlnaHQpICYmIE1hdGgucm91bmQocmVjdDEud2lkdGgpID09PSBNYXRoLnJvdW5kKHJlY3QyLndpZHRoKTtcbn1cblxudmFyIF90aHJvdHRsZVRpbWVvdXQ7XG5cbmZ1bmN0aW9uIHRocm90dGxlKGNhbGxiYWNrLCBtcykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghX3Rocm90dGxlVGltZW91dCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbChfdGhpcywgYXJnc1swXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjay5hcHBseShfdGhpcywgYXJncyk7XG4gICAgICB9XG5cbiAgICAgIF90aHJvdHRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3Rocm90dGxlVGltZW91dCA9IHZvaWQgMDtcbiAgICAgIH0sIG1zKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFRocm90dGxlKCkge1xuICBjbGVhclRpbWVvdXQoX3Rocm90dGxlVGltZW91dCk7XG4gIF90aHJvdHRsZVRpbWVvdXQgPSB2b2lkIDA7XG59XG5cbmZ1bmN0aW9uIHNjcm9sbEJ5KGVsLCB4LCB5KSB7XG4gIGVsLnNjcm9sbExlZnQgKz0geDtcbiAgZWwuc2Nyb2xsVG9wICs9IHk7XG59XG5cbmZ1bmN0aW9uIGNsb25lKGVsKSB7XG4gIHZhciBQb2x5bWVyID0gd2luZG93LlBvbHltZXI7XG4gIHZhciAkID0gd2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG87XG5cbiAgaWYgKFBvbHltZXIgJiYgUG9seW1lci5kb20pIHtcbiAgICByZXR1cm4gUG9seW1lci5kb20oZWwpLmNsb25lTm9kZSh0cnVlKTtcbiAgfSBlbHNlIGlmICgkKSB7XG4gICAgcmV0dXJuICQoZWwpLmNsb25lKHRydWUpWzBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cbn1cblxudmFyIGV4cGFuZG8gPSAnU29ydGFibGUnICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbmZ1bmN0aW9uIEFuaW1hdGlvblN0YXRlTWFuYWdlcigpIHtcbiAgdmFyIGFuaW1hdGlvblN0YXRlcyA9IFtdLFxuICAgICAgYW5pbWF0aW9uQ2FsbGJhY2tJZDtcbiAgcmV0dXJuIHtcbiAgICBjYXB0dXJlQW5pbWF0aW9uU3RhdGU6IGZ1bmN0aW9uIGNhcHR1cmVBbmltYXRpb25TdGF0ZSgpIHtcbiAgICAgIGFuaW1hdGlvblN0YXRlcyA9IFtdO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSByZXR1cm47XG4gICAgICB2YXIgY2hpbGRyZW4gPSBbXS5zbGljZS5jYWxsKHRoaXMuZWwuY2hpbGRyZW4pO1xuICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgaWYgKGNzcyhjaGlsZCwgJ2Rpc3BsYXknKSA9PT0gJ25vbmUnIHx8IGNoaWxkID09PSBTb3J0YWJsZS5naG9zdCkgcmV0dXJuO1xuICAgICAgICBhbmltYXRpb25TdGF0ZXMucHVzaCh7XG4gICAgICAgICAgdGFyZ2V0OiBjaGlsZCxcbiAgICAgICAgICByZWN0OiBnZXRSZWN0KGNoaWxkKVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZnJvbVJlY3QgPSBfb2JqZWN0U3ByZWFkMih7fSwgYW5pbWF0aW9uU3RhdGVzW2FuaW1hdGlvblN0YXRlcy5sZW5ndGggLSAxXS5yZWN0KTsgLy8gSWYgYW5pbWF0aW5nOiBjb21wZW5zYXRlIGZvciBjdXJyZW50IGFuaW1hdGlvblxuXG5cbiAgICAgICAgaWYgKGNoaWxkLnRoaXNBbmltYXRpb25EdXJhdGlvbikge1xuICAgICAgICAgIHZhciBjaGlsZE1hdHJpeCA9IG1hdHJpeChjaGlsZCwgdHJ1ZSk7XG5cbiAgICAgICAgICBpZiAoY2hpbGRNYXRyaXgpIHtcbiAgICAgICAgICAgIGZyb21SZWN0LnRvcCAtPSBjaGlsZE1hdHJpeC5mO1xuICAgICAgICAgICAgZnJvbVJlY3QubGVmdCAtPSBjaGlsZE1hdHJpeC5lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNoaWxkLmZyb21SZWN0ID0gZnJvbVJlY3Q7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFkZEFuaW1hdGlvblN0YXRlOiBmdW5jdGlvbiBhZGRBbmltYXRpb25TdGF0ZShzdGF0ZSkge1xuICAgICAgYW5pbWF0aW9uU3RhdGVzLnB1c2goc3RhdGUpO1xuICAgIH0sXG4gICAgcmVtb3ZlQW5pbWF0aW9uU3RhdGU6IGZ1bmN0aW9uIHJlbW92ZUFuaW1hdGlvblN0YXRlKHRhcmdldCkge1xuICAgICAgYW5pbWF0aW9uU3RhdGVzLnNwbGljZShpbmRleE9mT2JqZWN0KGFuaW1hdGlvblN0YXRlcywge1xuICAgICAgICB0YXJnZXQ6IHRhcmdldFxuICAgICAgfSksIDEpO1xuICAgIH0sXG4gICAgYW5pbWF0ZUFsbDogZnVuY3Rpb24gYW5pbWF0ZUFsbChjYWxsYmFjaykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChhbmltYXRpb25DYWxsYmFja0lkKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgYW5pbWF0aW5nID0gZmFsc2UsXG4gICAgICAgICAgYW5pbWF0aW9uVGltZSA9IDA7XG4gICAgICBhbmltYXRpb25TdGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIHRpbWUgPSAwLFxuICAgICAgICAgICAgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0LFxuICAgICAgICAgICAgZnJvbVJlY3QgPSB0YXJnZXQuZnJvbVJlY3QsXG4gICAgICAgICAgICB0b1JlY3QgPSBnZXRSZWN0KHRhcmdldCksXG4gICAgICAgICAgICBwcmV2RnJvbVJlY3QgPSB0YXJnZXQucHJldkZyb21SZWN0LFxuICAgICAgICAgICAgcHJldlRvUmVjdCA9IHRhcmdldC5wcmV2VG9SZWN0LFxuICAgICAgICAgICAgYW5pbWF0aW5nUmVjdCA9IHN0YXRlLnJlY3QsXG4gICAgICAgICAgICB0YXJnZXRNYXRyaXggPSBtYXRyaXgodGFyZ2V0LCB0cnVlKTtcblxuICAgICAgICBpZiAodGFyZ2V0TWF0cml4KSB7XG4gICAgICAgICAgLy8gQ29tcGVuc2F0ZSBmb3IgY3VycmVudCBhbmltYXRpb25cbiAgICAgICAgICB0b1JlY3QudG9wIC09IHRhcmdldE1hdHJpeC5mO1xuICAgICAgICAgIHRvUmVjdC5sZWZ0IC09IHRhcmdldE1hdHJpeC5lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0LnRvUmVjdCA9IHRvUmVjdDtcblxuICAgICAgICBpZiAodGFyZ2V0LnRoaXNBbmltYXRpb25EdXJhdGlvbikge1xuICAgICAgICAgIC8vIENvdWxkIGFsc28gY2hlY2sgaWYgYW5pbWF0aW5nUmVjdCBpcyBiZXR3ZWVuIGZyb21SZWN0IGFuZCB0b1JlY3RcbiAgICAgICAgICBpZiAoaXNSZWN0RXF1YWwocHJldkZyb21SZWN0LCB0b1JlY3QpICYmICFpc1JlY3RFcXVhbChmcm9tUmVjdCwgdG9SZWN0KSAmJiAvLyBNYWtlIHN1cmUgYW5pbWF0aW5nUmVjdCBpcyBvbiBsaW5lIGJldHdlZW4gdG9SZWN0ICYgZnJvbVJlY3RcbiAgICAgICAgICAoYW5pbWF0aW5nUmVjdC50b3AgLSB0b1JlY3QudG9wKSAvIChhbmltYXRpbmdSZWN0LmxlZnQgLSB0b1JlY3QubGVmdCkgPT09IChmcm9tUmVjdC50b3AgLSB0b1JlY3QudG9wKSAvIChmcm9tUmVjdC5sZWZ0IC0gdG9SZWN0LmxlZnQpKSB7XG4gICAgICAgICAgICAvLyBJZiByZXR1cm5pbmcgdG8gc2FtZSBwbGFjZSBhcyBzdGFydGVkIGZyb20gYW5pbWF0aW9uIGFuZCBvbiBzYW1lIGF4aXNcbiAgICAgICAgICAgIHRpbWUgPSBjYWxjdWxhdGVSZWFsVGltZShhbmltYXRpbmdSZWN0LCBwcmV2RnJvbVJlY3QsIHByZXZUb1JlY3QsIF90aGlzLm9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBpZiBmcm9tUmVjdCAhPSB0b1JlY3Q6IGFuaW1hdGVcblxuXG4gICAgICAgIGlmICghaXNSZWN0RXF1YWwodG9SZWN0LCBmcm9tUmVjdCkpIHtcbiAgICAgICAgICB0YXJnZXQucHJldkZyb21SZWN0ID0gZnJvbVJlY3Q7XG4gICAgICAgICAgdGFyZ2V0LnByZXZUb1JlY3QgPSB0b1JlY3Q7XG5cbiAgICAgICAgICBpZiAoIXRpbWUpIHtcbiAgICAgICAgICAgIHRpbWUgPSBfdGhpcy5vcHRpb25zLmFuaW1hdGlvbjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfdGhpcy5hbmltYXRlKHRhcmdldCwgYW5pbWF0aW5nUmVjdCwgdG9SZWN0LCB0aW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lKSB7XG4gICAgICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICBhbmltYXRpb25UaW1lID0gTWF0aC5tYXgoYW5pbWF0aW9uVGltZSwgdGltZSk7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRhcmdldC5hbmltYXRpb25SZXNldFRpbWVyKTtcbiAgICAgICAgICB0YXJnZXQuYW5pbWF0aW9uUmVzZXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGFyZ2V0LmFuaW1hdGlvblRpbWUgPSAwO1xuICAgICAgICAgICAgdGFyZ2V0LnByZXZGcm9tUmVjdCA9IG51bGw7XG4gICAgICAgICAgICB0YXJnZXQuZnJvbVJlY3QgPSBudWxsO1xuICAgICAgICAgICAgdGFyZ2V0LnByZXZUb1JlY3QgPSBudWxsO1xuICAgICAgICAgICAgdGFyZ2V0LnRoaXNBbmltYXRpb25EdXJhdGlvbiA9IG51bGw7XG4gICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgICAgdGFyZ2V0LnRoaXNBbmltYXRpb25EdXJhdGlvbiA9IHRpbWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY2xlYXJUaW1lb3V0KGFuaW1hdGlvbkNhbGxiYWNrSWQpO1xuXG4gICAgICBpZiAoIWFuaW1hdGluZykge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5pbWF0aW9uQ2FsbGJhY2tJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG4gICAgICAgIH0sIGFuaW1hdGlvblRpbWUpO1xuICAgICAgfVxuXG4gICAgICBhbmltYXRpb25TdGF0ZXMgPSBbXTtcbiAgICB9LFxuICAgIGFuaW1hdGU6IGZ1bmN0aW9uIGFuaW1hdGUodGFyZ2V0LCBjdXJyZW50UmVjdCwgdG9SZWN0LCBkdXJhdGlvbikge1xuICAgICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICAgIGNzcyh0YXJnZXQsICd0cmFuc2l0aW9uJywgJycpO1xuICAgICAgICBjc3ModGFyZ2V0LCAndHJhbnNmb3JtJywgJycpO1xuICAgICAgICB2YXIgZWxNYXRyaXggPSBtYXRyaXgodGhpcy5lbCksXG4gICAgICAgICAgICBzY2FsZVggPSBlbE1hdHJpeCAmJiBlbE1hdHJpeC5hLFxuICAgICAgICAgICAgc2NhbGVZID0gZWxNYXRyaXggJiYgZWxNYXRyaXguZCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVggPSAoY3VycmVudFJlY3QubGVmdCAtIHRvUmVjdC5sZWZ0KSAvIChzY2FsZVggfHwgMSksXG4gICAgICAgICAgICB0cmFuc2xhdGVZID0gKGN1cnJlbnRSZWN0LnRvcCAtIHRvUmVjdC50b3ApIC8gKHNjYWxlWSB8fCAxKTtcbiAgICAgICAgdGFyZ2V0LmFuaW1hdGluZ1ggPSAhIXRyYW5zbGF0ZVg7XG4gICAgICAgIHRhcmdldC5hbmltYXRpbmdZID0gISF0cmFuc2xhdGVZO1xuICAgICAgICBjc3ModGFyZ2V0LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyB0cmFuc2xhdGVYICsgJ3B4LCcgKyB0cmFuc2xhdGVZICsgJ3B4LDApJyk7XG4gICAgICAgIHRoaXMuZm9yUmVwYWludER1bW15ID0gcmVwYWludCh0YXJnZXQpOyAvLyByZXBhaW50XG5cbiAgICAgICAgY3NzKHRhcmdldCwgJ3RyYW5zaXRpb24nLCAndHJhbnNmb3JtICcgKyBkdXJhdGlvbiArICdtcycgKyAodGhpcy5vcHRpb25zLmVhc2luZyA/ICcgJyArIHRoaXMub3B0aW9ucy5lYXNpbmcgOiAnJykpO1xuICAgICAgICBjc3ModGFyZ2V0LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xuICAgICAgICB0eXBlb2YgdGFyZ2V0LmFuaW1hdGVkID09PSAnbnVtYmVyJyAmJiBjbGVhclRpbWVvdXQodGFyZ2V0LmFuaW1hdGVkKTtcbiAgICAgICAgdGFyZ2V0LmFuaW1hdGVkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY3NzKHRhcmdldCwgJ3RyYW5zaXRpb24nLCAnJyk7XG4gICAgICAgICAgY3NzKHRhcmdldCwgJ3RyYW5zZm9ybScsICcnKTtcbiAgICAgICAgICB0YXJnZXQuYW5pbWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB0YXJnZXQuYW5pbWF0aW5nWCA9IGZhbHNlO1xuICAgICAgICAgIHRhcmdldC5hbmltYXRpbmdZID0gZmFsc2U7XG4gICAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlcGFpbnQodGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQub2Zmc2V0V2lkdGg7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVJlYWxUaW1lKGFuaW1hdGluZ1JlY3QsIGZyb21SZWN0LCB0b1JlY3QsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhmcm9tUmVjdC50b3AgLSBhbmltYXRpbmdSZWN0LnRvcCwgMikgKyBNYXRoLnBvdyhmcm9tUmVjdC5sZWZ0IC0gYW5pbWF0aW5nUmVjdC5sZWZ0LCAyKSkgLyBNYXRoLnNxcnQoTWF0aC5wb3coZnJvbVJlY3QudG9wIC0gdG9SZWN0LnRvcCwgMikgKyBNYXRoLnBvdyhmcm9tUmVjdC5sZWZ0IC0gdG9SZWN0LmxlZnQsIDIpKSAqIG9wdGlvbnMuYW5pbWF0aW9uO1xufVxuXG52YXIgcGx1Z2lucyA9IFtdO1xudmFyIGRlZmF1bHRzID0ge1xuICBpbml0aWFsaXplQnlEZWZhdWx0OiB0cnVlXG59O1xudmFyIFBsdWdpbk1hbmFnZXIgPSB7XG4gIG1vdW50OiBmdW5jdGlvbiBtb3VudChwbHVnaW4pIHtcbiAgICAvLyBTZXQgZGVmYXVsdCBzdGF0aWMgcHJvcGVydGllc1xuICAgIGZvciAodmFyIG9wdGlvbiBpbiBkZWZhdWx0cykge1xuICAgICAgaWYgKGRlZmF1bHRzLmhhc093blByb3BlcnR5KG9wdGlvbikgJiYgIShvcHRpb24gaW4gcGx1Z2luKSkge1xuICAgICAgICBwbHVnaW5bb3B0aW9uXSA9IGRlZmF1bHRzW29wdGlvbl07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICBpZiAocC5wbHVnaW5OYW1lID09PSBwbHVnaW4ucGx1Z2luTmFtZSkge1xuICAgICAgICB0aHJvdyBcIlNvcnRhYmxlOiBDYW5ub3QgbW91bnQgcGx1Z2luIFwiLmNvbmNhdChwbHVnaW4ucGx1Z2luTmFtZSwgXCIgbW9yZSB0aGFuIG9uY2VcIik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcGx1Z2lucy5wdXNoKHBsdWdpbik7XG4gIH0sXG4gIHBsdWdpbkV2ZW50OiBmdW5jdGlvbiBwbHVnaW5FdmVudChldmVudE5hbWUsIHNvcnRhYmxlLCBldnQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5ldmVudENhbmNlbGVkID0gZmFsc2U7XG5cbiAgICBldnQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuZXZlbnRDYW5jZWxlZCA9IHRydWU7XG4gICAgfTtcblxuICAgIHZhciBldmVudE5hbWVHbG9iYWwgPSBldmVudE5hbWUgKyAnR2xvYmFsJztcbiAgICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgaWYgKCFzb3J0YWJsZVtwbHVnaW4ucGx1Z2luTmFtZV0pIHJldHVybjsgLy8gRmlyZSBnbG9iYWwgZXZlbnRzIGlmIGl0IGV4aXN0cyBpbiB0aGlzIHNvcnRhYmxlXG5cbiAgICAgIGlmIChzb3J0YWJsZVtwbHVnaW4ucGx1Z2luTmFtZV1bZXZlbnROYW1lR2xvYmFsXSkge1xuICAgICAgICBzb3J0YWJsZVtwbHVnaW4ucGx1Z2luTmFtZV1bZXZlbnROYW1lR2xvYmFsXShfb2JqZWN0U3ByZWFkMih7XG4gICAgICAgICAgc29ydGFibGU6IHNvcnRhYmxlXG4gICAgICAgIH0sIGV2dCkpO1xuICAgICAgfSAvLyBPbmx5IGZpcmUgcGx1Z2luIGV2ZW50IGlmIHBsdWdpbiBpcyBlbmFibGVkIGluIHRoaXMgc29ydGFibGUsXG4gICAgICAvLyBhbmQgcGx1Z2luIGhhcyBldmVudCBkZWZpbmVkXG5cblxuICAgICAgaWYgKHNvcnRhYmxlLm9wdGlvbnNbcGx1Z2luLnBsdWdpbk5hbWVdICYmIHNvcnRhYmxlW3BsdWdpbi5wbHVnaW5OYW1lXVtldmVudE5hbWVdKSB7XG4gICAgICAgIHNvcnRhYmxlW3BsdWdpbi5wbHVnaW5OYW1lXVtldmVudE5hbWVdKF9vYmplY3RTcHJlYWQyKHtcbiAgICAgICAgICBzb3J0YWJsZTogc29ydGFibGVcbiAgICAgICAgfSwgZXZ0KSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIGluaXRpYWxpemVQbHVnaW5zOiBmdW5jdGlvbiBpbml0aWFsaXplUGx1Z2lucyhzb3J0YWJsZSwgZWwsIGRlZmF1bHRzLCBvcHRpb25zKSB7XG4gICAgcGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgIHZhciBwbHVnaW5OYW1lID0gcGx1Z2luLnBsdWdpbk5hbWU7XG4gICAgICBpZiAoIXNvcnRhYmxlLm9wdGlvbnNbcGx1Z2luTmFtZV0gJiYgIXBsdWdpbi5pbml0aWFsaXplQnlEZWZhdWx0KSByZXR1cm47XG4gICAgICB2YXIgaW5pdGlhbGl6ZWQgPSBuZXcgcGx1Z2luKHNvcnRhYmxlLCBlbCwgc29ydGFibGUub3B0aW9ucyk7XG4gICAgICBpbml0aWFsaXplZC5zb3J0YWJsZSA9IHNvcnRhYmxlO1xuICAgICAgaW5pdGlhbGl6ZWQub3B0aW9ucyA9IHNvcnRhYmxlLm9wdGlvbnM7XG4gICAgICBzb3J0YWJsZVtwbHVnaW5OYW1lXSA9IGluaXRpYWxpemVkOyAvLyBBZGQgZGVmYXVsdCBvcHRpb25zIGZyb20gcGx1Z2luXG5cbiAgICAgIF9leHRlbmRzKGRlZmF1bHRzLCBpbml0aWFsaXplZC5kZWZhdWx0cyk7XG4gICAgfSk7XG5cbiAgICBmb3IgKHZhciBvcHRpb24gaW4gc29ydGFibGUub3B0aW9ucykge1xuICAgICAgaWYgKCFzb3J0YWJsZS5vcHRpb25zLmhhc093blByb3BlcnR5KG9wdGlvbikpIGNvbnRpbnVlO1xuICAgICAgdmFyIG1vZGlmaWVkID0gdGhpcy5tb2RpZnlPcHRpb24oc29ydGFibGUsIG9wdGlvbiwgc29ydGFibGUub3B0aW9uc1tvcHRpb25dKTtcblxuICAgICAgaWYgKHR5cGVvZiBtb2RpZmllZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc29ydGFibGUub3B0aW9uc1tvcHRpb25dID0gbW9kaWZpZWQ7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBnZXRFdmVudFByb3BlcnRpZXM6IGZ1bmN0aW9uIGdldEV2ZW50UHJvcGVydGllcyhuYW1lLCBzb3J0YWJsZSkge1xuICAgIHZhciBldmVudFByb3BlcnRpZXMgPSB7fTtcbiAgICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgaWYgKHR5cGVvZiBwbHVnaW4uZXZlbnRQcm9wZXJ0aWVzICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XG5cbiAgICAgIF9leHRlbmRzKGV2ZW50UHJvcGVydGllcywgcGx1Z2luLmV2ZW50UHJvcGVydGllcy5jYWxsKHNvcnRhYmxlW3BsdWdpbi5wbHVnaW5OYW1lXSwgbmFtZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBldmVudFByb3BlcnRpZXM7XG4gIH0sXG4gIG1vZGlmeU9wdGlvbjogZnVuY3Rpb24gbW9kaWZ5T3B0aW9uKHNvcnRhYmxlLCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBtb2RpZmllZFZhbHVlO1xuICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAvLyBQbHVnaW4gbXVzdCBleGlzdCBvbiB0aGUgU29ydGFibGVcbiAgICAgIGlmICghc29ydGFibGVbcGx1Z2luLnBsdWdpbk5hbWVdKSByZXR1cm47IC8vIElmIHN0YXRpYyBvcHRpb24gbGlzdGVuZXIgZXhpc3RzIGZvciB0aGlzIG9wdGlvbiwgY2FsbCBpbiB0aGUgY29udGV4dCBvZiB0aGUgU29ydGFibGUncyBpbnN0YW5jZSBvZiB0aGlzIHBsdWdpblxuXG4gICAgICBpZiAocGx1Z2luLm9wdGlvbkxpc3RlbmVycyAmJiB0eXBlb2YgcGx1Z2luLm9wdGlvbkxpc3RlbmVyc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBtb2RpZmllZFZhbHVlID0gcGx1Z2luLm9wdGlvbkxpc3RlbmVyc1tuYW1lXS5jYWxsKHNvcnRhYmxlW3BsdWdpbi5wbHVnaW5OYW1lXSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtb2RpZmllZFZhbHVlO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KF9yZWYpIHtcbiAgdmFyIHNvcnRhYmxlID0gX3JlZi5zb3J0YWJsZSxcbiAgICAgIHJvb3RFbCA9IF9yZWYucm9vdEVsLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgIHRhcmdldEVsID0gX3JlZi50YXJnZXRFbCxcbiAgICAgIGNsb25lRWwgPSBfcmVmLmNsb25lRWwsXG4gICAgICB0b0VsID0gX3JlZi50b0VsLFxuICAgICAgZnJvbUVsID0gX3JlZi5mcm9tRWwsXG4gICAgICBvbGRJbmRleCA9IF9yZWYub2xkSW5kZXgsXG4gICAgICBuZXdJbmRleCA9IF9yZWYubmV3SW5kZXgsXG4gICAgICBvbGREcmFnZ2FibGVJbmRleCA9IF9yZWYub2xkRHJhZ2dhYmxlSW5kZXgsXG4gICAgICBuZXdEcmFnZ2FibGVJbmRleCA9IF9yZWYubmV3RHJhZ2dhYmxlSW5kZXgsXG4gICAgICBvcmlnaW5hbEV2ZW50ID0gX3JlZi5vcmlnaW5hbEV2ZW50LFxuICAgICAgcHV0U29ydGFibGUgPSBfcmVmLnB1dFNvcnRhYmxlLFxuICAgICAgZXh0cmFFdmVudFByb3BlcnRpZXMgPSBfcmVmLmV4dHJhRXZlbnRQcm9wZXJ0aWVzO1xuICBzb3J0YWJsZSA9IHNvcnRhYmxlIHx8IHJvb3RFbCAmJiByb290RWxbZXhwYW5kb107XG4gIGlmICghc29ydGFibGUpIHJldHVybjtcbiAgdmFyIGV2dCxcbiAgICAgIG9wdGlvbnMgPSBzb3J0YWJsZS5vcHRpb25zLFxuICAgICAgb25OYW1lID0gJ29uJyArIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnN1YnN0cigxKTsgLy8gU3VwcG9ydCBmb3IgbmV3IEN1c3RvbUV2ZW50IGZlYXR1cmVcblxuICBpZiAod2luZG93LkN1c3RvbUV2ZW50ICYmICFJRTExT3JMZXNzICYmICFFZGdlKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZXZ0LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlKTtcbiAgfVxuXG4gIGV2dC50byA9IHRvRWwgfHwgcm9vdEVsO1xuICBldnQuZnJvbSA9IGZyb21FbCB8fCByb290RWw7XG4gIGV2dC5pdGVtID0gdGFyZ2V0RWwgfHwgcm9vdEVsO1xuICBldnQuY2xvbmUgPSBjbG9uZUVsO1xuICBldnQub2xkSW5kZXggPSBvbGRJbmRleDtcbiAgZXZ0Lm5ld0luZGV4ID0gbmV3SW5kZXg7XG4gIGV2dC5vbGREcmFnZ2FibGVJbmRleCA9IG9sZERyYWdnYWJsZUluZGV4O1xuICBldnQubmV3RHJhZ2dhYmxlSW5kZXggPSBuZXdEcmFnZ2FibGVJbmRleDtcbiAgZXZ0Lm9yaWdpbmFsRXZlbnQgPSBvcmlnaW5hbEV2ZW50O1xuICBldnQucHVsbE1vZGUgPSBwdXRTb3J0YWJsZSA/IHB1dFNvcnRhYmxlLmxhc3RQdXRNb2RlIDogdW5kZWZpbmVkO1xuXG4gIHZhciBhbGxFdmVudFByb3BlcnRpZXMgPSBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgZXh0cmFFdmVudFByb3BlcnRpZXMpLCBQbHVnaW5NYW5hZ2VyLmdldEV2ZW50UHJvcGVydGllcyhuYW1lLCBzb3J0YWJsZSkpO1xuXG4gIGZvciAodmFyIG9wdGlvbiBpbiBhbGxFdmVudFByb3BlcnRpZXMpIHtcbiAgICBldnRbb3B0aW9uXSA9IGFsbEV2ZW50UHJvcGVydGllc1tvcHRpb25dO1xuICB9XG5cbiAgaWYgKHJvb3RFbCkge1xuICAgIHJvb3RFbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cblxuICBpZiAob3B0aW9uc1tvbk5hbWVdKSB7XG4gICAgb3B0aW9uc1tvbk5hbWVdLmNhbGwoc29ydGFibGUsIGV2dCk7XG4gIH1cbn1cblxudmFyIF9leGNsdWRlZCA9IFtcImV2dFwiXTtcblxudmFyIHBsdWdpbkV2ZW50ID0gZnVuY3Rpb24gcGx1Z2luRXZlbnQoZXZlbnROYW1lLCBzb3J0YWJsZSkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge30sXG4gICAgICBvcmlnaW5hbEV2ZW50ID0gX3JlZi5ldnQsXG4gICAgICBkYXRhID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIF9leGNsdWRlZCk7XG5cbiAgUGx1Z2luTWFuYWdlci5wbHVnaW5FdmVudC5iaW5kKFNvcnRhYmxlKShldmVudE5hbWUsIHNvcnRhYmxlLCBfb2JqZWN0U3ByZWFkMih7XG4gICAgZHJhZ0VsOiBkcmFnRWwsXG4gICAgcGFyZW50RWw6IHBhcmVudEVsLFxuICAgIGdob3N0RWw6IGdob3N0RWwsXG4gICAgcm9vdEVsOiByb290RWwsXG4gICAgbmV4dEVsOiBuZXh0RWwsXG4gICAgbGFzdERvd25FbDogbGFzdERvd25FbCxcbiAgICBjbG9uZUVsOiBjbG9uZUVsLFxuICAgIGNsb25lSGlkZGVuOiBjbG9uZUhpZGRlbixcbiAgICBkcmFnU3RhcnRlZDogbW92ZWQsXG4gICAgcHV0U29ydGFibGU6IHB1dFNvcnRhYmxlLFxuICAgIGFjdGl2ZVNvcnRhYmxlOiBTb3J0YWJsZS5hY3RpdmUsXG4gICAgb3JpZ2luYWxFdmVudDogb3JpZ2luYWxFdmVudCxcbiAgICBvbGRJbmRleDogb2xkSW5kZXgsXG4gICAgb2xkRHJhZ2dhYmxlSW5kZXg6IG9sZERyYWdnYWJsZUluZGV4LFxuICAgIG5ld0luZGV4OiBuZXdJbmRleCxcbiAgICBuZXdEcmFnZ2FibGVJbmRleDogbmV3RHJhZ2dhYmxlSW5kZXgsXG4gICAgaGlkZUdob3N0Rm9yVGFyZ2V0OiBfaGlkZUdob3N0Rm9yVGFyZ2V0LFxuICAgIHVuaGlkZUdob3N0Rm9yVGFyZ2V0OiBfdW5oaWRlR2hvc3RGb3JUYXJnZXQsXG4gICAgY2xvbmVOb3dIaWRkZW46IGZ1bmN0aW9uIGNsb25lTm93SGlkZGVuKCkge1xuICAgICAgY2xvbmVIaWRkZW4gPSB0cnVlO1xuICAgIH0sXG4gICAgY2xvbmVOb3dTaG93bjogZnVuY3Rpb24gY2xvbmVOb3dTaG93bigpIHtcbiAgICAgIGNsb25lSGlkZGVuID0gZmFsc2U7XG4gICAgfSxcbiAgICBkaXNwYXRjaFNvcnRhYmxlRXZlbnQ6IGZ1bmN0aW9uIGRpc3BhdGNoU29ydGFibGVFdmVudChuYW1lKSB7XG4gICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgIHNvcnRhYmxlOiBzb3J0YWJsZSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogb3JpZ2luYWxFdmVudFxuICAgICAgfSk7XG4gICAgfVxuICB9LCBkYXRhKSk7XG59O1xuXG5mdW5jdGlvbiBfZGlzcGF0Y2hFdmVudChpbmZvKSB7XG4gIGRpc3BhdGNoRXZlbnQoX29iamVjdFNwcmVhZDIoe1xuICAgIHB1dFNvcnRhYmxlOiBwdXRTb3J0YWJsZSxcbiAgICBjbG9uZUVsOiBjbG9uZUVsLFxuICAgIHRhcmdldEVsOiBkcmFnRWwsXG4gICAgcm9vdEVsOiByb290RWwsXG4gICAgb2xkSW5kZXg6IG9sZEluZGV4LFxuICAgIG9sZERyYWdnYWJsZUluZGV4OiBvbGREcmFnZ2FibGVJbmRleCxcbiAgICBuZXdJbmRleDogbmV3SW5kZXgsXG4gICAgbmV3RHJhZ2dhYmxlSW5kZXg6IG5ld0RyYWdnYWJsZUluZGV4XG4gIH0sIGluZm8pKTtcbn1cblxudmFyIGRyYWdFbCxcbiAgICBwYXJlbnRFbCxcbiAgICBnaG9zdEVsLFxuICAgIHJvb3RFbCxcbiAgICBuZXh0RWwsXG4gICAgbGFzdERvd25FbCxcbiAgICBjbG9uZUVsLFxuICAgIGNsb25lSGlkZGVuLFxuICAgIG9sZEluZGV4LFxuICAgIG5ld0luZGV4LFxuICAgIG9sZERyYWdnYWJsZUluZGV4LFxuICAgIG5ld0RyYWdnYWJsZUluZGV4LFxuICAgIGFjdGl2ZUdyb3VwLFxuICAgIHB1dFNvcnRhYmxlLFxuICAgIGF3YWl0aW5nRHJhZ1N0YXJ0ZWQgPSBmYWxzZSxcbiAgICBpZ25vcmVOZXh0Q2xpY2sgPSBmYWxzZSxcbiAgICBzb3J0YWJsZXMgPSBbXSxcbiAgICB0YXBFdnQsXG4gICAgdG91Y2hFdnQsXG4gICAgbGFzdER4LFxuICAgIGxhc3REeSxcbiAgICB0YXBEaXN0YW5jZUxlZnQsXG4gICAgdGFwRGlzdGFuY2VUb3AsXG4gICAgbW92ZWQsXG4gICAgbGFzdFRhcmdldCxcbiAgICBsYXN0RGlyZWN0aW9uLFxuICAgIHBhc3RGaXJzdEludmVydFRocmVzaCA9IGZhbHNlLFxuICAgIGlzQ2lyY3Vtc3RhbnRpYWxJbnZlcnQgPSBmYWxzZSxcbiAgICB0YXJnZXRNb3ZlRGlzdGFuY2UsXG4gICAgLy8gRm9yIHBvc2l0aW9uaW5nIGdob3N0IGFic29sdXRlbHlcbmdob3N0UmVsYXRpdmVQYXJlbnQsXG4gICAgZ2hvc3RSZWxhdGl2ZVBhcmVudEluaXRpYWxTY3JvbGwgPSBbXSxcbiAgICAvLyAobGVmdCwgdG9wKVxuX3NpbGVudCA9IGZhbHNlLFxuICAgIHNhdmVkSW5wdXRDaGVja2VkID0gW107XG4vKiogQGNvbnN0ICovXG5cbnZhciBkb2N1bWVudEV4aXN0cyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcsXG4gICAgUG9zaXRpb25HaG9zdEFic29sdXRlbHkgPSBJT1MsXG4gICAgQ1NTRmxvYXRQcm9wZXJ0eSA9IEVkZ2UgfHwgSUUxMU9yTGVzcyA/ICdjc3NGbG9hdCcgOiAnZmxvYXQnLFxuICAgIC8vIFRoaXMgd2lsbCBub3QgcGFzcyBmb3IgSUU5LCBiZWNhdXNlIElFOSBEbkQgb25seSB3b3JrcyBvbiBhbmNob3JzXG5zdXBwb3J0RHJhZ2dhYmxlID0gZG9jdW1lbnRFeGlzdHMgJiYgIUNocm9tZUZvckFuZHJvaWQgJiYgIUlPUyAmJiAnZHJhZ2dhYmxlJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBzdXBwb3J0Q3NzUG9pbnRlckV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFkb2N1bWVudEV4aXN0cykgcmV0dXJuOyAvLyBmYWxzZSB3aGVuIDw9IElFMTFcblxuICBpZiAoSUUxMU9yTGVzcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3gnKTtcbiAgZWwuc3R5bGUuY3NzVGV4dCA9ICdwb2ludGVyLWV2ZW50czphdXRvJztcbiAgcmV0dXJuIGVsLnN0eWxlLnBvaW50ZXJFdmVudHMgPT09ICdhdXRvJztcbn0oKSxcbiAgICBfZGV0ZWN0RGlyZWN0aW9uID0gZnVuY3Rpb24gX2RldGVjdERpcmVjdGlvbihlbCwgb3B0aW9ucykge1xuICB2YXIgZWxDU1MgPSBjc3MoZWwpLFxuICAgICAgZWxXaWR0aCA9IHBhcnNlSW50KGVsQ1NTLndpZHRoKSAtIHBhcnNlSW50KGVsQ1NTLnBhZGRpbmdMZWZ0KSAtIHBhcnNlSW50KGVsQ1NTLnBhZGRpbmdSaWdodCkgLSBwYXJzZUludChlbENTUy5ib3JkZXJMZWZ0V2lkdGgpIC0gcGFyc2VJbnQoZWxDU1MuYm9yZGVyUmlnaHRXaWR0aCksXG4gICAgICBjaGlsZDEgPSBnZXRDaGlsZChlbCwgMCwgb3B0aW9ucyksXG4gICAgICBjaGlsZDIgPSBnZXRDaGlsZChlbCwgMSwgb3B0aW9ucyksXG4gICAgICBmaXJzdENoaWxkQ1NTID0gY2hpbGQxICYmIGNzcyhjaGlsZDEpLFxuICAgICAgc2Vjb25kQ2hpbGRDU1MgPSBjaGlsZDIgJiYgY3NzKGNoaWxkMiksXG4gICAgICBmaXJzdENoaWxkV2lkdGggPSBmaXJzdENoaWxkQ1NTICYmIHBhcnNlSW50KGZpcnN0Q2hpbGRDU1MubWFyZ2luTGVmdCkgKyBwYXJzZUludChmaXJzdENoaWxkQ1NTLm1hcmdpblJpZ2h0KSArIGdldFJlY3QoY2hpbGQxKS53aWR0aCxcbiAgICAgIHNlY29uZENoaWxkV2lkdGggPSBzZWNvbmRDaGlsZENTUyAmJiBwYXJzZUludChzZWNvbmRDaGlsZENTUy5tYXJnaW5MZWZ0KSArIHBhcnNlSW50KHNlY29uZENoaWxkQ1NTLm1hcmdpblJpZ2h0KSArIGdldFJlY3QoY2hpbGQyKS53aWR0aDtcblxuICBpZiAoZWxDU1MuZGlzcGxheSA9PT0gJ2ZsZXgnKSB7XG4gICAgcmV0dXJuIGVsQ1NTLmZsZXhEaXJlY3Rpb24gPT09ICdjb2x1bW4nIHx8IGVsQ1NTLmZsZXhEaXJlY3Rpb24gPT09ICdjb2x1bW4tcmV2ZXJzZScgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICB9XG5cbiAgaWYgKGVsQ1NTLmRpc3BsYXkgPT09ICdncmlkJykge1xuICAgIHJldHVybiBlbENTUy5ncmlkVGVtcGxhdGVDb2x1bW5zLnNwbGl0KCcgJykubGVuZ3RoIDw9IDEgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICB9XG5cbiAgaWYgKGNoaWxkMSAmJiBmaXJzdENoaWxkQ1NTW1wiZmxvYXRcIl0gJiYgZmlyc3RDaGlsZENTU1tcImZsb2F0XCJdICE9PSAnbm9uZScpIHtcbiAgICB2YXIgdG91Y2hpbmdTaWRlQ2hpbGQyID0gZmlyc3RDaGlsZENTU1tcImZsb2F0XCJdID09PSAnbGVmdCcgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIHJldHVybiBjaGlsZDIgJiYgKHNlY29uZENoaWxkQ1NTLmNsZWFyID09PSAnYm90aCcgfHwgc2Vjb25kQ2hpbGRDU1MuY2xlYXIgPT09IHRvdWNoaW5nU2lkZUNoaWxkMikgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkMSAmJiAoZmlyc3RDaGlsZENTUy5kaXNwbGF5ID09PSAnYmxvY2snIHx8IGZpcnN0Q2hpbGRDU1MuZGlzcGxheSA9PT0gJ2ZsZXgnIHx8IGZpcnN0Q2hpbGRDU1MuZGlzcGxheSA9PT0gJ3RhYmxlJyB8fCBmaXJzdENoaWxkQ1NTLmRpc3BsYXkgPT09ICdncmlkJyB8fCBmaXJzdENoaWxkV2lkdGggPj0gZWxXaWR0aCAmJiBlbENTU1tDU1NGbG9hdFByb3BlcnR5XSA9PT0gJ25vbmUnIHx8IGNoaWxkMiAmJiBlbENTU1tDU1NGbG9hdFByb3BlcnR5XSA9PT0gJ25vbmUnICYmIGZpcnN0Q2hpbGRXaWR0aCArIHNlY29uZENoaWxkV2lkdGggPiBlbFdpZHRoKSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG59LFxuICAgIF9kcmFnRWxJblJvd0NvbHVtbiA9IGZ1bmN0aW9uIF9kcmFnRWxJblJvd0NvbHVtbihkcmFnUmVjdCwgdGFyZ2V0UmVjdCwgdmVydGljYWwpIHtcbiAgdmFyIGRyYWdFbFMxT3BwID0gdmVydGljYWwgPyBkcmFnUmVjdC5sZWZ0IDogZHJhZ1JlY3QudG9wLFxuICAgICAgZHJhZ0VsUzJPcHAgPSB2ZXJ0aWNhbCA/IGRyYWdSZWN0LnJpZ2h0IDogZHJhZ1JlY3QuYm90dG9tLFxuICAgICAgZHJhZ0VsT3BwTGVuZ3RoID0gdmVydGljYWwgPyBkcmFnUmVjdC53aWR0aCA6IGRyYWdSZWN0LmhlaWdodCxcbiAgICAgIHRhcmdldFMxT3BwID0gdmVydGljYWwgPyB0YXJnZXRSZWN0LmxlZnQgOiB0YXJnZXRSZWN0LnRvcCxcbiAgICAgIHRhcmdldFMyT3BwID0gdmVydGljYWwgPyB0YXJnZXRSZWN0LnJpZ2h0IDogdGFyZ2V0UmVjdC5ib3R0b20sXG4gICAgICB0YXJnZXRPcHBMZW5ndGggPSB2ZXJ0aWNhbCA/IHRhcmdldFJlY3Qud2lkdGggOiB0YXJnZXRSZWN0LmhlaWdodDtcbiAgcmV0dXJuIGRyYWdFbFMxT3BwID09PSB0YXJnZXRTMU9wcCB8fCBkcmFnRWxTMk9wcCA9PT0gdGFyZ2V0UzJPcHAgfHwgZHJhZ0VsUzFPcHAgKyBkcmFnRWxPcHBMZW5ndGggLyAyID09PSB0YXJnZXRTMU9wcCArIHRhcmdldE9wcExlbmd0aCAvIDI7XG59LFxuXG4vKipcbiAqIERldGVjdHMgZmlyc3QgbmVhcmVzdCBlbXB0eSBzb3J0YWJsZSB0byBYIGFuZCBZIHBvc2l0aW9uIHVzaW5nIGVtcHR5SW5zZXJ0VGhyZXNob2xkLlxuICogQHBhcmFtICB7TnVtYmVyfSB4ICAgICAgWCBwb3NpdGlvblxuICogQHBhcmFtICB7TnVtYmVyfSB5ICAgICAgWSBwb3NpdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9ICAgRWxlbWVudCBvZiB0aGUgZmlyc3QgZm91bmQgbmVhcmVzdCBTb3J0YWJsZVxuICovXG5fZGV0ZWN0TmVhcmVzdEVtcHR5U29ydGFibGUgPSBmdW5jdGlvbiBfZGV0ZWN0TmVhcmVzdEVtcHR5U29ydGFibGUoeCwgeSkge1xuICB2YXIgcmV0O1xuICBzb3J0YWJsZXMuc29tZShmdW5jdGlvbiAoc29ydGFibGUpIHtcbiAgICB2YXIgdGhyZXNob2xkID0gc29ydGFibGVbZXhwYW5kb10ub3B0aW9ucy5lbXB0eUluc2VydFRocmVzaG9sZDtcbiAgICBpZiAoIXRocmVzaG9sZCB8fCBsYXN0Q2hpbGQoc29ydGFibGUpKSByZXR1cm47XG4gICAgdmFyIHJlY3QgPSBnZXRSZWN0KHNvcnRhYmxlKSxcbiAgICAgICAgaW5zaWRlSG9yaXpvbnRhbGx5ID0geCA+PSByZWN0LmxlZnQgLSB0aHJlc2hvbGQgJiYgeCA8PSByZWN0LnJpZ2h0ICsgdGhyZXNob2xkLFxuICAgICAgICBpbnNpZGVWZXJ0aWNhbGx5ID0geSA+PSByZWN0LnRvcCAtIHRocmVzaG9sZCAmJiB5IDw9IHJlY3QuYm90dG9tICsgdGhyZXNob2xkO1xuXG4gICAgaWYgKGluc2lkZUhvcml6b250YWxseSAmJiBpbnNpZGVWZXJ0aWNhbGx5KSB7XG4gICAgICByZXR1cm4gcmV0ID0gc29ydGFibGU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJldDtcbn0sXG4gICAgX3ByZXBhcmVHcm91cCA9IGZ1bmN0aW9uIF9wcmVwYXJlR3JvdXAob3B0aW9ucykge1xuICBmdW5jdGlvbiB0b0ZuKHZhbHVlLCBwdWxsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0bywgZnJvbSwgZHJhZ0VsLCBldnQpIHtcbiAgICAgIHZhciBzYW1lR3JvdXAgPSB0by5vcHRpb25zLmdyb3VwLm5hbWUgJiYgZnJvbS5vcHRpb25zLmdyb3VwLm5hbWUgJiYgdG8ub3B0aW9ucy5ncm91cC5uYW1lID09PSBmcm9tLm9wdGlvbnMuZ3JvdXAubmFtZTtcblxuICAgICAgaWYgKHZhbHVlID09IG51bGwgJiYgKHB1bGwgfHwgc2FtZUdyb3VwKSkge1xuICAgICAgICAvLyBEZWZhdWx0IHB1bGwgdmFsdWVcbiAgICAgICAgLy8gRGVmYXVsdCBwdWxsIGFuZCBwdXQgdmFsdWUgaWYgc2FtZSBncm91cFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChwdWxsICYmIHZhbHVlID09PSAnY2xvbmUnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB0b0ZuKHZhbHVlKHRvLCBmcm9tLCBkcmFnRWwsIGV2dCksIHB1bGwpKHRvLCBmcm9tLCBkcmFnRWwsIGV2dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgb3RoZXJHcm91cCA9IChwdWxsID8gdG8gOiBmcm9tKS5vcHRpb25zLmdyb3VwLm5hbWU7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlID09PSBvdGhlckdyb3VwIHx8IHZhbHVlLmpvaW4gJiYgdmFsdWUuaW5kZXhPZihvdGhlckdyb3VwKSA+IC0xO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgZ3JvdXAgPSB7fTtcbiAgdmFyIG9yaWdpbmFsR3JvdXAgPSBvcHRpb25zLmdyb3VwO1xuXG4gIGlmICghb3JpZ2luYWxHcm91cCB8fCBfdHlwZW9mKG9yaWdpbmFsR3JvdXApICE9ICdvYmplY3QnKSB7XG4gICAgb3JpZ2luYWxHcm91cCA9IHtcbiAgICAgIG5hbWU6IG9yaWdpbmFsR3JvdXBcbiAgICB9O1xuICB9XG5cbiAgZ3JvdXAubmFtZSA9IG9yaWdpbmFsR3JvdXAubmFtZTtcbiAgZ3JvdXAuY2hlY2tQdWxsID0gdG9GbihvcmlnaW5hbEdyb3VwLnB1bGwsIHRydWUpO1xuICBncm91cC5jaGVja1B1dCA9IHRvRm4ob3JpZ2luYWxHcm91cC5wdXQpO1xuICBncm91cC5yZXZlcnRDbG9uZSA9IG9yaWdpbmFsR3JvdXAucmV2ZXJ0Q2xvbmU7XG4gIG9wdGlvbnMuZ3JvdXAgPSBncm91cDtcbn0sXG4gICAgX2hpZGVHaG9zdEZvclRhcmdldCA9IGZ1bmN0aW9uIF9oaWRlR2hvc3RGb3JUYXJnZXQoKSB7XG4gIGlmICghc3VwcG9ydENzc1BvaW50ZXJFdmVudHMgJiYgZ2hvc3RFbCkge1xuICAgIGNzcyhnaG9zdEVsLCAnZGlzcGxheScsICdub25lJyk7XG4gIH1cbn0sXG4gICAgX3VuaGlkZUdob3N0Rm9yVGFyZ2V0ID0gZnVuY3Rpb24gX3VuaGlkZUdob3N0Rm9yVGFyZ2V0KCkge1xuICBpZiAoIXN1cHBvcnRDc3NQb2ludGVyRXZlbnRzICYmIGdob3N0RWwpIHtcbiAgICBjc3MoZ2hvc3RFbCwgJ2Rpc3BsYXknLCAnJyk7XG4gIH1cbn07IC8vICMxMTg0IGZpeCAtIFByZXZlbnQgY2xpY2sgZXZlbnQgb24gZmFsbGJhY2sgaWYgZHJhZ2dlZCBidXQgaXRlbSBub3QgY2hhbmdlZCBwb3NpdGlvblxuXG5cbmlmIChkb2N1bWVudEV4aXN0cykge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBpZiAoaWdub3JlTmV4dENsaWNrKSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24gJiYgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZ0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAmJiBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBpZ25vcmVOZXh0Q2xpY2sgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIHRydWUpO1xufVxuXG52YXIgbmVhcmVzdEVtcHR5SW5zZXJ0RGV0ZWN0RXZlbnQgPSBmdW5jdGlvbiBuZWFyZXN0RW1wdHlJbnNlcnREZXRlY3RFdmVudChldnQpIHtcbiAgaWYgKGRyYWdFbCkge1xuICAgIGV2dCA9IGV2dC50b3VjaGVzID8gZXZ0LnRvdWNoZXNbMF0gOiBldnQ7XG5cbiAgICB2YXIgbmVhcmVzdCA9IF9kZXRlY3ROZWFyZXN0RW1wdHlTb3J0YWJsZShldnQuY2xpZW50WCwgZXZ0LmNsaWVudFkpO1xuXG4gICAgaWYgKG5lYXJlc3QpIHtcbiAgICAgIC8vIENyZWF0ZSBpbWl0YXRpb24gZXZlbnRcbiAgICAgIHZhciBldmVudCA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBpIGluIGV2dCkge1xuICAgICAgICBpZiAoZXZ0Lmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgZXZlbnRbaV0gPSBldnRbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZlbnQudGFyZ2V0ID0gZXZlbnQucm9vdEVsID0gbmVhcmVzdDtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ID0gdm9pZCAwO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uID0gdm9pZCAwO1xuXG4gICAgICBuZWFyZXN0W2V4cGFuZG9dLl9vbkRyYWdPdmVyKGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBfY2hlY2tPdXRzaWRlVGFyZ2V0RWwgPSBmdW5jdGlvbiBfY2hlY2tPdXRzaWRlVGFyZ2V0RWwoZXZ0KSB7XG4gIGlmIChkcmFnRWwpIHtcbiAgICBkcmFnRWwucGFyZW50Tm9kZVtleHBhbmRvXS5faXNPdXRzaWRlVGhpc0VsKGV2dC50YXJnZXQpO1xuICB9XG59O1xuLyoqXG4gKiBAY2xhc3MgIFNvcnRhYmxlXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gIGVsXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgIFtvcHRpb25zXVxuICovXG5cblxuZnVuY3Rpb24gU29ydGFibGUoZWwsIG9wdGlvbnMpIHtcbiAgaWYgKCEoZWwgJiYgZWwubm9kZVR5cGUgJiYgZWwubm9kZVR5cGUgPT09IDEpKSB7XG4gICAgdGhyb3cgXCJTb3J0YWJsZTogYGVsYCBtdXN0IGJlIGFuIEhUTUxFbGVtZW50LCBub3QgXCIuY29uY2F0KHt9LnRvU3RyaW5nLmNhbGwoZWwpKTtcbiAgfVxuXG4gIHRoaXMuZWwgPSBlbDsgLy8gcm9vdCBlbGVtZW50XG5cbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBvcHRpb25zKTsgLy8gRXhwb3J0IGluc3RhbmNlXG5cbiAgZWxbZXhwYW5kb10gPSB0aGlzO1xuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgZ3JvdXA6IG51bGwsXG4gICAgc29ydDogdHJ1ZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc3RvcmU6IG51bGwsXG4gICAgaGFuZGxlOiBudWxsLFxuICAgIGRyYWdnYWJsZTogL15bdW9dbCQvaS50ZXN0KGVsLm5vZGVOYW1lKSA/ICc+bGknIDogJz4qJyxcbiAgICBzd2FwVGhyZXNob2xkOiAxLFxuICAgIC8vIHBlcmNlbnRhZ2U7IDAgPD0geCA8PSAxXG4gICAgaW52ZXJ0U3dhcDogZmFsc2UsXG4gICAgLy8gaW52ZXJ0IGFsd2F5c1xuICAgIGludmVydGVkU3dhcFRocmVzaG9sZDogbnVsbCxcbiAgICAvLyB3aWxsIGJlIHNldCB0byBzYW1lIGFzIHN3YXBUaHJlc2hvbGQgaWYgZGVmYXVsdFxuICAgIHJlbW92ZUNsb25lT25IaWRlOiB0cnVlLFxuICAgIGRpcmVjdGlvbjogZnVuY3Rpb24gZGlyZWN0aW9uKCkge1xuICAgICAgcmV0dXJuIF9kZXRlY3REaXJlY3Rpb24oZWwsIHRoaXMub3B0aW9ucyk7XG4gICAgfSxcbiAgICBnaG9zdENsYXNzOiAnc29ydGFibGUtZ2hvc3QnLFxuICAgIGNob3NlbkNsYXNzOiAnc29ydGFibGUtY2hvc2VuJyxcbiAgICBkcmFnQ2xhc3M6ICdzb3J0YWJsZS1kcmFnJyxcbiAgICBpZ25vcmU6ICdhLCBpbWcnLFxuICAgIGZpbHRlcjogbnVsbCxcbiAgICBwcmV2ZW50T25GaWx0ZXI6IHRydWUsXG4gICAgYW5pbWF0aW9uOiAwLFxuICAgIGVhc2luZzogbnVsbCxcbiAgICBzZXREYXRhOiBmdW5jdGlvbiBzZXREYXRhKGRhdGFUcmFuc2ZlciwgZHJhZ0VsKSB7XG4gICAgICBkYXRhVHJhbnNmZXIuc2V0RGF0YSgnVGV4dCcsIGRyYWdFbC50ZXh0Q29udGVudCk7XG4gICAgfSxcbiAgICBkcm9wQnViYmxlOiBmYWxzZSxcbiAgICBkcmFnb3ZlckJ1YmJsZTogZmFsc2UsXG4gICAgZGF0YUlkQXR0cjogJ2RhdGEtaWQnLFxuICAgIGRlbGF5OiAwLFxuICAgIGRlbGF5T25Ub3VjaE9ubHk6IGZhbHNlLFxuICAgIHRvdWNoU3RhcnRUaHJlc2hvbGQ6IChOdW1iZXIucGFyc2VJbnQgPyBOdW1iZXIgOiB3aW5kb3cpLnBhcnNlSW50KHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAxMCkgfHwgMSxcbiAgICBmb3JjZUZhbGxiYWNrOiBmYWxzZSxcbiAgICBmYWxsYmFja0NsYXNzOiAnc29ydGFibGUtZmFsbGJhY2snLFxuICAgIGZhbGxiYWNrT25Cb2R5OiBmYWxzZSxcbiAgICBmYWxsYmFja1RvbGVyYW5jZTogMCxcbiAgICBmYWxsYmFja09mZnNldDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9LFxuICAgIHN1cHBvcnRQb2ludGVyOiBTb3J0YWJsZS5zdXBwb3J0UG9pbnRlciAhPT0gZmFsc2UgJiYgJ1BvaW50ZXJFdmVudCcgaW4gd2luZG93ICYmICFTYWZhcmksXG4gICAgZW1wdHlJbnNlcnRUaHJlc2hvbGQ6IDVcbiAgfTtcbiAgUGx1Z2luTWFuYWdlci5pbml0aWFsaXplUGx1Z2lucyh0aGlzLCBlbCwgZGVmYXVsdHMpOyAvLyBTZXQgZGVmYXVsdCBvcHRpb25zXG5cbiAgZm9yICh2YXIgbmFtZSBpbiBkZWZhdWx0cykge1xuICAgICEobmFtZSBpbiBvcHRpb25zKSAmJiAob3B0aW9uc1tuYW1lXSA9IGRlZmF1bHRzW25hbWVdKTtcbiAgfVxuXG4gIF9wcmVwYXJlR3JvdXAob3B0aW9ucyk7IC8vIEJpbmQgYWxsIHByaXZhdGUgbWV0aG9kc1xuXG5cbiAgZm9yICh2YXIgZm4gaW4gdGhpcykge1xuICAgIGlmIChmbi5jaGFyQXQoMCkgPT09ICdfJyAmJiB0eXBlb2YgdGhpc1tmbl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXNbZm5dID0gdGhpc1tmbl0uYmluZCh0aGlzKTtcbiAgICB9XG4gIH0gLy8gU2V0dXAgZHJhZyBtb2RlXG5cblxuICB0aGlzLm5hdGl2ZURyYWdnYWJsZSA9IG9wdGlvbnMuZm9yY2VGYWxsYmFjayA/IGZhbHNlIDogc3VwcG9ydERyYWdnYWJsZTtcblxuICBpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGUpIHtcbiAgICAvLyBUb3VjaCBzdGFydCB0aHJlc2hvbGQgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiB0aGUgbmF0aXZlIGRyYWdzdGFydCB0aHJlc2hvbGRcbiAgICB0aGlzLm9wdGlvbnMudG91Y2hTdGFydFRocmVzaG9sZCA9IDE7XG4gIH0gLy8gQmluZCBldmVudHNcblxuXG4gIGlmIChvcHRpb25zLnN1cHBvcnRQb2ludGVyKSB7XG4gICAgb24oZWwsICdwb2ludGVyZG93bicsIHRoaXMuX29uVGFwU3RhcnQpO1xuICB9IGVsc2Uge1xuICAgIG9uKGVsLCAnbW91c2Vkb3duJywgdGhpcy5fb25UYXBTdGFydCk7XG4gICAgb24oZWwsICd0b3VjaHN0YXJ0JywgdGhpcy5fb25UYXBTdGFydCk7XG4gIH1cblxuICBpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGUpIHtcbiAgICBvbihlbCwgJ2RyYWdvdmVyJywgdGhpcyk7XG4gICAgb24oZWwsICdkcmFnZW50ZXInLCB0aGlzKTtcbiAgfVxuXG4gIHNvcnRhYmxlcy5wdXNoKHRoaXMuZWwpOyAvLyBSZXN0b3JlIHNvcnRpbmdcblxuICBvcHRpb25zLnN0b3JlICYmIG9wdGlvbnMuc3RvcmUuZ2V0ICYmIHRoaXMuc29ydChvcHRpb25zLnN0b3JlLmdldCh0aGlzKSB8fCBbXSk7IC8vIEFkZCBhbmltYXRpb24gc3RhdGUgbWFuYWdlclxuXG4gIF9leHRlbmRzKHRoaXMsIEFuaW1hdGlvblN0YXRlTWFuYWdlcigpKTtcbn1cblxuU29ydGFibGUucHJvdG90eXBlID1cbi8qKiBAbGVuZHMgU29ydGFibGUucHJvdG90eXBlICovXG57XG4gIGNvbnN0cnVjdG9yOiBTb3J0YWJsZSxcbiAgX2lzT3V0c2lkZVRoaXNFbDogZnVuY3Rpb24gX2lzT3V0c2lkZVRoaXNFbCh0YXJnZXQpIHtcbiAgICBpZiAoIXRoaXMuZWwuY29udGFpbnModGFyZ2V0KSAmJiB0YXJnZXQgIT09IHRoaXMuZWwpIHtcbiAgICAgIGxhc3RUYXJnZXQgPSBudWxsO1xuICAgIH1cbiAgfSxcbiAgX2dldERpcmVjdGlvbjogZnVuY3Rpb24gX2dldERpcmVjdGlvbihldnQsIHRhcmdldCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24uY2FsbCh0aGlzLCBldnQsIHRhcmdldCwgZHJhZ0VsKSA6IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gIH0sXG4gIF9vblRhcFN0YXJ0OiBmdW5jdGlvbiBfb25UYXBTdGFydChcbiAgLyoqIEV2ZW50fFRvdWNoRXZlbnQgKi9cbiAgZXZ0KSB7XG4gICAgaWYgKCFldnQuY2FuY2VsYWJsZSkgcmV0dXJuO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgZWwgPSB0aGlzLmVsLFxuICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBwcmV2ZW50T25GaWx0ZXIgPSBvcHRpb25zLnByZXZlbnRPbkZpbHRlcixcbiAgICAgICAgdHlwZSA9IGV2dC50eXBlLFxuICAgICAgICB0b3VjaCA9IGV2dC50b3VjaGVzICYmIGV2dC50b3VjaGVzWzBdIHx8IGV2dC5wb2ludGVyVHlwZSAmJiBldnQucG9pbnRlclR5cGUgPT09ICd0b3VjaCcgJiYgZXZ0LFxuICAgICAgICB0YXJnZXQgPSAodG91Y2ggfHwgZXZ0KS50YXJnZXQsXG4gICAgICAgIG9yaWdpbmFsVGFyZ2V0ID0gZXZ0LnRhcmdldC5zaGFkb3dSb290ICYmIChldnQucGF0aCAmJiBldnQucGF0aFswXSB8fCBldnQuY29tcG9zZWRQYXRoICYmIGV2dC5jb21wb3NlZFBhdGgoKVswXSkgfHwgdGFyZ2V0LFxuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcblxuICAgIF9zYXZlSW5wdXRDaGVja2VkU3RhdGUoZWwpOyAvLyBEb24ndCB0cmlnZ2VyIHN0YXJ0IGV2ZW50IHdoZW4gYW4gZWxlbWVudCBpcyBiZWVuIGRyYWdnZWQsIG90aGVyd2lzZSB0aGUgZXZ0Lm9sZGluZGV4IGFsd2F5cyB3cm9uZyB3aGVuIHNldCBvcHRpb24uZ3JvdXAuXG5cblxuICAgIGlmIChkcmFnRWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoL21vdXNlZG93bnxwb2ludGVyZG93bi8udGVzdCh0eXBlKSAmJiBldnQuYnV0dG9uICE9PSAwIHx8IG9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjsgLy8gb25seSBsZWZ0IGJ1dHRvbiBhbmQgZW5hYmxlZFxuICAgIH0gLy8gY2FuY2VsIGRuZCBpZiBvcmlnaW5hbCB0YXJnZXQgaXMgY29udGVudCBlZGl0YWJsZVxuXG5cbiAgICBpZiAob3JpZ2luYWxUYXJnZXQuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIFNhZmFyaSBpZ25vcmVzIGZ1cnRoZXIgZXZlbnQgaGFuZGxpbmcgYWZ0ZXIgbW91c2Vkb3duXG5cblxuICAgIGlmICghdGhpcy5uYXRpdmVEcmFnZ2FibGUgJiYgU2FmYXJpICYmIHRhcmdldCAmJiB0YXJnZXQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0VMRUNUJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRhcmdldCA9IGNsb3Nlc3QodGFyZ2V0LCBvcHRpb25zLmRyYWdnYWJsZSwgZWwsIGZhbHNlKTtcblxuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmFuaW1hdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGxhc3REb3duRWwgPT09IHRhcmdldCkge1xuICAgICAgLy8gSWdub3JpbmcgZHVwbGljYXRlIGBkb3duYFxuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gR2V0IHRoZSBpbmRleCBvZiB0aGUgZHJhZ2dlZCBlbGVtZW50IHdpdGhpbiBpdHMgcGFyZW50XG5cblxuICAgIG9sZEluZGV4ID0gaW5kZXgodGFyZ2V0KTtcbiAgICBvbGREcmFnZ2FibGVJbmRleCA9IGluZGV4KHRhcmdldCwgb3B0aW9ucy5kcmFnZ2FibGUpOyAvLyBDaGVjayBmaWx0ZXJcblxuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZmlsdGVyLmNhbGwodGhpcywgZXZ0LCB0YXJnZXQsIHRoaXMpKSB7XG4gICAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICBzb3J0YWJsZTogX3RoaXMsXG4gICAgICAgICAgcm9vdEVsOiBvcmlnaW5hbFRhcmdldCxcbiAgICAgICAgICBuYW1lOiAnZmlsdGVyJyxcbiAgICAgICAgICB0YXJnZXRFbDogdGFyZ2V0LFxuICAgICAgICAgIHRvRWw6IGVsLFxuICAgICAgICAgIGZyb21FbDogZWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGx1Z2luRXZlbnQoJ2ZpbHRlcicsIF90aGlzLCB7XG4gICAgICAgICAgZXZ0OiBldnRcbiAgICAgICAgfSk7XG4gICAgICAgIHByZXZlbnRPbkZpbHRlciAmJiBldnQuY2FuY2VsYWJsZSAmJiBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuOyAvLyBjYW5jZWwgZG5kXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChmaWx0ZXIpIHtcbiAgICAgIGZpbHRlciA9IGZpbHRlci5zcGxpdCgnLCcpLnNvbWUoZnVuY3Rpb24gKGNyaXRlcmlhKSB7XG4gICAgICAgIGNyaXRlcmlhID0gY2xvc2VzdChvcmlnaW5hbFRhcmdldCwgY3JpdGVyaWEudHJpbSgpLCBlbCwgZmFsc2UpO1xuXG4gICAgICAgIGlmIChjcml0ZXJpYSkge1xuICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgIHNvcnRhYmxlOiBfdGhpcyxcbiAgICAgICAgICAgIHJvb3RFbDogY3JpdGVyaWEsXG4gICAgICAgICAgICBuYW1lOiAnZmlsdGVyJyxcbiAgICAgICAgICAgIHRhcmdldEVsOiB0YXJnZXQsXG4gICAgICAgICAgICBmcm9tRWw6IGVsLFxuICAgICAgICAgICAgdG9FbDogZWxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHBsdWdpbkV2ZW50KCdmaWx0ZXInLCBfdGhpcywge1xuICAgICAgICAgICAgZXZ0OiBldnRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgICAgcHJldmVudE9uRmlsdGVyICYmIGV2dC5jYW5jZWxhYmxlICYmIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47IC8vIGNhbmNlbCBkbmRcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5oYW5kbGUgJiYgIWNsb3Nlc3Qob3JpZ2luYWxUYXJnZXQsIG9wdGlvbnMuaGFuZGxlLCBlbCwgZmFsc2UpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBQcmVwYXJlIGBkcmFnc3RhcnRgXG5cblxuICAgIHRoaXMuX3ByZXBhcmVEcmFnU3RhcnQoZXZ0LCB0b3VjaCwgdGFyZ2V0KTtcbiAgfSxcbiAgX3ByZXBhcmVEcmFnU3RhcnQ6IGZ1bmN0aW9uIF9wcmVwYXJlRHJhZ1N0YXJ0KFxuICAvKiogRXZlbnQgKi9cbiAgZXZ0LFxuICAvKiogVG91Y2ggKi9cbiAgdG91Y2gsXG4gIC8qKiBIVE1MRWxlbWVudCAqL1xuICB0YXJnZXQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBlbCA9IF90aGlzLmVsLFxuICAgICAgICBvcHRpb25zID0gX3RoaXMub3B0aW9ucyxcbiAgICAgICAgb3duZXJEb2N1bWVudCA9IGVsLm93bmVyRG9jdW1lbnQsXG4gICAgICAgIGRyYWdTdGFydEZuO1xuXG4gICAgaWYgKHRhcmdldCAmJiAhZHJhZ0VsICYmIHRhcmdldC5wYXJlbnROb2RlID09PSBlbCkge1xuICAgICAgdmFyIGRyYWdSZWN0ID0gZ2V0UmVjdCh0YXJnZXQpO1xuICAgICAgcm9vdEVsID0gZWw7XG4gICAgICBkcmFnRWwgPSB0YXJnZXQ7XG4gICAgICBwYXJlbnRFbCA9IGRyYWdFbC5wYXJlbnROb2RlO1xuICAgICAgbmV4dEVsID0gZHJhZ0VsLm5leHRTaWJsaW5nO1xuICAgICAgbGFzdERvd25FbCA9IHRhcmdldDtcbiAgICAgIGFjdGl2ZUdyb3VwID0gb3B0aW9ucy5ncm91cDtcbiAgICAgIFNvcnRhYmxlLmRyYWdnZWQgPSBkcmFnRWw7XG4gICAgICB0YXBFdnQgPSB7XG4gICAgICAgIHRhcmdldDogZHJhZ0VsLFxuICAgICAgICBjbGllbnRYOiAodG91Y2ggfHwgZXZ0KS5jbGllbnRYLFxuICAgICAgICBjbGllbnRZOiAodG91Y2ggfHwgZXZ0KS5jbGllbnRZXG4gICAgICB9O1xuICAgICAgdGFwRGlzdGFuY2VMZWZ0ID0gdGFwRXZ0LmNsaWVudFggLSBkcmFnUmVjdC5sZWZ0O1xuICAgICAgdGFwRGlzdGFuY2VUb3AgPSB0YXBFdnQuY2xpZW50WSAtIGRyYWdSZWN0LnRvcDtcbiAgICAgIHRoaXMuX2xhc3RYID0gKHRvdWNoIHx8IGV2dCkuY2xpZW50WDtcbiAgICAgIHRoaXMuX2xhc3RZID0gKHRvdWNoIHx8IGV2dCkuY2xpZW50WTtcbiAgICAgIGRyYWdFbC5zdHlsZVsnd2lsbC1jaGFuZ2UnXSA9ICdhbGwnO1xuXG4gICAgICBkcmFnU3RhcnRGbiA9IGZ1bmN0aW9uIGRyYWdTdGFydEZuKCkge1xuICAgICAgICBwbHVnaW5FdmVudCgnZGVsYXlFbmRlZCcsIF90aGlzLCB7XG4gICAgICAgICAgZXZ0OiBldnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKFNvcnRhYmxlLmV2ZW50Q2FuY2VsZWQpIHtcbiAgICAgICAgICBfdGhpcy5fb25Ecm9wKCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gRGVsYXllZCBkcmFnIGhhcyBiZWVuIHRyaWdnZXJlZFxuICAgICAgICAvLyB3ZSBjYW4gcmUtZW5hYmxlIHRoZSBldmVudHM6IHRvdWNobW92ZS9tb3VzZW1vdmVcblxuXG4gICAgICAgIF90aGlzLl9kaXNhYmxlRGVsYXllZERyYWdFdmVudHMoKTtcblxuICAgICAgICBpZiAoIUZpcmVGb3ggJiYgX3RoaXMubmF0aXZlRHJhZ2dhYmxlKSB7XG4gICAgICAgICAgZHJhZ0VsLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIH0gLy8gQmluZCB0aGUgZXZlbnRzOiBkcmFnc3RhcnQvZHJhZ2VuZFxuXG5cbiAgICAgICAgX3RoaXMuX3RyaWdnZXJEcmFnU3RhcnQoZXZ0LCB0b3VjaCk7IC8vIERyYWcgc3RhcnQgZXZlbnRcblxuXG4gICAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICBzb3J0YWJsZTogX3RoaXMsXG4gICAgICAgICAgbmFtZTogJ2Nob29zZScsXG4gICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICAgIH0pOyAvLyBDaG9zZW4gaXRlbVxuXG5cbiAgICAgICAgdG9nZ2xlQ2xhc3MoZHJhZ0VsLCBvcHRpb25zLmNob3NlbkNsYXNzLCB0cnVlKTtcbiAgICAgIH07IC8vIERpc2FibGUgXCJkcmFnZ2FibGVcIlxuXG5cbiAgICAgIG9wdGlvbnMuaWdub3JlLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoY3JpdGVyaWEpIHtcbiAgICAgICAgZmluZChkcmFnRWwsIGNyaXRlcmlhLnRyaW0oKSwgX2Rpc2FibGVEcmFnZ2FibGUpO1xuICAgICAgfSk7XG4gICAgICBvbihvd25lckRvY3VtZW50LCAnZHJhZ292ZXInLCBuZWFyZXN0RW1wdHlJbnNlcnREZXRlY3RFdmVudCk7XG4gICAgICBvbihvd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgbmVhcmVzdEVtcHR5SW5zZXJ0RGV0ZWN0RXZlbnQpO1xuICAgICAgb24ob3duZXJEb2N1bWVudCwgJ3RvdWNobW92ZScsIG5lYXJlc3RFbXB0eUluc2VydERldGVjdEV2ZW50KTtcbiAgICAgIG9uKG93bmVyRG9jdW1lbnQsICdtb3VzZXVwJywgX3RoaXMuX29uRHJvcCk7XG4gICAgICBvbihvd25lckRvY3VtZW50LCAndG91Y2hlbmQnLCBfdGhpcy5fb25Ecm9wKTtcbiAgICAgIG9uKG93bmVyRG9jdW1lbnQsICd0b3VjaGNhbmNlbCcsIF90aGlzLl9vbkRyb3ApOyAvLyBNYWtlIGRyYWdFbCBkcmFnZ2FibGUgKG11c3QgYmUgYmVmb3JlIGRlbGF5IGZvciBGaXJlRm94KVxuXG4gICAgICBpZiAoRmlyZUZveCAmJiB0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMudG91Y2hTdGFydFRocmVzaG9sZCA9IDQ7XG4gICAgICAgIGRyYWdFbC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBwbHVnaW5FdmVudCgnZGVsYXlTdGFydCcsIHRoaXMsIHtcbiAgICAgICAgZXZ0OiBldnRcbiAgICAgIH0pOyAvLyBEZWxheSBpcyBpbXBvc3NpYmxlIGZvciBuYXRpdmUgRG5EIGluIEVkZ2Ugb3IgSUVcblxuICAgICAgaWYgKG9wdGlvbnMuZGVsYXkgJiYgKCFvcHRpb25zLmRlbGF5T25Ub3VjaE9ubHkgfHwgdG91Y2gpICYmICghdGhpcy5uYXRpdmVEcmFnZ2FibGUgfHwgIShFZGdlIHx8IElFMTFPckxlc3MpKSkge1xuICAgICAgICBpZiAoU29ydGFibGUuZXZlbnRDYW5jZWxlZCkge1xuICAgICAgICAgIHRoaXMuX29uRHJvcCgpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIElmIHRoZSB1c2VyIG1vdmVzIHRoZSBwb2ludGVyIG9yIGxldCBnbyB0aGUgY2xpY2sgb3IgdG91Y2hcbiAgICAgICAgLy8gYmVmb3JlIHRoZSBkZWxheSBoYXMgYmVlbiByZWFjaGVkOlxuICAgICAgICAvLyBkaXNhYmxlIHRoZSBkZWxheWVkIGRyYWdcblxuXG4gICAgICAgIG9uKG93bmVyRG9jdW1lbnQsICdtb3VzZXVwJywgX3RoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyk7XG4gICAgICAgIG9uKG93bmVyRG9jdW1lbnQsICd0b3VjaGVuZCcsIF90aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpO1xuICAgICAgICBvbihvd25lckRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCBfdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKTtcbiAgICAgICAgb24ob3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIF90aGlzLl9kZWxheWVkRHJhZ1RvdWNoTW92ZUhhbmRsZXIpO1xuICAgICAgICBvbihvd25lckRvY3VtZW50LCAndG91Y2htb3ZlJywgX3RoaXMuX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgICAgIG9wdGlvbnMuc3VwcG9ydFBvaW50ZXIgJiYgb24ob3duZXJEb2N1bWVudCwgJ3BvaW50ZXJtb3ZlJywgX3RoaXMuX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgICAgIF90aGlzLl9kcmFnU3RhcnRUaW1lciA9IHNldFRpbWVvdXQoZHJhZ1N0YXJ0Rm4sIG9wdGlvbnMuZGVsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHJhZ1N0YXJ0Rm4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIF9kZWxheWVkRHJhZ1RvdWNoTW92ZUhhbmRsZXI6IGZ1bmN0aW9uIF9kZWxheWVkRHJhZ1RvdWNoTW92ZUhhbmRsZXIoXG4gIC8qKiBUb3VjaEV2ZW50fFBvaW50ZXJFdmVudCAqKi9cbiAgZSkge1xuICAgIHZhciB0b3VjaCA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXSA6IGU7XG5cbiAgICBpZiAoTWF0aC5tYXgoTWF0aC5hYnModG91Y2guY2xpZW50WCAtIHRoaXMuX2xhc3RYKSwgTWF0aC5hYnModG91Y2guY2xpZW50WSAtIHRoaXMuX2xhc3RZKSkgPj0gTWF0aC5mbG9vcih0aGlzLm9wdGlvbnMudG91Y2hTdGFydFRocmVzaG9sZCAvICh0aGlzLm5hdGl2ZURyYWdnYWJsZSAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxKSkpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVEZWxheWVkRHJhZygpO1xuICAgIH1cbiAgfSxcbiAgX2Rpc2FibGVEZWxheWVkRHJhZzogZnVuY3Rpb24gX2Rpc2FibGVEZWxheWVkRHJhZygpIHtcbiAgICBkcmFnRWwgJiYgX2Rpc2FibGVEcmFnZ2FibGUoZHJhZ0VsKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fZHJhZ1N0YXJ0VGltZXIpO1xuXG4gICAgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnRXZlbnRzKCk7XG4gIH0sXG4gIF9kaXNhYmxlRGVsYXllZERyYWdFdmVudHM6IGZ1bmN0aW9uIF9kaXNhYmxlRGVsYXllZERyYWdFdmVudHMoKSB7XG4gICAgdmFyIG93bmVyRG9jdW1lbnQgPSB0aGlzLmVsLm93bmVyRG9jdW1lbnQ7XG4gICAgb2ZmKG93bmVyRG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKTtcbiAgICBvZmYob3duZXJEb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKTtcbiAgICBvZmYob3duZXJEb2N1bWVudCwgJ3RvdWNoY2FuY2VsJywgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKTtcbiAgICBvZmYob3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlcik7XG4gICAgb2ZmKG93bmVyRG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLl9kZWxheWVkRHJhZ1RvdWNoTW92ZUhhbmRsZXIpO1xuICAgIG9mZihvd25lckRvY3VtZW50LCAncG9pbnRlcm1vdmUnLCB0aGlzLl9kZWxheWVkRHJhZ1RvdWNoTW92ZUhhbmRsZXIpO1xuICB9LFxuICBfdHJpZ2dlckRyYWdTdGFydDogZnVuY3Rpb24gX3RyaWdnZXJEcmFnU3RhcnQoXG4gIC8qKiBFdmVudCAqL1xuICBldnQsXG4gIC8qKiBUb3VjaCAqL1xuICB0b3VjaCkge1xuICAgIHRvdWNoID0gdG91Y2ggfHwgZXZ0LnBvaW50ZXJUeXBlID09ICd0b3VjaCcgJiYgZXZ0O1xuXG4gICAgaWYgKCF0aGlzLm5hdGl2ZURyYWdnYWJsZSB8fCB0b3VjaCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zdXBwb3J0UG9pbnRlcikge1xuICAgICAgICBvbihkb2N1bWVudCwgJ3BvaW50ZXJtb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgICAgfSBlbHNlIGlmICh0b3VjaCkge1xuICAgICAgICBvbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvbihkcmFnRWwsICdkcmFnZW5kJywgdGhpcyk7XG4gICAgICBvbihyb290RWwsICdkcmFnc3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChkb2N1bWVudC5zZWxlY3Rpb24pIHtcbiAgICAgICAgLy8gVGltZW91dCBuZWNjZXNzYXJ5IGZvciBJRTlcbiAgICAgICAgX25leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuICB9LFxuICBfZHJhZ1N0YXJ0ZWQ6IGZ1bmN0aW9uIF9kcmFnU3RhcnRlZChmYWxsYmFjaywgZXZ0KSB7XG5cbiAgICBhd2FpdGluZ0RyYWdTdGFydGVkID0gZmFsc2U7XG5cbiAgICBpZiAocm9vdEVsICYmIGRyYWdFbCkge1xuICAgICAgcGx1Z2luRXZlbnQoJ2RyYWdTdGFydGVkJywgdGhpcywge1xuICAgICAgICBldnQ6IGV2dFxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuICAgICAgICBvbihkb2N1bWVudCwgJ2RyYWdvdmVyJywgX2NoZWNrT3V0c2lkZVRhcmdldEVsKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7IC8vIEFwcGx5IGVmZmVjdFxuXG4gICAgICAhZmFsbGJhY2sgJiYgdG9nZ2xlQ2xhc3MoZHJhZ0VsLCBvcHRpb25zLmRyYWdDbGFzcywgZmFsc2UpO1xuICAgICAgdG9nZ2xlQ2xhc3MoZHJhZ0VsLCBvcHRpb25zLmdob3N0Q2xhc3MsIHRydWUpO1xuICAgICAgU29ydGFibGUuYWN0aXZlID0gdGhpcztcbiAgICAgIGZhbGxiYWNrICYmIHRoaXMuX2FwcGVuZEdob3N0KCk7IC8vIERyYWcgc3RhcnQgZXZlbnRcblxuICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICBzb3J0YWJsZTogdGhpcyxcbiAgICAgICAgbmFtZTogJ3N0YXJ0JyxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbnVsbGluZygpO1xuICAgIH1cbiAgfSxcbiAgX2VtdWxhdGVEcmFnT3ZlcjogZnVuY3Rpb24gX2VtdWxhdGVEcmFnT3ZlcigpIHtcbiAgICBpZiAodG91Y2hFdnQpIHtcbiAgICAgIHRoaXMuX2xhc3RYID0gdG91Y2hFdnQuY2xpZW50WDtcbiAgICAgIHRoaXMuX2xhc3RZID0gdG91Y2hFdnQuY2xpZW50WTtcblxuICAgICAgX2hpZGVHaG9zdEZvclRhcmdldCgpO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaEV2dC5jbGllbnRYLCB0b3VjaEV2dC5jbGllbnRZKTtcbiAgICAgIHZhciBwYXJlbnQgPSB0YXJnZXQ7XG5cbiAgICAgIHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0LnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnNoYWRvd1Jvb3QuZWxlbWVudEZyb21Qb2ludCh0b3VjaEV2dC5jbGllbnRYLCB0b3VjaEV2dC5jbGllbnRZKTtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gcGFyZW50KSBicmVhaztcbiAgICAgICAgcGFyZW50ID0gdGFyZ2V0O1xuICAgICAgfVxuXG4gICAgICBkcmFnRWwucGFyZW50Tm9kZVtleHBhbmRvXS5faXNPdXRzaWRlVGhpc0VsKHRhcmdldCk7XG5cbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGlmIChwYXJlbnRbZXhwYW5kb10pIHtcbiAgICAgICAgICAgIHZhciBpbnNlcnRlZCA9IHZvaWQgMDtcbiAgICAgICAgICAgIGluc2VydGVkID0gcGFyZW50W2V4cGFuZG9dLl9vbkRyYWdPdmVyKHtcbiAgICAgICAgICAgICAgY2xpZW50WDogdG91Y2hFdnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgY2xpZW50WTogdG91Y2hFdnQuY2xpZW50WSxcbiAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgIHJvb3RFbDogcGFyZW50XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGluc2VydGVkICYmICF0aGlzLm9wdGlvbnMuZHJhZ292ZXJCdWJibGUpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFyZ2V0ID0gcGFyZW50OyAvLyBzdG9yZSBsYXN0IGVsZW1lbnRcbiAgICAgICAgfVxuICAgICAgICAvKiBqc2hpbnQgYm9zczp0cnVlICovXG4gICAgICAgIHdoaWxlIChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSk7XG4gICAgICB9XG5cbiAgICAgIF91bmhpZGVHaG9zdEZvclRhcmdldCgpO1xuICAgIH1cbiAgfSxcbiAgX29uVG91Y2hNb3ZlOiBmdW5jdGlvbiBfb25Ub3VjaE1vdmUoXG4gIC8qKlRvdWNoRXZlbnQqL1xuICBldnQpIHtcbiAgICBpZiAodGFwRXZ0KSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICBmYWxsYmFja1RvbGVyYW5jZSA9IG9wdGlvbnMuZmFsbGJhY2tUb2xlcmFuY2UsXG4gICAgICAgICAgZmFsbGJhY2tPZmZzZXQgPSBvcHRpb25zLmZhbGxiYWNrT2Zmc2V0LFxuICAgICAgICAgIHRvdWNoID0gZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXSA6IGV2dCxcbiAgICAgICAgICBnaG9zdE1hdHJpeCA9IGdob3N0RWwgJiYgbWF0cml4KGdob3N0RWwsIHRydWUpLFxuICAgICAgICAgIHNjYWxlWCA9IGdob3N0RWwgJiYgZ2hvc3RNYXRyaXggJiYgZ2hvc3RNYXRyaXguYSxcbiAgICAgICAgICBzY2FsZVkgPSBnaG9zdEVsICYmIGdob3N0TWF0cml4ICYmIGdob3N0TWF0cml4LmQsXG4gICAgICAgICAgcmVsYXRpdmVTY3JvbGxPZmZzZXQgPSBQb3NpdGlvbkdob3N0QWJzb2x1dGVseSAmJiBnaG9zdFJlbGF0aXZlUGFyZW50ICYmIGdldFJlbGF0aXZlU2Nyb2xsT2Zmc2V0KGdob3N0UmVsYXRpdmVQYXJlbnQpLFxuICAgICAgICAgIGR4ID0gKHRvdWNoLmNsaWVudFggLSB0YXBFdnQuY2xpZW50WCArIGZhbGxiYWNrT2Zmc2V0LngpIC8gKHNjYWxlWCB8fCAxKSArIChyZWxhdGl2ZVNjcm9sbE9mZnNldCA/IHJlbGF0aXZlU2Nyb2xsT2Zmc2V0WzBdIC0gZ2hvc3RSZWxhdGl2ZVBhcmVudEluaXRpYWxTY3JvbGxbMF0gOiAwKSAvIChzY2FsZVggfHwgMSksXG4gICAgICAgICAgZHkgPSAodG91Y2guY2xpZW50WSAtIHRhcEV2dC5jbGllbnRZICsgZmFsbGJhY2tPZmZzZXQueSkgLyAoc2NhbGVZIHx8IDEpICsgKHJlbGF0aXZlU2Nyb2xsT2Zmc2V0ID8gcmVsYXRpdmVTY3JvbGxPZmZzZXRbMV0gLSBnaG9zdFJlbGF0aXZlUGFyZW50SW5pdGlhbFNjcm9sbFsxXSA6IDApIC8gKHNjYWxlWSB8fCAxKTsgLy8gb25seSBzZXQgdGhlIHN0YXR1cyB0byBkcmFnZ2luZywgd2hlbiB3ZSBhcmUgYWN0dWFsbHkgZHJhZ2dpbmdcblxuICAgICAgaWYgKCFTb3J0YWJsZS5hY3RpdmUgJiYgIWF3YWl0aW5nRHJhZ1N0YXJ0ZWQpIHtcbiAgICAgICAgaWYgKGZhbGxiYWNrVG9sZXJhbmNlICYmIE1hdGgubWF4KE1hdGguYWJzKHRvdWNoLmNsaWVudFggLSB0aGlzLl9sYXN0WCksIE1hdGguYWJzKHRvdWNoLmNsaWVudFkgLSB0aGlzLl9sYXN0WSkpIDwgZmFsbGJhY2tUb2xlcmFuY2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vbkRyYWdTdGFydChldnQsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2hvc3RFbCkge1xuICAgICAgICBpZiAoZ2hvc3RNYXRyaXgpIHtcbiAgICAgICAgICBnaG9zdE1hdHJpeC5lICs9IGR4IC0gKGxhc3REeCB8fCAwKTtcbiAgICAgICAgICBnaG9zdE1hdHJpeC5mICs9IGR5IC0gKGxhc3REeSB8fCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnaG9zdE1hdHJpeCA9IHtcbiAgICAgICAgICAgIGE6IDEsXG4gICAgICAgICAgICBiOiAwLFxuICAgICAgICAgICAgYzogMCxcbiAgICAgICAgICAgIGQ6IDEsXG4gICAgICAgICAgICBlOiBkeCxcbiAgICAgICAgICAgIGY6IGR5XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjc3NNYXRyaXggPSBcIm1hdHJpeChcIi5jb25jYXQoZ2hvc3RNYXRyaXguYSwgXCIsXCIpLmNvbmNhdChnaG9zdE1hdHJpeC5iLCBcIixcIikuY29uY2F0KGdob3N0TWF0cml4LmMsIFwiLFwiKS5jb25jYXQoZ2hvc3RNYXRyaXguZCwgXCIsXCIpLmNvbmNhdChnaG9zdE1hdHJpeC5lLCBcIixcIikuY29uY2F0KGdob3N0TWF0cml4LmYsIFwiKVwiKTtcbiAgICAgICAgY3NzKGdob3N0RWwsICd3ZWJraXRUcmFuc2Zvcm0nLCBjc3NNYXRyaXgpO1xuICAgICAgICBjc3MoZ2hvc3RFbCwgJ21velRyYW5zZm9ybScsIGNzc01hdHJpeCk7XG4gICAgICAgIGNzcyhnaG9zdEVsLCAnbXNUcmFuc2Zvcm0nLCBjc3NNYXRyaXgpO1xuICAgICAgICBjc3MoZ2hvc3RFbCwgJ3RyYW5zZm9ybScsIGNzc01hdHJpeCk7XG4gICAgICAgIGxhc3REeCA9IGR4O1xuICAgICAgICBsYXN0RHkgPSBkeTtcbiAgICAgICAgdG91Y2hFdnQgPSB0b3VjaDtcbiAgICAgIH1cblxuICAgICAgZXZ0LmNhbmNlbGFibGUgJiYgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LFxuICBfYXBwZW5kR2hvc3Q6IGZ1bmN0aW9uIF9hcHBlbmRHaG9zdCgpIHtcbiAgICAvLyBCdWcgaWYgdXNpbmcgc2NhbGUoKTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjYzNzA1OFxuICAgIC8vIE5vdCBiZWluZyBhZGp1c3RlZCBmb3JcbiAgICBpZiAoIWdob3N0RWwpIHtcbiAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLm9wdGlvbnMuZmFsbGJhY2tPbkJvZHkgPyBkb2N1bWVudC5ib2R5IDogcm9vdEVsLFxuICAgICAgICAgIHJlY3QgPSBnZXRSZWN0KGRyYWdFbCwgdHJ1ZSwgUG9zaXRpb25HaG9zdEFic29sdXRlbHksIHRydWUsIGNvbnRhaW5lciksXG4gICAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9uczsgLy8gUG9zaXRpb24gYWJzb2x1dGVseVxuXG4gICAgICBpZiAoUG9zaXRpb25HaG9zdEFic29sdXRlbHkpIHtcbiAgICAgICAgLy8gR2V0IHJlbGF0aXZlbHkgcG9zaXRpb25lZCBwYXJlbnRcbiAgICAgICAgZ2hvc3RSZWxhdGl2ZVBhcmVudCA9IGNvbnRhaW5lcjtcblxuICAgICAgICB3aGlsZSAoY3NzKGdob3N0UmVsYXRpdmVQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJyAmJiBjc3MoZ2hvc3RSZWxhdGl2ZVBhcmVudCwgJ3RyYW5zZm9ybScpID09PSAnbm9uZScgJiYgZ2hvc3RSZWxhdGl2ZVBhcmVudCAhPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICBnaG9zdFJlbGF0aXZlUGFyZW50ID0gZ2hvc3RSZWxhdGl2ZVBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdob3N0UmVsYXRpdmVQYXJlbnQgIT09IGRvY3VtZW50LmJvZHkgJiYgZ2hvc3RSZWxhdGl2ZVBhcmVudCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKGdob3N0UmVsYXRpdmVQYXJlbnQgPT09IGRvY3VtZW50KSBnaG9zdFJlbGF0aXZlUGFyZW50ID0gZ2V0V2luZG93U2Nyb2xsaW5nRWxlbWVudCgpO1xuICAgICAgICAgIHJlY3QudG9wICs9IGdob3N0UmVsYXRpdmVQYXJlbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgIHJlY3QubGVmdCArPSBnaG9zdFJlbGF0aXZlUGFyZW50LnNjcm9sbExlZnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2hvc3RSZWxhdGl2ZVBhcmVudCA9IGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdob3N0UmVsYXRpdmVQYXJlbnRJbml0aWFsU2Nyb2xsID0gZ2V0UmVsYXRpdmVTY3JvbGxPZmZzZXQoZ2hvc3RSZWxhdGl2ZVBhcmVudCk7XG4gICAgICB9XG5cbiAgICAgIGdob3N0RWwgPSBkcmFnRWwuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgdG9nZ2xlQ2xhc3MoZ2hvc3RFbCwgb3B0aW9ucy5naG9zdENsYXNzLCBmYWxzZSk7XG4gICAgICB0b2dnbGVDbGFzcyhnaG9zdEVsLCBvcHRpb25zLmZhbGxiYWNrQ2xhc3MsIHRydWUpO1xuICAgICAgdG9nZ2xlQ2xhc3MoZ2hvc3RFbCwgb3B0aW9ucy5kcmFnQ2xhc3MsIHRydWUpO1xuICAgICAgY3NzKGdob3N0RWwsICd0cmFuc2l0aW9uJywgJycpO1xuICAgICAgY3NzKGdob3N0RWwsICd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgICBjc3MoZ2hvc3RFbCwgJ2JveC1zaXppbmcnLCAnYm9yZGVyLWJveCcpO1xuICAgICAgY3NzKGdob3N0RWwsICdtYXJnaW4nLCAwKTtcbiAgICAgIGNzcyhnaG9zdEVsLCAndG9wJywgcmVjdC50b3ApO1xuICAgICAgY3NzKGdob3N0RWwsICdsZWZ0JywgcmVjdC5sZWZ0KTtcbiAgICAgIGNzcyhnaG9zdEVsLCAnd2lkdGgnLCByZWN0LndpZHRoKTtcbiAgICAgIGNzcyhnaG9zdEVsLCAnaGVpZ2h0JywgcmVjdC5oZWlnaHQpO1xuICAgICAgY3NzKGdob3N0RWwsICdvcGFjaXR5JywgJzAuOCcpO1xuICAgICAgY3NzKGdob3N0RWwsICdwb3NpdGlvbicsIFBvc2l0aW9uR2hvc3RBYnNvbHV0ZWx5ID8gJ2Fic29sdXRlJyA6ICdmaXhlZCcpO1xuICAgICAgY3NzKGdob3N0RWwsICd6SW5kZXgnLCAnMTAwMDAwJyk7XG4gICAgICBjc3MoZ2hvc3RFbCwgJ3BvaW50ZXJFdmVudHMnLCAnbm9uZScpO1xuICAgICAgU29ydGFibGUuZ2hvc3QgPSBnaG9zdEVsO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdob3N0RWwpOyAvLyBTZXQgdHJhbnNmb3JtLW9yaWdpblxuXG4gICAgICBjc3MoZ2hvc3RFbCwgJ3RyYW5zZm9ybS1vcmlnaW4nLCB0YXBEaXN0YW5jZUxlZnQgLyBwYXJzZUludChnaG9zdEVsLnN0eWxlLndpZHRoKSAqIDEwMCArICclICcgKyB0YXBEaXN0YW5jZVRvcCAvIHBhcnNlSW50KGdob3N0RWwuc3R5bGUuaGVpZ2h0KSAqIDEwMCArICclJyk7XG4gICAgfVxuICB9LFxuICBfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uIF9vbkRyYWdTdGFydChcbiAgLyoqRXZlbnQqL1xuICBldnQsXG4gIC8qKmJvb2xlYW4qL1xuICBmYWxsYmFjaykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgZGF0YVRyYW5zZmVyID0gZXZ0LmRhdGFUcmFuc2ZlcjtcbiAgICB2YXIgb3B0aW9ucyA9IF90aGlzLm9wdGlvbnM7XG4gICAgcGx1Z2luRXZlbnQoJ2RyYWdTdGFydCcsIHRoaXMsIHtcbiAgICAgIGV2dDogZXZ0XG4gICAgfSk7XG5cbiAgICBpZiAoU29ydGFibGUuZXZlbnRDYW5jZWxlZCkge1xuICAgICAgdGhpcy5fb25Ecm9wKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwbHVnaW5FdmVudCgnc2V0dXBDbG9uZScsIHRoaXMpO1xuXG4gICAgaWYgKCFTb3J0YWJsZS5ldmVudENhbmNlbGVkKSB7XG4gICAgICBjbG9uZUVsID0gY2xvbmUoZHJhZ0VsKTtcbiAgICAgIGNsb25lRWwuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICBjbG9uZUVsLnN0eWxlWyd3aWxsLWNoYW5nZSddID0gJyc7XG5cbiAgICAgIHRoaXMuX2hpZGVDbG9uZSgpO1xuXG4gICAgICB0b2dnbGVDbGFzcyhjbG9uZUVsLCB0aGlzLm9wdGlvbnMuY2hvc2VuQ2xhc3MsIGZhbHNlKTtcbiAgICAgIFNvcnRhYmxlLmNsb25lID0gY2xvbmVFbDtcbiAgICB9IC8vICMxMTQzOiBJRnJhbWUgc3VwcG9ydCB3b3JrYXJvdW5kXG5cblxuICAgIF90aGlzLmNsb25lSWQgPSBfbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgcGx1Z2luRXZlbnQoJ2Nsb25lJywgX3RoaXMpO1xuICAgICAgaWYgKFNvcnRhYmxlLmV2ZW50Q2FuY2VsZWQpIHJldHVybjtcblxuICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLnJlbW92ZUNsb25lT25IaWRlKSB7XG4gICAgICAgIHJvb3RFbC5pbnNlcnRCZWZvcmUoY2xvbmVFbCwgZHJhZ0VsKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuX2hpZGVDbG9uZSgpO1xuXG4gICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgIHNvcnRhYmxlOiBfdGhpcyxcbiAgICAgICAgbmFtZTogJ2Nsb25lJ1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgIWZhbGxiYWNrICYmIHRvZ2dsZUNsYXNzKGRyYWdFbCwgb3B0aW9ucy5kcmFnQ2xhc3MsIHRydWUpOyAvLyBTZXQgcHJvcGVyIGRyb3AgZXZlbnRzXG5cbiAgICBpZiAoZmFsbGJhY2spIHtcbiAgICAgIGlnbm9yZU5leHRDbGljayA9IHRydWU7XG4gICAgICBfdGhpcy5fbG9vcElkID0gc2V0SW50ZXJ2YWwoX3RoaXMuX2VtdWxhdGVEcmFnT3ZlciwgNTApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVbmRvIHdoYXQgd2FzIHNldCBpbiBfcHJlcGFyZURyYWdTdGFydCBiZWZvcmUgZHJhZyBzdGFydGVkXG4gICAgICBvZmYoZG9jdW1lbnQsICdtb3VzZXVwJywgX3RoaXMuX29uRHJvcCk7XG4gICAgICBvZmYoZG9jdW1lbnQsICd0b3VjaGVuZCcsIF90aGlzLl9vbkRyb3ApO1xuICAgICAgb2ZmKGRvY3VtZW50LCAndG91Y2hjYW5jZWwnLCBfdGhpcy5fb25Ecm9wKTtcblxuICAgICAgaWYgKGRhdGFUcmFuc2Zlcikge1xuICAgICAgICBkYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgICAgb3B0aW9ucy5zZXREYXRhICYmIG9wdGlvbnMuc2V0RGF0YS5jYWxsKF90aGlzLCBkYXRhVHJhbnNmZXIsIGRyYWdFbCk7XG4gICAgICB9XG5cbiAgICAgIG9uKGRvY3VtZW50LCAnZHJvcCcsIF90aGlzKTsgLy8gIzEyNzYgZml4OlxuXG4gICAgICBjc3MoZHJhZ0VsLCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVooMCknKTtcbiAgICB9XG5cbiAgICBhd2FpdGluZ0RyYWdTdGFydGVkID0gdHJ1ZTtcbiAgICBfdGhpcy5fZHJhZ1N0YXJ0SWQgPSBfbmV4dFRpY2soX3RoaXMuX2RyYWdTdGFydGVkLmJpbmQoX3RoaXMsIGZhbGxiYWNrLCBldnQpKTtcbiAgICBvbihkb2N1bWVudCwgJ3NlbGVjdHN0YXJ0JywgX3RoaXMpO1xuICAgIG1vdmVkID0gdHJ1ZTtcblxuICAgIGlmIChTYWZhcmkpIHtcbiAgICAgIGNzcyhkb2N1bWVudC5ib2R5LCAndXNlci1zZWxlY3QnLCAnbm9uZScpO1xuICAgIH1cbiAgfSxcbiAgLy8gUmV0dXJucyB0cnVlIC0gaWYgbm8gZnVydGhlciBhY3Rpb24gaXMgbmVlZGVkIChlaXRoZXIgaW5zZXJ0ZWQgb3IgYW5vdGhlciBjb25kaXRpb24pXG4gIF9vbkRyYWdPdmVyOiBmdW5jdGlvbiBfb25EcmFnT3ZlcihcbiAgLyoqRXZlbnQqL1xuICBldnQpIHtcbiAgICB2YXIgZWwgPSB0aGlzLmVsLFxuICAgICAgICB0YXJnZXQgPSBldnQudGFyZ2V0LFxuICAgICAgICBkcmFnUmVjdCxcbiAgICAgICAgdGFyZ2V0UmVjdCxcbiAgICAgICAgcmV2ZXJ0LFxuICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBncm91cCA9IG9wdGlvbnMuZ3JvdXAsXG4gICAgICAgIGFjdGl2ZVNvcnRhYmxlID0gU29ydGFibGUuYWN0aXZlLFxuICAgICAgICBpc093bmVyID0gYWN0aXZlR3JvdXAgPT09IGdyb3VwLFxuICAgICAgICBjYW5Tb3J0ID0gb3B0aW9ucy5zb3J0LFxuICAgICAgICBmcm9tU29ydGFibGUgPSBwdXRTb3J0YWJsZSB8fCBhY3RpdmVTb3J0YWJsZSxcbiAgICAgICAgdmVydGljYWwsXG4gICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgY29tcGxldGVkRmlyZWQgPSBmYWxzZTtcblxuICAgIGlmIChfc2lsZW50KSByZXR1cm47XG5cbiAgICBmdW5jdGlvbiBkcmFnT3ZlckV2ZW50KG5hbWUsIGV4dHJhKSB7XG4gICAgICBwbHVnaW5FdmVudChuYW1lLCBfdGhpcywgX29iamVjdFNwcmVhZDIoe1xuICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgaXNPd25lcjogaXNPd25lcixcbiAgICAgICAgYXhpczogdmVydGljYWwgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnLFxuICAgICAgICByZXZlcnQ6IHJldmVydCxcbiAgICAgICAgZHJhZ1JlY3Q6IGRyYWdSZWN0LFxuICAgICAgICB0YXJnZXRSZWN0OiB0YXJnZXRSZWN0LFxuICAgICAgICBjYW5Tb3J0OiBjYW5Tb3J0LFxuICAgICAgICBmcm9tU29ydGFibGU6IGZyb21Tb3J0YWJsZSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIGNvbXBsZXRlZDogY29tcGxldGVkLFxuICAgICAgICBvbk1vdmU6IGZ1bmN0aW9uIG9uTW92ZSh0YXJnZXQsIGFmdGVyKSB7XG4gICAgICAgICAgcmV0dXJuIF9vbk1vdmUocm9vdEVsLCBlbCwgZHJhZ0VsLCBkcmFnUmVjdCwgdGFyZ2V0LCBnZXRSZWN0KHRhcmdldCksIGV2dCwgYWZ0ZXIpO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VkOiBjaGFuZ2VkXG4gICAgICB9LCBleHRyYSkpO1xuICAgIH0gLy8gQ2FwdHVyZSBhbmltYXRpb24gc3RhdGVcblxuXG4gICAgZnVuY3Rpb24gY2FwdHVyZSgpIHtcbiAgICAgIGRyYWdPdmVyRXZlbnQoJ2RyYWdPdmVyQW5pbWF0aW9uQ2FwdHVyZScpO1xuXG4gICAgICBfdGhpcy5jYXB0dXJlQW5pbWF0aW9uU3RhdGUoKTtcblxuICAgICAgaWYgKF90aGlzICE9PSBmcm9tU29ydGFibGUpIHtcbiAgICAgICAgZnJvbVNvcnRhYmxlLmNhcHR1cmVBbmltYXRpb25TdGF0ZSgpO1xuICAgICAgfVxuICAgIH0gLy8gUmV0dXJuIGludm9jYXRpb24gd2hlbiBkcmFnRWwgaXMgaW5zZXJ0ZWQgKG9yIGNvbXBsZXRlZClcblxuXG4gICAgZnVuY3Rpb24gY29tcGxldGVkKGluc2VydGlvbikge1xuICAgICAgZHJhZ092ZXJFdmVudCgnZHJhZ092ZXJDb21wbGV0ZWQnLCB7XG4gICAgICAgIGluc2VydGlvbjogaW5zZXJ0aW9uXG4gICAgICB9KTtcblxuICAgICAgaWYgKGluc2VydGlvbikge1xuICAgICAgICAvLyBDbG9uZXMgbXVzdCBiZSBoaWRkZW4gYmVmb3JlIGZvbGRpbmcgYW5pbWF0aW9uIHRvIGNhcHR1cmUgZHJhZ1JlY3RBYnNvbHV0ZSBwcm9wZXJseVxuICAgICAgICBpZiAoaXNPd25lcikge1xuICAgICAgICAgIGFjdGl2ZVNvcnRhYmxlLl9oaWRlQ2xvbmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVTb3J0YWJsZS5fc2hvd0Nsb25lKF90aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfdGhpcyAhPT0gZnJvbVNvcnRhYmxlKSB7XG4gICAgICAgICAgLy8gU2V0IGdob3N0IGNsYXNzIHRvIG5ldyBzb3J0YWJsZSdzIGdob3N0IGNsYXNzXG4gICAgICAgICAgdG9nZ2xlQ2xhc3MoZHJhZ0VsLCBwdXRTb3J0YWJsZSA/IHB1dFNvcnRhYmxlLm9wdGlvbnMuZ2hvc3RDbGFzcyA6IGFjdGl2ZVNvcnRhYmxlLm9wdGlvbnMuZ2hvc3RDbGFzcywgZmFsc2UpO1xuICAgICAgICAgIHRvZ2dsZUNsYXNzKGRyYWdFbCwgb3B0aW9ucy5naG9zdENsYXNzLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwdXRTb3J0YWJsZSAhPT0gX3RoaXMgJiYgX3RoaXMgIT09IFNvcnRhYmxlLmFjdGl2ZSkge1xuICAgICAgICAgIHB1dFNvcnRhYmxlID0gX3RoaXM7XG4gICAgICAgIH0gZWxzZSBpZiAoX3RoaXMgPT09IFNvcnRhYmxlLmFjdGl2ZSAmJiBwdXRTb3J0YWJsZSkge1xuICAgICAgICAgIHB1dFNvcnRhYmxlID0gbnVsbDtcbiAgICAgICAgfSAvLyBBbmltYXRpb25cblxuXG4gICAgICAgIGlmIChmcm9tU29ydGFibGUgPT09IF90aGlzKSB7XG4gICAgICAgICAgX3RoaXMuX2lnbm9yZVdoaWxlQW5pbWF0aW5nID0gdGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuYW5pbWF0ZUFsbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZHJhZ092ZXJFdmVudCgnZHJhZ092ZXJBbmltYXRpb25Db21wbGV0ZScpO1xuICAgICAgICAgIF90aGlzLl9pZ25vcmVXaGlsZUFuaW1hdGluZyA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChfdGhpcyAhPT0gZnJvbVNvcnRhYmxlKSB7XG4gICAgICAgICAgZnJvbVNvcnRhYmxlLmFuaW1hdGVBbGwoKTtcbiAgICAgICAgICBmcm9tU29ydGFibGUuX2lnbm9yZVdoaWxlQW5pbWF0aW5nID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBOdWxsIGxhc3RUYXJnZXQgaWYgaXQgaXMgbm90IGluc2lkZSBhIHByZXZpb3VzbHkgc3dhcHBlZCBlbGVtZW50XG5cblxuICAgICAgaWYgKHRhcmdldCA9PT0gZHJhZ0VsICYmICFkcmFnRWwuYW5pbWF0ZWQgfHwgdGFyZ2V0ID09PSBlbCAmJiAhdGFyZ2V0LmFuaW1hdGVkKSB7XG4gICAgICAgIGxhc3RUYXJnZXQgPSBudWxsO1xuICAgICAgfSAvLyBubyBidWJibGluZyBhbmQgbm90IGZhbGxiYWNrXG5cblxuICAgICAgaWYgKCFvcHRpb25zLmRyYWdvdmVyQnViYmxlICYmICFldnQucm9vdEVsICYmIHRhcmdldCAhPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgZHJhZ0VsLnBhcmVudE5vZGVbZXhwYW5kb10uX2lzT3V0c2lkZVRoaXNFbChldnQudGFyZ2V0KTsgLy8gRG8gbm90IGRldGVjdCBmb3IgZW1wdHkgaW5zZXJ0IGlmIGFscmVhZHkgaW5zZXJ0ZWRcblxuXG4gICAgICAgICFpbnNlcnRpb24gJiYgbmVhcmVzdEVtcHR5SW5zZXJ0RGV0ZWN0RXZlbnQoZXZ0KTtcbiAgICAgIH1cblxuICAgICAgIW9wdGlvbnMuZHJhZ292ZXJCdWJibGUgJiYgZXZ0LnN0b3BQcm9wYWdhdGlvbiAmJiBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICByZXR1cm4gY29tcGxldGVkRmlyZWQgPSB0cnVlO1xuICAgIH0gLy8gQ2FsbCB3aGVuIGRyYWdFbCBoYXMgYmVlbiBpbnNlcnRlZFxuXG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VkKCkge1xuICAgICAgbmV3SW5kZXggPSBpbmRleChkcmFnRWwpO1xuICAgICAgbmV3RHJhZ2dhYmxlSW5kZXggPSBpbmRleChkcmFnRWwsIG9wdGlvbnMuZHJhZ2dhYmxlKTtcblxuICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICBzb3J0YWJsZTogX3RoaXMsXG4gICAgICAgIG5hbWU6ICdjaGFuZ2UnLFxuICAgICAgICB0b0VsOiBlbCxcbiAgICAgICAgbmV3SW5kZXg6IG5ld0luZGV4LFxuICAgICAgICBuZXdEcmFnZ2FibGVJbmRleDogbmV3RHJhZ2dhYmxlSW5kZXgsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2dFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGV2dC5wcmV2ZW50RGVmYXVsdCAhPT0gdm9pZCAwKSB7XG4gICAgICBldnQuY2FuY2VsYWJsZSAmJiBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB0YXJnZXQgPSBjbG9zZXN0KHRhcmdldCwgb3B0aW9ucy5kcmFnZ2FibGUsIGVsLCB0cnVlKTtcbiAgICBkcmFnT3ZlckV2ZW50KCdkcmFnT3ZlcicpO1xuICAgIGlmIChTb3J0YWJsZS5ldmVudENhbmNlbGVkKSByZXR1cm4gY29tcGxldGVkRmlyZWQ7XG5cbiAgICBpZiAoZHJhZ0VsLmNvbnRhaW5zKGV2dC50YXJnZXQpIHx8IHRhcmdldC5hbmltYXRlZCAmJiB0YXJnZXQuYW5pbWF0aW5nWCAmJiB0YXJnZXQuYW5pbWF0aW5nWSB8fCBfdGhpcy5faWdub3JlV2hpbGVBbmltYXRpbmcgPT09IHRhcmdldCkge1xuICAgICAgcmV0dXJuIGNvbXBsZXRlZChmYWxzZSk7XG4gICAgfVxuXG4gICAgaWdub3JlTmV4dENsaWNrID0gZmFsc2U7XG5cbiAgICBpZiAoYWN0aXZlU29ydGFibGUgJiYgIW9wdGlvbnMuZGlzYWJsZWQgJiYgKGlzT3duZXIgPyBjYW5Tb3J0IHx8IChyZXZlcnQgPSBwYXJlbnRFbCAhPT0gcm9vdEVsKSAvLyBSZXZlcnRpbmcgaXRlbSBpbnRvIHRoZSBvcmlnaW5hbCBsaXN0XG4gICAgOiBwdXRTb3J0YWJsZSA9PT0gdGhpcyB8fCAodGhpcy5sYXN0UHV0TW9kZSA9IGFjdGl2ZUdyb3VwLmNoZWNrUHVsbCh0aGlzLCBhY3RpdmVTb3J0YWJsZSwgZHJhZ0VsLCBldnQpKSAmJiBncm91cC5jaGVja1B1dCh0aGlzLCBhY3RpdmVTb3J0YWJsZSwgZHJhZ0VsLCBldnQpKSkge1xuICAgICAgdmVydGljYWwgPSB0aGlzLl9nZXREaXJlY3Rpb24oZXZ0LCB0YXJnZXQpID09PSAndmVydGljYWwnO1xuICAgICAgZHJhZ1JlY3QgPSBnZXRSZWN0KGRyYWdFbCk7XG4gICAgICBkcmFnT3ZlckV2ZW50KCdkcmFnT3ZlclZhbGlkJyk7XG4gICAgICBpZiAoU29ydGFibGUuZXZlbnRDYW5jZWxlZCkgcmV0dXJuIGNvbXBsZXRlZEZpcmVkO1xuXG4gICAgICBpZiAocmV2ZXJ0KSB7XG4gICAgICAgIHBhcmVudEVsID0gcm9vdEVsOyAvLyBhY3R1YWxpemF0aW9uXG5cbiAgICAgICAgY2FwdHVyZSgpO1xuXG4gICAgICAgIHRoaXMuX2hpZGVDbG9uZSgpO1xuXG4gICAgICAgIGRyYWdPdmVyRXZlbnQoJ3JldmVydCcpO1xuXG4gICAgICAgIGlmICghU29ydGFibGUuZXZlbnRDYW5jZWxlZCkge1xuICAgICAgICAgIGlmIChuZXh0RWwpIHtcbiAgICAgICAgICAgIHJvb3RFbC5pbnNlcnRCZWZvcmUoZHJhZ0VsLCBuZXh0RWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb290RWwuYXBwZW5kQ2hpbGQoZHJhZ0VsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcGxldGVkKHRydWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZWxMYXN0Q2hpbGQgPSBsYXN0Q2hpbGQoZWwsIG9wdGlvbnMuZHJhZ2dhYmxlKTtcblxuICAgICAgaWYgKCFlbExhc3RDaGlsZCB8fCBfZ2hvc3RJc0xhc3QoZXZ0LCB2ZXJ0aWNhbCwgdGhpcykgJiYgIWVsTGFzdENoaWxkLmFuaW1hdGVkKSB7XG4gICAgICAgIC8vIEluc2VydCB0byBlbmQgb2YgbGlzdFxuICAgICAgICAvLyBJZiBhbHJlYWR5IGF0IGVuZCBvZiBsaXN0OiBEbyBub3QgaW5zZXJ0XG4gICAgICAgIGlmIChlbExhc3RDaGlsZCA9PT0gZHJhZ0VsKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbXBsZXRlZChmYWxzZSk7XG4gICAgICAgIH0gLy8gaWYgdGhlcmUgaXMgYSBsYXN0IGVsZW1lbnQsIGl0IGlzIHRoZSB0YXJnZXRcblxuXG4gICAgICAgIGlmIChlbExhc3RDaGlsZCAmJiBlbCA9PT0gZXZ0LnRhcmdldCkge1xuICAgICAgICAgIHRhcmdldCA9IGVsTGFzdENoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgIHRhcmdldFJlY3QgPSBnZXRSZWN0KHRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX29uTW92ZShyb290RWwsIGVsLCBkcmFnRWwsIGRyYWdSZWN0LCB0YXJnZXQsIHRhcmdldFJlY3QsIGV2dCwgISF0YXJnZXQpICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNhcHR1cmUoKTtcbiAgICAgICAgICBlbC5hcHBlbmRDaGlsZChkcmFnRWwpO1xuICAgICAgICAgIHBhcmVudEVsID0gZWw7IC8vIGFjdHVhbGl6YXRpb25cblxuICAgICAgICAgIGNoYW5nZWQoKTtcbiAgICAgICAgICByZXR1cm4gY29tcGxldGVkKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsTGFzdENoaWxkICYmIF9naG9zdElzRmlyc3QoZXZ0LCB2ZXJ0aWNhbCwgdGhpcykpIHtcbiAgICAgICAgLy8gSW5zZXJ0IHRvIHN0YXJ0IG9mIGxpc3RcbiAgICAgICAgdmFyIGZpcnN0Q2hpbGQgPSBnZXRDaGlsZChlbCwgMCwgb3B0aW9ucywgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKGZpcnN0Q2hpbGQgPT09IGRyYWdFbCkge1xuICAgICAgICAgIHJldHVybiBjb21wbGV0ZWQoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0ID0gZmlyc3RDaGlsZDtcbiAgICAgICAgdGFyZ2V0UmVjdCA9IGdldFJlY3QodGFyZ2V0KTtcblxuICAgICAgICBpZiAoX29uTW92ZShyb290RWwsIGVsLCBkcmFnRWwsIGRyYWdSZWN0LCB0YXJnZXQsIHRhcmdldFJlY3QsIGV2dCwgZmFsc2UpICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNhcHR1cmUoKTtcbiAgICAgICAgICBlbC5pbnNlcnRCZWZvcmUoZHJhZ0VsLCBmaXJzdENoaWxkKTtcbiAgICAgICAgICBwYXJlbnRFbCA9IGVsOyAvLyBhY3R1YWxpemF0aW9uXG5cbiAgICAgICAgICBjaGFuZ2VkKCk7XG4gICAgICAgICAgcmV0dXJuIGNvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQucGFyZW50Tm9kZSA9PT0gZWwpIHtcbiAgICAgICAgdGFyZ2V0UmVjdCA9IGdldFJlY3QodGFyZ2V0KTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IDAsXG4gICAgICAgICAgICB0YXJnZXRCZWZvcmVGaXJzdFN3YXAsXG4gICAgICAgICAgICBkaWZmZXJlbnRMZXZlbCA9IGRyYWdFbC5wYXJlbnROb2RlICE9PSBlbCxcbiAgICAgICAgICAgIGRpZmZlcmVudFJvd0NvbCA9ICFfZHJhZ0VsSW5Sb3dDb2x1bW4oZHJhZ0VsLmFuaW1hdGVkICYmIGRyYWdFbC50b1JlY3QgfHwgZHJhZ1JlY3QsIHRhcmdldC5hbmltYXRlZCAmJiB0YXJnZXQudG9SZWN0IHx8IHRhcmdldFJlY3QsIHZlcnRpY2FsKSxcbiAgICAgICAgICAgIHNpZGUxID0gdmVydGljYWwgPyAndG9wJyA6ICdsZWZ0JyxcbiAgICAgICAgICAgIHNjcm9sbGVkUGFzdFRvcCA9IGlzU2Nyb2xsZWRQYXN0KHRhcmdldCwgJ3RvcCcsICd0b3AnKSB8fCBpc1Njcm9sbGVkUGFzdChkcmFnRWwsICd0b3AnLCAndG9wJyksXG4gICAgICAgICAgICBzY3JvbGxCZWZvcmUgPSBzY3JvbGxlZFBhc3RUb3AgPyBzY3JvbGxlZFBhc3RUb3Auc2Nyb2xsVG9wIDogdm9pZCAwO1xuXG4gICAgICAgIGlmIChsYXN0VGFyZ2V0ICE9PSB0YXJnZXQpIHtcbiAgICAgICAgICB0YXJnZXRCZWZvcmVGaXJzdFN3YXAgPSB0YXJnZXRSZWN0W3NpZGUxXTtcbiAgICAgICAgICBwYXN0Rmlyc3RJbnZlcnRUaHJlc2ggPSBmYWxzZTtcbiAgICAgICAgICBpc0NpcmN1bXN0YW50aWFsSW52ZXJ0ID0gIWRpZmZlcmVudFJvd0NvbCAmJiBvcHRpb25zLmludmVydFN3YXAgfHwgZGlmZmVyZW50TGV2ZWw7XG4gICAgICAgIH1cblxuICAgICAgICBkaXJlY3Rpb24gPSBfZ2V0U3dhcERpcmVjdGlvbihldnQsIHRhcmdldCwgdGFyZ2V0UmVjdCwgdmVydGljYWwsIGRpZmZlcmVudFJvd0NvbCA/IDEgOiBvcHRpb25zLnN3YXBUaHJlc2hvbGQsIG9wdGlvbnMuaW52ZXJ0ZWRTd2FwVGhyZXNob2xkID09IG51bGwgPyBvcHRpb25zLnN3YXBUaHJlc2hvbGQgOiBvcHRpb25zLmludmVydGVkU3dhcFRocmVzaG9sZCwgaXNDaXJjdW1zdGFudGlhbEludmVydCwgbGFzdFRhcmdldCA9PT0gdGFyZ2V0KTtcbiAgICAgICAgdmFyIHNpYmxpbmc7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAhPT0gMCkge1xuICAgICAgICAgIC8vIENoZWNrIGlmIHRhcmdldCBpcyBiZXNpZGUgZHJhZ0VsIGluIHJlc3BlY3RpdmUgZGlyZWN0aW9uIChpZ25vcmluZyBoaWRkZW4gZWxlbWVudHMpXG4gICAgICAgICAgdmFyIGRyYWdJbmRleCA9IGluZGV4KGRyYWdFbCk7XG5cbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBkcmFnSW5kZXggLT0gZGlyZWN0aW9uO1xuICAgICAgICAgICAgc2libGluZyA9IHBhcmVudEVsLmNoaWxkcmVuW2RyYWdJbmRleF07XG4gICAgICAgICAgfSB3aGlsZSAoc2libGluZyAmJiAoY3NzKHNpYmxpbmcsICdkaXNwbGF5JykgPT09ICdub25lJyB8fCBzaWJsaW5nID09PSBnaG9zdEVsKSk7XG4gICAgICAgIH0gLy8gSWYgZHJhZ0VsIGlzIGFscmVhZHkgYmVzaWRlIHRhcmdldDogRG8gbm90IGluc2VydFxuXG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMCB8fCBzaWJsaW5nID09PSB0YXJnZXQpIHtcbiAgICAgICAgICByZXR1cm4gY29tcGxldGVkKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxhc3RUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIGxhc3REaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHZhciBuZXh0U2libGluZyA9IHRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgICBhZnRlciA9IGZhbHNlO1xuICAgICAgICBhZnRlciA9IGRpcmVjdGlvbiA9PT0gMTtcblxuICAgICAgICB2YXIgbW92ZVZlY3RvciA9IF9vbk1vdmUocm9vdEVsLCBlbCwgZHJhZ0VsLCBkcmFnUmVjdCwgdGFyZ2V0LCB0YXJnZXRSZWN0LCBldnQsIGFmdGVyKTtcblxuICAgICAgICBpZiAobW92ZVZlY3RvciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBpZiAobW92ZVZlY3RvciA9PT0gMSB8fCBtb3ZlVmVjdG9yID09PSAtMSkge1xuICAgICAgICAgICAgYWZ0ZXIgPSBtb3ZlVmVjdG9yID09PSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF9zaWxlbnQgPSB0cnVlO1xuICAgICAgICAgIHNldFRpbWVvdXQoX3Vuc2lsZW50LCAzMCk7XG4gICAgICAgICAgY2FwdHVyZSgpO1xuXG4gICAgICAgICAgaWYgKGFmdGVyICYmICFuZXh0U2libGluZykge1xuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZHJhZ0VsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGRyYWdFbCwgYWZ0ZXIgPyBuZXh0U2libGluZyA6IHRhcmdldCk7XG4gICAgICAgICAgfSAvLyBVbmRvIGNocm9tZSdzIHNjcm9sbCBhZGp1c3RtZW50IChoYXMgbm8gZWZmZWN0IG9uIG90aGVyIGJyb3dzZXJzKVxuXG5cbiAgICAgICAgICBpZiAoc2Nyb2xsZWRQYXN0VG9wKSB7XG4gICAgICAgICAgICBzY3JvbGxCeShzY3JvbGxlZFBhc3RUb3AsIDAsIHNjcm9sbEJlZm9yZSAtIHNjcm9sbGVkUGFzdFRvcC5zY3JvbGxUb3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhcmVudEVsID0gZHJhZ0VsLnBhcmVudE5vZGU7IC8vIGFjdHVhbGl6YXRpb25cbiAgICAgICAgICAvLyBtdXN0IGJlIGRvbmUgYmVmb3JlIGFuaW1hdGlvblxuXG4gICAgICAgICAgaWYgKHRhcmdldEJlZm9yZUZpcnN0U3dhcCAhPT0gdW5kZWZpbmVkICYmICFpc0NpcmN1bXN0YW50aWFsSW52ZXJ0KSB7XG4gICAgICAgICAgICB0YXJnZXRNb3ZlRGlzdGFuY2UgPSBNYXRoLmFicyh0YXJnZXRCZWZvcmVGaXJzdFN3YXAgLSBnZXRSZWN0KHRhcmdldClbc2lkZTFdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGFuZ2VkKCk7XG4gICAgICAgICAgcmV0dXJuIGNvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZWwuY29udGFpbnMoZHJhZ0VsKSkge1xuICAgICAgICByZXR1cm4gY29tcGxldGVkKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIF9pZ25vcmVXaGlsZUFuaW1hdGluZzogbnVsbCxcbiAgX29mZk1vdmVFdmVudHM6IGZ1bmN0aW9uIF9vZmZNb3ZlRXZlbnRzKCkge1xuICAgIG9mZihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICBvZmYoZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSk7XG4gICAgb2ZmKGRvY3VtZW50LCAncG9pbnRlcm1vdmUnLCB0aGlzLl9vblRvdWNoTW92ZSk7XG4gICAgb2ZmKGRvY3VtZW50LCAnZHJhZ292ZXInLCBuZWFyZXN0RW1wdHlJbnNlcnREZXRlY3RFdmVudCk7XG4gICAgb2ZmKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgbmVhcmVzdEVtcHR5SW5zZXJ0RGV0ZWN0RXZlbnQpO1xuICAgIG9mZihkb2N1bWVudCwgJ3RvdWNobW92ZScsIG5lYXJlc3RFbXB0eUluc2VydERldGVjdEV2ZW50KTtcbiAgfSxcbiAgX29mZlVwRXZlbnRzOiBmdW5jdGlvbiBfb2ZmVXBFdmVudHMoKSB7XG4gICAgdmFyIG93bmVyRG9jdW1lbnQgPSB0aGlzLmVsLm93bmVyRG9jdW1lbnQ7XG4gICAgb2ZmKG93bmVyRG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5fb25Ecm9wKTtcbiAgICBvZmYob3duZXJEb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5fb25Ecm9wKTtcbiAgICBvZmYob3duZXJEb2N1bWVudCwgJ3BvaW50ZXJ1cCcsIHRoaXMuX29uRHJvcCk7XG4gICAgb2ZmKG93bmVyRG9jdW1lbnQsICd0b3VjaGNhbmNlbCcsIHRoaXMuX29uRHJvcCk7XG4gICAgb2ZmKGRvY3VtZW50LCAnc2VsZWN0c3RhcnQnLCB0aGlzKTtcbiAgfSxcbiAgX29uRHJvcDogZnVuY3Rpb24gX29uRHJvcChcbiAgLyoqRXZlbnQqL1xuICBldnQpIHtcbiAgICB2YXIgZWwgPSB0aGlzLmVsLFxuICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zOyAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBkcmFnZ2VkIGVsZW1lbnQgd2l0aGluIGl0cyBwYXJlbnRcblxuICAgIG5ld0luZGV4ID0gaW5kZXgoZHJhZ0VsKTtcbiAgICBuZXdEcmFnZ2FibGVJbmRleCA9IGluZGV4KGRyYWdFbCwgb3B0aW9ucy5kcmFnZ2FibGUpO1xuICAgIHBsdWdpbkV2ZW50KCdkcm9wJywgdGhpcywge1xuICAgICAgZXZ0OiBldnRcbiAgICB9KTtcbiAgICBwYXJlbnRFbCA9IGRyYWdFbCAmJiBkcmFnRWwucGFyZW50Tm9kZTsgLy8gR2V0IGFnYWluIGFmdGVyIHBsdWdpbiBldmVudFxuXG4gICAgbmV3SW5kZXggPSBpbmRleChkcmFnRWwpO1xuICAgIG5ld0RyYWdnYWJsZUluZGV4ID0gaW5kZXgoZHJhZ0VsLCBvcHRpb25zLmRyYWdnYWJsZSk7XG5cbiAgICBpZiAoU29ydGFibGUuZXZlbnRDYW5jZWxlZCkge1xuICAgICAgdGhpcy5fbnVsbGluZygpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXRpbmdEcmFnU3RhcnRlZCA9IGZhbHNlO1xuICAgIGlzQ2lyY3Vtc3RhbnRpYWxJbnZlcnQgPSBmYWxzZTtcbiAgICBwYXN0Rmlyc3RJbnZlcnRUaHJlc2ggPSBmYWxzZTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuX2xvb3BJZCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX2RyYWdTdGFydFRpbWVyKTtcblxuICAgIF9jYW5jZWxOZXh0VGljayh0aGlzLmNsb25lSWQpO1xuXG4gICAgX2NhbmNlbE5leHRUaWNrKHRoaXMuX2RyYWdTdGFydElkKTsgLy8gVW5iaW5kIGV2ZW50c1xuXG5cbiAgICBpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGUpIHtcbiAgICAgIG9mZihkb2N1bWVudCwgJ2Ryb3AnLCB0aGlzKTtcbiAgICAgIG9mZihlbCwgJ2RyYWdzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0KTtcbiAgICB9XG5cbiAgICB0aGlzLl9vZmZNb3ZlRXZlbnRzKCk7XG5cbiAgICB0aGlzLl9vZmZVcEV2ZW50cygpO1xuXG4gICAgaWYgKFNhZmFyaSkge1xuICAgICAgY3NzKGRvY3VtZW50LmJvZHksICd1c2VyLXNlbGVjdCcsICcnKTtcbiAgICB9XG5cbiAgICBjc3MoZHJhZ0VsLCAndHJhbnNmb3JtJywgJycpO1xuXG4gICAgaWYgKGV2dCkge1xuICAgICAgaWYgKG1vdmVkKSB7XG4gICAgICAgIGV2dC5jYW5jZWxhYmxlICYmIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAhb3B0aW9ucy5kcm9wQnViYmxlICYmIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cblxuICAgICAgZ2hvc3RFbCAmJiBnaG9zdEVsLnBhcmVudE5vZGUgJiYgZ2hvc3RFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGdob3N0RWwpO1xuXG4gICAgICBpZiAocm9vdEVsID09PSBwYXJlbnRFbCB8fCBwdXRTb3J0YWJsZSAmJiBwdXRTb3J0YWJsZS5sYXN0UHV0TW9kZSAhPT0gJ2Nsb25lJykge1xuICAgICAgICAvLyBSZW1vdmUgY2xvbmUocylcbiAgICAgICAgY2xvbmVFbCAmJiBjbG9uZUVsLnBhcmVudE5vZGUgJiYgY2xvbmVFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lRWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHJhZ0VsKSB7XG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZURyYWdnYWJsZSkge1xuICAgICAgICAgIG9mZihkcmFnRWwsICdkcmFnZW5kJywgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBfZGlzYWJsZURyYWdnYWJsZShkcmFnRWwpO1xuXG4gICAgICAgIGRyYWdFbC5zdHlsZVsnd2lsbC1jaGFuZ2UnXSA9ICcnOyAvLyBSZW1vdmUgY2xhc3Nlc1xuICAgICAgICAvLyBnaG9zdENsYXNzIGlzIGFkZGVkIGluIGRyYWdTdGFydGVkXG5cbiAgICAgICAgaWYgKG1vdmVkICYmICFhd2FpdGluZ0RyYWdTdGFydGVkKSB7XG4gICAgICAgICAgdG9nZ2xlQ2xhc3MoZHJhZ0VsLCBwdXRTb3J0YWJsZSA/IHB1dFNvcnRhYmxlLm9wdGlvbnMuZ2hvc3RDbGFzcyA6IHRoaXMub3B0aW9ucy5naG9zdENsYXNzLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVDbGFzcyhkcmFnRWwsIHRoaXMub3B0aW9ucy5jaG9zZW5DbGFzcywgZmFsc2UpOyAvLyBEcmFnIHN0b3AgZXZlbnRcblxuICAgICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgc29ydGFibGU6IHRoaXMsXG4gICAgICAgICAgbmFtZTogJ3VuY2hvb3NlJyxcbiAgICAgICAgICB0b0VsOiBwYXJlbnRFbCxcbiAgICAgICAgICBuZXdJbmRleDogbnVsbCxcbiAgICAgICAgICBuZXdEcmFnZ2FibGVJbmRleDogbnVsbCxcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJvb3RFbCAhPT0gcGFyZW50RWwpIHtcbiAgICAgICAgICBpZiAobmV3SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgLy8gQWRkIGV2ZW50XG4gICAgICAgICAgICBfZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICAgIHJvb3RFbDogcGFyZW50RWwsXG4gICAgICAgICAgICAgIG5hbWU6ICdhZGQnLFxuICAgICAgICAgICAgICB0b0VsOiBwYXJlbnRFbCxcbiAgICAgICAgICAgICAgZnJvbUVsOiByb290RWwsXG4gICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2dFxuICAgICAgICAgICAgfSk7IC8vIFJlbW92ZSBldmVudFxuXG5cbiAgICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgICAgc29ydGFibGU6IHRoaXMsXG4gICAgICAgICAgICAgIG5hbWU6ICdyZW1vdmUnLFxuICAgICAgICAgICAgICB0b0VsOiBwYXJlbnRFbCxcbiAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICAgICAgICB9KTsgLy8gZHJhZyBmcm9tIG9uZSBsaXN0IGFuZCBkcm9wIGludG8gYW5vdGhlclxuXG5cbiAgICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgICAgcm9vdEVsOiBwYXJlbnRFbCxcbiAgICAgICAgICAgICAgbmFtZTogJ3NvcnQnLFxuICAgICAgICAgICAgICB0b0VsOiBwYXJlbnRFbCxcbiAgICAgICAgICAgICAgZnJvbUVsOiByb290RWwsXG4gICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2dFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgICAgc29ydGFibGU6IHRoaXMsXG4gICAgICAgICAgICAgIG5hbWU6ICdzb3J0JyxcbiAgICAgICAgICAgICAgdG9FbDogcGFyZW50RWwsXG4gICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2dFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcHV0U29ydGFibGUgJiYgcHV0U29ydGFibGUuc2F2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChuZXdJbmRleCAhPT0gb2xkSW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChuZXdJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgIC8vIGRyYWcgJiBkcm9wIHdpdGhpbiB0aGUgc2FtZSBsaXN0XG4gICAgICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogdGhpcyxcbiAgICAgICAgICAgICAgICBuYW1lOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICB0b0VsOiBwYXJlbnRFbCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiB0aGlzLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdzb3J0JyxcbiAgICAgICAgICAgICAgICB0b0VsOiBwYXJlbnRFbCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnRcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFNvcnRhYmxlLmFjdGl2ZSkge1xuICAgICAgICAgIC8qIGpzaGludCBlcW51bGw6dHJ1ZSAqL1xuICAgICAgICAgIGlmIChuZXdJbmRleCA9PSBudWxsIHx8IG5ld0luZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgbmV3SW5kZXggPSBvbGRJbmRleDtcbiAgICAgICAgICAgIG5ld0RyYWdnYWJsZUluZGV4ID0gb2xkRHJhZ2dhYmxlSW5kZXg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX2Rpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgc29ydGFibGU6IHRoaXMsXG4gICAgICAgICAgICBuYW1lOiAnZW5kJyxcbiAgICAgICAgICAgIHRvRWw6IHBhcmVudEVsLFxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICAgICAgfSk7IC8vIFNhdmUgc29ydGluZ1xuXG5cbiAgICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX251bGxpbmcoKTtcbiAgfSxcbiAgX251bGxpbmc6IGZ1bmN0aW9uIF9udWxsaW5nKCkge1xuICAgIHBsdWdpbkV2ZW50KCdudWxsaW5nJywgdGhpcyk7XG4gICAgcm9vdEVsID0gZHJhZ0VsID0gcGFyZW50RWwgPSBnaG9zdEVsID0gbmV4dEVsID0gY2xvbmVFbCA9IGxhc3REb3duRWwgPSBjbG9uZUhpZGRlbiA9IHRhcEV2dCA9IHRvdWNoRXZ0ID0gbW92ZWQgPSBuZXdJbmRleCA9IG5ld0RyYWdnYWJsZUluZGV4ID0gb2xkSW5kZXggPSBvbGREcmFnZ2FibGVJbmRleCA9IGxhc3RUYXJnZXQgPSBsYXN0RGlyZWN0aW9uID0gcHV0U29ydGFibGUgPSBhY3RpdmVHcm91cCA9IFNvcnRhYmxlLmRyYWdnZWQgPSBTb3J0YWJsZS5naG9zdCA9IFNvcnRhYmxlLmNsb25lID0gU29ydGFibGUuYWN0aXZlID0gbnVsbDtcbiAgICBzYXZlZElucHV0Q2hlY2tlZC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwuY2hlY2tlZCA9IHRydWU7XG4gICAgfSk7XG4gICAgc2F2ZWRJbnB1dENoZWNrZWQubGVuZ3RoID0gbGFzdER4ID0gbGFzdER5ID0gMDtcbiAgfSxcbiAgaGFuZGxlRXZlbnQ6IGZ1bmN0aW9uIGhhbmRsZUV2ZW50KFxuICAvKipFdmVudCovXG4gIGV2dCkge1xuICAgIHN3aXRjaCAoZXZ0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Ryb3AnOlxuICAgICAgY2FzZSAnZHJhZ2VuZCc6XG4gICAgICAgIHRoaXMuX29uRHJvcChldnQpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdkcmFnZW50ZXInOlxuICAgICAgY2FzZSAnZHJhZ292ZXInOlxuICAgICAgICBpZiAoZHJhZ0VsKSB7XG4gICAgICAgICAgdGhpcy5fb25EcmFnT3ZlcihldnQpO1xuXG4gICAgICAgICAgX2dsb2JhbERyYWdPdmVyKGV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnc2VsZWN0c3RhcnQnOlxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIHRoZSBpdGVtIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5nLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nW119XG4gICAqL1xuICB0b0FycmF5OiBmdW5jdGlvbiB0b0FycmF5KCkge1xuICAgIHZhciBvcmRlciA9IFtdLFxuICAgICAgICBlbCxcbiAgICAgICAgY2hpbGRyZW4gPSB0aGlzLmVsLmNoaWxkcmVuLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgbiA9IGNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgIGZvciAoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBlbCA9IGNoaWxkcmVuW2ldO1xuXG4gICAgICBpZiAoY2xvc2VzdChlbCwgb3B0aW9ucy5kcmFnZ2FibGUsIHRoaXMuZWwsIGZhbHNlKSkge1xuICAgICAgICBvcmRlci5wdXNoKGVsLmdldEF0dHJpYnV0ZShvcHRpb25zLmRhdGFJZEF0dHIpIHx8IF9nZW5lcmF0ZUlkKGVsKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9yZGVyO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBhcnJheS5cbiAgICogQHBhcmFtICB7U3RyaW5nW119ICBvcmRlciAgb3JkZXIgb2YgdGhlIGl0ZW1zXG4gICAqL1xuICBzb3J0OiBmdW5jdGlvbiBzb3J0KG9yZGVyLCB1c2VBbmltYXRpb24pIHtcbiAgICB2YXIgaXRlbXMgPSB7fSxcbiAgICAgICAgcm9vdEVsID0gdGhpcy5lbDtcbiAgICB0aGlzLnRvQXJyYXkoKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCwgaSkge1xuICAgICAgdmFyIGVsID0gcm9vdEVsLmNoaWxkcmVuW2ldO1xuXG4gICAgICBpZiAoY2xvc2VzdChlbCwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSwgcm9vdEVsLCBmYWxzZSkpIHtcbiAgICAgICAgaXRlbXNbaWRdID0gZWw7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gICAgdXNlQW5pbWF0aW9uICYmIHRoaXMuY2FwdHVyZUFuaW1hdGlvblN0YXRlKCk7XG4gICAgb3JkZXIuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGlmIChpdGVtc1tpZF0pIHtcbiAgICAgICAgcm9vdEVsLnJlbW92ZUNoaWxkKGl0ZW1zW2lkXSk7XG4gICAgICAgIHJvb3RFbC5hcHBlbmRDaGlsZChpdGVtc1tpZF0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHVzZUFuaW1hdGlvbiAmJiB0aGlzLmFuaW1hdGVBbGwoKTtcbiAgfSxcblxuICAvKipcbiAgICogU2F2ZSB0aGUgY3VycmVudCBzb3J0aW5nXG4gICAqL1xuICBzYXZlOiBmdW5jdGlvbiBzYXZlKCkge1xuICAgIHZhciBzdG9yZSA9IHRoaXMub3B0aW9ucy5zdG9yZTtcbiAgICBzdG9yZSAmJiBzdG9yZS5zZXQgJiYgc3RvcmUuc2V0KHRoaXMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGb3IgZWFjaCBlbGVtZW50IGluIHRoZSBzZXQsIGdldCB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yIGJ5IHRlc3RpbmcgdGhlIGVsZW1lbnQgaXRzZWxmIGFuZCB0cmF2ZXJzaW5nIHVwIHRocm91Z2ggaXRzIGFuY2VzdG9ycyBpbiB0aGUgRE9NIHRyZWUuXG4gICAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gIGVsXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgICAgIFtzZWxlY3Rvcl0gIGRlZmF1bHQ6IGBvcHRpb25zLmRyYWdnYWJsZWBcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fG51bGx9XG4gICAqL1xuICBjbG9zZXN0OiBmdW5jdGlvbiBjbG9zZXN0JDEoZWwsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGNsb3Nlc3QoZWwsIHNlbGVjdG9yIHx8IHRoaXMub3B0aW9ucy5kcmFnZ2FibGUsIHRoaXMuZWwsIGZhbHNlKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0L2dldCBvcHRpb25cbiAgICogQHBhcmFtICAge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0gICB7Kn0gICAgICBbdmFsdWVdXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgb3B0aW9uOiBmdW5jdGlvbiBvcHRpb24obmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gb3B0aW9uc1tuYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1vZGlmaWVkVmFsdWUgPSBQbHVnaW5NYW5hZ2VyLm1vZGlmeU9wdGlvbih0aGlzLCBuYW1lLCB2YWx1ZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgbW9kaWZpZWRWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9uc1tuYW1lXSA9IG1vZGlmaWVkVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChuYW1lID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIF9wcmVwYXJlR3JvdXAob3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95XG4gICAqL1xuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHBsdWdpbkV2ZW50KCdkZXN0cm95JywgdGhpcyk7XG4gICAgdmFyIGVsID0gdGhpcy5lbDtcbiAgICBlbFtleHBhbmRvXSA9IG51bGw7XG4gICAgb2ZmKGVsLCAnbW91c2Vkb3duJywgdGhpcy5fb25UYXBTdGFydCk7XG4gICAgb2ZmKGVsLCAndG91Y2hzdGFydCcsIHRoaXMuX29uVGFwU3RhcnQpO1xuICAgIG9mZihlbCwgJ3BvaW50ZXJkb3duJywgdGhpcy5fb25UYXBTdGFydCk7XG5cbiAgICBpZiAodGhpcy5uYXRpdmVEcmFnZ2FibGUpIHtcbiAgICAgIG9mZihlbCwgJ2RyYWdvdmVyJywgdGhpcyk7XG4gICAgICBvZmYoZWwsICdkcmFnZW50ZXInLCB0aGlzKTtcbiAgICB9IC8vIFJlbW92ZSBkcmFnZ2FibGUgYXR0cmlidXRlc1xuXG5cbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkcmFnZ2FibGVdJyksIGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkcmFnZ2FibGUnKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX29uRHJvcCgpO1xuXG4gICAgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnRXZlbnRzKCk7XG5cbiAgICBzb3J0YWJsZXMuc3BsaWNlKHNvcnRhYmxlcy5pbmRleE9mKHRoaXMuZWwpLCAxKTtcbiAgICB0aGlzLmVsID0gZWwgPSBudWxsO1xuICB9LFxuICBfaGlkZUNsb25lOiBmdW5jdGlvbiBfaGlkZUNsb25lKCkge1xuICAgIGlmICghY2xvbmVIaWRkZW4pIHtcbiAgICAgIHBsdWdpbkV2ZW50KCdoaWRlQ2xvbmUnLCB0aGlzKTtcbiAgICAgIGlmIChTb3J0YWJsZS5ldmVudENhbmNlbGVkKSByZXR1cm47XG4gICAgICBjc3MoY2xvbmVFbCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZUNsb25lT25IaWRlICYmIGNsb25lRWwucGFyZW50Tm9kZSkge1xuICAgICAgICBjbG9uZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmVFbCk7XG4gICAgICB9XG5cbiAgICAgIGNsb25lSGlkZGVuID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG4gIF9zaG93Q2xvbmU6IGZ1bmN0aW9uIF9zaG93Q2xvbmUocHV0U29ydGFibGUpIHtcbiAgICBpZiAocHV0U29ydGFibGUubGFzdFB1dE1vZGUgIT09ICdjbG9uZScpIHtcbiAgICAgIHRoaXMuX2hpZGVDbG9uZSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNsb25lSGlkZGVuKSB7XG4gICAgICBwbHVnaW5FdmVudCgnc2hvd0Nsb25lJywgdGhpcyk7XG4gICAgICBpZiAoU29ydGFibGUuZXZlbnRDYW5jZWxlZCkgcmV0dXJuOyAvLyBzaG93IGNsb25lIGF0IGRyYWdFbCBvciBvcmlnaW5hbCBwb3NpdGlvblxuXG4gICAgICBpZiAoZHJhZ0VsLnBhcmVudE5vZGUgPT0gcm9vdEVsICYmICF0aGlzLm9wdGlvbnMuZ3JvdXAucmV2ZXJ0Q2xvbmUpIHtcbiAgICAgICAgcm9vdEVsLmluc2VydEJlZm9yZShjbG9uZUVsLCBkcmFnRWwpO1xuICAgICAgfSBlbHNlIGlmIChuZXh0RWwpIHtcbiAgICAgICAgcm9vdEVsLmluc2VydEJlZm9yZShjbG9uZUVsLCBuZXh0RWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdEVsLmFwcGVuZENoaWxkKGNsb25lRWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmdyb3VwLnJldmVydENsb25lKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZShkcmFnRWwsIGNsb25lRWwpO1xuICAgICAgfVxuXG4gICAgICBjc3MoY2xvbmVFbCwgJ2Rpc3BsYXknLCAnJyk7XG4gICAgICBjbG9uZUhpZGRlbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gX2dsb2JhbERyYWdPdmVyKFxuLyoqRXZlbnQqL1xuZXZ0KSB7XG4gIGlmIChldnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgZXZ0LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICB9XG5cbiAgZXZ0LmNhbmNlbGFibGUgJiYgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIF9vbk1vdmUoZnJvbUVsLCB0b0VsLCBkcmFnRWwsIGRyYWdSZWN0LCB0YXJnZXRFbCwgdGFyZ2V0UmVjdCwgb3JpZ2luYWxFdmVudCwgd2lsbEluc2VydEFmdGVyKSB7XG4gIHZhciBldnQsXG4gICAgICBzb3J0YWJsZSA9IGZyb21FbFtleHBhbmRvXSxcbiAgICAgIG9uTW92ZUZuID0gc29ydGFibGUub3B0aW9ucy5vbk1vdmUsXG4gICAgICByZXRWYWw7IC8vIFN1cHBvcnQgZm9yIG5ldyBDdXN0b21FdmVudCBmZWF0dXJlXG5cbiAgaWYgKHdpbmRvdy5DdXN0b21FdmVudCAmJiAhSUUxMU9yTGVzcyAmJiAhRWRnZSkge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudCgnbW92ZScsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZXZ0LmluaXRFdmVudCgnbW92ZScsIHRydWUsIHRydWUpO1xuICB9XG5cbiAgZXZ0LnRvID0gdG9FbDtcbiAgZXZ0LmZyb20gPSBmcm9tRWw7XG4gIGV2dC5kcmFnZ2VkID0gZHJhZ0VsO1xuICBldnQuZHJhZ2dlZFJlY3QgPSBkcmFnUmVjdDtcbiAgZXZ0LnJlbGF0ZWQgPSB0YXJnZXRFbCB8fCB0b0VsO1xuICBldnQucmVsYXRlZFJlY3QgPSB0YXJnZXRSZWN0IHx8IGdldFJlY3QodG9FbCk7XG4gIGV2dC53aWxsSW5zZXJ0QWZ0ZXIgPSB3aWxsSW5zZXJ0QWZ0ZXI7XG4gIGV2dC5vcmlnaW5hbEV2ZW50ID0gb3JpZ2luYWxFdmVudDtcbiAgZnJvbUVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblxuICBpZiAob25Nb3ZlRm4pIHtcbiAgICByZXRWYWwgPSBvbk1vdmVGbi5jYWxsKHNvcnRhYmxlLCBldnQsIG9yaWdpbmFsRXZlbnQpO1xuICB9XG5cbiAgcmV0dXJuIHJldFZhbDtcbn1cblxuZnVuY3Rpb24gX2Rpc2FibGVEcmFnZ2FibGUoZWwpIHtcbiAgZWwuZHJhZ2dhYmxlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIF91bnNpbGVudCgpIHtcbiAgX3NpbGVudCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBfZ2hvc3RJc0ZpcnN0KGV2dCwgdmVydGljYWwsIHNvcnRhYmxlKSB7XG4gIHZhciByZWN0ID0gZ2V0UmVjdChnZXRDaGlsZChzb3J0YWJsZS5lbCwgMCwgc29ydGFibGUub3B0aW9ucywgdHJ1ZSkpO1xuICB2YXIgc3BhY2VyID0gMTA7XG4gIHJldHVybiB2ZXJ0aWNhbCA/IGV2dC5jbGllbnRYIDwgcmVjdC5sZWZ0IC0gc3BhY2VyIHx8IGV2dC5jbGllbnRZIDwgcmVjdC50b3AgJiYgZXZ0LmNsaWVudFggPCByZWN0LnJpZ2h0IDogZXZ0LmNsaWVudFkgPCByZWN0LnRvcCAtIHNwYWNlciB8fCBldnQuY2xpZW50WSA8IHJlY3QuYm90dG9tICYmIGV2dC5jbGllbnRYIDwgcmVjdC5sZWZ0O1xufVxuXG5mdW5jdGlvbiBfZ2hvc3RJc0xhc3QoZXZ0LCB2ZXJ0aWNhbCwgc29ydGFibGUpIHtcbiAgdmFyIHJlY3QgPSBnZXRSZWN0KGxhc3RDaGlsZChzb3J0YWJsZS5lbCwgc29ydGFibGUub3B0aW9ucy5kcmFnZ2FibGUpKTtcbiAgdmFyIHNwYWNlciA9IDEwO1xuICByZXR1cm4gdmVydGljYWwgPyBldnQuY2xpZW50WCA+IHJlY3QucmlnaHQgKyBzcGFjZXIgfHwgZXZ0LmNsaWVudFggPD0gcmVjdC5yaWdodCAmJiBldnQuY2xpZW50WSA+IHJlY3QuYm90dG9tICYmIGV2dC5jbGllbnRYID49IHJlY3QubGVmdCA6IGV2dC5jbGllbnRYID4gcmVjdC5yaWdodCAmJiBldnQuY2xpZW50WSA+IHJlY3QudG9wIHx8IGV2dC5jbGllbnRYIDw9IHJlY3QucmlnaHQgJiYgZXZ0LmNsaWVudFkgPiByZWN0LmJvdHRvbSArIHNwYWNlcjtcbn1cblxuZnVuY3Rpb24gX2dldFN3YXBEaXJlY3Rpb24oZXZ0LCB0YXJnZXQsIHRhcmdldFJlY3QsIHZlcnRpY2FsLCBzd2FwVGhyZXNob2xkLCBpbnZlcnRlZFN3YXBUaHJlc2hvbGQsIGludmVydFN3YXAsIGlzTGFzdFRhcmdldCkge1xuICB2YXIgbW91c2VPbkF4aXMgPSB2ZXJ0aWNhbCA/IGV2dC5jbGllbnRZIDogZXZ0LmNsaWVudFgsXG4gICAgICB0YXJnZXRMZW5ndGggPSB2ZXJ0aWNhbCA/IHRhcmdldFJlY3QuaGVpZ2h0IDogdGFyZ2V0UmVjdC53aWR0aCxcbiAgICAgIHRhcmdldFMxID0gdmVydGljYWwgPyB0YXJnZXRSZWN0LnRvcCA6IHRhcmdldFJlY3QubGVmdCxcbiAgICAgIHRhcmdldFMyID0gdmVydGljYWwgPyB0YXJnZXRSZWN0LmJvdHRvbSA6IHRhcmdldFJlY3QucmlnaHQsXG4gICAgICBpbnZlcnQgPSBmYWxzZTtcblxuICBpZiAoIWludmVydFN3YXApIHtcbiAgICAvLyBOZXZlciBpbnZlcnQgb3IgY3JlYXRlIGRyYWdFbCBzaGFkb3cgd2hlbiB0YXJnZXQgbW92ZW1lbmV0IGNhdXNlcyBtb3VzZSB0byBtb3ZlIHBhc3QgdGhlIGVuZCBvZiByZWd1bGFyIHN3YXBUaHJlc2hvbGRcbiAgICBpZiAoaXNMYXN0VGFyZ2V0ICYmIHRhcmdldE1vdmVEaXN0YW5jZSA8IHRhcmdldExlbmd0aCAqIHN3YXBUaHJlc2hvbGQpIHtcbiAgICAgIC8vIG11bHRpcGxpZWQgb25seSBieSBzd2FwVGhyZXNob2xkIGJlY2F1c2UgbW91c2Ugd2lsbCBhbHJlYWR5IGJlIGluc2lkZSB0YXJnZXQgYnkgKDEgLSB0aHJlc2hvbGQpICogdGFyZ2V0TGVuZ3RoIC8gMlxuICAgICAgLy8gY2hlY2sgaWYgcGFzdCBmaXJzdCBpbnZlcnQgdGhyZXNob2xkIG9uIHNpZGUgb3Bwb3NpdGUgb2YgbGFzdERpcmVjdGlvblxuICAgICAgaWYgKCFwYXN0Rmlyc3RJbnZlcnRUaHJlc2ggJiYgKGxhc3REaXJlY3Rpb24gPT09IDEgPyBtb3VzZU9uQXhpcyA+IHRhcmdldFMxICsgdGFyZ2V0TGVuZ3RoICogaW52ZXJ0ZWRTd2FwVGhyZXNob2xkIC8gMiA6IG1vdXNlT25BeGlzIDwgdGFyZ2V0UzIgLSB0YXJnZXRMZW5ndGggKiBpbnZlcnRlZFN3YXBUaHJlc2hvbGQgLyAyKSkge1xuICAgICAgICAvLyBwYXN0IGZpcnN0IGludmVydCB0aHJlc2hvbGQsIGRvIG5vdCByZXN0cmljdCBpbnZlcnRlZCB0aHJlc2hvbGQgdG8gZHJhZ0VsIHNoYWRvd1xuICAgICAgICBwYXN0Rmlyc3RJbnZlcnRUaHJlc2ggPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhc3RGaXJzdEludmVydFRocmVzaCkge1xuICAgICAgICAvLyBkcmFnRWwgc2hhZG93ICh0YXJnZXQgbW92ZSBkaXN0YW5jZSBzaGFkb3cpXG4gICAgICAgIGlmIChsYXN0RGlyZWN0aW9uID09PSAxID8gbW91c2VPbkF4aXMgPCB0YXJnZXRTMSArIHRhcmdldE1vdmVEaXN0YW5jZSAvLyBvdmVyIGRyYWdFbCBzaGFkb3dcbiAgICAgICAgOiBtb3VzZU9uQXhpcyA+IHRhcmdldFMyIC0gdGFyZ2V0TW92ZURpc3RhbmNlKSB7XG4gICAgICAgICAgcmV0dXJuIC1sYXN0RGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnZlcnQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZWd1bGFyXG4gICAgICBpZiAobW91c2VPbkF4aXMgPiB0YXJnZXRTMSArIHRhcmdldExlbmd0aCAqICgxIC0gc3dhcFRocmVzaG9sZCkgLyAyICYmIG1vdXNlT25BeGlzIDwgdGFyZ2V0UzIgLSB0YXJnZXRMZW5ndGggKiAoMSAtIHN3YXBUaHJlc2hvbGQpIC8gMikge1xuICAgICAgICByZXR1cm4gX2dldEluc2VydERpcmVjdGlvbih0YXJnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGludmVydCA9IGludmVydCB8fCBpbnZlcnRTd2FwO1xuXG4gIGlmIChpbnZlcnQpIHtcbiAgICAvLyBJbnZlcnQgb2YgcmVndWxhclxuICAgIGlmIChtb3VzZU9uQXhpcyA8IHRhcmdldFMxICsgdGFyZ2V0TGVuZ3RoICogaW52ZXJ0ZWRTd2FwVGhyZXNob2xkIC8gMiB8fCBtb3VzZU9uQXhpcyA+IHRhcmdldFMyIC0gdGFyZ2V0TGVuZ3RoICogaW52ZXJ0ZWRTd2FwVGhyZXNob2xkIC8gMikge1xuICAgICAgcmV0dXJuIG1vdXNlT25BeGlzID4gdGFyZ2V0UzEgKyB0YXJnZXRMZW5ndGggLyAyID8gMSA6IC0xO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuLyoqXG4gKiBHZXRzIHRoZSBkaXJlY3Rpb24gZHJhZ0VsIG11c3QgYmUgc3dhcHBlZCByZWxhdGl2ZSB0byB0YXJnZXQgaW4gb3JkZXIgdG8gbWFrZSBpdFxuICogc2VlbSB0aGF0IGRyYWdFbCBoYXMgYmVlbiBcImluc2VydGVkXCIgaW50byB0aGF0IGVsZW1lbnQncyBwb3NpdGlvblxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IHRhcmdldCAgICAgICBUaGUgdGFyZ2V0IHdob3NlIHBvc2l0aW9uIGRyYWdFbCBpcyBiZWluZyBpbnNlcnRlZCBhdFxuICogQHJldHVybiB7TnVtYmVyfSAgICAgICAgICAgICAgICAgICBEaXJlY3Rpb24gZHJhZ0VsIG11c3QgYmUgc3dhcHBlZFxuICovXG5cblxuZnVuY3Rpb24gX2dldEluc2VydERpcmVjdGlvbih0YXJnZXQpIHtcbiAgaWYgKGluZGV4KGRyYWdFbCkgPCBpbmRleCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG59XG4vKipcbiAqIEdlbmVyYXRlIGlkXG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9IGVsXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuXG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUlkKGVsKSB7XG4gIHZhciBzdHIgPSBlbC50YWdOYW1lICsgZWwuY2xhc3NOYW1lICsgZWwuc3JjICsgZWwuaHJlZiArIGVsLnRleHRDb250ZW50LFxuICAgICAgaSA9IHN0ci5sZW5ndGgsXG4gICAgICBzdW0gPSAwO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBzdW0gKz0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gIH1cblxuICByZXR1cm4gc3VtLnRvU3RyaW5nKDM2KTtcbn1cblxuZnVuY3Rpb24gX3NhdmVJbnB1dENoZWNrZWRTdGF0ZShyb290KSB7XG4gIHNhdmVkSW5wdXRDaGVja2VkLmxlbmd0aCA9IDA7XG4gIHZhciBpbnB1dHMgPSByb290LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpO1xuICB2YXIgaWR4ID0gaW5wdXRzLmxlbmd0aDtcblxuICB3aGlsZSAoaWR4LS0pIHtcbiAgICB2YXIgZWwgPSBpbnB1dHNbaWR4XTtcbiAgICBlbC5jaGVja2VkICYmIHNhdmVkSW5wdXRDaGVja2VkLnB1c2goZWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9uZXh0VGljayhmbikge1xuICByZXR1cm4gc2V0VGltZW91dChmbiwgMCk7XG59XG5cbmZ1bmN0aW9uIF9jYW5jZWxOZXh0VGljayhpZCkge1xuICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTtcbn0gLy8gRml4ZWQgIzk3MzpcblxuXG5pZiAoZG9jdW1lbnRFeGlzdHMpIHtcbiAgb24oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgaWYgKChTb3J0YWJsZS5hY3RpdmUgfHwgYXdhaXRpbmdEcmFnU3RhcnRlZCkgJiYgZXZ0LmNhbmNlbGFibGUpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59IC8vIEV4cG9ydCB1dGlsc1xuXG5cblNvcnRhYmxlLnV0aWxzID0ge1xuICBvbjogb24sXG4gIG9mZjogb2ZmLFxuICBjc3M6IGNzcyxcbiAgZmluZDogZmluZCxcbiAgaXM6IGZ1bmN0aW9uIGlzKGVsLCBzZWxlY3Rvcikge1xuICAgIHJldHVybiAhIWNsb3Nlc3QoZWwsIHNlbGVjdG9yLCBlbCwgZmFsc2UpO1xuICB9LFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdGhyb3R0bGU6IHRocm90dGxlLFxuICBjbG9zZXN0OiBjbG9zZXN0LFxuICB0b2dnbGVDbGFzczogdG9nZ2xlQ2xhc3MsXG4gIGNsb25lOiBjbG9uZSxcbiAgaW5kZXg6IGluZGV4LFxuICBuZXh0VGljazogX25leHRUaWNrLFxuICBjYW5jZWxOZXh0VGljazogX2NhbmNlbE5leHRUaWNrLFxuICBkZXRlY3REaXJlY3Rpb246IF9kZXRlY3REaXJlY3Rpb24sXG4gIGdldENoaWxkOiBnZXRDaGlsZFxufTtcbi8qKlxuICogR2V0IHRoZSBTb3J0YWJsZSBpbnN0YW5jZSBvZiBhbiBlbGVtZW50XG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudFxuICogQHJldHVybiB7U29ydGFibGV8dW5kZWZpbmVkfSAgICAgICAgIFRoZSBpbnN0YW5jZSBvZiBTb3J0YWJsZVxuICovXG5cblNvcnRhYmxlLmdldCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50W2V4cGFuZG9dO1xufTtcbi8qKlxuICogTW91bnQgYSBwbHVnaW4gdG8gU29ydGFibGVcbiAqIEBwYXJhbSAgey4uLlNvcnRhYmxlUGx1Z2lufFNvcnRhYmxlUGx1Z2luW119IHBsdWdpbnMgICAgICAgUGx1Z2lucyBiZWluZyBtb3VudGVkXG4gKi9cblxuXG5Tb3J0YWJsZS5tb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBsdWdpbnMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgcGx1Z2luc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChwbHVnaW5zWzBdLmNvbnN0cnVjdG9yID09PSBBcnJheSkgcGx1Z2lucyA9IHBsdWdpbnNbMF07XG4gIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgaWYgKCFwbHVnaW4ucHJvdG90eXBlIHx8ICFwbHVnaW4ucHJvdG90eXBlLmNvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBcIlNvcnRhYmxlOiBNb3VudGVkIHBsdWdpbiBtdXN0IGJlIGEgY29uc3RydWN0b3IgZnVuY3Rpb24sIG5vdCBcIi5jb25jYXQoe30udG9TdHJpbmcuY2FsbChwbHVnaW4pKTtcbiAgICB9XG5cbiAgICBpZiAocGx1Z2luLnV0aWxzKSBTb3J0YWJsZS51dGlscyA9IF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBTb3J0YWJsZS51dGlscyksIHBsdWdpbi51dGlscyk7XG4gICAgUGx1Z2luTWFuYWdlci5tb3VudChwbHVnaW4pO1xuICB9KTtcbn07XG4vKipcbiAqIENyZWF0ZSBzb3J0YWJsZSBpbnN0YW5jZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gIGVsXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBbb3B0aW9uc11cbiAqL1xuXG5cblNvcnRhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFNvcnRhYmxlKGVsLCBvcHRpb25zKTtcbn07IC8vIEV4cG9ydFxuXG5cblNvcnRhYmxlLnZlcnNpb24gPSB2ZXJzaW9uO1xuXG52YXIgYXV0b1Njcm9sbHMgPSBbXSxcbiAgICBzY3JvbGxFbCxcbiAgICBzY3JvbGxSb290RWwsXG4gICAgc2Nyb2xsaW5nID0gZmFsc2UsXG4gICAgbGFzdEF1dG9TY3JvbGxYLFxuICAgIGxhc3RBdXRvU2Nyb2xsWSxcbiAgICB0b3VjaEV2dCQxLFxuICAgIHBvaW50ZXJFbGVtQ2hhbmdlZEludGVydmFsO1xuXG5mdW5jdGlvbiBBdXRvU2Nyb2xsUGx1Z2luKCkge1xuICBmdW5jdGlvbiBBdXRvU2Nyb2xsKCkge1xuICAgIHRoaXMuZGVmYXVsdHMgPSB7XG4gICAgICBzY3JvbGw6IHRydWUsXG4gICAgICBmb3JjZUF1dG9TY3JvbGxGYWxsYmFjazogZmFsc2UsXG4gICAgICBzY3JvbGxTZW5zaXRpdml0eTogMzAsXG4gICAgICBzY3JvbGxTcGVlZDogMTAsXG4gICAgICBidWJibGVTY3JvbGw6IHRydWVcbiAgICB9OyAvLyBCaW5kIGFsbCBwcml2YXRlIG1ldGhvZHNcblxuICAgIGZvciAodmFyIGZuIGluIHRoaXMpIHtcbiAgICAgIGlmIChmbi5jaGFyQXQoMCkgPT09ICdfJyAmJiB0eXBlb2YgdGhpc1tmbl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpc1tmbl0gPSB0aGlzW2ZuXS5iaW5kKHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEF1dG9TY3JvbGwucHJvdG90eXBlID0ge1xuICAgIGRyYWdTdGFydGVkOiBmdW5jdGlvbiBkcmFnU3RhcnRlZChfcmVmKSB7XG4gICAgICB2YXIgb3JpZ2luYWxFdmVudCA9IF9yZWYub3JpZ2luYWxFdmVudDtcblxuICAgICAgaWYgKHRoaXMuc29ydGFibGUubmF0aXZlRHJhZ2dhYmxlKSB7XG4gICAgICAgIG9uKGRvY3VtZW50LCAnZHJhZ292ZXInLCB0aGlzLl9oYW5kbGVBdXRvU2Nyb2xsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3VwcG9ydFBvaW50ZXIpIHtcbiAgICAgICAgICBvbihkb2N1bWVudCwgJ3BvaW50ZXJtb3ZlJywgdGhpcy5faGFuZGxlRmFsbGJhY2tBdXRvU2Nyb2xsKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcmlnaW5hbEV2ZW50LnRvdWNoZXMpIHtcbiAgICAgICAgICBvbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZUZhbGxiYWNrQXV0b1Njcm9sbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb24oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLl9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkcmFnT3ZlckNvbXBsZXRlZDogZnVuY3Rpb24gZHJhZ092ZXJDb21wbGV0ZWQoX3JlZjIpIHtcbiAgICAgIHZhciBvcmlnaW5hbEV2ZW50ID0gX3JlZjIub3JpZ2luYWxFdmVudDtcblxuICAgICAgLy8gRm9yIHdoZW4gYnViYmxpbmcgaXMgY2FuY2VsZWQgYW5kIHVzaW5nIGZhbGxiYWNrIChmYWxsYmFjayAndG91Y2htb3ZlJyBhbHdheXMgcmVhY2hlZClcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmRyYWdPdmVyQnViYmxlICYmICFvcmlnaW5hbEV2ZW50LnJvb3RFbCkge1xuICAgICAgICB0aGlzLl9oYW5kbGVBdXRvU2Nyb2xsKG9yaWdpbmFsRXZlbnQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZHJvcDogZnVuY3Rpb24gZHJvcCgpIHtcbiAgICAgIGlmICh0aGlzLnNvcnRhYmxlLm5hdGl2ZURyYWdnYWJsZSkge1xuICAgICAgICBvZmYoZG9jdW1lbnQsICdkcmFnb3ZlcicsIHRoaXMuX2hhbmRsZUF1dG9TY3JvbGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2ZmKGRvY3VtZW50LCAncG9pbnRlcm1vdmUnLCB0aGlzLl9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwpO1xuICAgICAgICBvZmYoZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLl9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwpO1xuICAgICAgICBvZmYoZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLl9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwpO1xuICAgICAgfVxuXG4gICAgICBjbGVhclBvaW50ZXJFbGVtQ2hhbmdlZEludGVydmFsKCk7XG4gICAgICBjbGVhckF1dG9TY3JvbGxzKCk7XG4gICAgICBjYW5jZWxUaHJvdHRsZSgpO1xuICAgIH0sXG4gICAgbnVsbGluZzogZnVuY3Rpb24gbnVsbGluZygpIHtcbiAgICAgIHRvdWNoRXZ0JDEgPSBzY3JvbGxSb290RWwgPSBzY3JvbGxFbCA9IHNjcm9sbGluZyA9IHBvaW50ZXJFbGVtQ2hhbmdlZEludGVydmFsID0gbGFzdEF1dG9TY3JvbGxYID0gbGFzdEF1dG9TY3JvbGxZID0gbnVsbDtcbiAgICAgIGF1dG9TY3JvbGxzLmxlbmd0aCA9IDA7XG4gICAgfSxcbiAgICBfaGFuZGxlRmFsbGJhY2tBdXRvU2Nyb2xsOiBmdW5jdGlvbiBfaGFuZGxlRmFsbGJhY2tBdXRvU2Nyb2xsKGV2dCkge1xuICAgICAgdGhpcy5faGFuZGxlQXV0b1Njcm9sbChldnQsIHRydWUpO1xuICAgIH0sXG4gICAgX2hhbmRsZUF1dG9TY3JvbGw6IGZ1bmN0aW9uIF9oYW5kbGVBdXRvU2Nyb2xsKGV2dCwgZmFsbGJhY2spIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciB4ID0gKGV2dC50b3VjaGVzID8gZXZ0LnRvdWNoZXNbMF0gOiBldnQpLmNsaWVudFgsXG4gICAgICAgICAgeSA9IChldnQudG91Y2hlcyA/IGV2dC50b3VjaGVzWzBdIDogZXZ0KS5jbGllbnRZLFxuICAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpO1xuICAgICAgdG91Y2hFdnQkMSA9IGV2dDsgLy8gSUUgZG9lcyBub3Qgc2VlbSB0byBoYXZlIG5hdGl2ZSBhdXRvc2Nyb2xsLFxuICAgICAgLy8gRWRnZSdzIGF1dG9zY3JvbGwgc2VlbXMgdG9vIGNvbmRpdGlvbmFsLFxuICAgICAgLy8gTUFDT1MgU2FmYXJpIGRvZXMgbm90IGhhdmUgYXV0b3Njcm9sbCxcbiAgICAgIC8vIEZpcmVmb3ggYW5kIENocm9tZSBhcmUgZ29vZFxuXG4gICAgICBpZiAoZmFsbGJhY2sgfHwgdGhpcy5vcHRpb25zLmZvcmNlQXV0b1Njcm9sbEZhbGxiYWNrIHx8IEVkZ2UgfHwgSUUxMU9yTGVzcyB8fCBTYWZhcmkpIHtcbiAgICAgICAgYXV0b1Njcm9sbChldnQsIHRoaXMub3B0aW9ucywgZWxlbSwgZmFsbGJhY2spOyAvLyBMaXN0ZW5lciBmb3IgcG9pbnRlciBlbGVtZW50IGNoYW5nZVxuXG4gICAgICAgIHZhciBvZ0VsZW1TY3JvbGxlciA9IGdldFBhcmVudEF1dG9TY3JvbGxFbGVtZW50KGVsZW0sIHRydWUpO1xuXG4gICAgICAgIGlmIChzY3JvbGxpbmcgJiYgKCFwb2ludGVyRWxlbUNoYW5nZWRJbnRlcnZhbCB8fCB4ICE9PSBsYXN0QXV0b1Njcm9sbFggfHwgeSAhPT0gbGFzdEF1dG9TY3JvbGxZKSkge1xuICAgICAgICAgIHBvaW50ZXJFbGVtQ2hhbmdlZEludGVydmFsICYmIGNsZWFyUG9pbnRlckVsZW1DaGFuZ2VkSW50ZXJ2YWwoKTsgLy8gRGV0ZWN0IGZvciBwb2ludGVyIGVsZW0gY2hhbmdlLCBlbXVsYXRpbmcgbmF0aXZlIERuRCBiZWhhdmlvdXJcblxuICAgICAgICAgIHBvaW50ZXJFbGVtQ2hhbmdlZEludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5ld0VsZW0gPSBnZXRQYXJlbnRBdXRvU2Nyb2xsRWxlbWVudChkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpLCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKG5ld0VsZW0gIT09IG9nRWxlbVNjcm9sbGVyKSB7XG4gICAgICAgICAgICAgIG9nRWxlbVNjcm9sbGVyID0gbmV3RWxlbTtcbiAgICAgICAgICAgICAgY2xlYXJBdXRvU2Nyb2xscygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhdXRvU2Nyb2xsKGV2dCwgX3RoaXMub3B0aW9ucywgbmV3RWxlbSwgZmFsbGJhY2spO1xuICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICBsYXN0QXV0b1Njcm9sbFggPSB4O1xuICAgICAgICAgIGxhc3RBdXRvU2Nyb2xsWSA9IHk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIERuRCBpcyBlbmFibGVkIChhbmQgYnJvd3NlciBoYXMgZ29vZCBhdXRvc2Nyb2xsaW5nKSwgZmlyc3QgYXV0b3Njcm9sbCB3aWxsIGFscmVhZHkgc2Nyb2xsLCBzbyBnZXQgcGFyZW50IGF1dG9zY3JvbGwgb2YgZmlyc3QgYXV0b3Njcm9sbFxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5idWJibGVTY3JvbGwgfHwgZ2V0UGFyZW50QXV0b1Njcm9sbEVsZW1lbnQoZWxlbSwgdHJ1ZSkgPT09IGdldFdpbmRvd1Njcm9sbGluZ0VsZW1lbnQoKSkge1xuICAgICAgICAgIGNsZWFyQXV0b1Njcm9sbHMoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhdXRvU2Nyb2xsKGV2dCwgdGhpcy5vcHRpb25zLCBnZXRQYXJlbnRBdXRvU2Nyb2xsRWxlbWVudChlbGVtLCBmYWxzZSksIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcyhBdXRvU2Nyb2xsLCB7XG4gICAgcGx1Z2luTmFtZTogJ3Njcm9sbCcsXG4gICAgaW5pdGlhbGl6ZUJ5RGVmYXVsdDogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJBdXRvU2Nyb2xscygpIHtcbiAgYXV0b1Njcm9sbHMuZm9yRWFjaChmdW5jdGlvbiAoYXV0b1Njcm9sbCkge1xuICAgIGNsZWFySW50ZXJ2YWwoYXV0b1Njcm9sbC5waWQpO1xuICB9KTtcbiAgYXV0b1Njcm9sbHMgPSBbXTtcbn1cblxuZnVuY3Rpb24gY2xlYXJQb2ludGVyRWxlbUNoYW5nZWRJbnRlcnZhbCgpIHtcbiAgY2xlYXJJbnRlcnZhbChwb2ludGVyRWxlbUNoYW5nZWRJbnRlcnZhbCk7XG59XG5cbnZhciBhdXRvU2Nyb2xsID0gdGhyb3R0bGUoZnVuY3Rpb24gKGV2dCwgb3B0aW9ucywgcm9vdEVsLCBpc0ZhbGxiYWNrKSB7XG4gIC8vIEJ1ZzogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTA1NTIxXG4gIGlmICghb3B0aW9ucy5zY3JvbGwpIHJldHVybjtcbiAgdmFyIHggPSAoZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXSA6IGV2dCkuY2xpZW50WCxcbiAgICAgIHkgPSAoZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXSA6IGV2dCkuY2xpZW50WSxcbiAgICAgIHNlbnMgPSBvcHRpb25zLnNjcm9sbFNlbnNpdGl2aXR5LFxuICAgICAgc3BlZWQgPSBvcHRpb25zLnNjcm9sbFNwZWVkLFxuICAgICAgd2luU2Nyb2xsZXIgPSBnZXRXaW5kb3dTY3JvbGxpbmdFbGVtZW50KCk7XG4gIHZhciBzY3JvbGxUaGlzSW5zdGFuY2UgPSBmYWxzZSxcbiAgICAgIHNjcm9sbEN1c3RvbUZuOyAvLyBOZXcgc2Nyb2xsIHJvb3QsIHNldCBzY3JvbGxFbFxuXG4gIGlmIChzY3JvbGxSb290RWwgIT09IHJvb3RFbCkge1xuICAgIHNjcm9sbFJvb3RFbCA9IHJvb3RFbDtcbiAgICBjbGVhckF1dG9TY3JvbGxzKCk7XG4gICAgc2Nyb2xsRWwgPSBvcHRpb25zLnNjcm9sbDtcbiAgICBzY3JvbGxDdXN0b21GbiA9IG9wdGlvbnMuc2Nyb2xsRm47XG5cbiAgICBpZiAoc2Nyb2xsRWwgPT09IHRydWUpIHtcbiAgICAgIHNjcm9sbEVsID0gZ2V0UGFyZW50QXV0b1Njcm9sbEVsZW1lbnQocm9vdEVsLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbGF5ZXJzT3V0ID0gMDtcbiAgdmFyIGN1cnJlbnRQYXJlbnQgPSBzY3JvbGxFbDtcblxuICBkbyB7XG4gICAgdmFyIGVsID0gY3VycmVudFBhcmVudCxcbiAgICAgICAgcmVjdCA9IGdldFJlY3QoZWwpLFxuICAgICAgICB0b3AgPSByZWN0LnRvcCxcbiAgICAgICAgYm90dG9tID0gcmVjdC5ib3R0b20sXG4gICAgICAgIGxlZnQgPSByZWN0LmxlZnQsXG4gICAgICAgIHJpZ2h0ID0gcmVjdC5yaWdodCxcbiAgICAgICAgd2lkdGggPSByZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQgPSByZWN0LmhlaWdodCxcbiAgICAgICAgY2FuU2Nyb2xsWCA9IHZvaWQgMCxcbiAgICAgICAgY2FuU2Nyb2xsWSA9IHZvaWQgMCxcbiAgICAgICAgc2Nyb2xsV2lkdGggPSBlbC5zY3JvbGxXaWR0aCxcbiAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBlbENTUyA9IGNzcyhlbCksXG4gICAgICAgIHNjcm9sbFBvc1ggPSBlbC5zY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxQb3NZID0gZWwuc2Nyb2xsVG9wO1xuXG4gICAgaWYgKGVsID09PSB3aW5TY3JvbGxlcikge1xuICAgICAgY2FuU2Nyb2xsWCA9IHdpZHRoIDwgc2Nyb2xsV2lkdGggJiYgKGVsQ1NTLm92ZXJmbG93WCA9PT0gJ2F1dG8nIHx8IGVsQ1NTLm92ZXJmbG93WCA9PT0gJ3Njcm9sbCcgfHwgZWxDU1Mub3ZlcmZsb3dYID09PSAndmlzaWJsZScpO1xuICAgICAgY2FuU2Nyb2xsWSA9IGhlaWdodCA8IHNjcm9sbEhlaWdodCAmJiAoZWxDU1Mub3ZlcmZsb3dZID09PSAnYXV0bycgfHwgZWxDU1Mub3ZlcmZsb3dZID09PSAnc2Nyb2xsJyB8fCBlbENTUy5vdmVyZmxvd1kgPT09ICd2aXNpYmxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhblNjcm9sbFggPSB3aWR0aCA8IHNjcm9sbFdpZHRoICYmIChlbENTUy5vdmVyZmxvd1ggPT09ICdhdXRvJyB8fCBlbENTUy5vdmVyZmxvd1ggPT09ICdzY3JvbGwnKTtcbiAgICAgIGNhblNjcm9sbFkgPSBoZWlnaHQgPCBzY3JvbGxIZWlnaHQgJiYgKGVsQ1NTLm92ZXJmbG93WSA9PT0gJ2F1dG8nIHx8IGVsQ1NTLm92ZXJmbG93WSA9PT0gJ3Njcm9sbCcpO1xuICAgIH1cblxuICAgIHZhciB2eCA9IGNhblNjcm9sbFggJiYgKE1hdGguYWJzKHJpZ2h0IC0geCkgPD0gc2VucyAmJiBzY3JvbGxQb3NYICsgd2lkdGggPCBzY3JvbGxXaWR0aCkgLSAoTWF0aC5hYnMobGVmdCAtIHgpIDw9IHNlbnMgJiYgISFzY3JvbGxQb3NYKTtcbiAgICB2YXIgdnkgPSBjYW5TY3JvbGxZICYmIChNYXRoLmFicyhib3R0b20gLSB5KSA8PSBzZW5zICYmIHNjcm9sbFBvc1kgKyBoZWlnaHQgPCBzY3JvbGxIZWlnaHQpIC0gKE1hdGguYWJzKHRvcCAtIHkpIDw9IHNlbnMgJiYgISFzY3JvbGxQb3NZKTtcblxuICAgIGlmICghYXV0b1Njcm9sbHNbbGF5ZXJzT3V0XSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbGF5ZXJzT3V0OyBpKyspIHtcbiAgICAgICAgaWYgKCFhdXRvU2Nyb2xsc1tpXSkge1xuICAgICAgICAgIGF1dG9TY3JvbGxzW2ldID0ge307XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYXV0b1Njcm9sbHNbbGF5ZXJzT3V0XS52eCAhPSB2eCB8fCBhdXRvU2Nyb2xsc1tsYXllcnNPdXRdLnZ5ICE9IHZ5IHx8IGF1dG9TY3JvbGxzW2xheWVyc091dF0uZWwgIT09IGVsKSB7XG4gICAgICBhdXRvU2Nyb2xsc1tsYXllcnNPdXRdLmVsID0gZWw7XG4gICAgICBhdXRvU2Nyb2xsc1tsYXllcnNPdXRdLnZ4ID0gdng7XG4gICAgICBhdXRvU2Nyb2xsc1tsYXllcnNPdXRdLnZ5ID0gdnk7XG4gICAgICBjbGVhckludGVydmFsKGF1dG9TY3JvbGxzW2xheWVyc091dF0ucGlkKTtcblxuICAgICAgaWYgKHZ4ICE9IDAgfHwgdnkgIT0gMCkge1xuICAgICAgICBzY3JvbGxUaGlzSW5zdGFuY2UgPSB0cnVlO1xuICAgICAgICAvKiBqc2hpbnQgbG9vcGZ1bmM6dHJ1ZSAqL1xuXG4gICAgICAgIGF1dG9TY3JvbGxzW2xheWVyc091dF0ucGlkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGVtdWxhdGUgZHJhZyBvdmVyIGR1cmluZyBhdXRvc2Nyb2xsIChmYWxsYmFjayksIGVtdWxhdGluZyBuYXRpdmUgRG5EIGJlaGF2aW91clxuICAgICAgICAgIGlmIChpc0ZhbGxiYWNrICYmIHRoaXMubGF5ZXIgPT09IDApIHtcbiAgICAgICAgICAgIFNvcnRhYmxlLmFjdGl2ZS5fb25Ub3VjaE1vdmUodG91Y2hFdnQkMSk7IC8vIFRvIG1vdmUgZ2hvc3QgaWYgaXQgaXMgcG9zaXRpb25lZCBhYnNvbHV0ZWx5XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc2Nyb2xsT2Zmc2V0WSA9IGF1dG9TY3JvbGxzW3RoaXMubGF5ZXJdLnZ5ID8gYXV0b1Njcm9sbHNbdGhpcy5sYXllcl0udnkgKiBzcGVlZCA6IDA7XG4gICAgICAgICAgdmFyIHNjcm9sbE9mZnNldFggPSBhdXRvU2Nyb2xsc1t0aGlzLmxheWVyXS52eCA/IGF1dG9TY3JvbGxzW3RoaXMubGF5ZXJdLnZ4ICogc3BlZWQgOiAwO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBzY3JvbGxDdXN0b21GbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaWYgKHNjcm9sbEN1c3RvbUZuLmNhbGwoU29ydGFibGUuZHJhZ2dlZC5wYXJlbnROb2RlW2V4cGFuZG9dLCBzY3JvbGxPZmZzZXRYLCBzY3JvbGxPZmZzZXRZLCBldnQsIHRvdWNoRXZ0JDEsIGF1dG9TY3JvbGxzW3RoaXMubGF5ZXJdLmVsKSAhPT0gJ2NvbnRpbnVlJykge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2Nyb2xsQnkoYXV0b1Njcm9sbHNbdGhpcy5sYXllcl0uZWwsIHNjcm9sbE9mZnNldFgsIHNjcm9sbE9mZnNldFkpO1xuICAgICAgICB9LmJpbmQoe1xuICAgICAgICAgIGxheWVyOiBsYXllcnNPdXRcbiAgICAgICAgfSksIDI0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXllcnNPdXQrKztcbiAgfSB3aGlsZSAob3B0aW9ucy5idWJibGVTY3JvbGwgJiYgY3VycmVudFBhcmVudCAhPT0gd2luU2Nyb2xsZXIgJiYgKGN1cnJlbnRQYXJlbnQgPSBnZXRQYXJlbnRBdXRvU2Nyb2xsRWxlbWVudChjdXJyZW50UGFyZW50LCBmYWxzZSkpKTtcblxuICBzY3JvbGxpbmcgPSBzY3JvbGxUaGlzSW5zdGFuY2U7IC8vIGluIGNhc2UgYW5vdGhlciBmdW5jdGlvbiBjYXRjaGVzIHNjcm9sbGluZyBhcyBmYWxzZSBpbiBiZXR3ZWVuIHdoZW4gaXQgaXMgbm90XG59LCAzMCk7XG5cbnZhciBkcm9wID0gZnVuY3Rpb24gZHJvcChfcmVmKSB7XG4gIHZhciBvcmlnaW5hbEV2ZW50ID0gX3JlZi5vcmlnaW5hbEV2ZW50LFxuICAgICAgcHV0U29ydGFibGUgPSBfcmVmLnB1dFNvcnRhYmxlLFxuICAgICAgZHJhZ0VsID0gX3JlZi5kcmFnRWwsXG4gICAgICBhY3RpdmVTb3J0YWJsZSA9IF9yZWYuYWN0aXZlU29ydGFibGUsXG4gICAgICBkaXNwYXRjaFNvcnRhYmxlRXZlbnQgPSBfcmVmLmRpc3BhdGNoU29ydGFibGVFdmVudCxcbiAgICAgIGhpZGVHaG9zdEZvclRhcmdldCA9IF9yZWYuaGlkZUdob3N0Rm9yVGFyZ2V0LFxuICAgICAgdW5oaWRlR2hvc3RGb3JUYXJnZXQgPSBfcmVmLnVuaGlkZUdob3N0Rm9yVGFyZ2V0O1xuICBpZiAoIW9yaWdpbmFsRXZlbnQpIHJldHVybjtcbiAgdmFyIHRvU29ydGFibGUgPSBwdXRTb3J0YWJsZSB8fCBhY3RpdmVTb3J0YWJsZTtcbiAgaGlkZUdob3N0Rm9yVGFyZ2V0KCk7XG4gIHZhciB0b3VjaCA9IG9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgb3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPyBvcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdIDogb3JpZ2luYWxFdmVudDtcbiAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2guY2xpZW50WCwgdG91Y2guY2xpZW50WSk7XG4gIHVuaGlkZUdob3N0Rm9yVGFyZ2V0KCk7XG5cbiAgaWYgKHRvU29ydGFibGUgJiYgIXRvU29ydGFibGUuZWwuY29udGFpbnModGFyZ2V0KSkge1xuICAgIGRpc3BhdGNoU29ydGFibGVFdmVudCgnc3BpbGwnKTtcbiAgICB0aGlzLm9uU3BpbGwoe1xuICAgICAgZHJhZ0VsOiBkcmFnRWwsXG4gICAgICBwdXRTb3J0YWJsZTogcHV0U29ydGFibGVcbiAgICB9KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gUmV2ZXJ0KCkge31cblxuUmV2ZXJ0LnByb3RvdHlwZSA9IHtcbiAgc3RhcnRJbmRleDogbnVsbCxcbiAgZHJhZ1N0YXJ0OiBmdW5jdGlvbiBkcmFnU3RhcnQoX3JlZjIpIHtcbiAgICB2YXIgb2xkRHJhZ2dhYmxlSW5kZXggPSBfcmVmMi5vbGREcmFnZ2FibGVJbmRleDtcbiAgICB0aGlzLnN0YXJ0SW5kZXggPSBvbGREcmFnZ2FibGVJbmRleDtcbiAgfSxcbiAgb25TcGlsbDogZnVuY3Rpb24gb25TcGlsbChfcmVmMykge1xuICAgIHZhciBkcmFnRWwgPSBfcmVmMy5kcmFnRWwsXG4gICAgICAgIHB1dFNvcnRhYmxlID0gX3JlZjMucHV0U29ydGFibGU7XG4gICAgdGhpcy5zb3J0YWJsZS5jYXB0dXJlQW5pbWF0aW9uU3RhdGUoKTtcblxuICAgIGlmIChwdXRTb3J0YWJsZSkge1xuICAgICAgcHV0U29ydGFibGUuY2FwdHVyZUFuaW1hdGlvblN0YXRlKCk7XG4gICAgfVxuXG4gICAgdmFyIG5leHRTaWJsaW5nID0gZ2V0Q2hpbGQodGhpcy5zb3J0YWJsZS5lbCwgdGhpcy5zdGFydEluZGV4LCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgaWYgKG5leHRTaWJsaW5nKSB7XG4gICAgICB0aGlzLnNvcnRhYmxlLmVsLmluc2VydEJlZm9yZShkcmFnRWwsIG5leHRTaWJsaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb3J0YWJsZS5lbC5hcHBlbmRDaGlsZChkcmFnRWwpO1xuICAgIH1cblxuICAgIHRoaXMuc29ydGFibGUuYW5pbWF0ZUFsbCgpO1xuXG4gICAgaWYgKHB1dFNvcnRhYmxlKSB7XG4gICAgICBwdXRTb3J0YWJsZS5hbmltYXRlQWxsKCk7XG4gICAgfVxuICB9LFxuICBkcm9wOiBkcm9wXG59O1xuXG5fZXh0ZW5kcyhSZXZlcnQsIHtcbiAgcGx1Z2luTmFtZTogJ3JldmVydE9uU3BpbGwnXG59KTtcblxuZnVuY3Rpb24gUmVtb3ZlKCkge31cblxuUmVtb3ZlLnByb3RvdHlwZSA9IHtcbiAgb25TcGlsbDogZnVuY3Rpb24gb25TcGlsbChfcmVmNCkge1xuICAgIHZhciBkcmFnRWwgPSBfcmVmNC5kcmFnRWwsXG4gICAgICAgIHB1dFNvcnRhYmxlID0gX3JlZjQucHV0U29ydGFibGU7XG4gICAgdmFyIHBhcmVudFNvcnRhYmxlID0gcHV0U29ydGFibGUgfHwgdGhpcy5zb3J0YWJsZTtcbiAgICBwYXJlbnRTb3J0YWJsZS5jYXB0dXJlQW5pbWF0aW9uU3RhdGUoKTtcbiAgICBkcmFnRWwucGFyZW50Tm9kZSAmJiBkcmFnRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnRWwpO1xuICAgIHBhcmVudFNvcnRhYmxlLmFuaW1hdGVBbGwoKTtcbiAgfSxcbiAgZHJvcDogZHJvcFxufTtcblxuX2V4dGVuZHMoUmVtb3ZlLCB7XG4gIHBsdWdpbk5hbWU6ICdyZW1vdmVPblNwaWxsJ1xufSk7XG5cblNvcnRhYmxlLm1vdW50KG5ldyBBdXRvU2Nyb2xsUGx1Z2luKCkpO1xuU29ydGFibGUubW91bnQoUmVtb3ZlLCBSZXZlcnQpO1xuXG5mdW5jdGlvbiBnZXRDb25zb2xlKCkge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5jb25zb2xlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdsb2JhbC5jb25zb2xlO1xyXG59XHJcbmNvbnN0IGNvbnNvbGUgPSBnZXRDb25zb2xlKCk7XHJcbmZ1bmN0aW9uIGNhY2hlZChmbikge1xyXG4gICAgY29uc3QgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNhY2hlZEZuKHN0cikge1xyXG4gICAgICAgIGNvbnN0IGhpdCA9IGNhY2hlW3N0cl07XHJcbiAgICAgICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpO1xyXG4gICAgfTtcclxufVxyXG5jb25zdCByZWdleCA9IC8tKFxcdykvZztcclxuY29uc3QgY2FtZWxpemUgPSBjYWNoZWQoKHN0cikgPT4gc3RyLnJlcGxhY2UocmVnZXgsIChfLCBjKSA9PiAoYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnKSkpO1xyXG5mdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcclxuICAgIGlmIChub2RlLnBhcmVudEVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICBub2RlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQobm9kZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5zZXJ0Tm9kZUF0KGZhdGhlck5vZGUsIG5vZGUsIHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCByZWZOb2RlID0gcG9zaXRpb24gPT09IDBcclxuICAgICAgICA/IGZhdGhlck5vZGUuY2hpbGRyZW5bMF1cclxuICAgICAgICA6IGZhdGhlck5vZGUuY2hpbGRyZW5bcG9zaXRpb24gLSAxXS5uZXh0U2libGluZztcclxuICAgIGZhdGhlck5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZk5vZGUpO1xyXG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVWbUluZGV4KHZub2RlcywgZWxlbWVudCkge1xyXG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModm5vZGVzKS5pbmRleE9mKGVsZW1lbnQpO1xyXG59XHJcbmZ1bmN0aW9uIGNvbXB1dGVJbmRleGVzKHNsb3RzLCBjaGlsZHJlbiwgaXNUcmFuc2l0aW9uLCBmb290ZXJPZmZzZXQpIHtcclxuICAgIGlmICghc2xvdHMpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBjb25zdCBlbG1Gcm9tTm9kZXMgPSBPYmplY3QudmFsdWVzKHNsb3RzKTtcclxuICAgIGNvbnN0IGZvb3RlckluZGV4ID0gY2hpbGRyZW4ubGVuZ3RoIC0gZm9vdGVyT2Zmc2V0O1xyXG4gICAgY29uc3QgcmF3SW5kZXhlcyA9IFsuLi5jaGlsZHJlbl0ubWFwKChlbHQsIGlkeCkgPT4gaWR4ID49IGZvb3RlckluZGV4ID8gZWxtRnJvbU5vZGVzLmxlbmd0aCA6IGVsbUZyb21Ob2Rlcy5pbmRleE9mKGVsdCkpO1xyXG4gICAgcmV0dXJuIHJhd0luZGV4ZXM7XHJcbn1cclxuZnVuY3Rpb24gZW1pdChldnROYW1lLCBldnREYXRhKSB7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHRoaXMuJGVtaXQoZXZ0TmFtZS50b0xvd2VyQ2FzZSgpLCBldnREYXRhKSk7XHJcbn1cclxuZnVuY3Rpb24gZGVsZWdhdGVBbmRFbWl0KGV2dE5hbWUpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgcmV0dXJuIGV2dERhdGEgPT4ge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmICh0aGlzLnJlYWxMaXN0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzWydvbkRyYWcnICsgZXZ0TmFtZV0oZXZ0RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGVtaXQuY2FsbCh0aGlzLCBldnROYW1lLCBldnREYXRhKTtcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gaXNUcmFuc2l0aW9uTmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gWyd0cmFuc2l0aW9uLWdyb3VwJywgJ1RyYW5zaXRpb25Hcm91cCddLmluY2x1ZGVzKG5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGlzVHJhbnNpdGlvbihzbG90cykge1xyXG4gICAgaWYgKCFzbG90cyB8fCBzbG90cy5sZW5ndGggIT09IDEpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBbeyB0eXBlIH1dID0gc2xvdHM7XHJcbiAgICBpZiAoIXR5cGUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIHJldHVybiBpc1RyYW5zaXRpb25OYW1lKHR5cGUubmFtZSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50QXR0cmlidXRlcygkYXR0cnMsIGNvbXBvbmVudERhdGEpIHtcclxuICAgIGlmICghY29tcG9uZW50RGF0YSkge1xyXG4gICAgICAgIHJldHVybiAkYXR0cnM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyAuLi5jb21wb25lbnREYXRhLnByb3BzLCAuLi5jb21wb25lbnREYXRhLmF0dHJzIH07XHJcbn1cclxuY29uc3QgZXZlbnRzTGlzdGVuZWQgPSBbJ1N0YXJ0JywgJ0FkZCcsICdSZW1vdmUnLCAnVXBkYXRlJywgJ0VuZCddO1xyXG5jb25zdCBldmVudHNUb0VtaXQgPSBbJ0Nob29zZScsICdVbmNob29zZScsICdTb3J0JywgJ0ZpbHRlcicsICdDbG9uZSddO1xyXG5jb25zdCByZWFkb25seVByb3BlcnRpZXMgPSBbJ01vdmUnLCAuLi5ldmVudHNMaXN0ZW5lZCwgLi4uZXZlbnRzVG9FbWl0XS5tYXAoZXZ0ID0+ICdvbicgKyBldnQpO1xyXG4vLyBAdHMtaWdub3JlXHJcbmxldCBkcmFnZ2luZ0VsZW1lbnQgPSBudWxsO1xyXG5jb25zdCBwcm9wcyA9IHtcclxuICAgIG9wdGlvbnM6IE9iamVjdCxcclxuICAgIGxpc3Q6IHtcclxuICAgICAgICB0eXBlOiBBcnJheSxcclxuICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgIH0sXHJcbiAgICBub1RyYW5zaXRpb25PbkRyYWc6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIGNsb25lOiB7XHJcbiAgICAgICAgdHlwZTogRnVuY3Rpb24sXHJcbiAgICAgICAgZGVmYXVsdDogKG9yaWdpbmFsKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbDtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHRhZzoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0OiAnZGl2JyxcclxuICAgIH0sXHJcbiAgICBtb3ZlOiB7XHJcbiAgICAgICAgdHlwZTogRnVuY3Rpb24sXHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnREYXRhOiB7XHJcbiAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgfSxcclxuICAgIG1vZGVsVmFsdWU6IHtcclxuICAgICAgICB0eXBlOiBBcnJheSxcclxuICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgIH0sXHJcbn07XHJcbmNvbnN0IFZ1ZURyYWdnYWJsZU5leHQgPSBkZWZpbmVDb21wb25lbnQoe1xyXG4gICAgbmFtZTogJ1Z1ZURyYWdnYWJsZU5leHQnLFxyXG4gICAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcclxuICAgIGVtaXRzOiBbXHJcbiAgICAgICAgJ3VwZGF0ZTptb2RlbFZhbHVlJyxcclxuICAgICAgICAnbW92ZScsXHJcbiAgICAgICAgJ2NoYW5nZScsXHJcbiAgICAgICAgLi4uZXZlbnRzTGlzdGVuZWQubWFwKHMgPT4gcy50b0xvd2VyQ2FzZSgpKSxcclxuICAgICAgICAuLi5ldmVudHNUb0VtaXQubWFwKHMgPT4gcy50b0xvd2VyQ2FzZSgpKSxcclxuICAgIF0sXHJcbiAgICBwcm9wcyxcclxuICAgIGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbk1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBub25lRnVuY3Rpb25hbENvbXBvbmVudE1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWFkZXJPZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgIGZvb3Rlck9mZnNldDogMCxcclxuICAgICAgICAgICAgX3NvcnRhYmxlOiB7fSxcclxuICAgICAgICAgICAgdmlzaWJsZUluZGV4ZXM6IFtdLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB7fSxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuJHNsb3RzLmRlZmF1bHQgPyB0aGlzLiRzbG90cy5kZWZhdWx0KCkgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IGF0dHJzID0gZ2V0Q29tcG9uZW50QXR0cmlidXRlcyh0aGlzLiRhdHRycywgdGhpcy5jb21wb25lbnREYXRhKTtcclxuICAgICAgICBpZiAoIXNsb3RzKVxyXG4gICAgICAgICAgICByZXR1cm4gaCh0aGlzLmdldFRhZygpLCBhdHRycywgW10pO1xyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbk1vZGUgPSBpc1RyYW5zaXRpb24oc2xvdHMpO1xyXG4gICAgICAgIHJldHVybiBoKHRoaXMuZ2V0VGFnKCksIGF0dHJzLCBzbG90cyk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5saXN0ICE9PSBudWxsICYmIHRoaXMubW9kZWxWYWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaXN0IHByb3BzIGFyZSBtdXR1YWxseSBleGNsdXNpdmUhIFBsZWFzZSBzZXQgb25lLicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3VudGVkKCkge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnNBZGRlZCA9IHt9O1xyXG4gICAgICAgIGV2ZW50c0xpc3RlbmVkLmZvckVhY2goZWx0ID0+IHtcclxuICAgICAgICAgICAgb3B0aW9uc0FkZGVkWydvbicgKyBlbHRdID0gZGVsZWdhdGVBbmRFbWl0LmNhbGwodGhpcywgZWx0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBldmVudHNUb0VtaXQuZm9yRWFjaChlbHQgPT4ge1xyXG4gICAgICAgICAgICBvcHRpb25zQWRkZWRbJ29uJyArIGVsdF0gPSBlbWl0LmJpbmQodGhpcywgZWx0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmtleXModGhpcy4kYXR0cnMpLnJlZHVjZSgocmVzLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgcmVzW2NhbWVsaXplKGtleSldID0gdGhpcy4kYXR0cnNba2V5XTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGF0dHJpYnV0ZXMsIG9wdGlvbnNBZGRlZCwge1xyXG4gICAgICAgICAgICBvbk1vdmU6IChldnQsIG9yaWdpbmFsRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uRHJhZ01vdmUoZXZ0LCBvcmlnaW5hbEV2ZW50KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAhKCdkcmFnZ2FibGUnIGluIG9wdGlvbnMpICYmIChvcHRpb25zLmRyYWdnYWJsZSA9ICc+KicpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldERvbUVsZW1lbnQgPSB0aGlzLiRlbC5ub2RlVHlwZSA9PT0gMSA/IHRoaXMuJGVsIDogdGhpcy4kZWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICB0aGlzLl9zb3J0YWJsZSA9IG5ldyBTb3J0YWJsZSh0YXJnZXREb21FbGVtZW50LCBvcHRpb25zKTtcclxuICAgICAgICB0YXJnZXREb21FbGVtZW50Ll9fZHJhZ2dhYmxlX2NvbXBvbmVudF9fID0gdGhpcztcclxuICAgICAgICB0aGlzLmNvbXB1dGVJbmRleGVzKCk7XHJcbiAgICB9LFxyXG4gICAgYmVmb3JlVW5tb3VudCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc29ydGFibGUgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRhYmxlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7IH1cclxuICAgIH0sXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICAgIHJlYWxMaXN0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0ID8gdGhpcy5saXN0IDogdGhpcy5tb2RlbFZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgICAkYXR0cnM6IHtcclxuICAgICAgICAgICAgaGFuZGxlcihuZXdPcHRpb25WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVPcHRpb25zKG5ld09wdGlvblZhbHVlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlYWxMaXN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVJbmRleGVzKCk7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgZ2V0VGFnKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQgPyByZXNvbHZlQ29tcG9uZW50KHRoaXMuY29tcG9uZW50KSA6IHRoaXMudGFnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlT3B0aW9ucyhuZXdPcHRpb25WYWx1ZSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBuZXdPcHRpb25WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjYW1lbGl6ZShwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVhZG9ubHlQcm9wZXJ0aWVzLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRhYmxlLm9wdGlvbih2YWx1ZSwgbmV3T3B0aW9uVmFsdWVbcHJvcGVydHldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q2hpbGRyZW5Ob2RlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsLmNoaWxkcmVuO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcHV0ZUluZGV4ZXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZUluZGV4ZXMgPSBjb21wdXRlSW5kZXhlcyh0aGlzLmdldENoaWxkcmVuTm9kZXMoKSwgdGhpcy4kZWwuY2hpbGRyZW4sIHRoaXMudHJhbnNpdGlvbk1vZGUsIHRoaXMuZm9vdGVyT2Zmc2V0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRVbmRlcmx5aW5nVm0oaHRtbEVsdCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGNvbXB1dGVWbUluZGV4KHRoaXMuZ2V0Q2hpbGRyZW5Ob2RlcygpIHx8IFtdLCBodG1sRWx0KTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgLy9FZGdlIGNhc2UgZHVyaW5nIG1vdmUgY2FsbGJhY2s6IHJlbGF0ZWQgZWxlbWVudCBtaWdodCBiZVxyXG4gICAgICAgICAgICAgICAgLy9hbiBlbGVtZW50IGRpZmZlcmVudCBmcm9tIGNvbGxlY3Rpb25cclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5yZWFsTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgIHJldHVybiB7IGluZGV4LCBlbGVtZW50IH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbWl0Q2hhbmdlcyhldnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZXZ0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbHRlckxpc3Qob25MaXN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3QpIHtcclxuICAgICAgICAgICAgICAgIG9uTGlzdCh0aGlzLmxpc3QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0xpc3QgPSBbLi4udGhpcy5tb2RlbFZhbHVlXTtcclxuICAgICAgICAgICAgb25MaXN0KG5ld0xpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG5ld0xpc3QpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BsaWNlTGlzdCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BsaWNlTGlzdCA9IChsaXN0KSA9PiBsaXN0LnNwbGljZSguLi5hcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB0aGlzLmFsdGVyTGlzdChzcGxpY2VMaXN0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKG9sZEluZGV4LCBuZXdJbmRleCkge1xyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVQb3NpdGlvbiA9IChsaXN0KSA9PiBsaXN0LnNwbGljZShuZXdJbmRleCwgMCwgbGlzdC5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcclxuICAgICAgICAgICAgdGhpcy5hbHRlckxpc3QodXBkYXRlUG9zaXRpb24pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Vm1JbmRleChkb21JbmRleCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy52aXNpYmxlSW5kZXhlcztcclxuICAgICAgICAgICAgY29uc3QgbnVtYmVySW5kZXhlcyA9IGluZGV4ZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICByZXR1cm4gZG9tSW5kZXggPiBudW1iZXJJbmRleGVzIC0gMSA/IG51bWJlckluZGV4ZXMgOiBpbmRleGVzW2RvbUluZGV4XTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldENvbXBvbmVudCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHNsb3RzLmRlZmF1bHRcclxuICAgICAgICAgICAgICAgID8gLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2xvdHMuZGVmYXVsdCgpWzBdLmNvbXBvbmVudEluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNldFRyYW5zaXRpb25EYXRhKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5ub1RyYW5zaXRpb25PbkRyYWcgfHwgIXRoaXMudHJhbnNpdGlvbk1vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLmdldENoaWxkcmVuTm9kZXMoKTtcclxuICAgICAgICAgICAgbm9kZXNbaW5kZXhdLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2l0aW9uQ29udGFpbmVyID0gdGhpcy5nZXRDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbkNvbnRhaW5lci5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uQ29udGFpbmVyLmtlcHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkRyYWdTdGFydChldnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wdXRlSW5kZXhlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmdldFVuZGVybHlpbmdWbShldnQuaXRlbSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBldnQuaXRlbS5fdW5kZXJseWluZ192bV8gPSB0aGlzLmNsb25lKHRoaXMuY29udGV4dC5lbGVtZW50KTtcclxuICAgICAgICAgICAgZHJhZ2dpbmdFbGVtZW50ID0gZXZ0Lml0ZW07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkRyYWdBZGQoZXZ0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldnQuaXRlbS5fdW5kZXJseWluZ192bV87XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZW1vdmVOb2RlKGV2dC5pdGVtKTtcclxuICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSB0aGlzLmdldFZtSW5kZXgoZXZ0Lm5ld0luZGV4KTtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlTGlzdChuZXdJbmRleCwgMCwgZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcHV0ZUluZGV4ZXMoKTtcclxuICAgICAgICAgICAgY29uc3QgYWRkZWQgPSB7IGVsZW1lbnQsIG5ld0luZGV4IH07XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZXMoeyBhZGRlZCB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRHJhZ1JlbW92ZShldnQpIHtcclxuICAgICAgICAgICAgaW5zZXJ0Tm9kZUF0KHRoaXMuJGVsLCBldnQuaXRlbSwgZXZ0Lm9sZEluZGV4KTtcclxuICAgICAgICAgICAgaWYgKGV2dC5wdWxsTW9kZSA9PT0gJ2Nsb25lJykge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShldnQuY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBvbGRJbmRleCA9IHRoaXMuY29udGV4dC5pbmRleDtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlTGlzdChvbGRJbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZWQgPSB7IGVsZW1lbnQ6IHRoaXMuY29udGV4dC5lbGVtZW50LCBvbGRJbmRleCB9O1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0VHJhbnNpdGlvbkRhdGEob2xkSW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VzKHsgcmVtb3ZlZCB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRHJhZ1VwZGF0ZShldnQpIHtcclxuICAgICAgICAgICAgcmVtb3ZlTm9kZShldnQuaXRlbSk7XHJcbiAgICAgICAgICAgIGluc2VydE5vZGVBdChldnQuZnJvbSwgZXZ0Lml0ZW0sIGV2dC5vbGRJbmRleCk7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBjb25zdCBvbGRJbmRleCA9IHRoaXMuY29udGV4dC5pbmRleDtcclxuICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSB0aGlzLmdldFZtSW5kZXgoZXZ0Lm5ld0luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbihvbGRJbmRleCwgbmV3SW5kZXgpO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgY29uc3QgbW92ZWQgPSB7IGVsZW1lbnQ6IHRoaXMuY29udGV4dC5lbGVtZW50LCBvbGRJbmRleCwgbmV3SW5kZXggfTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlcyh7IG1vdmVkIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlUHJvcGVydHkoZXZ0LCBwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgICAgZXZ0Lmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkgJiZcclxuICAgICAgICAgICAgICAgIChldnRbcHJvcGVydHlOYW1lXSArPSB0aGlzLmhlYWRlck9mZnNldCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkRyYWdNb3ZlKGV2dCwgb3JpZ2luYWxFdmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBvbk1vdmUgPSB0aGlzLm1vdmU7XHJcbiAgICAgICAgICAgIGlmICghb25Nb3ZlIHx8ICF0aGlzLnJlYWxMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCByZWxhdGVkQ29udGV4dCA9IHRoaXMuZ2V0UmVsYXRlZENvbnRleHRGcm9tTW92ZUV2ZW50KGV2dCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyYWdnZWRDb250ZXh0ID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICBjb25zdCBmdXR1cmVJbmRleCA9IHRoaXMuY29tcHV0ZUZ1dHVyZUluZGV4KHJlbGF0ZWRDb250ZXh0LCBldnQpO1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGRyYWdnZWRDb250ZXh0LCB7IGZ1dHVyZUluZGV4IH0pO1xyXG4gICAgICAgICAgICBjb25zdCBzZW5kRXZ0ID0gT2JqZWN0LmFzc2lnbih7fSwgZXZ0LCB7XHJcbiAgICAgICAgICAgICAgICByZWxhdGVkQ29udGV4dCxcclxuICAgICAgICAgICAgICAgIGRyYWdnZWRDb250ZXh0LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG9uTW92ZShzZW5kRXZ0LCBvcmlnaW5hbEV2ZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRHJhZ0VuZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wdXRlSW5kZXhlcygpO1xyXG4gICAgICAgICAgICBkcmFnZ2luZ0VsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VHJhcmdldGVkQ29tcG9uZW50KGh0bUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGh0bUVsZW1lbnQuX19kcmFnZ2FibGVfY29tcG9uZW50X187XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRSZWxhdGVkQ29udGV4dEZyb21Nb3ZlRXZlbnQoeyB0bywgcmVsYXRlZCB9KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZ2V0VHJhcmdldGVkQ29tcG9uZW50KHRvKTtcclxuICAgICAgICAgICAgaWYgKCFjb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbXBvbmVudCB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBjb21wb25lbnQucmVhbExpc3Q7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB7IGxpc3QsIGNvbXBvbmVudCB9O1xyXG4gICAgICAgICAgICBpZiAodG8gIT09IHJlbGF0ZWQgJiYgbGlzdCAmJiBjb21wb25lbnQuZ2V0VW5kZXJseWluZ1ZtKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGNvbXBvbmVudC5nZXRVbmRlcmx5aW5nVm0ocmVsYXRlZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkZXN0aW5hdGlvbiwgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wdXRlRnV0dXJlSW5kZXgocmVsYXRlZENvbnRleHQsIGV2dCkge1xyXG4gICAgICAgICAgICBjb25zdCBkb21DaGlsZHJlbiA9IFsuLi5ldnQudG8uY2hpbGRyZW5dLmZpbHRlcihlbCA9PiBlbC5zdHlsZVsnZGlzcGxheSddICE9PSAnbm9uZScpO1xyXG4gICAgICAgICAgICBpZiAoZG9tQ2hpbGRyZW4ubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRET01JbmRleCA9IGRvbUNoaWxkcmVuLmluZGV4T2YoZXZ0LnJlbGF0ZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSByZWxhdGVkQ29udGV4dC5jb21wb25lbnQuZ2V0Vm1JbmRleChjdXJyZW50RE9NSW5kZXgpO1xyXG4gICAgICAgICAgICBjb25zdCBkcmFnZ2VkSW5MaXN0ID0gZG9tQ2hpbGRyZW4uaW5kZXhPZihkcmFnZ2luZ0VsZW1lbnQpICE9PSAtMTtcclxuICAgICAgICAgICAgcmV0dXJuIGRyYWdnZWRJbkxpc3QgfHwgIWV2dC53aWxsSW5zZXJ0QWZ0ZXJcclxuICAgICAgICAgICAgICAgID8gY3VycmVudEluZGV4XHJcbiAgICAgICAgICAgICAgICA6IGN1cnJlbnRJbmRleCArIDE7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xuXG5leHBvcnQgeyBWdWVEcmFnZ2FibGVOZXh0IH07XG4iLCJpbXBvcnQgeyBpbmplY3QsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBmb3JtS2V5IH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uLCByZXF1aXJlc1FGb3JtIH0pIHtcbiAgY29uc3QgJGZvcm0gPSBpbmplY3QoZm9ybUtleSwgZmFsc2UpXG5cbiAgaWYgKCRmb3JtICE9PSBmYWxzZSkge1xuICAgIGNvbnN0IHsgcHJvcHMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgLy8gZXhwb3J0IHB1YmxpYyBtZXRob2QgKHNvIGl0IGNhbiBiZSB1c2VkIGluIFFGb3JtKVxuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGlzYWJsZSwgdmFsID0+IHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgdHlwZW9mIHJlc2V0VmFsaWRhdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiByZXNldFZhbGlkYXRpb24oKVxuICAgICAgICAkZm9ybS51bmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJGZvcm0uYmluZENvbXBvbmVudChwcm94eSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIC8vIHJlZ2lzdGVyIHRvIHBhcmVudCBRRm9ybVxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAkZm9ybS5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgLy8gdW4tcmVnaXN0ZXIgZnJvbSBwYXJlbnQgUUZvcm1cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAocmVxdWlyZXNRRm9ybSA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1BhcmVudCBRRm9ybSBub3QgZm91bmQgb24gdXNlRm9ybUNoaWxkKCkhJylcbiAgfVxufVxuIiwiLy8gZmlsZSByZWZlcmVuY2VkIGZyb20gZG9jc1xuXG5jb25zdFxuICBoZXggPSAvXiNbMC05YS1mQS1GXXszfShbMC05YS1mQS1GXXszfSk/JC8sXG4gIGhleGEgPSAvXiNbMC05YS1mQS1GXXs0fShbMC05YS1mQS1GXXs0fSk/JC8sXG4gIGhleE9ySGV4YSA9IC9eIyhbMC05YS1mQS1GXXszfXxbMC05YS1mQS1GXXs0fXxbMC05YS1mQS1GXXs2fXxbMC05YS1mQS1GXXs4fSkkLyxcbiAgcmdiID0gL15yZ2JcXCgoKDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwpezJ9KDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKVxcKSQvLFxuICByZ2JhID0gL15yZ2JhXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKDB8MFxcLlswLTldK1sxLTldfDBcXC5bMS05XSt8MSlcXCkkL1xuXG4vLyBLZWVwIGluIHN5bmMgd2l0aCB1aS90eXBlcy9hcGkvdmFsaWRhdGlvbi5kLnRzXG5leHBvcnQgY29uc3QgdGVzdFBhdHRlcm4gPSB7XG4gIGRhdGU6IHYgPT4gL14tP1tcXGRdK1xcL1swLTFdXFxkXFwvWzAtM11cXGQkLy50ZXN0KHYpLFxuICB0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgZnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQ6WzAtNV1cXGQkLy50ZXN0KHYpLFxuICB0aW1lT3JGdWxsdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCg6WzAtNV1cXGQpPyQvLnRlc3QodiksXG5cbiAgLy8gLS0gUkZDIDUzMjIgLS1cbiAgLy8gLS0gQWRkZWQgaW4gdjIuNi42IC0tXG4gIC8vIFRoaXMgaXMgYSBiYXNpYyBoZWxwZXIgdmFsaWRhdGlvbi5cbiAgLy8gRm9yIHNvbWV0aGluZyBtb3JlIGNvbXBsZXggKGxpa2UgUkZDIDgyMikgeW91IHNob3VsZCB3cml0ZSBhbmQgdXNlIHlvdXIgb3duIHJ1bGUuXG4gIC8vIFdlIHdvbid0IGJlIGFjY2VwdGluZyBQUnMgdG8gZW5oYW5jZSB0aGUgb25lIGJlbG93IGJlY2F1c2Ugb2YgdGhlIHJlYXNvbiBhYm92ZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGVtYWlsOiB2ID0+IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QodiksXG5cbiAgaGV4Q29sb3I6IHYgPT4gaGV4LnRlc3QodiksXG4gIGhleGFDb2xvcjogdiA9PiBoZXhhLnRlc3QodiksXG4gIGhleE9ySGV4YUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpLFxuXG4gIHJnYkNvbG9yOiB2ID0+IHJnYi50ZXN0KHYpLFxuICByZ2JhQ29sb3I6IHYgPT4gcmdiYS50ZXN0KHYpLFxuICByZ2JPclJnYmFDb2xvcjogdiA9PiByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG5cbiAgaGV4T3JSZ2JDb2xvcjogdiA9PiBoZXgudGVzdCh2KSB8fCByZ2IudGVzdCh2KSxcbiAgaGV4YU9yUmdiYUNvbG9yOiB2ID0+IGhleGEudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG4gIGFueUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpIHx8IHJnYi50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRlc3RQYXR0ZXJuXG59XG4iLCJpbXBvcnQgeyByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VGb3JtQ2hpbGQgZnJvbSAnLi4vdXNlLWZvcm0tY2hpbGQuanMnXG5pbXBvcnQgeyB0ZXN0UGF0dGVybiB9IGZyb20gJy4uLy4uL3V0aWxzL3BhdHRlcm5zLmpzJ1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uLy4uL3V0aWxzL2RlYm91bmNlLmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG5jb25zdCBsYXp5UnVsZXNWYWx1ZXMgPSBbIHRydWUsIGZhbHNlLCAnb25kZW1hbmQnIF1cblxuZXhwb3J0IGNvbnN0IHVzZVZhbGlkYXRlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHt9LFxuXG4gIGVycm9yOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIGVycm9yTWVzc2FnZTogU3RyaW5nLFxuICBub0Vycm9ySWNvbjogQm9vbGVhbixcblxuICBydWxlczogQXJyYXksXG4gIHJlYWN0aXZlUnVsZXM6IEJvb2xlYW4sXG4gIGxhenlSdWxlczoge1xuICAgIHR5cGU6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gICAgdmFsaWRhdG9yOiB2ID0+IGxhenlSdWxlc1ZhbHVlcy5pbmNsdWRlcyh2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb2N1c2VkLCBpbm5lckxvYWRpbmcpIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaW5uZXJFcnJvciA9IHJlZihmYWxzZSlcbiAgY29uc3QgaW5uZXJFcnJvck1lc3NhZ2UgPSByZWYobnVsbClcbiAgY29uc3QgaXNEaXJ0eU1vZGVsID0gcmVmKG51bGwpXG5cbiAgdXNlRm9ybUNoaWxkKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiB9KVxuXG4gIGxldCB2YWxpZGF0ZUluZGV4ID0gMCwgdW53YXRjaFJ1bGVzXG5cbiAgY29uc3QgaGFzUnVsZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnJ1bGVzICE9PSB2b2lkIDBcbiAgICAmJiBwcm9wcy5ydWxlcyAhPT0gbnVsbFxuICAgICYmIHByb3BzLnJ1bGVzLmxlbmd0aCAhPT0gMFxuICApXG5cbiAgY29uc3QgaGFzQWN0aXZlUnVsZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICAmJiBoYXNSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgaGFzRXJyb3IgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmVycm9yID09PSB0cnVlIHx8IGlubmVyRXJyb3IudmFsdWUgPT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IGVycm9yTWVzc2FnZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICB0eXBlb2YgcHJvcHMuZXJyb3JNZXNzYWdlID09PSAnc3RyaW5nJyAmJiBwcm9wcy5lcnJvck1lc3NhZ2UubGVuZ3RoICE9PSAwXG4gICAgICA/IHByb3BzLmVycm9yTWVzc2FnZVxuICAgICAgOiBpbm5lckVycm9yTWVzc2FnZS52YWx1ZVxuICApKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsICgpID0+IHtcbiAgICB2YWxpZGF0ZUlmTmVlZGVkKClcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5yZWFjdGl2ZVJ1bGVzLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh1bndhdGNoUnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUnVsZXMgPSB3YXRjaCgoKSA9PiBwcm9wcy5ydWxlcywgKCkgPT4ge1xuICAgICAgICAgIHZhbGlkYXRlSWZOZWVkZWQodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodW53YXRjaFJ1bGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHVud2F0Y2hSdWxlcygpXG4gICAgICB1bndhdGNoUnVsZXMgPSB2b2lkIDBcbiAgICB9XG4gIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgd2F0Y2goZm9jdXNlZCwgdmFsID0+IHtcbiAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICBpZiAoaXNEaXJ0eU1vZGVsLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRGlydHlNb2RlbC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWVcblxuICAgICAgaWYgKFxuICAgICAgICBoYXNBY3RpdmVSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5sYXp5UnVsZXMgIT09ICdvbmRlbWFuZCdcbiAgICAgICAgLy8gRG9uJ3QgcmUtdHJpZ2dlciBpZiBpdCdzIGFscmVhZHkgaW4gcHJvZ3Jlc3M7XG4gICAgICAgIC8vIEl0IG1pZ2h0IG1lYW4gdGhhdCBmb2N1cyBzd2l0Y2hlZCB0byBzdWJtaXQgYnRuIGFuZFxuICAgICAgICAvLyBRRm9ybSdzIHN1Ym1pdCgpIGhhcyBiZWVuIGNhbGxlZCBhbHJlYWR5IChFTlRFUiBrZXkpXG4gICAgICAgICYmIGlubmVyTG9hZGluZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICkge1xuICAgICAgICBkZWJvdW5jZWRWYWxpZGF0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlc2V0VmFsaWRhdGlvbiAoKSB7XG4gICAgdmFsaWRhdGVJbmRleCsrXG4gICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBudWxsXG4gICAgaW5uZXJFcnJvci52YWx1ZSA9IGZhbHNlXG4gICAgaW5uZXJFcnJvck1lc3NhZ2UudmFsdWUgPSBudWxsXG4gICAgZGVib3VuY2VkVmFsaWRhdGUuY2FuY2VsKClcbiAgfVxuXG4gIC8qXG4gICAqIFJldHVybiB2YWx1ZVxuICAgKiAgIC0gdHJ1ZSAodmFsaWRhdGlvbiBzdWNjZWVkZWQpXG4gICAqICAgLSBmYWxzZSAodmFsaWRhdGlvbiBmYWlsZWQpXG4gICAqICAgLSBQcm9taXNlIChwZW5kaW5nIGFzeW5jIHZhbGlkYXRpb24pXG4gICAqL1xuICBmdW5jdGlvbiB2YWxpZGF0ZSAodmFsID0gcHJvcHMubW9kZWxWYWx1ZSkge1xuICAgIGlmIChoYXNBY3RpdmVSdWxlcy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9ICsrdmFsaWRhdGVJbmRleFxuXG4gICAgY29uc3Qgc2V0RGlydHkgPSBpbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAgID8gKCkgPT4geyBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlIH1cbiAgICAgIDogKCkgPT4ge31cblxuICAgIGNvbnN0IHVwZGF0ZSA9IChlcnIsIG1zZykgPT4ge1xuICAgICAgZXJyID09PSB0cnVlICYmIHNldERpcnR5KClcblxuICAgICAgaW5uZXJFcnJvci52YWx1ZSA9IGVyclxuICAgICAgaW5uZXJFcnJvck1lc3NhZ2UudmFsdWUgPSBtc2cgfHwgbnVsbFxuICAgICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBydWxlID0gcHJvcHMucnVsZXNbIGkgXVxuICAgICAgbGV0IHJlc1xuXG4gICAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzID0gcnVsZSh2YWwsIHRlc3RQYXR0ZXJuKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIHJ1bGUgPT09ICdzdHJpbmcnICYmIHRlc3RQYXR0ZXJuWyBydWxlIF0gIT09IHZvaWQgMCkge1xuICAgICAgICByZXMgPSB0ZXN0UGF0dGVyblsgcnVsZSBdKHZhbClcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcyA9PT0gZmFsc2UgfHwgdHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdXBkYXRlKHRydWUsIHJlcylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChyZXMgIT09IHRydWUgJiYgcmVzICE9PSB2b2lkIDApIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyZXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlKGZhbHNlKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBpbm5lckxvYWRpbmcudmFsdWUgPSB0cnVlXG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oXG4gICAgICByZXMgPT4ge1xuICAgICAgICBpZiAocmVzID09PSB2b2lkIDAgfHwgQXJyYXkuaXNBcnJheShyZXMpID09PSBmYWxzZSB8fCByZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdXBkYXRlKGZhbHNlKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtc2cgPSByZXMuZmluZChyID0+IHIgPT09IGZhbHNlIHx8IHR5cGVvZiByID09PSAnc3RyaW5nJylcbiAgICAgICAgaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdXBkYXRlKG1zZyAhPT0gdm9pZCAwLCBtc2cpXG4gICAgICAgIHJldHVybiBtc2cgPT09IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXgpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgdXBkYXRlKHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZUlmTmVlZGVkIChjaGFuZ2VkUnVsZXMpIHtcbiAgICBpZiAoXG4gICAgICBoYXNBY3RpdmVSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubGF6eVJ1bGVzICE9PSAnb25kZW1hbmQnXG4gICAgICAmJiAoaXNEaXJ0eU1vZGVsLnZhbHVlID09PSB0cnVlIHx8IChwcm9wcy5sYXp5UnVsZXMgIT09IHRydWUgJiYgY2hhbmdlZFJ1bGVzICE9PSB0cnVlKSlcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZWJvdW5jZWRWYWxpZGF0ZSA9IGRlYm91bmNlKHZhbGlkYXRlLCAwKVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgdW53YXRjaFJ1bGVzICE9PSB2b2lkIDAgJiYgdW53YXRjaFJ1bGVzKClcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kcyAmIHByb3BzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcmVzZXRWYWxpZGF0aW9uLCB2YWxpZGF0ZSB9KVxuICBpbmplY3RQcm9wKHByb3h5LCAnaGFzRXJyb3InLCAoKSA9PiBoYXNFcnJvci52YWx1ZSlcblxuICByZXR1cm4ge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG5cbiAgICB2YWxpZGF0ZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCBvbkJlZm9yZVVwZGF0ZSB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbGlzdGVuZXJSRSA9IC9eb25bQS1aXS9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGF0dHJzLCB2bm9kZSkge1xuICBjb25zdCBhY2MgPSB7XG4gICAgbGlzdGVuZXJzOiByZWYoe30pLFxuICAgIGF0dHJpYnV0ZXM6IHJlZih7fSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSAoKSB7XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHt9XG4gICAgY29uc3QgbGlzdGVuZXJzID0ge31cblxuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJzKSB7XG4gICAgICBpZiAoa2V5ICE9PSAnY2xhc3MnICYmIGtleSAhPT0gJ3N0eWxlJyAmJiBsaXN0ZW5lclJFLnRlc3Qoa2V5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYXR0cmlidXRlc1sga2V5IF0gPSBhdHRyc1sga2V5IF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB2bm9kZS5wcm9wcykge1xuICAgICAgaWYgKGxpc3RlbmVyUkUudGVzdChrZXkpID09PSB0cnVlKSB7XG4gICAgICAgIGxpc3RlbmVyc1sga2V5IF0gPSB2bm9kZS5wcm9wc1sga2V5IF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY2MuYXR0cmlidXRlcy52YWx1ZSA9IGF0dHJpYnV0ZXNcbiAgICBhY2MubGlzdGVuZXJzLnZhbHVlID0gbGlzdGVuZXJzXG4gIH1cblxuICBvbkJlZm9yZVVwZGF0ZSh1cGRhdGUpXG5cbiAgdXBkYXRlKClcblxuICByZXR1cm4gYWNjXG59XG4iLCIvKipcbiAqIEJhc2VkIG9uIHRoZSB3b3JrIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9qY2hvb2svdXVpZC1yYW5kb21cbiAqL1xuXG5sZXRcbiAgYnVmLFxuICBidWZJZHggPSAwXG5jb25zdCBoZXhCeXRlcyA9IG5ldyBBcnJheSgyNTYpXG5cbi8vIFByZS1jYWxjdWxhdGUgdG9TdHJpbmcoMTYpIGZvciBzcGVlZFxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBoZXhCeXRlc1sgaSBdID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKVxufVxuXG4vLyBVc2UgYmVzdCBhdmFpbGFibGUgUFJOR1xuY29uc3QgcmFuZG9tQnl0ZXMgPSAoKCkgPT4ge1xuICAvLyBOb2RlICYgQnJvd3NlciBzdXBwb3J0XG4gIGNvbnN0IGxpYiA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnXG4gICAgPyBjcnlwdG9cbiAgICA6IChcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICA/IHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgIClcblxuICBpZiAobGliICE9PSB2b2lkIDApIHtcbiAgICBpZiAobGliLnJhbmRvbUJ5dGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBsaWIucmFuZG9tQnl0ZXNcbiAgICB9XG4gICAgaWYgKGxpYi5nZXRSYW5kb21WYWx1ZXMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIG4gPT4ge1xuICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KG4pXG4gICAgICAgIGxpYi5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpXG4gICAgICAgIHJldHVybiBieXRlc1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuID0+IHtcbiAgICBjb25zdCByID0gW11cbiAgICBmb3IgKGxldCBpID0gbjsgaSA+IDA7IGktLSkge1xuICAgICAgci5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpXG4gICAgfVxuICAgIHJldHVybiByXG4gIH1cbn0pKClcblxuLy8gQnVmZmVyIHJhbmRvbSBudW1iZXJzIGZvciBzcGVlZFxuLy8gUmVkdWNlIG1lbW9yeSB1c2FnZSBieSBkZWNyZWFzaW5nIHRoaXMgbnVtYmVyIChtaW4gMTYpXG4vLyBvciBpbXByb3ZlIHNwZWVkIGJ5IGluY3JlYXNpbmcgdGhpcyBudW1iZXIgKHRyeSAxNjM4NClcbmNvbnN0IEJVRkZFUl9TSVpFID0gNDA5NlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIC8vIEJ1ZmZlciBzb21lIHJhbmRvbSBieXRlcyBmb3Igc3BlZWRcbiAgaWYgKGJ1ZiA9PT0gdm9pZCAwIHx8IChidWZJZHggKyAxNiA+IEJVRkZFUl9TSVpFKSkge1xuICAgIGJ1ZklkeCA9IDBcbiAgICBidWYgPSByYW5kb21CeXRlcyhCVUZGRVJfU0laRSlcbiAgfVxuXG4gIGNvbnN0IGIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChidWYsIGJ1ZklkeCwgKGJ1ZklkeCArPSAxNikpXG4gIGJbIDYgXSA9IChiWyA2IF0gJiAweDBmKSB8IDB4NDBcbiAgYlsgOCBdID0gKGJbIDggXSAmIDB4M2YpIHwgMHg4MFxuXG4gIHJldHVybiBoZXhCeXRlc1sgYlsgMCBdIF0gKyBoZXhCeXRlc1sgYlsgMSBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAyIF0gXSArIGhleEJ5dGVzWyBiWyAzIF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDQgXSBdICsgaGV4Qnl0ZXNbIGJbIDUgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgNiBdIF0gKyBoZXhCeXRlc1sgYlsgNyBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA4IF0gXSArIGhleEJ5dGVzWyBiWyA5IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDEwIF0gXSArIGhleEJ5dGVzWyBiWyAxMSBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAxMiBdIF0gKyBoZXhCeXRlc1sgYlsgMTMgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMTQgXSBdICsgaGV4Qnl0ZXNbIGJbIDE1IF0gXVxufVxuIiwibGV0IHF1ZXVlID0gW11cbmxldCB3YWl0RmxhZ3MgPSBbXVxuXG5mdW5jdGlvbiBjbGVhckZsYWcgKGZsYWcpIHtcbiAgd2FpdEZsYWdzID0gd2FpdEZsYWdzLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZmxhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3VzV2FpdEZsYWcgKGZsYWcpIHtcbiAgY2xlYXJGbGFnKGZsYWcpXG4gIHdhaXRGbGFncy5wdXNoKGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuXG4gIGlmICh3YWl0RmxhZ3MubGVuZ3RoID09PSAwICYmIHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgIC8vIG9ubHkgY2FsbCBsYXN0IGZvY3VzIGhhbmRsZXIgKGNhbid0IGZvY3VzIG11bHRpcGxlIHRoaW5ncyBhdCBvbmNlKVxuICAgIHF1ZXVlWyBxdWV1ZS5sZW5ndGggLSAxIF0oKVxuICAgIHF1ZXVlID0gW11cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRm9jdXNGbiAoZm4pIHtcbiAgaWYgKHdhaXRGbGFncy5sZW5ndGggPT09IDApIHtcbiAgICBmbigpXG4gIH1cbiAgZWxzZSB7XG4gICAgcXVldWUucHVzaChmbilcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNGbiAoZm4pIHtcbiAgcXVldWUgPSBxdWV1ZS5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGZuKVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIFRyYW5zaXRpb24sIG5leHRUaWNrLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlVmFsaWRhdGUsIHsgdXNlVmFsaWRhdGVQcm9wcyB9IGZyb20gJy4vdXNlLXZhbGlkYXRlLmpzJ1xuaW1wb3J0IHVzZVNwbGl0QXR0cnMgZnJvbSAnLi91c2Utc3BsaXQtYXR0cnMuanMnXG5cbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgdWlkIGZyb20gJy4uLy4uL3V0aWxzL3VpZC5qcydcbmltcG9ydCB7IHByZXZlbnQsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuLCByZW1vdmVGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9mb2N1cy1tYW5hZ2VyLmpzJ1xuXG5mdW5jdGlvbiBnZXRUYXJnZXRVaWQgKHZhbCkge1xuICByZXR1cm4gdmFsID09PSB2b2lkIDAgPyBgZl8keyB1aWQoKSB9YCA6IHZhbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmllbGRWYWx1ZUlzRmlsbGVkICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdm9pZCAwXG4gICAgJiYgdmFsICE9PSBudWxsXG4gICAgJiYgKCcnICsgdmFsKS5sZW5ndGggIT09IDBcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkUHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlVmFsaWRhdGVQcm9wcyxcblxuICBsYWJlbDogU3RyaW5nLFxuICBzdGFja0xhYmVsOiBCb29sZWFuLFxuICBoaW50OiBTdHJpbmcsXG4gIGhpZGVIaW50OiBCb29sZWFuLFxuICBwcmVmaXg6IFN0cmluZyxcbiAgc3VmZml4OiBTdHJpbmcsXG5cbiAgbGFiZWxDb2xvcjogU3RyaW5nLFxuICBjb2xvcjogU3RyaW5nLFxuICBiZ0NvbG9yOiBTdHJpbmcsXG5cbiAgZmlsbGVkOiBCb29sZWFuLFxuICBvdXRsaW5lZDogQm9vbGVhbixcbiAgYm9yZGVybGVzczogQm9vbGVhbixcbiAgc3RhbmRvdXQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuXG4gIGxvYWRpbmc6IEJvb2xlYW4sXG5cbiAgbGFiZWxTbG90OiBCb29sZWFuLFxuXG4gIGJvdHRvbVNsb3RzOiBCb29sZWFuLFxuICBoaWRlQm90dG9tU3BhY2U6IEJvb2xlYW4sXG5cbiAgcm91bmRlZDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG4gIGl0ZW1BbGlnbmVkOiBCb29sZWFuLFxuXG4gIGNvdW50ZXI6IEJvb2xlYW4sXG5cbiAgY2xlYXJhYmxlOiBCb29sZWFuLFxuICBjbGVhckljb246IFN0cmluZyxcblxuICBkaXNhYmxlOiBCb29sZWFuLFxuICByZWFkb25seTogQm9vbGVhbixcblxuICBhdXRvZm9jdXM6IEJvb2xlYW4sXG5cbiAgZm9yOiBTdHJpbmcsXG5cbiAgbWF4bGVuZ3RoOiBbIE51bWJlciwgU3RyaW5nIF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdjbGVhcicsICdmb2N1cycsICdibHVyJywgJ3BvcHVwU2hvdycsICdwb3B1cEhpZGUnIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZpZWxkU3RhdGUgKCkge1xuICBjb25zdCB7IHByb3BzLCBhdHRycywgcHJveHksIHZub2RlIH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuXG4gIHJldHVybiB7XG4gICAgaXNEYXJrLFxuXG4gICAgZWRpdGFibGU6IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlXG4gICAgKSxcblxuICAgIGlubmVyTG9hZGluZzogcmVmKGZhbHNlKSxcbiAgICBmb2N1c2VkOiByZWYoZmFsc2UpLFxuICAgIGhhc1BvcHVwT3BlbjogZmFsc2UsXG5cbiAgICBzcGxpdEF0dHJzOiB1c2VTcGxpdEF0dHJzKGF0dHJzLCB2bm9kZSksXG4gICAgdGFyZ2V0VWlkOiByZWYoZ2V0VGFyZ2V0VWlkKHByb3BzLmZvcikpLFxuXG4gICAgcm9vdFJlZjogcmVmKG51bGwpLFxuICAgIHRhcmdldFJlZjogcmVmKG51bGwpLFxuICAgIGNvbnRyb2xSZWY6IHJlZihudWxsKVxuXG4gICAgLyoqXG4gICAgICogdXNlciBzdXBwbGllZCBhZGRpdGlvbmFsczpcblxuICAgICAqIGlubmVyVmFsdWUgLSBjb21wdXRlZFxuICAgICAqIGZsb2F0aW5nTGFiZWwgLSBjb21wdXRlZFxuICAgICAqIGlucHV0UmVmIC0gY29tcHV0ZWRcblxuICAgICAqIGZpZWxkQ2xhc3MgLSBjb21wdXRlZFxuICAgICAqIGhhc1NoYWRvdyAtIGNvbXB1dGVkXG5cbiAgICAgKiBjb250cm9sRXZlbnRzIC0gT2JqZWN0IHdpdGggZm4oZSlcblxuICAgICAqIGdldENvbnRyb2wgLSBmblxuICAgICAqIGdldElubmVyQXBwZW5kIC0gZm5cbiAgICAgKiBnZXRDb250cm9sQ2hpbGQgLSBmblxuICAgICAqIGdldFNoYWRvd0NvbnRyb2wgLSBmblxuICAgICAqIHNob3dQb3B1cCAtIGZuXG4gICAgICovXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHNsb3RzLCBhdHRycywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgbGV0IGZvY3Vzb3V0VGltZXIgPSBudWxsXG5cbiAgaWYgKHN0YXRlLmhhc1ZhbHVlID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5oYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5tb2RlbFZhbHVlKSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5lbWl0VmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmVtaXRWYWx1ZSA9IHZhbHVlID0+IHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmNvbnRyb2xFdmVudHMgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbnRyb2xFdmVudHMgPSB7XG4gICAgICBvbkZvY3VzaW46IG9uQ29udHJvbEZvY3VzaW4sXG4gICAgICBvbkZvY3Vzb3V0OiBvbkNvbnRyb2xGb2N1c291dFxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBjbGVhclZhbHVlLFxuICAgIG9uQ29udHJvbEZvY3VzaW4sXG4gICAgb25Db250cm9sRm9jdXNvdXQsXG4gICAgZm9jdXNcbiAgfSlcblxuICBpZiAoc3RhdGUuY29tcHV0ZWRDb3VudGVyID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5jb21wdXRlZENvdW50ZXIgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY291bnRlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbGVuID0gdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gKCcnICsgcHJvcHMubW9kZWxWYWx1ZSkubGVuZ3RoXG4gICAgICAgICAgOiAoQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZSA/IHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoIDogMClcblxuICAgICAgICBjb25zdCBtYXggPSBwcm9wcy5tYXhsZW5ndGggIT09IHZvaWQgMFxuICAgICAgICAgID8gcHJvcHMubWF4bGVuZ3RoXG4gICAgICAgICAgOiBwcm9wcy5tYXhWYWx1ZXNcblxuICAgICAgICByZXR1cm4gbGVuICsgKG1heCAhPT0gdm9pZCAwID8gJyAvICcgKyBtYXggOiAnJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3Qge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgcmVzZXRWYWxpZGF0aW9uXG4gIH0gPSB1c2VWYWxpZGF0ZShzdGF0ZS5mb2N1c2VkLCBzdGF0ZS5pbm5lckxvYWRpbmcpXG5cbiAgY29uc3QgZmxvYXRpbmdMYWJlbCA9IHN0YXRlLmZsb2F0aW5nTGFiZWwgIT09IHZvaWQgMFxuICAgID8gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc3RhY2tMYWJlbCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmZsb2F0aW5nTGFiZWwudmFsdWUgPT09IHRydWUpXG4gICAgOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUpXG5cbiAgY29uc3Qgc2hvdWxkUmVuZGVyQm90dG9tID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ib3R0b21TbG90cyA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmhpbnQgIT09IHZvaWQgMFxuICAgIHx8IGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgfHwgcHJvcHMuY291bnRlciA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmVycm9yICE9PSBudWxsXG4gIClcblxuICBjb25zdCBzdHlsZVR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmZpbGxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2ZpbGxlZCcgfVxuICAgIGlmIChwcm9wcy5vdXRsaW5lZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ291dGxpbmVkJyB9XG4gICAgaWYgKHByb3BzLmJvcmRlcmxlc3MgPT09IHRydWUpIHsgcmV0dXJuICdib3JkZXJsZXNzJyB9XG4gICAgaWYgKHByb3BzLnN0YW5kb3V0KSB7IHJldHVybiAnc3RhbmRvdXQnIH1cbiAgICByZXR1cm4gJ3N0YW5kYXJkJ1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLWZpZWxkIHJvdyBuby13cmFwIGl0ZW1zLXN0YXJ0IHEtZmllbGQtLSR7IHN0eWxlVHlwZS52YWx1ZSB9YFxuICAgICsgKHN0YXRlLmZpZWxkQ2xhc3MgIT09IHZvaWQgMCA/IGAgJHsgc3RhdGUuZmllbGRDbGFzcy52YWx1ZSB9YCA6ICcnKVxuICAgICsgKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLXJvdW5kZWQnIDogJycpXG4gICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWZpZWxkLS1zcXVhcmUnIDogJycpXG4gICAgKyAoZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZmxvYXQnIDogJycpXG4gICAgKyAoaGFzTGFiZWwudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWxhYmVsZWQnIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtZmllbGQtLWRlbnNlJyA6ICcnKVxuICAgICsgKHByb3BzLml0ZW1BbGlnbmVkID09PSB0cnVlID8gJyBxLWZpZWxkLS1pdGVtLWFsaWduZWQgcS1pdGVtLXR5cGUnIDogJycpXG4gICAgKyAoc3RhdGUuaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kYXJrJyA6ICcnKVxuICAgICsgKHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCA/ICcgcS1maWVsZC0tYXV0by1oZWlnaHQnIDogJycpXG4gICAgKyAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZm9jdXNlZCcgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZXJyb3InIDogJycpXG4gICAgKyAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0taGlnaGxpZ2h0ZWQnIDogJycpXG4gICAgKyAocHJvcHMuaGlkZUJvdHRvbVNwYWNlICE9PSB0cnVlICYmIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0td2l0aC1ib3R0b20nIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGlzYWJsZWQnIDogKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJyBxLWZpZWxkLS1yZWFkb25seScgOiAnJykpXG4gIClcblxuICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19jb250cm9sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwJ1xuICAgICsgKHByb3BzLmJnQ29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuYmdDb2xvciB9YCA6ICcnKVxuICAgICsgKFxuICAgICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAnIHRleHQtbmVnYXRpdmUnXG4gICAgICAgIDogKFxuICAgICAgICAgICAgdHlwZW9mIHByb3BzLnN0YW5kb3V0ID09PSAnc3RyaW5nJyAmJiBwcm9wcy5zdGFuZG91dC5sZW5ndGggIT09IDAgJiYgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IGAgJHsgcHJvcHMuc3RhbmRvdXQgfWBcbiAgICAgICAgICAgICAgOiAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgICAgIClcbiAgICApXG4gIClcblxuICBjb25zdCBoYXNMYWJlbCA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMubGFiZWxTbG90ID09PSB0cnVlIHx8IHByb3BzLmxhYmVsICE9PSB2b2lkIDBcbiAgKVxuXG4gIGNvbnN0IGxhYmVsQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19sYWJlbCBuby1wb2ludGVyLWV2ZW50cyBhYnNvbHV0ZSBlbGxpcHNpcydcbiAgICArIChwcm9wcy5sYWJlbENvbG9yICE9PSB2b2lkIDAgJiYgaGFzRXJyb3IudmFsdWUgIT09IHRydWUgPyBgIHRleHQtJHsgcHJvcHMubGFiZWxDb2xvciB9YCA6ICcnKVxuICApXG5cbiAgY29uc3QgY29udHJvbFNsb3RTY29wZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICBlZGl0YWJsZTogc3RhdGUuZWRpdGFibGUudmFsdWUsXG4gICAgZm9jdXNlZDogc3RhdGUuZm9jdXNlZC52YWx1ZSxcbiAgICBmbG9hdGluZ0xhYmVsOiBmbG9hdGluZ0xhYmVsLnZhbHVlLFxuICAgIG1vZGVsVmFsdWU6IHByb3BzLm1vZGVsVmFsdWUsXG4gICAgZW1pdFZhbHVlOiBzdGF0ZS5lbWl0VmFsdWVcbiAgfSkpXG5cbiAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhY2MgPSB7XG4gICAgICBmb3I6IHN0YXRlLnRhcmdldFVpZC52YWx1ZVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlKSB7XG4gICAgICBhY2NbICdhcmlhLXJlYWRvbmx5JyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLmZvciwgdmFsID0+IHtcbiAgICAvLyBkb24ndCB0cmFuc2Zvcm0gdGFyZ2V0VWlkIGludG8gYSBjb21wdXRlZFxuICAgIC8vIHByb3AgYXMgaXQgd2lsbCBicmVhayBTU1JcbiAgICBzdGF0ZS50YXJnZXRVaWQudmFsdWUgPSBnZXRUYXJnZXRVaWQodmFsKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGZvY3VzSGFuZGxlciAoKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgbGV0IHRhcmdldCA9IHN0YXRlLnRhcmdldFJlZiAhPT0gdm9pZCAwICYmIHN0YXRlLnRhcmdldFJlZi52YWx1ZVxuXG4gICAgaWYgKHRhcmdldCAmJiAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSkpIHtcbiAgICAgIHRhcmdldC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykgPT09IHRydWUgfHwgKHRhcmdldCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCdbdGFiaW5kZXhdJykpXG4gICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gZWwpIHtcbiAgICAgICAgdGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZvY3VzICgpIHtcbiAgICBhZGRGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsdXIgKCkge1xuICAgIHJlbW92ZUZvY3VzRm4oZm9jdXNIYW5kbGVyKVxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGlmIChlbCAhPT0gbnVsbCAmJiBzdGF0ZS5yb290UmVmLnZhbHVlLmNvbnRhaW5zKGVsKSkge1xuICAgICAgZWwuYmx1cigpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Db250cm9sRm9jdXNpbiAoZSkge1xuICAgIGlmIChmb2N1c291dFRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgICAgIGZvY3Vzb3V0VGltZXIgPSBudWxsXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gdHJ1ZVxuICAgICAgZW1pdCgnZm9jdXMnLCBlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3Vzb3V0IChlLCB0aGVuKSB7XG4gICAgZm9jdXNvdXRUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgICBmb2N1c291dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmb2N1c291dFRpbWVyID0gbnVsbFxuXG4gICAgICBpZiAoXG4gICAgICAgIGRvY3VtZW50Lmhhc0ZvY3VzKCkgPT09IHRydWUgJiYgKFxuICAgICAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYgPT09IHZvaWQgMFxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYudmFsdWUgPT09IG51bGxcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICE9PSBmYWxzZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdibHVyJywgZSlcbiAgICAgIH1cblxuICAgICAgdGhlbiAhPT0gdm9pZCAwICYmIHRoZW4oKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclZhbHVlIChlKSB7XG4gICAgLy8gcHJldmVudCBhY3RpdmF0aW5nIHRoZSBmaWVsZCBidXQga2VlcCBmb2N1cyBvbiBkZXNrdG9wXG4gICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGVsID0gKHN0YXRlLnRhcmdldFJlZiAhPT0gdm9pZCAwICYmIHN0YXRlLnRhcmdldFJlZi52YWx1ZSkgfHwgc3RhdGUucm9vdFJlZi52YWx1ZVxuICAgICAgZWwuZm9jdXMoKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdGF0ZS5yb290UmVmLnZhbHVlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpID09PSB0cnVlKSB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKVxuICAgIH1cblxuICAgIGlmIChwcm9wcy50eXBlID09PSAnZmlsZScpIHsgLy8gVE9ETyB2dWUzXG4gICAgICAvLyBkbyBub3QgbGV0IGZvY3VzIGJlIHRyaWdnZXJlZFxuICAgICAgLy8gYXMgaXQgd2lsbCBtYWtlIHRoZSBuYXRpdmUgZmlsZSBkaWFsb2dcbiAgICAgIC8vIGFwcGVhciBmb3IgYW5vdGhlciBzZWxlY3Rpb25cbiAgICAgIHN0YXRlLmlucHV0UmVmLnZhbHVlLnZhbHVlID0gbnVsbFxuICAgIH1cblxuICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICBlbWl0KCdjbGVhcicsIHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICByZXNldFZhbGlkYXRpb24oKVxuXG4gICAgICBpZiAoJHEucGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlKSB7XG4gICAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgIGNvbnN0IG5vZGUgPSBbXVxuXG4gICAgc2xvdHMucHJlcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19wcmVwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGtleTogJ3ByZXBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5wcmVwZW5kKCkpXG4gICAgKVxuXG4gICAgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2NvbnRyb2wtY29udGFpbmVyIGNvbCByZWxhdGl2ZS1wb3NpdGlvbiByb3cgbm8td3JhcCBxLWFuY2hvci0tc2tpcCdcbiAgICAgIH0sIGdldENvbnRyb2xDb250YWluZXIoKSlcbiAgICApXG5cbiAgICBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub0Vycm9ySWNvbiA9PT0gZmFsc2UgJiYgbm9kZS5wdXNoKFxuICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdlcnJvcicsIFtcbiAgICAgICAgaChRSWNvbiwgeyBuYW1lOiAkcS5pY29uU2V0LmZpZWxkLmVycm9yLCBjb2xvcjogJ25lZ2F0aXZlJyB9KVxuICAgICAgXSlcbiAgICApXG5cbiAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSB8fCBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKFxuICAgICAgICAgICdpbm5lci1sb2FkaW5nLWFwcGVuZCcsXG4gICAgICAgICAgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwXG4gICAgICAgICAgICA/IHNsb3RzLmxvYWRpbmcoKVxuICAgICAgICAgICAgOiBbIGgoUVNwaW5uZXIsIHsgY29sb3I6IHByb3BzLmNvbG9yIH0pIF1cbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5jbGVhcmFibGUgPT09IHRydWUgJiYgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdpbm5lci1jbGVhcmFibGUtYXBwZW5kJywgW1xuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fZm9jdXNhYmxlLWFjdGlvbicsXG4gICAgICAgICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgICAgICAgbmFtZTogcHJvcHMuY2xlYXJJY29uIHx8ICRxLmljb25TZXQuZmllbGQuY2xlYXIsXG4gICAgICAgICAgICB0YWJpbmRleDogMCxcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogbnVsbCxcbiAgICAgICAgICAgIHJvbGU6IG51bGwsXG4gICAgICAgICAgICBvbkNsaWNrOiBjbGVhclZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgXSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBzbG90cy5hcHBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fYXBwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGtleTogJ2FwcGVuZCcsXG4gICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgIH0sIHNsb3RzLmFwcGVuZCgpKVxuICAgIClcblxuICAgIHN0YXRlLmdldElubmVyQXBwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdpbm5lci1hcHBlbmQnLCBzdGF0ZS5nZXRJbm5lckFwcGVuZCgpKVxuICAgIClcblxuICAgIHN0YXRlLmdldENvbnRyb2xDaGlsZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIHN0YXRlLmdldENvbnRyb2xDaGlsZCgpXG4gICAgKVxuXG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRyb2xDb250YWluZXIgKCkge1xuICAgIGNvbnN0IG5vZGUgPSBbXVxuXG4gICAgcHJvcHMucHJlZml4ICE9PSB2b2lkIDAgJiYgcHJvcHMucHJlZml4ICE9PSBudWxsICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19wcmVmaXggbm8tcG9pbnRlci1ldmVudHMgcm93IGl0ZW1zLWNlbnRlcidcbiAgICAgIH0sIHByb3BzLnByZWZpeClcbiAgICApXG5cbiAgICBpZiAoc3RhdGUuZ2V0U2hhZG93Q29udHJvbCAhPT0gdm9pZCAwICYmIHN0YXRlLmhhc1NoYWRvdy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBzdGF0ZS5nZXRTaGFkb3dDb250cm9sKClcbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZ2V0Q29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goc3RhdGUuZ2V0Q29udHJvbCgpKVxuICAgIH1cbiAgICAvLyBpbnRlcm5hbCB1c2FnZSBvbmx5OlxuICAgIGVsc2UgaWYgKHNsb3RzLnJhd0NvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKHNsb3RzLnJhd0NvbnRyb2woKSlcbiAgICB9XG4gICAgZWxzZSBpZiAoc2xvdHMuY29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHN0YXRlLnRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSByb3cnLFxuICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMFxuICAgICAgICB9LCBzbG90cy5jb250cm9sKGNvbnRyb2xTbG90U2NvcGUudmFsdWUpKVxuICAgICAgKVxuICAgIH1cblxuICAgIGhhc0xhYmVsLnZhbHVlID09PSB0cnVlICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGxhYmVsQ2xhc3MudmFsdWVcbiAgICAgIH0sIGhTbG90KHNsb3RzLmxhYmVsLCBwcm9wcy5sYWJlbCkpXG4gICAgKVxuXG4gICAgcHJvcHMuc3VmZml4ICE9PSB2b2lkIDAgJiYgcHJvcHMuc3VmZml4ICE9PSBudWxsICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19zdWZmaXggbm8tcG9pbnRlci1ldmVudHMgcm93IGl0ZW1zLWNlbnRlcidcbiAgICAgIH0sIHByb3BzLnN1ZmZpeClcbiAgICApXG5cbiAgICByZXR1cm4gbm9kZS5jb25jYXQoaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb3R0b20gKCkge1xuICAgIGxldCBtc2csIGtleVxuXG4gICAgaWYgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAoZXJyb3JNZXNzYWdlLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIG1zZyA9IFsgaCgnZGl2JywgeyByb2xlOiAnYWxlcnQnIH0sIGVycm9yTWVzc2FnZS52YWx1ZSkgXVxuICAgICAgICBrZXkgPSBgcS0tc2xvdC1lcnJvci0keyBlcnJvck1lc3NhZ2UudmFsdWUgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgPSBoU2xvdChzbG90cy5lcnJvcilcbiAgICAgICAga2V5ID0gJ3EtLXNsb3QtZXJyb3InXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmhpZGVIaW50ICE9PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wcy5oaW50ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbXNnID0gWyBoKCdkaXYnLCBwcm9wcy5oaW50KSBdXG4gICAgICAgIGtleSA9IGBxLS1zbG90LWhpbnQtJHsgcHJvcHMuaGludCB9YFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG1zZyA9IGhTbG90KHNsb3RzLmhpbnQpXG4gICAgICAgIGtleSA9ICdxLS1zbG90LWhpbnQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaGFzQ291bnRlciA9IHByb3BzLmNvdW50ZXIgPT09IHRydWUgfHwgc2xvdHMuY291bnRlciAhPT0gdm9pZCAwXG5cbiAgICBpZiAocHJvcHMuaGlkZUJvdHRvbVNwYWNlID09PSB0cnVlICYmIGhhc0NvdW50ZXIgPT09IGZhbHNlICYmIG1zZyA9PT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBtYWluID0gaCgnZGl2Jywge1xuICAgICAga2V5LFxuICAgICAgY2xhc3M6ICdxLWZpZWxkX19tZXNzYWdlcyBjb2wnXG4gICAgfSwgbXNnKVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1maWVsZF9fYm90dG9tIHJvdyBpdGVtcy1zdGFydCBxLWZpZWxkX19ib3R0b20tLSdcbiAgICAgICAgKyAocHJvcHMuaGlkZUJvdHRvbVNwYWNlICE9PSB0cnVlID8gJ2FuaW1hdGVkJyA6ICdzdGFsZScpLFxuICAgICAgb25DbGljazogcHJldmVudFxuICAgIH0sIFtcbiAgICAgIHByb3BzLmhpZGVCb3R0b21TcGFjZSA9PT0gdHJ1ZVxuICAgICAgICA/IG1haW5cbiAgICAgICAgOiBoKFRyYW5zaXRpb24sIHsgbmFtZTogJ3EtdHJhbnNpdGlvbi0tZmllbGQtbWVzc2FnZScgfSwgKCkgPT4gbWFpbiksXG5cbiAgICAgIGhhc0NvdW50ZXIgPT09IHRydWVcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19jb3VudGVyJ1xuICAgICAgICB9LCBzbG90cy5jb3VudGVyICE9PSB2b2lkIDAgPyBzbG90cy5jb3VudGVyKCkgOiBzdGF0ZS5jb21wdXRlZENvdW50ZXIudmFsdWUpXG4gICAgICAgIDogbnVsbFxuICAgIF0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbm5lckFwcGVuZE5vZGUgKGtleSwgY29udGVudCkge1xuICAgIHJldHVybiBjb250ZW50ID09PSBudWxsXG4gICAgICA/IG51bGxcbiAgICAgIDogaCgnZGl2Jywge1xuICAgICAgICBrZXksXG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fYXBwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCdcbiAgICAgIH0sIGNvbnRlbnQpXG4gIH1cblxuICBsZXQgc2hvdWxkQWN0aXZhdGUgPSBmYWxzZVxuXG4gIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgIHNob3VsZEFjdGl2YXRlID0gdHJ1ZVxuICB9KVxuXG4gIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgcHJveHkuZm9jdXMoKVxuICB9KVxuXG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgaWYgKGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5mb3IgPT09IHZvaWQgMCkge1xuICAgICAgc3RhdGUudGFyZ2V0VWlkLnZhbHVlID0gZ2V0VGFyZ2V0VWlkKClcbiAgICB9XG5cbiAgICBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgcHJveHkuZm9jdXMoKVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgZm9jdXNvdXRUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBmb2N1cywgYmx1ciB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXJGaWVsZCAoKSB7XG4gICAgY29uc3QgbGFiZWxBdHRycyA9IHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCAmJiBzbG90cy5jb250cm9sID09PSB2b2lkIDBcbiAgICAgID8ge1xuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWVcbiAgICAgICAgfVxuICAgICAgOiBhdHRyaWJ1dGVzLnZhbHVlXG5cbiAgICByZXR1cm4gaCgnbGFiZWwnLCB7XG4gICAgICByZWY6IHN0YXRlLnJvb3RSZWYsXG4gICAgICBjbGFzczogW1xuICAgICAgICBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgXSxcbiAgICAgIHN0eWxlOiBhdHRycy5zdHlsZSxcbiAgICAgIC4uLmxhYmVsQXR0cnNcbiAgICB9LCBbXG4gICAgICBzbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2JlZm9yZSBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgICAgfSwgc2xvdHMuYmVmb3JlKCkpXG4gICAgICAgIDogbnVsbCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uIGNvbCBzZWxmLXN0cmV0Y2gnXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHN0YXRlLmNvbnRyb2xSZWYsXG4gICAgICAgICAgY2xhc3M6IGNvbnRlbnRDbGFzcy52YWx1ZSxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uc3RhdGUuY29udHJvbEV2ZW50c1xuICAgICAgICB9LCBnZXRDb250ZW50KCkpLFxuXG4gICAgICAgIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gZ2V0Qm90dG9tKClcbiAgICAgICAgICA6IG51bGxcbiAgICAgIF0pLFxuXG4gICAgICBzbG90cy5hZnRlciAhPT0gdm9pZCAwXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fYWZ0ZXIgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmFmdGVyKCkpXG4gICAgICAgIDogbnVsbFxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlZiwgd2F0Y2gsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBzaG91bGRJZ25vcmVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcblxuLy8gbGVhdmUgTkFNRURfTUFTS1MgYXQgdG9wIG9mIGZpbGUgKGNvZGUgcmVmZXJlbmNlZCBmcm9tIGRvY3MpXG5jb25zdCBOQU1FRF9NQVNLUyA9IHtcbiAgZGF0ZTogJyMjIyMvIyMvIyMnLFxuICBkYXRldGltZTogJyMjIyMvIyMvIyMgIyM6IyMnLFxuICB0aW1lOiAnIyM6IyMnLFxuICBmdWxsdGltZTogJyMjOiMjOiMjJyxcbiAgcGhvbmU6ICcoIyMjKSAjIyMgLSAjIyMjJyxcbiAgY2FyZDogJyMjIyMgIyMjIyAjIyMjICMjIyMnXG59XG5cbmNvbnN0IFRPS0VOUyA9IHtcbiAgJyMnOiB7IHBhdHRlcm46ICdbXFxcXGRdJywgbmVnYXRlOiAnW15cXFxcZF0nIH0sXG5cbiAgUzogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nIH0sXG4gIE46IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJyB9LFxuXG4gIEE6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVVcHBlckNhc2UoKSB9LFxuICBhOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlTG93ZXJDYXNlKCkgfSxcblxuICBYOiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlVXBwZXJDYXNlKCkgfSxcbiAgeDogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZUxvd2VyQ2FzZSgpIH1cbn1cblxuY29uc3QgS0VZUyA9IE9iamVjdC5rZXlzKFRPS0VOUylcbktFWVMuZm9yRWFjaChrZXkgPT4ge1xuICBUT0tFTlNbIGtleSBdLnJlZ2V4ID0gbmV3IFJlZ0V4cChUT0tFTlNbIGtleSBdLnBhdHRlcm4pXG59KVxuXG5jb25zdFxuICB0b2tlblJlZ2V4TWFzayA9IG5ldyBSZWdFeHAoJ1xcXFxcXFxcKFteLiorP14ke30oKXwoW1xcXFxdXSl8KFsuKis/XiR7fSgpfFtcXFxcXV0pfChbJyArIEtFWVMuam9pbignJykgKyAnXSl8KC4pJywgJ2cnKSxcbiAgZXNjUmVnZXggPSAvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2dcblxuY29uc3QgTUFSS0VSID0gU3RyaW5nLmZyb21DaGFyQ29kZSgxKVxuXG5leHBvcnQgY29uc3QgdXNlTWFza1Byb3BzID0ge1xuICBtYXNrOiBTdHJpbmcsXG4gIHJldmVyc2VGaWxsTWFzazogQm9vbGVhbixcbiAgZmlsbE1hc2s6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gIHVubWFza2VkVmFsdWU6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBlbWl0LCBlbWl0VmFsdWUsIGlucHV0UmVmKSB7XG4gIGxldCBtYXNrTWFya2VkLCBtYXNrUmVwbGFjZWQsIGNvbXB1dGVkTWFzaywgY29tcHV0ZWRVbm1hc2ssIHBhc3RlZFRleHRTdGFydCwgc2VsZWN0aW9uQW5jaG9yXG5cbiAgY29uc3QgaGFzTWFzayA9IHJlZihudWxsKVxuICBjb25zdCBpbm5lclZhbHVlID0gcmVmKGdldEluaXRpYWxNYXNrZWRWYWx1ZSgpKVxuXG4gIGZ1bmN0aW9uIGdldElzVHlwZVRleHQgKCkge1xuICAgIHJldHVybiBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dGFyZWEnLCAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSArIHByb3BzLmF1dG9ncm93LCB1cGRhdGVNYXNrSW50ZXJuYWxzKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1hc2ssIHYgPT4ge1xuICAgIGlmICh2ICE9PSB2b2lkIDApIHtcbiAgICAgIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbCA9IHVubWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUpXG4gICAgICB1cGRhdGVNYXNrSW50ZXJuYWxzKClcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHZhbCAmJiBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZmlsbE1hc2sgKyBwcm9wcy5yZXZlcnNlRmlsbE1hc2ssICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnVubWFza2VkVmFsdWUsICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldEluaXRpYWxNYXNrZWRWYWx1ZSAoKSB7XG4gICAgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFza2VkID0gbWFza1ZhbHVlKHVubWFza1ZhbHVlKHByb3BzLm1vZGVsVmFsdWUpKVxuXG4gICAgICByZXR1cm4gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKG1hc2tlZClcbiAgICAgICAgOiBtYXNrZWRcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMubW9kZWxWYWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFkZGVkTWFza01hcmtlZCAoc2l6ZSkge1xuICAgIGlmIChzaXplIDwgbWFza01hcmtlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBtYXNrTWFya2VkLnNsaWNlKC1zaXplKVxuICAgIH1cblxuICAgIGxldCBwYWQgPSAnJywgbG9jYWxNYXNrTWFya2VkID0gbWFza01hcmtlZFxuICAgIGNvbnN0IHBhZFBvcyA9IGxvY2FsTWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGlmIChwYWRQb3MgPiAtMSkge1xuICAgICAgZm9yIChsZXQgaSA9IHNpemUgLSBsb2NhbE1hc2tNYXJrZWQubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHBhZCArPSBNQVJLRVJcbiAgICAgIH1cblxuICAgICAgbG9jYWxNYXNrTWFya2VkID0gbG9jYWxNYXNrTWFya2VkLnNsaWNlKDAsIHBhZFBvcykgKyBwYWQgKyBsb2NhbE1hc2tNYXJrZWQuc2xpY2UocGFkUG9zKVxuICAgIH1cblxuICAgIHJldHVybiBsb2NhbE1hc2tNYXJrZWRcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hc2tJbnRlcm5hbHMgKCkge1xuICAgIGhhc01hc2sudmFsdWUgPSBwcm9wcy5tYXNrICE9PSB2b2lkIDBcbiAgICAgICYmIHByb3BzLm1hc2subGVuZ3RoICE9PSAwXG4gICAgICAmJiBnZXRJc1R5cGVUZXh0KClcblxuICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgY29tcHV0ZWRVbm1hc2sgPSB2b2lkIDBcbiAgICAgIG1hc2tNYXJrZWQgPSAnJ1xuICAgICAgbWFza1JlcGxhY2VkID0gJydcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICBsb2NhbENvbXB1dGVkTWFzayA9IE5BTUVEX01BU0tTWyBwcm9wcy5tYXNrIF0gPT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLm1hc2tcbiAgICAgICAgOiBOQU1FRF9NQVNLU1sgcHJvcHMubWFzayBdLFxuICAgICAgZmlsbENoYXIgPSB0eXBlb2YgcHJvcHMuZmlsbE1hc2sgPT09ICdzdHJpbmcnICYmIHByb3BzLmZpbGxNYXNrLmxlbmd0aCAhPT0gMFxuICAgICAgICA/IHByb3BzLmZpbGxNYXNrLnNsaWNlKDAsIDEpXG4gICAgICAgIDogJ18nLFxuICAgICAgZmlsbENoYXJFc2NhcGVkID0gZmlsbENoYXIucmVwbGFjZShlc2NSZWdleCwgJ1xcXFwkJicpLFxuICAgICAgdW5tYXNrID0gW10sXG4gICAgICBleHRyYWN0ID0gW10sXG4gICAgICBtYXNrID0gW11cblxuICAgIGxldFxuICAgICAgZmlyc3RNYXRjaCA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSxcbiAgICAgIHVubWFza0NoYXIgPSAnJyxcbiAgICAgIG5lZ2F0ZUNoYXIgPSAnJ1xuXG4gICAgbG9jYWxDb21wdXRlZE1hc2sucmVwbGFjZSh0b2tlblJlZ2V4TWFzaywgKF8sIGNoYXIxLCBlc2MsIHRva2VuLCBjaGFyMikgPT4ge1xuICAgICAgaWYgKHRva2VuICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgYyA9IFRPS0VOU1sgdG9rZW4gXVxuICAgICAgICBtYXNrLnB1c2goYylcbiAgICAgICAgbmVnYXRlQ2hhciA9IGMubmVnYXRlXG4gICAgICAgIGlmIChmaXJzdE1hdGNoID09PSB0cnVlKSB7XG4gICAgICAgICAgZXh0cmFjdC5wdXNoKCcoPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcrKT8oPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcrKT8nKVxuICAgICAgICAgIGZpcnN0TWF0Y2ggPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGV4dHJhY3QucHVzaCgnKD86JyArIG5lZ2F0ZUNoYXIgKyAnKyk/KCcgKyBjLnBhdHRlcm4gKyAnKT8nKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZXNjICE9PSB2b2lkIDApIHtcbiAgICAgICAgdW5tYXNrQ2hhciA9ICdcXFxcJyArIChlc2MgPT09ICdcXFxcJyA/ICcnIDogZXNjKVxuICAgICAgICBtYXNrLnB1c2goZXNjKVxuICAgICAgICB1bm1hc2sucHVzaCgnKFteJyArIHVubWFza0NoYXIgKyAnXSspPycgKyB1bm1hc2tDaGFyICsgJz8nKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGMgPSBjaGFyMSAhPT0gdm9pZCAwID8gY2hhcjEgOiBjaGFyMlxuICAgICAgICB1bm1hc2tDaGFyID0gYyA9PT0gJ1xcXFwnID8gJ1xcXFxcXFxcXFxcXFxcXFwnIDogYy5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXFxcXFwkJicpXG4gICAgICAgIG1hc2sucHVzaChjKVxuICAgICAgICB1bm1hc2sucHVzaCgnKFteJyArIHVubWFza0NoYXIgKyAnXSspPycgKyB1bm1hc2tDaGFyICsgJz8nKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdFxuICAgICAgdW5tYXNrTWF0Y2hlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICdeJ1xuICAgICAgICArIHVubWFzay5qb2luKCcnKVxuICAgICAgICArICcoJyArICh1bm1hc2tDaGFyID09PSAnJyA/ICcuJyA6ICdbXicgKyB1bm1hc2tDaGFyICsgJ10nKSArICcrKT8nXG4gICAgICAgICsgKHVubWFza0NoYXIgPT09ICcnID8gJycgOiAnWycgKyB1bm1hc2tDaGFyICsgJ10qJykgKyAnJCdcbiAgICAgICksXG4gICAgICBleHRyYWN0TGFzdCA9IGV4dHJhY3QubGVuZ3RoIC0gMSxcbiAgICAgIGV4dHJhY3RNYXRjaGVyID0gZXh0cmFjdC5tYXAoKHJlLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IDAgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgZmlsbENoYXJFc2NhcGVkICsgJyonICsgcmUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IGV4dHJhY3RMYXN0KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXicgKyByZVxuICAgICAgICAgICAgKyAnKCcgKyAobmVnYXRlQ2hhciA9PT0gJycgPyAnLicgOiBuZWdhdGVDaGFyKSArICcrKT8nXG4gICAgICAgICAgICArIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyAnJCcgOiBmaWxsQ2hhckVzY2FwZWQgKyAnKicpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcmUpXG4gICAgICB9KVxuXG4gICAgY29tcHV0ZWRNYXNrID0gbWFza1xuICAgIGNvbXB1dGVkVW5tYXNrID0gdmFsID0+IHtcbiAgICAgIGNvbnN0IHVubWFza01hdGNoID0gdW5tYXNrTWF0Y2hlci5leGVjKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/IHZhbCA6IHZhbC5zbGljZSgwLCBtYXNrLmxlbmd0aCArIDEpKVxuICAgICAgaWYgKHVubWFza01hdGNoICE9PSBudWxsKSB7XG4gICAgICAgIHZhbCA9IHVubWFza01hdGNoLnNsaWNlKDEpLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIGV4dHJhY3RNYXRjaCA9IFtdLFxuICAgICAgICBleHRyYWN0TWF0Y2hlckxlbmd0aCA9IGV4dHJhY3RNYXRjaGVyLmxlbmd0aFxuXG4gICAgICBmb3IgKGxldCBpID0gMCwgc3RyID0gdmFsOyBpIDwgZXh0cmFjdE1hdGNoZXJMZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtID0gZXh0cmFjdE1hdGNoZXJbIGkgXS5leGVjKHN0cilcblxuICAgICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBzdHIgPSBzdHIuc2xpY2UobS5zaGlmdCgpLmxlbmd0aClcbiAgICAgICAgZXh0cmFjdE1hdGNoLnB1c2goLi4ubSlcbiAgICAgIH1cbiAgICAgIGlmIChleHRyYWN0TWF0Y2gubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBleHRyYWN0TWF0Y2guam9pbignJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cbiAgICBtYXNrTWFya2VkID0gbWFzay5tYXAodiA9PiAodHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6IE1BUktFUikpLmpvaW4oJycpXG4gICAgbWFza1JlcGxhY2VkID0gbWFza01hcmtlZC5zcGxpdChNQVJLRVIpLmpvaW4oZmlsbENoYXIpXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYXNrVmFsdWUgKHJhd1ZhbCwgdXBkYXRlTWFza0ludGVybmFsc0ZsYWcsIGlucHV0VHlwZSkge1xuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIGVuZCA9IGlucC5zZWxlY3Rpb25FbmQsXG4gICAgICBlbmRSZXZlcnNlID0gaW5wLnZhbHVlLmxlbmd0aCAtIGVuZCxcbiAgICAgIHVubWFza2VkID0gdW5tYXNrVmFsdWUocmF3VmFsKVxuXG4gICAgLy8gVXBkYXRlIGhlcmUgc28gdW5tYXNrIHVzZXMgdGhlIG9yaWdpbmFsIGZpbGxDaGFyXG4gICAgdXBkYXRlTWFza0ludGVybmFsc0ZsYWcgPT09IHRydWUgJiYgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBjb25zdFxuICAgICAgcHJlTWFza2VkID0gbWFza1ZhbHVlKHVubWFza2VkKSxcbiAgICAgIG1hc2tlZCA9IHByb3BzLmZpbGxNYXNrICE9PSBmYWxzZVxuICAgICAgICA/IGZpbGxXaXRoTWFzayhwcmVNYXNrZWQpXG4gICAgICAgIDogcHJlTWFza2VkLFxuICAgICAgY2hhbmdlZCA9IGlubmVyVmFsdWUudmFsdWUgIT09IG1hc2tlZFxuXG4gICAgLy8gV2Ugd2FudCB0byBhdm9pZCBcImZsaWNrZXJpbmdcIiBzbyB3ZSBzZXQgdmFsdWUgaW1tZWRpYXRlbHlcbiAgICBpbnAudmFsdWUgIT09IG1hc2tlZCAmJiAoaW5wLnZhbHVlID0gbWFza2VkKVxuXG4gICAgY2hhbmdlZCA9PT0gdHJ1ZSAmJiAoaW5uZXJWYWx1ZS52YWx1ZSA9IG1hc2tlZClcblxuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGlucCAmJiBuZXh0VGljaygoKSA9PiB7XG4gICAgICBpZiAobWFza2VkID09PSBtYXNrUmVwbGFjZWQpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gbWFza1JlcGxhY2VkLmxlbmd0aCA6IDBcbiAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dFR5cGUgPT09ICdpbnNlcnRGcm9tUGFzdGUnICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBtYXhFbmQgPSBpbnAuc2VsZWN0aW9uRW5kXG4gICAgICAgIGxldCBjdXJzb3IgPSBlbmQgLSAxXG4gICAgICAgIC8vIGVhY2ggbm9uLW1hcmtlciBjaGFyIG1lYW5zIHdlIG1vdmUgb25jZSB0byByaWdodFxuICAgICAgICBmb3IgKGxldCBpID0gcGFzdGVkVGV4dFN0YXJ0OyBpIDw9IGN1cnNvciAmJiBpIDwgbWF4RW5kOyBpKyspIHtcbiAgICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdICE9PSBNQVJLRVIpIHtcbiAgICAgICAgICAgIGN1cnNvcisrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1vdmVDdXJzb3IucmlnaHQoaW5wLCBjdXJzb3IpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChbICdkZWxldGVDb250ZW50QmFja3dhcmQnLCAnZGVsZXRlQ29udGVudEZvcndhcmQnIF0uaW5kZXhPZihpbnB1dFR5cGUpID4gLTEpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlXG4gICAgICAgICAgPyAoXG4gICAgICAgICAgICAgIGVuZCA9PT0gMFxuICAgICAgICAgICAgICAgID8gKG1hc2tlZC5sZW5ndGggPiBwcmVNYXNrZWQubGVuZ3RoID8gMSA6IDApXG4gICAgICAgICAgICAgICAgOiBNYXRoLm1heCgwLCBtYXNrZWQubGVuZ3RoIC0gKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkID8gMCA6IE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIGVuZFJldmVyc2UpICsgMSkpICsgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZW5kXG5cbiAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChjaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gTWF0aC5tYXgoMCwgbWFza2VkLmxlbmd0aCAtIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCA/IDAgOiBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmRSZXZlcnNlICsgMSkpKVxuXG4gICAgICAgICAgaWYgKGN1cnNvciA9PT0gMSAmJiBlbmQgPT09IDEpIHtcbiAgICAgICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vdmVDdXJzb3IucmlnaHRSZXZlcnNlKGlucCwgY3Vyc29yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBtYXNrZWQubGVuZ3RoIC0gZW5kUmV2ZXJzZVxuICAgICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2JhY2t3YXJkJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChjaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gTWF0aC5tYXgoMCwgbWFza01hcmtlZC5pbmRleE9mKE1BUktFUiksIE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIGVuZCkgLSAxKVxuICAgICAgICAgIG1vdmVDdXJzb3IucmlnaHQoaW5wLCBjdXJzb3IpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gZW5kIC0gMVxuICAgICAgICAgIG1vdmVDdXJzb3IucmlnaHQoaW5wLCBjdXJzb3IpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgdmFsID0gcHJvcHMudW5tYXNrZWRWYWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyB1bm1hc2tWYWx1ZShtYXNrZWQpXG4gICAgICA6IG1hc2tlZFxuXG4gICAgU3RyaW5nKHByb3BzLm1vZGVsVmFsdWUpICE9PSB2YWwgJiYgZW1pdFZhbHVlKHZhbCwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmVDdXJzb3JGb3JQYXN0ZSAoaW5wLCBzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgcHJlTWFza2VkID0gbWFza1ZhbHVlKHVubWFza1ZhbHVlKGlucC52YWx1ZSkpXG5cbiAgICBzdGFydCA9IE1hdGgubWF4KDAsIG1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpLCBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBzdGFydCkpXG4gICAgcGFzdGVkVGV4dFN0YXJ0ID0gc3RhcnRcblxuICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShzdGFydCwgZW5kLCAnZm9yd2FyZCcpXG4gIH1cblxuICBjb25zdCBtb3ZlQ3Vyc29yID0ge1xuICAgIGxlZnQgKGlucCwgY3Vyc29yKSB7XG4gICAgICBjb25zdCBub01hcmtCZWZvcmUgPSBtYXNrTWFya2VkLnNsaWNlKGN1cnNvciAtIDEpLmluZGV4T2YoTUFSS0VSKSA9PT0gLTFcbiAgICAgIGxldCBpID0gTWF0aC5tYXgoMCwgY3Vyc29yIC0gMSlcblxuICAgICAgZm9yICg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChtYXNrTWFya2VkWyBpIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgICBub01hcmtCZWZvcmUgPT09IHRydWUgJiYgY3Vyc29yKytcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA8IDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBjdXJzb3IgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IucmlnaHQoaW5wLCAwKVxuICAgICAgfVxuXG4gICAgICBjdXJzb3IgPj0gMCAmJiBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdiYWNrd2FyZCcpXG4gICAgfSxcblxuICAgIHJpZ2h0IChpbnAsIGN1cnNvcikge1xuICAgICAgY29uc3QgbGltaXQgPSBpbnAudmFsdWUubGVuZ3RoXG4gICAgICBsZXQgaSA9IE1hdGgubWluKGxpbWl0LCBjdXJzb3IgKyAxKVxuXG4gICAgICBmb3IgKDsgaSA8PSBsaW1pdDsgaSsrKSB7XG4gICAgICAgIGlmIChtYXNrTWFya2VkWyBpIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPiBsaW1pdFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBjdXJzb3IgLSAxIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBtYXNrTWFya2VkWyBjdXJzb3IgLSAxIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLmxlZnQoaW5wLCBsaW1pdClcbiAgICAgIH1cblxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgfSxcblxuICAgIGxlZnRSZXZlcnNlIChpbnAsIGN1cnNvcikge1xuICAgICAgY29uc3RcbiAgICAgICAgbG9jYWxNYXNrTWFya2VkID0gZ2V0UGFkZGVkTWFza01hcmtlZChpbnAudmFsdWUubGVuZ3RoKVxuICAgICAgbGV0IGkgPSBNYXRoLm1heCgwLCBjdXJzb3IgLSAxKVxuXG4gICAgICBmb3IgKDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGxvY2FsTWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobG9jYWxNYXNrTWFya2VkWyBpIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpIDwgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBjdXJzb3IgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IucmlnaHRSZXZlcnNlKGlucCwgMClcbiAgICAgIH1cblxuICAgICAgY3Vyc29yID49IDAgJiYgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnYmFja3dhcmQnKVxuICAgIH0sXG5cbiAgICByaWdodFJldmVyc2UgKGlucCwgY3Vyc29yKSB7XG4gICAgICBjb25zdFxuICAgICAgICBsaW1pdCA9IGlucC52YWx1ZS5sZW5ndGgsXG4gICAgICAgIGxvY2FsTWFza01hcmtlZCA9IGdldFBhZGRlZE1hc2tNYXJrZWQobGltaXQpLFxuICAgICAgICBub01hcmtCZWZvcmUgPSBsb2NhbE1hc2tNYXJrZWQuc2xpY2UoMCwgY3Vyc29yICsgMSkuaW5kZXhPZihNQVJLRVIpID09PSAtMVxuICAgICAgbGV0IGkgPSBNYXRoLm1pbihsaW1pdCwgY3Vyc29yICsgMSlcblxuICAgICAgZm9yICg7IGkgPD0gbGltaXQ7IGkrKykge1xuICAgICAgICBpZiAobG9jYWxNYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgY3Vyc29yID4gMCAmJiBub01hcmtCZWZvcmUgPT09IHRydWUgJiYgY3Vyc29yLS1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA+IGxpbWl0XG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBjdXJzb3IgLSAxIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLmxlZnRSZXZlcnNlKGlucCwgbGltaXQpXG4gICAgICB9XG5cbiAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTWFza2VkQ2xpY2sgKGUpIHtcbiAgICBlbWl0KCdjbGljaycsIGUpXG5cbiAgICBzZWxlY3Rpb25BbmNob3IgPSB2b2lkIDBcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTWFza2VkS2V5ZG93biAoZSkge1xuICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuXG4gICAgaWYgKFxuICAgICAgc2hvdWxkSWdub3JlS2V5KGUpID09PSB0cnVlXG4gICAgICB8fCBlLmFsdEtleSA9PT0gdHJ1ZSAvLyBsZXQgYnJvd3NlciBoYW5kbGUgdGhlc2VcbiAgICApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIHN0YXJ0ID0gaW5wLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZFxuXG4gICAgaWYgKCFlLnNoaWZ0S2V5KSB7XG4gICAgICBzZWxlY3Rpb25BbmNob3IgPSB2b2lkIDBcbiAgICB9XG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM5KSB7IC8vIExlZnQgLyBSaWdodFxuICAgICAgaWYgKGUuc2hpZnRLZXkgJiYgc2VsZWN0aW9uQW5jaG9yID09PSB2b2lkIDApIHtcbiAgICAgICAgc2VsZWN0aW9uQW5jaG9yID0gaW5wLnNlbGVjdGlvbkRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gc3RhcnQgOiBlbmRcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBtb3ZlQ3Vyc29yWyAoZS5rZXlDb2RlID09PSAzOSA/ICdyaWdodCcgOiAnbGVmdCcpICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICdSZXZlcnNlJyA6ICcnKSBdXG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZm4oaW5wLCBzZWxlY3Rpb25BbmNob3IgPT09IHN0YXJ0ID8gZW5kIDogc3RhcnQpXG5cbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGlucC5zZWxlY3Rpb25TdGFydFxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoTWF0aC5taW4oc2VsZWN0aW9uQW5jaG9yLCBjdXJzb3IpLCBNYXRoLm1heChzZWxlY3Rpb25BbmNob3IsIGN1cnNvciksICdmb3J3YXJkJylcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLmtleUNvZGUgPT09IDggLy8gQmFja3NwYWNlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IubGVmdChpbnAsIHN0YXJ0KVxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGlucC5zZWxlY3Rpb25TdGFydCwgZW5kLCAnYmFja3dhcmQnKVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUua2V5Q29kZSA9PT0gNDYgLy8gRGVsZXRlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IucmlnaHRSZXZlcnNlKGlucCwgZW5kKVxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBpbnAuc2VsZWN0aW9uRW5kLCAnZm9yd2FyZCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlICh2YWwpIHtcbiAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJycpIHsgcmV0dXJuICcnIH1cblxuICAgIGlmIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBtYXNrVmFsdWVSZXZlcnNlKHZhbClcbiAgICB9XG5cbiAgICBjb25zdCBtYXNrID0gY29tcHV0ZWRNYXNrXG5cbiAgICBsZXQgdmFsSW5kZXggPSAwLCBvdXRwdXQgPSAnJ1xuXG4gICAgZm9yIChsZXQgbWFza0luZGV4ID0gMDsgbWFza0luZGV4IDwgbWFzay5sZW5ndGg7IG1hc2tJbmRleCsrKSB7XG4gICAgICBjb25zdFxuICAgICAgICB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdLFxuICAgICAgICBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgKz0gbWFza0RlZlxuICAgICAgICB2YWxDaGFyID09PSBtYXNrRGVmICYmIHZhbEluZGV4KytcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpIHtcbiAgICAgICAgb3V0cHV0ICs9IG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDBcbiAgICAgICAgICA/IG1hc2tEZWYudHJhbnNmb3JtKHZhbENoYXIpXG4gICAgICAgICAgOiB2YWxDaGFyXG4gICAgICAgIHZhbEluZGV4KytcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlUmV2ZXJzZSAodmFsKSB7XG4gICAgY29uc3RcbiAgICAgIG1hc2sgPSBjb21wdXRlZE1hc2ssXG4gICAgICBmaXJzdFRva2VuSW5kZXggPSBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKVxuXG4gICAgbGV0IHZhbEluZGV4ID0gdmFsLmxlbmd0aCAtIDEsIG91dHB1dCA9ICcnXG5cbiAgICBmb3IgKGxldCBtYXNrSW5kZXggPSBtYXNrLmxlbmd0aCAtIDE7IG1hc2tJbmRleCA+PSAwICYmIHZhbEluZGV4ID4gLTE7IG1hc2tJbmRleC0tKSB7XG4gICAgICBjb25zdCBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgbGV0IHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgPSBtYXNrRGVmICsgb3V0cHV0XG4gICAgICAgIHZhbENoYXIgPT09IG1hc2tEZWYgJiYgdmFsSW5kZXgtLVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb3V0cHV0ID0gKG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDAgPyBtYXNrRGVmLnRyYW5zZm9ybSh2YWxDaGFyKSA6IHZhbENoYXIpICsgb3V0cHV0XG4gICAgICAgICAgdmFsSW5kZXgtLVxuICAgICAgICAgIHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVubW9kaWZpZWQtbG9vcC1jb25kaXRpb25cbiAgICAgICAgfSB3aGlsZSAoZmlyc3RUb2tlbkluZGV4ID09PSBtYXNrSW5kZXggJiYgdmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gdW5tYXNrVmFsdWUgKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAnc3RyaW5nJyB8fCBjb21wdXRlZFVubWFzayA9PT0gdm9pZCAwXG4gICAgICA/ICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IGNvbXB1dGVkVW5tYXNrKCcnICsgdmFsKSA6IHZhbClcbiAgICAgIDogY29tcHV0ZWRVbm1hc2sodmFsKVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsbFdpdGhNYXNrICh2YWwpIHtcbiAgICBpZiAobWFza1JlcGxhY2VkLmxlbmd0aCAtIHZhbC5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgJiYgdmFsLmxlbmd0aCAhPT0gMFxuICAgICAgPyBtYXNrUmVwbGFjZWQuc2xpY2UoMCwgLXZhbC5sZW5ndGgpICsgdmFsXG4gICAgICA6IHZhbCArIG1hc2tSZXBsYWNlZC5zbGljZSh2YWwubGVuZ3RoKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbm5lclZhbHVlLFxuICAgIGhhc01hc2ssXG4gICAgbW92ZUN1cnNvckZvclBhc3RlLFxuICAgIHVwZGF0ZU1hc2tWYWx1ZSxcbiAgICBvbk1hc2tlZEtleWRvd24sXG4gICAgb25NYXNrZWRDbGlja1xuICB9XG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCB0eXBlR3VhcmQpIHtcbiAgZnVuY3Rpb24gZ2V0Rm9ybURvbVByb3BzICgpIHtcbiAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWVcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkdCA9ICdEYXRhVHJhbnNmZXInIGluIHdpbmRvd1xuICAgICAgICA/IG5ldyBEYXRhVHJhbnNmZXIoKVxuICAgICAgICA6ICgnQ2xpcGJvYXJkRXZlbnQnIGluIHdpbmRvd1xuICAgICAgICAgICAgPyBuZXcgQ2xpcGJvYXJkRXZlbnQoJycpLmNsaXBib2FyZERhdGFcbiAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuXG4gICAgICBpZiAoT2JqZWN0KG1vZGVsKSA9PT0gbW9kZWwpIHtcbiAgICAgICAgKCdsZW5ndGgnIGluIG1vZGVsXG4gICAgICAgICAgPyBBcnJheS5mcm9tKG1vZGVsKVxuICAgICAgICAgIDogWyBtb2RlbCBdXG4gICAgICAgICkuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgICAgICBkdC5pdGVtcy5hZGQoZmlsZSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZXM6IGR0LmZpbGVzXG4gICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWxlczogdm9pZCAwXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHR5cGVHdWFyZCA9PT0gdHJ1ZVxuICAgID8gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLnR5cGUgIT09ICdmaWxlJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldEZvcm1Eb21Qcm9wcygpXG4gICAgfSlcbiAgICA6IGNvbXB1dGVkKGdldEZvcm1Eb21Qcm9wcylcbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmNvbnN0IGlzSmFwYW5lc2UgPSAvW1xcdTMwMDAtXFx1MzAzZlxcdTMwNDAtXFx1MzA5ZlxcdTMwYTAtXFx1MzBmZlxcdWZmMDAtXFx1ZmY5ZlxcdTRlMDAtXFx1OWZhZlxcdTM0MDAtXFx1NGRiZl0vXG5jb25zdCBpc0NoaW5lc2UgPSAvW1xcdTRlMDAtXFx1OWZmZlxcdTM0MDAtXFx1NGRiZlxcdXsyMDAwMH0tXFx1ezJhNmRmfVxcdXsyYTcwMH0tXFx1ezJiNzNmfVxcdXsyYjc0MH0tXFx1ezJiODFmfVxcdXsyYjgyMH0tXFx1ezJjZWFmfVxcdWY5MDAtXFx1ZmFmZlxcdTMzMDAtXFx1MzNmZlxcdWZlMzAtXFx1ZmU0ZlxcdWY5MDAtXFx1ZmFmZlxcdXsyZjgwMH0tXFx1ezJmYTFmfV0vdVxuY29uc3QgaXNLb3JlYW4gPSAvW1xcdTMxMzEtXFx1MzE0ZVxcdTMxNGYtXFx1MzE2M1xcdWFjMDAtXFx1ZDdhM10vXG5jb25zdCBpc1BsYWluVGV4dCA9IC9bYS16MC05XyAtXSQvaVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob25JbnB1dCkge1xuICByZXR1cm4gZnVuY3Rpb24gb25Db21wb3NpdGlvbiAoZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdjb21wb3NpdGlvbmVuZCcgfHwgZS50eXBlID09PSAnY2hhbmdlJykge1xuICAgICAgaWYgKGUudGFyZ2V0LnFDb21wb3NpbmcgIT09IHRydWUpIHsgcmV0dXJuIH1cbiAgICAgIGUudGFyZ2V0LnFDb21wb3NpbmcgPSBmYWxzZVxuICAgICAgb25JbnB1dChlKVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUudHlwZSA9PT0gJ2NvbXBvc2l0aW9udXBkYXRlJ1xuICAgICAgJiYgZS50YXJnZXQucUNvbXBvc2luZyAhPT0gdHJ1ZVxuICAgICAgJiYgdHlwZW9mIGUuZGF0YSA9PT0gJ3N0cmluZydcbiAgICApIHtcbiAgICAgIGNvbnN0IGlzQ29tcG9zaW5nID0gY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWVcbiAgICAgICAgPyBpc1BsYWluVGV4dC50ZXN0KGUuZGF0YSkgPT09IGZhbHNlXG4gICAgICAgIDogaXNKYXBhbmVzZS50ZXN0KGUuZGF0YSkgPT09IHRydWUgfHwgaXNDaGluZXNlLnRlc3QoZS5kYXRhKSA9PT0gdHJ1ZSB8fCBpc0tvcmVhbi50ZXN0KGUuZGF0YSkgPT09IHRydWVcblxuICAgICAgaWYgKGlzQ29tcG9zaW5nID09PSB0cnVlKSB7XG4gICAgICAgIGUudGFyZ2V0LnFDb21wb3NpbmcgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VGaWVsZCwgeyB1c2VGaWVsZFN0YXRlLCB1c2VGaWVsZFByb3BzLCB1c2VGaWVsZEVtaXRzLCBmaWVsZFZhbHVlSXNGaWxsZWQgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWVsZC5qcydcbmltcG9ydCB1c2VNYXNrLCB7IHVzZU1hc2tQcm9wcyB9IGZyb20gJy4vdXNlLW1hc2suanMnXG5pbXBvcnQgeyB1c2VGb3JtUHJvcHMsIHVzZUZvcm1JbnB1dE5hbWVBdHRyIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcbmltcG9ydCB1c2VGaWxlRm9ybURvbVByb3BzIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUtZG9tLXByb3BzLmpzJ1xuaW1wb3J0IHVzZUtleUNvbXBvc2l0aW9uIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWtleS1jb21wb3NpdGlvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9mb2N1cy1tYW5hZ2VyLmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUlucHV0JyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRmllbGRQcm9wcyxcbiAgICAuLi51c2VNYXNrUHJvcHMsXG4gICAgLi4udXNlRm9ybVByb3BzLFxuXG4gICAgbW9kZWxWYWx1ZTogeyByZXF1aXJlZDogZmFsc2UgfSxcblxuICAgIHNoYWRvd1RleHQ6IFN0cmluZyxcblxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0ZXh0J1xuICAgIH0sXG5cbiAgICBkZWJvdW5jZTogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgYXV0b2dyb3c6IEJvb2xlYW4sIC8vIG1ha2VzIGEgdGV4dGFyZWFcblxuICAgIGlucHV0Q2xhc3M6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgaW5wdXRTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlRmllbGRFbWl0cyxcbiAgICAncGFzdGUnLCAnY2hhbmdlJyxcbiAgICAna2V5ZG93bicsICdjbGljaycsICdhbmltYXRpb25lbmQnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQsIGF0dHJzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCB0ZW1wID0ge31cbiAgICBsZXQgZW1pdENhY2hlZFZhbHVlID0gTmFOLCB0eXBlZE51bWJlciwgc3RvcFZhbHVlV2F0Y2hlciwgZW1pdFRpbWVyID0gbnVsbCwgZW1pdFZhbHVlRm5cblxuICAgIGNvbnN0IGlucHV0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbmFtZVByb3AgPSB1c2VGb3JtSW5wdXROYW1lQXR0cihwcm9wcylcblxuICAgIGNvbnN0IHtcbiAgICAgIGlubmVyVmFsdWUsXG4gICAgICBoYXNNYXNrLFxuICAgICAgbW92ZUN1cnNvckZvclBhc3RlLFxuICAgICAgdXBkYXRlTWFza1ZhbHVlLFxuICAgICAgb25NYXNrZWRLZXlkb3duLFxuICAgICAgb25NYXNrZWRDbGlja1xuICAgIH0gPSB1c2VNYXNrKHByb3BzLCBlbWl0LCBlbWl0VmFsdWUsIGlucHV0UmVmKVxuXG4gICAgY29uc3QgZm9ybURvbVByb3BzID0gdXNlRmlsZUZvcm1Eb21Qcm9wcyhwcm9wcywgLyogdHlwZSBndWFyZCAqLyB0cnVlKVxuICAgIGNvbnN0IGhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKGlubmVyVmFsdWUudmFsdWUpKVxuXG4gICAgY29uc3Qgb25Db21wb3NpdGlvbiA9IHVzZUtleUNvbXBvc2l0aW9uKG9uSW5wdXQpXG5cbiAgICBjb25zdCBzdGF0ZSA9IHVzZUZpZWxkU3RhdGUoKVxuXG4gICAgY29uc3QgaXNUZXh0YXJlYSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy50eXBlID09PSAndGV4dGFyZWEnIHx8IHByb3BzLmF1dG9ncm93ID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaXNUeXBlVGV4dCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlXG4gICAgICB8fCBbICd0ZXh0JywgJ3NlYXJjaCcsICd1cmwnLCAndGVsJywgJ3Bhc3N3b3JkJyBdLmluY2x1ZGVzKHByb3BzLnR5cGUpXG4gICAgKVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBldnQgPSB7XG4gICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMubGlzdGVuZXJzLnZhbHVlLFxuICAgICAgICBvbklucHV0LFxuICAgICAgICBvblBhc3RlLFxuICAgICAgICAvLyBTYWZhcmkgPCAxMC4yICYgVUlXZWJWaWV3IGRvZXNuJ3QgZmlyZSBjb21wb3NpdGlvbmVuZCB3aGVuXG4gICAgICAgIC8vIHN3aXRjaGluZyBmb2N1cyBiZWZvcmUgY29uZmlybWluZyBjb21wb3NpdGlvbiBjaG9pY2VcbiAgICAgICAgLy8gdGhpcyBhbHNvIGZpeGVzIHRoZSBpc3N1ZSB3aGVyZSBzb21lIGJyb3dzZXJzIGUuZy4gaU9TIENocm9tZVxuICAgICAgICAvLyBmaXJlcyBcImNoYW5nZVwiIGluc3RlYWQgb2YgXCJpbnB1dFwiIG9uIGF1dG9jb21wbGV0ZS5cbiAgICAgICAgb25DaGFuZ2UsXG4gICAgICAgIG9uQmx1cjogb25GaW5pc2hFZGl0aW5nLFxuICAgICAgICBvbkZvY3VzOiBzdG9wXG4gICAgICB9XG5cbiAgICAgIGV2dC5vbkNvbXBvc2l0aW9uc3RhcnQgPSBldnQub25Db21wb3NpdGlvbnVwZGF0ZSA9IGV2dC5vbkNvbXBvc2l0aW9uZW5kID0gb25Db21wb3NpdGlvblxuXG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBldnQub25LZXlkb3duID0gb25NYXNrZWRLZXlkb3duXG4gICAgICAgIC8vIHJlc2V0IHNlbGVjdGlvbiBhbmNob3Igb24gcG9pbnRlciBzZWxlY3Rpb25cbiAgICAgICAgZXZ0Lm9uQ2xpY2sgPSBvbk1hc2tlZENsaWNrXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSkge1xuICAgICAgICBldnQub25BbmltYXRpb25lbmQgPSBvbkFuaW1hdGlvbmVuZFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZ0XG4gICAgfSlcblxuICAgIGNvbnN0IGlucHV0QXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhdHRycyA9IHtcbiAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDAsXG4gICAgICAgIHJvd3M6IHByb3BzLnR5cGUgPT09ICd0ZXh0YXJlYScgPyA2IDogdm9pZCAwLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsLFxuICAgICAgICBuYW1lOiBuYW1lUHJvcC52YWx1ZSxcbiAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICBpZDogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICBtYXhsZW5ndGg6IHByb3BzLm1heGxlbmd0aCxcbiAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGUgPT09IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiBwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNUZXh0YXJlYS52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYXR0cnMudHlwZSA9IHByb3BzLnR5cGVcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmF1dG9ncm93ID09PSB0cnVlKSB7XG4gICAgICAgIGF0dHJzLnJvd3MgPSAxXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhdHRyc1xuICAgIH0pXG5cbiAgICAvLyBzb21lIGJyb3dzZXJzIGxvc2UgdGhlIG5hdGl2ZSBpbnB1dCB2YWx1ZVxuICAgIC8vIHNvIHdlIG5lZWQgdG8gcmVhdHRhY2ggaXQgZHluYW1pY2FsbHlcbiAgICAvLyAobGlrZSB0eXBlPVwicGFzc3dvcmRcIiA8LT4gdHlwZT1cInRleHRcIjsgc2VlICMxMjA3OClcbiAgICB3YXRjaCgoKSA9PiBwcm9wcy50eXBlLCAoKSA9PiB7XG4gICAgICBpZiAoaW5wdXRSZWYudmFsdWUpIHtcbiAgICAgICAgaW5wdXRSZWYudmFsdWUudmFsdWUgPSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIHYgPT4ge1xuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHN0b3BWYWx1ZVdhdGNoZXIgPT09IHRydWUpIHtcbiAgICAgICAgICBzdG9wVmFsdWVXYXRjaGVyID0gZmFsc2VcblxuICAgICAgICAgIGlmIChTdHJpbmcodikgPT09IGVtaXRDYWNoZWRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlTWFza1ZhbHVlKHYpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpbm5lclZhbHVlLnZhbHVlICE9PSB2KSB7XG4gICAgICAgIGlubmVyVmFsdWUudmFsdWUgPSB2XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb3BzLnR5cGUgPT09ICdudW1iZXInXG4gICAgICAgICAgJiYgdGVtcC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodHlwZWROdW1iZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHR5cGVkTnVtYmVyID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGVtcC52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBuZXh0VGljayhhZGp1c3RIZWlnaHQpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmF1dG9ncm93LCB2YWwgPT4ge1xuICAgICAgLy8gdGV4dGFyZWEgb25seVxuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBuZXh0VGljayhhZGp1c3RIZWlnaHQpXG4gICAgICB9XG4gICAgICAvLyBpZiBpdCBoYXMgYSBudW1iZXIgb2Ygcm93cyBzZXQgcmVzcGVjdCBpdFxuICAgICAgZWxzZSBpZiAoaW5wdXRSZWYudmFsdWUgIT09IG51bGwgJiYgYXR0cnMucm93cyA+IDApIHtcbiAgICAgICAgaW5wdXRSZWYudmFsdWUuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmRlbnNlLCAoKSA9PiB7XG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBuZXh0VGljayhhZGp1c3RIZWlnaHQpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGZvY3VzICgpIHtcbiAgICAgIGFkZEZvY3VzRm4oKCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlucHV0UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgJiYgaW5wdXRSZWYudmFsdWUgIT09IGVsXG4gICAgICAgICAgJiYgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpXG4gICAgICAgICkge1xuICAgICAgICAgIGlucHV0UmVmLnZhbHVlLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbGVjdCAoKSB7XG4gICAgICBpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBpbnB1dFJlZi52YWx1ZS5zZWxlY3QoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFzdGUgKGUpIHtcbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpbnAgPSBlLnRhcmdldFxuICAgICAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUoaW5wLCBpbnAuc2VsZWN0aW9uU3RhcnQsIGlucC5zZWxlY3Rpb25FbmQpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ3Bhc3RlJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbklucHV0IChlKSB7XG4gICAgICBpZiAoIWUgfHwgIWUudGFyZ2V0KSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZS50YXJnZXQuZmlsZXMpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWwgPSBlLnRhcmdldC52YWx1ZVxuXG4gICAgICBpZiAoZS50YXJnZXQucUNvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0ZW1wLnZhbHVlID0gdmFsXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZU1hc2tWYWx1ZSh2YWwsIGZhbHNlLCBlLmlucHV0VHlwZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBlbWl0VmFsdWUodmFsKVxuXG4gICAgICAgIGlmIChpc1R5cGVUZXh0LnZhbHVlID09PSB0cnVlICYmIGUudGFyZ2V0ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgY29uc3QgeyBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kIH0gPSBlLnRhcmdldFxuXG4gICAgICAgICAgaWYgKHNlbGVjdGlvblN0YXJ0ICE9PSB2b2lkIDAgJiYgc2VsZWN0aW9uRW5kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIHZhbC5pbmRleE9mKGUudGFyZ2V0LnZhbHVlKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gdHJpZ2dlciBpdCBpbW1lZGlhdGVseSB0b28sXG4gICAgICAvLyB0byBhdm9pZCBcImZsaWNrZXJpbmdcIlxuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgYWRqdXN0SGVpZ2h0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkFuaW1hdGlvbmVuZCAoZSkge1xuICAgICAgZW1pdCgnYW5pbWF0aW9uZW5kJywgZSlcbiAgICAgIGFkanVzdEhlaWdodCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdFZhbHVlICh2YWwsIHN0b3BXYXRjaGVyKSB7XG4gICAgICBlbWl0VmFsdWVGbiA9ICgpID0+IHtcbiAgICAgICAgZW1pdFRpbWVyID0gbnVsbFxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy50eXBlICE9PSAnbnVtYmVyJ1xuICAgICAgICAgICYmIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGVsZXRlIHRlbXAudmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlICE9PSB2YWwgJiYgZW1pdENhY2hlZFZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgICBlbWl0Q2FjaGVkVmFsdWUgPSB2YWxcblxuICAgICAgICAgIHN0b3BXYXRjaGVyID09PSB0cnVlICYmIChzdG9wVmFsdWVXYXRjaGVyID0gdHJ1ZSlcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcblxuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIGVtaXRDYWNoZWRWYWx1ZSA9PT0gdmFsICYmIChlbWl0Q2FjaGVkVmFsdWUgPSBOYU4pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXRWYWx1ZUZuID0gdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICB0eXBlZE51bWJlciA9IHRydWVcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGVib3VuY2UgIT09IHZvaWQgMCkge1xuICAgICAgICBlbWl0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuICAgICAgICBlbWl0VGltZXIgPSBzZXRUaW1lb3V0KGVtaXRWYWx1ZUZuLCBwcm9wcy5kZWJvdW5jZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBlbWl0VmFsdWVGbigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGV4dGFyZWEgb25seVxuICAgIGZ1bmN0aW9uIGFkanVzdEhlaWdodCAoKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnAgPSBpbnB1dFJlZi52YWx1ZVxuICAgICAgICBpZiAoaW5wICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50U3R5bGUgPSBpbnAucGFyZW50Tm9kZS5zdHlsZVxuICAgICAgICAgIC8vIGNocm9tZSBkb2VzIG5vdCBrZWVwIHNjcm9sbCAjMTU0OThcbiAgICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCB9ID0gaW5wXG4gICAgICAgICAgLy8gY2hyb21lIGNhbGN1bGF0ZXMgYSBzbWFsbGVyIHNjcm9sbEhlaWdodCB3aGVuIGluIGEgLmNvbHVtbiBjb250YWluZXJcbiAgICAgICAgICBjb25zdCB7IG92ZXJmbG93WSwgbWF4SGVpZ2h0IH0gPSAkcS5wbGF0Zm9ybS5pcy5maXJlZm94ID09PSB0cnVlXG4gICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICA6IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGlucClcbiAgICAgICAgICAvLyBvbiBmaXJlZm94IG9yIGlmIG92ZXJmbG93WSBpcyBzcGVjaWZpZWQgYXMgc2Nyb2xsICMxNDI2MywgIzE0MzQ0XG4gICAgICAgICAgLy8gd2UgZG9uJ3QgdG91Y2ggb3ZlcmZsb3dcbiAgICAgICAgICAvLyBmaXJlZm94IGlzIG5vdCBzbyBiYWQgaW4gdGhlIGVuZFxuICAgICAgICAgIGNvbnN0IGNoYW5nZU92ZXJmbG93ID0gb3ZlcmZsb3dZICE9PSB2b2lkIDAgJiYgb3ZlcmZsb3dZICE9PSAnc2Nyb2xsJ1xuXG4gICAgICAgICAgLy8gcmVzZXQgaGVpZ2h0IG9mIHRleHRhcmVhIHRvIGEgc21hbGwgc2l6ZSB0byBkZXRlY3QgdGhlIHJlYWwgaGVpZ2h0XG4gICAgICAgICAgLy8gYnV0IGtlZXAgdGhlIHRvdGFsIGNvbnRyb2wgc2l6ZSB0aGUgc2FtZVxuICAgICAgICAgIGNoYW5nZU92ZXJmbG93ID09PSB0cnVlICYmIChpbnAuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbicpXG4gICAgICAgICAgcGFyZW50U3R5bGUubWFyZ2luQm90dG9tID0gKGlucC5zY3JvbGxIZWlnaHQgLSAxKSArICdweCdcbiAgICAgICAgICBpbnAuc3R5bGUuaGVpZ2h0ID0gJzFweCdcblxuICAgICAgICAgIGlucC5zdHlsZS5oZWlnaHQgPSBpbnAuc2Nyb2xsSGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgIC8vIHdlIHNob3VsZCBhbGxvdyBzY3JvbGxiYXJzIG9ubHlcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBtYXhIZWlnaHQgYW5kIGNvbnRlbnQgaXMgdGFsbGVyIHRoYW4gbWF4SGVpZ2h0XG4gICAgICAgICAgY2hhbmdlT3ZlcmZsb3cgPT09IHRydWUgJiYgKGlucC5zdHlsZS5vdmVyZmxvd1kgPSBwYXJzZUludChtYXhIZWlnaHQsIDEwKSA8IGlucC5zY3JvbGxIZWlnaHQgPyAnYXV0bycgOiAnaGlkZGVuJylcbiAgICAgICAgICBwYXJlbnRTdHlsZS5tYXJnaW5Cb3R0b20gPSAnJ1xuICAgICAgICAgIGlucC5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSAoZSkge1xuICAgICAgb25Db21wb3NpdGlvbihlKVxuXG4gICAgICBpZiAoZW1pdFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIGVtaXRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZW1pdFZhbHVlRm4gIT09IHZvaWQgMCAmJiBlbWl0VmFsdWVGbigpXG5cbiAgICAgIGVtaXQoJ2NoYW5nZScsIGUudGFyZ2V0LnZhbHVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRmluaXNoRWRpdGluZyAoZSkge1xuICAgICAgZSAhPT0gdm9pZCAwICYmIHN0b3AoZSlcblxuICAgICAgaWYgKGVtaXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgICBlbWl0VGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGVtaXRWYWx1ZUZuICE9PSB2b2lkIDAgJiYgZW1pdFZhbHVlRm4oKVxuXG4gICAgICB0eXBlZE51bWJlciA9IGZhbHNlXG4gICAgICBzdG9wVmFsdWVXYXRjaGVyID0gZmFsc2VcbiAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gdXNlIHNldFRpbWVvdXQgaW5zdGVhZCBvZiB0aGlzLiRuZXh0VGlja1xuICAgICAgLy8gdG8gYXZvaWQgYSBidWcgd2hlcmUgZm9jdXNvdXQgaXMgbm90IGVtaXR0ZWQgZm9yIHR5cGUgZGF0ZS90aW1lL3dlZWsvLi4uXG4gICAgICBwcm9wcy50eXBlICE9PSAnZmlsZScgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlucHV0UmVmLnZhbHVlLnZhbHVlID0gaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5uZXJWYWx1ZS52YWx1ZSA6ICcnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VyVmFsdWUgKCkge1xuICAgICAgcmV0dXJuIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgPyB0ZW1wLnZhbHVlXG4gICAgICAgIDogKGlubmVyVmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlubmVyVmFsdWUudmFsdWUgOiAnJylcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgb25GaW5pc2hFZGl0aW5nKClcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIGFkanVzdEhlaWdodCgpXG4gICAgfSlcblxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICAgIGlubmVyVmFsdWUsXG5cbiAgICAgIGZpZWxkQ2xhc3M6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIGBxLSR7IGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAndGV4dGFyZWEnIDogJ2lucHV0JyB9YFxuICAgICAgICArIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSA/ICcgcS10ZXh0YXJlYS0tYXV0b2dyb3cnIDogJycpXG4gICAgICApLFxuXG4gICAgICBoYXNTaGFkb3c6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJ1xuICAgICAgICAmJiB0eXBlb2YgcHJvcHMuc2hhZG93VGV4dCA9PT0gJ3N0cmluZydcbiAgICAgICAgJiYgcHJvcHMuc2hhZG93VGV4dC5sZW5ndGggIT09IDBcbiAgICAgICksXG5cbiAgICAgIGlucHV0UmVmLFxuXG4gICAgICBlbWl0VmFsdWUsXG5cbiAgICAgIGhhc1ZhbHVlLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICAoXG4gICAgICAgICAgaGFzVmFsdWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAmJiAocHJvcHMudHlwZSAhPT0gJ251bWJlcicgfHwgaXNOYU4oaW5uZXJWYWx1ZS52YWx1ZSkgPT09IGZhbHNlKVxuICAgICAgICApXG4gICAgICAgIHx8IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5kaXNwbGF5VmFsdWUpXG4gICAgICApLFxuXG4gICAgICBnZXRDb250cm9sOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBoKGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAndGV4dGFyZWEnIDogJ2lucHV0Jywge1xuICAgICAgICAgIHJlZjogaW5wdXRSZWYsXG4gICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICdxLWZpZWxkX19uYXRpdmUgcS1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBwcm9wcy5pbnB1dENsYXNzXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzdHlsZTogcHJvcHMuaW5wdXRTdHlsZSxcbiAgICAgICAgICAuLi5pbnB1dEF0dHJzLnZhbHVlLFxuICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlLFxuICAgICAgICAgIC4uLihcbiAgICAgICAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJ1xuICAgICAgICAgICAgICA/IHsgdmFsdWU6IGdldEN1clZhbHVlKCkgfVxuICAgICAgICAgICAgICA6IGZvcm1Eb21Qcm9wcy52YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgIGdldFNoYWRvd0NvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSBxLWZpZWxkX19zaGFkb3cgYWJzb2x1dGUtYm90dG9tIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICAgICAgKyAoaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJyB0ZXh0LW5vLXdyYXAnKVxuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgnc3BhbicsIHsgY2xhc3M6ICdpbnZpc2libGUnIH0sIGdldEN1clZhbHVlKCkpLFxuICAgICAgICAgIGgoJ3NwYW4nLCBwcm9wcy5zaGFkb3dUZXh0KVxuICAgICAgICBdKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZW5kZXJGbiA9IHVzZUZpZWxkKHN0YXRlKVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgZm9jdXMsXG4gICAgICBzZWxlY3QsXG4gICAgICBnZXROYXRpdmVFbGVtZW50OiAoKSA9PiBpbnB1dFJlZi52YWx1ZSAvLyBkZXByZWNhdGVkXG4gICAgfSlcblxuICAgIGluamVjdFByb3AocHJveHksICduYXRpdmVFbCcsICgpID0+IGlucHV0UmVmLnZhbHVlKVxuXG4gICAgcmV0dXJuIHJlbmRlckZuXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGUgbGFuZz1cInB1Z1wiPlxucS1wYWdlLnJvdy5pdGVtcy1jZW50ZXIuanVzdGlmeS1ldmVubHlcbiAgZHJhZ2dhYmxlLmRyYWdBcmVhLmxpc3QtZ3JvdXAudy1mdWxsKHYtbW9kZWw9XCJzdGVwc1wiIEBjaGFuZ2U9XCJvbkNoYW5nZVwiKVxuICAgIC5pdGVtLmZsZXgucm93Lmp1c3RpZnktYmV0d2Vlbi5hbGlnbi1jZW50ZXIodi1mb3I9XCIoc3RlcCwgaWR4KSBpbiBzdGVwc1wiIDprZXk9XCJzdGVwLmlkXCIpXG4gICAgICB0ZW1wbGF0ZSh2LWlmPVwic3RlcC5lZGl0aW5nXCIpXG4gICAgICAgIHEtaW5wdXQuZmlsbGVkKDphdXRvZm9jdXM9XCJ0cnVlXCIsIHYtbW9kZWw9XCJzdGVwLm5hbWVcIiBkZW5zZSA6cmVmPVwiYGlucHV0LSR7c3RlcC5pZH1gXCIgQGJsdXI9XCJmaW5pc2hFZGl0KHN0ZXApXCIgQGtleXVwLmVudGVyPVwiZmluaXNoRWRpdChzdGVwKVwiKVxuICAgICAgdGVtcGxhdGUodi1lbHNlKVxuICAgICAgICBkaXYoOnN0eWxlPVwieydmb250LXNpemUnOiBmb250U2l6ZVJlZiArICdweCd9XCIpIHt7IHN0ZXAubmFtZSB9fVxuICAgICAgLmZpbGxlclxuICAgICAgcS1idG4uc21hbGwoY29sb3I9XCJwcmltYXJ5XCIsZmxhdCwgZGVuc2UsIEBjbGljaz1cImVkaXRTdGVwKHN0ZXApXCIgaWNvbj1cImVkaXRcIilcbiAgICAgIHEtYnRuLnNtYWxsKGNvbG9yPVwicmVkXCIsIGZsYXQsIGRlbnNlLCBAY2xpY2s9XCJyZW1vdmVTdGVwKHN0ZXAuaWQpXCIgaWNvbj1cImRlbGV0ZVwiKVxuICAucm93KGZpeGVkLWJvdHRvbS1yaWdodClcbiAgICBxLWJ0bihjb2xvcj1cImdyZWVuXCIgQGNsaWNrPVwiYWRkTmV3U3RlcFwiIGNsYXNzPVwicS1tYS1tZFwiIGljb249XCJhZGRcIiBsYWJlbD1cIkFkZCBTdGVwXCIpXG4gICAgcS1idG4oY29sb3I9XCJyZWRcIiBAY2xpY2s9XCJyZW1vdmVMYXN0U3RlcFwiIGNsYXNzPVwicS1tYS1tZFwiIGljb249XCJkZWxldGVcIiBsYWJlbD1cIlJlbW92ZSBMYXN0IFN0ZXBcIilcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBkZWZpbmVDb21wb25lbnQsIHJlZiwgdG9SZWZzLCBvbk1vdW50ZWQsIHdhdGNoLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyB1c2VSb3V0ZSwgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcic7XG5pbXBvcnQgeyBWdWVEcmFnZ2FibGVOZXh0IH0gZnJvbSAndnVlLWRyYWdnYWJsZS1uZXh0JztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ0VkaVRvcicsXG4gIHByb3BzOiB7XG4gICAgZm9udF9zaXplOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAxNixcbiAgICB9LFxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgZHJhZ2dhYmxlOiBWdWVEcmFnZ2FibGVOZXh0LFxuICB9LFxuICBzZXR1cChwcm9wcykge1xuICAgIGNvbnN0IHsgZm9udF9zaXplOiBmb250U2l6ZVJlZiB9ID0gdG9SZWZzKHByb3BzKTtcbiAgICBjb25zdCBzdGVwcyA9IHJlZihbXG4gICAgICB7IG5hbWU6ICdTdGVwMScsIGlkOiAwLCBlZGl0aW5nOiBmYWxzZSB9LFxuICAgICAgeyBuYW1lOiAnU3RlcDInLCBpZDogMSwgZWRpdGluZzogZmFsc2UgfSxcbiAgICAgIHsgbmFtZTogJ1N0ZXAzJywgaWQ6IDIsIGVkaXRpbmc6IGZhbHNlIH0sXG4gICAgXSk7XG5cbiAgICBjb25zdCByb3V0ZSA9IHVzZVJvdXRlKCk7XG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgICBjb25zdCBvbkNoYW5nZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHBhdGggPVxuICAgICAgICAnL2VkaXQvJyArXG4gICAgICAgIHN0ZXBzLnZhbHVlXG4gICAgICAgICAgLm1hcCgobykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChvLm5hbWUucmVwbGFjZSgvXFxzL2csICdfJykpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmpvaW4oJyUyMCcpO1xuICAgICAgcm91dGVyLnB1c2gocGF0aCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGVkaXRTdGVwID0gKHN0ZXApID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdzdGFydCBlZGl0IScpO1xuICAgICAgc3RlcC5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgIC8vIOeiuuS/nURPTeW3suabtOaWsFxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAvLyDkvb/nlKjli5XmhYtyZWbogZrnhKbliLDlsI3mh4nnmoTovLjlhaXmoYZcbiAgICAgICAgY29uc3QgaW5wdXRSZWYgPSBgaW5wdXQtJHtzdGVwLmlkfWA7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IHJlZnNbaW5wdXRSZWZdO1xuICAgICAgICBpZiAoaW5wdXRFbGVtZW50ICYmIGlucHV0RWxlbWVudC4kZWwpIHtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuJGVsLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBmaW5pc2hFZGl0ID0gKHN0ZXApID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdlbmQgZWRpdCEnKTtcbiAgICAgIHN0ZXAuZWRpdGluZyA9IGZhbHNlO1xuXG4gICAgICBvbkNoYW5nZSgpO1xuICAgICAgLy8g5Y+v5Lul5Zyo6YCZ6KOh5re75Yqg5bCNc3RlcC5uYW1l55qE6amX6K2J5oiW5YW25LuW6YKP6LyvXG4gICAgfTtcblxuICAgIGNvbnN0IGFkZE5ld1N0ZXAgPSAoKSA9PiB7XG4gICAgICBjb25zdCBuZXdJZCA9IHN0ZXBzLnZhbHVlLmxlbmd0aFxuICAgICAgICA/IE1hdGgubWF4KC4uLnN0ZXBzLnZhbHVlLm1hcCgoc3RlcCkgPT4gc3RlcC5pZCkpICsgMVxuICAgICAgICA6IDA7XG4gICAgICBzdGVwcy52YWx1ZS5wdXNoKHtcbiAgICAgICAgbmFtZTpcbiAgICAgICAgICAnc3RlcCcgK1xuICAgICAgICAgIChzdGVwcy52YWx1ZS5sZW5ndGhcbiAgICAgICAgICAgID8gTWF0aC5tYXgoLi4uc3RlcHMudmFsdWUubWFwKChzdGVwKSA9PiBzdGVwLmlkKSkgKyAyXG4gICAgICAgICAgICA6IDEpLFxuICAgICAgICBpZDogbmV3SWQsXG4gICAgICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBvbkNoYW5nZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW1vdmVMYXN0U3RlcCA9ICgpID0+IHtcbiAgICAgIGlmIChzdGVwcy52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0ZXBzLnZhbHVlLnBvcCgpOyAvLyDnp7vpmaTmlbjntYTkuK3nmoTmnIDlvozkuIDlgIvlhYPntKBcbiAgICAgICAgb25DaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVtb3ZlU3RlcCA9IChpZCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSBzdGVwcy52YWx1ZS5maW5kSW5kZXgoKHN0ZXApID0+IHN0ZXAuaWQgPT09IGlkKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3RlcHMudmFsdWUuc3BsaWNlKGluZGV4LCAxKTsgLy8g5qC55o2u57Si5byV56e76Zmk5YWD57SgXG4gICAgICAgIG9uQ2hhbmdlKCk7IC8vIOabtOaWsOi3r+eUseS7peWPjeaYoOabtOaUuVxuICAgICAgfVxuICAgIH07XG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgaWYgKHJvdXRlLnBhcmFtcy5zdGVwcykge1xuICAgICAgICBjb25zdCByb3V0ZVN0ZXBzID0gcm91dGUucGFyYW1zLnN0ZXBzLnNwbGl0KC8lMjB8XFxzLyk7XG4gICAgICAgIHN0ZXBzLnZhbHVlID0gcm91dGVTdGVwcy5tYXAoKG5hbWUsIGlkeCkgPT4gKHtcbiAgICAgICAgICBpZDogaWR4LFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgZWRpdGluZzogZmFsc2UsXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHdhdGNoKFxuICAgICAgKCkgPT4gcm91dGUucGFyYW1zLnN0ZXBzLFxuICAgICAgKG5ld1N0ZXBzKSA9PiB7XG4gICAgICAgIC8vIOabtOaWsGBzdGVwc2DmqKHlnotcbiAgICAgICAgaWYgKG5ld1N0ZXBzKSB7XG4gICAgICAgICAgY29uc3Qgcm91dGVTdGVwcyA9IG5ld1N0ZXBzLnNwbGl0KC8lMjB8XFxzLyk7XG4gICAgICAgICAgc3RlcHMudmFsdWUgPSByb3V0ZVN0ZXBzLm1hcCgobmFtZSwgaWR4KSA9PiAoe1xuICAgICAgICAgICAgaWQ6IGlkeCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZvbnRTaXplUmVmLFxuICAgICAgc3RlcHMsXG4gICAgICBlZGl0U3RlcCxcbiAgICAgIGZpbmlzaEVkaXQsXG4gICAgICBhZGROZXdTdGVwLFxuICAgICAgcmVtb3ZlTGFzdFN0ZXAsXG4gICAgICByZW1vdmVTdGVwLFxuICAgICAgb25DaGFuZ2UsXG4gICAgfTtcbiAgfSxcbn0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4uaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtNnZ3O1xuICBtYXgtd2lkdGg6IDg4dnc7XG4gIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XG4gIG92ZXJmbG93OiBhdXRvO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xufVxuXG4vKiDnorrkv50gLml0ZW0g5YWn55qE5oyJ6YiV6aGv56S65q2j56K6ICovXG4uaXRlbSAucS1idG4ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDsgLyogUXVhc2Fy55qE5oyJ6YiV6buY6KqN5L2/55SoaW5saW5lLWZsZXjvvIzpgJnooYznorrkv53mjInpiJXkv53mjIHpoJDoqK3poa/npLrmlrnlvI8gKi9cbiAgbWFyZ2luLWxlZnQ6IDhweDsgLyog5oyJ6ZyA5re75Yqg6ZaT6ZqUICovXG59XG5cbi5maWxsZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZmxleC1ncm93OiAxO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJvYmoiLCJpbmRleCIsIm9wdGlvbiIsImRlZmF1bHRzIiwicm9vdEVsIiwiY2xvbmVFbCIsIm9sZEluZGV4IiwibmV3SW5kZXgiLCJvbGREcmFnZ2FibGVJbmRleCIsIm5ld0RyYWdnYWJsZUluZGV4IiwicHV0U29ydGFibGUiLCJwbHVnaW5FdmVudCIsIl9kZXRlY3REaXJlY3Rpb24iLCJfZHJhZ0VsSW5Sb3dDb2x1bW4iLCJfZGV0ZWN0TmVhcmVzdEVtcHR5U29ydGFibGUiLCJfcHJlcGFyZUdyb3VwIiwiZHJhZ0VsIiwiX2hpZGVHaG9zdEZvclRhcmdldCIsIl91bmhpZGVHaG9zdEZvclRhcmdldCIsIm5lYXJlc3RFbXB0eUluc2VydERldGVjdEV2ZW50IiwiX2NoZWNrT3V0c2lkZVRhcmdldEVsIiwiZHJhZ1N0YXJ0Rm4iLCJ0YXJnZXQiLCJhZnRlciIsImVsIiwicGx1Z2lucyIsImRyb3AiLCJhdXRvU2Nyb2xsIiwib25TcGlsbCIsImNvbnNvbGUiLCJpc1RyYW5zaXRpb24iLCJtb3ZlZCIsInByb3BzIiwiZW1pdCIsImF0dHJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUEsU0FBUyxRQUFRLFFBQVEsZ0JBQWdCO0FBQ3ZDLE1BQUksT0FBTyxPQUFPLEtBQUssTUFBTTtBQUU3QixNQUFJLE9BQU8sdUJBQXVCO0FBQ2hDLFFBQUksVUFBVSxPQUFPLHNCQUFzQixNQUFNO0FBRWpELFFBQUksZ0JBQWdCO0FBQ2xCLGdCQUFVLFFBQVEsT0FBTyxTQUFVLEtBQUs7QUFDdEMsZUFBTyxPQUFPLHlCQUF5QixRQUFRLEdBQUcsRUFBRTtBQUFBLE1BQzVELENBQU87QUFBQSxJQUNGO0FBRUQsU0FBSyxLQUFLLE1BQU0sTUFBTSxPQUFPO0FBQUEsRUFDOUI7QUFFRCxTQUFPO0FBQ1Q7QUFFQSxTQUFTLGVBQWUsUUFBUTtBQUM5QixXQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLO0FBQ3pDLFFBQUksU0FBUyxVQUFVLE1BQU0sT0FBTyxVQUFVLEtBQUs7QUFFbkQsUUFBSSxJQUFJLEdBQUc7QUFDVCxjQUFRLE9BQU8sTUFBTSxHQUFHLElBQUksRUFBRSxRQUFRLFNBQVUsS0FBSztBQUNuRCx3QkFBZ0IsUUFBUSxLQUFLLE9BQU8sSUFBSTtBQUFBLE1BQ2hELENBQU87QUFBQSxJQUNQLFdBQWUsT0FBTywyQkFBMkI7QUFDM0MsYUFBTyxpQkFBaUIsUUFBUSxPQUFPLDBCQUEwQixNQUFNLENBQUM7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
