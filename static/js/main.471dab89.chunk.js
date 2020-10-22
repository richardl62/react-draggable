(this["webpackJsonpdraggable-tutorial"]=this["webpackJsonpdraggable-tutorial"]||[]).push([[0],{24:function(e,n,t){e.exports=t(31)},30:function(e,n,t){},31:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t.n(r),a=t(20),i=t.n(a),o=t(3),l=t(4),u=t(12),s=t(10),h=t(11),d=t(34),m="piece",v=["bC","bK","bB","bQ","bK","bP"],b=["wC","wK","wB","wQ","wK","wP"],f=v.concat(b),P=0;function w(e){var n=e.corePiece,t=Object(d.a)({item:{type:m,id:n.id}}),r=Object(h.a)(t,2)[1];return c.a.createElement("div",{className:"piece",ref:r},n.name)}var p=function(){function e(n){var t=n.name,r=n.dragBehaviour;if(Object(o.a)(this,e),!f.includes(t))throw new Error("CorePiece given unrecognised piece name: ".concat(t));if(!["move","copy"].includes(r))throw new Error("CorePiece give unrecognised drag behaviour: ".concat(r));++P,this._id=P,this._name=t,this._moveWhenDragged="move"===r,Object.freeze(this)}return Object(l.a)(e,[{key:"id",get:function(){return this._id}},{key:"name",get:function(){return this._name}},{key:"moveWhenDragged",get:function(){return this.__moveWhenDragged}},{key:"copyWhenDragged",get:function(){return!this._moveWhenDragged}}]),e}(),g=[["bC","bK","bB","bQ","bK","bB","bK","bC"],["bP","bP","bP","bP","bP","bP","bP","bP"],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],["wP","wP","wP","wP","wP","wP","wP","wP"],["wC","wK","wB","wQ","wK","wB","wK","wC"]];g.topLeftBlack=!0,Object.freeze(g);var y=function(){function e(n){Object(o.a)(this,e),n?(this._corePieces=n._corePieces,this._topPieces=n._corePieces):(this._corePieces=g.map((function(e){return e.map((function(e){return e?new p({name:e,dragBehaviour:"move"}):null}))})),this._topLeftBlack=!1),Object.seal(this)}return Object(l.a)(e,[{key:"corePiece",value:function(e,n,t){if(void 0===this._corePieces[e][n])throw new Error("Invalid row or column number: ".concat(e," ").concat(n));return void 0!==t&&(this._corePieces[e][n]=t),this._corePieces[e][n]}},{key:"isBlack",value:function(e,n){return(e+n)%2===0?this._topLeftBlack:!this._topLeftBlack}},{key:"findCorePiecebyId",value:function(e){for(var n=0;n<this.nRows;++n)for(var t=0;t<this.nCols;++t){var r=this._corePieces[n][t];if(r&&r.id===e)return{row:n,col:t,piece:r}}return null}},{key:"nRows",get:function(){return this._corePieces.length}},{key:"nCols",get:function(){return this._corePieces[0].length}}]),e}(),k=t(35),_=function(e){Object(u.a)(t,e);var n=Object(s.a)(t);function t(){return Object(o.a)(this,t),n.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){var e=this.props,n=e.black,t=e.children,r="square"+(n?" blackSquare":"");return c.a.createElement("div",{className:r},t)}}]),t}(c.a.PureComponent);function O(e){var n=e.corePiece,t=e.movePiece,r=e.isBlack,a=e.row,i=e.col,o=Object(k.a)({accept:m,drop:function(e){return t(e.id,a,i)},collect:function(e){return{isOver:!!e.isOver()}}}),l=Object(h.a)(o,2)[1];return c.a.createElement("div",{ref:l,style:{position:"relative",width:"100%",height:"100%"}},c.a.createElement(_,{black:r},n?c.a.createElement(w,{corePiece:n}):null))}function E(e){for(var n=e.layout,t=e.movePiece,r=n.nRows,a=n.nCols,i=[],o=0;o<r;++o)for(var l=0;l<a;++l)i.push(c.a.createElement(O,{corePiece:n.corePiece(o,l),movePiece:t,index:i.length,key:[o,l],isBlack:n.isBlack(o,l),row:o,col:l}));var u={display:"grid",gridTemplateColumns:"repeat(".concat(a,",50px)"),gridTemplateRows:"repeat(".concat(r,",50px)"),width:"fit-content"};return c.a.createElement("div",{className:"board",style:u},i)}var B=t(33),C=t(22);function j(e){var n=e.corePieces;return c.a.createElement("div",{className:"permanentPieces"},n.map((function(e,n){return c.a.createElement(w,{corePiece:e,index:n,key:e.id})})))}var K=function(e){Object(u.a)(t,e);var n=Object(s.a)(t);function t(){var e;function r(e){return new p({name:e,dragBehaviour:"copy"})}Object(o.a)(this,t),(e=n.call(this)).movePiece=function(n,t,r){var c=new y(e.state.boardLayout),a=c.findCorePiecebyId(n);if(a)t===a.row&&r===a.col||(c.corePiece(t,r,a.piece),c.corePiece(a.row,a.col,null));else{var i=e._CopyOnDragPieces.all.find((function(e){return e.id===n}));if(!i)throw new Error("Piece with id ".concat(n," not found"));c.corePiece(t,r,new p({name:i.name,dragBehaviour:"move"}))}e.setState({boardLayout:c})},e.state={boardLayout:new y};var c=v.map(r),a=b.map(r);return e._CopyOnDragPieces={black:c,white:a,all:c.concat(a)},e}return Object(l.a)(t,[{key:"render",value:function(){return c.a.createElement(B.a,{backend:C.a},c.a.createElement("div",{className:"chess-game"},c.a.createElement(j,{corePieces:this._CopyOnDragPieces.black}),c.a.createElement(E,{layout:this.state.boardLayout,movePiece:this.movePiece}),c.a.createElement(j,{corePieces:this._CopyOnDragPieces.white})))}}]),t}(c.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(30);var D=document.getElementById("root");i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(K,null)),D),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.471dab89.chunk.js.map