import { _ as _imports_0, Q as QImg, e as eduLang } from "./climb.478354fc.js";
import { Q as QPage } from "./QPage.a456cd1e.js";
import { P as resolveComponent, Q as openBlock, R as createBlock, S as withCtx, U as createBaseVNode, f as createVNode, a7 as createElementBlock, a8 as renderList, F as Fragment, a9 as toDisplayString, W as createTextVNode, _ as _export_sfc, d as defineComponent, r as ref } from "./index.f08ad2f1.js";
import "./QSpinner.1517f046.js";
import "./use-size.cd9ed164.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "row" }, [
  /* @__PURE__ */ createBaseVNode("h2", null, "\u95DC\u65BCHackstep")
], -1);
const _hoisted_2 = { class: "row" };
const _hoisted_3 = { class: "col-xs-6 col-sm-4 col-md-3 padded" };
const _hoisted_4 = { class: "col-xs-6 col-sm-8 col-md-9 padded" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { key: 1 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock(QPage, {
    class: "index",
    padding: ""
  }, {
    default: withCtx(() => [
      _hoisted_1,
      createBaseVNode("div", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createVNode(QImg, {
            class: "fluid",
            style: { "border-radius": "15px" },
            src: _imports_0
          })
        ]),
        createBaseVNode("div", _hoisted_4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.parseMarkdownToSteps(_ctx.intro).intros, (text, k) => {
            return openBlock(), createElementBlock("h6", { key: k }, toDisplayString(text), 1);
          }), 128)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.parseMarkdownToSteps(_ctx.intro).steps, (step, t) => {
            return openBlock(), createElementBlock("div", { key: t }, [
              !step.r ? (openBlock(), createElementBlock("p", _hoisted_5, toDisplayString(step.n), 1)) : (openBlock(), createElementBlock("p", _hoisted_6, [
                createVNode(_component_router_link, {
                  to: step.r,
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(step.n), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])
              ]))
            ]);
          }), 128))
        ])
      ])
    ]),
    _: 1
  });
}
const _sfc_main = defineComponent({
  name: "IndexPage",
  setup() {
    const intro = ref(`
    Hackstep \u662F\u4E00\u500B\u7121\u908A\u754C\u77E5\u8B58\u5206\u4EAB\u5668\u3002
    \u60A8\u53EF\u4EE5\u628A\u60A8\u7684\u77E5\u8B58\u6392\u6210\u6B65\u9A5F\u6216\u8005\u5C0F\u968E\u68AF\uFF1A`);
    return {
      parseMarkdownToSteps: eduLang.parseMarkdownToSteps,
      intro
    };
  },
  mounted() {
    const path = "/edit/step1%20step2%20step3";
    this.$router.push(path);
  }
});
var IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "IndexPage.vue"]]);
export { IndexPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhQYWdlLmMxODQ3OWMyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvSW5kZXhQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGUgbGFuZz1cInB1Z1wiPlxucS1wYWdlLmluZGV4KHBhZGRpbmc9XCJcIilcbiAgLnJvd1xuICAgIGgyIOmXnOaWvEhhY2tzdGVwXG4gIC5yb3dcbiAgICAuY29sLXhzLTYuY29sLXNtLTQuY29sLW1kLTMucGFkZGVkXG4gICAgICBxLWltZyhjbGFzcz1cImZsdWlkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAxNXB4O1wiIHNyYz1cIi4uL2Fzc2V0cy9jbGltYi5wbmdcIilcbiAgICAuY29sLXhzLTYuY29sLXNtLTguY29sLW1kLTkucGFkZGVkXG4gICAgICBoNih2LWZvcj1cIih0ZXh0LCBrKSBpbiBwYXJzZU1hcmtkb3duVG9TdGVwcyhpbnRybykuaW50cm9zXCIgOmtleT1cImtcIikge3t0ZXh0fX1cbiAgICAgIGRpdih2LWZvcj1cIihzdGVwLCB0KSBpbiBwYXJzZU1hcmtkb3duVG9TdGVwcyhpbnRybykuc3RlcHNcIiwgOmtleT1cInRcIilcbiAgICAgICAgcCh2LWlmPVwiIXN0ZXAuclwiKSB7e3N0ZXAubn19XG4gICAgICAgIHAodi1lbHNlKVxuICAgICAgICAgIHJvdXRlci1saW5rKDp0byA9XCJzdGVwLnJcIiwgdGFyZ2V0PVwiX2JsYW5rXCIsIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIikge3tzdGVwLm59fVxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHBhcnNlTWFya2Rvd25Ub1N0ZXBzIH0gZnJvbSAnZWR1LWxhbmcnO1xuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50LCByZWYgfSBmcm9tICd2dWUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnSW5kZXhQYWdlJyxcbiAgc2V0dXAoKSB7XG4gICAgY29uc3QgaW50cm8gPSByZWYoYFxuICAgIEhhY2tzdGVwIOaYr+S4gOWAi+eEoemCiueVjOefpeitmOWIhuS6q+WZqOOAglxuICAgIOaCqOWPr+S7peaKiuaCqOeahOefpeitmOaOkuaIkOatpempn+aIluiAheWwj+majuair++8mmApO1xuICAgIHJldHVybiB7XG4gICAgICBwYXJzZU1hcmtkb3duVG9TdGVwcyxcbiAgICAgIGludHJvLFxuICAgIH07XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgLy8g5L2/55So57eo56K85b6M55qEVVJM5L6G6JmV55CG56m65qC8562J5a2X56ymXG4gICAgY29uc3QgcGF0aCA9ICcvZWRpdC9zdGVwMSUyMHN0ZXAyJTIwc3RlcDMnO1xuICAgIHRoaXMuJHJvdXRlci5wdXNoKHBhdGgpO1xuICB9LFxufSk7XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJwYXJzZU1hcmtkb3duVG9TdGVwcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFLLFlBQWEsZ0JBQWE7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQ04sVUFBTSxRQUFRLElBQUk7QUFBQTtBQUFBLGlIQUVDO0FBQ1osV0FBQTtBQUFBLE1BQUEsc0JBQ0xBLFFBQUE7QUFBQSxNQUNBO0FBQUEsSUFBQTtBQUFBLEVBRUo7QUFBQSxFQUNBLFVBQVU7QUFFUixVQUFNLE9BQU87QUFDUixTQUFBLFFBQVEsS0FBSyxJQUFJO0FBQUEsRUFDeEI7QUFDRixDQUFDOzs7In0=
