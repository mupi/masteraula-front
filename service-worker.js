"use strict";var precacheConfig=[["/index.html","6fdfff0fa3ce216d7e10b927781725f8"],["/static/css/main.fa2d6665.css","671224105043498a4424ac45a2c869e4"],["/static/js/main.9e6c4db6.js","736c0eb3a75278f312c1679252a4ab29"],["/static/media/avataruser3.adfc9d1c.png","adfc9d1c1bee20580e77c4c93dc2ef6a"],["/static/media/banner.ef2b8468.jpg","ef2b8468921feae7df9181301c8575c1"],["/static/media/clock.d8d94d4c.png","d8d94d4c60100b2d0344152108817820"],["/static/media/coruja-avatar.4c0a171d.png","4c0a171dcbdbf9566c6af0250736c980"],["/static/media/logo_masteraula-fd-verde.87bacab4.png","87bacab469a1bec33d109a6649bb1ec5"],["/static/media/logo_masteraula-rubrica-blanca.f135e7e8.png","f135e7e8de776e355a859d290bab0d90"],["/static/media/logo_masteraula.dc132bac.png","dc132bac960a37c790aebfb9ef2d90aa"],["/static/media/masteraula-300x60.42790791.png","42790791541df4e419590982c4c1052e"],["/static/media/money.0e5d6fa0.png","0e5d6fa02338f5fd8429b9c371b6a14b"],["/static/media/question-card.2f9bf3ac.jpg","2f9bf3ac729a1fba0b8a48e5239cdd6b"],["/static/media/search.b1225a53.png","b1225a53dbba5758eb500953f5e4750c"],["/static/media/sidebar-background-2.5e04d301.jpg","5e04d3019dfb3274ff31de6e268a3166"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),r=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),e=urlsToCacheKeys.has(t));var r="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});