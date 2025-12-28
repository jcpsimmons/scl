import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{L as i}from"./label-CTuAsyWU.js";import{I as t}from"./input-BjhEAE-F.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CFX93qP1.js";import"./index-BiMR7eR1.js";import"./index-BFjtS4uE.js";import"./index-BwobEAja.js";import"./utils-CytzSlOG.js";const S={title:"Components/Label",component:i,tags:["autodocs"]},r={args:{children:"Label"}},a={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(i,{htmlFor:"email",children:"Email"}),e.jsx(t,{type:"email",id:"email",placeholder:"Email"})]})},s={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsxs(i,{htmlFor:"username",children:["Username ",e.jsx("span",{className:"text-destructive",children:"*"})]}),e.jsx(t,{id:"username",placeholder:"Enter username",required:!0})]})},l={render:()=>e.jsxs("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[e.jsx(i,{htmlFor:"disabled",className:"peer-disabled:cursor-not-allowed",children:"Disabled Label"}),e.jsx(t,{id:"disabled",placeholder:"Disabled input",disabled:!0,className:"peer"})]})};var d,m,n;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    children: 'Label'
  }
}`,...(n=(m=r.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};var o,c,p;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,b,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username">
        Username <span className="text-destructive">*</span>
      </Label>
      <Input id="username" placeholder="Enter username" required />
    </div>
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var x,g,w;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled" className="peer-disabled:cursor-not-allowed">
        Disabled Label
      </Label>
      <Input id="disabled" placeholder="Disabled input" disabled className="peer" />
    </div>
}`,...(w=(g=l.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};const R=["Default","WithInput","Required","Disabled"];export{r as Default,l as Disabled,s as Required,a as WithInput,R as __namedExportsOrder,S as default};
