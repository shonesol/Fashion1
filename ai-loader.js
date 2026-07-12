// ai-loader.js
// FashionAI Loading Controller


console.log("🔥 ai-loader.js loaded");



// ==========================
// SHOW AI LOADING
// ==========================

export function showAILoading(
    element,
    message = "FashionAI is thinking..."
){

    if(!element){
        console.error(
            "AI Loading element missing"
        );
        return;
    }


    element.innerHTML = `

    <div class="ai-loading">

        <div class="ai-circle">
        </div>

        <div class="ai-text">
            🤖 ${message}
        </div>

    </div>

    `;

}





// ==========================
// HIDE AI LOADING
// ==========================

export function hideAILoading(element){

    if(!element){
        return;
    }


    element.innerHTML = "";

}





// ==========================
// SHOW AI SUCCESS
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

        ✅ ${message}

    </div>

    `;

}







// ==========================
// SHOW AI ERROR
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

        ❌ ${message}

    </div>

    `;

}






// ==========================
// AI STATUS
// ==========================

export function aiStatus(message){

    console.log(
        "🤖 FashionAI:",
        message
    );

}
