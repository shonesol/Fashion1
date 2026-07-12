// gemini-ai.js
// FashionAI Gemini Connection


const WORKER_URL =
"https://fashionai-api.shonesol28.workers.dev";





export async function askGemini(

prompt,

image=null

){



try{



let parts=[

{

text:prompt

}

];







if(image){



const base64 =

image.includes(",")

?

image.split(",")[1]

:

image;





const mimeType =

image.startsWith(
"data:image/png"
)

?

"image/png"

:

"image/jpeg";






parts.push({

inlineData:{

mimeType,

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

parts

}

]

})



}

);








const data =

await response.json();







console.log(
"Gemini Response:",
data
);







return (

data

?.candidates

?.[0]

?.content

?.parts

?.[0]

?.text

||

"AI failed"

);



}

catch(error){



console.error(

"Gemini Error:",

error

);



return "AI connection failed";


}



}
