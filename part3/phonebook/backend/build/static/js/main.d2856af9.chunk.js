(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(14),r=t.n(c),a=t(3),u=t(1),o=t(0),i=function(e){var n=e.filter,t=e.handleFilter;return Object(o.jsxs)(o.Fragment,{children:["filter shown with ",Object(o.jsx)("input",{value:n,onChange:t})]})},s=function(e){var n=e.newName,t=e.newPhone,c=e.submitName,r=e.handleNameChange,a=e.handlePhoneChange;return Object(o.jsxs)("form",{onSubmit:c,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{value:n,onChange:r})]}),Object(o.jsxs)("div",{children:["number: ",Object(o.jsx)("input",{value:t,onChange:a})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.personsToShow,t=e.deletePerson;return n.map((function(e){return Object(o.jsxs)("p",{children:[e.name," ",e.number," ",Object(o.jsx)("button",{onClick:function(){return t(e.id)},children:"delete"})]},e.name)}))},d=t(4),j=t.n(d),f="/api/persons",h=function(){return j.a.get(f).then((function(e){return e.data}))},b=function(e){return j.a.post(f,e).then((function(e){return e.data}))},m=function(e){j.a.delete("".concat(f,"/").concat(e))},O=function(e,n){return j.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){var n=e.message;return null===n?null:Object(o.jsx)("div",{className:"msgError",children:n})},p=function(e){var n=e.message;return null===n?null:Object(o.jsx)("div",{className:"msgSuccess",children:n})},x=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),d=Object(a.a)(r,2),j=d[0],f=d[1],x=Object(u.useState)(""),g=Object(a.a)(x,2),w=g[0],C=g[1],S=Object(u.useState)(""),N=Object(a.a)(S,2),P=N[0],k=N[1],T=Object(u.useState)(null),y=Object(a.a)(T,2),E=y[0],F=y[1],A=Object(u.useState)(null),D=Object(a.a)(A,2),I=D[0],J=D[1];Object(u.useEffect)((function(){h().then((function(e){c(e)}))}),[]);var L=t.reduce((function(e,n){return e||n.name===j}),!1),B=""===P?t:t.filter((function(e){return e.name.toLowerCase().includes(P.toLowerCase())}));return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(p,{message:E}),Object(o.jsx)(v,{message:I}),Object(o.jsx)(i,{filter:P,handleFilter:function(e){k(e.target.value)}}),Object(o.jsx)("h3",{children:"Add a new"}),Object(o.jsx)(s,{newName:j,newPhone:w,submitName:function(e){e.preventDefault();var n={name:j,number:w};if(L){var r=t.find((function(e){return e.name===j})).id;window.confirm("".concat(j," is already added to phonebook, replace the old number with a new one?"))&&O(r,n).then((function(e){c(t.map((function(n){return n.id!==r?n:e}))),F("Updated ".concat(j)),setTimeout((function(){return F(null)}),5e3),f(""),C("")})).catch((function(e){J("Information of ".concat(j," has already been removed from server")),setTimeout((function(){return J(null)}),5e3)}))}else b(n).then((function(e){c(t.concat(e)),F("Added ".concat(j)),setTimeout((function(){return F(null)}),5e3),f(""),C("")}))},handleNameChange:function(e){f(e.target.value)},handlePhoneChange:function(e){C(e.target.value)}}),Object(o.jsx)("h3",{children:"Numbers"}),Object(o.jsx)(l,{personsToShow:B,deletePerson:function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Delete ".concat(n," ?"))&&(m(e),c(t.filter((function(n){return n.id!==e}))))}})]})};t(38);r.a.render(Object(o.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.d2856af9.chunk.js.map