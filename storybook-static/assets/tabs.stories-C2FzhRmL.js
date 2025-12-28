import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as l}from"./index-B2-qRKKC.js";import{c as ae}from"./index-Az_bokXk.js";import{c as E,R as se,I as te}from"./index-aeh8JKNw.js";import{P as re}from"./index-PNzqWif7.js";import{P as C}from"./index-Bnp5pWmS.js";import{u as oe}from"./index-D6fdIYSQ.js";import{u as ne}from"./index-BlCrtW8-.js";import{u as ie}from"./index-CpxwHbl5.js";import{c as N}from"./utils-CytzSlOG.js";import{C as _,a as L,b as P,c as A,d as S,e as R}from"./card-BR-Iulj_.js";import{L as T}from"./label-CTuAsyWU.js";import{I as g}from"./input-BjhEAE-F.js";import{B as D}from"./button-ikufiaba.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-DQ4YbFVl.js";import"./index-BFjtS4uE.js";import"./index-ciuW_uyV.js";import"./index-D1vk04JX.js";import"./index-CFX93qP1.js";import"./index-BiMR7eR1.js";import"./index-BwobEAja.js";function w(a,s,{checkForDefaultPrevented:t=!0}={}){return function(o){if(a==null||a(o),t===!1||!o.defaultPrevented)return s==null?void 0:s(o)}}var j="Tabs",[ce]=ae(j,[E]),K=E(),[de,I]=ce(j),O=l.forwardRef((a,s)=>{const{__scopeTabs:t,value:r,onValueChange:o,defaultValue:d,orientation:n="horizontal",dir:u,activationMode:f="automatic",...v}=a,c=oe(u),[i,b]=ne({prop:r,onChange:o,defaultProp:d??"",caller:j});return e.jsx(de,{scope:t,baseId:ie(),value:i,onValueChange:b,orientation:n,dir:c,activationMode:f,children:e.jsx(C.div,{dir:c,"data-orientation":n,...v,ref:s})})});O.displayName=j;var U="TabsList",q=l.forwardRef((a,s)=>{const{__scopeTabs:t,loop:r=!0,...o}=a,d=I(U,t),n=K(t);return e.jsx(se,{asChild:!0,...n,orientation:d.orientation,dir:d.dir,loop:r,children:e.jsx(C.div,{role:"tablist","aria-orientation":d.orientation,...o,ref:s})})});q.displayName=U;var z="TabsTrigger",J=l.forwardRef((a,s)=>{const{__scopeTabs:t,value:r,disabled:o=!1,...d}=a,n=I(z,t),u=K(t),f=X(n.baseId,r),v=Y(n.baseId,r),c=r===n.value;return e.jsx(te,{asChild:!0,...u,focusable:!o,active:c,children:e.jsx(C.button,{type:"button",role:"tab","aria-selected":c,"aria-controls":v,"data-state":c?"active":"inactive","data-disabled":o?"":void 0,disabled:o,id:f,...d,ref:s,onMouseDown:w(a.onMouseDown,i=>{!o&&i.button===0&&i.ctrlKey===!1?n.onValueChange(r):i.preventDefault()}),onKeyDown:w(a.onKeyDown,i=>{[" ","Enter"].includes(i.key)&&n.onValueChange(r)}),onFocus:w(a.onFocus,()=>{const i=n.activationMode!=="manual";!c&&!o&&i&&n.onValueChange(r)})})})});J.displayName=z;var Q="TabsContent",W=l.forwardRef((a,s)=>{const{__scopeTabs:t,value:r,forceMount:o,children:d,...n}=a,u=I(Q,t),f=X(u.baseId,r),v=Y(u.baseId,r),c=r===u.value,i=l.useRef(c);return l.useEffect(()=>{const b=requestAnimationFrame(()=>i.current=!1);return()=>cancelAnimationFrame(b)},[]),e.jsx(re,{present:o||c,children:({present:b})=>e.jsx(C.div,{"data-state":c?"active":"inactive","data-orientation":u.orientation,role:"tabpanel","aria-labelledby":f,hidden:!b,id:v,tabIndex:0,...n,ref:s,style:{...a.style,animationDuration:i.current?"0s":void 0},children:b&&d})})});W.displayName=Q;function X(a,s){return`${a}-trigger-${s}`}function Y(a,s){return`${a}-content-${s}`}var le=O,Z=q,H=J,ee=W;const F=le,y=l.forwardRef(({className:a,...s},t)=>e.jsx(Z,{ref:t,className:N("inline-flex h-9 items-center justify-center bg-muted p-1 text-muted-foreground",a),...s}));y.displayName=Z.displayName;const p=l.forwardRef(({className:a,...s},t)=>e.jsx(H,{ref:t,className:N("inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-2 data-[state=active]:border-primary data-[state=inactive]:border-2 data-[state=inactive]:border-transparent data-[state=inactive]:text-muted-foreground",a),...s}));p.displayName=H.displayName;const m=l.forwardRef(({className:a,...s},t)=>e.jsx(ee,{ref:t,className:N("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",a),...s}));m.displayName=ee.displayName;y.__docgenInfo={description:"",methods:[]};p.__docgenInfo={description:"",methods:[]};m.__docgenInfo={description:"",methods:[]};const Re={title:"Components/Tabs",component:F,tags:["autodocs"]},h={render:()=>e.jsxs(F,{defaultValue:"account",className:"w-[400px]",children:[e.jsxs(y,{children:[e.jsx(p,{value:"account",children:"Account"}),e.jsx(p,{value:"password",children:"Password"})]}),e.jsx(m,{value:"account",children:e.jsxs(_,{children:[e.jsxs(L,{children:[e.jsx(P,{children:"Account"}),e.jsx(A,{children:"Make changes to your account here. Click save when you're done."})]}),e.jsxs(S,{className:"space-y-2",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx(T,{htmlFor:"name",children:"Name"}),e.jsx(g,{id:"name",defaultValue:"Pedro Duarte"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(T,{htmlFor:"username",children:"Username"}),e.jsx(g,{id:"username",defaultValue:"@peduarte"})]})]}),e.jsx(R,{children:e.jsx(D,{children:"Save changes"})})]})}),e.jsx(m,{value:"password",children:e.jsxs(_,{children:[e.jsxs(L,{children:[e.jsx(P,{children:"Password"}),e.jsx(A,{children:"Change your password here. After saving, you'll be logged out."})]}),e.jsxs(S,{className:"space-y-2",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx(T,{htmlFor:"current",children:"Current password"}),e.jsx(g,{id:"current",type:"password"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(T,{htmlFor:"new",children:"New password"}),e.jsx(g,{id:"new",type:"password"})]})]}),e.jsx(R,{children:e.jsx(D,{children:"Save password"})})]})})]})},x={render:()=>e.jsxs(F,{defaultValue:"tab1",className:"w-[400px]",children:[e.jsxs(y,{className:"grid w-full grid-cols-3",children:[e.jsx(p,{value:"tab1",children:"Tab 1"}),e.jsx(p,{value:"tab2",children:"Tab 2"}),e.jsx(p,{value:"tab3",children:"Tab 3"})]}),e.jsx(m,{value:"tab1",className:"p-4",children:e.jsx("p",{children:"Content for Tab 1"})}),e.jsx(m,{value:"tab2",className:"p-4",children:e.jsx("p",{children:"Content for Tab 2"})}),e.jsx(m,{value:"tab3",className:"p-4",children:e.jsx("p",{children:"Content for Tab 3"})})]})};var V,M,k;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
}`,...(k=(M=h.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var B,$,G;x.parameters={...x.parameters,docs:{...(B=x.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        <p>Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        <p>Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        <p>Content for Tab 3</p>
      </TabsContent>
    </Tabs>
}`,...(G=($=x.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};const De=["Default","Simple"];export{h as Default,x as Simple,De as __namedExportsOrder,Re as default};
