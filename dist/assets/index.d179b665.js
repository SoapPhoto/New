var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,o=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,i=(e,t)=>{for(var a in t||(t={}))n.call(t,a)&&o(e,a,t[a]);if(r)for(var a of r(t))l.call(t,a)&&o(e,a,t[a]);return e};import{al as s,w as p,p as c,b as d,aM as u,R as b}from"./vendor.9f1e8ded.js";import{P as f,a as m,S as g,A as y,B as v}from"./index.0f259b86.js";const O={};function j(e,r){return s(f,(n=i(i({},O),r),t(n,a({variables:e}))));var n}const E=p((()=>{const{t:e}=c(),{loading:t,data:a,fetchMore:r,networkStatus:n}=j({type:m.NEW,query:{page:1,pageSize:20}}),l=d.exports.useCallback((()=>{if(!a||n!==u.ready)return;const{pictures:e}=a,{count:t,page:l,pageSize:o}=e;o*l>=t||r({variables:{query:{page:l+1,pageSize:20}}})}),[a,r,n]);return b.createElement("div",{style:{padding:"28px",paddingTop:0,width:"100%",minHeight:"calc(100vh - 80px)"}},t&&n===u.loading||!a?b.createElement("div",null,b.createElement(g,null)):b.createElement("div",null,b.createElement(y,{list:a.pictures.data}),b.createElement(v,{onClick:l},e("label.more"))))}));export{E as default};
