import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as d}from"./index-B2-qRKKC.js";import{c as r}from"./utils-CytzSlOG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const i=d.forwardRef(({className:a,...l},o)=>e.jsx("div",{className:"relative w-full overflow-auto",children:e.jsx("table",{ref:o,className:r("w-full caption-bottom text-sm",a),...l})}));i.displayName="Table";const b=d.forwardRef(({className:a,...l},o)=>e.jsx("thead",{ref:o,className:r("[&_tr]:border-b",a),...l}));b.displayName="TableHeader";const T=d.forwardRef(({className:a,...l},o)=>e.jsx("tbody",{ref:o,className:r("[&_tr:last-child]:border-0",a),...l}));T.displayName="TableBody";const h=d.forwardRef(({className:a,...l},o)=>e.jsx("tfoot",{ref:o,className:r("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",a),...l}));h.displayName="TableFooter";const t=d.forwardRef(({className:a,...l},o)=>e.jsx("tr",{ref:o,className:r("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",a),...l}));t.displayName="TableRow";const n=d.forwardRef(({className:a,...l},o)=>e.jsx("th",{ref:o,className:r("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...l}));n.displayName="TableHead";const s=d.forwardRef(({className:a,...l},o)=>e.jsx("td",{ref:o,className:r("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...l}));s.displayName="TableCell";const x=d.forwardRef(({className:a,...l},o)=>e.jsx("caption",{ref:o,className:r("mt-4 text-sm text-muted-foreground",a),...l}));x.displayName="TableCaption";i.__docgenInfo={description:"",methods:[],displayName:"Table"};b.__docgenInfo={description:"",methods:[],displayName:"TableHeader"};T.__docgenInfo={description:"",methods:[],displayName:"TableBody"};h.__docgenInfo={description:"",methods:[],displayName:"TableFooter"};n.__docgenInfo={description:"",methods:[],displayName:"TableHead"};t.__docgenInfo={description:"",methods:[],displayName:"TableRow"};s.__docgenInfo={description:"",methods:[],displayName:"TableCell"};x.__docgenInfo={description:"",methods:[],displayName:"TableCaption"};const v={title:"Components/Table",component:i,tags:["autodocs"]},y=[{invoice:"INV001",status:"Paid",method:"Credit Card",amount:"$250.00"},{invoice:"INV002",status:"Pending",method:"PayPal",amount:"$150.00"},{invoice:"INV003",status:"Unpaid",method:"Bank Transfer",amount:"$350.00"},{invoice:"INV004",status:"Paid",method:"Credit Card",amount:"$450.00"},{invoice:"INV005",status:"Paid",method:"PayPal",amount:"$550.00"}],c={render:()=>e.jsxs(i,{children:[e.jsx(x,{children:"A list of your recent invoices."}),e.jsx(b,{children:e.jsxs(t,{children:[e.jsx(n,{className:"w-[100px]",children:"Invoice"}),e.jsx(n,{children:"Status"}),e.jsx(n,{children:"Method"}),e.jsx(n,{className:"text-right",children:"Amount"})]})}),e.jsx(T,{children:y.map(a=>e.jsxs(t,{children:[e.jsx(s,{className:"font-medium",children:a.invoice}),e.jsx(s,{children:a.status}),e.jsx(s,{children:a.method}),e.jsx(s,{className:"text-right",children:a.amount})]},a.invoice))}),e.jsx(h,{children:e.jsxs(t,{children:[e.jsx(s,{colSpan:3,children:"Total"}),e.jsx(s,{className:"text-right",children:"$1,750.00"})]})})]})},m={render:()=>e.jsxs(i,{children:[e.jsx(b,{children:e.jsxs(t,{children:[e.jsx(n,{children:"Name"}),e.jsx(n,{children:"Email"}),e.jsx(n,{children:"Role"})]})}),e.jsxs(T,{children:[e.jsxs(t,{children:[e.jsx(s,{children:"John Doe"}),e.jsx(s,{children:"john@example.com"}),e.jsx(s,{children:"Admin"})]}),e.jsxs(t,{children:[e.jsx(s,{children:"Jane Smith"}),e.jsx(s,{children:"jane@example.com"}),e.jsx(s,{children:"User"})]})]})]})};var p,j,u;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
}`,...(u=(j=c.parameters)==null?void 0:j.docs)==null?void 0:u.source}}};var f,N,C;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
}`,...(C=(N=m.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};const _=["Default","Simple"];export{c as Default,m as Simple,_ as __namedExportsOrder,v as default};
