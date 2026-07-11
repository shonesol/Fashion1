// FashionAI Loading Controller



export function showAILoading(element,message="FashionAI is thinking..."){



element.innerHTML =


`

<div class="ai-loading">


<div class="ai-circle"></div>


<div class="ai-text">

🤖 ${message}

</div>


</div>

`;



}








export function hideAILoading(element){



element.innerHTML="";


}
