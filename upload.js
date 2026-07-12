// upload.js TEST

document.addEventListener("DOMContentLoaded", () => {

const button = document.getElementById("uploadBtn");
const input = document.getElementById("clothingImage");
const result = document.getElementById("result");


console.log("✅ upload.js loaded");


button.addEventListener("click", () => {

console.log("✅ button clicked");


if(!input.files[0]){

result.innerHTML =
"❌ No image selected";

return;

}


const file = input.files[0];


result.innerHTML = `

<h3>✅ Upload works</h3>

<p>
File: ${file.name}
</p>

<p>
Size: ${file.size} bytes
</p>

`;

console.log(
"Selected file:",
file
);


});


});
