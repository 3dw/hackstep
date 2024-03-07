import{_ as p,Q as B,e as _}from"./climb.535ffc92.js";import{Q as m}from"./QPage.7a459066.js";import{x as A,y as e,z as F,A as n,N as r,f as d,O as s,P as i,F as c,Q as a,R as k,_ as E,d as f,r as C}from"./index.15b44220.js";import"./QSpinner.94408b02.js";const h=r("div",{class:"row"},[r("h2",null,"\u95DC\u65BCHackstep")],-1),g={class:"row"},v={class:"col-xs-6 col-sm-4 col-md-3 padded"},w={class:"col-xs-6 col-sm-8 col-md-9 padded"},x={key:0},y={key:1};function Q(u,T,M,N,P,$){const l=A("router-link");return e(),F(m,{class:"index",padding:""},{default:n(()=>[h,r("div",g,[r("div",v,[d(B,{class:"fluid",style:{"border-radius":"15px"},src:p})]),r("div",w,[(e(!0),s(c,null,i(u.parseMarkdownToSteps(u.intro).intros,(o,t)=>(e(),s("h6",{key:t},a(o),1))),128)),(e(!0),s(c,null,i(u.parseMarkdownToSteps(u.intro).steps,(o,t)=>(e(),s("div",{key:t},[o.r?(e(),s("p",y,[d(l,{to:o.r,target:"_blank",rel:"noopener noreferrer"},{default:n(()=>[k(a(o.n),1)]),_:2},1032,["to"])])):(e(),s("p",x,a(o.n),1))]))),128))])])]),_:1})}const S=f({name:"IndexPage",setup(){const u=C(`
      Hackstep \u662F\u4E00\u500B\u7121\u908A\u754C\u77E5\u8B58\u5206\u4EAB\u5668\u3002
      \u60A8\u53EF\u4EE5\u628A\u60A8\u7684\u77E5\u8B58\u6392\u6210\u6B65\u9A5F\u6216\u8005\u5C0F\u968E\u68AF\uFF1A
  
      1.\u5148\u78BA\u5B9A\u4F60\u6709\u610F\u9858\u5206\u4EAB\u60A8\u7684\u77E5\u8B58
      2.\u8ACB\u53C3\u8003[\u4F7F\u7528\u8AAA\u660E](!intro)
      3.\u8ACB\u5F9E[\u7BC4\u4F8B\u958B\u59CB](!edit/\u6A19\u984C%201.\u7B2C\u4E00\u6B65)
      4.\u958B\u59CB\u5206\u4EAB\u5427\uFF01
  
      `);return{parseMarkdownToSteps:_.parseMarkdownToSteps,intro:u}}});var L=E(S,[["render",Q]]);export{L as default};
