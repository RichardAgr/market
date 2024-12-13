(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[482],{63421:function(e,t,a){Promise.resolve().then(a.bind(a,22678))},50898:function(e,t,a){"use strict";var r=a(60930);a(59567),t.Z=(e,t,a,n)=>{let i=new r.default,s=[];n.forEach(e=>{let t=Object.values(e);t=t.slice(1),s.push(t)});let l=15,o=15;i.text("UrbanMarket - "+e.title,o,l),l+=12,i.setFontSize(12),t.map(e=>{i.text(e.name+": "+e.value,o,l),o>145?(o=15,l+=10):o+=65}),l+=10,i.autoTable(a,s,{startY:l}),i.save(e.fileName+".pdf")}},22678:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return page}});var r=a(57437),n=a(90500),i=a(2265),s=a(88938),l=a(49050),o=a(20879),d=a(96507),c=a(73701),u=a(39279),h=a(30666),p=a(15795),g=a(19464),m=a(98489),x=a(66988),f=a(95781),j=a(92226),ventas_enhancedTableHead=e=>{let{order:t,orderBy:a,onRequestSort:n}=e,createSortHandler=e=>t=>{n(t,e)};return(0,r.jsx)(x.Z,{children:(0,r.jsx)(m.Z,{children:[{id:"ventas",numeric:!1,disablePadding:!0,label:"Venta"},{id:"cliente",numeric:!1,disablePadding:!1,label:"Cliente"},{id:"fecha",numeric:!1,disablePadding:!1,label:"Fecha"},{id:"total",numeric:!0,disablePadding:!1,label:"Total"}].map(e=>(0,r.jsx)(h.Z,{align:e.numeric?"right":"left",padding:"normal",sortDirection:a===e.id&&t,children:(0,r.jsxs)(f.Z,{active:a===e.id,direction:a===e.id?t:"asc",onClick:createSortHandler(e.id),children:[e.label,a===e.id?(0,r.jsx)(d.Z,{component:"span",sx:j.Z,children:"desc"===t?"sorted descending":"sorted ascending"}):null]})},e.id))})})},Z=a(34989),v=a(43226),b=a(29872),D=a(40182),P=a(14647),Y=a(92750),C=a(74124),S=a(76722),w=a(74548),M=a.n(w),R=a(28874),F=a(50898),k=a(31601),page=()=>{let[e,t]=(0,i.useState)("desc"),[a,x]=(0,i.useState)("name"),[f,j]=(0,i.useState)(0),[w,y]=(0,i.useState)(!1),[T,_]=(0,i.useState)(10),[O,N]=(0,i.useState)(M()().subtract(1,"month").format("YYYY-MM-DD")),[z,A]=(0,i.useState)(M()().format("YYYY-MM-DD")),[E,H]=(0,i.useState)([]),[I,L]=(0,i.useState)([]);(0,i.useEffect)(()=>{getData()},[]);let getData=async()=>{let e=await n.Z.get(k.b.saleReportData+O+"/"+z);if(200==e.status){let t=await e.data;L(t=processData(t)),H(t)}},generateReport=()=>{getData()},handleDateChange=(e,t)=>{e=M()(e).format("YYYY-MM-DD"),"start"===t?N(e):A(e)},processData=e=>{let t=[];return e.map(e=>{t.push(getOrdenJSON(e.id,e.product.name,e.order.user.name,e.product.updated_at.split("T")[0],e.order.total))}),t},getOrdenJSON=(e,t,a,r,n)=>({id:e,ventas:t,cliente:a,fecha:r,total:n}),clientSearch=e=>{H(""===e?I:I.filter(t=>(t.name.toLowerCase()+" "+t.email.toLowerCase()).includes(e.toLowerCase())))},Q=(0,i.useMemo)(()=>(function(e,t){let a=e.map((e,t)=>[e,t]);return a.sort((e,a)=>{let r=t(e[0],a[0]);return 0!==r?r:e[1]-a[1]}),a.map(e=>e[0])})(E,"desc"===e?(e,t)=>descendingComparator(e,t,a):(e,t)=>-descendingComparator(e,t,a)).slice(f*T,f*T+T),[E,e,a,f,T]),V=f>0?Math.max(0,(1+f)*T-E.length):0;function descendingComparator(e,t,a){return t[a]<e[a]?1:t[a]>e[a]?-1:0}return(0,r.jsx)(s.Z,{style:{marginTop:"10vh"},children:(0,r.jsxs)(d.Z,{sx:{width:"100%"},children:[(0,r.jsxs)(b.Z,{sx:{width:"100%",mb:2},children:[(0,r.jsx)(v.Z,{sx:{flex:"1 1 100%",p:2},variant:"h5",id:"tableTitle",component:"div",children:"Informe de ventas"}),(0,r.jsx)(Z.Z,{children:(0,r.jsxs)(R.ZP,{container:!0,spacing:2,children:[(0,r.jsxs)(C._,{dateAdapter:Y.y,children:[(0,r.jsx)(R.ZP,{item:!0,xs:2,children:(0,r.jsx)(S.M,{format:"DD/MM/YYYY",defaultValue:M()(O),maxDate:M()(z),onChange:e=>handleDateChange(e,"start"),slotProps:{textField:{size:"small",helperText:"Fecha inicio"}}})}),(0,r.jsx)(R.ZP,{item:!0,xs:2,children:(0,r.jsx)(S.M,{format:"DD/MM/YYYY",defaultValue:M()(z),minDate:M()(O),onChange:e=>handleDateChange(e,"end"),slotProps:{textField:{size:"small",helperText:"Fecha fin"}}})})]}),(0,r.jsx)(R.ZP,{item:!0,xs:2,children:(0,r.jsx)(l.Z,{variant:"outlined",onClick:e=>generateReport(),children:"Generar"})}),(0,r.jsx)(R.ZP,{item:!0,xs:6,children:(0,r.jsx)(o.Z,{sx:{width:"100%"},id:"clientSearch",label:"Buscar cliente...",variant:"outlined",size:"small",onKeyUp:e=>clientSearch(e.target.value)})})]})}),(0,r.jsx)(p.Z,{children:(0,r.jsxs)(c.Z,{sx:{minWidth:750},"aria-labelledby":"tableTitle",size:w?"small":"medium",stickyHeader:!0,children:[(0,r.jsx)(ventas_enhancedTableHead,{order:e,orderBy:a,onRequestSort:(r,n)=>{let i=a===n&&"asc"===e;t(i?"desc":"asc"),x(n)}}),(0,r.jsxs)(u.Z,{children:[Q.map((e,t)=>(0,r.jsxs)(m.Z,{hover:!0,tabIndex:-1,children:[(0,r.jsx)(h.Z,{align:"left",children:e.ventas}),(0,r.jsx)(h.Z,{align:"left",children:e.cliente}),(0,r.jsx)(h.Z,{align:"left",children:e.fecha}),(0,r.jsx)(h.Z,{align:"right",children:e.total})]},e.id)),V>0&&(0,r.jsx)(m.Z,{style:{height:(w?33:53)*V},children:(0,r.jsx)(h.Z,{colSpan:6})})]})]})}),(0,r.jsx)(g.Z,{rowsPerPageOptions:[5,10,25],component:"div",count:E.length,rowsPerPage:T,page:f,onPageChange:(e,t)=>{j(t)},onRowsPerPageChange:e=>{_(parseInt(e.target.value,10)),j(0)},labelRowsPerPage:"Clientes por pagina"})]}),(0,r.jsxs)(d.Z,{sx:{width:"100%"},children:[(0,r.jsx)(D.Z,{control:(0,r.jsx)(P.Z,{checked:w,onChange:e=>{y(e.target.checked)}}),label:"Espaciado de filas denso",style:{width:"88%"}}),(0,r.jsx)(l.Z,{variant:"outlined",onClick:()=>{let e=[{name:"Fecha inicio",value:O},{name:"Fecha fin",value:z}];(0,F.Z)({title:"Reporte de ventas",fileName:"reporte_ventas"},e,["Venta","Cliente","Fecha","Total"],E)},children:"Generar PDF"})]})]})})}},90500:function(e,t,a){"use strict";var r=a(92173);let n=r.Z.create({baseURL:"http://localhost:8000/api"});n.interceptors.request.use(e=>{let t=localStorage.getItem("token");return t&&e.headers&&(e.headers.Authorization=t?"Bearer ".concat(t):""),e},e=>Promise.reject(e)),n.interceptors.response.use(e=>e,e=>Promise.reject(e)),t.Z=n},31601:function(e,t,a){"use strict";a.d(t,{b:function(){return r}});let r={hello:"/hello",user:"/user",profile:"/profile",logout:"/logout",profile:"/profile",reports:"/reportes",clientReportData:"/reporting/user/",userReportData:"/reporting/user-register/",userDelete:"/reporting/user/",inventaryReport:"/reportes/inventarios",inventaryReportData:"/reporting/inventary/",saleReportData:"/reporting/sale/",login:"/login",logout:"/logout",addFAQ:"/agregar-pregunta",editFAQ:"/editar-pregunta/",deleteFAQ:"/",FAQS:"/faqs",ordersYear:"reporting/ordersYears",economicReport:"reporting/economicReport"}}},function(e){e.O(0,[505,226,886,429,997,173,711,874,479,735,133,84,368,971,472,744],function(){return e(e.s=63421)}),_N_E=e.O()}]);