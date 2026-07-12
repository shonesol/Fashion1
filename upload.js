// upload.js TEST

console.log("🔥 upload.js loaded");


document.addEventListener("DOMContentLoaded",()=>{


console.log("DOM ready");


const uploadBtn =
document.getElementById("uploadBtn");


const imageInput =
document.getElementById("clothingImage");


const result =
document.getElementById("result");



console.log("BUTTON:",uploadBtn);
console.log("INPUT:",imageInput);
console.log("RESULT:",result);



if(!uploadBtn){

alert("❌ upload button missing");

return;

}



uploadBtn.addEventListener(
"click",
()=>{


console.log("BUTTON CLICKED");


alert("✅ Button works");


if(result){

result.innerHTML =
"Button connected successfully";

}


});


});
