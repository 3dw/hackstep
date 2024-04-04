import{_ as p,Q as _,e as m}from"./climb.ada8fd1d.js";import{Q as k}from"./QPage.66dbb9b9.js";import{O as f,P as e,Q as B,R as n,S as t,f as d,a6 as r,a7 as c,F as i,a8 as u,V as E,_ as h,d as F,r as g}from"./index.993dc814.js";import"./QSpinner.a2279a89.js";import"./use-size.03a63502.js";const A=t("div",{class:"row"},[t("h4",null,"\u95DC\u65BCHackstep")],-1),v={class:"row"},w={class:"col-xs-6 col-sm-4 col-md-3 padded"},C={class:"col-xs-6 col-sm-8 col-md-9 padded"},x={key:0},y={key:1};function D(o,Q,T,M,P,V){const l=f("router-link");return e(),B(k,{class:"index",padding:""},{default:n(()=>[A,t("div",v,[t("div",w,[d(_,{class:"fluid",style:{"border-radius":"15px"},src:p})]),t("div",C,[(e(!0),r(i,null,c(o.parseMarkdownToSteps(o.intro).intros,(s,a)=>(e(),r("h6",{key:a},u(s),1))),128)),(e(!0),r(i,null,c(o.parseMarkdownToSteps(o.intro).steps,(s,a)=>(e(),r("div",{key:a},[s.r?(e(),r("p",y,[d(l,{to:s.r,target:"_blank",rel:"noopener noreferrer"},{default:n(()=>[E(u(s.n),1)]),_:2},1032,["to"])])):(e(),r("p",x,u(s.n),1))]))),128))])])]),_:1})}const S=F({name:"IndexPage",setup(){const o=g(`
      Hackstep \u662F\u4E00\u500B\u7121\u908A\u754C\u77E5\u8B58\u5206\u4EAB\u5668\u3002
      \u60A8\u53EF\u4EE5

      1. \u628A\u60A8\u7684\u77E5\u8B58\u6392\u6210\u6B65\u9A5F
      2. \u91CD\u65B0\u6392\u5E8F
      3. \u8907\u88FD\u9023\u7D50\uFF0C\u5206\u4EAB\u51FA\u53BB
      4. \u63A5\u6536\u6821\u5C0D\u8207\u56DE\u8986
  
      `);return{parseMarkdownToSteps:m.parseMarkdownToSteps,intro:o}}});var L=h(S,[["render",D]]);export{L as default};
