import{j as a}from"./jsx-runtime-DF2Pcvd1.js";import{r as i}from"./index-B2-qRKKC.js";import"./index-CFX93qP1.js";import{c as pe}from"./index-BiMR7eR1.js";import{c as ge}from"./utils-CytzSlOG.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BFjtS4uE.js";function ve(e,r=[]){let l=[];function o(u,c){const t=i.createContext(c);t.displayName=u+"Context";const n=l.length;l=[...l,c];const p=g=>{var E;const{scope:d,children:$,...v}=g,f=((E=d==null?void 0:d[e])==null?void 0:E[n])||t,de=i.useMemo(()=>v,Object.values(v));return a.jsx(f.Provider,{value:de,children:$})};p.displayName=u+"Provider";function D(g,d){var f;const $=((f=d==null?void 0:d[e])==null?void 0:f[n])||t,v=i.useContext($);if(v)return v;if(c!==void 0)return c;throw new Error(`\`${g}\` must be used within \`${u}\``)}return[p,D]}const s=()=>{const u=l.map(c=>i.createContext(c));return function(t){const n=(t==null?void 0:t[e])||u;return i.useMemo(()=>({[`__scope${e}`]:{...t,[e]:n}}),[t,n])}};return s.scopeName=e,[o,fe(s,...r)]}function fe(...e){const r=e[0];if(e.length===1)return r;const l=()=>{const o=e.map(s=>({useScope:s(),scopeName:s.scopeName}));return function(u){const c=o.reduce((t,{useScope:n,scopeName:p})=>{const g=n(u)[`__scope${p}`];return{...t,...g}},{});return i.useMemo(()=>({[`__scope${r.scopeName}`]:c}),[c])}};return l.scopeName=r.scopeName,l}var he=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],le=he.reduce((e,r)=>{const l=pe(`Primitive.${r}`),o=i.forwardRef((s,u)=>{const{asChild:c,...t}=s,n=c?l:r;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),a.jsx(n,{...t,ref:u})});return o.displayName=`Primitive.${r}`,{...e,[r]:o}},{}),T="Progress",_=100,[xe]=ve(T),[Pe,be]=xe(T),ce=i.forwardRef((e,r)=>{const{__scopeProgress:l,value:o=null,max:s,getValueLabel:u=we,...c}=e;(s||s===0)&&!M(s)&&console.error(Ne(`${s}`,"Progress"));const t=M(s)?s:_;o!==null&&!I(o,t)&&console.error(ye(`${o}`,"Progress"));const n=I(o,t)?o:null,p=j(n)?u(n,t):void 0;return a.jsx(Pe,{scope:l,value:n,max:t,children:a.jsx(le.div,{"aria-valuemax":t,"aria-valuemin":0,"aria-valuenow":j(n)?n:void 0,"aria-valuetext":p,role:"progressbar","data-state":me(n,t),"data-value":n??void 0,"data-max":t,...c,ref:r})})});ce.displayName=T;var ue="ProgressIndicator",ie=i.forwardRef((e,r)=>{const{__scopeProgress:l,...o}=e,s=be(ue,l);return a.jsx(le.div,{"data-state":me(s.value,s.max),"data-value":s.value??void 0,"data-max":s.max,...o,ref:r})});ie.displayName=ue;function we(e,r){return`${Math.round(e/r*100)}%`}function me(e,r){return e==null?"indeterminate":e===r?"complete":"loading"}function j(e){return typeof e=="number"}function M(e){return j(e)&&!isNaN(e)&&e>0}function I(e,r){return j(e)&&!isNaN(e)&&e<=r&&e>=0}function Ne(e,r){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${r}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${_}\`.`}function ye(e,r){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${r}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${_} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var Ce=ce,Se=ie;const m=i.forwardRef(({className:e,value:r=0,showPercentage:l=!1,label:o,...s},u)=>a.jsxs("div",{className:"w-full min-w-[200px]",children:[(o||l)&&a.jsxs("div",{className:"flex justify-center items-center gap-2 mb-2 font-mono text-sm font-bold text-primary",children:[o&&a.jsx("span",{children:o}),l&&a.jsxs("span",{children:[Math.round(r),"%"]})]}),a.jsx(Ce,{ref:u,className:ge("relative h-6 w-full overflow-hidden bg-background border-2 border-primary",e),...s,children:a.jsx(Se,{className:"h-full bg-primary transition-all duration-200",style:{width:`${r}%`}})})]}));m.displayName="Progress";m.__docgenInfo={description:"",methods:[],displayName:"Progress",props:{value:{required:!1,tsType:{name:"number"},description:"Progress value from 0 to 100",defaultValue:{value:"0",computed:!1}},showPercentage:{required:!1,tsType:{name:"boolean"},description:"Show percentage text",defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Custom label text"}}};const Ie={title:"Components/Progress",component:m,tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1}},showPercentage:{control:"boolean"}}},h={args:{value:50}},x={args:{value:0,label:"Not started",showPercentage:!0}},P={args:{value:25,label:"Loading...",showPercentage:!0}},b={args:{value:50,label:"Processing...",showPercentage:!0}},w={args:{value:75,label:"Almost there...",showPercentage:!0}},N={args:{value:100,label:"Complete!",showPercentage:!0}},y={args:{value:66,label:"Upload progress",showPercentage:!0}},C={render:()=>a.jsxs("div",{className:"flex flex-col gap-6 w-full",children:[a.jsx(m,{value:60,label:"Default (Green)",showPercentage:!0}),a.jsx("div",{className:"theme-cyan",children:a.jsx(m,{value:45,label:"Cyan Theme",showPercentage:!0})}),a.jsx("div",{className:"theme-yellow",children:a.jsx(m,{value:80,label:"Yellow Theme",showPercentage:!0})}),a.jsx("div",{className:"theme-hotpink",children:a.jsx(m,{value:30,label:"Hot Pink Theme",showPercentage:!0})})]})},S={render:()=>a.jsxs("div",{className:"flex flex-col gap-4 w-full",children:[a.jsx(m,{value:25,label:"CPU Usage",showPercentage:!0}),a.jsx(m,{value:60,label:"Memory",showPercentage:!0}),a.jsx(m,{value:90,label:"Disk Space",showPercentage:!0})]})};var R,k,L;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    value: 50
  }
}`,...(L=(k=h.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var V,A,U;x.parameters={...x.parameters,docs:{...(V=x.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    value: 0,
    label: 'Not started',
    showPercentage: true
  }
}`,...(U=(A=x.parameters)==null?void 0:A.docs)==null?void 0:U.source}}};var O,H,G;P.parameters={...P.parameters,docs:{...(O=P.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    value: 25,
    label: 'Loading...',
    showPercentage: true
  }
}`,...(G=(H=P.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};var Q,W,q;b.parameters={...b.parameters,docs:{...(Q=b.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    value: 50,
    label: 'Processing...',
    showPercentage: true
  }
}`,...(q=(W=b.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var Y,B,F;w.parameters={...w.parameters,docs:{...(Y=w.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    value: 75,
    label: 'Almost there...',
    showPercentage: true
  }
}`,...(F=(B=w.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var X,z,J;N.parameters={...N.parameters,docs:{...(X=N.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    value: 100,
    label: 'Complete!',
    showPercentage: true
  }
}`,...(J=(z=N.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};var K,Z,ee;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    value: 66,
    label: 'Upload progress',
    showPercentage: true
  }
}`,...(ee=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var re,ae,se;C.parameters={...C.parameters,docs:{...(re=C.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-6 w-full">
      <Progress value={60} label="Default (Green)" showPercentage />
      <div className="theme-cyan">
        <Progress value={45} label="Cyan Theme" showPercentage />
      </div>
      <div className="theme-yellow">
        <Progress value={80} label="Yellow Theme" showPercentage />
      </div>
      <div className="theme-hotpink">
        <Progress value={30} label="Hot Pink Theme" showPercentage />
      </div>
    </div>
}`,...(se=(ae=C.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var te,oe,ne;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-full">
      <Progress value={25} label="CPU Usage" showPercentage />
      <Progress value={60} label="Memory" showPercentage />
      <Progress value={90} label="Disk Space" showPercentage />
    </div>
}`,...(ne=(oe=S.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};const Re=["Default","Empty","Quarter","Half","ThreeQuarters","Complete","WithLabel","WithThemeColors","ComparisonDemo"];export{S as ComparisonDemo,N as Complete,h as Default,x as Empty,b as Half,P as Quarter,w as ThreeQuarters,y as WithLabel,C as WithThemeColors,Re as __namedExportsOrder,Ie as default};
