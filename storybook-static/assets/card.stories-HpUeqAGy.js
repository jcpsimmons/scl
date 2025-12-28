import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{C as t,a as s,b as o,c as f,d,e as N}from"./card-BR-Iulj_.js";import{L as D}from"./label-CTuAsyWU.js";import{I as g}from"./input-BjhEAE-F.js";import{B as i}from"./button-ikufiaba.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./utils-CytzSlOG.js";import"./index-CFX93qP1.js";import"./index-BiMR7eR1.js";import"./index-BFjtS4uE.js";import"./index-BwobEAja.js";const E={title:"Components/Card",component:t,tags:["autodocs"]},r={render:()=>e.jsxs(t,{className:"w-[350px]",children:[e.jsxs(s,{children:[e.jsx(o,{children:"Card Title"}),e.jsx(f,{children:"Card Description"})]}),e.jsx(d,{children:e.jsx("p",{children:"Card Content"})}),e.jsx(N,{children:e.jsx("p",{children:"Card Footer"})})]})},a={render:()=>e.jsxs(t,{className:"w-[350px]",children:[e.jsxs(s,{children:[e.jsx(o,{children:"Create project"}),e.jsx(f,{children:"Deploy your new project in one-click."})]}),e.jsx(d,{children:e.jsx("form",{children:e.jsx("div",{className:"grid w-full items-center gap-4",children:e.jsxs("div",{className:"flex flex-col space-y-1.5",children:[e.jsx(D,{htmlFor:"name",children:"Name"}),e.jsx(g,{id:"name",placeholder:"Name of your project"})]})})})}),e.jsxs(N,{className:"flex justify-between",children:[e.jsx(i,{variant:"outline",children:"Cancel"}),e.jsx(i,{children:"Deploy"})]})]})},n={render:()=>e.jsxs(t,{className:"w-[350px]",children:[e.jsx(s,{children:e.jsx(o,{children:"Notifications"})}),e.jsx(d,{children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"You have 3 unread messages."})})]})};var c,l,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,C,x;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
}`,...(x=(C=a.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var u,j,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          You have 3 unread messages.
        </p>
      </CardContent>
    </Card>
}`,...(h=(j=n.parameters)==null?void 0:j.docs)==null?void 0:h.source}}};const W=["Default","WithForm","Simple"];export{r as Default,n as Simple,a as WithForm,W as __namedExportsOrder,E as default};
