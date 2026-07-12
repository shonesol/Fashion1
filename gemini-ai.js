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



// Add image if available

if(image){


const base64 =
image.split(",")[1];


const mime =
image.split(",")[0]
.match(/:(.*?);/)[1];



parts.push({

inlineData: {

mimeType:mime,

data:base64

}

});


}




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





if(!response.ok){


const error =
await response.text();


throw new Error(
`Worker ${response.status}: ${error}`
);


}





const data =
await response.json();



console.log(
"Gemini Response:",
data
);






if(

data.candidates &&

data.candidates.length > 0 &&

data.candidates[0].content &&

data.candidates[0].content.parts &&

data.candidates[0].content.parts.length > 0

){


return data.candidates[0]
.content.parts[0]
.text;


}





throw new Error(
"No response returned from Gemini."
);



}

catch(error){


console.error(
"Gemini Connection Error:",
error
);


throw error;


}


}
