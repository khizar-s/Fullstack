(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var c=n(15),r=n.n(c),o=n(6),a=n(3),i=n(2),u=n(0),s=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(u.jsxs)("li",{className:"note",children:[e.content,Object(u.jsx)("button",{onClick:n,children:c})]})},j=n(4),l=n.n(j),f="https://desolate-lowlands-88474.herokuapp.com/api/notes",b=function(){var t=l.a.get(f),e={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(e)}))},d=function(t){return l.a.post(f,t).then((function(t){return t.data}))},p=function(t,e){return l.a.put("".concat(f,"/").concat(t),e).then((function(t){return t.data}))},m=function(t){var e=t.message;return null===e?null:Object(u.jsx)("div",{className:"error",children:e})},h=function(){return Object(u.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(u.jsx)("br",{}),Object(u.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},O=function(){var t=Object(i.useState)([]),e=Object(a.a)(t,2),n=e[0],c=e[1],r=Object(i.useState)(""),j=Object(a.a)(r,2),l=j[0],f=j[1],O=Object(i.useState)(!0),v=Object(a.a)(O,2),x=v[0],g=v[1],S=Object(i.useState)("some error happened..."),k=Object(a.a)(S,2),w=k[0],y=k[1];Object(i.useEffect)((function(){b().then((function(t){c(t)}))}),[]);var N=x?n:n.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)(m,{message:w}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return g(!x)},children:["show ",x?"important":"all"]})}),Object(u.jsx)("ul",{children:N.map((function(t,e){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),r=Object(o.a)(Object(o.a)({},e),{},{important:!e.important});p(t,r).then((function(e){c(n.map((function(n){return n.id!==t?n:e})))})).catch((function(r){y("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){y(null)}),5e3),c(n.filter((function(e){return e.id!==t})))}))}(t.id)}},e)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:l,date:(new Date).toISOString(),important:Math.random()<.5};d(e).then((function(t){c(n.concat(t)),f("")}))},children:[Object(u.jsx)("input",{value:l,onChange:function(t){f(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]}),Object(u.jsx)(h,{})]})};n(39);r.a.render(Object(u.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.2f2b61db.chunk.js.map