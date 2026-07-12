// upload.js TEST

console.log("🔥 upload.js file started loading");


document.addEventListener("DOMContentLoaded",()=>{


console.log("🔥 DOM loaded");


const btn = document.getElementById("uploadBtn");


console.log("Button found:", btn);



if(btn){


btn.addEventListener("click",()=>{


alert("✅ Upload button is connected");


console.log("Upload button clicked");


});


}else{


alert("❌ uploadBtn was not found");


}



});
