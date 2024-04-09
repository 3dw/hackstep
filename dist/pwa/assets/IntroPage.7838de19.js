import{_ as E,Q as B,e as _}from"./climb.0a814d8e.js";import{Q as k}from"./QBtn.771beb84.js";import{Q as F}from"./QPage.95fac6e8.js";import{O as y,P as o,Q as A,R as p,V as t,f as a,U as s,Z as c,F as f,_ as n,$ as i,W as C,a3 as g,d as z,am as D,r as S}from"./index.f5bc9926.js";import"./QSpinner.a2e0f5c3.js";import"./use-size.e01fbd60.js";import"./vm.fe545211.js";const h={class:"row"},v={class:"col-xs-12 col-sm-4 col-md-3 padded"},w={class:"col-xs-12 col-sm-8 col-md-9 padded"},Q={class:"row"};function R(e,d,l,x,T,b){const m=y("router-link");return o(),A(F,{class:"index",padding:""},{default:p(()=>[t("div",h,[t("div",v,[a(B,{class:"fluid",style:{"border-radius":"15px"},src:E})]),t("div",w,[(o(!0),s(f,null,c(e.parseMarkdownToSteps(e.intro).intros,(u,r)=>(o(),s("h6",{key:r},i(u),1))),128)),(o(!0),s(f,null,c(e.parseMarkdownToSteps(e.intro).steps,(u,r)=>(o(),s("div",{key:r},[u.r?(o(),s("p",{key:1,style:n({"font-size":e.fontSizeRef+"px"})},[a(m,{to:u.r,target:"_blank",rel:"noopener noreferrer"},{default:p(()=>[C(i(u.n),1)]),_:2},1032,["to"])],4)):(o(),s("p",{key:0,style:n({"font-size":e.fontSizeRef+"px"})},i(u.n),5))]))),128))])]),t("div",Q,[a(k,{style:n({"font-size":e.fontSizeRef+"px"}),color:"primary",onClick:e.goEdit,label:"\u5373\u523B\u5617\u8A66\u7DE8\u8F2F",icon:"edit"},null,8,["style","onClick"])])]),_:1})}const $=z({name:"IndexPage",props:{font_size:{type:Number,default:16}},setup(e){const{font_size:d}=D(e),l=S(`
      Hackstep \u662F\u4E00\u500B\u7121\u908A\u754C\u77E5\u8B58\u5206\u4EAB\u5668\u3002
      \u60A8\u53EF\u4EE5

      1. \u628A\u60A8\u7684\u77E5\u8B58\u6392\u6210\u6B65\u9A5F\u3002
      2. \u91CD\u65B0\u6392\u5E8F\uFF0C
      3. \u8907\u88FD\u9023\u7D50\uFF0C\u5206\u4EAB\u51FA\u53BB\u3002
      4. \u63A5\u6536\u6821\u5C0D\u8207\u56DE\u8986\uFF0C
      5. \u6536\u5230\u7684\u4EBA\u53EF\u4EE5\u91DD\u5C0D\u6BCF\u500B\u6B65\u9A5F\u4E0A\u7DB2\u67E5\u8A62\u3002

      `);return{fontSizeRef:d,parseMarkdownToSteps:_.parseMarkdownToSteps,intro:l}},methods:{goEdit(){this.$emit("goEdit")}}});var O=g($,[["render",R]]);export{O as default};
