(function(){var e,t,n,r,o,i,u,s,a,c,l,d,f,h=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){return window.setTimeout(e,1e3/60)}}(),d=function(e,t){return setTimeout(t,e)},r=function(){var e,t,n,r,o;for(r=window.location.hash.substring(1).split("-"),o=[],t=0,n=r.length;n>t;t++)e=r[t],e&&o.push(e);return o},u=function(e){return h.call(r(),e)>=0?i(e):n(e)},i=function(e){return window.location.hash=r().filter(function(t){return t!==e}).join("-")},n=function(e){return h.call(r(),e)<0?window.location.hash=r().concat(e).sort(function(e,t){return parseInt(e,16)-parseInt(t,16)}).join("-"):void 0},o=function(e){return window.location.hash=e.sort(function(e,t){return parseInt(e,16)-parseInt(t,16)}).join("-")},null==localStorage.hash||r().length||(window.location.hash=localStorage.hash),s=function(){var e,t,n,r,o;for(r=document.querySelectorAll("[data-src]"),o=[],t=0,n=r.length;n>t;t++)e=r[t],e.getBoundingClientRect().top<1.1*window.innerHeight&&("IMG"===e.tagName?e.src=e.dataset.src:e.style.backgroundImage="url("+e.dataset.src+")",o.push(delete e.dataset.src));return o},t=!1,e=new Vue({el:"#app",data:{feeds:[],items:[],loaded:[],settings:!1,current:!1,sleep:!1},watch:{hashlist:function(){return e.feeds.reverse().reverse()},items:function(){return Vue.nextTick(s)},current:function(){return Vue.nextTick(s),e.settings?void 0:window.scrollTo(0,document.body.scrollTop+(document.getElementById("board").getBoundingClientRect().top-70))},settings:function(){return window.scrollTo(0,0),Vue.nextTick(e.settings===!0?function(){return c(function(t){return e.feeds=t},!1),document.getElementById("search").focus()}:s)}},methods:{setCurrent:function(t,n){var o,i,u;return e.$set("current",h.call(r(),t)>=0?t:!1),u=[document.getElementById("nav"),document.getElementById("feed-"+t)],o=u[0],i=u[1],o.scrollLeft=t===!1?0:i.offsetLeft+i.offsetWidth/2-(o.offsetLeft+o.offsetWidth/2)},prev:function(){return e.setCurrent((e.current?document.getElementById("feed-"+e.current).previousElementSibling:document.querySelector(".nav-tab:last-child")).getAttribute("id").replace("feed-",""))},next:function(){return e.setCurrent((document.getElementById("feed-"+e.current).nextElementSibling||document.querySelector(".nav-tab")).getAttribute("id").replace("feed-",""))},toggleFeed:function(e){return u(e)}},filters:{datetime:function(e){return[e.getFullYear(),e.getMonth()+1,e.getDate()].join("-")+" "+[e.getHours(),e.getMinutes(),e.getSeconds()].join(":")},day:function(e){return e.getMonth()+1+"/"+e.getDate()},feedsOn:function(e){return e.filter(function(e){var t;return t=e.id,h.call(r(),t)>=0})},matchFeed:function(e,t){return e.filter(function(e){return t===!1||t===e.feed})}},ready:function(){return window.addEventListener("scroll",function(){return requestAnimFrame(s)}),window.addEventListener("keydown",function(t){switch(t.which){case 27:return t.preventDefault(),e.$set("settings",!e.settings);case 37:return t.preventDefault(),e.prev();case 39:return t.preventDefault(),e.next()}}),t=d(3e3,function(){return e.$set("sleep",!0)})}}),f=function(){var t,n,i,u,s,c,l;for(r().length||o(function(){var n,r,o,i;for(o=e.feeds,i=[],n=0,r=o.length;r>n;n++)t=o[n],"1"===t.status&&i.push(t.id);return i}()),localStorage.hash=window.location.hash.substring(1),c=r(),u=0,s=c.length;s>u;u++)n=c[u],h.call(function(){var t,n,r,o;for(r=e.items,o=[],t=0,n=r.length;n>t;t++)i=r[t],i.feed&&o.push(i.feed);return o}(),n)<0&&a(n);return e.items=e.items.filter(function(e){var t;return t=e.feed,h.call(r(),t)>=0}),l=e.current,h.call(r(),l)<0&&e.$set("current",!1),e.$set("hashlist",r())},l=[],a=function(n){var r;return r=e.feeds.filter(function(e){return e.id===n}).pop(),null==r||h.call(l,n)>=0?void 0:(l.push(n),Vue.http.jsonp("http://aboardio.herokuapp.com/?num=100&q="+r.feed).then(function(o){var i,u,s,a,c;for(s=function(){var e,t,n,s;for(n=o.data.responseData.feed.entries,s=[],e=0,t=n.length;t>e;e++)u=n[e],s.push({feed:r.id,source:r.domain,title:u.title,author:u.author,date:new Date(u.publishedDate),url:u.link,image:(i=u.content.match(/<img[^<>]+src=[\"\']([^\"\']+)[\"\'][^<>]*>/))?i[1].replace(/\&amp;/g,"&"):!1});return s}(),a=0,c=s.length;c>a;a++)u=s[a],u.image&&e.items.push(u);return clearTimeout(t),l.splice(l.indexOf(n),1),e.loaded.push(n)},function(e){return i(n)}))},c=function(e,t){return null==t&&(t=!0),localStorage.feeds&&t?e(JSON.parse(localStorage.feeds)):Vue.http.jsonp("http://spreadsheets.google.com/feeds/list/1QgkAchwwtS8IH9GPBD-LPLY41_okXHGHw7UTFGa-a18/od6/public/basic?alt=json-in-script").then(function(t){var n,r;return r=function(){var e,r,o,i;for(o=t.data.feed.entry,i=[],e=0,r=o.length;r>e;e++)n=o[e],i.push(JSON.parse('{"id":"'+n.title.$t+'", '+n.content.$t.replace(/([a-z]+)[\s]*\:[\s]*([^,]+)/g,'"$1":"$2"')+"}"));return i}().filter(function(e){return"0"!==e.online}),localStorage.feeds=JSON.stringify(r),e(r)})},e instanceof Vue&&!function(){return document.body.removeChild(document.getElementById("no-js")),document.getElementById("app").style.display="block",c(function(t){return e.feeds=t,o(r()),f(),window.addEventListener("hashchange",f)})}()}).call(this);
