// =====================================
// FashionAI Upload Manager
// Handles image upload, preview and saving
// =====================================


import {
    addClothing
} from "./db.js";

import {
    analyzeClothing
} from "./clothing-ai.js";


// Selected image storage

let selectedImage = null;




// =====================================
// Image Preview
// =====================================


const imageInput =
document.getElementById("imageInput");


const imagePreview =
document.getElementById("imagePreview");



if(imageInput){


imageInput.addEventListener(
"change",
(event)=>{


    const file =
    event.target.files[0];



    if(!file){
        return;
    }



    const reader =
    new FileReader();



    reader.onload = ()=>{


        selectedImage =
        reader.result;



        imagePreview.src =
        selectedImage;



        imagePreview.style.display =
        "block";


    };



    reader.readAsDataURL(file);



});

}





// =====================================
// Save Clothing
// =====================================


const saveButton =
document.getElementById(
"saveClothingBtn"
);



if(saveButton){


saveButton.addEventListener(
"click",
async ()=>{


    if(!selectedImage){


        alert(
        "Please choose a clothing image first."
        );

        return;

    }



    const clothing = {


        image:selectedImage,


        name:
        document.getElementById(
        "clothingName"
        ).value || "Unnamed Item",



        category:
        document.getElementById(
        "category"
        ).value || "Other",



        color:
        document.getElementById(
        "color"
        ).value || "Unknown",



        season:
        document.getElementById(
        "season"
        ).value || "All Season",



        occasion:
        document.getElementById(
        "occasion"
        ).value || "Casual",



        notes:
        document.getElementById(
        "notes"
        ).value || "",



        created:
        new Date().toISOString()


    };





    try{


        await addClothing(
        clothing
        );



        alert(
        "✅ Clothing saved to wardrobe!"
        );



        clearForm();



    }
    catch(error){


        console.error(error);


        alert(
        "❌ Failed to save clothing."
        );


    }



});



}







// =====================================
// Clear Form
// =====================================


function clearForm(){


    document.getElementById(
    "clothingName"
    ).value="";



    document.getElementById(
    "notes"
    ).value="";



    imagePreview.src="";



    imagePreview.style.display=
    "none";



    selectedImage=null;


}
