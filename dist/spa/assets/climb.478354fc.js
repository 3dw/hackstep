import { c as computed, k as createComponent, r as ref, w as watch, n as onBeforeUnmount, h, $ as Transition, l as hSlot } from "./index.f08ad2f1.js";
import { Q as QSpinner } from "./QSpinner.1517f046.js";
function mdToURI$1(content) {
  let minified = content.replace(/\s+/g, " ");
  minified = minified.replace(/\n /g, "\n").replace(/ \n/g, "\n");
  return encodeURI(minified).replace(/^%20/, "");
}
var mdMinify = { mdToURI: mdToURI$1 };
function parseSimpleSteps$1(markdownText) {
  return parseMarkdownToSteps$1(markdownText).steps;
}
function parseComplexSteps$1(markdownText) {
  var obj = parseMarkdownToSteps$1(markdownText).steps;
  var intros = parseMarkdownToSteps$1(markdownText).intros;
  console.log(intros);
  obj.title = (intros || []).unshift();
  obj.intros = intros.filter((x) => !x.match(/\.(jpg|png|gif|webp)$/)) || [];
  obj.imgs = (intros.filter((x) => x.match(/\.(jpg|png|gif|webp)$/))[0] || []).filter((x) => x.trim());
  return obj;
}
function parseMarkdownToSteps$1(markdownText) {
  const lines = markdownText.split("\n");
  const pattern_n = /(.+)/;
  const pattern_D = /^(\d+)\.?.+$/;
  const pattern_href = /\[(.*?)\]\((.*?)\)/g;
  const steps = [];
  const intros = [];
  let foundNumber = false;
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || !pattern_n.test(trimmedLine)) {
      continue;
    }
    if (pattern_D.test(trimmedLine)) {
      foundNumber = true;
    }
    if (!foundNumber) {
      intros.push(trimmedLine);
      continue;
    }
    const matches = trimmedLine.match(pattern_href);
    if (matches && matches.length > 0) {
      for (const match of matches) {
        const [fullMatch, text, url] = match.match(/\[(.*?)\]\((.*?)\)/);
        let newObject;
        if (url.startsWith("!")) {
          newObject = {
            r: url.replace("!", "/"),
            n: trimmedLine.replace(fullMatch, text)
          };
        } else if (url.startsWith("http")) {
          newObject = {
            h: url,
            n: trimmedLine.replace(fullMatch, text)
          };
        }
        steps.push(newObject);
      }
    } else {
      steps.push({
        n: trimmedLine
      });
    }
  }
  const tags = intros.pop().split("#").map((x) => x.replace(" ", "")).filter((x) => x.trim());
  return { intros, steps, tags };
}
const step_input$1 = `
## \u5B78\u7FD2\u6599\u7406\u7684\u6B65\u9A5F
\u5B78\u7FD2\u6599\u7406\uFF0C\u5176\u5BE6\u5F88\u7C21\u55AE

#\u751F\u6D3B #\u5EDA\u85DD #\u6292\u58D3

1. \u5148\u5728\u5BB6\u88E1\u5EDA\u623F\u5E6B\u5FD9
2. \u53EF\u4EE5\u5230[\u81EA\u7136\u7F8E\u98DFDIY\u7DB2\u7AD9](https://food.bestian.tw)
3. \u8ACB\u770B[\u95DC\u65BC\u6211\u5011](!about)`;
const step_output$1 = {
  "intros": ["## \u5B78\u7FD2\u6599\u7406\u7684\u6B65\u9A5F", "\u5B78\u7FD2\u6599\u7406\uFF0C\u5176\u5BE6\u5F88\u7C21\u55AE"],
  "tags": ["\u751F\u6D3B", "\u5EDA\u85DD", "\u6292\u58D3"],
  "steps": [
    { "n": "1. \u5148\u5728\u5BB6\u88E1\u5EDA\u623F\u5E6B\u5FD9" },
    { "h": "https://food.bestian.tw", "n": "2. \u53EF\u4EE5\u5230\u81EA\u7136\u7F8E\u98DFDIY\u7DB2\u7AD9" },
    { "r": "/about", "n": "3. \u8ACB\u770B\u95DC\u65BC\u6211\u5011" }
  ]
};
const setp_input_complex = `
## \u5B78\u7FD2\u6599\u7406\u7684\u6B65\u9A5F
\u5B78\u7FD2\u6599\u7406\uFF0C\u5176\u5BE6\u5F88\u7C21\u55AE

#\u751F\u6D3B #\u5EDA\u85DD #\u6292\u58D3

1. \u5148\u5728\u5BB6\u88E1\u5EDA\u623F\u5E6B\u5FD9
2. \u81EA\u7136\u7F8E\u98DFDIY\u7DB2\u7AD9
3. \u95DC\u65BC\u6211\u5011
`;
const step_output_complex$1 = {
  "title": "## \u5B78\u7FD2\u6599\u7406\u7684\u6B65\u9A5F",
  "intros": ["\u5B78\u7FD2\u6599\u7406\uFF0C\u5176\u5BE6\u5F88\u7C21\u55AE"],
  "imgs": [],
  "tags": ["\u751F\u6D3B", "\u5EDA\u85DD", "\u6292\u58D3"],
  "steps": [
    { "n": "1. \u5148\u5728\u5BB6\u88E1\u5EDA\u623F\u5E6B\u5FD9" },
    { "h": "https://food.bestian.tw", "n": "2. \u81EA\u7136\u7F8E\u98DFDIY\u7DB2\u7AD9" },
    { "r": "/about", "n": "3. \u95DC\u65BC\u6211\u5011" }
  ]
};
var parseSteps = {
  parseMarkdownToSteps: parseMarkdownToSteps$1,
  parseSimpleSteps: parseSimpleSteps$1,
  parseComplexSteps: parseComplexSteps$1,
  step_input: step_input$1,
  step_output: step_output$1,
  setp_input_complex,
  step_output_complex: step_output_complex$1
};
function parseTags$1(tags) {
  return (tags || "").split(",").filter((x) => x.trim());
}
var parseTags_1 = {
  parseTags: parseTags$1
};
function countAge$1(birthday) {
  var birthdayDate = new Date(birthday);
  var todayDate = new Date();
  var age = todayDate.getFullYear() - birthdayDate.getFullYear();
  if (todayDate.getMonth() < birthdayDate.getMonth() || todayDate.getMonth() == birthdayDate.getMonth() && todayDate.getDate() < birthdayDate.getDate()) {
    age--;
  }
  return age;
}
function countAgeDiff$1(day, birthday) {
  var birthdayDate = new Date(birthday);
  var cDate = new Date(day);
  var age = cDate.getFullYear() - birthdayDate.getFullYear();
  if (cDate.getMonth() < birthdayDate.getMonth() || cDate.getMonth() == birthdayDate.getMonth() && cDate.getDate() < birthdayDate.getDate()) {
    age--;
  }
  return age;
}
var countAge_1 = {
  countAge: countAge$1,
  countAgeDiff: countAgeDiff$1
};
function autoId$1(name) {
  const date = new Date();
  const formattedDate = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + "T" + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0");
  return name + formattedDate;
}
var autoId_1 = {
  autoId: autoId$1
};
const { mdToURI } = mdMinify;
const {
  parseMarkdownToSteps,
  parseSimpleSteps,
  parseComplexSteps,
  step_input,
  step_output,
  step_input_complex,
  step_output_complex
} = parseSteps;
const { parseTags } = parseTags_1;
const { countAge, countAgeDiff } = countAge_1;
const { autoId } = autoId_1;
var eduLang = {
  autoId,
  mdToURI,
  countAge,
  countAgeDiff,
  parseTags,
  parseMarkdownToSteps,
  parseSimpleSteps,
  parseComplexSteps,
  step_input,
  step_output,
  step_input_complex,
  step_output_complex
};
const useRatioProps = {
  ratio: [String, Number]
};
function useRatio(props, naturalRatio) {
  return computed(() => {
    const ratio = Number(
      props.ratio || (naturalRatio !== void 0 ? naturalRatio.value : void 0)
    );
    return isNaN(ratio) !== true && ratio > 0 ? { paddingBottom: `${100 / ratio}%` } : null;
  });
}
const defaultRatio = 16 / 9;
var QImg = createComponent({
  name: "QImg",
  props: {
    ...useRatioProps,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: defaultRatio
    },
    placeholderSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(props, { slots, emit }) {
    const naturalRatio = ref(props.initialRatio);
    const ratioStyle = useRatio(props, naturalRatio);
    let loadTimer = null, isDestroyed = false;
    const images = [
      ref(null),
      ref(getPlaceholderSrc())
    ];
    const position = ref(0);
    const isLoading = ref(false);
    const hasError = ref(false);
    const classes = computed(
      () => `q-img q-img--${props.noNativeMenu === true ? "no-" : ""}menu`
    );
    const style = computed(() => ({
      width: props.width,
      height: props.height
    }));
    const imgClass = computed(
      () => `q-img__image ${props.imgClass !== void 0 ? props.imgClass + " " : ""}q-img__image--with${props.noTransition === true ? "out" : ""}-transition`
    );
    const imgStyle = computed(() => ({
      ...props.imgStyle,
      objectFit: props.fit,
      objectPosition: props.position
    }));
    watch(() => getCurrentSrc(), addImage);
    function getCurrentSrc() {
      return props.src || props.srcset || props.sizes ? {
        src: props.src,
        srcset: props.srcset,
        sizes: props.sizes
      } : null;
    }
    function getPlaceholderSrc() {
      return props.placeholderSrc !== void 0 ? { src: props.placeholderSrc } : null;
    }
    function addImage(imgProps) {
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      hasError.value = false;
      if (imgProps === null) {
        isLoading.value = false;
        images[position.value ^ 1].value = getPlaceholderSrc();
      } else {
        isLoading.value = true;
      }
      images[position.value].value = imgProps;
    }
    function onLoad({ target }) {
      if (isDestroyed === true) {
        return;
      }
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      naturalRatio.value = target.naturalHeight === 0 ? 0.5 : target.naturalWidth / target.naturalHeight;
      waitForCompleteness(target, 1);
    }
    function waitForCompleteness(target, count) {
      if (isDestroyed === true || count === 1e3) {
        return;
      }
      if (target.complete === true) {
        onReady(target);
      } else {
        loadTimer = setTimeout(() => {
          loadTimer = null;
          waitForCompleteness(target, count + 1);
        }, 50);
      }
    }
    function onReady(img) {
      if (isDestroyed === true) {
        return;
      }
      position.value = position.value ^ 1;
      images[position.value].value = null;
      isLoading.value = false;
      hasError.value = false;
      emit("load", img.currentSrc || img.src);
    }
    function onError(err) {
      if (loadTimer !== null) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      isLoading.value = false;
      hasError.value = true;
      images[position.value].value = null;
      images[position.value ^ 1].value = getPlaceholderSrc();
      emit("error", err);
    }
    function getImage(index) {
      const img = images[index].value;
      const data = {
        key: "img_" + index,
        class: imgClass.value,
        style: imgStyle.value,
        crossorigin: props.crossorigin,
        decoding: props.decoding,
        referrerpolicy: props.referrerpolicy,
        height: props.height,
        width: props.width,
        loading: props.loading,
        fetchpriority: props.fetchpriority,
        "aria-hidden": "true",
        draggable: props.draggable,
        ...img
      };
      if (position.value === index) {
        data.class += " q-img__image--waiting";
        Object.assign(data, { onLoad, onError });
      } else {
        data.class += " q-img__image--loaded";
      }
      return h(
        "div",
        { class: "q-img__container absolute-full", key: "img" + index },
        h("img", data)
      );
    }
    function getContent() {
      if (isLoading.value !== true) {
        return h("div", {
          key: "content",
          class: "q-img__content absolute-full q-anchor--skip"
        }, hSlot(slots[hasError.value === true ? "error" : "default"]));
      }
      return h("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, slots.loading !== void 0 ? slots.loading() : props.noSpinner === true ? void 0 : [
        h(QSpinner, {
          color: props.spinnerColor,
          size: props.spinnerSize
        })
      ]);
    }
    {
      {
        addImage(getCurrentSrc());
      }
      onBeforeUnmount(() => {
        isDestroyed = true;
        if (loadTimer !== null) {
          clearTimeout(loadTimer);
          loadTimer = null;
        }
      });
    }
    return () => {
      const content = [];
      if (ratioStyle.value !== null) {
        content.push(
          h("div", { key: "filler", style: ratioStyle.value })
        );
      }
      if (hasError.value !== true) {
        if (images[0].value !== null) {
          content.push(getImage(0));
        }
        if (images[1].value !== null) {
          content.push(getImage(1));
        }
      }
      content.push(
        h(Transition, { name: "q-transition--fade" }, getContent)
      );
      return h("div", {
        class: classes.value,
        style: style.value,
        role: "img",
        "aria-label": props.alt
      }, content);
    };
  }
});
var _imports_0 = "/assets/climb.2b3f6605.png";
export { QImg as Q, _imports_0 as _, eduLang as e };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbWIuNDc4MzU0ZmMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9lZHUtbGFuZy9zcmMvbWQtbWluaWZ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VkdS1sYW5nL3NyYy9wYXJzZVN0ZXBzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VkdS1sYW5nL3NyYy9wYXJzZVRhZ3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZWR1LWxhbmcvc3JjL2NvdW50QWdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VkdS1sYW5nL3NyYy9hdXRvSWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZWR1LWxhbmcvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yYXRpby5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW1nL1FJbWcuanMiLCIuLi8uLi8uLi9zcmMvYXNzZXRzL2NsaW1iLnBuZyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBtZFRvVVJJKGNvbnRlbnQpIHtcbiAgICAvLyBSZW1vdmUgZXh0cmEgd2hpdGVzcGFjZVxuICAgIGxldCBtaW5pZmllZCA9IGNvbnRlbnQucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgIC8vIFJlbW92ZSB1bm5lY2Vzc2FyeSBsaW5lIGJyZWFrc1xuICAgIG1pbmlmaWVkID0gbWluaWZpZWRcbiAgICAgICAgLnJlcGxhY2UoL1xcbiAvZywgJ1xcbicpXG4gICAgICAgIC5yZXBsYWNlKC8gXFxuL2csICdcXG4nKTtcbiAgICByZXR1cm4gZW5jb2RlVVJJKG1pbmlmaWVkKVxuICAgIC5yZXBsYWNlKC9eJTIwLywgJycpO1xufVxuXG4vLyBjb25zb2xlLmxvZyhtZFRvVVJJKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgbWRUb1VSSSB9IiwiXG5mdW5jdGlvbiBwYXJzZVNpbXBsZVN0ZXBzKG1hcmtkb3duVGV4dCkge1xuICAgIHJldHVybiBwYXJzZU1hcmtkb3duVG9TdGVwcyhtYXJrZG93blRleHQpLnN0ZXBzXG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29tcGxleFN0ZXBzKG1hcmtkb3duVGV4dCkge1xuICAgIHZhciBvYmogPSBwYXJzZU1hcmtkb3duVG9TdGVwcyhtYXJrZG93blRleHQpLnN0ZXBzXG4gICAgdmFyIGludHJvcyA9IHBhcnNlTWFya2Rvd25Ub1N0ZXBzKG1hcmtkb3duVGV4dCkuaW50cm9zXG5cbiAgICBjb25zb2xlLmxvZyhpbnRyb3MpXG5cbiAgICBvYmoudGl0bGUgPSAoaW50cm9zIHx8IFtdKS51bnNoaWZ0KClcbiAgICBvYmouaW50cm9zID0gKGludHJvcy5maWx0ZXIoeCA9PiAheC5tYXRjaCgvXFwuKGpwZ3xwbmd8Z2lmfHdlYnApJC8pKSkgfHwgW11cbiAgICBvYmouaW1ncyA9ICgoaW50cm9zLmZpbHRlcih4ID0+IHgubWF0Y2goL1xcLihqcGd8cG5nfGdpZnx3ZWJwKSQvKSkpWzBdIHx8IFtdKS5maWx0ZXIoeCA9PiB4LnRyaW0oKSkgIC8vIOacieWPr+iDveaYr+epuumZo+WIl1xuICAgIHJldHVybiBvYmpcbn1cblxuZnVuY3Rpb24gcGFyc2VNYXJrZG93blRvU3RlcHMobWFya2Rvd25UZXh0KSB7XG4gICAgY29uc3QgbGluZXMgPSBtYXJrZG93blRleHQuc3BsaXQoJ1xcbicpO1xuICAgIGNvbnN0IHBhdHRlcm5fbiA9IC8oLispLztcbiAgICBjb25zdCBwYXR0ZXJuX0QgPSAvXihcXGQrKVxcLj8uKyQvO1xuICAgIGNvbnN0IHBhdHRlcm5faHJlZiA9IC9cXFsoLio/KVxcXVxcKCguKj8pXFwpL2c7XG4gICAgY29uc3Qgc3RlcHMgPSBbXTtcbiAgICBjb25zdCBpbnRyb3MgPSBbXTtcbiAgICBsZXQgZm91bmROdW1iZXIgPSBmYWxzZTtcblxuICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgICBjb25zdCB0cmltbWVkTGluZSA9IGxpbmUudHJpbSgpO1xuXG4gICAgICAgIC8vIFNraXAgZW1wdHkgbGluZXNcbiAgICAgICAgaWYgKCF0cmltbWVkTGluZSB8fCAhcGF0dGVybl9uLnRlc3QodHJpbW1lZExpbmUpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBsaW5lIHN0YXJ0cyB3aXRoIGEgbnVtYmVyXG4gICAgICAgIGlmIChwYXR0ZXJuX0QudGVzdCh0cmltbWVkTGluZSkpIHtcbiAgICAgICAgICAgIGZvdW5kTnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHdlIGhhdmVuJ3QgZm91bmQgYSBsaW5lIHN0YXJ0aW5nIHdpdGggYSBudW1iZXIsIGFjY3VtdWxhdGUgdGhlIGxpbmVzIGFzIGludHJvc1xuICAgICAgICBpZiAoIWZvdW5kTnVtYmVyKSB7XG4gICAgICAgICAgICBpbnRyb3MucHVzaCh0cmltbWVkTGluZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0cmltbWVkTGluZS5tYXRjaChwYXR0ZXJuX2hyZWYpO1xuICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtmdWxsTWF0Y2gsIHRleHQsIHVybF0gPSBtYXRjaC5tYXRjaCgvXFxbKC4qPylcXF1cXCgoLio/KVxcKS8pO1xuICAgICAgICAgICAgICAgIGxldCBuZXdPYmplY3Q7XG4gICAgICAgICAgICAgICAgaWYgKHVybC5zdGFydHNXaXRoKCchJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3T2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcjogdXJsLnJlcGxhY2UoJyEnLCAnLycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbjogdHJpbW1lZExpbmUucmVwbGFjZShmdWxsTWF0Y2gsIHRleHQpLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuOiB0cmltbWVkTGluZS5yZXBsYWNlKGZ1bGxNYXRjaCwgdGV4dCksXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0ZXBzLnB1c2gobmV3T2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0ZXBzLnB1c2goe1xuICAgICAgICAgICAgICAgIG46IHRyaW1tZWRMaW5lLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdGFncyA9IGludHJvcy5wb3AoKS5zcGxpdCgnIycpLm1hcCh4ID0+IHgucmVwbGFjZSgnICcsJycpKS5maWx0ZXIoeCA9PiB4LnRyaW0oKSk7XG4gICAgcmV0dXJuIHsgaW50cm9zOiBpbnRyb3MsIHN0ZXBzOiBzdGVwcywgdGFnczogdGFncyB9O1xufVxuXG5jb25zdCBzdGVwX2lucHV0ID0gYFxuIyMg5a2457+S5paZ55CG55qE5q2l6amfXG7lrbjnv5LmlpnnkIbvvIzlhbblr6blvojnsKHllq5cblxuI+eUn+a0uyAj5bua6JedICPmipLlo5NcblxuMS4g5YWI5Zyo5a626KOh5bua5oi/5bmr5b+ZXG4yLiDlj6/ku6XliLBb6Ieq54S2576O6aOfRElZ57ay56uZXShodHRwczovL2Zvb2QuYmVzdGlhbi50dylcbjMuIOiri+eci1vpl5zmlrzmiJHlgJFdKCFhYm91dClgO1xuXG5cblxuY29uc3Qgc3RlcF9vdXRwdXQgPSB7XG5cImludHJvc1wiOiBbIFwiIyMg5a2457+S5paZ55CG55qE5q2l6amfXCIsIFwi5a2457+S5paZ55CG77yM5YW25a+m5b6I57Ch5ZauXCJdLFxuXCJ0YWdzXCI6IFtcIueUn+a0u1wiLCBcIuW7muiXnVwiLCBcIuaKkuWjk1wiXSxcblwic3RlcHNcIjogW1xuICAgICAgICB7IFwiblwiOiBcIjEuIOWFiOWcqOWutuijoeW7muaIv+W5q+W/mVwiIH0sXG4gICAgICAgIHsgXCJoXCI6IFwiaHR0cHM6Ly9mb29kLmJlc3RpYW4udHdcIiwgXCJuXCI6IFwiMi4g5Y+v5Lul5Yiw6Ieq54S2576O6aOfRElZ57ay56uZXCIgfSxcbiAgICAgICAgeyBcInJcIjogXCIvYWJvdXRcIiwgXCJuXCI6IFwiMy4g6KuL55yL6Zec5pa85oiR5YCRXCIgfVxuICAgIF1cbn1cblxuXG5cbmNvbnN0IHNldHBfaW5wdXRfY29tcGxleCA9IGBcbiMjIOWtuOe/kuaWmeeQhueahOatpempn1xu5a2457+S5paZ55CG77yM5YW25a+m5b6I57Ch5ZauXG5cbiPnlJ/mtLsgI+W7muiXnSAj5oqS5aOTXG5cbjEuIOWFiOWcqOWutuijoeW7muaIv+W5q+W/mVxuMi4g6Ieq54S2576O6aOfRElZ57ay56uZXG4zLiDpl5zmlrzmiJHlgJFcbmBcbmNvbnN0IHN0ZXBfb3V0cHV0X2NvbXBsZXggPSB7XG4gICAgXCJ0aXRsZVwiOiBcIiMjIOWtuOe/kuaWmeeQhueahOatpempn1wiLFxuICAgIFwiaW50cm9zXCI6IFtcIuWtuOe/kuaWmeeQhu+8jOWFtuWvpuW+iOewoeWWrlwiXSxcbiAgICBcImltZ3NcIjogW10sXG4gICAgXCJ0YWdzXCI6IFtcIueUn+a0u1wiLCBcIuW7muiXnVwiLCBcIuaKkuWjk1wiXSxcbiAgICBcInN0ZXBzXCI6IFtcbiAgICAgICAgeyBcIm5cIjogXCIxLiDlhYjlnKjlrrboo6Hlu5rmiL/luavlv5lcIiB9LFxuICAgICAgICB7IFwiaFwiOiBcImh0dHBzOi8vZm9vZC5iZXN0aWFuLnR3XCIsIFwiblwiOiBcIjIuIOiHqueEtue+jumjn0RJWee2suermVwiIH0sXG4gICAgICAgIHsgXCJyXCI6IFwiL2Fib3V0XCIsIFwiblwiOiBcIjMuIOmXnOaWvOaIkeWAkVwiIH1cbiAgICBdXG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBcbiAgICBwYXJzZU1hcmtkb3duVG9TdGVwcywgXG4gICAgcGFyc2VTaW1wbGVTdGVwcyxcbiAgICBwYXJzZUNvbXBsZXhTdGVwcyxcbiAgICBzdGVwX2lucHV0LCBzdGVwX291dHB1dCxcbiAgICBzZXRwX2lucHV0X2NvbXBsZXgsIHN0ZXBfb3V0cHV0X2NvbXBsZXhcbn0iLCJcblxuLy8gYWRkIEVycm9yIGNhc2UgLi4uLlxuZnVuY3Rpb24gcGFyc2VUYWdzKHRhZ3MpIHtcbiAgICByZXR1cm4gKHRhZ3MgfHwgJycpLnNwbGl0KCcsJykuZmlsdGVyKHggPT4geC50cmltKCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXG4gICAgcGFyc2VUYWdzXG59IiwiXG5cbi8vIGFkZCBFcnJvciBjYXNlIC4uLi5cbmZ1bmN0aW9uIGNvdW50QWdlKGJpcnRoZGF5KSB7XG4gICAgdmFyIGJpcnRoZGF5RGF0ZSA9IG5ldyBEYXRlKGJpcnRoZGF5KTtcbiAgICB2YXIgdG9kYXlEYXRlID0gbmV3IERhdGUoKTtcblxuICAgIHZhciBhZ2UgPSB0b2RheURhdGUuZ2V0RnVsbFllYXIoKSAtIGJpcnRoZGF5RGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgaWYgKFxuICAgICAgICB0b2RheURhdGUuZ2V0TW9udGgoKSA8IGJpcnRoZGF5RGF0ZS5nZXRNb250aCgpIHx8XG4gICAgICAgICh0b2RheURhdGUuZ2V0TW9udGgoKSA9PSBiaXJ0aGRheURhdGUuZ2V0TW9udGgoKSAmJlxuICAgICAgICB0b2RheURhdGUuZ2V0RGF0ZSgpIDwgYmlydGhkYXlEYXRlLmdldERhdGUoKSlcbiAgICApIHtcbiAgICAgICAgYWdlLS07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFnZTtcbn1cblxuZnVuY3Rpb24gY291bnRBZ2VEaWZmKGRheSxiaXJ0aGRheSkge1xuICAgIHZhciBiaXJ0aGRheURhdGUgPSBuZXcgRGF0ZShiaXJ0aGRheSk7XG4gICAgdmFyIGNEYXRlID0gbmV3IERhdGUoZGF5KTtcblxuICAgIHZhciBhZ2UgPSBjRGF0ZS5nZXRGdWxsWWVhcigpIC0gYmlydGhkYXlEYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICBpZiAoXG4gICAgICAgIGNEYXRlLmdldE1vbnRoKCkgPCBiaXJ0aGRheURhdGUuZ2V0TW9udGgoKSB8fFxuICAgICAgICAoY0RhdGUuZ2V0TW9udGgoKSA9PSBiaXJ0aGRheURhdGUuZ2V0TW9udGgoKSAmJlxuICAgICAgICBjRGF0ZS5nZXREYXRlKCkgPCBiaXJ0aGRheURhdGUuZ2V0RGF0ZSgpKVxuICAgICkge1xuICAgICAgICBhZ2UtLTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWdlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXG4gICAgY291bnRBZ2UsIGNvdW50QWdlRGlmZlxufSIsIlxuXG4vLyBhZGQgRXJyb3IgY2FzZSAuLi4uXG5mdW5jdGlvbiBhdXRvSWQobmFtZSkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKSArICctJyArIFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKSArICdUJyArIFN0cmluZyhkYXRlLmdldEhvdXJzKCkpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgKyBTdHJpbmcoZGF0ZS5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgcmV0dXJuIG5hbWUgKyBmb3JtYXR0ZWREYXRlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXG4gICAgYXV0b0lkXG59IiwiY29uc3QgeyBtZFRvVVJJIH0gPSByZXF1aXJlKCcuL3NyYy9tZC1taW5pZnkuanMnKVxuY29uc3QgeyBwYXJzZU1hcmtkb3duVG9TdGVwcywgXG4gICAgcGFyc2VTaW1wbGVTdGVwcyxcbiAgICBwYXJzZUNvbXBsZXhTdGVwcyxcbiAgICBzdGVwX2lucHV0LCBzdGVwX291dHB1dCxcbiAgICBzdGVwX2lucHV0X2NvbXBsZXgsIHN0ZXBfb3V0cHV0X2NvbXBsZXhcbn0gPSByZXF1aXJlKCcuL3NyYy9wYXJzZVN0ZXBzLmpzJylcbmNvbnN0IHsgcGFyc2VUYWdzIH0gPSByZXF1aXJlKCcuL3NyYy9wYXJzZVRhZ3MuanMnKVxuY29uc3QgeyBjb3VudEFnZSwgY291bnRBZ2VEaWZmIH0gPSByZXF1aXJlKCcuL3NyYy9jb3VudEFnZS5qcycpXG5jb25zdCB7IGF1dG9JZCB9ID0gcmVxdWlyZSgnLi9zcmMvYXV0b0lkLmpzJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXV0b0lkLFxuICAgIG1kVG9VUkksXG4gICAgY291bnRBZ2UsIGNvdW50QWdlRGlmZixcbiAgICBwYXJzZVRhZ3MsXG4gICAgcGFyc2VNYXJrZG93blRvU3RlcHMsXG4gICAgcGFyc2VTaW1wbGVTdGVwcyxcbiAgICBwYXJzZUNvbXBsZXhTdGVwcyxcbiAgICBzdGVwX2lucHV0LCBzdGVwX291dHB1dCxcbiAgICBzdGVwX2lucHV0X2NvbXBsZXgsIHN0ZXBfb3V0cHV0X2NvbXBsZXhcbn07IiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VSYXRpb1Byb3BzID0ge1xuICByYXRpbzogWyBTdHJpbmcsIE51bWJlciBdXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgbmF0dXJhbFJhdGlvKSB7XG4gIC8vIHJldHVybiByYXRpb1N0eWxlXG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgcmF0aW8gPSBOdW1iZXIoXG4gICAgICBwcm9wcy5yYXRpbyB8fCAobmF0dXJhbFJhdGlvICE9PSB2b2lkIDAgPyBuYXR1cmFsUmF0aW8udmFsdWUgOiB2b2lkIDApXG4gICAgKVxuXG4gICAgcmV0dXJuIGlzTmFOKHJhdGlvKSAhPT0gdHJ1ZSAmJiByYXRpbyA+IDBcbiAgICAgID8geyBwYWRkaW5nQm90dG9tOiBgJHsgMTAwIC8gcmF0aW8gfSVgIH1cbiAgICAgIDogbnVsbFxuICB9KVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBUcmFuc2l0aW9uIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUVNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZVJhdGlvLCB7IHVzZVJhdGlvUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yYXRpby5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5jb25zdCBkZWZhdWx0UmF0aW8gPSAxNiAvIDlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbWcnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUmF0aW9Qcm9wcyxcblxuICAgIHNyYzogU3RyaW5nLFxuICAgIHNyY3NldDogU3RyaW5nLFxuICAgIHNpemVzOiBTdHJpbmcsXG5cbiAgICBhbHQ6IFN0cmluZyxcbiAgICBjcm9zc29yaWdpbjogU3RyaW5nLFxuICAgIGRlY29kaW5nOiBTdHJpbmcsXG4gICAgcmVmZXJyZXJwb2xpY3k6IFN0cmluZyxcblxuICAgIGRyYWdnYWJsZTogQm9vbGVhbixcblxuICAgIGxvYWRpbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsYXp5J1xuICAgIH0sXG4gICAgZmV0Y2hwcmlvcml0eToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2F1dG8nXG4gICAgfSxcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIGluaXRpYWxSYXRpbzoge1xuICAgICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgICAgZGVmYXVsdDogZGVmYXVsdFJhdGlvXG4gICAgfSxcblxuICAgIHBsYWNlaG9sZGVyU3JjOiBTdHJpbmcsXG5cbiAgICBmaXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjb3ZlcidcbiAgICB9LFxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnNTAlIDUwJSdcbiAgICB9LFxuXG4gICAgaW1nQ2xhc3M6IFN0cmluZyxcbiAgICBpbWdTdHlsZTogT2JqZWN0LFxuXG4gICAgbm9TcGlubmVyOiBCb29sZWFuLFxuICAgIG5vTmF0aXZlTWVudTogQm9vbGVhbixcbiAgICBub1RyYW5zaXRpb246IEJvb2xlYW4sXG5cbiAgICBzcGlubmVyQ29sb3I6IFN0cmluZyxcbiAgICBzcGlubmVyU2l6ZTogU3RyaW5nXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2xvYWQnLCAnZXJyb3InIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCBuYXR1cmFsUmF0aW8gPSByZWYocHJvcHMuaW5pdGlhbFJhdGlvKVxuICAgIGNvbnN0IHJhdGlvU3R5bGUgPSB1c2VSYXRpbyhwcm9wcywgbmF0dXJhbFJhdGlvKVxuXG4gICAgbGV0IGxvYWRUaW1lciA9IG51bGwsIGlzRGVzdHJveWVkID0gZmFsc2VcblxuICAgIGNvbnN0IGltYWdlcyA9IFtcbiAgICAgIHJlZihudWxsKSxcbiAgICAgIHJlZihnZXRQbGFjZWhvbGRlclNyYygpKVxuICAgIF1cblxuICAgIGNvbnN0IHBvc2l0aW9uID0gcmVmKDApXG5cbiAgICBjb25zdCBpc0xvYWRpbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgaGFzRXJyb3IgPSByZWYoZmFsc2UpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWltZyBxLWltZy0tJHsgcHJvcHMubm9OYXRpdmVNZW51ID09PSB0cnVlID8gJ25vLScgOiAnJyB9bWVudWBcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICB3aWR0aDogcHJvcHMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHByb3BzLmhlaWdodFxuICAgIH0pKVxuXG4gICAgY29uc3QgaW1nQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtaW1nX19pbWFnZSAkeyBwcm9wcy5pbWdDbGFzcyAhPT0gdm9pZCAwID8gcHJvcHMuaW1nQ2xhc3MgKyAnICcgOiAnJyB9YFxuICAgICAgKyBgcS1pbWdfX2ltYWdlLS13aXRoJHsgcHJvcHMubm9UcmFuc2l0aW9uID09PSB0cnVlID8gJ291dCcgOiAnJyB9LXRyYW5zaXRpb25gXG4gICAgKVxuXG4gICAgY29uc3QgaW1nU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgLi4ucHJvcHMuaW1nU3R5bGUsXG4gICAgICBvYmplY3RGaXQ6IHByb3BzLmZpdCxcbiAgICAgIG9iamVjdFBvc2l0aW9uOiBwcm9wcy5wb3NpdGlvblxuICAgIH0pKVxuXG4gICAgd2F0Y2goKCkgPT4gZ2V0Q3VycmVudFNyYygpLCBhZGRJbWFnZSlcblxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRTcmMgKCkge1xuICAgICAgcmV0dXJuIHByb3BzLnNyYyB8fCBwcm9wcy5zcmNzZXQgfHwgcHJvcHMuc2l6ZXNcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBzcmM6IHByb3BzLnNyYyxcbiAgICAgICAgICAgIHNyY3NldDogcHJvcHMuc3Jjc2V0LFxuICAgICAgICAgICAgc2l6ZXM6IHByb3BzLnNpemVzXG4gICAgICAgICAgfVxuICAgICAgICA6IG51bGxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQbGFjZWhvbGRlclNyYyAoKSB7XG4gICAgICByZXR1cm4gcHJvcHMucGxhY2Vob2xkZXJTcmMgIT09IHZvaWQgMFxuICAgICAgICA/IHsgc3JjOiBwcm9wcy5wbGFjZWhvbGRlclNyYyB9XG4gICAgICAgIDogbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEltYWdlIChpbWdQcm9wcykge1xuICAgICAgaWYgKGxvYWRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobG9hZFRpbWVyKVxuICAgICAgICBsb2FkVGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGhhc0Vycm9yLnZhbHVlID0gZmFsc2VcblxuICAgICAgaWYgKGltZ1Byb3BzID09PSBudWxsKSB7XG4gICAgICAgIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXiAxIF0udmFsdWUgPSBnZXRQbGFjZWhvbGRlclNyYygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaXNMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF0udmFsdWUgPSBpbWdQcm9wc1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTG9hZCAoeyB0YXJnZXQgfSkge1xuICAgICAgaWYgKGlzRGVzdHJveWVkID09PSB0cnVlKSB7IHJldHVybiB9XG5cbiAgICAgIGlmIChsb2FkVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgICAgbG9hZFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBuYXR1cmFsUmF0aW8udmFsdWUgPSB0YXJnZXQubmF0dXJhbEhlaWdodCA9PT0gMFxuICAgICAgICA/IDAuNVxuICAgICAgICA6IHRhcmdldC5uYXR1cmFsV2lkdGggLyB0YXJnZXQubmF0dXJhbEhlaWdodFxuXG4gICAgICB3YWl0Rm9yQ29tcGxldGVuZXNzKHRhcmdldCwgMSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YWl0Rm9yQ29tcGxldGVuZXNzICh0YXJnZXQsIGNvdW50KSB7XG4gICAgICAvLyBwcm90ZWN0IGFnYWluc3QgcnVubmluZyBmb3JldmVyXG4gICAgICBpZiAoaXNEZXN0cm95ZWQgPT09IHRydWUgfHwgY291bnQgPT09IDEwMDApIHsgcmV0dXJuIH1cblxuICAgICAgaWYgKHRhcmdldC5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBvblJlYWR5KHRhcmdldClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsb2FkVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBsb2FkVGltZXIgPSBudWxsXG4gICAgICAgICAgd2FpdEZvckNvbXBsZXRlbmVzcyh0YXJnZXQsIGNvdW50ICsgMSlcbiAgICAgICAgfSwgNTApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSAoaW1nKSB7XG4gICAgICBpZiAoaXNEZXN0cm95ZWQgPT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgICAgcG9zaXRpb24udmFsdWUgPSBwb3NpdGlvbi52YWx1ZSBeIDFcbiAgICAgIGltYWdlc1sgcG9zaXRpb24udmFsdWUgXS52YWx1ZSA9IG51bGxcbiAgICAgIGlzTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICBoYXNFcnJvci52YWx1ZSA9IGZhbHNlXG4gICAgICBlbWl0KCdsb2FkJywgaW1nLmN1cnJlbnRTcmMgfHwgaW1nLnNyYylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVycm9yIChlcnIpIHtcbiAgICAgIGlmIChsb2FkVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRUaW1lcilcbiAgICAgICAgbG9hZFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpc0xvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgaGFzRXJyb3IudmFsdWUgPSB0cnVlXG4gICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF0udmFsdWUgPSBudWxsXG4gICAgICBpbWFnZXNbIHBvc2l0aW9uLnZhbHVlIF4gMSBdLnZhbHVlID0gZ2V0UGxhY2Vob2xkZXJTcmMoKVxuICAgICAgZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SW1hZ2UgKGluZGV4KSB7XG4gICAgICBjb25zdCBpbWcgPSBpbWFnZXNbIGluZGV4IF0udmFsdWVcblxuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAga2V5OiAnaW1nXycgKyBpbmRleCxcbiAgICAgICAgY2xhc3M6IGltZ0NsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogaW1nU3R5bGUudmFsdWUsXG4gICAgICAgIGNyb3Nzb3JpZ2luOiBwcm9wcy5jcm9zc29yaWdpbixcbiAgICAgICAgZGVjb2Rpbmc6IHByb3BzLmRlY29kaW5nLFxuICAgICAgICByZWZlcnJlcnBvbGljeTogcHJvcHMucmVmZXJyZXJwb2xpY3ksXG4gICAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuICAgICAgICB3aWR0aDogcHJvcHMud2lkdGgsXG4gICAgICAgIGxvYWRpbmc6IHByb3BzLmxvYWRpbmcsXG4gICAgICAgIGZldGNocHJpb3JpdHk6IHByb3BzLmZldGNocHJpb3JpdHksXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgZHJhZ2dhYmxlOiBwcm9wcy5kcmFnZ2FibGUsXG4gICAgICAgIC4uLmltZ1xuICAgICAgfVxuXG4gICAgICBpZiAocG9zaXRpb24udmFsdWUgPT09IGluZGV4KSB7XG4gICAgICAgIGRhdGEuY2xhc3MgKz0gJyBxLWltZ19faW1hZ2UtLXdhaXRpbmcnXG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgeyBvbkxvYWQsIG9uRXJyb3IgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkYXRhLmNsYXNzICs9ICcgcS1pbWdfX2ltYWdlLS1sb2FkZWQnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBjbGFzczogJ3EtaW1nX19jb250YWluZXIgYWJzb2x1dGUtZnVsbCcsIGtleTogJ2ltZycgKyBpbmRleCB9LFxuICAgICAgICBoKCdpbWcnLCBkYXRhKVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgaWYgKGlzTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGtleTogJ2NvbnRlbnQnLFxuICAgICAgICAgIGNsYXNzOiAncS1pbWdfX2NvbnRlbnQgYWJzb2x1dGUtZnVsbCBxLWFuY2hvci0tc2tpcCdcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHNbIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlID8gJ2Vycm9yJyA6ICdkZWZhdWx0JyBdKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAga2V5OiAnbG9hZGluZycsXG4gICAgICAgIGNsYXNzOiAncS1pbWdfX2xvYWRpbmcgYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyJ1xuICAgICAgfSwgKFxuICAgICAgICBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzLmxvYWRpbmcoKVxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBwcm9wcy5ub1NwaW5uZXIgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IHZvaWQgMFxuICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICBoKFFTcGlubmVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHByb3BzLnNwaW5uZXJDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICBzaXplOiBwcm9wcy5zcGlubmVyU2l6ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKVxuICAgICAgKSlcbiAgICB9XG5cbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBpZiAoX19RVUFTQVJfU1NSX0NMSUVOVF9fKSB7XG4gICAgICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAgICAgYWRkSW1hZ2UoZ2V0Q3VycmVudFNyYygpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFkZEltYWdlKGdldEN1cnJlbnRTcmMoKSlcbiAgICAgIH1cblxuICAgICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgICAgaXNEZXN0cm95ZWQgPSB0cnVlXG5cbiAgICAgICAgaWYgKGxvYWRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkVGltZXIpXG4gICAgICAgICAgbG9hZFRpbWVyID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gW11cblxuICAgICAgaWYgKHJhdGlvU3R5bGUudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHsga2V5OiAnZmlsbGVyJywgc3R5bGU6IHJhdGlvU3R5bGUudmFsdWUgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzRXJyb3IudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgaWYgKGltYWdlc1sgMCBdLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgY29udGVudC5wdXNoKGdldEltYWdlKDApKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGltYWdlc1sgMSBdLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgY29udGVudC5wdXNoKGdldEltYWdlKDEpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgaChUcmFuc2l0aW9uLCB7IG5hbWU6ICdxLXRyYW5zaXRpb24tLWZhZGUnIH0sIGdldENvbnRlbnQpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAgIHJvbGU6ICdpbWcnLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmFsdFxuICAgICAgfSwgY29udGVudClcbiAgICB9XG4gIH1cbn0pXG4iLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fMmIzZjY2MDVfX1wiIl0sIm5hbWVzIjpbIm1kVG9VUkkiLCJwYXJzZVNpbXBsZVN0ZXBzIiwicGFyc2VNYXJrZG93blRvU3RlcHMiLCJwYXJzZUNvbXBsZXhTdGVwcyIsInN0ZXBfaW5wdXQiLCJzdGVwX291dHB1dCIsInN0ZXBfb3V0cHV0X2NvbXBsZXgiLCJwYXJzZVRhZ3MiLCJjb3VudEFnZSIsImNvdW50QWdlRGlmZiIsImF1dG9JZCIsInJlcXVpcmUkJDAiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJyZXF1aXJlJCQ0Il0sIm1hcHBpbmdzIjoiOztBQUFBLFNBQVNBLFVBQVEsU0FBUztBQUV0QixNQUFJLFdBQVcsUUFBUSxRQUFRLFFBQVEsR0FBRztBQUUxQyxhQUFXLFNBQ04sUUFBUSxRQUFRLElBQUksRUFDcEIsUUFBUSxRQUFRLElBQUk7QUFDekIsU0FBTyxVQUFVLFFBQVEsRUFDeEIsUUFBUSxRQUFRLEVBQUU7QUFDdkI7SUFJQSxXQUFpQixFQUFBLFNBQUVBLFVBQU87QUNaMUIsU0FBU0MsbUJBQWlCLGNBQWM7QUFDcEMsU0FBT0MsdUJBQXFCLFlBQVksRUFBRTtBQUM5QztBQUVBLFNBQVNDLG9CQUFrQixjQUFjO0FBQ3JDLE1BQUksTUFBTUQsdUJBQXFCLFlBQVksRUFBRTtBQUM3QyxNQUFJLFNBQVNBLHVCQUFxQixZQUFZLEVBQUU7QUFFaEQsVUFBUSxJ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
