(this["webpackJsonpsoftdesign-test"]=this["webpackJsonpsoftdesign-test"]||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){},334:function(e,t,n){},359:function(e,t,n){},360:function(e,t,n){},361:function(e,t,n){},362:function(e,t,n){},364:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n(5),i=n(90),o=n.n(i),r=(n(100),n(101),n(91)),s=n.n(r),l=(n(334),n(19)),u=n(34),d=n(93),m=n(15),j=n.n(m),b=n(94),f=n(92),p=n(17),h=n(48),v=n.n(h),O=(n(359),function(e){var t=e.comic,n=e.addComic,a=e.removeComic,i=e.openComic,o=e.selected;return Object(c.jsxs)("div",{className:"Comic",onClick:function(){return i(t)},children:[Object(c.jsx)("input",{className:"comic-checkbox",type:"checkbox",checked:o,onClick:function(e){return e.stopPropagation()},onChange:function(){o?a(t.id):n(t)}}),Object(c.jsx)("img",{className:"comic-thumb",src:t.thumbnail.path+"."+t.thumbnail.extension,alt:t.title+" image"}),Object(c.jsx)("h3",{className:"comic-title",children:t.title})]})}),x=n(47),g=n.n(x),C=function(e){return e.creators.items.map((function(e){return e.name})).join(", ")},k=function(e){return e.characters.items.length?e.characters.items.map((function(e){return e.name})).join(", "):""},N=function(e){var t=e.urls.findIndex((function(e){return"detail"===e.type}));if(t>=0)return e.urls[t].url},y=function(e){var t=e.dates.findIndex((function(e){return"onsaleDate"===e.type}));if(t>=0)return g()(e.dates[t].date).format("LL")},I=(n(360),function(e,t){return Object(c.jsxs)("p",{className:"field",children:[Object(c.jsx)("span",{className:"title",children:e}),t]})}),S=function(e){var t,n,a=e.comic,i=e.close;return Object(c.jsx)(u.Backdrop,{onBackdropClick:i,children:Object(c.jsxs)("div",{className:"ComicDetails",children:[Object(c.jsxs)("div",{className:"comic-content",children:[Object(c.jsx)("img",{src:a.thumbnail.path+"."+a.thumbnail.extension}),Object(c.jsx)("h3",{className:"comic-title",children:a.title}),I("Criadores: ",C(a)),a.description?I("Descri\xe7\xe3o: ",a.description):null,k(a)?I("Personagens: ",k(a)):null,I("Pre\xe7o: ",(null===(t=a.prices)||void 0===t||null===(n=t[0])||void 0===n?void 0:n.price.toLocaleString("pt-br"))+" d\xf3lares"),I("S\xe9rie: ",a.series.name),I("Data de publica\xe7\xe3o: ",y(a)),N(a)?Object(c.jsx)("a",{target:"_blank",rel:"noreferrer",href:N(a),children:"Clique aqui para ver mais detalhes"}):null]}),Object(c.jsx)("button",{className:"close-details",onClick:i,children:"Fechar"})]})})},D=(n(361),"Cancelled intentionally"),L=function(){var e,t,n=Object(a.useState)(null),i=Object(p.a)(n,2),o=i[0],r=i[1],s=Object(a.useState)(""),u=Object(p.a)(s,2),m=u[0],h=u[1],x=Object(a.useState)([]),g=Object(p.a)(x,2),I=g[0],L=g[1],P=Object(a.useState)(null),_=Object(p.a)(P,2),w=_[0],E=_[1],R=Object(a.useContext)(l.ReactUIContext),q=Object(a.useRef)(null),F=Object(a.useState)({value:1}),T=Object(p.a)(F,2),U=T[0],z=T[1],B=Object(a.useState)(null),M=Object(p.a)(B,2),A=M[0],J=M[1];Object(a.useEffect)((function(){return W(),function(){return q.current.cancel(D)}}),[U]),Object(a.useEffect)((function(){z({value:1})}),[m]);var W=function(){var e=Object(f.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return q.current=v.a.CancelToken.source(),R.pushLoading(),e.prev=2,t=Object(b.a)({apikey:"2039859d947cf31356a41e66a4dcb442",format:"comic",formatType:"comic",offset:20*(U.value-1),limit:20},m?{titleStartsWith:m}:null),e.next=6,v.a.get("https://gateway.marvel.com/v1/public/comics",{params:t,cancelToken:q.current.token});case 6:n=e.sent,r(n.data),J(Math.ceil(n.data.data.total/20)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),(null===e.t0||void 0===e.t0?void 0:e.t0.message)!==D&&R.addModal({desc:"Erro ao atualizar lista de comics",title:"Erro na API",type:"error"});case 14:return e.prev=14,R.popLoading(),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[2,11,14,17]])})));return function(){return e.apply(this,arguments)}}(),G=function(e){var t,n;return["Comic - "+e.title,"T\xedtulo: ".concat(e.title,"\n\nImagem: ").concat(function(e){return e.thumbnail.path+"."+e.thumbnail.extension}(e),"\n\nCriadores: ").concat(C(e)).concat(e.description?"\n\nDescri\xe7\xe3o: "+e.description:"","\n\nPersonagens: ").concat(k(e),"\n\nPre\xe7o: ").concat(null===(t=e.prices)||void 0===t||null===(n=t[0])||void 0===n?void 0:n.price.toLocaleString("pt-br")," d\xf3lares\n\nS\xe9rie: ").concat(e.series.name).concat(N(e)?"\n\nDetalhes: "+N(e):"").concat(y(e)?"\n\nData de publica\xe7\xe3o: "+y(e):"")]};return Object(c.jsxs)("div",{className:"ComicList",children:[w?Object(c.jsx)(S,{comic:w,close:function(){return E(null)}}):null,Object(c.jsx)("div",{className:"query",children:Object(c.jsx)("input",{type:"text",value:m,onChange:function(e){return h(e.target.value)},placeholder:"Digite um t\xedtulo para pesquisar quadrinhos..."})}),Object(c.jsx)("div",{className:"list"+((null===o||void 0===o||null===(e=o.data)||void 0===e?void 0:e.count)?" has-data":""),children:(null===o||void 0===o||null===(t=o.data)||void 0===t?void 0:t.count)?Object(c.jsx)(c.Fragment,{children:o.data.results.map((function(e){return Object(c.jsx)(O,{comic:e,openComic:function(e){return E(e)},selected:I.findIndex((function(t){return t.id===e.id}))>=0,addComic:function(e){return L((function(t){return[].concat(Object(d.a)(t),[e])}))},removeComic:function(e){L((function(t){return t.filter((function(t){return t.id!==e}))}))}},e.id)}))}):Object(c.jsx)("h3",{children:R.state.loading.length?"Carregando...":"Nenhum resultado encontrado."})}),(null===o||void 0===o?void 0:o.data)?Object(c.jsxs)("h5",{className:"result-info",children:["Mostrando de ",o.data.offset+1," a"," ",o.data.offset+o.data.count," de um total de"," ",o.data.total," - ",o.data.limit," por p\xe1gina - ",A," ","p\xe1ginas"]}):null,Object(c.jsxs)("div",{className:"controls",children:[(null===o||void 0===o?void 0:o.data)?Object(c.jsxs)("div",{className:"navigators",children:[Object(c.jsx)("button",{className:"page-switcher",onClick:function(){return z((function(e){return 1===e.value?e:{value:e.value-1}}))},children:"<"}),Object(c.jsx)("button",{className:"page-switcher",onClick:function(){return z((function(e){return e===A?e:{value:e.value+1}}))},children:">"})]}):null,I.length?Object(c.jsxs)("div",{className:"mail-buttons",children:[Object(c.jsx)("button",{onClick:function(){var e=I.map(G),t=encodeURIComponent(e.map((function(e){return Object(p.a)(e,1)[0]})).join(" | ")),n=encodeURIComponent(e.map((function(e){return Object(p.a)(e,2)[1]})).join(" \n\n============================================================================\n\n "))+"\n",c=document.createElement("a");c.target="_blank",c.href="mailto:?subject=".concat(t,"&body=").concat(n,"&Content-type=text/html"),c.click()},children:"Enviar email"}),Object(c.jsx)("button",{onClick:function(){return L([])},children:"Desmarcar todos"})]}):null]})]})},P=(n(362),function(){return Object(a.useContext)(l.ReactUIContext).state.loading.length?Object(c.jsx)("div",{className:"Loading",children:Object(c.jsx)("i",{id:"loading",className:"fas fa-spinner"})}):null}),_=(n(363),{particles:{number:{value:150,density:{enable:!1,value_area:800}},opacity:{value:.5,random:!0,anim:{enable:!0,speed:1,opacity_min:.1,sync:!1}},size:{value:1,random:!0,anim:{enable:!1,speed:10,size_min:.1,sync:!1}},line_linked:{enable:!1},move:{enable:!0,speed:1,direction:"none",random:!0}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"repulse"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{repulse:{distance:50,duration:1},push:{particles_nb:1,quantity:5}}},retina_detect:!0}),w=function(){var e=Object(l.useRootContext)();return Object(c.jsxs)(l.ReactUIContext.Provider,{value:e,children:[Object(c.jsx)(u.ModalWarning,{}),Object(c.jsx)(P,{}),Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(s.a,{className:"particles",params:_}),Object(c.jsx)("div",{className:"main-container",children:Object(c.jsx)(L,{})})]})]})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,365)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),i(e),o(e)}))};o.a.render(Object(c.jsx)(w,{}),document.getElementById("root")),E()}},[[364,1,2]]]);
//# sourceMappingURL=main.732c0e84.chunk.js.map