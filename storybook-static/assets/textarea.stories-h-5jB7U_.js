import{j as t}from"./jsx-runtime-DF2Pcvd1.js";import{T as y}from"./textarea-KGR-D5lt.js";import{L as D}from"./label-CTuAsyWU.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./utils-CytzSlOG.js";import"./index-CFX93qP1.js";import"./index-BiMR7eR1.js";import"./index-BFjtS4uE.js";import"./index-BwobEAja.js";const Y={title:"Components/Textarea",component:y,tags:["autodocs"],argTypes:{disabled:{control:"boolean"},placeholder:{control:"text"},rows:{control:"number"}}},e={args:{placeholder:"Type your message here..."}},r={args:{defaultValue:"This is some default text in the textarea."}},a={render:()=>t.jsxs("div",{className:"grid w-full gap-1.5",children:[t.jsx(D,{htmlFor:"message",children:"Your message"}),t.jsx(y,{placeholder:"Type your message here.",id:"message"})]})},s={args:{placeholder:"Disabled textarea",disabled:!0}},o={args:{placeholder:"Textarea with 5 rows",rows:5}};var l,c,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    placeholder: 'Type your message here...'
  }
}`,...(m=(c=e.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var d,i,n;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    defaultValue: 'This is some default text in the textarea.'
  }
}`,...(n=(i=r.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var p,u,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
}`,...(g=(u=a.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,x,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled textarea',
    disabled: true
  }
}`,...(b=(x=s.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var T,f,w;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    placeholder: 'Textarea with 5 rows',
    rows: 5
  }
}`,...(w=(f=o.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};const _=["Default","WithValue","WithLabel","Disabled","WithRows"];export{e as Default,s as Disabled,a as WithLabel,o as WithRows,r as WithValue,_ as __namedExportsOrder,Y as default};
