import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{c as E}from"./index-BwobEAja.js";import{c as F}from"./utils-CytzSlOG.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";const W=E("inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-primary bg-primary text-primary-foreground",secondary:"border-secondary bg-secondary text-secondary-foreground",destructive:"border-destructive bg-destructive text-destructive-foreground",outline:"border-primary bg-transparent text-primary","secondary-outline":"border-secondary bg-transparent text-secondary","destructive-outline":"border-destructive bg-transparent text-destructive"}},defaultVariants:{variant:"default"}});function a({className:V,variant:C,...R}){return e.jsx("div",{className:F(W({variant:C}),V),...R})}a.__docgenInfo={description:"",methods:[],displayName:"Badge",composes:["VariantProps"]};const Y={title:"Components/Badge",component:a,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","secondary","destructive","outline","secondary-outline","destructive-outline"]}}},r={args:{children:"Badge"}},n={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"secondary",children:"Secondary"}),e.jsx(a,{variant:"destructive",children:"Destructive"})]})},s={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"outline",children:"Outline"}),e.jsx(a,{variant:"secondary-outline",children:"Secondary"}),e.jsx(a,{variant:"destructive-outline",children:"Destructive"})]})},t={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm mb-2 text-muted-foreground",children:"Filled (color bg, black text):"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"secondary",children:"Secondary"}),e.jsx(a,{variant:"destructive",children:"Destructive"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm mb-2 text-muted-foreground",children:"Outline (transparent bg, color text):"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"outline",children:"Outline"}),e.jsx(a,{variant:"secondary-outline",children:"Secondary"}),e.jsx(a,{variant:"destructive-outline",children:"Destructive"})]})]})]})},i={render:()=>e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(a,{children:[e.jsx("span",{className:"mr-1",children:"+"}),"New"]}),e.jsxs(a,{variant:"outline",children:[e.jsx("span",{className:"mr-1",children:"●"}),"Active"]})]})},d={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm mb-2 text-muted-foreground",children:"Filled with theme colors:"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{children:"Green (Default)"}),e.jsx("div",{className:"theme-cyan",children:e.jsx(a,{children:"Cyan"})}),e.jsx("div",{className:"theme-yellow",children:e.jsx(a,{children:"Yellow"})}),e.jsx("div",{className:"theme-hotpink",children:e.jsx(a,{children:"Hot Pink"})}),e.jsx("div",{className:"theme-amber",children:e.jsx(a,{children:"Amber"})}),e.jsx("div",{className:"theme-white",children:e.jsx(a,{children:"White"})})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm mb-2 text-muted-foreground",children:"Outline with theme colors:"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"outline",children:"Green (Default)"}),e.jsx("div",{className:"theme-cyan",children:e.jsx(a,{variant:"outline",children:"Cyan"})}),e.jsx("div",{className:"theme-yellow",children:e.jsx(a,{variant:"outline",children:"Yellow"})}),e.jsx("div",{className:"theme-hotpink",children:e.jsx(a,{variant:"outline",children:"Hot Pink"})}),e.jsx("div",{className:"theme-amber",children:e.jsx(a,{variant:"outline",children:"Amber"})}),e.jsx("div",{className:"theme-white",children:e.jsx(a,{variant:"outline",children:"White"})})]})]})]})},l={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{children:"ACTIVE"}),e.jsx(a,{variant:"secondary",children:"PENDING"}),e.jsx(a,{variant:"destructive",children:"ERROR"}),e.jsx(a,{variant:"outline",children:"DRAFT"})]})};var c,o,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    children: 'Badge'
  }
}`,...(m=(o=r.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};var v,u,x;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
}`,...(x=(u=n.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var g,p,h;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary-outline">Secondary</Badge>
      <Badge variant="destructive-outline">Destructive</Badge>
    </div>
}`,...(h=(p=s.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var f,B,j;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Filled (color bg, black text):</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Outline (transparent bg, color text):</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Outline</Badge>
          <Badge variant="secondary-outline">Secondary</Badge>
          <Badge variant="destructive-outline">Destructive</Badge>
        </div>
      </div>
    </div>
}`,...(j=(B=t.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};var N,y,b;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="flex gap-2">
      <Badge>
        <span className="mr-1">+</span>
        New
      </Badge>
      <Badge variant="outline">
        <span className="mr-1">●</span>
        Active
      </Badge>
    </div>
}`,...(b=(y=i.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var w,D,S;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Filled with theme colors:</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Green (Default)</Badge>
          <div className="theme-cyan"><Badge>Cyan</Badge></div>
          <div className="theme-yellow"><Badge>Yellow</Badge></div>
          <div className="theme-hotpink"><Badge>Hot Pink</Badge></div>
          <div className="theme-amber"><Badge>Amber</Badge></div>
          <div className="theme-white"><Badge>White</Badge></div>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2 text-muted-foreground">Outline with theme colors:</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Green (Default)</Badge>
          <div className="theme-cyan"><Badge variant="outline">Cyan</Badge></div>
          <div className="theme-yellow"><Badge variant="outline">Yellow</Badge></div>
          <div className="theme-hotpink"><Badge variant="outline">Hot Pink</Badge></div>
          <div className="theme-amber"><Badge variant="outline">Amber</Badge></div>
          <div className="theme-white"><Badge variant="outline">White</Badge></div>
        </div>
      </div>
    </div>
}`,...(S=(D=d.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var O,A,k;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge>ACTIVE</Badge>
      <Badge variant="secondary">PENDING</Badge>
      <Badge variant="destructive">ERROR</Badge>
      <Badge variant="outline">DRAFT</Badge>
    </div>
}`,...(k=(A=l.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};const _=["Default","FilledVariants","OutlineVariants","AllVariants","WithIcon","WithThemeColors","StatusBadges"];export{t as AllVariants,r as Default,n as FilledVariants,s as OutlineVariants,l as StatusBadges,i as WithIcon,d as WithThemeColors,_ as __namedExportsOrder,Y as default};
