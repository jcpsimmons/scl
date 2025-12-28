import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{R as d,r as V}from"./index-B2-qRKKC.js";import{c as ge}from"./index-Az_bokXk.js";import{c as xe}from"./index-DQ4YbFVl.js";import{u as Ie}from"./index-BFjtS4uE.js";import{u as H}from"./index-BlCrtW8-.js";import{P as ee}from"./index-Bnp5pWmS.js";import{c as oe,R as Ce,T as ve,b as be}from"./index-oJF_Y9RS.js";import{u as je}from"./index-CpxwHbl5.js";import{u as ye}from"./index-D6fdIYSQ.js";import{c as M}from"./utils-CytzSlOG.js";import{C as we}from"./chevron-down-poDemU_W.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D1vk04JX.js";import"./index-CFX93qP1.js";import"./index-PNzqWif7.js";import"./createLucideIcon-BdobGsw2.js";function Ne(o,r,{checkForDefaultPrevented:t=!0}={}){return function(i){if(o==null||o(i),t===!1||!i.defaultPrevented)return r==null?void 0:r(i)}}var l="Accordion",_e=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[E,Te,Re]=xe(l),[w]=ge(l,[Re,oe]),z=oe(),te=d.forwardRef((o,r)=>{const{type:t,...n}=o,i=n,c=n;return e.jsx(E.Provider,{scope:o.__scopeAccordion,children:t==="multiple"?e.jsx(Se,{...c,ref:r}):e.jsx(ke,{...i,ref:r})})});te.displayName=l;var[re,Pe]=w(l),[ne,Ye]=w(l,{collapsible:!1}),ke=d.forwardRef((o,r)=>{const{value:t,defaultValue:n,onValueChange:i=()=>{},collapsible:c=!1,...a}=o,[s,f]=H({prop:t,defaultProp:n??"",onChange:i,caller:l});return e.jsx(re,{scope:o.__scopeAccordion,value:d.useMemo(()=>s?[s]:[],[s]),onItemOpen:f,onItemClose:d.useCallback(()=>c&&f(""),[c,f]),children:e.jsx(ne,{scope:o.__scopeAccordion,collapsible:c,children:e.jsx(ce,{...a,ref:r})})})}),Se=d.forwardRef((o,r)=>{const{value:t,defaultValue:n,onValueChange:i=()=>{},...c}=o,[a,s]=H({prop:t,defaultProp:n??[],onChange:i,caller:l}),f=d.useCallback(x=>s((h=[])=>[...h,x]),[s]),g=d.useCallback(x=>s((h=[])=>h.filter(T=>T!==x)),[s]);return e.jsx(re,{scope:o.__scopeAccordion,value:a,onItemOpen:f,onItemClose:g,children:e.jsx(ne,{scope:o.__scopeAccordion,collapsible:!0,children:e.jsx(ce,{...c,ref:r})})})}),[De,N]=w(l),ce=d.forwardRef((o,r)=>{const{__scopeAccordion:t,disabled:n,dir:i,orientation:c="vertical",...a}=o,s=d.useRef(null),f=Ie(s,r),g=Te(t),h=ye(i)==="ltr",T=Ne(o.onKeyDown,I=>{var L;if(!_e.includes(I.key))return;const Ae=I.target,R=g().filter(D=>{var G;return!((G=D.ref.current)!=null&&G.disabled)}),C=R.findIndex(D=>D.ref.current===Ae),$=R.length;if(C===-1)return;I.preventDefault();let A=C;const P=0,Y=$-1,k=()=>{A=C+1,A>Y&&(A=P)},S=()=>{A=C-1,A<P&&(A=Y)};switch(I.key){case"Home":A=P;break;case"End":A=Y;break;case"ArrowRight":c==="horizontal"&&(h?k():S());break;case"ArrowDown":c==="vertical"&&k();break;case"ArrowLeft":c==="horizontal"&&(h?S():k());break;case"ArrowUp":c==="vertical"&&S();break}const he=A%$;(L=R[he].ref.current)==null||L.focus()});return e.jsx(De,{scope:t,disabled:n,direction:i,orientation:c,children:e.jsx(E.Slot,{scope:t,children:e.jsx(ee.div,{...a,"data-orientation":c,ref:f,onKeyDown:n?void 0:T})})})}),y="AccordionItem",[Oe,K]=w(y),ie=d.forwardRef((o,r)=>{const{__scopeAccordion:t,value:n,...i}=o,c=N(y,t),a=Pe(y,t),s=z(t),f=je(),g=n&&a.value.includes(n)||!1,x=c.disabled||o.disabled;return e.jsx(Oe,{scope:t,open:g,disabled:x,triggerId:f,children:e.jsx(Ce,{"data-orientation":c.orientation,"data-state":ue(g),...s,...i,ref:r,disabled:x,open:g,onOpenChange:h=>{h?a.onItemOpen(n):a.onItemClose(n)}})})});ie.displayName=y;var se="AccordionHeader",ae=d.forwardRef((o,r)=>{const{__scopeAccordion:t,...n}=o,i=N(l,t),c=K(se,t);return e.jsx(ee.h3,{"data-orientation":i.orientation,"data-state":ue(c.open),"data-disabled":c.disabled?"":void 0,...n,ref:r})});ae.displayName=se;var O="AccordionTrigger",de=d.forwardRef((o,r)=>{const{__scopeAccordion:t,...n}=o,i=N(l,t),c=K(O,t),a=Ye(O,t),s=z(t);return e.jsx(E.ItemSlot,{scope:t,children:e.jsx(ve,{"aria-disabled":c.open&&!a.collapsible||void 0,"data-orientation":i.orientation,id:c.triggerId,...s,...n,ref:r})})});de.displayName=O;var le="AccordionContent",me=d.forwardRef((o,r)=>{const{__scopeAccordion:t,...n}=o,i=N(l,t),c=K(le,t),a=z(t);return e.jsx(be,{role:"region","aria-labelledby":c.triggerId,"data-orientation":i.orientation,...a,...n,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...o.style}})});me.displayName=le;function ue(o){return o?"open":"closed"}var Ve=te,Me=ie,Ee=ae,pe=de,fe=me;const _=Ve,m=V.forwardRef(({className:o,...r},t)=>e.jsx(Me,{ref:t,className:M("border-b-2 w-full",o),...r}));m.displayName="AccordionItem";const u=V.forwardRef(({className:o,children:r,...t},n)=>e.jsx(Ee,{className:"flex",children:e.jsxs(pe,{ref:n,className:M("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",o),...t,children:[r,e.jsx(we,{className:"h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"})]})}));u.displayName=pe.displayName;const p=V.forwardRef(({className:o,children:r,...t},n)=>e.jsx(fe,{ref:n,className:"overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",...t,children:e.jsx("div",{className:M("pb-4 pt-0",o),children:r})}));p.displayName=fe.displayName;m.__docgenInfo={description:"",methods:[],displayName:"AccordionItem"};u.__docgenInfo={description:"",methods:[]};p.__docgenInfo={description:"",methods:[]};const to={title:"Components/Accordion",component:_,tags:["autodocs"]},v={render:()=>e.jsxs(_,{type:"single",collapsible:!0,className:"w-full",children:[e.jsxs(m,{value:"item-1",children:[e.jsx(u,{children:"Is it accessible?"}),e.jsx(p,{children:"Yes. It adheres to the WAI-ARIA design pattern."})]}),e.jsxs(m,{value:"item-2",children:[e.jsx(u,{children:"Is it styled?"}),e.jsx(p,{children:"Yes. It comes with default styles that matches the other components' aesthetic."})]}),e.jsxs(m,{value:"item-3",children:[e.jsx(u,{children:"Is it animated?"}),e.jsx(p,{children:"Yes. It's animated by default, but you can disable it if you prefer."})]})]})},b={render:()=>e.jsxs(_,{type:"multiple",className:"w-full",children:[e.jsxs(m,{value:"item-1",children:[e.jsx(u,{children:"Can I open multiple items?"}),e.jsx(p,{children:'Yes. Just set the type prop to "multiple".'})]}),e.jsxs(m,{value:"item-2",children:[e.jsx(u,{children:"Is it keyboard navigable?"}),e.jsx(p,{children:"Yes. You can use arrow keys to navigate between items."})]}),e.jsxs(m,{value:"item-3",children:[e.jsx(u,{children:"Can I customize the styling?"}),e.jsx(p,{children:"Yes. You can use className to add custom styles."})]})]})},j={render:()=>e.jsxs(_,{type:"single",defaultValue:"item-1",className:"w-full",children:[e.jsxs(m,{value:"item-1",children:[e.jsx(u,{children:"This item is open by default"}),e.jsx(p,{children:"You can set defaultValue to have an item open by default."})]}),e.jsxs(m,{value:"item-2",children:[e.jsx(u,{children:"This item starts closed"}),e.jsx(p,{children:"Click to open this item."})]})]})};var J,U,W;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(W=(U=v.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var q,B,F;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes. Just set the type prop to "multiple".
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it keyboard navigable?</AccordionTrigger>
        <AccordionContent>
          Yes. You can use arrow keys to navigate between items.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
        <AccordionContent>
          Yes. You can use className to add custom styles.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(F=(B=b.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var Q,X,Z;j.parameters={...j.parameters,docs:{...(Q=j.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <Accordion type="single" defaultValue="item-1" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>This item is open by default</AccordionTrigger>
        <AccordionContent>
          You can set defaultValue to have an item open by default.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>This item starts closed</AccordionTrigger>
        <AccordionContent>
          Click to open this item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...(Z=(X=j.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};const ro=["Default","Multiple","DefaultOpen"];export{v as Default,j as DefaultOpen,b as Multiple,ro as __namedExportsOrder,to as default};
