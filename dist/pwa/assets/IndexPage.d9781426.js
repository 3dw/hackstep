import{_ as l,Q as _,e as m}from"./climb.04a655e1.js";import{Q as k}from"./QPage.84fa6aa1.js";import{x as f,y as s,z as h,A as u,N as r,f as d,O as t,P as p,F as c,Q as n,R as g,_ as A,d as B,r as E}from"./index.d1d8b485.js";import"./QSpinner.ff89eb96.js";const F=r("div",{class:"row"},[r("h2",null,"\u95DC\u65BCHackstep")],-1),x={class:"row"},v={class:"col-xs-6 col-sm-4 col-md-3 padded"},w={class:"col-xs-6 col-sm-8 col-md-9 padded"},y={key:0},C={key:1};function Q(e,T,$,M,N,P){const i=f("router-link");return s(),h(k,{class:"index",padding:""},{default:u(()=>[F,r("div",x,[r("div",v,[d(_,{class:"fluid",style:{"border-radius":"15px"},src:l})]),r("div",w,[(s(!0),t(c,null,p(e.parseMarkdownToSteps(e.intro).intros,(o,a)=>(s(),t("h6",{key:a},n(o),1))),128)),(s(!0),t(c,null,p(e.parseMarkdownToSteps(e.intro).steps,(o,a)=>(s(),t("div",{key:a},[o.r?(s(),t("p",C,[d(i,{to:o.r,target:"_blank",rel:"noopener noreferrer"},{default:u(()=>[g(n(o.n),1)]),_:2},1032,["to"])])):(s(),t("p",y,n(o.n),1))]))),128))])])]),_:1})}const S=B({name:"IndexPage",setup(){const e=E(`
    Hackstep \u662F\u4E00\u500B\u7121\u908A\u754C\u77E5\u8B58\u5206\u4EAB\u5668\u3002
    \u60A8\u53EF\u4EE5\u628A\u60A8\u7684\u77E5\u8B58\u6392\u6210\u6B65\u9A5F\u6216\u8005\u5C0F\u968E\u68AF\uFF1A`);return{parseMarkdownToSteps:m.parseMarkdownToSteps,intro:e}},mounted(){const e="/edit/step1%20step2%20step3";this.$router.push(e)}});var L=A(S,[["render",Q]]);export{L as default};