"use strict";var MD5=function(e){function f(a,b){return a<<b|a>>>32-b}function g(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f}function h(a,b,c){return a&b|~a&c}function i(a,b,c){return a&c|b&~c}function j(a,b,c){return a^b^c}function l(a,b,c){return b^(a|~c)}function m(e,a,b,c,d,i,j){return e=g(e,g(g(h(a,b,c),d),j)),g(f(e,i),a)}function n(e,a,b,c,d,h,j){return e=g(e,g(g(i(a,b,c),d),j)),g(f(e,h),a)}function o(e,a,b,c,d,h,i){return e=g(e,g(g(j(a,b,c),d),i)),g(f(e,h),a)}function p(e,a,b,c,d,h,i){return e=g(e,g(g(l(a,b,c),d),i)),g(f(e,h),a)}function q(a){for(var b,c=a.length,d=c+8,e=16*((d-d%64)/64+1),f=Array(e-1),g=0,h=0;h<c;)b=(h-h%4)/4,g=8*(h%4),f[b]|=a.charCodeAt(h)<<g,h++;return b=(h-h%4)/4,g=8*(h%4),f[b]|=128<<g,f[e-2]=c<<3,f[e-1]=c>>>29,f}function r(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=255&a>>>8*c,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d}function s(a){var b=String.fromCharCode;a=a.replace(/\r\n/g,"\n");for(var d,c="",e=0;e<a.length;e++)d=a.charCodeAt(e),128>d?c+=b(d):127<d&&2048>d?(c+=b(192|d>>6),c+=b(128|63&d)):(c+=b(224|d>>12),c+=b(128|63&d>>6),c+=b(128|63&d));return c}var t,k,u,v,w,y,a,b,c,d=[],x=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(e=s(e),d=q(e),y=1732584193,a=4023233417,b=2562383102,c=271733878,t=0;t<d.length;t+=16)k=y,u=a,v=b,w=c,y=m(y,a,b,c,d[t+0],x,3614090360),c=m(c,y,a,b,d[t+1],z,3905402710),b=m(b,c,y,a,d[t+2],A,606105819),a=m(a,b,c,y,d[t+3],B,3250441966),y=m(y,a,b,c,d[t+4],x,4118548399),c=m(c,y,a,b,d[t+5],z,1200080426),b=m(b,c,y,a,d[t+6],A,2821735955),a=m(a,b,c,y,d[t+7],B,4249261313),y=m(y,a,b,c,d[t+8],x,1770035416),c=m(c,y,a,b,d[t+9],z,2336552879),b=m(b,c,y,a,d[t+10],A,4294925233),a=m(a,b,c,y,d[t+11],B,2304563134),y=m(y,a,b,c,d[t+12],x,1804603682),c=m(c,y,a,b,d[t+13],z,4254626195),b=m(b,c,y,a,d[t+14],A,2792965006),a=m(a,b,c,y,d[t+15],B,1236535329),y=n(y,a,b,c,d[t+1],C,4129170786),c=n(c,y,a,b,d[t+6],D,3225465664),b=n(b,c,y,a,d[t+11],E,643717713),a=n(a,b,c,y,d[t+0],F,3921069994),y=n(y,a,b,c,d[t+5],C,3593408605),c=n(c,y,a,b,d[t+10],D,38016083),b=n(b,c,y,a,d[t+15],E,3634488961),a=n(a,b,c,y,d[t+4],F,3889429448),y=n(y,a,b,c,d[t+9],C,568446438),c=n(c,y,a,b,d[t+14],D,3275163606),b=n(b,c,y,a,d[t+3],E,4107603335),a=n(a,b,c,y,d[t+8],F,1163531501),y=n(y,a,b,c,d[t+13],C,2850285829),c=n(c,y,a,b,d[t+2],D,4243563512),b=n(b,c,y,a,d[t+7],E,1735328473),a=n(a,b,c,y,d[t+12],F,2368359562),y=o(y,a,b,c,d[t+5],G,4294588738),c=o(c,y,a,b,d[t+8],H,2272392833),b=o(b,c,y,a,d[t+11],I,1839030562),a=o(a,b,c,y,d[t+14],J,4259657740),y=o(y,a,b,c,d[t+1],G,2763975236),c=o(c,y,a,b,d[t+4],H,1272893353),b=o(b,c,y,a,d[t+7],I,4139469664),a=o(a,b,c,y,d[t+10],J,3200236656),y=o(y,a,b,c,d[t+13],G,681279174),c=o(c,y,a,b,d[t+0],H,3936430074),b=o(b,c,y,a,d[t+3],I,3572445317),a=o(a,b,c,y,d[t+6],J,76029189),y=o(y,a,b,c,d[t+9],G,3654602809),c=o(c,y,a,b,d[t+12],H,3873151461),b=o(b,c,y,a,d[t+15],I,530742520),a=o(a,b,c,y,d[t+2],J,3299628645),y=p(y,a,b,c,d[t+0],K,4096336452),c=p(c,y,a,b,d[t+7],L,1126891415),b=p(b,c,y,a,d[t+14],M,2878612391),a=p(a,b,c,y,d[t+5],N,4237533241),y=p(y,a,b,c,d[t+12],K,1700485571),c=p(c,y,a,b,d[t+3],L,2399980690),b=p(b,c,y,a,d[t+10],M,4293915773),a=p(a,b,c,y,d[t+1],N,2240044497),y=p(y,a,b,c,d[t+8],K,1873313359),c=p(c,y,a,b,d[t+15],L,4264355552),b=p(b,c,y,a,d[t+6],M,2734768916),a=p(a,b,c,y,d[t+13],N,1309151649),y=p(y,a,b,c,d[t+4],K,4149444226),c=p(c,y,a,b,d[t+11],L,3174756917),b=p(b,c,y,a,d[t+2],M,718787259),a=p(a,b,c,y,d[t+9],N,3951481745),y=g(y,k),a=g(a,u),b=g(b,v),c=g(c,w);var O=r(y)+r(a)+r(b)+r(c);return O.toLowerCase()};
"use strict";function getHash(){var a="c97a0c85709eb1a2a71994d9261ffbd6",b=new Date().getTime(),c=MD5(b+"ba63ece6936566ddc4bf1219499fd705b8e32934"+a);return c="?apikey="+a+"&ts="+b+"&hash="+c,c}function getMarvelUrl(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:100,c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,d="https://gateway.marvel.com/v1/public/";return d=d+a+getHash()+"&limit="+b+"&offset="+c,d}
"use strict";var app=angular.module("marvelApi",["LocalStorageModule"]);
"use strict";!function(k,a){var m=a.isDefined,q=a.isUndefined,d=a.isNumber,p=a.isObject,e=a.isArray,f=a.isString,c=a.extend,g=a.toJson;a.module("LocalStorageModule",[]).provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/",secure:!1},this.defaultToCookie=!0,this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(b){return this.prefix=b,this},this.setStorageType=function(b){return this.storageType=b,this},this.setDefaultToCookie=function(b){return this.defaultToCookie=!!b,this},this.setStorageCookie=function(d,a,b){return this.cookie.expiry=d,this.cookie.path=a,this.cookie.secure=b,this},this.setStorageCookieDomain=function(b){return this.cookie.domain=b,this},this.setNotify=function(c,d){return this.notify={setItem:c,removeItem:d},this},this.$get=["$rootScope","$window","$document","$parse","$timeout",function(j,a,h,i,b){function k(e){if(e||(e=a.event),r.setItem&&f(e.key)&&L(e.key)){var c=D(e.key);b(function(){j.$broadcast("LocalStorageModule.notification.changed",{key:c,newvalue:e.newValue,storageType:n.storageType})})}}var l,n=this,o=n.prefix,C=n.cookie,r=n.notify,s=n.storageType;h?h[0]&&(h=h[0]):h=document,"."!==o.substr(-1)&&(o=o?o+".":"");var t=function(b){return o+b},D=function(b){return b.replace(new RegExp("^"+o,"g"),"")},L=function(b){return 0===b.indexOf(o)},w=function(){try{var b=s in a&&null!==a[s],c=t("__"+Math.round(1e7*Math.random()));return b&&(l=a[s],l.setItem(c,""),l.removeItem(c)),b}catch(a){return n.defaultToCookie&&(s="cookie"),j.$broadcast("LocalStorageModule.notification.error",a.message),!1}},x=w(),M=function(a,h,d){var e=U();try{if(V(d),h=q(h)?null:g(h),!x&&n.defaultToCookie||"cookie"===n.storageType)return x||j.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.setItem&&j.$broadcast("LocalStorageModule.notification.setitem",{key:a,newvalue:h,storageType:"cookie"}),Q(a,h);try{l&&l.setItem(t(a),h),r.setItem&&j.$broadcast("LocalStorageModule.notification.setitem",{key:a,newvalue:h,storageType:n.storageType})}catch(b){return j.$broadcast("LocalStorageModule.notification.error",b.message),Q(a,h)}return!0}finally{V(e)}},N=function(a,b){var c=U();try{if(V(b),!x&&n.defaultToCookie||"cookie"===n.storageType)return x||j.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),R(a);var d=l?l.getItem(t(a)):null;if(!d||"null"===d)return null;try{return JSON.parse(d)}catch(b){return d}}finally{V(c)}},O=function(){var a=U();try{var b=0;1<=arguments.length&&("localStorage"===arguments[arguments.length-1]||"sessionStorage"===arguments[arguments.length-1])&&(b=1,V(arguments[arguments.length-1]));var c,d;for(c=0;c<arguments.length-b;c++)if(d=arguments[c],!x&&n.defaultToCookie||"cookie"===n.storageType)x||j.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.removeItem&&j.$broadcast("LocalStorageModule.notification.removeitem",{key:d,storageType:"cookie"}),S(d);else try{l.removeItem(t(d)),r.removeItem&&j.$broadcast("LocalStorageModule.notification.removeitem",{key:d,storageType:n.storageType})}catch(a){j.$broadcast("LocalStorageModule.notification.error",a.message),S(d)}}finally{V(a)}},P=function(){try{return a.navigator.cookieEnabled||"cookie"in h&&(0<h.cookie.length||-1<(h.cookie="test").indexOf.call(h.cookie,"test"))}catch(a){return j.$broadcast("LocalStorageModule.notification.error",a.message),!1}}(),Q=function(a,b,c,f){if(q(b))return!1;if((e(b)||p(b))&&(b=g(b)),!P)return j.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var k="",l=new Date,m="";if(null===b?(l.setTime(l.getTime()+-864e5),k="; expires="+l.toGMTString(),b=""):d(c)&&0!==c?(l.setTime(l.getTime()+1e3*(60*(60*(24*c)))),k="; expires="+l.toGMTString()):0!==C.expiry&&(l.setTime(l.getTime()+1e3*(60*(60*(24*C.expiry)))),k="; expires="+l.toGMTString()),a){var n="; path="+C.path;C.domain&&(m="; domain="+C.domain),"boolean"==typeof f?!0===f&&(m+="; secure"):!0===C.secure&&(m+="; secure"),h.cookie=t(a)+"="+encodeURIComponent(b)+k+n+m}}catch(a){return j.$broadcast("LocalStorageModule.notification.error",a.message),!1}return!0},R=function(a){if(!P)return j.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var b=h.cookie&&h.cookie.split(";")||[],c=0;c<b.length;c++){for(var d=b[c];" "===d.charAt(0);)d=d.substring(1,d.length);if(0===d.indexOf(t(a)+"=")){var e=decodeURIComponent(d.substring(o.length+a.length+1,d.length));try{var f=JSON.parse(e);return"number"==typeof f?e:f}catch(b){return e}}}return null},S=function(b){Q(b,null)},T=function(){for(var f=null,a=o.length,b=h.cookie.split(";"),c=0;c<b.length;c++){for(f=b[c];" "===f.charAt(0);)f=f.substring(1,f.length);var d=f.substring(a,f.indexOf("="));S(d)}},U=function(){return s},V=function(b){return b&&s!==b&&(s=b,x=w()),x};x&&(a.addEventListener?(a.addEventListener("storage",k,!1),j.$on("$destroy",function(){a.removeEventListener("storage",k)})):a.attachEvent&&(a.attachEvent("onstorage",k),j.$on("$destroy",function(){a.detachEvent("onstorage",k)})));return{isSupported:x,getStorageType:U,setStorageType:V,setPrefix:function N(b){o=b},set:M,add:M,get:N,keys:function C(a){var b=U();try{if(V(a),!x)return j.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),[];var c=o.length,d=[];for(var e in l)if(e.substr(0,c)===o)try{d.push(e.substr(c))}catch(a){return j.$broadcast("LocalStorageModule.notification.error",a.Description),[]}return d}finally{V(b)}},remove:O,clearAll:function D(a,b){var c=U();try{V(b);var d=o?new RegExp("^"+o):/(?:)/,e=a?new RegExp(a):/(?:)/;if(!x&&n.defaultToCookie||"cookie"===n.storageType)return x||j.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),T();if(!x&&!n.defaultToCookie)return!1;var f=o.length;for(var g in l)if(d.test(g)&&e.test(g.substr(f)))try{O(g.substr(f))}catch(a){return j.$broadcast("LocalStorageModule.notification.error",a.message),T()}return!0}finally{V(c)}},bind:function L(f,a,b,d,e){d=d||a;var g=N(d,e);return null===g&&m(b)?g=b:p(g)&&p(b)&&(g=c(g,b)),i(a).assign(f,g),f.$watch(a,function(b){M(d,b,e)},p(f[a]))},deriveKey:t,underiveKey:D,length:function M(b){var g=U();try{V(b);for(var c=0,d=a[s],e=0;e<d.length;e++)0===d.key(e).indexOf(o)&&c++;return c}finally{V(g)}},defaultToCookie:this.defaultToCookie,cookie:{isSupported:P,set:Q,add:Q,get:R,remove:S,clearAll:T}}}]})}(window,window.angular);
"use strict";app.controller("mainController",["$scope","$http","localStorageService",function(a,b,c){a.charactersUrl=getMarvelUrl("characters",10,0),a.posts=[],a.comicview=!1,a.total=10,a.pages=[],a.currentPage=0,a.lastPage=5,a.currentCharacter="",b.get(a.charactersUrl).success(function(b){a.posts=b.data.results,a.total=b.data.total;for(var c=0;c<a.total/10;c++)a.pages.push(c)}).error(function(a){console.log(a)}),a.searchCharacter=function(c){a.charactersUrl=getMarvelUrl("characters",10,a.currentPage)+("&nameStartsWith="+c),console.log(a.charactersUrl),b.get(a.charactersUrl).success(function(b){a.posts=b.data.results}).error(function(a){console.log(a)})},a.moreResults=function(){var c=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"characters",d=1<arguments.length&&arguments[1]!==void 0?arguments[1]:10,e=2<arguments.length&&arguments[2]!==void 0?arguments[2]:1,f=0;a.currentPage=e,a.lastPage=e+5,1<e&&(f=d*(e-1)-1),a.charactersUrl=getMarvelUrl(c,d,f),console.log(a.charactersUrl),b.get(a.charactersUrl).success(function(b){a.posts=b.data.results}).error(function(a){console.log(a)})},a.actualComic={title:"No comic selected",description:"No comic selected",URI:"No comic selected",thumbnail:"No comic selected",price:"No comic selected",url:"no comic selected"},a.changeActualComic=function(c){if(a.comicview=!a.comicview,"reset"===c)a.actualComic.title="No comic selected",a.actualComic.description="No comic selected",a.actualComic.URI="No comic selected",a.actualComic.thumbnail="No comic selected",a.actualComic.price="No comic selected",a.actualComic.url="No comic selected";else{c=c.replace("http","https"),c+=getHash(),console.log(c);var d={};b.get(c).success(function(b){d=b.data.results[0],console.log(d),a.actualComic.title=d.title,a.actualComic.description=1<d.description?d.description:"This comic doesn't have a description",a.actualComic.URI=d.resourceURI,a.actualComic.thumbnail=d.thumbnail.path+"."+d.thumbnail.extension,a.actualComic.price=d.prices[0].price,a.actualComic.url=d.urls[0].url,console.log(a.actualComic)}).error(function(a){console.log("error"+a)})}},a.favourites=c.get("favourites-list")?c.get("favourites-list"):[],a.$watchCollection("favourites",function(){c.set("favourites-list",a.favourites)}),a.addFavourite=function(c){c=c.replace("http","https"),c+=getHash(),console.log(c);var d={};b.get(c).success(function(b){d=b.data.results[0];var c=a.favourites.some(function(a){return a.the_id===d.id});3>a.favourites.length?c?alert("You can't add the same comic more than 1 time"):a.favourites.push({the_id:d.id,title:d.title,thumbnail:d.thumbnail.path+"."+d.thumbnail.extension}):alert("You can't add more than 3 comics"),a.changeActualComic("reset")}).error(function(a){console.log("error"+a)})},a.deleteFavourite=function(b){a.favourites.splice(findWithAttr(a.favourites,"the_id",b),1)}}]);function findWithAttr(a,b,c){for(var d=0;d<a.length;d+=1)if(a[d][b]===c)return d;return-1}
//# sourceMappingURL=final.js.map
