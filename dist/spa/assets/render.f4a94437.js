import{c,W as o,d as a,h as f,I as d}from"./index.cb34bf94.js";const v={xs:18,sm:24,md:32,lg:38,xl:46},m={size:String};function z(e,n=v){return c(()=>e.size!==void 0?{fontSize:e.size in n?`${n[e.size]}px`:e.size}:null)}const S=e=>o(a(e)),h=e=>o(e);function g(e,n){return e!==void 0&&e()||n}function x(e,n){if(e!==void 0){const i=e();if(i!=null)return i.slice()}return n}function D(e,n){return e!==void 0?n.concat(e()):n}function k(e,n,i,r,t,u){n.key=r+t;const s=f(e,n,i);return t===!0?d(s,u()):s}export{x as a,h as b,S as c,k as d,D as e,z as f,v as g,g as h,m as u};