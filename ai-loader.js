// ai-loader.js
// FashionAI Loading + Message Controller



// ==========================
// SHOW LOADING
// ==========================

export function showAILoading(
element,
message = "FashionAI is thinking..."
){


if(!element){
console.error(
"AI Loader: element missing"
);
return;
}



element.innerHTML = `

<div class="ai-loading">


<div class="ai-circle">

🤖

</div>


<div class="ai-text">

${message}

</div>


</div>

`;

}








// ==========================
// SUCCESS MESSAGE
// ==========================

export function showAISuccess(

element,

message

){


if(!element){

return;

}



element.innerHTML = `

<div class="ai-success">


<h3>
✅ Success
</h3>


<p>
${message}
</p>


</div>

`;

}








// ==========================
// ERROR MESSAGE
// ==========================

export function showAIError(

element,

message

){


if(!element){

return;

}



element.innerHTML = `

<div class="ai-error">


<h3>
❌ FashionAI Error
</h3>


<p>
${message}
</p>


</div>

`;

}








// ==========================
// CLEAR MESSAGE
// ==========================

export function hideAILoading(

element

){


if(element){

element.innerHTML="";

}


}
