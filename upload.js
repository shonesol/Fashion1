// upload.js TEST ONLY

console.log("🔥 UPLOAD FILE STARTED");


document.addEventListener("DOMContentLoaded",()=>{


console.log("🔥 DOM READY");


const button =
document.getElementById("uploadBtn");


const input =
document.getElementById("clothingImage");


const result =
document.getElementById("result");



console.log(
"BUTTON:",
button
);

console.log(
"INPUT:",
input
);




button.addEventListener(
"click",
()=>{


console.log(
"BUTTON CLICKED"
);



if(!input.files[0]){


result.innerHTML =
"❌ No image selected";


return;


}



result.innerHTML =

`

<h3>✅ Upload is working</h3>

<p>
${input.files[0].name}
</p>

`;



});


});
