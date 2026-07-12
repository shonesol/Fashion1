// app.js
// FashionAI Main Controller Test

console.log("🚀 FashionAI app.js loaded");


document.addEventListener("DOMContentLoaded", () => {

    console.log("📱 Page loaded");


    const uploadBtn = document.getElementById("uploadBtn");

    if(uploadBtn){

        console.log("✅ Upload button found");


        uploadBtn.addEventListener("click",()=>{

            alert("Upload button is working");

        });


    }else{

        alert("❌ Upload button not found");

    }


});
