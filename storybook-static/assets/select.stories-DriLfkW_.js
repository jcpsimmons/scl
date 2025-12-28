import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{S as l,a as s,b as o,c as i,d as t,e as p,f as m}from"./select-9Me9pxFM.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CFX93qP1.js";import"./index-BdQq_4o_.js";import"./index-DQ4YbFVl.js";import"./index-Az_bokXk.js";import"./index-BFjtS4uE.js";import"./index-D6fdIYSQ.js";import"./index-C4CqnMZA.js";import"./index-Bnp5pWmS.js";import"./index-ciuW_uyV.js";import"./index-D1vk04JX.js";import"./index-92ATyY1D.js";import"./index-CpxwHbl5.js";import"./index-CjUHPVAg.js";import"./index-BYfY0yFj.js";import"./index-BlCrtW8-.js";import"./index-_AbP6Uzr.js";import"./index-D3lMg7_L.js";import"./utils-CytzSlOG.js";import"./chevron-down-poDemU_W.js";import"./createLucideIcon-BdobGsw2.js";import"./check-N6y005oe.js";const U={title:"Components/Select",component:l,tags:["autodocs"]},a={render:()=>e.jsxs(l,{children:[e.jsx(s,{className:"w-[180px]",children:e.jsx(o,{placeholder:"Select a fruit"})}),e.jsxs(i,{children:[e.jsx(t,{value:"apple",children:"Apple"}),e.jsx(t,{value:"banana",children:"Banana"}),e.jsx(t,{value:"orange",children:"Orange"}),e.jsx(t,{value:"grape",children:"Grape"})]})]})},r={render:()=>e.jsxs(l,{children:[e.jsx(s,{className:"w-[180px]",children:e.jsx(o,{placeholder:"Select a timezone"})}),e.jsxs(i,{children:[e.jsxs(p,{children:[e.jsx(m,{children:"North America"}),e.jsx(t,{value:"est",children:"Eastern (EST)"}),e.jsx(t,{value:"cst",children:"Central (CST)"}),e.jsx(t,{value:"mst",children:"Mountain (MST)"}),e.jsx(t,{value:"pst",children:"Pacific (PST)"})]}),e.jsxs(p,{children:[e.jsx(m,{children:"Europe"}),e.jsx(t,{value:"gmt",children:"GMT"}),e.jsx(t,{value:"cet",children:"Central European (CET)"}),e.jsx(t,{value:"eet",children:"Eastern European (EET)"})]})]})]})},n={render:()=>e.jsxs(l,{disabled:!0,children:[e.jsx(s,{className:"w-[180px]",children:e.jsx(o,{placeholder:"Disabled"})}),e.jsx(i,{children:e.jsx(t,{value:"1",children:"Option 1"})})]})},c={render:()=>e.jsxs(l,{defaultValue:"banana",children:[e.jsx(s,{className:"w-[180px]",children:e.jsx(o,{})}),e.jsxs(i,{children:[e.jsx(t,{value:"apple",children:"Apple"}),e.jsx(t,{value:"banana",children:"Banana"}),e.jsx(t,{value:"orange",children:"Orange"})]})]})};var S,u,d;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
}`,...(d=(u=a.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var x,h,j;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern (EST)</SelectItem>
          <SelectItem value="cst">Central (CST)</SelectItem>
          <SelectItem value="mst">Mountain (MST)</SelectItem>
          <SelectItem value="pst">Pacific (PST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">GMT</SelectItem>
          <SelectItem value="cet">Central European (CET)</SelectItem>
          <SelectItem value="eet">Eastern European (EET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
}`,...(j=(h=r.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var g,I,v;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
      </SelectContent>
    </Select>
}`,...(v=(I=n.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var T,E,b;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <Select defaultValue="banana">
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
}`,...(b=(E=c.parameters)==null?void 0:E.docs)==null?void 0:b.source}}};const X=["Default","WithGroups","Disabled","WithDefaultValue"];export{a as Default,n as Disabled,c as WithDefaultValue,r as WithGroups,X as __namedExportsOrder,U as default};
