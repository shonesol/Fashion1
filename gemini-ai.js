// gemini-ai.js
// FashionAI Gemini Connection


const WORKER_URL =
"https://fashionai-api.shonesol28.workers.dev/";



export async function askGemini(prompt, image = null) {


try {


const parts = [

{
text: prompt
}

];




// Add image

if(image){


const splitImage =
image.split(",");


if(splitImage.length < 2){

throw new Error(
"Invalid image format"
);

}



const base64 =
splitImage[1];


const mime =
splitImage[0]
.match(/:(.*?);/)[1];



parts.push({

inlineData:{

mimeType:mime,

data:base64

}

});


}






console.log(
"Sending request to Worker..."
);





const response =
await fetch(

WORKER_URL,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

contents:[

{

parts:parts

}

]

})

}

);






const text =
await response.text();




console.log(
"Worker raw response:",
text
);






if(!response.ok){


throw new Error(

`Worker ${response.status}: ${text}`

);


}






let data;


try{


data =
JSON.parse(text);


}

catch(e){


throw new Error(
"Worker returned invalid JSON: "+text
);


}






if(data.error){


throw new Error(

data.error.message || data.error

);

}






if(

data.candidates &&

data.candidates[0] &&

data.candidates[0]
.content &&

data.candidates[0]
.content.parts &&

data.candidates[0]
.content.parts[0]

){


return data
.candidates[0]
.content
.parts[0]
.text;


}





throw new Error(
"No Gemini response received"
);



}

catch(error){


console.error(
"❌ Gemini Error:",
error
);


throw error;


}


}
