(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{39:function(t,n,e){},40:function(t,n,e){"use strict";e.r(n);var c=e(15),r=e.n(c),o=e(6),i=e(3),a=e(2),u=e(0),s=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"make not important":"make important";return Object(u.jsxs)("li",{className:"note",children:[n.content,Object(u.jsx)("button",{onClick:e,children:c})]})},j=e(4),l=e.n(j),f="/api/notes",b=function(){return l.a.get(f).then((function(t){return t.data}))},d=function(t){return l.a.post(f,t).then((function(t){return t.data}))},m=function(t,n){return l.a.put("".concat(f,"/").concat(t),n).then((function(t){return t.data}))},O=function(t){var n=t.message;return null===n?null:Object(u.jsx)("div",{className:"error",children:n})},p=function(){return Object(u.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(u.jsx)("br",{}),Object(u.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},h=function(){var t=Object(a.useState)([]),n=Object(i.a)(t,2),e=n[0],c=n[1],r=Object(a.useState)(""),j=Object(i.a)(r,2),l=j[0],f=j[1],h=Object(a.useState)(!0),v=Object(i.a)(h,2),x=v[0],g=v[1],S=Object(a.useState)(null),k=Object(i.a)(S,2),y=k[0],w=k[1];Object(a.useEffect)((function(){b().then((function(t){c(t)}))}),[]);var N=x?e:e.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)(O,{message:y}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return g(!x)},children:["show ",x?"important":"all"]})}),Object(u.jsx)("ul",{children:N.map((function(t,n){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),r=Object(o.a)(Object(o.a)({},n),{},{important:!n.important});m(t,r).then((function(n){c(e.map((function(e){return e.id!==t?e:n})))})).catch((function(r){w("Note '".concat(n.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),c(e.filter((function(n){return n.id!==t})))}))}(t.id)}},n)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:l,date:(new Date).toISOString(),important:Math.random()<.5};d(n).then((function(t){c(e.concat(t)),f("")}))},children:[Object(u.jsx)("input",{value:l,onChange:function(t){f(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]}),Object(u.jsx)(p,{})]})};e(39);r.a.render(Object(u.jsx)(h,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.87aed97d.chunk.js.map