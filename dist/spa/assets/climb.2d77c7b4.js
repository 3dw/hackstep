import{c as v,r as p,w as Y,l as j,h as g,U as k}from"./index.3cc489f1.js";import{c as x,h as z,Q as N}from"./QSpinner.278c3039.js";function A(t){let e=t.replace(/\s+/g," ");return e=e.replace(/\n /g,`
`).replace(/ \n/g,`
`),encodeURI(e).replace(/^%20/,"")}var F={mdToURI:A};function B(t){return D(t).steps}function U(t){var e=D(t).steps,i=D(t).intros;return console.log(i),e.title=(i||[]).unshift(),e.intros=i.filter(a=>!a.match(/\.(jpg|png|gif|webp)$/))||[],e.imgs=(i.filter(a=>a.match(/\.(jpg|png|gif|webp)$/))[0]||[]).filter(a=>a.trim()),e}function D(t){const e=t.split(`
`),i=/(.+)/,a=/^(\d+)\.?.+$/,f=/\[(.*?)\]\((.*?)\)/g,r=[],c=[];let o=!1;for(const s of e){const l=s.trim();if(!l||!i.test(l))continue;if(a.test(l)&&(o=!0),!o){c.push(l);continue}const h=l.match(f);if(h&&h.length>0)for(const w of h){const[S,_,d]=w.match(/\[(.*?)\]\((.*?)\)/);let m;d.startsWith("!")?m={r:d.replace("!","/"),n:l.replace(S,_)}:d.startsWith("http")&&(m={h:d,n:l.replace(S,_)}),r.push(m)}else r.push({n:l})}const u=c.pop().split("#").map(s=>s.replace(" ","")).filter(s=>s.trim());return{intros:c,steps:r,tags:u}}const Q=`
## \u5B78\u7FD2\u6599\u7406\u7684\u6B65\u9A5F
\u5B78\u7FD2\u6599\u7406\uFF0C\u5176\u5BE6\u5F88\u7C21\u55AE

#\u751F\u6D3B #\u5EDA\u85DD #\u6292\u58D3

1. \u5148\u5728\u5BB6\u88E1\u5EDA\u623F\u5E6B\u5FD9
2. \u53EF\u4EE5\u5230[\u81EA\u7136\u7F8E\u98DFDIY\u7DB2\u7AD9](https://food.bestian.tw)
3. \u8ACB\u770B[\u95DC\u65BC\u6211\u5011](!about)`,L={intros:["## \u5B78\u7FD2\u6599\u7406\u7684\u6B65\u9A5F","\u5B78\u7FD2\u6599\u7406\uFF0C\u5176\u5BE6\u5F88\u7C21\u55AE"],tags:["\u751F\u6D3B","\u5EDA\u85DD","\u6292\u58D3"],steps:[{n:"1. \u5148\u5728\u5BB6\u88E1\u5EDA\u623F\u5E6B\u5FD9"},{h:"https://food.bestian.tw",n:"2. \u53EF\u4EE5\u5230\u81EA\u7136\u7F8E\u98DFDIY\u7DB2\u7AD9"},{r:"/about",n:"3. \u8ACB\u770B\u95DC\u65BC\u6211\u5011"}]},H=`
## \u5B78\u7FD2\u6599\u7406\u7684\u6B65\u9A5F
\u5B78\u7FD2\u6599\u7406\uFF0C\u5176\u5BE6\u5F88\u7C21\u55AE

#\u751F\u6D3B #\u5EDA\u85DD #\u6292\u58D3

1. \u5148\u5728\u5BB6\u88E1\u5EDA\u623F\u5E6B\u5FD9
2. \u81EA\u7136\u7F8E\u98DFDIY\u7DB2\u7AD9
3. \u95DC\u65BC\u6211\u5011
`,O={title:"## \u5B78\u7FD2\u6599\u7406\u7684\u6B65\u9A5F",intros:["\u5B78\u7FD2\u6599\u7406\uFF0C\u5176\u5BE6\u5F88\u7C21\u55AE"],imgs:[],tags:["\u751F\u6D3B","\u5EDA\u85DD","\u6292\u58D3"],steps:[{n:"1. \u5148\u5728\u5BB6\u88E1\u5EDA\u623F\u5E6B\u5FD9"},{h:"https://food.bestian.tw",n:"2. \u81EA\u7136\u7F8E\u98DFDIY\u7DB2\u7AD9"},{r:"/about",n:"3. \u95DC\u65BC\u6211\u5011"}]};var W={parseMarkdownToSteps:D,parseSimpleSteps:B,parseComplexSteps:U,step_input:Q,step_output:L,setp_input_complex:H,step_output_complex:O};function E(t){return(t||"").split(",").filter(e=>e.trim())}var P={parseTags:E};function G(t){var e=new Date(t),i=new Date,a=i.getFullYear()-e.getFullYear();return(i.getMonth()<e.getMonth()||i.getMonth()==e.getMonth()&&i.getDate()<e.getDate())&&a--,a}function J(t,e){var i=new Date(e),a=new Date(t),f=a.getFullYear()-i.getFullYear();return(a.getMonth()<i.getMonth()||a.getMonth()==i.getMonth()&&a.getDate()<i.getDate())&&f--,f}var K={countAge:G,countAgeDiff:J};function V(t){const e=new Date,i=e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")+"T"+String(e.getHours()).padStart(2,"0")+":"+String(e.getMinutes()).padStart(2,"0");return t+i}var X={autoId:V};const{mdToURI:Z}=F,{parseMarkdownToSteps:tt,parseSimpleSteps:et,parseComplexSteps:nt,step_input:it,step_output:at,step_input_complex:rt,step_output_complex:lt}=W,{parseTags:ot}=P,{countAge:st,countAgeDiff:ut}=K,{autoId:ct}=X;var ht={autoId:ct,mdToURI:Z,countAge:st,countAgeDiff:ut,parseTags:ot,parseMarkdownToSteps:tt,parseSimpleSteps:et,parseComplexSteps:nt,step_input:it,step_output:at,step_input_complex:rt,step_output_complex:lt};const gt={ratio:[String,Number]};function ft(t,e){return v(()=>{const i=Number(t.ratio||(e!==void 0?e.value:void 0));return isNaN(i)!==!0&&i>0?{paddingBottom:`${100/i}%`}:null})}const dt=16/9;var vt=x({name:"QImg",props:{...gt,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:dt},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(t,{slots:e,emit:i}){const a=p(t.initialRatio),f=ft(t,a);let r=null,c=!1;const o=[p(null),p(m())],u=p(0),s=p(!1),l=p(!1),h=v(()=>`q-img q-img--${t.noNativeMenu===!0?"no-":""}menu`),w=v(()=>({width:t.width,height:t.height})),S=v(()=>`q-img__image ${t.imgClass!==void 0?t.imgClass+" ":""}q-img__image--with${t.noTransition===!0?"out":""}-transition`),_=v(()=>({...t.imgStyle,objectFit:t.fit,objectPosition:t.position}));Y(()=>d(),T);function d(){return t.src||t.srcset||t.sizes?{src:t.src,srcset:t.srcset,sizes:t.sizes}:null}function m(){return t.placeholderSrc!==void 0?{src:t.placeholderSrc}:null}function T(n){r!==null&&(clearTimeout(r),r=null),l.value=!1,n===null?(s.value=!1,o[u.value^1].value=m()):s.value=!0,o[u.value].value=n}function I({target:n}){c!==!0&&(r!==null&&(clearTimeout(r),r=null),a.value=n.naturalHeight===0?.5:n.naturalWidth/n.naturalHeight,$(n,1))}function $(n,y){c===!0||y===1e3||(n.complete===!0?C(n):r=setTimeout(()=>{r=null,$(n,y+1)},50))}function C(n){c!==!0&&(u.value=u.value^1,o[u.value].value=null,s.value=!1,l.value=!1,i("load",n.currentSrc||n.src))}function q(n){r!==null&&(clearTimeout(r),r=null),s.value=!1,l.value=!0,o[u.value].value=null,o[u.value^1].value=m(),i("error",n)}function M(n){const y=o[n].value,b={key:"img_"+n,class:S.value,style:_.value,crossorigin:t.crossorigin,decoding:t.decoding,referrerpolicy:t.referrerpolicy,height:t.height,width:t.width,loading:t.loading,fetchpriority:t.fetchpriority,"aria-hidden":"true",draggable:t.draggable,...y};return u.value===n?(b.class+=" q-img__image--waiting",Object.assign(b,{onLoad:I,onError:q})):b.class+=" q-img__image--loaded",g("div",{class:"q-img__container absolute-full",key:"img"+n},g("img",b))}function R(){return s.value!==!0?g("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},z(e[l.value===!0?"error":"default"])):g("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},e.loading!==void 0?e.loading():t.noSpinner===!0?void 0:[g(N,{color:t.spinnerColor,size:t.spinnerSize})])}return T(d()),j(()=>{c=!0,r!==null&&(clearTimeout(r),r=null)}),()=>{const n=[];return f.value!==null&&n.push(g("div",{key:"filler",style:f.value})),l.value!==!0&&(o[0].value!==null&&n.push(M(0)),o[1].value!==null&&n.push(M(1))),n.push(g(k,{name:"q-transition--fade"},R)),g("div",{class:h.value,style:w.value,role:"img","aria-label":t.alt},n)}}}),St="/assets/climb.2b3f6605.png";export{vt as Q,St as _,ht as e};
