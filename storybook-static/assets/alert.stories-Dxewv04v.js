import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as h}from"./index-B2-qRKKC.js";import{c as E}from"./index-BwobEAja.js";import{c as u}from"./utils-CytzSlOG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const H=E("relative w-full px-4 py-3 text-sm font-medium [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",{variants:{variant:{default:"bg-primary text-primary-foreground border-2 border-primary [&>svg]:text-primary-foreground",secondary:"bg-secondary text-secondary-foreground border-2 border-secondary [&>svg]:text-secondary-foreground",destructive:"bg-destructive text-destructive-foreground border-2 border-destructive [&>svg]:text-destructive-foreground"}},defaultVariants:{variant:"default"}}),r=h.forwardRef(({className:n,variant:i,...l},C)=>e.jsx("div",{ref:C,role:"alert",className:u(H({variant:i}),n),...l}));r.displayName="Alert";const t=h.forwardRef(({className:n,...i},l)=>e.jsx("h5",{ref:l,className:u("mb-1 font-medium leading-none tracking-tight",n),...i}));t.displayName="AlertTitle";const s=h.forwardRef(({className:n,...i},l)=>e.jsx("div",{ref:l,className:u("text-sm [&_p]:leading-relaxed",n),...i}));s.displayName="AlertDescription";r.__docgenInfo={description:"",methods:[],displayName:"Alert"};t.__docgenInfo={description:"",methods:[],displayName:"AlertTitle"};s.__docgenInfo={description:"",methods:[],displayName:"AlertDescription"};const q={title:"Components/Alert",component:r,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","secondary","destructive"]}}},o={render:()=>e.jsxs(r,{children:[e.jsx(t,{children:"Heads up!"}),e.jsx(s,{children:"You can add components to your app using the cli."})]})},a={render:()=>e.jsxs(r,{variant:"secondary",children:[e.jsx(t,{children:"Note"}),e.jsx(s,{children:"This action cannot be undone. Please proceed with caution."})]})},c={render:()=>e.jsxs(r,{variant:"destructive",children:[e.jsx(t,{children:"Error"}),e.jsx(s,{children:"Your session has expired. Please log in again."})]})},d={render:()=>e.jsx(r,{children:e.jsx(t,{children:"Note"})})},p={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(r,{children:[e.jsx(t,{children:"Default"}),e.jsx(s,{children:"This is the default alert style."})]}),e.jsxs(r,{variant:"secondary",children:[e.jsx(t,{children:"Secondary"}),e.jsx(s,{children:"This is the secondary alert style."})]}),e.jsxs(r,{variant:"destructive",children:[e.jsx(t,{children:"Destructive"}),e.jsx(s,{children:"This is the destructive alert style."})]})]})},m={render:()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(r,{className:"theme-cyan",children:[e.jsx(t,{children:"Cyan Theme"}),e.jsx(s,{children:"Using .theme-cyan class for cyan coloring."})]}),e.jsxs(r,{className:"theme-yellow",children:[e.jsx(t,{children:"Yellow Theme"}),e.jsx(s,{children:"Using .theme-yellow class for yellow coloring."})]}),e.jsxs(r,{className:"theme-hotpink",children:[e.jsx(t,{children:"Hot Pink Theme"}),e.jsx(s,{children:"Using .theme-hotpink class for pink coloring."})]})]})};var A,x,g;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
}`,...(g=(x=o.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var y,f,v;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Alert variant="secondary">
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
}`,...(v=(f=a.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var T,j,D;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
}`,...(D=(j=c.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var N,w,b;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Alert>
      <AlertTitle>Note</AlertTitle>
    </Alert>
}`,...(b=(w=d.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var S,k,_;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is the default alert style.</AlertDescription>
      </Alert>
      <Alert variant="secondary">
        <AlertTitle>Secondary</AlertTitle>
        <AlertDescription>This is the secondary alert style.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This is the destructive alert style.</AlertDescription>
      </Alert>
    </div>
}`,...(_=(k=p.parameters)==null?void 0:k.docs)==null?void 0:_.source}}};var P,U,Y;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <Alert className="theme-cyan">
        <AlertTitle>Cyan Theme</AlertTitle>
        <AlertDescription>Using .theme-cyan class for cyan coloring.</AlertDescription>
      </Alert>
      <Alert className="theme-yellow">
        <AlertTitle>Yellow Theme</AlertTitle>
        <AlertDescription>Using .theme-yellow class for yellow coloring.</AlertDescription>
      </Alert>
      <Alert className="theme-hotpink">
        <AlertTitle>Hot Pink Theme</AlertTitle>
        <AlertDescription>Using .theme-hotpink class for pink coloring.</AlertDescription>
      </Alert>
    </div>
}`,...(Y=(U=m.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};const z=["Default","Secondary","Destructive","WithoutDescription","AllVariants","WithThemeColors"];export{p as AllVariants,o as Default,c as Destructive,a as Secondary,m as WithThemeColors,d as WithoutDescription,z as __namedExportsOrder,q as default};
