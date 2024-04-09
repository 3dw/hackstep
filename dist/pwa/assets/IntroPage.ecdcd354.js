import{_ as p,Q as m,e as _}from"./climb.05ad78b9.js";import{Q as E}from"./QBtn.0adaa175.js";import{Q as B}from"./QPage.1cc060c7.js";import{O as k,P as o,Q as F,R as d,V as s,f as a,U as r,Z as i,F as l,_ as n,W as f,a2 as A,d as C,r as g}from"./index.ca8edc74.js";import"./QSpinner.bc0306b6.js";import"./use-size.8e804f79.js";import"./vm.416bba68.js";const h={class:"row"},D={class:"col-xs-6 col-sm-4 col-md-3 padded"},v={class:"col-xs-6 col-sm-8 col-md-9 padded"},w={key:0},y={key:1},Q={class:"row"};function x(e,T,$,M,P,V){const c=k("router-link");return o(),F(B,{class:"index",padding:""},{default:d(()=>[s("div",h,[s("div",D,[a(m,{class:"fluid",style:{"border-radius":"15px"},src:p})]),s("div",v,[(o(!0),r(l,null,i(e.parseMarkdownToSteps(e.intro).intros,(u,t)=>(o(),r("h6",{key:t},n(u),1))),128)),(o(!0),r(l,null,i(e.parseMarkdownToSteps(e.intro).steps,(u,t)=>(o(),r("div",{key:t},[u.r?(o(),r("p",y,[a(c,{to:u.r,target:"_blank",rel:"noopener noreferrer"},{default:d(()=>[f(n(u.n),1)]),_:2},1032,["to"])])):(o(),r("p",w,n(u.n),1))]))),128))])]),s("div",Q,[a(E,{color:"primary",onClick:e.goEdit,label:"\u5373\u523B\u5617\u8A66\u7DE8\u8F2F",icon:"edit"},null,8,["onClick"])])]),_:1})}const S=C({name:"IndexPage",setup(){const e=g(`
      Hackstep \u662F\u4E00\u500B\u7121\u908A\u754C\u77E5\u8B58\u5206\u4EAB\u5668\u3002
      \u60A8\u53EF\u4EE5

      1. \u628A\u60A8\u7684\u77E5\u8B58\u6392\u6210\u6B65\u9A5F\u3002
      2. \u91CD\u65B0\u6392\u5E8F\uFF0C
      3. \u8907\u88FD\u9023\u7D50\uFF0C\u5206\u4EAB\u51FA\u53BB\u3002
      4. \u63A5\u6536\u6821\u5C0D\u8207\u56DE\u8986\uFF0C
      5. \u6536\u5230\u7684\u4EBA\u53EF\u4EE5\u91DD\u5C0D\u6BCF\u500B\u6B65\u9A5F\u4E0A\u7DB2\u67E5\u8A62\u3002

      `);return{parseMarkdownToSteps:_.parseMarkdownToSteps,intro:e}},methods:{goEdit(){this.$emit("goEdit")}}});var U=A(S,[["render",x]]);export{U as default};
