const exitButton=document.getElementById("exitGame"),startFirstPlayer=document.querySelector(".starter .firstPlayer fieldset"),game=document.querySelector(".game"),gameBoard=game.querySelector(".board"),gamePlayersDiv=game.querySelector(".players"),lines=document.querySelectorAll(".line"),resetButton=document.getElementById("restartGame"),startButton=document.getElementById("startGame"),starterForm=document.querySelector(".starter"),startGamemode=document.querySelector(".starter .gamemode fieldset");startGamemode.addEventListener("click",e=>{e=e.target.value;"computer"==e?(startFirstPlayer.querySelector("label[for='first']").textContent="Player",startFirstPlayer.querySelector("label[for='second']").textContent="Computer",gamePlayersDiv.querySelector(".player1").textContent="Player",gamePlayersDiv.querySelector(".player2").textContent="Computer"):"two_player"==e&&(startFirstPlayer.querySelector("label[for='first']").textContent="Blue",startFirstPlayer.querySelector("label[for='second']").textContent="Red",gamePlayersDiv.querySelector(".player1").textContent="Blue",gamePlayersDiv.querySelector(".player2").textContent="Red")}),exitButton.addEventListener("click",()=>{director.exitGame()}),resetButton.addEventListener("click",()=>{console.clear(),director.restartGame()}),startButton.addEventListener("click",()=>{director.startGame()});let bot=e=>{const d=1;let n=()=>{var t=board.getPossibleMoves();let a=t.length;if(!(a<=0)){let e,r;for(;0<a;){var o=s(a),[l,,]=([e,r]=t[o],board.update(e,r,d),board.checkLoser(d));if(board.remove(e,r),!l)break;t.splice(o,1),a=t.length}return[e,r]}};function s(e){return Math.floor(Math.random()*e)}let r;return r="hard"===e?()=>{var a=board.getPossibleMoves(),o=a.length;if(!(o<=0)){if(10<o)return n();let e=Number.NEGATIVE_INFINITY;var l,s;let r,t;for(s of a)if(board.update(s[0],s[1],d),l=function r(e,t,a,o){let l=board.getPossibleMoves();let s=l.length;let[d]=board.checkLoser(t);let n;if(d)return e?-s:Math.max(1,s);{if(e){let e=Number.NEGATIVE_INFINITY;for(var i of l)if(board.update(i[0],i[1],t),n=r(!1,1-t,a,o),board.remove(i[0],i[1]),e=Math.max(e,n),a=Math.max(a,n),o<=a)break;return e}{let e=Number.POSITIVE_INFINITY;for(var u of l)board.update(u[0],u[1],t),n=r(!0,1-t,a,o),board.remove(u[0],u[1]),e=Math.min(e,n),o=Math.min(o,n);return e}}}(!0,d),board.remove(s[0],s[1]),e<l&&(e=l,r=s[0],t=s[1]),15==e)break;return[r,t]}}:"medium"===e?n:()=>{var e=board.getPossibleMoves(),r=e.length;if(!(r<=0))return[e,r]=e[s(r)],[e,r]},Object.assign({},{move:r})};const board=(()=>{let n=new Map,i=[];let u=(r,t,a,o,l,s)=>{if(n.has(l+","+s)&&t==n.get(l+","+s)){if(2==r)return!!n.has(a+","+s)&&t==n.get(a+","+s)&&(i.push([a,s]),!0);for(let e=(l=s)+1;e<7;e++){var d=u(r+1,t,a,o,l,e);if(d)return i.push([l,e]),d}}return!1};return Object.assign({},{checkLoser:e=>{let r=!1;for(var[t,a]of n)if(i=[],a==e){var[a,t]=t.split(",");if(i.push([+a,+t]),r=u(1,e,+a,+t,+a,+t))break}return[r,i]},getPossibleMoves:()=>{var e,r=[];for(e of[[1,2],[1,3],[1,4],[1,5],[1,6],[2,3],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6],[4,5],[4,6],[5,6]])n.has(e[0]+","+e[1])||r.push([e[0],e[1]]);return r},resetBrain:()=>{n.clear()},update:(e,r,t)=>{n.set(e+","+r,t)},remove:(e,r)=>{n.delete(e+","+r)},boardMap:n})})(),director=(()=>{let a,o,l,s,t=(e,r)=>{board.update(e,r,l),displayController.updateMarker(e,r,l)},d=()=>{displayController.disableBoard(),setTimeout(()=>{var[e,r]=a.move(),[e,r]=(t(e,r),board.checkLoser(l));e?n(1-l,r):(l=1-l,displayController.updateCurrentPlayer(l),displayController.enableBoard())},1e3)},n=(e,r)=>{e=e?"Red":"Blue",console.log(`Winner: ${e}, Triangle: `+r),displayController.disableBoard(),displayController.markTriangle(r)};let i=()=>{l=o,displayController.resetBoard(l),board.resetBrain(),o&&"computer"===s&&d()};return Object.assign({},{exitGame:()=>{displayController.hideBoard(),displayController.showStarter()},makeMove:e=>{var r;""===e.getAttribute("marker")&&([e,r]=e.getAttribute("coordinates").split(","),[e,r]=(t(+e,+r),board.checkLoser(l)),e?n(1-l,r):(l=1-l,displayController.updateCurrentPlayer(l),"computer"===s&&d()))},restartGame:i,startGame:()=>{var e,r,t;for(e of document.getElementsByName("symbol"))e.checked&&(o=+e.value,l=o);for(r of document.getElementsByName("gamemode"))r.checked&&(s=r.value);if("two_player"!==s)for(t of document.getElementsByName("difficulty"))t.checked&&(a=bot(t.value));displayController.hideStarter(),displayController.showBoard(),i()}})})(),displayController=(()=>{let a=0;for(let e of lines)e.addEventListener("click",()=>{director.makeMove(e)});let t=()=>{gameBoard.classList.remove("disabled")};let o=e=>{e?game.classList.add("p2"):game.classList.remove("p2")};return Object.assign({},{disableBoard:()=>{gameBoard.classList.add("disabled")},enableBoard:t,hideBoard:()=>{game.style.display="none"},hideStarter:()=>{starterForm.style.display="none"},markTriangle:e=>{for(var r of e){r=gameBoard.querySelector(`div[coordinates="${r[0]},${r[1]}"]`);r.classList.add("losingTriangle"),r.style=""}},resetBoard:e=>{for(var r of lines)r.setAttribute("marker",""),r.style.zIndex="",r.classList.remove("losingTriangle");t(),o(e),a=0},showBoard:()=>{game.style.display="grid"},showStarter:()=>{starterForm.style.display="block"},updateCurrentPlayer:o,updateMarker:(e,r,t)=>{e=((e,r)=>{for(var t of lines)if(t.getAttribute("coordinates")==e+","+r)return t;return null})(e,r);e&&(e.setAttribute("marker",t),a++,e.style.zIndex=a)}})})();