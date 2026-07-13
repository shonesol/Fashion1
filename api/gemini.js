// gemini-ai.js
// FashionAI Vercel Gemini Connection


const API_URL =
"https://fashion1-nine.vercel.app/api/gemini";



export async function askGemini(prompt, image = null){


console.log(
"🚀 Sending request to Vercel Gemini"
);



try{


const parts = [

{
text: prompt
}

];



if(image){


const base64 =
image.split(",")[1];


const mime =
image
.split(",")[0]
.match(/:(.*?);/)[1];



parts.push({

inlineData:{

mimeType:mime,

data:base64

}

});


}




const response =
await fetch(
API_URL,
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
"🔥 Vercel response:",
text
);



if(!response.ok){

throw new Error(text);

}



const data =
JSON.parse(text);



if(
data.candidates &&
data.candidates[0] &&
data.candidates[0].content
){


return data
.candidates[0]
.content
.parts[0]
.text;


}



throw new Error(
"No Gemini response"
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
