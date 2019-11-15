
/* Smart HTML Elements v5.0.0 (2019-November) 
Copyright (c) 2011-2019 jQWidgets. 
License: https://htmlelements.com/license/ */

Smart.Utilities.Assign("Draw",class{constructor(a,b){const c=this;c.host=a,c.renderEngine=b||"",c.refresh();const d=["clear","removeElement","attr","getAttr","line","circle","rect","path","pieslice","pieSlicePath","text","measureText"];for(let e in d)c._addFn(Smart.Utilities.Draw.prototype,d[e])}_addFn(a,b){a[b]||(a[b]=function(){return this.renderer[b].apply(this.renderer,arguments)})}_initRenderer(a){return this.createRenderer(this,a)}_internalRefresh(){const a=this;if(a.renderer||(a.host.innerHTML="",a._initRenderer(a.host)),"none"!==window.getComputedStyle(a.host).display){const b=a.renderer;if(b){const c=b.getRect();a._render({x:1,y:1,width:c.width,height:c.height})}}}_render(a){this._plotRect=a}refresh(){this._internalRefresh()}getSize(){const a=this._plotRect;return{width:a.width,height:a.height}}toGreyScale(a){if(-1===a.indexOf("#"))return a;const b=this.cssToRgb(a);b[0]=b[1]=b[2]=Math.round(.3*b[0]+.59*b[1]+.11*b[2]);const c=this.rgbToHex(b[0],b[1],b[2]);return"#"+c[0]+c[1]+c[2]}decToHex(a){return a.toString(16)}hexToDec(a){return parseInt(a,16)}rgbToHex(a,c,d){return[this.decToHex(a),this.decToHex(c),this.decToHex(d)]}hexToRgb(a,b,c){return[this.hexToDec(a),this.hexToDec(b),this.hexToDec(c)]}cssToRgb(a){return-1>=a.indexOf("rgb")?this.hexToRgb(a.substring(1,3),a.substring(3,5),a.substring(5,7)):a.substring(4,a.length-1).split(",")}hslToRgb(a){let c,d,e;const f=parseFloat(a[0]),h=parseFloat(a[1]),i=parseFloat(a[2]);if(0===h)c=d=e=i;else{const a=.5>i?i*(1+h):i+h-i*h,b=2*i-a;c=this.hueToRgb(b,a,f+1/3),d=this.hueToRgb(b,a,f),e=this.hueToRgb(b,a,f-1/3)}return[255*c,255*d,255*e]}hueToRgb(a,b,c){return(0>c&&(c+=1),1<c&&(c-=1),c<1/6)?a+6*(b-a)*c:c<1/2?b:c<2/3?a+6*((b-a)*(2/3-c)):a}rgbToHsl(a){const c=parseFloat(a[0])/255,d=parseFloat(a[1])/255,e=parseFloat(a[2])/255,b=Math.max(c,d,e),f=Math.min(c,d,e);let g,i,j=(b+f)/2;if(b===f)g=i=0;else{const a=b-f;i=.5<j?a/(2-b-f):a/(b+f);b===c?g=(d-e)/a+(d<e?6:0):b===d?g=(e-c)/a+2:b===e?g=(c-d)/a+4:void 0;g/=6}return[g,i,j]}swap(a,b){const c=a;a=b,b=c}getNum(a){if(!(a.constructor!==Array)){for(let b=0;b<a.length;b++)if(!isNaN(a[b]))return a[b];}else if(isNaN(a))return 0;return 0}_ptRotate(a,b,c,d,e){var f=Math.pow,g=Math.abs;const h=Math.sqrt(f(g(a-c),2)+f(g(b-d),2)),i=Math.asin((a-c)/h),j=i+e;return a=c+Math.cos(j)*h,b=d+Math.sin(j)*h,{x:a,y:b}}log(a,b){var c=Math.log;return c(a)/(b?c(b):1)}_mod(c,d){const e=Math.abs(c>d?d:c);let f=1;if(0!==e)for(;100>e*f;)f*=10;return c*=f,d*=f,c%d/f}createRenderer(a,b){const c=a;let d=c.renderer=null;return document.createElementNS&&"HTML5"!==c.renderEngine&&(d=new Smart.Utilities.SvgRenderer(this)),null===d&&("HTML5"===c.renderEngine||void 0===c.renderEngine)&&(d=new Smart.Utilities.HTML5Renderer(this)),d.init(b),c.renderer=d,d}getByPriority(a){let b;for(let c=0;c<a.length;c++){const d=a[c];if(d!==void 0&&null!==d&&""!==d){b=d;break}}return b}get(a,b,c){return c===void 0?a[b]:a[b][c]}min(a,b){let c=NaN;for(let d=0;d<a.length;d++){const e=this.get(a,d,b);(isNaN(c)||e<c)&&(c=e)}return c}max(a,b){let c=NaN;for(let d=0;d<a.length;d++){const e=this.get(a,d,b);(isNaN(c)||e>c)&&(c=e)}return c}sum(a,b){let c=0;for(let d=0;d<a.length;d++){const e=this.get(a,d,b);isNaN(e)||(c+=e)}return c}count(a,b){let c=0;for(let d=0;d<a.length;d++){const e=this.get(a,d,b);isNaN(e)||c++}return c}avg(a,b){return this.sum(a,b)/Math.max(1,this.count(a,b))}filter(a,b){if(!b)return a;const c=[];for(let d=0;d<a.length;d++)b(a[d])&&c.push(a[d]);return c}scale(a,b,c,d){var e=Math.pow,f=Math.abs,g=Math.min,h=Math.max;if(isNaN(a))return NaN;if((a<g(b.min,b.max)||a>h(b.min,b.max))&&(!d||!0!==d.ignore_range))return NaN;let i=NaN,j=1;if(b.type===void 0||"logarithmic"!==b.type){let c=f(b.max-b.min);c||(c=1),j=f(a-g(b.min,b.max))/c}else if("logarithmic"===b.type){let c=b.base;isNaN(c)&&(c=10);let d=g(b.min,b.max);0>=d&&(d=1);let i=h(b.min,b.max);0>=i&&(i=1);const k=this.log(i,c);i=e(c,k);const l=this.log(d,c);d=e(c,l);const m=this.log(a,c);j=f(m-l)/(k-l)}if("logarithmic"===c.type){let a=c.base;isNaN(a)&&(a=10);const b=this.log(c.max,a),d=this.log(c.min,a);c.flip&&(j=1-j);const h=g(d,b)+j*f(b-d);i=e(a,h)}else i=g(c.min,c.max)+j*f(c.max-c.min),c.flip&&(i=h(c.min,c.max)-i+c.min);return i}axis(a,b,c){var d=Math.floor,e=Math.pow,f=Math.round;if(1>=c)return[b,a];(isNaN(c)||2>c)&&(c=2);let g=0;for(;f(a)!==a&&f(b)!==b&&10>g;)a*=10,b*=10,g++;let h=(b-a)/c;for(;10>g&&f(h)!==h;)a*=10,b*=10,h*=10,g++;const j=[1,2,5];let k,l=0;for(;;){let a=l%j.length,b=d(l/j.length),c=e(10,b)*j[a];if(a=(l+1)%j.length,b=d((l+1)/j.length),k=e(10,b)*j[a],h>=c&&h<k)break;l++}const m=k,n=[];let o=this.renderer._rnd(a,m,!1);for(const d=0>=g?1:e(10,g);o<b+m;)n.push(o/d),o+=m;return n}_widgetToImage(a,b,c,d,e){let f=a;if(!f)return!1;(void 0===c||""===c)&&(c="image."+b);let g=f.renderEngine,h=f.animation;if(f.animation="none",f.renderEngine="HTML5",f.renderEngine!==g)try{f.refresh()}catch(a){return f.renderEngine=g,f.refresh(),f.animation=h,!1}let i=f.renderer.getContainer().firstElementChild,j=!0;"function"==typeof d&&(j=d(a,i));let k=!0;return j&&(k=this.exportImage(a,i,b,c,e)),f.renderEngine!==g&&(f.renderEngine=g,f.refresh(),f.animation=h),k}_saveAsImage(a,b){return this._widgetToImage(this,a,b)}saveAsPNG(a){return this._saveAsImage("png",a)}saveAsJPEG(a){return this._saveAsImage("jpeg",a)}exportImage(a,b,c,d,e){if(!b)return!1;let f="pdf"===c.toLowerCase();f&&(c="jpeg"),(d===void 0||""===d)&&(d="image."+c);let g=!0;if("print"===c){const a=window.open("","","width=800,height=500"),c=a.document.open(),d="<!DOCTYPE html><html><head><meta charset=\"utf-8\" /><title>jQWidgets Chart</title></head><body><img src=\""+b.toDataURL()+"\" /></html>";try{c.write(d),c.close(),setTimeout(function(){a.print(),a.close()},100)}catch(a){}return}try{if(b)if(f){e=e||"portrait";const f=b.toDataURL("image/"+c),g={content:{image:f,width:Math.min(b.width/1.35,"portrait"===e?515:762)},pageOrientation:e};try{pdfMake.createPdf(g).download(d)}catch(b){a.error(a.localize("missingReference",{files:"pdfmake.min.js"}))}}else{Smart.Utilities.DataExporter||a.error(a.localize("missingReference",{files:"smart.export.js"}));const e=new Smart.Utilities.DataExporter;b.toBlob(function(a){e.downloadFile(a,c,d)})}}catch(a){g=!1}return g}}),Smart.Utilities.Assign("Renderer",class{constructor(a){const b=this;b.draw=a,b._gradients={},b._toRadiansCoefficient=2*Math.PI/360}pieSlicePath(a,b,c,d,e,f,g){var h=Math.sin,i=Math.cos,j=Math.abs;d||(d=1);const k=j(e-f),l=180<k?1:0;360<=k&&(f=e+359.99);const m=e*this._toRadiansCoefficient,n=f*this._toRadiansCoefficient;let o=a,p=a,q=b,r=b;const s=!isNaN(c)&&0<c;s&&(g=0);const t=i(m),u=h(m),v=i(n),w=h(n);if(0<g+c){if(0<g){const c=(k/2+e)*this._toRadiansCoefficient;a+=g*i(c),b-=g*h(c)}s&&(o=a+c*t,q=b-c*u,p=a+c*v,r=b-c*w)}const z=a+d*t,A=a+d*v,B=b-d*u,C=b-d*w;let D="";const E=.02<j(j(f-e)-360);return s?(D="M "+p+","+r,D+=" a"+c+","+c,D+=" 0 "+l+",1 "+(o-p)+","+(q-r),D+=E?" L"+z+","+B:" M"+z+","+B,D+=" a"+d+","+d,D+=" 0 "+l+",0 "+(A-z)+","+(C-B),E&&(D+=" Z")):(D="M "+A+","+C,D+=" a"+d+","+d,D+=" 0 "+l+",1 "+(z-A)+","+(B-C),E&&(D+=" L"+a+","+b,D+=" Z")),D}measureText(a,b,c,d){var e=Math.abs;const f=this._getTextParts(a,b,c),g=f.width;let h=f.height;!1===d&&(h/=.6);let i={};if(isNaN(b)&&(b=0),0===b)i={width:this._rup(g),height:this._rup(h)};else{const a=2*(b*Math.PI)/360,c=e(Math.sin(a)),d=e(Math.cos(a)),f=e(g*c+h*d),j=e(g*d+h*c);i={width:this._rup(j),height:this._rup(f)}}return d&&(i.textPartsInfo=f),i}alignTextInRect(a,b,c,d,e,f,g,h,i,j){const k=2*(i*Math.PI)/360,l=Math.sin(k),m=Math.cos(k),n=e*l,o=e*m;"center"===g||""===g||"undefined"===g?a+=c/2:"right"===g&&(a+=c),"center"===h||"middle"===h||""===h||"undefined"===h?b+=d/2:"bottom"===h?b+=d-f/2:"top"==h&&(b+=f/2),j=j||"";let p="middle";-1===j.indexOf("top")?-1!==j.indexOf("bottom")&&(p="bottom"):p="top";let q="center";return-1===j.indexOf("left")?-1!==j.indexOf("right")&&(q="right"):q="left","center"==q?(a-=o/2,b-=n/2):"right"==q&&(a-=o,b-=n),"top"==p?(a-=f*l,b+=f*m):"middle"==p&&(a-=f*l/2,b+=f*m/2),a=this._rup(a),b=this._rup(b),{x:a,y:b}}adjustColor(a,b){var c=Math.min;if("string"!=typeof a)return"#000000";if(-1===a.indexOf("#"))return a;const d=this.draw;let e=d.cssToRgb(a);const f=d.rgbToHsl(e);f[2]=c(1,f[2]*b),f[1]=c(1,1.1*(f[1]*b)),e=d.hslToRgb(f),a="#";for(let f,c=0;3>c;c++)f=Math.round(e[c]),f=d.decToHex(f),1===f.toString().length&&(a+="0"),a+=f;return a.toUpperCase()}_rup(a){let b=Math.round(a);return a>b&&b++,b}_ptdist(a,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-b)*(d-b))}_rnd(b,c,d,e){if(isNaN(b))return b;void 0===e&&(e=!0);let f=b-(!0===e?b%c:this._mod(b,c));return b===f?f:(d?b>f&&(f+=c):f>b&&(f-=c),1===c?Math.round(f):f)}_ptrnd(a){var b=Math.round;if(!document.createElementNS)return b(a)===a?a:this._rnd(a,1,!1,!0);const c=this._rnd(a,.5,!1,!0);return .5===Math.abs(c-b(c))?c:c>a?c-.5:c+.5}_getContrastColor(a){if(void 0!==a){let b=this.draw.hexToRgb(a.slice(1,3),a.slice(3,5),a.slice(5,7)),c=(.299*b[0]+.61*b[1]+.114*b[2])/255;return .6<c?"#000000":"#FFFFFF"}}}),Smart.Utilities.Assign("SvgRenderer",class extends Smart.Utilities.Renderer{constructor(a){super(a);const b=this;b._svgns="http://www.w3.org/2000/svg",b._openGroups=[],b._clipId=0}init(a){const b=document.createElement("div");b.className="drawContainer",b.onselectstart=function(){return!1},a.appendChild(b),this.host=a,this.container=b;try{const a=document.createElementNS(this._svgns,"svg");a.setAttribute("version","1.1"),a.setAttribute("width","100%"),a.setAttribute("height","100%"),a.setAttribute("overflow","hidden"),b.appendChild(a),this.canvas=a}catch(a){return!1}return this._id=new Date().getTime(),this.clear(),!0}getType(){return"SVG"}refresh(){}getRect(){var a=Math.max;return{x:0,y:0,width:a(this._rup(this.host.offsetWidth)-1,0),height:a(this._rup(this.host.offsetHeight)-1,0)}}getContainer(){return this.container}clear(){for(;0<this.canvas.childNodes.length;)this.removeElement(this.canvas.firstElementChild);this._defaultParent=void 0,this._defs=document.createElementNS(this._svgns,"defs"),this._gradients={},this.canvas.appendChild(this._defs)}removeElement(a){if(void 0!==a)try{for(;a.firstChild;)this.removeElement(a.firstChild);a.parentNode?a.parentNode.removeChild(a):this.canvas.removeChild(a)}catch(a){}}beginGroup(){const a=this._activeParent(),b=document.createElementNS(this._svgns,"g");return a.appendChild(b),this._openGroups.push(b),b}endGroup(){0===this._openGroups.length||this._openGroups.pop()}_activeParent(){return 0===this._openGroups.length?this.canvas:this._openGroups[this._openGroups.length-1]}createClipRect(a){const b=document.createElementNS(this._svgns,"clipPath"),c=document.createElementNS(this._svgns,"rect");return this.attr(c,{x:a.x,y:a.y,width:a.width,height:a.height,fill:"none"}),this._clipId=this._clipId||0,b.id="cl"+this._id+"_"+(++this._clipId).toString(),b.appendChild(c),this._defs.appendChild(b),b}getWindowHref(){let a=window.location.href;return a?(a=a.replace(/([\('\)])/g,"\\$1"),a=a.replace(/#.*$/,""),a):a}setClip(a,b){const c="url("+this.getWindowHref()+"#"+b.id+")";return this.attr(a,{"clip-path":c})}addHandler(a,b,c){a.addEventListener(b,c)}removeHandler(){}on(a,b,c){this.addHandler(a,b,c)}off(a,b,c){this.removeHandler(a,b,c)}shape(a,b){const c=document.createElementNS(this._svgns,a);if(c){for(let a in b)c.setAttribute(a,b[a]);return this._activeParent().appendChild(c),c}}_getTextParts(a,b,c){const d={width:0,height:0,parts:[]};if(void 0===a)return d;const e=a.toString().split("<br>"),f=this._activeParent(),g=document.createElementNS(this._svgns,"text");this.attr(g,c);for(let h=0;h<e.length;h++){const a=e[h],b=g.ownerDocument.createTextNode(a);g.appendChild(b),f.appendChild(g);let c;try{c=g.getBBox()}catch(a){}const i=this._rup(c.width),j=this._rup(c.height*.6);g.removeChild(b),d.width=Math.max(d.width,i),d.height+=j+(0<h?4:0),d.parts.push({width:i,height:j,text:a})}return f.removeChild(g),d}_measureText(a,b,c,d){return super.measureText(a,b,c,d)}measureText(a,b,c){return this._measureText(a,b,c,!1)}text(a,b,c,d,e,f,g,i,j,k,l){const m=this._measureText(a,f,g,!0,this),n=m.textPartsInfo,o=n.parts,p=this._getContrastColor(arguments[11]);let q;if(j||(j="center"),k||(k="center"),(1<o.length||i)&&(q=this.beginGroup()),i){const a=this.createClipRect({x:this._rup(b)-1,y:this._rup(c)-1,width:this._rup(d)+2,height:this._rup(e)+2});this.setClip(q,a)}let r=this._activeParent(),s=0,t=0;s=n.width,t=n.height,(isNaN(d)||0>=d)&&(d=s),(isNaN(e)||0>=e)&&(e=t);const u=d||0,v=e||0;let h=0;if(!f||0===f){c+=t,"center"===k||"middle"===k?c+=(v-t)/2:"bottom"===k&&(c+=v-t),d||(d=s),e||(e=t),r=this._activeParent();let a;for(let d=o.length-1;0<=d;d--){a=document.createElementNS(this._svgns,"text"),this.attr(a,g),this.attr(a,{cursor:"default"});const e=a.ownerDocument.createTextNode(o[d].text);a.appendChild(e);let f=b;const i=o[d].width,k=o[d].height;"center"===j?f+=(u-i)/2:"right"==j&&(f+=u-i),this.attr(a,{x:this._rup(f),y:this._rup(c+h),width:this._rup(i),height:this._rup(k)}),void 0!==p&&(a.style.fill=p),r.appendChild(a),h-=o[d].height+4}return q?(this.endGroup(),q):a}const w=this.alignTextInRect(b,c,d,e,s,t,j,k,f,l);b=w.x,c=w.y;const z=this.shape("g",{transform:"translate("+b+","+c+")"}),A=this.shape("g",{transform:"rotate("+f+")"});z.appendChild(A),h=0;for(let m=o.length-1;0<=m;m--){const a=document.createElementNS(this._svgns,"text");this.attr(a,g),this.attr(a,{cursor:"default"});const b=a.ownerDocument.createTextNode(o[m].text);a.appendChild(b);let c=0;const d=o[m].width,e=o[m].height;"center"===j?c+=(n.width-d)/2:"right"==j&&(c+=n.width-d),this.attr(a,{x:this._rup(c),y:this._rup(h),width:this._rup(d),height:this._rup(e)}),A.appendChild(a),h-=e+4}return r.appendChild(z),q&&this.endGroup(),z}line(a,b,c,d,e){const f=this.shape("line",{x1:a,y1:b,x2:c,y2:d});return this.attr(f,e),f}path(a,b){const c=this.shape("path");return c.setAttribute("d",a),b&&this.attr(c,b),c}rect(a,b,c,d,e){var f=Math.max;a=this._ptrnd(a),b=this._ptrnd(b),c=f(1,this._rnd(c,1,!1)),d=f(1,this._rnd(d,1,!1));const g=this.shape("rect",{x:a,y:b,width:c,height:d});return e&&this.attr(g,e),g}circle(a,b,c,d){const e=this.shape("circle",{cx:a,cy:b,r:c});return d&&this.attr(e,d),e}pieslice(a,b,c,d,e,f,g,h){const i=this.pieSlicePath(a,b,c,d,e,f,g),j=this.shape("path");return j.setAttribute("d",i),h&&this.attr(j,h),j}attr(a,b){if(a&&b)for(let c in b)"textContent"==c?a.textContent=b[c]:a.setAttribute(c,b[c])}removeAttr(a,b){if(a&&b)for(let c in b)"textContent"==c?a.textContent="":a.removeAttribute(b[c])}getAttr(a,b){return a.getAttribute(b)}_toLinearGradient(a,b,c){const d="grd"+this._id+a.replace("#","")+(b?"v":"h"),e="url("+this.getWindowHref()+"#"+d+")";if(this._gradients[e])return e;const f=document.createElementNS(this._svgns,"linearGradient");this.attr(f,{x1:"0%",y1:"0%",x2:b?"0%":"100%",y2:b?"100%":"0%",id:d});for(let d=0;d<c.length;d++){const b=c[d],e=document.createElementNS(this._svgns,"stop"),g="stop-color:"+this.adjustColor(a,b[1]);this.attr(e,{offset:b[0]+"%",style:g}),f.appendChild(e)}return this._defs.appendChild(f),this._gradients[e]=!0,e}_toRadialGradient(a,b,c){const d="grd"+this._id+a.replace("#","")+"r"+(void 0===c?"":c.key),e="url("+this.getWindowHref()+"#"+d+")";if(this._gradients[e])return e;const f=document.createElementNS(this._svgns,"radialGradient");void 0===c?this.attr(f,{cx:"50%",cy:"50%",r:"100%",fx:"50%",fy:"50%",id:d}):this.attr(f,{cx:c.x,cy:c.y,r:c.outerRadius,id:d,gradientUnits:"userSpaceOnUse"});for(let d=0;d<b.length;d++){const c=b[d],e=document.createElementNS(this._svgns,"stop"),g="stop-color:"+this.adjustColor(a,c[1]);this.attr(e,{offset:c[0]+"%",style:g}),f.appendChild(e)}return this._defs.appendChild(f),this._gradients[e]=!0,e}}),Smart.Utilities.Assign("HTML5Renderer",class extends Smart.Utilities.Renderer{constructor(a){super(a);const b=this;b._renderers=new Smart.Utilities.HTML5RenderHelpers(b)}init(a){try{this.host=a;const b=document.createElement("div"),c=document.createElement("canvas");b.className="chartContainer",b.style.position="relative",b.onselectstart=function(){return!1},c.id="__smartCanvasWrap",c.style.width="100%",c.style.height="100%",b.appendChild(c),a.appendChild(b),this.canvas=c,c.width=a.offsetWidth,c.height=a.offsetHeight,this.ctx=c.getContext("2d"),this._elements={},this._maxId=0,this._gradientId=0,this._gradients={},this._currentPoint={x:0,y:0},this._lastCmd="",this._pos=0}catch(a){return!1}return!0}getType(){return"HTML5"}getContainer(){let a=this.host.getElementsByClassName("chartContainer")[0];return a}getRect(){return{x:0,y:0,width:this.canvas.width-1,height:this.canvas.height-1}}beginGroup(){}endGroup(){}setClip(){}createClipRect(){}addHandler(){}removeHandler(){}on(a,b,c){this.addHandler(a,b,c)}off(a,b,c){this.removeHandler(a,b,c)}clear(){this._elements={},this._maxId=0,this._renderers._gradients={},this._gradientId=0}removeElement(a){void 0===a||this._elements[a.id]&&delete this._elements[a.id]}shape(a,b){let c={type:a,id:this._maxId++};for(let d in b)c[d]=b[d];return this._elements[c.id]=c,c}attr(a,b){for(let c in b)a[c]=b[c]}removeAttr(a,b){for(let c in b)delete a[b[c]]}rect(a,b,c,d,e){if(isNaN(a))throw"Invalid value for \"x\"";if(isNaN(b))throw"Invalid value for \"y\"";if(isNaN(c))throw"Invalid value for \"width\"";if(isNaN(d))throw"Invalid value for \"height\"";let f=this.shape("rect",{x:a,y:b,width:c,height:d});return e&&this.attr(f,e),f}path(a,b){let c=this.shape("path",b);return this.attr(c,{d:a}),c}line(a,b,c,d,e){return this.path("M "+a+","+b+" L "+c+","+d,e)}circle(a,b,c,d){let e=this.shape("circle",{x:a,y:b,r:c});return d&&this.attr(e,d),e}pieslice(a,b,c,d,e,f,g,h){let i=this.path(this.pieSlicePath(a,b,c,d,e,f,g),h);return this.attr(i,{x:a,y:b,innerRadius:c,outerRadius:d,angleFrom:e,angleTo:f}),i}_getCSSStyle(a){const b=document.createElement("div");b.className=a,b.style.position="absolute",b.style.visibility="hidden",this.host.appendChild(b);let c=window.getComputedStyle(b);return c={color:c.color,fontFamily:c.fontFamily,fontSize:c.fontSize,fontWeight:c.fontWeight},this.host.removeChild(b),c}_getTextParts(a,b,c){let d="Arial",e="10pt",f="";if(c&&c["class"]){let a=this._getCSSStyle(c["class"]);a.fontSize&&(e=a.fontSize),a.fontFamily&&(d=a.fontFamily),a.fontWeight&&(f=a.fontWeight)}this.ctx.font=f+" "+e+" "+d;let g={width:0,height:0,parts:[]},h=a.toString().split("<br>");for(let d=0;d<h.length;d++){let a=h[d],b=this.ctx.measureText(a).width,c=document.createElement("span");c.className="smartchart",c.font=this.ctx.font,c.textContent=a,this.host.appendChild(c);let e=c.offsetHeight*.6;this.host.removeChild(c),g.width=Math.max(g.width,this._rup(b)),g.height+=e+(0<d?4:0),g.parts.push({width:b,height:e,text:a})}return g}_measureText(a,b,c,d){return super.measureText(a,b,c,d)}measureText(a,b,c){return this._measureText(a,b,c,!1)}text(a,b,c,d,e,f,g,h,i,j,k){let l=this.shape("text",{text:a,x:b,y:c,width:d,height:e,angle:f,clip:h,halign:i,valign:j,rotateAround:k});if(g&&this.attr(l,g),l.fontFamily="Arial",l.fontSize="10pt",l.fontWeight="",l.color=this._getContrastColor(arguments[11]),g&&g["class"]){let a=this._getCSSStyle(g["class"]);l.fontFamily=a.fontFamily||l.fontFamily,l.fontSize=a.fontSize||l.fontSize,l.fontWeight=a.fontWeight||l.fontWeight,l.color=l.color||a.color}l.color=l.color||"#000000";let m=this._measureText(a,0,g,!0);return this.attr(l,{textPartsInfo:m.textPartsInfo,textWidth:m.width,textHeight:m.height}),(0>=d||isNaN(d))&&this.attr(l,{width:m.width}),(0>=e||isNaN(e))&&this.attr(l,{height:m.height}),l}_toLinearGradient(a,b,c){if(this._renderers._gradients[a])return a;let d=[];for(let e=0;e<c.length;e++)d.push({percent:c[e][0]/100,color:this.adjustColor(a,c[e][1])});let e="gr"+this._gradientId++;return this.createGradient(e,b?"vertical":"horizontal",d),e}_toRadialGradient(a,b){if(this._renderers._gradients[a])return a;let c=[];for(let d=0;d<b.length;d++)c.push({percent:b[d][0]/100,color:this.adjustColor(a,b[d][1])});let d="gr"+this._gradientId++;return this.createGradient(d,"radial",c),d}createGradient(a,b,c){this._renderers.createGradient(this,a,b,c)}refresh(){for(let a in this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this._elements){let b=this._elements[a];this._renderers.setFillStyle(this,b),this._renderers.setStroke(this,b),this._renderers[this._elements[a].type](this.ctx,b)}}}),Smart.Utilities.Assign("HTML5RenderHelpers",class{constructor(a){this.HTML5Renderer=a,this._cmds="mlcazq"}ptrnd(a){var b=Math.round;if(.5===Math.abs(b(a)-a))return a;let c=b(a);return c<a&&--c,c+.5}createGradient(a,b,c,d){a._gradients[b]={orientation:c,colorStops:d}}setStroke(a,b){let c=a.ctx,d=b["stroke-width"];c.strokeStyle=b.stroke||"transparent",c.lineWidth=0===d?.01:void 0===d?1:d,c.globalAlpha=void 0===b["fill-opacity"]?void 0===b.opacity?1:b.opacity:b["fill-opacity"],c.setLineDash&&(b["stroke-dasharray"]?c.setLineDash(b["stroke-dasharray"].split(",")):c.setLineDash([]))}setFillStyle(a,b){let c=a.ctx;if(c.fillStyle="transparent",c.globalAlpha=void 0===b["fill-opacity"]?void 0===b.opacity?1:b.opacity:b["fill-opacity"],b.fill&&-1===b.fill.indexOf("#")&&a._gradients[b.fill]){let d,e="horizontal"!==a._gradients[b.fill].orientation,f="radial"===a._gradients[b.fill].orientation,g=this.ptrnd(b.x),h=this.ptrnd(b.y),i=this.ptrnd(b.x+(e?0:b.width)),j=this.ptrnd(b.y+(e?b.height:0));if(("circle"===b.type||"path"===b.type||"rect"===b.type)&&f){let a=this.ptrnd(b.x),e=this.ptrnd(b.y);const f=b.innerRadius||0,g=b.outerRadius||b.r||0;"rect"===b.type&&(a+=b.width/2,e+=b.height/2),d=c.createRadialGradient(a,e,f,a,e,g)}f||((isNaN(g)||isNaN(i)||isNaN(h)||isNaN(j))&&(g=0,h=0,i=e?0:c.canvas.width,j=e?c.canvas.height:0),d=c.createLinearGradient(g,h,i,j));let k=a._gradients[b.fill].colorStops;for(let a=0;a<k.length;a++)d.addColorStop(k[a].percent,k[a].color);c.fillStyle=d}else b.fill&&(c.fillStyle=b.fill)}rect(a,b){0===b.width||0===b.height||(a.fillRect(this.ptrnd(b.x),this.ptrnd(b.y),b.width,b.height),a.strokeRect(this.ptrnd(b.x),this.ptrnd(b.y),b.width,b.height))}circle(a,b){0===b.r||(a.beginPath(),a.arc(this.ptrnd(b.x),this.ptrnd(b.y),b.r,0,2*Math.PI,!1),a.closePath(),a.fill(),a.stroke())}_parsePoint(a){let b=this._parseNumber(a),c=this._parseNumber(a);return{x:b,y:c}}_parseNumber(a){let b,c=!1;for(b=this._pos;b<a.length;b++){if("0"<=a[b]&&"9">=a[b]||"."===a[b]||"e"===a[b]||"-"===a[b]&&!c||"-"===a[b]&&1<=b&&"e"===a[b-1]){c=!0;continue}if(!c&&(" "===a[b]||","===a[b])){this._pos++;continue}break}let d=parseFloat(a.substring(this._pos,b));if(!isNaN(d))return this._pos=b,d}_isRelativeCmd(a){return-1!==this._cmds.indexOf(a)}_parseCmd(a){for(let b=this._pos;b<a.length;b++){if(-1!==this._cmds.toLowerCase().indexOf(a[b].toLowerCase()))return this._pos=b+1,this._lastCmd=a[b],this._lastCmd;if(" "===a[b]){this._pos++;continue}if("0"<=a[b]&&"9">=a[b])if(this._pos=b,""===this._lastCmd)break;else return this._lastCmd}}_toAbsolutePoint(a){return{x:this._currentPoint.x+a.x,y:this._currentPoint.y+a.y}}path(b,a){var c=Math.PI,d=Math.sin,e=Math.cos,f=Math.sqrt,g=Math.pow;let h=a.d;this._pos=0,this._lastCmd="";let i;for(this._currentPoint={x:0,y:0},b.beginPath();this._pos<h.length;){let j=this._parseCmd(h);if(j===void 0)break;if("M"===j||"m"===j){let a=this._parsePoint(h);if(void 0===a)break;b.moveTo(a.x,a.y),this._currentPoint=a,void 0===i&&(i=a);continue}if("L"===j||"l"===j){let a=this._parsePoint(h);if(void 0===a)break;b.lineTo(a.x,a.y),this._currentPoint=a;continue}if("A"===j||"a"===j){let i=this._parseNumber(h),k=this._parseNumber(h),l=this._parseNumber(h)*(c/180),n=this._parseNumber(h),o=this._parseNumber(h),p=this._parsePoint(h);if(this._isRelativeCmd(j)&&(p=this._toAbsolutePoint(p)),0===i||0===k)continue;let q=this._currentPoint,t={x:e(l)*(q.x-p.x)/2+d(l)*(q.y-p.y)/2,y:-d(l)*(q.x-p.x)/2+e(l)*(q.y-p.y)/2},w=g(t.x,2)/g(i,2)+g(t.y,2)/g(k,2);1<w&&(i*=f(w),k*=f(w));let x=(n===o?-1:1)*f((g(i,2)*g(k,2)-g(i,2)*g(t.y,2)-g(k,2)*g(t.x,2))/(g(i,2)*g(t.y,2)+g(k,2)*g(t.x,2)));isNaN(x)&&(x=0);let s={x:x*i*t.y/k,y:x*-k*t.x/i},y={x:(q.x+p.x)/2+e(l)*s.x-d(l)*s.y,y:(q.y+p.y)/2+d(l)*s.x+e(l)*s.y},z=function(a){return f(g(a[0],2)+g(a[1],2))},m=function(a,b){return(a[0]*b[0]+a[1]*b[1])/(z(a)*z(b))},r=function(a,b){return(a[0]*b[1]<a[1]*b[0]?-1:1)*Math.acos(m(a,b))},a=r([1,0],[(t.x-s.x)/i,(t.y-s.y)/k]),A=[(t.x-s.x)/i,(t.y-s.y)/k],u=[(-t.x-s.x)/i,(-t.y-s.y)/k],v=r(A,u);-1>=m(A,u)&&(v=c),1<=m(A,u)&&(v=0),0===o&&0<v&&(v-=2*c),1===o&&0>v&&(v+=2*c);let B=i>k?i:k,C=i>k?1:i/k,D=i>k?k/i:1;b.translate(y.x,y.y),b.rotate(l),b.scale(C,D),b.arc(0,0,B,a,a+v,1-o),b.scale(1/C,1/D),b.rotate(-l),b.translate(-y.x,-y.y);continue}if(("Z"===j||"z"===j)&&void 0!==i){b.lineTo(i.x,i.y),this._currentPoint=i;continue}if("C"===j||"c"===j){let a=this._parsePoint(h),c=this._parsePoint(h),d=this._parsePoint(h);b.bezierCurveTo(a.x,a.y,c.x,c.y,d.x,d.y),this._currentPoint=d;continue}if("Q"===j||"q"===j){let a=this._parsePoint(h),c=this._parsePoint(h);b.quadraticCurveTo(a.x,a.y,c.x,c.y),this._currentPoint=c;continue}}b.fill(),b.stroke(),b.closePath()}text(a,b){let c=this.ptrnd(b.x),d=this.ptrnd(b.y),e=this.ptrnd(b.width),f=this.ptrnd(b.height),g=b.halign,i=b.valign,j=b.angle,k=b.rotateAround,l=b.textPartsInfo,m=l.parts,n=b.clip;void 0===n&&(n=!0),a.save(),g||(g="center"),i||(i="center"),n&&(a.rect(c,d,e,f),a.clip());let o=b.textWidth,p=b.textHeight,q=e||0,r=f||0;if(a.fillStyle=b.color,a.font=b.fontWeight+" "+b.fontSize+" "+b.fontFamily,!j||0===j){d+=p,"center"===i||"middle"===i?d+=(r-p)/2:"bottom"===i&&(d+=r-p),e||(e=o),f||(f=p);let b=0;for(let e=m.length-1;0<=e;e--){let f=m[e],h=c,i=m[e].width;"center"===g?h+=(q-i)/2:"right"===g&&(h+=q-i),a.fillText(f.text,h,d+b),b-=f.height+(0<e?4:0)}return void a.restore()}let h=this.HTML5Renderer.alignTextInRect(c,d,e,f,o,p,g,i,j,k);c=h.x,d=h.y;let s=2*(j*Math.PI)/360;a.translate(c,d),a.rotate(s);let t=0,u=l.width;for(let c,d=m.length-1;0<=d;d--)c=0,"center"===g?c+=(u-m[d].width)/2:"right"===g&&(c+=u-m[d].width),a.fillText(m[d].text,c,t),t-=m[d].height+4;a.restore()}}),Smart.Utilities.Assign("Plot",class{constructor(a){this.renderer=a}get(a,b,c){return c===void 0?a[b]:a[b][c]}min(a,b){let c=NaN;for(let d,e=0;e<a.length;e++)d=this.get(a,e,b),(isNaN(c)||d<c)&&(c=d);return c}max(a,b){let c=NaN;for(let d,e=0;e<a.length;e++)d=this.get(a,e,b),(isNaN(c)||d>c)&&(c=d);return c}sum(a,b){let c=0;for(let d,e=0;e<a.length;e++)d=this.get(a,e,b),isNaN(d)||(c+=d);return c}count(a,b){let c=0;for(let d,e=0;e<a.length;e++)d=this.get(a,e,b),isNaN(d)||c++;return c}avg(a,b){return this.sum(a,b)/Math.max(1,this.count(a,b))}filter(a,b){if(!b)return a;let c=[];for(let d=0;d<a.length;d++)b(a[d])&&c.push(a[d]);return c}scale(a,b,c,d){var e=Math.log,f=Math.pow,g=Math.abs,h=Math.min,i=Math.max;if(isNaN(a))return NaN;if((a<h(b.min,b.max)||a>i(b.min,b.max))&&(!d||!0!==d.ignore_range))return NaN;let j=NaN,k=1;if(b.type===void 0||"logarithmic"!==b.type){let c=g(b.max-b.min);c||(c=1),k=g(a-h(b.min,b.max))/c}else if("logarithmic"===b.type){let c=b.base;isNaN(c)&&(c=10);let d=h(b.min,b.max);0>=d&&(d=1);let j=i(b.min,b.max);0>=j&&(j=1);let l=e(j)/e(c);j=f(c,l);let m=e(d)/e(c);d=f(c,m);let n=e(a)/e(c);k=g(n-m)/(l-m)}if("logarithmic"===c.type){let a=c.base;isNaN(a)&&(a=10);let b=e(c.max)/e(a),d=e(c.min)/e(a);c.flip&&(k=1-k);let i=h(d,b)+k*g(b-d);j=f(a,i)}else j=h(c.min,c.max)+k*g(c.max-c.min),c.flip&&(j=i(c.min,c.max)-j+c.min);return j}axis(a,b,c){var d=Math.floor,e=Math.pow,f=Math.round;if(1>=c)return[b,a];(isNaN(c)||2>c)&&(c=2);let g=0;for(;f(a)!==a&&f(b)!==b&&10>g;)a*=10,b*=10,g++;let h=(b-a)/c;for(;10>g&&f(h)!==h;)a*=10,b*=10,h*=10,g++;let j,k=[1,2,5],l=0;for(;;){let a=l%k.length,b=d(l/k.length),c=e(10,b)*k[a];if(a=(l+1)%k.length,b=d((l+1)/k.length),j=e(10,b)*k[a],h>=c&&h<j)break;l++}let m=j,n=[],o=this.renderer._rnd(a,m,!1),p=0>=g?1:e(10,g);for(;o<b+m;)n.push(o/p),o+=m;return n}});