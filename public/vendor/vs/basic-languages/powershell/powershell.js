/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 5.5.3(9db1fbf7f5de0088e9ab57efe2106cf22af1abc3)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/powershell/powershell", ["require","require"],(require)=>{
"use strict";var moduleExports=(()=>{var o=Object.defineProperty;var r=Object.getOwnPropertyDescriptor;var i=Object.getOwnPropertyNames;var l=Object.prototype.hasOwnProperty;var c=(n,e)=>{for(var t in e)o(n,t,{get:e[t],enumerable:!0})},g=(n,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of i(e))!l.call(n,s)&&s!==t&&o(n,s,{get:()=>e[s],enumerable:!(a=r(e,s))||a.enumerable});return n};var p=n=>g(o({},"__esModule",{value:!0}),n);var u={};c(u,{conf:()=>d,language:()=>m});var d={wordPattern:/(-?\d*\.\d\w*)|([^\`\~\!\@\#%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,comments:{lineComment:"#",blockComment:["<#","#>"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"',notIn:["string"]},{open:"'",close:"'",notIn:["string","comment"]}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],folding:{markers:{start:new RegExp("^\\s*#region\\b"),end:new RegExp("^\\s*#endregion\\b")}}},m={defaultToken:"",ignoreCase:!0,tokenPostfix:".ps1",brackets:[{token:"delimiter.curly",open:"{",close:"}"},{token:"delimiter.square",open:"[",close:"]"},{token:"delimiter.parenthesis",open:"(",close:")"}],keywords:["begin","break","catch","class","continue","data","define","do","dynamicparam","else","elseif","end","exit","filter","finally","for","foreach","from","function","if","in","param","process","return","switch","throw","trap","try","until","using","var","while","workflow","parallel","sequence","inlinescript","configuration"],helpKeywords:/SYNOPSIS|DESCRIPTION|PARAMETER|EXAMPLE|INPUTS|OUTPUTS|NOTES|LINK|COMPONENT|ROLE|FUNCTIONALITY|FORWARDHELPTARGETNAME|FORWARDHELPCATEGORY|REMOTEHELPRUNSPACE|EXTERNALHELP/,symbols:/[=><!~?&%|+\-*\/\^;\.,]+/,escapes:/`(?:[abfnrtv\\"'$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,tokenizer:{root:[[/[a-zA-Z_][\w-]*/,{cases:{"@keywords":{token:"keyword.$0"},"@default":""}}],[/[ \t\r\n]+/,""],[/^:\w*/,"metatag"],[/\$(\{((global|local|private|script|using):)?[\w]+\}|((global|local|private|script|using):)?[\w]+)/,"variable"],[/<#/,"comment","@comment"],[/#.*$/,"comment"],[/[{}()\[\]]/,"@brackets"],[/@symbols/,"delimiter"],[/\d*\.\d+([eE][\-+]?\d+)?/,"number.float"],[/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/,"number.hex"],[/\d+?/,"number"],[/[;,.]/,"delimiter"],[/\@"/,"string",'@herestring."'],[/\@'/,"string","@herestring.'"],[/"/,{cases:{"@eos":"string","@default":{token:"string",next:'@string."'}}}],[/'/,{cases:{"@eos":"string","@default":{token:"string",next:"@string.'"}}}]],string:[[/[^"'\$`]+/,{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}],[/@escapes/,{cases:{"@eos":{token:"string.escape",next:"@popall"},"@default":"string.escape"}}],[/`./,{cases:{"@eos":{token:"string.escape.invalid",next:"@popall"},"@default":"string.escape.invalid"}}],[/\$[\w]+$/,{cases:{'$S2=="':{token:"variable",next:"@popall"},"@default":{token:"string",next:"@popall"}}}],[/\$[\w]+/,{cases:{'$S2=="':"variable","@default":"string"}}],[/["']/,{cases:{"$#==$S2":{token:"string",next:"@pop"},"@default":{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}}}]],herestring:[[/^\s*(["'])@/,{cases:{"$1==$S2":{token:"string",next:"@pop"},"@default":"string"}}],[/[^\$`]+/,"string"],[/@escapes/,"string.escape"],[/`./,"string.escape.invalid"],[/\$[\w]+/,{cases:{'$S2=="':"variable","@default":"string"}}]],comment:[[/[^#\.]+/,"comment"],[/#>/,"comment","@pop"],[/(\.)(@helpKeywords)(?!\w)/,{token:"comment.keyword.$2"}],[/[\.#]/,"comment"]]}};return p(u);})();
return moduleExports;
});