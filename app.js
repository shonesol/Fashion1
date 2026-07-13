// =====================================
// FashionAI Main Application
// Controls navigation and app startup
// =====================================


import {
    loadWardrobe
} from "./wardrobe.js";

import {
    clearWardrobe
} from "./db.js";




// =====================================
// Page Navigation
// =====================================


const navButtons =
document.querySelectorAll(
".nav-btn"
);


const pages =
document.querySelectorAll(
".page"
);



function showPage(pageId){


    pages.forEach(page=>{


        page.classList.remove(
        "active"
        );


    });



    const selected =
    document.getElementById(
    pageId
    );



    if(selected){

        selected.classList.add(
        "active"
        );

    }



    navButtons.forEach(button=>{


        button.classList.remove(
        "active"
        );


        if(button.dataset.page===pageId){

            button.classList.add(
            "active"
            );

        }


    });



}





navButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


    showPage(
    button.dataset.page
    );


});


});







// =====================================
// Start Upload Button
// =====================================


const startUpload =
document.getElementById(
"startUploadBtn"
);



if(startUpload){


startUpload.addEventListener(
"click",
()=>{


    showPage(
    "upload"
    );


});


}







// =====================================
// Dark Mode
// =====================================


const themeButton =
document.getElementById(
"themeBtn"
);


const darkToggle =
document.getElementById(
"darkModeToggle"
);



function enableDarkMode(){


document.body.classList.add(
"dark"
);


localStorage.setItem(
"fashionAI_theme",
"dark"
);


}





function disableDarkMode(){


document.body.classList.remove(
"dark"
);


localStorage.setItem(
"fashionAI_theme",
"light"
);


}






function loadTheme(){


const theme =
localStorage.getItem(
"fashionAI_theme"
);



if(theme==="dark"){

    enableDarkMode();

}


}





if(themeButton){


themeButton.addEventListener(
"click",
()=>{


    if(
    document.body.classList.contains("dark")
    ){

        disableDarkMode();

    }
    else{

        enableDarkMode();

    }


});


}





if(darkToggle){


darkToggle.addEventListener(
"click",
()=>{


    if(
    document.body.classList.contains("dark")
    ){

        disableDarkMode();

    }
    else{

        enableDarkMode();

    }


});


}







// =====================================
// Clear Database
// =====================================


const clearButton =
document.getElementById(
"clearDatabaseBtn"
);



if(clearButton){


clearButton.addEventListener(
"click",
async()=>{


const confirmDelete =
confirm(
"Delete your entire wardrobe?"
);



if(confirmDelete){


await clearWardrobe();



alert(
"Wardrobe deleted."
);



loadWardrobe();


}



});


}






// =====================================
// Application Start
// =====================================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadTheme();


loadWardrobe();


console.log(
"✨ FashionAI Started"
);


});
