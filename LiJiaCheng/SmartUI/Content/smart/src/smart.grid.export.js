
/* Smart HTML Elements v5.0.0 (2019-November) 
Copyright (c) 2011-2019 jQWidgets. 
License: https://htmlelements.com/license/ */

Smart.Utilities.Assign("Grid.Export",class{exportData(a){const b=this,c=new Smart.Utilities.DataExporter({exportHeader:b.dataExport.header}),d=[];if(c.expandChar=b.dataExport.expandChar,c.collapseChar=b.dataExport.collapseChar,c.pageOrientation=b.dataExport.pageOrientation,c.style=b.dataExport.style,c.filterBy=b.dataExport.filterBy,c.groupBy=b.dataExport.groupBy,c.header={columns:b.columns.toArray().slice(0),columngroups:b.columnGroups.slice(0)},!b.dataExport.style){const e=window.getComputedStyle(b),f=window.getComputedStyle(0<b.columns.length&&b.columns[0].element?b.columns[0].element:b.$.columnHeader),g=window.getComputedStyle(b.$.columnHeader),h=0===b.offsetWidth||0===b.offsetHeight;if(!h){const h=a=>{function b(a){return a=a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),a?"#"+c(a[1])+c(a[2])+c(a[3]).toUpperCase():"#ffffff"}function c(a){return isNaN(a)?"00":h[(a-a%16)/16]+h[a%16]}const d=a.fontSize,e=a.borderRightColor,f=a.backgroundColor,g=a.color,h=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];return{borderColor:b(e),fontSize:d,fontFamily:"Helvetica",color:b(g),backgroundColor:b(f)}},i=h(e),j=h(f),k=h(g),l={height:b.$.columnHeader.offsetHeight+"px",border:"1px solid "+i.borderColor,fontFamily:k.fontFamily,fontSize:k.fontSize,color:k.color,backgroundColor:j.backgroundColor,fontWeight:"400"},m={border:"1px solid "+i.borderColor,fontFamily:i.fontFamily,fontSize:i.fontSize},n={height:b.rowMinHeight+"px"};for(let c=0;c<b.columns.length;c++){const e=b.columns[c];if(!e.allowExport)continue;if(!e.visible)continue;l[e.dataField]={textAlign:e.align,width:e.computedWidth+"px",format:e.cellsFormat||""};let f=e.cellsFormat||"";"date"===e.dataType?f="d":"dateTime"===e.dataType?f="D":"time"===e.dataType&&(f="t");const g={textAlign:e.cellsAlign,format:f};if(m[e.dataField]=g,b.dataExport.view&&-1!==["html","jpeg","pdf","png"].indexOf(a)&&(e.template||e.formatFunction))for(let a=0;a<b.rows.length;a++){const c=b.rows[a];let f=b.rows[a]["column_"+e.dataField];if(b.dataExport.viewStart&&a<b.dataExport.viewStart||b.dataExport.viewEnd&&a>b.dataExport.viewEnd)continue;if(!f||c&&c.element&&c.element.classList.contains("smart-hidden")){const a=b._rowElements[0];if(!a)continue;if(c.element=a,c.grid=b,c.render(),f=c["column_"+e.dataField],!f)continue}const h={border:f.borderColor,background:f.background,color:f.color},i=void 0===b.dataExport.viewStart?a:a-b.dataExport.viewStart;d[a]=Object.assign({},c.data),d[a][e.dataField]=f.element.textContent,g[i]=h}}0<b.appearance.alternationCount&&(n.alternationCount=b.appearance.alternationCount,n.alternationStart=b.appearance.alternationStart,n.alternationEnd=b.appearance.alternationEnd,n.alternationIndex0Color=i.color,n.alternationIndex0BackgroundColor=i.backgroundColor,n.alternationIndex1Color=i.color,n.alternationIndex1BackgroundColor="#F5F5F5"),c.style={border:"1px solid "+i.borderColor,borderCollapse:"collapse",header:l,columns:m,rows:n}}}const e=!b.rowHierarchy||b.grouping.enabled?b.rows.toArray():b.rowHierarchy;let f=[];if(b.dataExport.view)b._recyclingRows.forEach((a,c)=>!!(b.dataExport.viewStart&&c<b.dataExport.viewStart||b.dataExport.viewEnd&&c>b.dataExport.viewEnd)||void(d[c]?f.push(d[c]):f.push(a.data)));else{for(let a=0;a<e.length;a++){const b=e[a];b.visible&&(!1!==b.filtered||void 0===b.filtered)&&f.push(b.data)}e===b.rowHierarchy&&(f=b.dataSource.boundHierarchy,c.hierarchical=!0)}!b.dataExport.groupBy&&b.grouping.enabled&&b.dataSource&&b.dataSource.groupBy&&(c.groupBy=b.dataSource.groupBy&&b.dataSource.groupBy.toArray?b.dataSource.groupBy.toArray():null),b.checkLicense(!0);const g=c.exportData(f,a,b.dataExport.fileName);return b.dataExport.view&&b._recycle(!1),g}print(){const a=this,b=a.dataExport.fileName;a.dataExport.fileName=null;const c=a.exportData("html"),d=window.open("","","width=800,height=500"),e=d.document.open();try{e.write("<!DOCTYPE html><html><head><meta charset=\"utf-8\" /><title>"+b+"</title></head><body>"+c+"</body></html>"),e.close(),setTimeout(function(){d.print(),d.close()},100)}catch(a){}a.dataExport.fileName=b}});