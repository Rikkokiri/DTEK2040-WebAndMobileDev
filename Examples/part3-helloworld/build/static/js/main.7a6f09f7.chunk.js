(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(t,e,n){t.exports=n(43)},42:function(t,e,n){},43:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),r=n(10),l=n.n(r),c=n(15),i=n(11),u=n(12),s=n(14),m=n(13),f=n(16),h=function(t){var e=t.note,n=t.toggleImportance,o=e.important?"Make not important":"Make important";return a.a.createElement("li",null,a.a.createElement("button",{onClick:n},o),e.content," ")},d=function(t){var e=t.message;return null===e?null:a.a.createElement("div",{className:"error"},e)},g=n(2),p=n.n(g),v="http://localhost:3001/notes",w={getAll:function(){return p.a.get(v).then(function(t){return t.data})},create:function(t){return p.a.post(v,t).then(function(t){return t.data})},update:function(t,e){return p.a.put("".concat(v,"/").concat(t),e).then(function(t){return t.data})}},b=function(t){function e(t){var n;return Object(i.a)(this,e),(n=Object(s.a)(this,Object(m.a)(e).call(this,t))).addNote=function(t){t.preventDefault();var e={content:n.state.newNote,date:(new Date).toISOString(),important:Math.random()>.5};w.create(e).then(function(t){n.setState({notes:n.state.notes.concat(t),newNote:""})})},n.toggleImportanceOf=function(t){return function(){console.log("importance of ".concat(t," needs to be toggled"));var e=n.state.notes.find(function(e){return e.id===t}),o=Object(c.a)({},e,{important:!e.important});w.update(t,o).then(function(e){var o=n.state.notes.filter(function(e){return e.id!==t});n.setState({notes:o.concat(e)})}).catch(function(o){n.setState({error:"Unfortunately note '".concat(e.content,"' has  already been removed from the server."),notes:n.state.notes.filter(function(e){return e.id!==t})}),setTimeout(function(){n.setState({error:null})},5e3)})}},n.handleNoteChange=function(t){console.log(t.target.value),n.setState({newNote:t.target.value})},n.toggleVisible=function(){n.setState({showAll:!n.state.showAll})},n.state={notes:[],newNote:"",showAll:!0,error:null},console.log("constructor"),n}return Object(f.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){var t=this;console.log("Did mount"),w.getAll().then(function(e){console.log("Promise fulfilled"),t.setState({notes:e})})}},{key:"render",value:function(){var t=this;console.log("render");var e=this.state.showAll?this.state.notes:this.state.notes.filter(function(t){return!0===t.important}),n=this.state.showAll?"only important":"all";return a.a.createElement("div",null,a.a.createElement("h1",null,"Notes"),a.a.createElement(d,{message:this.state.error}),a.a.createElement("div",null,a.a.createElement("button",{onClick:this.toggleVisible},"Show ",n)),a.a.createElement("ul",null,e.map(function(e){return a.a.createElement(h,{key:e.id,note:e,toggleImportance:t.toggleImportanceOf(e.id)})})),a.a.createElement("form",{onSubmit:this.addNote},a.a.createElement("input",{value:this.state.newNote,onChange:this.handleNoteChange}),a.a.createElement("button",{type:"submit"},"Save note")))}}]),e}(a.a.Component);n(42);l.a.render(a.a.createElement(b,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.7a6f09f7.chunk.js.map