
/* Smart HTML Elements v5.0.0 (2019-November) 
Copyright (c) 2011-2019 jQWidgets. 
License: https://htmlelements.com/license/ */

Smart("smart-card",class extends Smart.ContentElement{static get properties(){return{dataSource:{value:null,type:"object?",reflectToAttribute:!1},itemTemplate:{value:null,type:"any?",reflectToAttribute:!1},contentHandler:{value:null,type:"function?",reflectToAttribute:!1}}}static get listeners(){return{mouseenter:"_mouseEnterHandler",mouseleave:"_mouseLeaveHandler",swipeleft:"_swipeHandler",swiperight:"_swipeHandler",swipetop:"_swipeHandler",swipebottom:"_swipeHandler"}}static get styleUrls(){return["smart.card.css"]}template(){return`<div id="container" inner-h-t-m-l="[[innerHTML]]">
                <content></content>
            </div>`}propertyChangedHandler(a,b,c){super.propertyChangedHandler(a,b,c);const d=this;"itemTemplate"===a?(d._template=d._handleTemplate(),d.innerHTML=d._processTemplate(),d.contentHandler&&d.contentHandler(d)):"dataSource"===a?(d.innerHTML=d._processTemplate(),d.contentHandler&&d.contentHandler(d)):"contentHandler"===a?d.contentHandler&&d.contentHandler(d):void 0}ready(){super.ready()}render(){const a=this;a._template=a._handleTemplate(),a._template.hasBindings?a.innerHTML=a._processTemplate():a.itemTemplate&&(a.innerHTML=a._template.content),a.contentHandler&&a.contentHandler(a),super.render()}_handleTemplate(){const a=this;let b=a.itemTemplate,c="",d=!1,e=/{{\w+}}/g;return a.itemTemplate?b instanceof HTMLElement?c=b.innerHTML:(b=document.getElementById(b),c=b?b.innerHTML:""):c=a.innerHTML,e.exec(c)&&(d=!0),{content:c,hasBindings:d}}_processTemplate(){const a=this,b=/{{\w+}}/g,c=a._template.content.match(b),d=a.dataSource||{};let e=a._template.content;return c&&0!==c.length?(c.forEach(function(a){const b=a.replace("{{","").replace("}}","");let c=d[b];void 0===c&&(c=""),e=e.replace(a,c)}),e):e}_swipeHandler(){}});