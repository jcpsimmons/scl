import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{D as o,a as p,b as u,c as D,d as h,e as x,f as j}from"./dialog-Ae8CMhgq.js";import{B as a}from"./button-ikufiaba.js";import{L as t}from"./label-CTuAsyWU.js";import{I as s}from"./input-BjhEAE-F.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-DARpDpS_.js";import"./index-BFjtS4uE.js";import"./index-Az_bokXk.js";import"./index-CpxwHbl5.js";import"./index-D1vk04JX.js";import"./index-BlCrtW8-.js";import"./index-C4CqnMZA.js";import"./index-Bnp5pWmS.js";import"./index-CFX93qP1.js";import"./index-ciuW_uyV.js";import"./index-92ATyY1D.js";import"./index-PNzqWif7.js";import"./utils-CytzSlOG.js";import"./x-BxBO2z9T.js";import"./createLucideIcon-BdobGsw2.js";import"./index-BiMR7eR1.js";import"./index-BwobEAja.js";const q={title:"Components/Dialog",component:o,tags:["autodocs"]},r={render:()=>e.jsxs(o,{children:[e.jsx(p,{asChild:!0,children:e.jsx(a,{variant:"outline",children:"Open Dialog"})}),e.jsxs(u,{className:"sm:max-w-[425px]",children:[e.jsxs(D,{children:[e.jsx(h,{children:"Edit profile"}),e.jsx(x,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(t,{htmlFor:"name",className:"text-right",children:"Name"}),e.jsx(s,{id:"name",defaultValue:"Pedro Duarte",className:"col-span-3"})]}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(t,{htmlFor:"username",className:"text-right",children:"Username"}),e.jsx(s,{id:"username",defaultValue:"@peduarte",className:"col-span-3"})]})]}),e.jsx(j,{children:e.jsx(a,{type:"submit",children:"Save changes"})})]})]})},i={render:()=>e.jsxs(o,{children:[e.jsx(p,{asChild:!0,children:e.jsx(a,{children:"Open"})}),e.jsxs(u,{children:[e.jsxs(D,{children:[e.jsx(h,{children:"Are you absolutely sure?"}),e.jsx(x,{children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."})]}),e.jsxs(j,{children:[e.jsx(a,{variant:"outline",children:"Cancel"}),e.jsx(a,{variant:"destructive",children:"Delete"})]})]})]})};var n,l,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,m,g;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(g=(m=i.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};const z=["Default","Simple"];export{r as Default,i as Simple,z as __namedExportsOrder,q as default};
