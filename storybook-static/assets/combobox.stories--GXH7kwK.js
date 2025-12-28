import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r}from"./index-B2-qRKKC.js";import{c as N}from"./utils-CytzSlOG.js";import{C as oe,a as ne,b as ce,c as ie,d as ue,e as me}from"./command-DOSKnr-M.js";import{P as pe,a as de,b as xe}from"./popover-BAnCF5sK.js";import{B as he}from"./button-ikufiaba.js";import{c as ge}from"./createLucideIcon-BdobGsw2.js";import{C as fe}from"./check-N6y005oe.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-DARpDpS_.js";import"./index-BFjtS4uE.js";import"./index-Az_bokXk.js";import"./index-CpxwHbl5.js";import"./index-D1vk04JX.js";import"./index-BlCrtW8-.js";import"./index-C4CqnMZA.js";import"./index-Bnp5pWmS.js";import"./index-CFX93qP1.js";import"./index-ciuW_uyV.js";import"./index-92ATyY1D.js";import"./index-PNzqWif7.js";import"./dialog-Ae8CMhgq.js";import"./x-BxBO2z9T.js";import"./index-CjUHPVAg.js";import"./index-BYfY0yFj.js";import"./index-BiMR7eR1.js";import"./index-BwobEAja.js";/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=ge("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]),n=r.forwardRef(({options:l,value:a,onValueChange:s,placeholder:c="Select option...",searchPlaceholder:V="Search...",emptyText:P="No option found.",className:k,disabled:M=!1},m)=>{const[p,i]=r.useState(!1),d=l.find(o=>o.value===a);return e.jsxs(pe,{open:p,onOpenChange:i,children:[e.jsx(de,{asChild:!0,children:e.jsxs(he,{ref:m,variant:"outline",role:"combobox","aria-expanded":p,className:N("w-[200px] justify-between",k),disabled:M,children:[e.jsx("span",{className:"truncate",children:d?d.label:c}),e.jsx(ve,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(xe,{className:"w-[200px] p-0",children:e.jsxs(oe,{children:[e.jsx(ne,{placeholder:V}),e.jsxs(ce,{children:[e.jsx(ie,{children:P}),e.jsx(ue,{children:l.map(o=>e.jsxs(me,{value:o.value,onSelect:x=>{s==null||s(x===a?"":x),i(!1)},disabled:o.disabled,children:[e.jsx(fe,{className:N("mr-2 h-4 w-4",a===o.value?"opacity-100":"opacity-0")}),o.label]},o.value))})]})]})})]})});n.displayName="Combobox";const u=r.forwardRef(({options:l,value:a=[],onValueChange:s,placeholder:c="Select options...",searchPlaceholder:V="Search...",emptyText:P="No option found.",className:k,disabled:M=!1,maxSelected:m},p)=>{const[i,d]=r.useState(!1),o=a.map(t=>{var h;return(h=l.find(T=>T.value===t))==null?void 0:h.label}).filter(Boolean).join(", "),x=t=>{const h=a.includes(t)?a.filter(T=>T!==t):m&&a.length>=m?a:[...a,t];s==null||s(h)};return e.jsxs(pe,{open:i,onOpenChange:d,children:[e.jsx(de,{asChild:!0,children:e.jsxs(he,{ref:p,variant:"outline",role:"combobox","aria-expanded":i,className:N("w-[200px] justify-between",k),disabled:M,children:[e.jsx("span",{className:"truncate",children:o||c}),e.jsx(ve,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})}),e.jsx(xe,{className:"w-[200px] p-0",children:e.jsxs(oe,{children:[e.jsx(ne,{placeholder:V}),e.jsxs(ce,{children:[e.jsx(ie,{children:P}),e.jsx(ue,{children:l.map(t=>e.jsxs(me,{value:t.value,onSelect:()=>x(t.value),disabled:t.disabled,children:[e.jsx(fe,{className:N("mr-2 h-4 w-4",a.includes(t.value)?"opacity-100":"opacity-0")}),t.label]},t.value))})]})]})})]})});u.displayName="ComboboxMulti";n.__docgenInfo={description:"",methods:[],displayName:"Combobox",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"ComboboxOption"}],raw:"ComboboxOption[]"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select option...'",computed:!1}},searchPlaceholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Search...'",computed:!1}},emptyText:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'No option found.'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};u.__docgenInfo={description:"",methods:[],displayName:"ComboboxMulti",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"ComboboxOption"}],raw:"ComboboxOption[]"},description:""},value:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"[]",computed:!1}},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"value"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select options...'",computed:!1}},searchPlaceholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Search...'",computed:!1}},emptyText:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'No option found.'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},maxSelected:{required:!1,tsType:{name:"number"},description:""}}};const Ye={title:"Components/Combobox",component:n,parameters:{layout:"centered"},tags:["autodocs"]},E=[{value:"next",label:"Next.js"},{value:"sveltekit",label:"SvelteKit"},{value:"nuxt",label:"Nuxt.js"},{value:"remix",label:"Remix"},{value:"astro",label:"Astro"}],q=[{value:"telescope",label:"Telescope"},{value:"treesitter",label:"Treesitter"},{value:"lspconfig",label:"LSP Config"},{value:"cmp",label:"nvim-cmp"},{value:"mason",label:"Mason"},{value:"lazy",label:"lazy.nvim"}],be=[{value:"green",label:"Terminal Green"},{value:"cyan",label:"Cyan"},{value:"hotpink",label:"Hot Pink"},{value:"yellow",label:"Yellow"},{value:"amber",label:"Amber"},{value:"white",label:"White"},{value:"blue",label:"Blue"}],f={render:function(){const[a,s]=r.useState("");return e.jsx(n,{options:E,value:a,onValueChange:s,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."})}},v={render:function(){const[a,s]=r.useState("next");return e.jsx(n,{options:E,value:a,onValueChange:s,placeholder:"Select framework..."})}},b={render:function(){const[a,s]=r.useState("");return e.jsx(n,{options:q,value:a,onValueChange:s,placeholder:":PlugInstall",searchPlaceholder:"Search plugins...",className:"w-[250px]"})}},g={render:function(){const[a,s]=r.useState("green");return e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsx(n,{options:be,value:a,onValueChange:s,placeholder:":colorscheme",searchPlaceholder:"Search colors...",className:"w-[200px]"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Selected: ",e.jsx("span",{className:"text-primary",children:a||"none"})]})]})}},S={args:{options:E,placeholder:"Select framework...",disabled:!0}},C={render:function(){const[a,s]=r.useState(""),c=[{value:"next",label:"Next.js"},{value:"sveltekit",label:"SvelteKit",disabled:!0},{value:"nuxt",label:"Nuxt.js"},{value:"remix",label:"Remix",disabled:!0},{value:"astro",label:"Astro"}];return e.jsx(n,{options:c,value:a,onValueChange:s,placeholder:"Select framework..."})}},j={render:function(){const[a,s]=r.useState([]);return e.jsx(u,{options:q,value:a,onValueChange:s,placeholder:"Select plugins...",searchPlaceholder:"Search plugins...",className:"w-[250px]"})}},y={render:function(){const[a,s]=r.useState(["telescope","treesitter","lspconfig"]);return e.jsx(u,{options:q,value:a,onValueChange:s,placeholder:"Select plugins...",className:"w-[300px]"})}},w={render:function(){const[a,s]=r.useState([]);return e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsx(u,{options:be,value:a,onValueChange:s,placeholder:"Select up to 3 colors...",maxSelected:3,className:"w-[250px]"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Selected ",a.length,"/3 colors"]})]})}};var O,R,D;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function ControlledExample() {
    const [value, setValue] = React.useState('');
    return <Combobox options={frameworks} value={value} onValueChange={setValue} placeholder="Select framework..." searchPlaceholder="Search frameworks..." />;
  }
}`,...(D=(R=f.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var W,A,I;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: function PreselectedExample() {
    const [value, setValue] = React.useState('next');
    return <Combobox options={frameworks} value={value} onValueChange={setValue} placeholder="Select framework..." />;
  }
}`,...(I=(A=v.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var _,B,L;b.parameters={...b.parameters,docs:{...(_=b.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: function VimExample() {
    const [value, setValue] = React.useState('');
    return <Combobox options={vimPlugins} value={value} onValueChange={setValue} placeholder=":PlugInstall" searchPlaceholder="Search plugins..." className="w-[250px]" />;
  }
}`,...(L=(B=b.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var K,z,G;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: function ColorschemeExample() {
    const [value, setValue] = React.useState('green');
    return <div className="flex flex-col gap-4 items-center">
        <Combobox options={colorschemes} value={value} onValueChange={setValue} placeholder=":colorscheme" searchPlaceholder="Search colors..." className="w-[200px]" />
        <p className="text-sm text-muted-foreground">
          Selected: <span className="text-primary">{value || 'none'}</span>
        </p>
      </div>;
  }
}`,...(G=(z=g.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var U,H,Y;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    disabled: true
  }
}`,...(Y=(H=S.parameters)==null?void 0:H.docs)==null?void 0:Y.source}}};var F,J,Q;C.parameters={...C.parameters,docs:{...(F=C.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function DisabledOptionsExample() {
    const [value, setValue] = React.useState('');
    const optionsWithDisabled = [{
      value: 'next',
      label: 'Next.js'
    }, {
      value: 'sveltekit',
      label: 'SvelteKit',
      disabled: true
    }, {
      value: 'nuxt',
      label: 'Nuxt.js'
    }, {
      value: 'remix',
      label: 'Remix',
      disabled: true
    }, {
      value: 'astro',
      label: 'Astro'
    }];
    return <Combobox options={optionsWithDisabled} value={value} onValueChange={setValue} placeholder="Select framework..." />;
  }
}`,...(Q=(J=C.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Z,$;j.parameters={...j.parameters,docs:{...(X=j.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: function MultiExample() {
    const [value, setValue] = React.useState<string[]>([]);
    return <ComboboxMulti options={vimPlugins} value={value} onValueChange={setValue} placeholder="Select plugins..." searchPlaceholder="Search plugins..." className="w-[250px]" />;
  }
}`,...($=(Z=j.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ae,se;y.parameters={...y.parameters,docs:{...(ee=y.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: function MultiPreselectedExample() {
    const [value, setValue] = React.useState(['telescope', 'treesitter', 'lspconfig']);
    return <ComboboxMulti options={vimPlugins} value={value} onValueChange={setValue} placeholder="Select plugins..." className="w-[300px]" />;
  }
}`,...(se=(ae=y.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var le,te,re;w.parameters={...w.parameters,docs:{...(le=w.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: function MultiMaxExample() {
    const [value, setValue] = React.useState<string[]>([]);
    return <div className="flex flex-col gap-4 items-center">
        <ComboboxMulti options={colorschemes} value={value} onValueChange={setValue} placeholder="Select up to 3 colors..." maxSelected={3} className="w-[250px]" />
        <p className="text-sm text-muted-foreground">
          Selected {value.length}/3 colors
        </p>
      </div>;
  }
}`,...(re=(te=w.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};const Fe=["Default","WithPreselection","VimPluginSelector","ColorschemeSelector","Disabled","WithDisabledOptions","MultiSelect","MultiSelectWithPreselection","MultiSelectWithMax"];export{g as ColorschemeSelector,f as Default,S as Disabled,j as MultiSelect,w as MultiSelectWithMax,y as MultiSelectWithPreselection,b as VimPluginSelector,C as WithDisabledOptions,v as WithPreselection,Fe as __namedExportsOrder,Ye as default};
