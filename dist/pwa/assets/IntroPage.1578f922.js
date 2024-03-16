import{_ as p,Q as _,e as m}from"./climb.d70d0d4d.js";import{Q as k}from"./QPage.d3e2bcec.js";import{M as f,N as e,O as B,Q as n,W as t,f as d,X as r,Y as c,F as i,Z as a,R as E,_ as h,d as F,r as g}from"./index.67024eec.js";import"./QSpinner.85c529e9.js";const A=t("div",{class:"row"},[t("h4",null,"\u95DC\u65BCHackstep")],-1),v={class:"row"},w={class:"col-xs-6 col-sm-4 col-md-3 padded"},C={class:"col-xs-6 col-sm-8 col-md-9 padded"},x={key:0},y={key:1};function D(s,Q,S,T,N,$){const l=f("router-link");return e(),B(k,{class:"index",padding:""},{default:n(()=>[A,t("div",v,[t("div",w,[d(_,{class:"fluid",style:{"border-radius":"15px"},src:p})]),t("div",C,[(e(!0),r(i,null,c(s.parseMarkdownToSteps(s.intro).intros,(o,u)=>(e(),r("h6",{key:u},a(o),1))),128)),(e(!0),r(i,null,c(s.parseMarkdownToSteps(s.intro).steps,(o,u)=>(e(),r("div",{key:u},[o.r?(e(),r("p",y,[d(l,{to:o.r,target:"_blank",rel:"noopener noreferrer"},{default:n(()=>[E(a(o.n),1)]),_:2},1032,["to"])])):(e(),r("p",x,a(o.n),1))]))),128))])])]),_:1})}const M=F({name:"IndexPage",setup(){const s=g(`
      Hackstep \u662F\u4E00\u500B\u7121\u908A\u754C\u77E5\u8B58\u5206\u4EAB\u5668\u3002
      \u60A8\u53EF\u4EE5

      1. \u628A\u60A8\u7684\u77E5\u8B58\u6392\u6210\u6B65\u9A5F
      2. \u91CD\u65B0\u6392\u5E8F
      3. \u8907\u88FD\u9023\u7D50\uFF0C\u5206\u4EAB\u51FA\u53BB
      4. \u63A5\u6536\u6821\u5C0D\u8207\u56DE\u8986
  
      `);return{parseMarkdownToSteps:m.parseMarkdownToSteps,intro:s}}});var H=h(M,[["render",D]]);export{H as default};
