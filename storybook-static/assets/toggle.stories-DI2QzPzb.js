import{j as s}from"./jsx-runtime-DF2Pcvd1.js";import{r as L}from"./index-B2-qRKKC.js";import{u as V}from"./index-BlCrtW8-.js";import{P as W}from"./index-Bnp5pWmS.js";import{c as I}from"./index-BwobEAja.js";import{c as $}from"./utils-CytzSlOG.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D1vk04JX.js";import"./index-CFX93qP1.js";import"./index-BFjtS4uE.js";function q(e,a,{checkForDefaultPrevented:o=!0}={}){return function(r){if(e==null||e(r),o===!1||!r.defaultPrevented)return a==null?void 0:a(r)}}var R="Toggle",k=L.forwardRef((e,a)=>{const{pressed:o,defaultPressed:l,onPressedChange:r,...M}=e,[p,O]=V({prop:o,onChange:r,defaultProp:l??!1,caller:R});return s.jsx(W.button,{type:"button","aria-pressed":p,"data-state":p?"on":"off","data-disabled":e.disabled?"":void 0,...M,ref:a,onClick:q(e.onClick,()=>{e.disabled||O(!p)})})});k.displayName=R;var A=k;const F=I("inline-flex items-center justify-center text-sm font-medium transition-colors hover:bg-primary/20 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 border-2 border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=off]:bg-transparent data-[state=off]:text-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",{variants:{variant:{default:"bg-transparent",outline:"border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"},size:{default:"h-9 px-2 min-w-9",sm:"h-8 px-1.5 min-w-8",lg:"h-10 px-2.5 min-w-10"}},defaultVariants:{variant:"default",size:"default"}}),t=L.forwardRef(({className:e,variant:a,size:o,...l},r)=>s.jsx(A,{ref:r,className:$(F({variant:a,size:o,className:e})),...l}));t.displayName=A.displayName;t.__docgenInfo={description:"",methods:[]};const ee={title:"Components/Toggle",component:t,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","outline"]},size:{control:"select",options:["default","sm","lg"]},disabled:{control:"boolean"}}},i={args:{children:"B","aria-label":"Toggle bold"}},n={args:{children:"B",variant:"outline","aria-label":"Toggle bold"}},d={args:{children:"Toggle me"}},c={render:()=>s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(t,{size:"sm","aria-label":"Small",children:"Sm"}),s.jsx(t,{size:"default","aria-label":"Default",children:"Md"}),s.jsx(t,{size:"lg","aria-label":"Large",children:"Lg"})]})},g={args:{children:"B",disabled:!0,"aria-label":"Toggle disabled"}},m={args:{children:"B",defaultPressed:!0,"aria-label":"Toggle pressed"}};var u,f,b;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: 'B',
    'aria-label': 'Toggle bold'
  }
}`,...(b=(f=i.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var h,x,T;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'B',
    variant: 'outline',
    'aria-label': 'Toggle bold'
  }
}`,...(T=(x=n.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var v,y,P;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'Toggle me'
  }
}`,...(P=(y=d.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};var S,z,j;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Small">Sm</Toggle>
      <Toggle size="default" aria-label="Default">Md</Toggle>
      <Toggle size="lg" aria-label="Large">Lg</Toggle>
    </div>
}`,...(j=(z=c.parameters)==null?void 0:z.docs)==null?void 0:j.source}}};var B,N,_;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'B',
    disabled: true,
    'aria-label': 'Toggle disabled'
  }
}`,...(_=(N=g.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};var C,D,w;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'B',
    defaultPressed: true,
    'aria-label': 'Toggle pressed'
  }
}`,...(w=(D=m.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};const ae=["Default","Outline","WithText","AllSizes","Disabled","Pressed"];export{c as AllSizes,i as Default,g as Disabled,n as Outline,m as Pressed,d as WithText,ae as __namedExportsOrder,ee as default};
