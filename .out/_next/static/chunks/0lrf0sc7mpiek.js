(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,77495,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},39370,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return b},MiddlewareNotFoundError:function(){return w},MissingStaticPage:function(){return x},NormalizeError:function(){return y},PageNotFoundError:function(){return v},SP:function(){return g},ST:function(){return m},WEB_VITALS:function(){return a},execOnce:function(){return o},getDisplayName:function(){return d},getLocationOrigin:function(){return c},getURL:function(){return u},isAbsoluteUrl:function(){return l},isResSent:function(){return p},loadGetInitialProps:function(){return f},normalizeRepeatedSlashes:function(){return h},stringifyError:function(){return S}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>s.test(e);function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=c();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function h(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function f(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let g="u">typeof performance,m=g&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class b extends Error{}class y extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class x extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class w extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function S(e){return JSON.stringify({message:e.message,stack:e.stack})}},13467,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});function a(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function o(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,o(e));else t.set(r,o(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},25465,e=>{"use strict";let t;var r,n=e.i(69945);let i=Object.freeze({left:0,top:0,width:16,height:16}),a=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),o=Object.freeze({...i,...a}),s=Object.freeze({...o,body:"",hidden:!1});function l(e,t){let r,n,i=(r={},!e.hFlip!=!t.hFlip&&(r.hFlip=!0),!e.vFlip!=!t.vFlip&&(r.vFlip=!0),(n=((e.rotate||0)+(t.rotate||0))%4)&&(r.rotate=n),r);for(let r in s)r in a?r in e&&!(r in i)&&(i[r]=a[r]):r in t?i[r]=t[r]:r in e&&(i[r]=e[r]);return i}function c(e,t){let r,n,i,a=[];if("object"!=typeof e||"object"!=typeof e.icons)return a;e.not_found instanceof Array&&e.not_found.forEach(e=>{t(e,null),a.push(e)});let o=(r=e.icons,n=e.aliases||Object.create(null),i=Object.create(null),Object.keys(r).concat(Object.keys(n)).forEach(function e(t){if(r[t])return i[t]=[];if(!(t in i)){i[t]=null;let r=n[t]&&n[t].parent,a=r&&e(r);a&&(i[t]=[r].concat(a))}return i[t]}),i);for(let r in o){let n=o[r];n&&(t(r,function(e,t,r){let n=e.icons,i=e.aliases||Object.create(null),a={};function o(e){a=l(n[e]||i[e],a)}return o(t),r.forEach(o),l(e,a)}(e,r,n)),a.push(r))}return a}let u={provider:"",aliases:{},not_found:{},...i};function d(e,t){for(let r in t)if(r in e&&typeof e[r]!=typeof t[r])return!1;return!0}function p(e){if("object"!=typeof e||null===e||"string"!=typeof e.prefix||!e.icons||"object"!=typeof e.icons||!d(e,u))return null;let t=e.icons;for(let e in t){let r=t[e];if(!e||"string"!=typeof r.body||!d(r,s))return null}let r=e.aliases||Object.create(null);for(let e in r){let n=r[e],i=n.parent;if(!e||"string"!=typeof i||!t[i]&&!r[i]||!d(n,s))return null}return e}let h=Object.create(null);function f(e,t){let r=h[e]||(h[e]=Object.create(null));return r[t]||(r[t]={provider:e,prefix:t,icons:Object.create(null),missing:new Set})}function g(e,t){return p(t)?c(t,(t,r)=>{r?e.icons[t]=r:e.missing.add(t)}):[]}let m=/^[a-z0-9]+(-[a-z0-9]+)*$/,b=(e,t,r,n="")=>{let i=e.split(":");if("@"===e.slice(0,1)){if(i.length<2||i.length>3)return null;n=i.shift().slice(1)}if(i.length>3||!i.length)return null;if(i.length>1){let e=i.pop(),r=i.pop(),a={provider:i.length>0?i[0]:n,prefix:r,name:e};return t&&!y(a)?null:a}let a=i[0],o=a.split("-");if(o.length>1){let e={provider:n,prefix:o.shift(),name:o.join("-")};return t&&!y(e)?null:e}if(r&&""===n){let e={provider:n,prefix:"",name:a};return t&&!y(e,r)?null:e}return null},y=(e,t)=>!!e&&!!((t&&""===e.prefix||e.prefix)&&e.name),v=!1;function x(e){return"boolean"==typeof e&&(v=e),v}function w(e){let t="string"==typeof e?b(e,!0,v):e;if(t){let e=f(t.provider,t.prefix),r=t.name;return e.icons[r]||(e.missing.has(r)?null:void 0)}}function S(e,t){let r=b(e,!0,v);if(!r)return!1;let n=f(r.provider,r.prefix);if(!t)return n.missing.add(r.name),!0;var i=r.name;try{if("string"==typeof t.body)return n.icons[i]={...t},!0}catch(e){}return!1}function k(e,t){if("object"!=typeof e)return!1;if("string"!=typeof t&&(t=e.provider||""),v&&!t&&!e.prefix){let t=!1;return p(e)&&(e.prefix="",c(e,(e,r)=>{S(e,r)&&(t=!0)})),t}let r=e.prefix;return!!y({prefix:r,name:"a"})&&!!g(f(t,r),e)}let C=Object.freeze({width:null,height:null}),T=Object.freeze({...C,...a}),j=/(-?[0-9.]*[0-9]+[0-9.]*)/g,I=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function L(e,t,r){if(1===t)return e;if(r=r||100,"number"==typeof e)return Math.ceil(e*t*r)/r;if("string"!=typeof e)return e;let n=e.split(j);if(null===n||!n.length)return e;let i=[],a=n.shift(),o=I.test(a);for(;;){if(o){let e=parseFloat(a);isNaN(e)?i.push(a):i.push(Math.ceil(e*t*r)/r)}else i.push(a);if(void 0===(a=n.shift()))return i.join("");o=!o}}function _(e,t){let r,n,i={...o,...e},a={...T,...t},s={left:i.left,top:i.top,width:i.width,height:i.height},l=i.body;[i,a].forEach(e=>{var t,r,n,i;let a,o,c=[],u=e.hFlip,d=e.vFlip,p=e.rotate;switch(u?d?p+=2:(c.push("translate("+(s.width+s.left).toString()+" "+(0-s.top).toString()+")"),c.push("scale(-1 1)"),s.top=s.left=0):d&&(c.push("translate("+(0-s.left).toString()+" "+(s.height+s.top).toString()+")"),c.push("scale(1 -1)"),s.top=s.left=0),p<0&&(p-=4*Math.floor(p/4)),p%=4){case 1:c.unshift("rotate(90 "+(a=s.height/2+s.top).toString()+" "+a.toString()+")");break;case 2:c.unshift("rotate(180 "+(s.width/2+s.left).toString()+" "+(s.height/2+s.top).toString()+")");break;case 3:c.unshift("rotate(-90 "+(a=s.width/2+s.left).toString()+" "+a.toString()+")")}p%2==1&&(s.left!==s.top&&(a=s.left,s.left=s.top,s.top=a),s.width!==s.height&&(a=s.width,s.width=s.height,s.height=a)),c.length&&(t=l,r='<g transform="'+c.join(" ")+'">',n=(o=function(e,t="defs"){let r="",n=e.indexOf("<"+t);for(;n>=0;){let i=e.indexOf(">",n),a=e.indexOf("</"+t);if(-1===i||-1===a)break;let o=e.indexOf(">",a);if(-1===o)break;r+=e.slice(i+1,a).trim(),e=e.slice(0,n).trim()+e.slice(o+1)}return{defs:r,content:e}}(t)).defs,i=r+o.content+"</g>",l=n?"<defs>"+n+"</defs>"+i:i)});let c=a.width,u=a.height,d=s.width,p=s.height;null===c?r=L(n=null===u?"1em":"auto"===u?p:u,d/p):(r="auto"===c?d:c,n=null===u?L(r,p/d):"auto"===u?p:u);let h={},f=(e,t)=>{"unset"!==t&&"undefined"!==t&&"none"!==t&&(h[e]=t.toString())};f("width",r),f("height",n);let g=[s.left,s.top,d,p];return h.viewBox=g.join(" "),{attributes:h,viewBox:g,body:l}}let E=/\sid="(\S+)"/g,$="IconifyId"+Date.now().toString(16)+(0x1000000*Math.random()|0).toString(16),A=0;function F(e,t=$){let r,n=[];for(;r=E.exec(e);)n.push(r[1]);if(!n.length)return e;let i="suffix"+(0x1000000*Math.random()|Date.now()).toString(16);return n.forEach(r=>{let n="function"==typeof t?t(r):t+(A++).toString(),a=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(RegExp('([#;"])('+a+')([")]|\\.[a-z])',"g"),"$1"+n+i+"$3")}),e=e.replace(RegExp(i,"g"),"")}let R=Object.create(null);function P(e){return R[e]||R[""]}function O(e){let t;if("string"==typeof e.resources)t=[e.resources];else if(!((t=e.resources)instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:!0===e.random,index:e.index||0,dataAfterTimeout:!1!==e.dataAfterTimeout}}let z=Object.create(null),N=["https://api.simplesvg.com","https://api.unisvg.com"],q=[];for(;N.length>0;)1===N.length||Math.random()>.5?q.push(N.shift()):q.push(N.pop());function M(e,t){let r=O(t);return null!==r&&(z[e]=r,!0)}z[""]=O({resources:["https://api.iconify.design"].concat(q)});let D=(()=>{let e;try{if(e=fetch,"function"==typeof e)return e}catch(e){}})();function B(e,t){e.forEach(e=>{let r=e.loaderCallbacks;r&&(e.loaderCallbacks=r.filter(e=>e.id!==t))})}let W=0,H={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function U(e){let t={...H,...e},r=[];function n(){r=r.filter(e=>"pending"===e().status)}return{query:function(e,i,a){let o=function(e,t,r,n){let i,a,o=e.resources.length,s=e.random?Math.floor(Math.random()*o):e.index;if(e.random){let t=e.resources.slice(0);for(i=[];t.length>1;){let e=Math.floor(Math.random()*t.length);i.push(t[e]),t=t.slice(0,e).concat(t.slice(e+1))}i=i.concat(t)}else i=e.resources.slice(s).concat(e.resources.slice(0,s));let l=Date.now(),c="pending",u=0,d=null,p=[],h=[];function f(){d&&(clearTimeout(d),d=null)}function g(){"pending"===c&&(c="aborted"),f(),p.forEach(e=>{"pending"===e.status&&(e.status="aborted")}),p=[]}function m(e,t){t&&(h=[]),"function"==typeof e&&h.push(e)}function b(){c="failed",h.forEach(e=>{e(void 0,a)})}function y(){p.forEach(e=>{"pending"===e.status&&(e.status="aborted")}),p=[]}return"function"==typeof n&&h.push(n),setTimeout(function n(){if("pending"!==c)return;f();let o=i.shift();if(void 0===o){if(p.length){d=setTimeout(()=>{f(),"pending"===c&&(y(),b())},e.timeout);return}b();return}let s={status:"pending",resource:o,callback:(t,r)=>{!function(t,r,o){let s="success"!==r;switch(p=p.filter(e=>e!==t),c){case"pending":break;case"failed":if(s||!e.dataAfterTimeout)return;break;default:return}if("abort"===r){a=o,b();return}if(s){a=o,p.length||(i.length?n():b());return}if(f(),y(),!e.random){let r=e.resources.indexOf(t.resource);-1!==r&&r!==e.index&&(e.index=r)}c="completed",h.forEach(e=>{e(o)})}(s,t,r)}};p.push(s),u++,d=setTimeout(n,e.rotate),r(o,t,s.callback)}),function(){return{startTime:l,payload:t,status:c,queriesSent:u,queriesPending:p.length,subscribe:m,abort:g}}}(t,e,i,(e,t)=>{n(),a&&a(e,t)});return r.push(o),o},find:function(e){return r.find(t=>e(t))||null},setIndex:e=>{t.index=e},getIndex:()=>t.index,cleanup:n}}function X(){}let G=Object.create(null);function K(e,t,r){let n,i;if("string"==typeof e){let t=P(e);if(!t)return r(void 0,424),X;i=t.send;let a=function(e){if(!G[e]){let t=z[e];if(!t)return;let r=U(t);G[e]={config:t,redundancy:r}}return G[e]}(e);a&&(n=a.redundancy)}else{let t=O(e);if(t){n=U(t);let r=P(e.resources?e.resources[0]:"");r&&(i=r.send)}}return n&&i?n.query(t,i,r)().abort:(r(void 0,424),X)}function V(){}function Y(e,t,r){function n(){let r=e.pendingIcons;t.forEach(t=>{r&&r.delete(t),e.icons[t]||e.missing.add(t)})}if(r&&"object"==typeof r)try{if(!g(e,r).length)return void n()}catch(e){console.error(e)}n(),e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;let t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let r=!1,n=e.provider,i=e.prefix;t.forEach(t=>{let a=t.icons,o=a.pending.length;a.pending=a.pending.filter(t=>{if(t.prefix!==i)return!0;let o=t.name;if(e.icons[o])a.loaded.push({provider:n,prefix:i,name:o});else{if(!e.missing.has(o))return r=!0,!0;a.missing.push({provider:n,prefix:i,name:o})}return!1}),a.pending.length!==o&&(r||B([e],t.id),t.callback(a.loaded.slice(0),a.missing.slice(0),a.pending.slice(0),t.abort))})}))}))}function Q(e,t){e instanceof Promise?e.then(e=>{t(e)}).catch(()=>{t(null)}):t(e)}let J=(e,t)=>{var r;let n,i,a,o,s,l=(r=function(e,t=!0,r=!1){let n=[];return e.forEach(e=>{let i="string"==typeof e?b(e,t,r):e;i&&n.push(i)}),n}(e,!0,x()),a={loaded:[],missing:[],pending:[]},o=Object.create(null),r.sort((e,t)=>e.provider!==t.provider?e.provider.localeCompare(t.provider):e.prefix!==t.prefix?e.prefix.localeCompare(t.prefix):e.name.localeCompare(t.name)),s={provider:"",prefix:"",name:""},r.forEach(e=>{if(s.name===e.name&&s.prefix===e.prefix&&s.provider===e.provider)return;s=e;let t=e.provider,r=e.prefix,n=e.name,i=o[t]||(o[t]=Object.create(null)),l=i[r]||(i[r]=f(t,r));(n in l.icons?a.loaded:""===r||l.missing.has(n)?a.missing:a.pending).push({provider:t,prefix:r,name:n})}),a);if(!l.pending.length){let e=!0;return t&&setTimeout(()=>{e&&t(l.loaded,l.missing,l.pending,V)}),()=>{e=!1}}let c=Object.create(null),u=[];return l.pending.forEach(e=>{let{provider:t,prefix:r}=e;if(r===i&&t===n)return;n=t,i=r,u.push(f(t,r));let a=c[t]||(c[t]=Object.create(null));a[r]||(a[r]=[])}),l.pending.forEach(e=>{let{provider:t,prefix:r,name:n}=e,i=f(t,r),a=i.pendingIcons||(i.pendingIcons=new Set);a.has(n)||(a.add(n),c[t][r].push(n))}),u.forEach(e=>{let t=c[e.provider][e.prefix];t.length&&(e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{let t,r;e.iconsQueueFlag=!1;let{provider:n,prefix:i}=e,a=e.iconsToLoad;if(delete e.iconsToLoad,!a||!a.length)return;let o=e.loadIcon;if(e.loadIcons&&(a.length>1||!o))return void Q(e.loadIcons(a,i,n),t=>{Y(e,a,t)});if(o)return void a.forEach(t=>{Q(o(t,i,n),r=>{let n=r?{prefix:i,icons:{[t]:r}}:null;Y(e,[t],n)})});let{valid:s,invalid:l}=(t=[],r=[],a.forEach(e=>{(e.match(m)?t:r).push(e)}),{valid:t,invalid:r});if(l.length&&Y(e,l,null),!s.length)return;let c=i.match(m)?P(n):null;c?c.prepare(n,i,s).forEach(t=>{K(n,t,r=>{Y(e,t.icons,r)})}):Y(e,s,null)})))}),t?function(e,t,r){let n=W++,i=B.bind(null,r,n);if(!t.pending.length)return i;let a={id:n,icons:t,callback:e,abort:i};return r.forEach(e=>{(e.loaderCallbacks||(e.loaderCallbacks=[])).push(a)}),i}(t,l,u):V},Z=/[\s,]+/,ee={...T,inline:!1},et={xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},er={display:"inline-block"},en={backgroundColor:"currentColor"},ei={backgroundColor:"transparent"},ea={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},eo={WebkitMask:en,mask:en,background:ei};for(let e in eo){let t=eo[e];for(let r in ea)t[e+r]=ea[r]}let es={...ee,inline:!0};function el(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}if(x(!0),r={prepare:(e,t,r)=>{let n=[],i=function(e,t){let r,n=z[e];if(!n)return 0;if(n.maxURL){let e=0;n.resources.forEach(t=>{e=Math.max(e,t.length)}),r=n.maxURL-e-n.path.length-(t+".json?icons=").length}else r=0;return r}(e,t),a="icons",o={type:a,provider:e,prefix:t,icons:[]},s=0;return r.forEach((r,l)=>{(s+=r.length+1)>=i&&l>0&&(n.push(o),o={type:a,provider:e,prefix:t,icons:[]},s=r.length),o.icons.push(r)}),n.push(o),n},send:(e,t,r)=>{if(!D)return void r("abort",424);let n=function(e){if("string"==typeof e){let t=z[e];if(t)return t.path}return"/"}(t.provider);switch(t.type){case"icons":n+=t.prefix+".json?"+new URLSearchParams({icons:t.icons.join(",")}).toString();break;case"custom":{let e=t.uri;n+="/"===e.slice(0,1)?e.slice(1):e;break}default:r("abort",400);return}let i=503;D(e+n).then(e=>{let t=e.status;return 200!==t?void setTimeout(()=>{r(404===t?"abort":"next",t)}):(i=501,e.json())}).then(e=>{"object"!=typeof e||null===e?setTimeout(()=>{404===e?r("abort",e):r("next",i)}):setTimeout(()=>{r("success",e)})}).catch(()=>{r("next",i)})}},R[""]=r,"u">typeof document&&"u">typeof window){let e=window;if(void 0!==e.IconifyPreload){let t=e.IconifyPreload,r="Invalid IconifyPreload syntax.";"object"==typeof t&&null!==t&&(t instanceof Array?t:[t]).forEach(e=>{try{("object"!=typeof e||null===e||e instanceof Array||"object"!=typeof e.icons||"string"!=typeof e.prefix||!k(e))&&console.error(r)}catch(e){console.error(r)}})}if(void 0!==e.IconifyProviders){let t=e.IconifyProviders;if("object"==typeof t&&null!==t)for(let e in t){let r="IconifyProviders["+e+"] is invalid.";try{let n=t[e];if("object"!=typeof n||!n||void 0===n.resources)continue;M(e,n)||console.error(r)}catch(e){console.error(r)}}}}function ec(e){let[r,i]=(0,n.useState)(!!e.ssr),[a,s]=(0,n.useState)({}),[l,c]=(0,n.useState)(function(t){if(t){let t=e.icon;if("object"==typeof t)return{name:"",data:t};let r=w(t);if(r)return{name:t,data:r}}return{name:""}}(!!e.ssr));function u(){let e=a.callback;e&&(e(),s({}))}function d(e){if(JSON.stringify(l)!==JSON.stringify(e))return u(),c(e),!0}(0,n.useEffect)(()=>(i(!0),u),[]),(0,n.useEffect)(()=>{r&&function t(){var r;let n=e.icon;if("object"==typeof n)return void d({name:"",data:n});let i=w(n);d({name:n,data:i})&&(void 0===i?s({callback:J([n],t)}):i&&(null==(r=e.onLoad)||r.call(e,n)))}()},[e.icon,r]);let{name:p,data:h}=l;return h?((e,r,i)=>{let a=r.inline?es:ee,o=function(e,t){let r={...e};for(let e in t){let n=t[e],i=typeof n;e in C?(null===n||n&&("string"===i||"number"===i))&&(r[e]=n):i===typeof r[e]&&(r[e]="rotate"===e?n%4:n)}return r}(a,r),s=r.mode||"svg",l={},c=r.style||{},u={..."svg"===s?et:{}};if(i){let e=b(i,!1,!0);if(e){let t=["iconify"];for(let r of["provider","prefix"])e[r]&&t.push("iconify--"+e[r]);u.className=t.join(" ")}}for(let e in r){let t=r[e];if(void 0!==t)switch(e){case"icon":case"style":case"children":case"onLoad":case"mode":case"ssr":case"fallback":break;case"_ref":u.ref=t;break;case"className":u[e]=(u[e]?u[e]+" ":"")+t;break;case"inline":case"hFlip":case"vFlip":o[e]=!0===t||"true"===t||1===t;break;case"flip":"string"==typeof t&&function(e,t){t.split(Z).forEach(t=>{switch(t.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0}})}(o,t);break;case"color":l.color=t;break;case"rotate":"string"==typeof t?o[e]=function(e,t=0){let r=e.replace(/^-?[0-9.]*/,"");function n(e){for(;e<0;)e+=4;return e%4}if(""===r){let t=parseInt(e);return isNaN(t)?0:n(t)}if(r!==e){let t=0;switch(r){case"%":t=25;break;case"deg":t=90}if(t){let i=parseFloat(e.slice(0,e.length-r.length));return isNaN(i)?0:(i/=t)%1==0?n(i):0}}return t}(t):"number"==typeof t&&(o[e]=t);break;case"ariaHidden":case"aria-hidden":!0!==t&&"true"!==t&&delete u["aria-hidden"];break;default:void 0===a[e]&&(u[e]=t)}}let d=_(e,o),p=d.attributes;if(o.inline&&(l.verticalAlign="-0.125em"),"svg"===s){var h;u.style={...l,...c},Object.assign(u,p);let e=0,i=r.id;return"string"==typeof i&&(i=i.replace(/-/g,"_")),u.dangerouslySetInnerHTML={__html:(h=F(d.body,i?()=>i+"ID"+e++:"iconifyReact"),void 0===t&&function(){try{t=window.trustedTypes.createPolicy("iconify",{createHTML:e=>e})}catch(e){t=null}}(),t?t.createHTML(h):h)},(0,n.createElement)("svg",u)}let{body:f,width:g,height:m}=e,y="mask"===s||"bg"!==s&&-1!==f.indexOf("currentColor"),v=function(e,t){let r=-1===e.indexOf("xlink:")?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(let e in t)r+=" "+e+'="'+t[e]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+r+">"+e+"</svg>"}(f,{...p,width:g+"",height:m+""});return u.style={...l,"--svg":'url("data:image/svg+xml,'+v.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")+'")',width:el(p.width),height:el(p.height),...er,...y?en:ei,...c},(0,n.createElement)("span",u)})({...o,...h},e,p):e.children?e.children:e.fallback?e.fallback:(0,n.createElement)("span",{})}let eu=(0,n.forwardRef)((e,t)=>ec({...e,_ref:t})),ed=(0,n.forwardRef)((e,t)=>ec({inline:!0,...e,_ref:t}));e.s(["Icon",0,eu,"InlineIcon",0,ed,"_api",0,{getAPIConfig:function(e){return z[e]},setAPIModule:function(e,t){R[e]=t},sendAPIQuery:K,setFetch:function(e){D=e},getFetch:function(){return D},listAPIProviders:function(){return Object.keys(z)}},"addAPIProvider",0,M,"addCollection",0,k,"addIcon",0,S,"buildIcon",0,_,"calculateSize",0,L,"getIcon",0,function(e){let t=w(e);return t?{...o,...t}:t},"iconLoaded",0,function(e){return!!w(e)},"listIcons",0,function(e,t){let r=[];return("string"==typeof e?[e]:Object.keys(h)).forEach(e=>{("string"==typeof e&&"string"==typeof t?[t]:Object.keys(h[e]||{})).forEach(t=>{let n=f(e,t);r=r.concat(Object.keys(n.icons).map(r=>(""!==e?"@"+e+":":"")+t+":"+r))})}),r},"loadIcon",0,e=>new Promise((t,r)=>{let n="string"==typeof e?b(e,!0):e;n?J([n||e],i=>{if(i.length&&n){let e=w(n);if(e)return void t({...o,...e})}r(e)}):r(e)}),"loadIcons",0,J,"replaceIDs",0,F,"setCustomIconLoader",0,function(e,t,r){f(r||"",t).loadIcon=e},"setCustomIconsLoader",0,function(e,t,r){f(r||"",t).loadIcons=e}])},36136,e=>{"use strict";let t=[{slug:"building-scalable-rest-apis-with-laravel",title:"Building Scalable REST APIs with Laravel",excerpt:"A deep dive into designing RESTful APIs that handle thousands of requests per second using Laravel, Redis caching, and queue-based processing.",date:"2025-06-15",readTime:"8 min read",tags:["Laravel","API","Backend"],featured:!0,content:`When building APIs that need to serve thousands of concurrent users, architecture decisions made early on determine whether your system scales gracefully or crumbles under load. After building production APIs with Laravel that handle serious traffic, here's what actually matters.

## Start with Rate Limiting

Laravel's built-in rate limiting is your first line of defense. But the default configuration is rarely enough for production:

\`\`\`php
// AppServiceProvider.php
use IlluminateCacheRateLimitingLimit;
use IlluminateSupportFacadesRateLimiter;

public function boot()
{
    RateLimiter::for('api', function (Request $request) {
        return Limit::perMinute(60)->by(
            $request->user()?->id ?: $request->ip()
        );
    });
}
\`\`\`

The key insight: rate limit by user ID when authenticated, by IP when not. This prevents one user from consuming all resources while still protecting against anonymous abuse.

## Redis Caching Strategy

Every database query that runs on every request is a scalability bottleneck. Redis caching isn't optional — it's essential:

\`\`\`php
// Cache expensive queries
$products = Cache::remember('products.active', 300, function () {
    return Product::where('active', true)
        ->with('category')
        ->get();
});
\`\`\`

But here's what most tutorials miss: cache invalidation strategy. I use event-driven invalidation:

\`\`php
// When a product is updated
event(new ProductUpdated($product));

// Listener clears the cache
class ClearProductCache
{
    public function handle(ProductUpdated $event): void
    {
        Cache::forget('products.active');
        Cache::forget("product.{ $event->product->id }");
    }
}
\`\`\`

## Queue-Based Processing

Never do heavy work in the request cycle. If you're sending emails, processing uploads, or running calculations synchronously, you're doing it wrong:

\`\`\`php
// Dispatch to queue instead of doing synchronously
class OrderController extends Controller
{
    public function store(Request $request)
    {
        $order = Order::create($request->validated());

        // These happen in the background
        ProcessOrder::dispatch($order);
        SendConfirmationEmail::dispatch($order);
        UpdateInventory::dispatch($order);

        return response()->json($order, 201);
    }
}
\`\`\`

## Database Optimization

N+1 queries are the silent killers of API performance. Laravel's eager loading solves this:

\`\`\`php
// Bad: N+1 queries
$orders = Order::all();
foreach ($orders as $order) {
    echo $order->user->name; // Each triggers a query
}

// Good: 2 queries total
$orders = Order::with('user')->get();
\`\`\`

For complex queries, use database indexing strategically. Check your slow query log:

\`\`\`sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status, created_at);
\`\`\`

## Monitoring in Production

You can't optimize what you don't measure. I use Laravel Telescope for development and a combination of New Relic + custom metrics for production:

\`\`\`php
// Track custom metrics
Metric::increment('api.orders.created');
Metric::timing('api.checkout.duration', $duration);
\`\`\`

The result? APIs that handle 10,000+ requests per minute with p99 latency under 200ms. The foundation is simple: cache aggressively, queue everything heavy, and measure constantly.`},{slug:"flutter-state-management-bloc-vs-provider-2025",title:"Flutter State Management: BLoC vs Provider in 2025",excerpt:"An honest comparison of BLoC and Provider patterns for Flutter apps, with real-world benchmarks and when to use each.",date:"2025-04-22",readTime:"6 min read",tags:["Flutter","Dart","Architecture"],featured:!1,content:`State management is the most debated topic in the Flutter community. After building production apps with both BLoC and Provider, here's my honest take on when to use each.

## Provider: Simple and Effective

Provider is Flutter's recommended approach for simple to medium apps. It's easy to set up and works well for most use cases:

\`\`\`dart
// Counter with ChangeNotifierProvider
class CounterModel extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

// In widget tree
ChangeNotifierProvider(
  create: (_) => CounterModel(),
  child: Consumer<CounterModel>(
    builder: (context, counter, _) {
      return Text('Count: \${counter.count}');
    },
  ),
)
\`\`\`

### When Provider Wins

- Small to medium apps with simple state
- Quick prototyping
- Teams new to Flutter
- Minimal boilerplate needed

## BLoC: Structured and Scalable

BLoC (Business Logic Component) adds structure through events and states. More boilerplate, but better testability:

\`\`\`dart
// Events
abstract class CounterEvent {}
class Increment extends CounterEvent {}
class Decrement extends CounterEvent {}

// States
abstract class CounterState {}
class CounterInitial extends CounterState {}
class CounterLoaded extends CounterState {
  final int count;
  CounterLoaded(this.count);
}

// BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterInitial()) {
    on<Increment>((event, emit) {
      final current = (state is CounterLoaded)
          ? (state as CounterLoaded).count : 0;
      emit(CounterLoaded(current + 1));
    });
  }
}
\`\`\`

### When BLoC Wins

- Complex apps with many state interactions
- Teams that need strict architecture
- Apps requiring time-travel debugging
- Complex async operations

## Real-World Benchmarks

I tested both approaches in a production e-commerce app:

| Metric | Provider | BLoC |
|--------|----------|------|
| Setup time | 2 hours | 6 hours |
| Lines of code | 340 | 890 |
| Test coverage | 72% | 94% |
| Build time impact | Negligible | +12% |
| Bug reports (3 months) | 8 | 3 |

## My Recommendation

Start with Provider. Migrate to BLoC when your app's complexity demands it. The migration path exists and isn't painful if you've kept your business logic separate from UI code.

For new projects in 2025, I'd also consider **Riverpod** — it combines the best of both worlds with compile-time safety and less boilerplate than BLoC.`},{slug:"how-i-built-ai-debugging-tool-for-laravel",title:"How I Built an AI Debugging Tool for Laravel",excerpt:"The story behind laravel-ai-debugger — using CLI tools and intelligent error analysis to speed up Laravel development.",date:"2025-03-10",readTime:"5 min read",tags:["Laravel","AI","Open Source"],featured:!1,content:`Every Laravel developer has stared at a cryptic error message, googled it, tried three solutions, and finally found the answer on page 4 of a Stack Overflow thread. I got tired of this pattern and built laravel-ai-debugger.

## The Problem

Laravel errors often come with context that's hard to parse:

\`\`\`
TypeError: Illuminate\\Database\\Eloquent\\Collection::toArray(): 
Argument #1 ($callback) must be of type ?Closure, array given
\`\`\`

The error alone doesn't tell you *where* in your code the issue originates, or *why* you're passing the wrong type. You need to trace back through your code to find the root cause.

## The Solution

laravel-ai-debugger hooks into Laravel's exception handler and provides:

1. **Context analysis** — reads your code around the error location
2. **Pattern matching** — identifies common Laravel-specific issues
3. **Fix suggestions** — provides actionable solutions with code examples

\`\`\`php
// Install and configure
composer require dakshraman/laravel-ai-debugger
php artisan vendor:publish --provider="Dakshraman\\AiDebugger\\AiDebuggerServiceProvider"
\`\`\`

## How It Works Under the Hood

The tool uses a pipeline approach:

\`\`\`php
class DebuggerPipeline
{
    public function handle($exception, Closure $next)
    {
        $context = $this->analyzer->analyze($exception);
        $suggestion = $this->matcher->findSolution($context);
        
        if ($suggestion) {
            $this->output->suggest($suggestion);
        }
        
        return $next($exception);
    }
}
\`\`\`

The analyzer reads the stack trace, identifies the file and line number, and pulls in surrounding code context. The matcher then compares this against a database of known Laravel patterns.

## Lessons Learned

1. **Start simple** — v1 only handled 5 error types. Now it handles 40+.
2. **Community feedback is gold** — 60% of new patterns came from GitHub issues.
3. **Test against real codebases** — synthetic tests miss edge cases.

## Results

Since launching, laravel-ai-debugger has:
- 800+ GitHub stars
- 15,000+ installs
- Reduced my debugging time by ~40%

The project is open source and contributions are welcome. Check it out on GitHub.`},{slug:"securing-laravel-apps-beyond-the-basics",title:"Securing Laravel Apps: Beyond the Basics",excerpt:"Advanced security practices for Laravel — CSP headers, rate limiting, browser fingerprinting, and bot detection strategies.",date:"2025-01-18",readTime:"7 min read",tags:["Laravel","Security","PHP"],featured:!1,content:`Laravel comes with solid security defaults — CSRF protection, SQL injection prevention, XSS escaping. But production applications need more. Here are the advanced measures I implement on every Laravel project.

## Content Security Policy (CSP)

CSP headers prevent XSS attacks by whitelisting allowed content sources:

\`\`\`php
// middleware/CspMiddleware.php
class CspMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response->headers->set('Content-Security-Policy', 
            "default-src 'self'; " .
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " .
            "style-src 'self' 'unsafe-inline'; " .
            "img-src 'self' data: https:; " .
            "font-src 'self' https://fonts.gstatic.com;"
        );
        return $response;
    }
}
\`\`\`

## Advanced Rate Limiting

Go beyond simple request counts. Implement multi-layered rate limiting:

\`\`\`php
// Different limits for different endpoints
RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});

RateLimiter::for('api', function (Request $request) {
    $user = $request->user();
    if ($user && $user->isAdmin()) {
        return Limit::perMinute(120)->by($user->id);
    }
    return Limit::perMinute(60)->by($request->ip());
});
\`\`\`

## Browser Fingerprinting

Detect automated attacks by fingerprinting browsers:

\`\`\`php
class FingerprintService
{
    public function generate(Request $request): string
    {
        $data = [
            $request->header('User-Agent'),
            $request->header('Accept-Language'),
            $request->header('Accept-Encoding'),
            // Canvas fingerprint, WebGL data, etc.
        ];
        return hash('sha256', implode('|', $data));
    }
    
    public function isSuspicious(Request $request): bool
    {
        $fingerprint = $this->generate($request);
        $visits = Cache::get("fp.{$fingerprint}", 0);
        
        if ($visits > 100) return true; // Too many requests from same fingerprint
        
        Cache::put("fp.{$fingerprint}", $visits + 1, 3600);
        return false;
    }
}
\`\`\`

## Bot Detection

Not all traffic is human. Implement a bot detection layer:

\`\`\`php
class BotDetection
{
    private array $suspiciousPatterns = [
        '/python-requests/i',
        '/curl/i',
        '/wget/i',
        '/headless/i',
    ];
    
    public function detect(Request $request): bool
    {
        $ua = $request->header('User-Agent', '');
        
        foreach ($this->suspiciousPatterns as $pattern) {
            if (preg_match($pattern, $ua)) return true;
        }
        
        // Check for missing headers that real browsers always send
        if (!$request->header('Accept-Language')) return true;
        if (!$request->header('Accept')) return true;
        
        return false;
    }
}
\`\`\`

## Security Headers Checklist

Always set these in production:

\`\`\`
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
\`\`\`

These layers together create a defense-in-depth strategy that protects against the majority of web attacks.`},{slug:"cross-platform-deployment-flutter-to-ios-android",title:"Cross-Platform Deployment: Flutter to iOS & Android",excerpt:"A step-by-step guide to deploying your first Flutter app to both App Store and Play Store, including CI/CD setup.",date:"2024-11-05",readTime:"10 min read",tags:["Flutter","DevOps","Mobile"],featured:!1,content:`Deploying a Flutter app to both platforms simultaneously is one of Flutter's biggest value propositions. But the process has enough platform-specific quirks to trip up even experienced developers. Here's the complete guide.

## Prerequisites

Before you start, make sure you have:

- Apple Developer Account ($99/year)
- Google Play Developer Account ($25 one-time)
- Xcode installed (for iOS)
- Android Studio installed (for Android)
- Flutter doctor showing all green checks

\`\`\`bash
flutter doctor
\`\`\`

## iOS Setup

### 1. Configure Signing

Open your project in Xcode:

\`\`\`bash
open ios/Runner.xcworkspace
\`\`\`

In Xcode:
- Select Runner → Signing & Capabilities
- Select your Team
- Change Bundle Identifier to something unique

### 2. Configure Info.plist

Add required permissions:

\`\`\`xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access for photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access</string>
\`\`\`

### 3. Build for iOS

\`\`\`bash
flutter build ios --release
\`\`\`

Then archive and upload through Xcode or use:

\`\`\`bash
flutter build ipa --release
\`\`\`

## Android Setup

### 1. Configure build.gradle

\`\`\`gradle
android {
    defaultConfig {
        applicationId "com.yourname.yourapp"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
}
\`\`\`

### 2. Generate Keystore

\`\`\`bash
keytool -genkey -v -keystore ~/upload-keystore.jks \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -alias upload
\`\`\`

### 3. Build for Android

\`\`\`bash
flutter build appbundle --release
\`\`\`

The AAB file goes to Google Play, APK for direct distribution.

## CI/CD with GitHub Actions

Automate both builds:

\`\`\`yaml
name: Deploy
on:
  push:
    tags: ['v*']

jobs:
  ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build ipa --release
      - uses: apple-actions/upload-testflight-build@v1
        with:
          app-path: build/ios/ipa/*.ipa

  android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build appbundle --release
      - uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: \${{ secrets.PLAY_STORE_KEY }}
          packageName: com.yourname.yourapp
          releaseFiles: build/app/outputs/bundle/release/app-release.aab
          track: production
\`\`\`

## Post-Deployment

After both stores approve your app:

1. Set up crash reporting (Firebase Crashlytics)
2. Configure analytics
3. Set up feature flags for gradual rollouts
4. Monitor store reviews for bug reports

The whole process takes about 2-3 hours for the first time. After that, tagging a release triggers automatic deployment to both stores.`},{slug:"firebase-for-laravel-real-time-features",title:"Firebase for Laravel: Real-Time Features Made Easy",excerpt:"Integrating Firebase into Laravel projects for real-time notifications, authentication, and file storage.",date:"2024-09-20",readTime:"6 min read",tags:["Firebase","Laravel","Real-Time"],featured:!1,content:`Laravel excels at traditional request-response cycles, but some features need real-time capabilities. Firebase fills this gap perfectly. Here's how I integrate Firebase into Laravel projects.

## Why Firebase + Laravel?

Laravel handles your business logic, database, and API. Firebase handles real-time updates, push notifications, and file storage. Together, they cover almost every backend need.

## Setup

Install the Firebase PHP SDK:

\`\`\`bash
composer require kreait/firebase-php
\`\`\`

Configure with your service account:

\`\`\`php
// config/services.php
'firebase' => [
    'project_id' => env('FIREBASE_PROJECT_ID'),
    'service_account' => env('FIREBASE_SERVICE_ACCOUNT_PATH'),
],
\`\`\`

## Real-Time Notifications

Push notifications to Flutter apps via Firebase Cloud Messaging:

\`\`\`php
use KreaitFirebaseMessagingCloudMessage;
use KreaitFirebaseMessagingNotification;

class NotificationService
{
    public function sendToUser(User $user, string $title, string $body): void
    {
        $messaging = app('firebase.messaging');
        
        $message = CloudMessage::withTarget('token', $user->fcm_token)
            ->withNotification(Notification::create($title, $body))
            ->withData(['order_id' => $order->id]);
        
        $messaging->send($message);
    }
    
    public function sendToTopic(string $topic, string $title, string $body): void
    {
        $message = CloudMessage::withTarget('topic', $topic)
            ->withNotification(Notification::create($title, $body));
        
        app('firebase.messaging')->send($message);
    }
}
\`\`\`

## Real-Time Database Sync

For features like live chat or collaborative editing:

\`\`\`php
use KreaitFirebaseDatabase;

class ChatService
{
    public function sendMessage(string $roomId, array $data): void
    {
        $database = app('firebase.database');
        
        $database->getReference("rooms/{$roomId}/messages")
            ->push([
                'sender' => auth()->id(),
                'text' => $data['text'],
                'timestamp' => ServerValue::timestamp(),
            ]);
    }
    
    public function getMessages(string $roomId): array
    {
        $snapshot = app('firebase.database')
            ->getReference("rooms/{$roomId}/messages")
            ->orderByKey()
            ->limitToLast(50)
            ->getValue();
        
        return $snapshot ?? [];
    }
}
\`\`\`

## Firebase Storage

Handle file uploads without straining your Laravel server:

\`\`\`php
use KreaitFirebaseStorage;

class FileService
{
    public function upload(string $path, string $content): string
    {
        $storage = app('firebase.storage');
        $bucket = $storage->getBucket();
        
        $bucket->upload($content, [
            'name' => $path,
            'metadata' => ['cacheControl' => 'public, max-age=31536000'],
        ]);
        
        return $bucket->object($path)->publicUrl();
    }
}
\`\`\`

## Authentication Bridge

Sync Laravel auth with Firebase for seamless Flutter apps:

\`\`\`php
class FirebaseAuthController extends Controller
{
    public function verify(Request $request)
    {
        $verifiedIdToken = app('firebase.auth')
            ->verifyIdToken($request->id_token);
        
        $user = User::firstOrCreate(
            ['email' => $verifiedIdToken->claims()->get('email')],
            ['name' => $verifiedIdToken->claims()->get('name')]
        );
        
        return response()->json([
            'token' => $user->createToken('api')->plainTextToken,
        ]);
    }
}
\`\`\`

## When NOT to Use Firebase

- When you need complex queries (use Laravel + MySQL)
- When data relationships are important (Firebase is flat)
- When you need ACID transactions across multiple collections

The sweet spot: use Laravel for your core API and business logic, Firebase for real-time features, notifications, and file storage.`}];e.s(["aboutStats",0,[{value:"4+",label:"Years Experience"},{value:"20+",label:"Projects Delivered"},{value:"28+",label:"GitHub Repos"},{value:"16",label:"Technologies"}],"aboutText",0,["I’m a senior full-stack developer with deep expertise in Laravel and Flutter, building products that scale from startup MVPs to enterprise-grade systems.","My approach bridges backend reliability with cross-platform mobility—every architecture decision is made with performance, security, and developer experience in mind.","When I’m not shipping code, I’m exploring system design patterns, contributing to open-source, and staying sharp on emerging tech."],"blogs",0,t,"experiences",0,[{role:"Software Engineer",company:"InsideSoftwares",period:"2025 – Present",location:"Remote",description:"Developing scalable applications and ensuring optimal performance across the software development lifecycle.",technologies:["Laravel","Flutter","REST APIs"]},{role:"Full Stack Laravel Developer",company:"AK Software Solutions",period:"2025 – 2025",location:"Dehradun, India",description:"Leading end-to-end web development utilizing the Laravel ecosystem. Architecting robust backend services.",technologies:["Laravel","MySQL","Vue.js"]},{role:"API Developer (Laravel/Flutter)",company:"Pearl Organisation",period:"2024 – 2025",location:"Dehradun, India",description:"Developed scalable RESTful APIs in PHP/Laravel powering complex Flutter mobile applications.",technologies:["Laravel","Flutter","Dart"]},{role:"Reputation Manager",company:"Zenvista Meditech",period:"2022 – 2022",location:"Rudrapur, India",description:"Orchestrated digital presence and online reputation strategies, leveraging data analytics.",technologies:["SEO","Analytics","Strategy"]}],"navLinks",0,[{label:"Work",href:"#projects"},{label:"Experience",href:"#experience"},{label:"About",href:"#about"},{label:"Blog",href:"#blog"},{label:"GitHub",href:"#github"},{label:"Contact",href:"#contact"}],"projects",0,[{description:"A cross-platform e-learning ecosystem with live streaming and on-demand lectures for nonprofits.",tags:["Flutter","iOS","Android"],category:"E-Learning",icon:"learning"},{description:"Real-time REST API sync between a high-traffic web storefront and a companion mobile app.",tags:["API Design","Laravel"],category:"E-Commerce",icon:"commerce"},{description:"Secure backend for a telehealth platform managing doctor-patient scheduling and consultations.",tags:["Laravel","Backend"],category:"Healthcare",icon:"health"},{description:"Customizable institutional management with payments, payroll, and academic messaging.",tags:["Full Stack","ERP"],category:"Education",icon:"enterprise"},{description:"AI-powered debugging assistant for Laravel applications using CLI tools and intelligent error analysis.",tags:["PHP","Laravel","AI"],category:"Developer Tool",icon:"devtool",github:"https://github.com/dakshraman/laravel-ai-debugger"},{description:"Real-time anonymous chat platform with end-to-end encrypted messaging and ephemeral rooms.",tags:["PHP","WebSockets","Encryption"],category:"Social",icon:"social",github:"https://github.com/dakshraman/anonchat"},{description:"Cross-platform messaging app with real-time updates, media sharing, and push notifications.",tags:["Dart","Flutter","Firebase"],category:"Messaging",icon:"messaging",github:"https://github.com/dakshraman/Messager"},{description:"Weather forecast web application with interactive maps, hourly forecasts, and location-based alerts.",tags:["JavaScript","HTML","CSS"],category:"Weather",icon:"weather",github:"https://github.com/dakshraman/Weather_forecast_web_application"},{description:"AI image enhancement tool using machine learning models for super-resolution and noise reduction.",tags:["Python","AI","ML"],category:"AI/ML",icon:"ai",github:"https://github.com/dakshraman/AI-Image-Enhancer"},{description:"Voice-controlled virtual assistant with natural language processing and smart home integration.",tags:["Python","NLP","AI"],category:"AI Assistant",icon:"assistant",github:"https://github.com/dakshraman/Virtual-Assistant"},{description:"Laravel middleware for browser fingerprinting, bot detection, and rate limiting with minimal config.",tags:["PHP","Laravel","Security"],category:"Package",icon:"package",github:"https://github.com/dakshraman/laravel-browser-guard"},{description:"Feature-rich dating platform with matching algorithms, real-time chat, and profile verification.",tags:["PHP","Laravel","WebSocket"],category:"Dating",icon:"social",github:"https://github.com/dakshraman/dating-app"}],"siteConfig",0,{name:"Raman Daksh",role:"Software Engineer",email:"ramandaksh6161@gmail.com",location:"Uttarakhand, India",github:"https://github.com/dakshraman",linkedin:"https://linkedin.com/in/dakshraman",instagram:"https://instagram.com/dakshraman",telegram:"https://t.me/dakshraman",availability:"Available for new opportunities",tagline:"Making complex digital products for companies that move forward.",description:"Combining reliable backend functionality with high-quality cross-platform architecture."},"skills",0,["Laravel","Flutter","React.js","Python","Dart","PHP","Firebase","Java","C++","SQL","Linux","Cyber Security","Shopify","WordPress","System Architecture","API Design"],"testimonials",0,[{quote:"Raman delivered exceptional work on our e-learning platform. His understanding of both backend scalability and mobile UX is rare. The project launched on time and handles thousands of concurrent users.",name:"Priya Sharma",role:"Product Lead, EduTech Startup",avatar:"PS"},{quote:"Working with Raman was a game-changer for our healthcare app. He architected the entire backend with Laravel and integrated Flutter seamlessly. His attention to security and performance is outstanding.",name:"Ankit Verma",role:"CTO, HealthFirst Solutions",avatar:"AV"},{quote:"Raman built our REST API infrastructure from scratch. The codebase is clean, well-documented, and handles 10k+ requests per minute without breaking a sweat. Highly recommend for any complex backend work.",name:"Neha Gupta",role:"Engineering Manager, CommerceHub",avatar:"NG"},{quote:"His ability to translate business requirements into robust technical solutions is impressive. Raman is not just a developer—he’s a problem solver who thinks about the bigger picture.",name:"Rahul Joshi",role:"Founder, DigitalFirst Agency",avatar:"RJ"}]])},92856,(e,t,r)=>{},85559,(e,t,r)=>{var n=e.i(88871);e.r(92856);var i=e.r(69945),a=i&&"object"==typeof i&&"default"in i?i:{default:i},o=void 0!==n.default&&n.default.env&&!0,s=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,r=t.name,n=void 0===r?"stylesheet":r,i=t.optimizeForSpeed,a=void 0===i?o:i;c(s(n),"`name` must be a string"),this._name=n,this._deletedRulePlaceholder="#"+n+"-deleted-rule____{}",c("boolean"==typeof a,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=a,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,r=e.prototype;return r.setOptimizeForSpeed=function(e){c("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),c(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},r.isOptimizeForSpeed=function(){return this._optimizeForSpeed},r.inject=function(){var e=this;if(c(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},r.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},r.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},r.insertRule=function(e,t){if(c(s(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var r=this.getSheet();"number"!=typeof t&&(t=r.cssRules.length);try{r.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var n=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,n))}return this._rulesCount++},r.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var r="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(n){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}}else{var n=this._tags[e];c(n,"old rule at index `"+e+"` not found"),n.textContent=t}return e},r.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];c(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},r.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},r.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,r){return r?t=t.concat(Array.prototype.map.call(e.getSheetForTag(r).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},r.makeStyleTag=function(e,t,r){t&&c(s(t),"makeStyleTag accepts only strings as second parameter");var n=document.createElement("style");this._nonce&&n.setAttribute("nonce",this._nonce),n.type="text/css",n.setAttribute("data-"+e,""),t&&n.appendChild(document.createTextNode(t));var i=document.head||document.getElementsByTagName("head")[0];return r?i.insertBefore(n,r):i.appendChild(n),n},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,t),e}();function c(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var u=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},d={};function p(e,t){if(!t)return"jsx-"+e;var r=String(t),n=e+r;return d[n]||(d[n]="jsx-"+u(e+"-"+r)),d[n]}function h(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var r=e+t;return d[r]||(d[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),d[r]}var f=function(){function e(e){var t=void 0===e?{}:e,r=t.styleSheet,n=void 0===r?null:r,i=t.optimizeForSpeed,a=void 0!==i&&i;this._sheet=n||new l({name:"styled-jsx",optimizeForSpeed:a}),this._sheet.inject(),n&&"boolean"==typeof a&&(this._sheet.setOptimizeForSpeed(a),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var r=this.getIdAndRules(e),n=r.styleId,i=r.rules;if(n in this._instancesCounts){this._instancesCounts[n]+=1;return}var a=i.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[n]=a,this._instancesCounts[n]=1},t.remove=function(e){var t=this,r=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(r in this._instancesCounts,"styleId: `"+r+"` not found"),this._instancesCounts[r]-=1,this._instancesCounts[r]<1){var n=this._fromServer&&this._fromServer[r];n?(n.parentNode.removeChild(n),delete this._fromServer[r]):(this._indices[r].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[r]),delete this._instancesCounts[r]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],r=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return r[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,r;return t=this.cssRules(),void 0===(r=e)&&(r={}),t.map(function(e){var t=e[0],n=e[1];return a.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:r.nonce?r.nonce:void 0,dangerouslySetInnerHTML:{__html:n}})})},t.getIdAndRules=function(e){var t=e.children,r=e.dynamic,n=e.id;if(r){var i=p(n,r);return{styleId:i,rules:Array.isArray(t)?t.map(function(e){return h(i,e)}):[h(i,t)]}}return{styleId:p(n),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),g=i.createContext(null);function m(){return new f}function b(){return i.useContext(g)}g.displayName="StyleSheetContext";var y=a.default.useInsertionEffect||a.default.useLayoutEffect,v="u">typeof window?m():void 0;function x(e){var t=v||b();return t&&("u"<typeof window?t.add(e):y(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}x.dynamic=function(e){return e.map(function(e){return p(e[0],e[1])}).join(" ")},r.StyleRegistry=function(e){var t=e.registry,r=e.children,n=i.useContext(g),o=i.useState(function(){return n||t||m()})[0];return a.default.createElement(g.Provider,{value:o},r)},r.createStyleRegistry=m,r.style=x,r.useStyleRegistry=b},48355,(e,t,r)=>{t.exports=e.r(85559).style},47918,(e,t,r)=>{t.exports=e.r(18443)},20584,e=>{"use strict";var t=e.i(99588),r=e.i(69945),n=e.i(47918),i=e.i(36136);e.s(["default",0,function(){let e="/"===(0,n.usePathname)(),[a,o]=(0,r.useState)("top"),[s,l]=(0,r.useState)(""),[c,u]=(0,r.useState)(0),[d,p]=(0,r.useState)(!1);(0,r.useEffect)(()=>{let e=()=>p(window.innerWidth<640);e(),window.addEventListener("resize",e);let t=()=>{let e=window.scrollY;e<80?o("top"):e<400?o("compact"):o("scrolled");let t=document.documentElement.scrollHeight-window.innerHeight;u(t>0?e/t:0);let r=i.navLinks.map(e=>e.href.replace("#",""));for(let e=r.length-1;e>=0;e--){let t=document.getElementById(r[e]);if(t&&t.getBoundingClientRect().top<=200)return void l(r[e])}l("")};return window.addEventListener("scroll",t,{passive:!0}),()=>{window.removeEventListener("scroll",t),window.removeEventListener("resize",e)}},[]);let h="top"!==a,f="scrolled"===a;return(0,t.jsx)("div",{style:{position:"fixed",top:0,left:0,right:0,zIndex:1e3,display:"flex",justifyContent:"center",padding:h?"10px 16px":"20px 24px",transition:"all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"},children:(0,t.jsxs)("nav",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",maxWidth:h?"720px":"1300px",height:h?"48px":"56px",padding:h?"0 20px":"0 24px",borderRadius:"var(--radius-full)",background:f?"rgba(10, 10, 11, 0.92)":"rgba(10, 10, 11, 0.65)",backdropFilter:"blur(32px) saturate(1.8)",WebkitBackdropFilter:"blur(32px) saturate(1.8)",border:"2px solid rgba(237, 237, 239, 0.1)",boxShadow:f?"4px 4px 0px rgba(237, 237, 239, 0.06)":"0 4px 16px rgba(0, 0, 0, 0.15)",transition:"all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",overflow:"hidden",position:"relative"},children:[(0,t.jsx)("div",{style:{position:"absolute",bottom:0,left:"8px",right:"8px",height:"2px",borderRadius:"1px",background:"rgba(51, 65, 85, 0.3)",overflow:"hidden"},children:(0,t.jsx)("div",{style:{height:"100%",width:`${100*c}%`,background:"linear-gradient(to right, var(--accent), var(--accent-glow))",boxShadow:"0 0 8px var(--accent-glow)",transition:"width 0.15s linear",borderRadius:"1px"}})}),(0,t.jsx)("a",{href:"/",style:{fontFamily:"var(--font-heading)",fontSize:h?"0.85rem":"0.95rem",fontWeight:700,color:"var(--fg)",textDecoration:"none",letterSpacing:"0.02em",transition:"all 0.4s ease",flexShrink:0,textTransform:"uppercase"},children:h?(0,t.jsxs)(t.Fragment,{children:[i.siteConfig.name.split(" ")[0][0],(0,t.jsx)("span",{style:{color:"var(--accent)"},children:"."})]}):(0,t.jsxs)(t.Fragment,{children:[i.siteConfig.name.split(" ")[0],(0,t.jsx)("span",{style:{color:"var(--accent)",textShadow:"0 0 16px var(--accent-glow-strong)"},children:"."}),(0,t.jsx)("span",{style:{color:"var(--fg-dim)",fontWeight:500},children:i.siteConfig.name.split(" ")[1]})]})}),(0,t.jsx)("div",{style:{display:d?"none":"flex",alignItems:"center",gap:h?"16px":"24px",transition:"all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"},children:i.navLinks.map(r=>(0,t.jsx)("a",{href:e?r.href:`/${r.href}`,style:{fontFamily:"var(--font-heading)",fontSize:h?"0.65rem":"0.7rem",color:s===r.href.replace("#","")?"var(--accent)":"var(--fg-muted)",textDecoration:"none",textTransform:"uppercase",letterSpacing:"0.1em",transition:"color 0.3s ease",position:"relative",padding:"4px 0",fontWeight:600},children:r.label},r.href))}),(0,t.jsx)("a",{href:e?"#contact":"/#contact",className:"btn-ghost",style:{fontSize:"0.65rem",padding:h?"6px 14px":"8px 18px",boxShadow:h?"2px 2px 0px var(--fg)":"3px 3px 0px var(--fg)",border:"2px solid var(--fg)",borderRadius:"var(--radius-full)",background:h?"transparent":"var(--accent)",color:h?"var(--fg)":"var(--bg)",borderColor:h?"var(--fg)":"var(--accent)",boxShadow:h?"2px 2px 0px var(--fg)":"none",flexShrink:0,whiteSpace:"nowrap"},children:h?(0,t.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("rect",{x:"2",y:"3",width:"12",height:"10",rx:"1.5"}),(0,t.jsx)("path",{d:"M2 5l6 4 6-4"})]}):"Contact"})]})})}])},52771,e=>{"use strict";var t=e.i(99588),r=e.i(69945);e.s(["default",0,function(){let e=(0,r.useRef)(null),n=(0,r.useRef)(!1);return(0,r.useEffect)(()=>{if(n.current||(n.current=!0,window.matchMedia("(pointer: coarse)").matches))return;let t=e.current;if(!t)return;t.style.opacity="1";let r=-100,i=-100,a=e=>{r=e.clientX,i=e.clientY,t.style.transform=`translate(${r-12}px,${i-12}px)`},o=()=>{t.style.opacity="0"},s=()=>{t.style.opacity="1"};document.addEventListener("mousemove",a,{passive:!0}),document.addEventListener("mouseleave",o),document.addEventListener("mouseenter",s);let l=!1,c=e=>{let r=!!(e.target.closest("a")||e.target.closest("button")||e.target.closest('[data-cursor="pointer"]'));r!==l&&(l=r,t.style.width=r?"32px":"24px",t.style.height=r?"32px":"24px",t.style.borderColor=r?"var(--accent)":"rgba(255,255,255,0.4)",t.style.background=r?"rgba(34,197,94,0.15)":"transparent",t.style.marginLeft=r?"-4px":"0",t.style.marginTop=r?"-4px":"0")};return document.addEventListener("mouseover",c,{passive:!0}),()=>{document.removeEventListener("mousemove",a),document.removeEventListener("mouseleave",o),document.removeEventListener("mouseenter",s),document.removeEventListener("mouseover",c)}},[]),(0,t.jsx)("div",{ref:e,"aria-hidden":"true",style:{position:"fixed",top:0,left:0,width:24,height:24,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.4)",pointerEvents:"none",zIndex:99999,opacity:0,transition:"width 0.15s ease, height 0.15s ease, border-color 0.15s ease, background 0.15s ease, opacity 0.2s ease"}})}])},86086,e=>{"use strict";var t=e.i(99588),r=e.i(69945);e.s(["default",0,function(){let e=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let r=0,n=()=>{r+=.0015;let i=e.current?.querySelectorAll(".ambient-blob");i&&i.forEach((e,t)=>{let n=(t+1)*.3,i=12*Math.sin(r*n+2.1*t),a=10*Math.cos(r*n*.5+1.7*t);e.style.transform=`translate(${i}%, ${a}%)`}),t=requestAnimationFrame(n)};return t=requestAnimationFrame(n),()=>cancelAnimationFrame(t)},[]),(0,t.jsxs)("div",{ref:e,"aria-hidden":"true",style:{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0},children:[(0,t.jsx)("div",{className:"ambient-blob",style:{position:"absolute",top:"-20%",right:"-15%",width:"60vw",height:"60vw",maxWidth:"700px",maxHeight:"700px",borderRadius:"50%",background:"radial-gradient(circle, rgba(37, 99, 235, 0.07) 0%, transparent 70%)",filter:"blur(80px)",willChange:"transform"}}),(0,t.jsx)("div",{className:"ambient-blob",style:{position:"absolute",bottom:"-25%",left:"-20%",width:"55vw",height:"55vw",maxWidth:"650px",maxHeight:"650px",borderRadius:"50%",background:"radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)",filter:"blur(80px)",willChange:"transform"}})]})}])},59956,e=>{"use strict";var t=e.i(99588),r=e.i(69945),n=e.i(25465);e.s(["default",0,function(){let[e,i]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{let e=()=>i(window.scrollY>600);return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]),e)?(0,t.jsx)("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),"aria-label":"Back to top","data-cursor":"pointer",style:{position:"fixed",bottom:"24px",right:"24px",zIndex:999,width:"44px",height:"44px",borderRadius:"var(--radius-sm)",background:"var(--bg-card)",border:"2px solid var(--border-thick)",color:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"none",transition:"all 0.15s var(--ease-out)",boxShadow:"2px 2px 0px var(--border-thick)",animation:"fadeIn 0.3s ease"},onMouseEnter:e=>{e.currentTarget.style.background="var(--accent)",e.currentTarget.style.color="var(--bg)",e.currentTarget.style.borderColor="var(--accent)",e.currentTarget.style.boxShadow="3px 3px 0px var(--accent)"},onMouseLeave:e=>{e.currentTarget.style.background="var(--bg-card)",e.currentTarget.style.color="var(--accent)",e.currentTarget.style.borderColor="var(--border-thick)",e.currentTarget.style.boxShadow="2px 2px 0px var(--border-thick)"},children:(0,t.jsx)(n.Icon,{icon:"mdi:chevron-up",width:22,height:22})}):null}])},75398,e=>{"use strict";var t=e.i(99588),r=e.i(69945),n=e.i(25465);e.s(["default",0,function(){let[e,i]=(0,r.useState)(!0);return(0,r.useEffect)(()=>{"light"===localStorage.getItem("theme")&&(i(!1),document.documentElement.classList.add("light"))},[]),(0,t.jsx)("button",{onClick:()=>{let t=!e;i(t),t?(document.documentElement.classList.remove("light"),localStorage.setItem("theme","dark")):(document.documentElement.classList.add("light"),localStorage.setItem("theme","light"))},"aria-label":"Toggle theme","data-cursor":"pointer",style:{position:"fixed",bottom:"24px",right:"76px",zIndex:999,width:"44px",height:"44px",borderRadius:"var(--radius-sm)",background:"var(--bg-card)",border:"2px solid var(--border-thick)",color:"var(--fg-muted)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"none",transition:"all 0.15s var(--ease-out)",boxShadow:"2px 2px 0px var(--border-thick)"},onMouseEnter:e=>{e.currentTarget.style.color="var(--accent)",e.currentTarget.style.borderColor="var(--accent)",e.currentTarget.style.boxShadow="3px 3px 0px var(--accent)"},onMouseLeave:e=>{e.currentTarget.style.color="var(--fg-muted)",e.currentTarget.style.borderColor="var(--border-thick)",e.currentTarget.style.boxShadow="2px 2px 0px var(--border-thick)"},children:(0,t.jsx)(n.Icon,{icon:e?"mdi:weather-sunny":"mdi:weather-night",width:20,height:20})})}])},50809,e=>{"use strict";let t;var r,n,i=e.i(99588),a=e.i(69945);let o=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim(),s=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let c=(0,a.createContext)({}),u=(0,a.forwardRef)(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:n,className:i="",children:s,iconNode:u,...d},p)=>{let{size:h=24,strokeWidth:f=2,absoluteStrokeWidth:g=!1,color:m="currentColor",className:b=""}=(0,a.useContext)(c)??{},y=n??g?24*Number(r??f)/Number(t??h):r??f;return(0,a.createElement)("svg",{ref:p,...l,width:t??h??l.width,height:t??h??l.height,stroke:e??m,strokeWidth:y,className:o("lucide",b,i),...!s&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(d)&&{"aria-hidden":"true"},...d},[...u.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(s)?s:[s]])}),d=(r="shield-check",n=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],(t=(0,a.forwardRef)(({className:e,...t},i)=>(0,a.createElement)(u,{ref:i,iconNode:n,className:o(`lucide-${s(r).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${r}`,e),...t}))).displayName=s(r),t);e.s(["default",0,function(){let[e,t]=(0,a.useState)(!1),[r,n]=(0,a.useState)(!1);return((0,a.useEffect)(()=>{localStorage.getItem("dpdp-consent")||setTimeout(()=>t(!0),1500)},[]),e)?(0,i.jsxs)("div",{role:"dialog","aria-labelledby":"dpdp-title","aria-describedby":"dpdp-desc",style:{position:"fixed",bottom:"16px",left:"16px",right:"16px",maxWidth:"680px",margin:"0 auto",padding:"16px 20px",borderRadius:"var(--radius-md)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px",zIndex:9999,background:"var(--bg-card)",border:"2px solid var(--border-thick)",boxShadow:"4px 4px 0px rgba(237, 237, 239, 0.08)",opacity:+!r,transform:r?"translateY(20px)":"translateY(0)",transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"},children:[(0,i.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:"12px",flex:"1 1 280px"},children:[(0,i.jsx)(d,{size:18,style:{color:"var(--accent)",marginTop:"2px",flexShrink:0},"aria-hidden":"true"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{id:"dpdp-title",style:{fontSize:"0.85rem",fontWeight:700,marginBottom:"3px",fontFamily:"var(--font-heading)"},children:"Privacy & Data Consent"}),(0,i.jsx)("p",{id:"dpdp-desc",style:{fontSize:"0.75rem",lineHeight:1.6,color:"var(--fg-muted)"},children:"This website uses cookies to measure performance. We do not sell your data."})]})]}),(0,i.jsxs)("div",{style:{display:"flex",gap:"8px",flexShrink:0},children:[(0,i.jsx)("button",{onClick:()=>{n(!0),setTimeout(()=>t(!1),300)},"aria-label":"Decline cookies",style:{fontFamily:"var(--font-heading)",fontSize:"0.7rem",fontWeight:700,padding:"6px 14px",borderRadius:"var(--radius-sm)",border:"2px solid var(--border-thick)",background:"transparent",color:"var(--fg-muted)",cursor:"pointer",transition:"all 0.15s var(--ease-out)",textTransform:"uppercase",letterSpacing:"0.05em"},onMouseEnter:e=>{e.currentTarget.style.borderColor="var(--fg-dim)",e.currentTarget.style.color="var(--fg)"},onMouseLeave:e=>{e.currentTarget.style.borderColor="var(--border-thick)",e.currentTarget.style.color="var(--fg-muted)"},children:"Decline"}),(0,i.jsx)("button",{onClick:()=>{localStorage.setItem("dpdp-consent","true"),n(!0),setTimeout(()=>t(!1),300)},"aria-label":"Accept cookies",style:{fontFamily:"var(--font-heading)",fontSize:"0.7rem",fontWeight:700,padding:"6px 14px",borderRadius:"var(--radius-sm)",border:"2px solid var(--accent)",background:"var(--accent)",color:"#fff",cursor:"pointer",transition:"all 0.15s var(--ease-out)",textTransform:"uppercase",letterSpacing:"0.05em",boxShadow:"2px 2px 0px var(--border-thick)"},onMouseEnter:e=>{e.currentTarget.style.background="#16A34A",e.currentTarget.style.borderColor="#16A34A"},onMouseLeave:e=>{e.currentTarget.style.background="var(--accent)",e.currentTarget.style.borderColor="var(--accent)"},children:"Accept"})]})]}):null}],50809)},97724,e=>{"use strict";var t=e.i(99588),r=e.i(69945),n=e.i(48355);let i=[{lang:"Hindi",text:"रामान दक्ष"},{lang:"Japanese",text:"ラマン・ダクシュ"},{lang:"Korean",text:"라만 닥슈"},{lang:"Russian",text:"Раман Дакш"},{lang:"English",text:"Raman Daksh"}];function a({onComplete:e}){let[o,s]=(0,r.useState)(0),[l,c]=(0,r.useState)(""),[u,d]=(0,r.useState)(!1),[p,h]=(0,r.useState)(0),[f,g]=(0,r.useState)(!1),[m,b]=(0,r.useState)(!1),y=(0,r.useRef)([]),v=(0,r.useRef)(!1);(0,r.useEffect)(()=>{if(o>=i.length||v.current)return;let t=i[o].text,r=o===i.length-1;if(p<t.length){let e=setTimeout(()=>{c(t.slice(0,p+1)),h(p+1)},r?50:35+25*Math.random());return y.current.push(e),()=>clearTimeout(e)}if(r){v.current=!0;let t=setTimeout(()=>g(!0),200),r=setTimeout(()=>b(!0),500),n=setTimeout(()=>d(!0),1500),i=setTimeout(()=>e?.(),2200);return y.current.push(t,r,n,i),()=>{y.current.forEach(clearTimeout)}}let n=setTimeout(()=>{c(""),h(0),s(o+1)},200+80*Math.random());return y.current.push(n),()=>clearTimeout(n)},[o,p]);let x=(o+p/(i[o]?.text.length||1))/i.length*100;return(0,t.jsxs)("div",{style:{position:"fixed",inset:0,zIndex:99998,background:"var(--bg)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1.5rem",opacity:+!u,transition:"opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",pointerEvents:u?"none":"auto"},className:"jsx-a065696ba966750",children:[(0,t.jsxs)("div",{style:{fontFamily:"var(--font-mono)",fontSize:f?"clamp(2rem, 6vw, 4rem)":"clamp(1.8rem, 5vw, 3.5rem)",fontWeight:f?700:500,color:"var(--fg)",letterSpacing:f?"0.02em":"0.04em",minHeight:"1.3em",textAlign:"center",transition:"all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",transform:m?"scale(1.15)":"scale(1)"},className:"jsx-a065696ba966750",children:[l,!f&&(0,t.jsx)("span",{style:{display:"inline-block",width:"2px",height:"0.9em",background:"var(--accent)",marginLeft:"2px",verticalAlign:"text-bottom",animation:"blink 0.7s steps(1) infinite"},className:"jsx-a065696ba966750"})]}),!f&&(0,t.jsx)("div",{style:{fontFamily:"var(--font-mono)",fontSize:"0.65rem",color:"var(--fg-dim)",textTransform:"uppercase",letterSpacing:"0.2em",height:"1em"},className:"jsx-a065696ba966750",children:i[o]?.lang}),f&&(0,t.jsx)("div",{style:{fontFamily:"var(--font-mono)",fontSize:"0.7rem",color:"var(--fg-dim)",letterSpacing:"0.15em",opacity:+!!m,transform:m?"translateY(0)":"translateY(8px)",transition:"all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s"},className:"jsx-a065696ba966750",children:"Software Engineer"}),(0,t.jsx)("div",{style:{position:"absolute",bottom:"3rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.75rem"},className:"jsx-a065696ba966750",children:(0,t.jsx)("div",{style:{width:"120px",height:"2px",background:"var(--border)",borderRadius:"1px",overflow:"hidden"},className:"jsx-a065696ba966750",children:(0,t.jsx)("div",{style:{height:"100%",width:`${x}%`,background:"var(--accent)",borderRadius:"1px",transition:"width 0.3s ease"},className:"jsx-a065696ba966750"})})}),(0,t.jsx)(n.default,{id:"a065696ba966750",children:"@keyframes blink{0%,to{opacity:1}50%{opacity:0}}"})]})}e.s(["default",0,function({children:e}){let[n,i]=(0,r.useState)(!0),o=(0,r.useCallback)(()=>{i(!1)},[]);return(0,t.jsxs)(t.Fragment,{children:[n&&(0,t.jsx)(a,{onComplete:o}),(0,t.jsx)("div",{style:{opacity:+!n,transition:"opacity 0.5s ease"},children:e})]})}],97724)}]);