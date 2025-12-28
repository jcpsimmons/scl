import{j as c}from"./jsx-runtime-DF2Pcvd1.js";import{I as V}from"./input-BjhEAE-F.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./utils-CytzSlOG.js";const C={title:"Components/Input",component:V,tags:["autodocs"],argTypes:{type:{control:"select",options:["text","email","password","number","search","tel","url"]},disabled:{control:"boolean"},placeholder:{control:"text"}}},e={args:{placeholder:"Enter text..."}},a={args:{defaultValue:"Hello World"}},r={args:{type:"email",placeholder:"email@example.com"}},s={args:{type:"password",placeholder:"Enter password"}},o={args:{placeholder:"Disabled input",disabled:!0}},t={render:()=>c.jsxs("div",{className:"space-y-2",children:[c.jsx("label",{htmlFor:"email",className:"text-sm font-medium",children:"Email"}),c.jsx(V,{id:"email",type:"email",placeholder:"email@example.com"})]})},l={args:{type:"file"}};var m,n,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};var d,i,u;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    defaultValue: 'Hello World'
  }
}`,...(u=(i=a.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var g,h,x;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    type: 'email',
    placeholder: 'email@example.com'
  }
}`,...(x=(h=r.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var b,y,f;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    type: 'password',
    placeholder: 'Enter password'
  }
}`,...(f=(y=s.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var E,w,S;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled input',
    disabled: true
  }
}`,...(S=(w=o.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var D,W,j;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
}`,...(j=(W=t.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};var F,I,N;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    type: 'file'
  }
}`,...(N=(I=l.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};const O=["Default","WithValue","Email","Password","Disabled","WithLabel","File"];export{e as Default,o as Disabled,r as Email,l as File,s as Password,t as WithLabel,a as WithValue,O as __namedExportsOrder,C as default};
