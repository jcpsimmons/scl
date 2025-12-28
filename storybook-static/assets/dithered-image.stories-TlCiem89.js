import{j as E}from"./jsx-runtime-DF2Pcvd1.js";import{r as T}from"./index-B2-qRKKC.js";import{c as Ie}from"./utils-CytzSlOG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const we=`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,ke=`
  precision mediump float;

  varying vec2 v_texCoord;

  uniform sampler2D u_image;
  uniform vec3 u_color;

  void main() {
    vec4 texColor = texture2D(u_image, v_texCoord);
    // Dithered image is already black/white, just colorize the white pixels
    vec3 finalColor = texColor.r * u_color;
    gl_FragColor = vec4(finalColor, texColor.a);
  }
`,Ce=`
  precision mediump float;

  varying vec2 v_texCoord;

  uniform sampler2D u_image;
  uniform sampler2D u_bayerTex;
  uniform vec2 u_resolution;
  uniform float u_ditherSize;
  uniform vec3 u_color;

  void main() {
    vec2 pixelPos = mod(floor(gl_FragCoord.xy / u_ditherSize), 8.0);
    vec4 texColor = texture2D(u_image, v_texCoord);

    // Convert to grayscale using luminance
    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

    // Look up threshold from Bayer texture
    float threshold = texture2D(u_bayerTex, (pixelPos + 0.5) / 8.0).r;
    float dithered = step(threshold, gray);

    // Output color or black
    vec3 finalColor = dithered * u_color;
    gl_FragColor = vec4(finalColor, texColor.a);
  }
`,Pe=[0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21];function Le(n,f=128){const t=new Uint8ClampedArray(n.data),a=n.width,u=n.height,x=(r,o)=>(o*a+r)*4,l=(r,o,s)=>{if(r<0||r>=a||o<0||o>=u)return;const m=x(r,o);t[m]=Math.max(0,Math.min(255,t[m]+s)),t[m+1]=Math.max(0,Math.min(255,t[m+1]+s)),t[m+2]=Math.max(0,Math.min(255,t[m+2]+s))};for(let r=0;r<u;r++)for(let o=0;o<a;o++){const s=x(o,r),m=t[s]*.299+t[s+1]*.587+t[s+2]*.114,i=m<f?0:255,d=Math.floor((m-i)/8);t[s]=i,t[s+1]=i,t[s+2]=i,l(o+1,r,d),l(o+2,r,d),l(o-1,r+1,d),l(o,r+1,d),l(o+1,r+1,d),l(o,r+2,d)}return new ImageData(t,a,u)}function Ue(n,f=128){const t=new Uint8ClampedArray(n.data),a=n.width,u=n.height,x=(r,o)=>(o*a+r)*4,l=(r,o,s,m)=>{if(r<0||r>=a||o<0||o>=u)return;const i=x(r,o),d=s*m;t[i]=Math.max(0,Math.min(255,t[i]+d)),t[i+1]=Math.max(0,Math.min(255,t[i+1]+d)),t[i+2]=Math.max(0,Math.min(255,t[i+2]+d))};for(let r=0;r<u;r++)for(let o=0;o<a;o++){const s=x(o,r),m=t[s]*.299+t[s+1]*.587+t[s+2]*.114,i=m<f?0:255,d=m-i;t[s]=i,t[s+1]=i,t[s+2]=i,l(o+1,r,d,7/16),l(o-1,r+1,d,3/16),l(o,r+1,d,5/16),l(o+1,r+1,d,1/16)}return new ImageData(t,a,u)}function W(n,f,t){const a=n.createShader(f);return a?(n.shaderSource(a,t),n.compileShader(a),n.getShaderParameter(a,n.COMPILE_STATUS)?a:(console.error("Shader compile error:",n.getShaderInfoLog(a)),n.deleteShader(a),null)):null}function Ne(n,f,t){const a=n.createProgram();return a?(n.attachShader(a,f),n.attachShader(a,t),n.linkProgram(a),n.getProgramParameter(a,n.LINK_STATUS)?a:(console.error("Program link error:",n.getProgramInfoLog(a)),n.deleteProgram(a),null)):null}const b=T.forwardRef(({className:n,src:f,alt:t,width:a,height:u,ditherSize:x=1,color:l=[0,255,0],algorithm:r="atkinson",threshold:o=128,...s},m)=>{const i=T.useRef(null),d=T.useRef(null),H=T.useRef(null),D=T.useRef(null);return T.useImperativeHandle(m,()=>i.current),T.useEffect(()=>{const _=i.current;if(!_)return;const e=_.getContext("webgl",{preserveDrawingBuffer:!0});if(!e){console.error("WebGL not supported");return}d.current=e;const A=r==="bayer"?Ce:ke,h=W(e,e.VERTEX_SHADER,we),y=W(e,e.FRAGMENT_SHADER,A);if(!h||!y){console.error("Failed to create shaders");return}const c=Ne(e,h,y);if(!c){console.error("Failed to create program");return}if(e.useProgram(c),H.current=c,r==="bayer"){const O=e.createTexture();e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,O);const Me=new Uint8Array(Pe.map(De=>De/64*255));e.texImage2D(e.TEXTURE_2D,0,e.LUMINANCE,8,8,0,e.LUMINANCE,e.UNSIGNED_BYTE,Me),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),D.current=O}const p=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),R=new Float32Array([0,1,1,1,0,0,0,0,1,1,1,0]),I=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,I),e.bufferData(e.ARRAY_BUFFER,p,e.STATIC_DRAW);const S=e.getAttribLocation(c,"a_position");e.enableVertexAttribArray(S),e.vertexAttribPointer(S,2,e.FLOAT,!1,0,0);const v=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,v),e.bufferData(e.ARRAY_BUFFER,R,e.STATIC_DRAW);const M=e.getAttribLocation(c,"a_texCoord");return e.enableVertexAttribArray(M),e.vertexAttribPointer(M,2,e.FLOAT,!1,0,0),e.uniform1i(e.getUniformLocation(c,"u_image"),0),r==="bayer"&&e.uniform1i(e.getUniformLocation(c,"u_bayerTex"),1),()=>{e.deleteProgram(c),e.deleteShader(h),e.deleteShader(y),D.current&&e.deleteTexture(D.current)}},[r]),T.useEffect(()=>{const _=i.current,e=d.current,A=H.current;if(!_||!e||!A)return;const h=new Image;h.crossOrigin="anonymous",h.onload=()=>{const y=h.naturalWidth/h.naturalHeight;let c,p;a&&u?(c=a,p=u):a?(c=a,p=Math.round(a/y)):u?(p=u,c=Math.round(u*y)):(c=h.naturalWidth,p=h.naturalHeight),_.width=c,_.height=p,e.viewport(0,0,c,p),e.useProgram(A);let R=h;if(r==="atkinson"||r==="floyd-steinberg"){const S=document.createElement("canvas");S.width=c,S.height=p;const v=S.getContext("2d");if(v){v.drawImage(h,0,0,c,p);const M=v.getImageData(0,0,c,p);R=r==="atkinson"?Le(M,o):Ue(M,o)}}r==="bayer"&&(e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,D.current)),e.activeTexture(e.TEXTURE0);const I=e.createTexture();e.bindTexture(e.TEXTURE_2D,I),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),R instanceof ImageData,e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,R),r==="bayer"&&(e.uniform2f(e.getUniformLocation(A,"u_resolution"),c,p),e.uniform1f(e.getUniformLocation(A,"u_ditherSize"),x)),e.uniform3f(e.getUniformLocation(A,"u_color"),l[0]/255,l[1]/255,l[2]/255),e.drawArrays(e.TRIANGLES,0,6),e.deleteTexture(I)},h.onerror=()=>{console.error("Failed to load image:",f)},h.src=f},[f,a,u,x,l,r,o]),E.jsx("canvas",{ref:i,className:Ie("",n),"aria-label":t,role:"img",...s})});b.displayName="DitheredImage";b.__docgenInfo={description:"",methods:[],displayName:"DitheredImage",props:{src:{required:!0,tsType:{name:"string"},description:""},alt:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"number"},description:"Width in pixels. If only width is set, height is calculated from aspect ratio"},height:{required:!1,tsType:{name:"number"},description:"Height in pixels. If only height is set, width is calculated from aspect ratio"},ditherSize:{required:!1,tsType:{name:"number"},description:"Size of dither pattern pixels (default: 1)",defaultValue:{value:"1",computed:!1}},color:{required:!1,tsType:{name:"tuple",raw:"[number, number, number]",elements:[{name:"number"},{name:"number"},{name:"number"}]},description:"RGB color for lit pixels (default: terminal green [0, 255, 0])",defaultValue:{value:"[0, 255, 0]",computed:!1}},algorithm:{required:!1,tsType:{name:"union",raw:"'atkinson' | 'bayer' | 'floyd-steinberg'",elements:[{name:"literal",value:"'atkinson'"},{name:"literal",value:"'bayer'"},{name:"literal",value:"'floyd-steinberg'"}]},description:"Dithering algorithm (default: 'atkinson' for classic Mac look)",defaultValue:{value:"'atkinson'",computed:!1}},threshold:{required:!1,tsType:{name:"number"},description:"Threshold for black/white conversion (0-255, default: 128)",defaultValue:{value:"128",computed:!1}}},composes:["Omit"]};const Be=""+new URL("simmonsprofile-DrNdcHFc.jpg",import.meta.url).href,Oe={title:"Components/DitheredImage",component:b,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{ditherSize:{control:{type:"range",min:1,max:8,step:1}},threshold:{control:{type:"range",min:0,max:255,step:1}},algorithm:{control:{type:"select"},options:["atkinson","floyd-steinberg","bayer"]},color:{control:!1}}},g=Be,w={args:{src:g,alt:"Atkinson dithered image (classic Mac)",width:400}},k={args:{src:g,alt:"Atkinson dithered - classic Mac green",width:400,algorithm:"atkinson",color:[0,255,0]}},C={args:{src:g,alt:"Atkinson dithered - amber monochrome",width:400,algorithm:"atkinson",color:[255,176,0]}},P={args:{src:g,alt:"Floyd-Steinberg dithered",width:400,algorithm:"floyd-steinberg",color:[0,255,0]}},L={args:{src:g,alt:"Bayer ordered dithering",width:400,algorithm:"bayer",ditherSize:1}},U={args:{src:g,alt:"Large Bayer dither pattern",width:400,algorithm:"bayer",ditherSize:2}},N={args:{src:g,alt:"Cyan dithered image",width:400,algorithm:"atkinson",color:[0,255,255]}},B={args:{src:g,alt:"Hot pink dithered image",width:400,algorithm:"atkinson",color:[255,0,255]}},F={args:{src:g,alt:"White dithered image",width:400,algorithm:"atkinson",color:[255,255,255]}},G={args:{src:g,alt:"Dark threshold dithering",width:400,algorithm:"atkinson",threshold:100}},X={args:{src:g,alt:"Light threshold dithering",width:400,algorithm:"atkinson",threshold:180}},j={render:()=>E.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[E.jsxs("div",{className:"text-center",children:[E.jsx(b,{src:g,alt:"Atkinson",width:200,algorithm:"atkinson"}),E.jsx("p",{className:"mt-2 text-sm text-primary",children:"Atkinson (Mac)"})]}),E.jsxs("div",{className:"text-center",children:[E.jsx(b,{src:g,alt:"Floyd-Steinberg",width:200,algorithm:"floyd-steinberg"}),E.jsx("p",{className:"mt-2 text-sm text-primary",children:"Floyd-Steinberg"})]}),E.jsxs("div",{className:"text-center",children:[E.jsx(b,{src:g,alt:"Bayer",width:200,algorithm:"bayer"}),E.jsx("p",{className:"mt-2 text-sm text-primary",children:"Bayer (Ordered)"})]})]})};var z,V,Y;w.parameters={...w.parameters,docs:{...(z=w.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Atkinson dithered image (classic Mac)',
    width: 400
  }
}`,...(Y=(V=w.parameters)==null?void 0:V.docs)==null?void 0:Y.source}}};var q,K,Z;k.parameters={...k.parameters,docs:{...(q=k.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Atkinson dithered - classic Mac green',
    width: 400,
    algorithm: 'atkinson',
    color: [0, 255, 0]
  }
}`,...(Z=(K=k.parameters)==null?void 0:K.docs)==null?void 0:Z.source}}};var J,Q,$;C.parameters={...C.parameters,docs:{...(J=C.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Atkinson dithered - amber monochrome',
    width: 400,
    algorithm: 'atkinson',
    color: [255, 176, 0]
  }
}`,...($=(Q=C.parameters)==null?void 0:Q.docs)==null?void 0:$.source}}};var ee,re,te;P.parameters={...P.parameters,docs:{...(ee=P.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Floyd-Steinberg dithered',
    width: 400,
    algorithm: 'floyd-steinberg',
    color: [0, 255, 0]
  }
}`,...(te=(re=P.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ae,oe,ne;L.parameters={...L.parameters,docs:{...(ae=L.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Bayer ordered dithering',
    width: 400,
    algorithm: 'bayer',
    ditherSize: 1
  }
}`,...(ne=(oe=L.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var se,ie,ce;U.parameters={...U.parameters,docs:{...(se=U.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Large Bayer dither pattern',
    width: 400,
    algorithm: 'bayer',
    ditherSize: 2
  }
}`,...(ce=(ie=U.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var de,le,me;N.parameters={...N.parameters,docs:{...(de=N.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Cyan dithered image',
    width: 400,
    algorithm: 'atkinson',
    color: [0, 255, 255]
  }
}`,...(me=(le=N.parameters)==null?void 0:le.docs)==null?void 0:me.source}}};var ue,he,ge;B.parameters={...B.parameters,docs:{...(ue=B.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Hot pink dithered image',
    width: 400,
    algorithm: 'atkinson',
    color: [255, 0, 255]
  }
}`,...(ge=(he=B.parameters)==null?void 0:he.docs)==null?void 0:ge.source}}};var pe,fe,Ee;F.parameters={...F.parameters,docs:{...(pe=F.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'White dithered image',
    width: 400,
    algorithm: 'atkinson',
    color: [255, 255, 255]
  }
}`,...(Ee=(fe=F.parameters)==null?void 0:fe.docs)==null?void 0:Ee.source}}};var xe,Te,Ae;G.parameters={...G.parameters,docs:{...(xe=G.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Dark threshold dithering',
    width: 400,
    algorithm: 'atkinson',
    threshold: 100
  }
}`,...(Ae=(Te=G.parameters)==null?void 0:Te.docs)==null?void 0:Ae.source}}};var _e,ye,Re;X.parameters={...X.parameters,docs:{...(_e=X.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  args: {
    src: SAMPLE_IMAGE,
    alt: 'Light threshold dithering',
    width: 400,
    algorithm: 'atkinson',
    threshold: 180
  }
}`,...(Re=(ye=X.parameters)==null?void 0:ye.docs)==null?void 0:Re.source}}};var Se,be,ve;j.parameters={...j.parameters,docs:{...(Se=j.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <DitheredImage src={SAMPLE_IMAGE} alt="Atkinson" width={200} algorithm="atkinson" />
        <p className="mt-2 text-sm text-primary">Atkinson (Mac)</p>
      </div>
      <div className="text-center">
        <DitheredImage src={SAMPLE_IMAGE} alt="Floyd-Steinberg" width={200} algorithm="floyd-steinberg" />
        <p className="mt-2 text-sm text-primary">Floyd-Steinberg</p>
      </div>
      <div className="text-center">
        <DitheredImage src={SAMPLE_IMAGE} alt="Bayer" width={200} algorithm="bayer" />
        <p className="mt-2 text-sm text-primary">Bayer (Ordered)</p>
      </div>
    </div>
}`,...(ve=(be=j.parameters)==null?void 0:be.docs)==null?void 0:ve.source}}};const He=["Default","AtkinsonGreen","AtkinsonAmber","FloydSteinberg","BayerOrdered","BayerLargePattern","CyanColor","HotPinkColor","WhiteColor","DarkThreshold","LightThreshold","AlgorithmComparison"];export{j as AlgorithmComparison,C as AtkinsonAmber,k as AtkinsonGreen,U as BayerLargePattern,L as BayerOrdered,N as CyanColor,G as DarkThreshold,w as Default,P as FloydSteinberg,B as HotPinkColor,X as LightThreshold,F as WhiteColor,He as __namedExportsOrder,Oe as default};
