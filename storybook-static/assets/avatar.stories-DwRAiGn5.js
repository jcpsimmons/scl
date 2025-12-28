import{j as t}from"./jsx-runtime-DF2Pcvd1.js";import{r as l}from"./index-B2-qRKKC.js";import{u as te}from"./index-ciuW_uyV.js";import{u as E}from"./index-D1vk04JX.js";import"./index-CFX93qP1.js";import{c as ne}from"./index-BiMR7eR1.js";import{c as F}from"./utils-CytzSlOG.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BFjtS4uE.js";function se(e,a=[]){let r=[];function c(n,d){const o=l.createContext(d);o.displayName=n+"Context";const i=r.length;r=[...r,d];const v=f=>{var _;const{scope:p,children:w,...b}=f,g=((_=p==null?void 0:p[e])==null?void 0:_[i])||o,re=l.useMemo(()=>b,Object.values(b));return t.jsx(g.Provider,{value:re,children:w})};v.displayName=n+"Provider";function h(f,p){var g;const w=((g=p==null?void 0:p[e])==null?void 0:g[i])||o,b=l.useContext(w);if(b)return b;if(d!==void 0)return d;throw new Error(`\`${f}\` must be used within \`${n}\``)}return[v,h]}const s=()=>{const n=r.map(d=>l.createContext(d));return function(o){const i=(o==null?void 0:o[e])||n;return l.useMemo(()=>({[`__scope${e}`]:{...o,[e]:i}}),[o,i])}};return s.scopeName=e,[c,oe(s,...a)]}function oe(...e){const a=e[0];if(e.length===1)return a;const r=()=>{const c=e.map(s=>({useScope:s(),scopeName:s.scopeName}));return function(n){const d=c.reduce((o,{useScope:i,scopeName:v})=>{const f=i(n)[`__scope${v}`];return{...o,...f}},{});return l.useMemo(()=>({[`__scope${a.scopeName}`]:d}),[d])}};return r.scopeName=a.scopeName,r}var ce=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],C=ce.reduce((e,a)=>{const r=ne(`Primitive.${a}`),c=l.forwardRef((s,n)=>{const{asChild:d,...o}=s,i=d?r:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),t.jsx(i,{...o,ref:n})});return c.displayName=`Primitive.${a}`,{...e,[a]:c}},{}),z={exports:{}},J={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x=l;function le(e,a){return e===a&&(e!==0||1/e===1/a)||e!==e&&a!==a}var de=typeof Object.is=="function"?Object.is:le,ie=x.useState,ue=x.useEffect,me=x.useLayoutEffect,ve=x.useDebugValue;function fe(e,a){var r=a(),c=ie({inst:{value:r,getSnapshot:a}}),s=c[0].inst,n=c[1];return me(function(){s.value=r,s.getSnapshot=a,y(s)&&n({inst:s})},[e,r,a]),ue(function(){return y(s)&&n({inst:s}),e(function(){y(s)&&n({inst:s})})},[e]),ve(r),r}function y(e){var a=e.getSnapshot;e=e.value;try{var r=a();return!de(e,r)}catch{return!0}}function pe(e,a){return a()}var xe=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?pe:fe;J.useSyncExternalStore=x.useSyncExternalStore!==void 0?x.useSyncExternalStore:xe;z.exports=J;var he=z.exports;function be(){return he.useSyncExternalStore(ge,()=>!0,()=>!1)}function ge(){return()=>{}}var L="Avatar",[Ae]=se(L),[Se,X]=Ae(L),q=l.forwardRef((e,a)=>{const{__scopeAvatar:r,...c}=e,[s,n]=l.useState("idle");return t.jsx(Se,{scope:r,imageLoadingStatus:s,onImageLoadingStatusChange:n,children:t.jsx(C.span,{...c,ref:a})})});q.displayName=L;var K="AvatarImage",U=l.forwardRef((e,a)=>{const{__scopeAvatar:r,src:c,onLoadingStatusChange:s=()=>{},...n}=e,d=X(K,r),o=Ne(c,n),i=te(v=>{s(v),d.onImageLoadingStatusChange(v)});return E(()=>{o!=="idle"&&i(o)},[o,i]),o==="loaded"?t.jsx(C.img,{...n,ref:a,src:c}):null});U.displayName=K;var Q="AvatarFallback",Y=l.forwardRef((e,a)=>{const{__scopeAvatar:r,delayMs:c,...s}=e,n=X(Q,r),[d,o]=l.useState(c===void 0);return l.useEffect(()=>{if(c!==void 0){const i=window.setTimeout(()=>o(!0),c);return()=>window.clearTimeout(i)}},[c]),d&&n.imageLoadingStatus!=="loaded"?t.jsx(C.span,{...s,ref:a}):null});Y.displayName=Q;function I(e,a){return e?a?(e.src!==a&&(e.src=a),e.complete&&e.naturalWidth>0?"loaded":"loading"):"error":"idle"}function Ne(e,{referrerPolicy:a,crossOrigin:r}){const c=be(),s=l.useRef(null),n=c?(s.current||(s.current=new window.Image),s.current):null,[d,o]=l.useState(()=>I(n,e));return E(()=>{o(I(n,e))},[n,e]),E(()=>{const i=f=>()=>{o(f)};if(!n)return;const v=i("loaded"),h=i("error");return n.addEventListener("load",v),n.addEventListener("error",h),a&&(n.referrerPolicy=a),typeof r=="string"&&(n.crossOrigin=r),()=>{n.removeEventListener("load",v),n.removeEventListener("error",h)}},[n,r,a]),d}var Z=q,ee=U,ae=Y;const u=l.forwardRef(({className:e,...a},r)=>t.jsx(Z,{ref:r,className:F("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-primary",e),...a}));u.displayName=Z.displayName;const k=l.forwardRef(({className:e,...a},r)=>t.jsx(ee,{ref:r,className:F("aspect-square h-full w-full",e),...a}));k.displayName=ee.displayName;const m=l.forwardRef(({className:e,...a},r)=>t.jsx(ae,{ref:r,className:F("flex h-full w-full items-center justify-center rounded-full bg-background border border-primary text-primary",e),...a}));m.displayName=ae.displayName;u.__docgenInfo={description:"",methods:[]};k.__docgenInfo={description:"",methods:[]};m.__docgenInfo={description:"",methods:[]};const Ie={title:"Components/Avatar",component:u,tags:["autodocs"]},A={render:()=>t.jsxs(u,{children:[t.jsx(k,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),t.jsx(m,{children:"CN"})]})},S={render:()=>t.jsxs(u,{children:[t.jsx(k,{src:"/broken-image.jpg",alt:"@user"}),t.jsx(m,{children:"JD"})]})},N={render:()=>t.jsxs("div",{className:"flex items-center gap-4",children:[t.jsx(u,{className:"h-8 w-8",children:t.jsx(m,{className:"text-xs",children:"SM"})}),t.jsx(u,{children:t.jsx(m,{children:"MD"})}),t.jsx(u,{className:"h-14 w-14",children:t.jsx(m,{className:"text-lg",children:"LG"})}),t.jsx(u,{className:"h-20 w-20",children:t.jsx(m,{className:"text-xl",children:"XL"})})]})},j={render:()=>t.jsxs("div",{className:"flex -space-x-4",children:[t.jsx(u,{className:"border-2 border-background",children:t.jsx(m,{children:"A"})}),t.jsx(u,{className:"border-2 border-background",children:t.jsx(m,{children:"B"})}),t.jsx(u,{className:"border-2 border-background",children:t.jsx(m,{children:"C"})}),t.jsx(u,{className:"border-2 border-background",children:t.jsx(m,{children:"+3"})})]})};var R,$,M;A.parameters={...A.parameters,docs:{...(R=A.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
}`,...(M=($=A.parameters)==null?void 0:$.docs)==null?void 0:M.source}}};var P,D,G;S.parameters={...S.parameters,docs:{...(P=S.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="@user" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
}`,...(G=(D=S.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var W,B,O;N.parameters={...N.parameters,docs:{...(W=N.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarFallback className="text-lg">LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-20 w-20">
        <AvatarFallback className="text-xl">XL</AvatarFallback>
      </Avatar>
    </div>
}`,...(O=(B=N.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var H,T,V;j.parameters={...j.parameters,docs:{...(H=j.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="flex -space-x-4">
      <Avatar className="border-2 border-background">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
}`,...(V=(T=j.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};const Re=["WithImage","WithFallback","Sizes","Group"];export{j as Group,N as Sizes,S as WithFallback,A as WithImage,Re as __namedExportsOrder,Ie as default};
