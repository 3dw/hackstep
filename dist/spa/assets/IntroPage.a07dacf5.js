import { _ as _imports_0, Q as QImg, e as eduLang } from "./climb.478354fc.js";
import { Q as QPage } from "./QPage.a456cd1e.js";
import { P as resolveComponent, Q as openBlock, R as createBlock, S as withCtx, U as createBaseVNode, f as createVNode, a7 as createElementBlock, a8 as renderList, F as Fragment, a9 as toDisplayString, W as createTextVNode, _ as _export_sfc, d as defineComponent, r as ref } from "./index.f08ad2f1.js";
import "./QSpinner.1517f046.js";
import "./use-size.cd9ed164.js";
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "row" }, [
  /* @__PURE__ */ createBaseVNode("h4", null, "\u95DC\u65BCHackstep")
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
      \u60A8\u53EF\u4EE5

      1. \u628A\u60A8\u7684\u77E5\u8B58\u6392\u6210\u6B65\u9A5F
      2. \u91CD\u65B0\u6392\u5E8F
      3. \u8907\u88FD\u9023\u7D50\uFF0C\u5206\u4EAB\u51FA\u53BB
      4. \u63A5\u6536\u6821\u5C0D\u8207\u56DE\u8986
  
      `);
    return {
      parseMarkdownToSteps: eduLang.parseMarkdownToSteps,
      intro
    };
  }
});
var IntroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", render], ["__file", "IntroPage.vue"]]);
export { IntroPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50cm9QYWdlLmEwN2RhY2Y1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvSW50cm9QYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGUgbGFuZz1cInB1Z1wiPlxucS1wYWdlLmluZGV4KHBhZGRpbmc9XCJcIilcbiAgLnJvd1xuICAgIGg0IOmXnOaWvEhhY2tzdGVwXG4gIC5yb3dcbiAgICAuY29sLXhzLTYuY29sLXNtLTQuY29sLW1kLTMucGFkZGVkXG4gICAgICBxLWltZyhjbGFzcz1cImZsdWlkXCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiAxNXB4O1wiIHNyYz1cIi4uL2Fzc2V0cy9jbGltYi5wbmdcIilcbiAgICAuY29sLXhzLTYuY29sLXNtLTguY29sLW1kLTkucGFkZGVkXG4gICAgICBoNih2LWZvcj1cIih0ZXh0LCBrKSBpbiBwYXJzZU1hcmtkb3duVG9TdGVwcyhpbnRybykuaW50cm9zXCIgOmtleT1cImtcIikge3t0ZXh0fX1cbiAgICAgIGRpdih2LWZvcj1cIihzdGVwLCB0KSBpbiBwYXJzZU1hcmtkb3duVG9TdGVwcyhpbnRybykuc3RlcHNcIiwgOmtleT1cInRcIilcbiAgICAgICAgcCh2LWlmPVwiIXN0ZXAuclwiKSB7e3N0ZXAubn19XG4gICAgICAgIHAodi1lbHNlKVxuICAgICAgICAgIHJvdXRlci1saW5rKDp0byA9XCJzdGVwLnJcIiwgdGFyZ2V0PVwiX2JsYW5rXCIsIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIikge3tzdGVwLm59fVxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgaW1wb3J0IHsgcGFyc2VNYXJrZG93blRvU3RlcHMgfSBmcm9tICdlZHUtbGFuZyc7XG4gIGltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgcmVmIH0gZnJvbSAndnVlJztcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gICAgbmFtZTogJ0luZGV4UGFnZScsXG4gICAgc2V0dXAgKCkge1xuICAgICAgY29uc3QgaW50cm8gPSByZWYoYFxuICAgICAgSGFja3N0ZXAg5piv5LiA5YCL54Sh6YKK55WM55+l6K2Y5YiG5Lqr5Zmo44CCXG4gICAgICDmgqjlj6/ku6VcblxuICAgICAgMS4g5oqK5oKo55qE55+l6K2Y5o6S5oiQ5q2l6amfXG4gICAgICAyLiDph43mlrDmjpLluo9cbiAgICAgIDMuIOikh+ijvemAo+e1kO+8jOWIhuS6q+WHuuWOu1xuICAgICAgNC4g5o6l5pS25qCh5bCN6IiH5Zue6KaGXG4gIFxuICAgICAgYCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXJzZU1hcmtkb3duVG9TdGVwcyxcbiAgICAgICAgaW50cm8sXG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG4gIDwvc2NyaXB0PlxuICAiXSwibmFtZXMiOlsicGFyc2VNYXJrZG93blRvU3RlcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkUsTUFBSyxZQUFhLGdCQUFhO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBQ04sUUFBUztBQUNQLFVBQU0sUUFBUSxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BU2pCO0FBQ00sV0FBQTtBQUFBLE1BQUEsc0JBQ0xBLFFBQUE7QUFBQSxNQUNBO0FBQUEsSUFBQTtBQUFBLEVBRUo7QUFDRixDQUFDOzs7In0=
