/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./_AnnotationHelperBasics','sap/ui/base/BindingParser','sap/ui/base/ManagedObject','sap/ui/core/format/DateFormat','sap/ui/model/odata/ODataUtils'],function(q,B,a,M,D,O){'use strict';var d="\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])",s="[-+]?\\d+(?:\\.\\d+)?",m="9007199254740991",b="-"+m,t="(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(\\.\\d{1,12})?)?",E={Bool:/^true$|^false$/i,Float:new RegExp("^"+s+"(?:[eE][-+]?\\d+)?$|^NaN$|^-INF$|^INF$"),Date:new RegExp("^"+d+"$"),DateTimeOffset:new RegExp("^"+d+"T"+t+"(?:Z|[-+](?:0\\d|1[0-3]):[0-5]\\d|[-+]14:00)$","i"),Decimal:new RegExp("^"+s+"$"),Guid:/^[A-F0-9]{8}-(?:[A-F0-9]{4}-){3}[A-F0-9]{12}$/i,Int:/^[-+]?\d{1,19}$/,TimeOfDay:new RegExp("^"+t+"$")},c,r=/^\{@i18n>[^\\\{\}:]+\}$/,f=/^\d+$/,o={And:"&&",Eq:"===",Ge:">=",Gt:">",Le:"<=",Lt:"<",Ne:"!==",Not:"!",Or:"||"},g=/^(\/dataServices\/schema\/\d+)(?:\/|$)/,T={"Edm.Boolean":"boolean","Edm.Byte":"number","Edm.Date":"date","Edm.DateTime":"datetime","Edm.DateTimeOffset":"datetime","Edm.Decimal":"decimal","Edm.Double":"number","Edm.Float":"number","Edm.Guid":"string","Edm.Int16":"number","Edm.Int32":"number","Edm.Int64":"decimal","Edm.SByte":"number","Edm.Single":"number","Edm.String":"string","Edm.Time":"time","Edm.TimeOfDay":"time"},h={Bool:"Edm.Boolean",Float:"Edm.Double",Date:"Edm.Date",DateTimeOffset:"Edm.DateTimeOffset",Decimal:"Edm.Decimal",Guid:"Edm.Guid",Int:"Edm.Int64",String:"Edm.String",TimeOfDay:"Edm.TimeOfDay"},j={"boolean":false,"date":true,"datetime":true,"decimal":true,"number":false,"string":false,"time":true};c={adjustOperands:function(e,i){if(e.result!=="constant"&&e.category==="number"&&i.result==="constant"&&i.type==="Edm.Int64"){i.category="number";}if(e.result!=="constant"&&e.category==="decimal"&&i.result==="constant"&&i.type==="Edm.Int32"){i.category="decimal";i.type=e.type;}if(e.result==="constant"&&e.category==="date"&&i.result!=="constant"&&i.category==="datetime"){i.category="date";}},apply:function(i,p,e){var n=B.descend(p,"Name","string"),P=B.descend(p,"Parameters");switch(n.value){case"odata.concat":return c.concat(i,P,e);case"odata.fillUriTemplate":return c.fillUriTemplate(i,P);case"odata.uriEncode":return c.uriEncode(i,P);default:B.error(n,"unknown function: "+n.value);}},concat:function(I,p,e){var P=[],R,k=[];B.expectType(p,"array");p.value.forEach(function(u,i){R=c.parameter(I,p,i);e=e||R.result==="expression";k.push(R);});k.forEach(function(R){if(e){c.wrapExpression(R);}if(R.type!=='edm:Null'){P.push(B.resultToString(R,e,true));}});R=e?{result:"expression",value:P.join("+")}:{result:"composite",value:P.join("")};R.type="Edm.String";return R;},conditional:function(i,p){var C=c.parameter(i,p,0,"Edm.Boolean"),e=c.parameter(i,p,1),k=c.parameter(i,p,2),l=e.type;if(e.type==="edm:Null"){l=k.type;}else if(k.type!=="edm:Null"&&e.type!==k.type){B.error(p,"Expected same type for second and third parameter, types are '"+e.type+"' and '"+k.type+"'");}return{result:"expression",type:l,value:B.resultToString(c.wrapExpression(C),true)+"?"+B.resultToString(c.wrapExpression(e),true)+":"+B.resultToString(c.wrapExpression(k),true)};},constant:function(i,p,e){var v=p.value;B.expectType(p,"string");if(e==="String"){if(r.test(v)){return{ignoreTypeInPath:true,result:"binding",type:"Edm.String",value:v.slice(1,-1)};}else if(i.getSetting&&i.getSetting("bindTexts")){return{result:"binding",type:"Edm.String",ignoreTypeInPath:true,value:"/##"+c.replaceIndexes(i.getModel(),p.path)};}e="Edm.String";}else if(!E[e].test(v)){B.error(p,"Expected "+e+" value but instead saw '"+v+"'");}else{e=h[e];if(e==="Edm.Int64"&&O.compare(v,b,true)>=0&&O.compare(v,m,true)<=0){e="Edm.Int32";}}return{result:"constant",type:e,value:v};},expression:function(i,p,e){var R=p.value,S,k;B.expectType(p,"object");if(R.hasOwnProperty("Type")){k=B.property(p,"Type","string");S=B.descend(p,"Value");}else{["And","Apply","Bool","Date","DateTimeOffset","Decimal","Float","Eq","Ge","Gt","Guid","If","Int","Le","Lt","Ne","Not","Null","Or","Path","PropertyPath","String","TimeOfDay"].forEach(function(P){if(R.hasOwnProperty(P)){k=P;S=B.descend(p,P);}});}switch(k){case"Apply":return c.apply(i,S,e);case"If":return c.conditional(i,S);case"Path":case"PropertyPath":return c.path(i,S);case"Bool":case"Date":case"DateTimeOffset":case"Decimal":case"Float":case"Guid":case"Int":case"String":case"TimeOfDay":return c.constant(i,S,k);case"And":case"Eq":case"Ge":case"Gt":case"Le":case"Lt":case"Ne":case"Or":return c.operator(i,S,k);case"Not":return c.not(i,S);case"Null":return{result:"constant",value:"null",type:"edm:Null"};default:B.error(p,"Unsupported OData expression");}},formatOperand:function(p,i,R,w){var e;if(R.result==="constant"){switch(R.category){case"boolean":case"number":return R.value;case"date":e=c.parseDate(R.value);if(!e){B.error(B.descend(p,i),"Invalid Date "+R.value);}return String(e.getTime());case"datetime":e=c.parseDateTimeOffset(R.value);if(!e){B.error(B.descend(p,i),"Invalid DateTime "+R.value);}return String(e.getTime());case"time":return String(c.parseTimeOfDay(R.value).getTime());}}if(w){c.wrapExpression(R);}return B.resultToString(R,true);},getExpression:function(i,R,w){var k;if(R===undefined){return undefined;}if(!c.simpleParserWarningLogged&&M.bindingParser===a.simpleParser){q.sap.log.warning("Complex binding syntax not active",null,"sap.ui.model.odata.AnnotationHelper");c.simpleParserWarningLogged=true;}try{k=c.expression(i,{path:i.getPath(),value:R},false);return B.resultToString(k,false,w);}catch(e){if(e instanceof SyntaxError){return"Unsupported: "+a.complexParser.escape(B.toErrorString(R));}throw e;}},fillUriTemplate:function(I,p){var i,n,P=[],e="",k,l=p.value,R,u=c.parameter(I,p,0,"Edm.String");P.push('odata.fillUriTemplate(',B.resultToString(u,true),',{');for(i=1;i<l.length;i+=1){k=B.descend(p,i,"object");n=B.property(k,"Name","string");R=c.expression(I,B.descend(k,"Value"),true);P.push(e,B.toJSON(n),":",B.resultToString(R,true));e=",";}P.push("})");return{result:"expression",value:P.join(""),type:"Edm.String"};},not:function(i,p){var P=c.expression(i,p,true);return{result:"expression",value:"!"+B.resultToString(c.wrapExpression(P),true),type:"Edm.Boolean"};},operator:function(i,p,e){var k=e==="And"||e==="Or"?"Edm.Boolean":undefined,P=c.parameter(i,p,0,k),l=c.parameter(i,p,1,k),n,N,v,V;if(P.type!=="edm:Null"&&l.type!=="edm:Null"){P.category=T[P.type];l.category=T[l.type];c.adjustOperands(P,l);c.adjustOperands(l,P);if(P.category!==l.category){B.error(p,"Expected two comparable parameters but instead saw "+P.type+" and "+l.type);}n=P.category==="decimal"?",true":"";N=j[P.category];}v=c.formatOperand(p,0,P,!N);V=c.formatOperand(p,1,l,!N);return{result:"expression",value:N?"odata.compare("+v+","+V+n+")"+o[e]+"0":v+o[e]+V,type:"Edm.Boolean"};},parameter:function(i,p,I,e){var P=B.descend(p,I),R=c.expression(i,P,true);if(e&&e!==R.type){B.error(P,"Expected "+e+" but instead saw "+R.type);}return R;},parseDate:function(v){return D.getDateInstance({pattern:"yyyy-MM-dd",strictParsing:true,UTC:true}).parse(v);},parseDateTimeOffset:function(v){var e=E.DateTimeOffset.exec(v);if(e&&e[1]&&e[1].length>4){v=v.replace(e[1],e[1].slice(0,4));}return D.getDateTimeInstance({pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSX",strictParsing:true}).parse(v.toUpperCase());},parseTimeOfDay:function(v){if(v.length>12){v=v.slice(0,12);}return D.getTimeInstance({pattern:"HH:mm:ss.SSS",strictParsing:true,UTC:true}).parse(v);},path:function(i,p){var e=p.value,C={},k=i.getModel(),P={getModel:function(){return k;},getPath:function(){return p.path;}},l,R={result:"binding",value:e},n;B.expectType(p,"string");n=B.followPath(P,{"Path":e});if(n&&n.resolvedPath){l=k.getProperty(n.resolvedPath);R.type=l.type;switch(l.type){case"Edm.DateTime":C.displayFormat=l["sap:display-format"];break;case"Edm.Decimal":C.precision=l.precision;C.scale=l.scale;break;case"Edm.String":C.maxLength=l.maxLength;break;}if(l.nullable==="false"){C.nullable=l.nullable;}R.constraints=C;}else{q.sap.log.warning("Could not find property '"+e+"' starting from '"+p.path+"'",null,"sap.ui.model.odata.AnnotationHelper");}return R;},replaceIndexes:function(e,p){var k,P=p.split('/'),l,R;function n(u,i){var v=e.getProperty(l+"/"+u);if(typeof v==="string"){P[i]="[${"+u+"}==="+B.toJSON(v)+"]";return true;}return false;}k=g.exec(p);if(!k){return p;}l=k[1];if(!n("namespace",3)){return p;}for(var i=4;i<P.length;i++){l=l+"/"+P[i];if(f.test(P[i])&&!n("name",i)){R=e.getProperty(l+"/RecordType");if(R){if(R==="com.sap.vocabularies.UI.v1.DataFieldForAction"){n("Action/String",i);}else if(R==="com.sap.vocabularies.UI.v1.DataFieldForAnnotation"){n("Target/AnnotationPath",i);}else if(R.indexOf("com.sap.vocabularies.UI.v1.DataField")===0){n("Value/Path",i);}}}}return P.join('/');},simpleParserWarningLogged:false,uriEncode:function(i,p){var R=c.parameter(i,p,0);if(R.result==="constant"){if(R.type==="Edm.Date"){R.type="Edm.DateTime";R.value=R.value+"T00:00:00Z";}else if(R.type==="Edm.TimeOfDay"){R.type="Edm.Time";R.value="PT"+R.value.slice(0,2)+"H"+R.value.slice(3,5)+"M"+R.value.slice(6,8)+"S";}}return{result:"expression",value:'odata.uriEncode('+B.resultToString(R,true)+","+B.toJSON(R.type)+")",type:"Edm.String"};},wrapExpression:function(R){if(R.result==="expression"){R.value="("+R.value+")";}return R;}};return c;},false);