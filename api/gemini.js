// =====================================
// FashionAI Ultimate
// api/gemini.js
// Secure Gemini Server Bridge
// =====================================


export default async function handler(req,res){



if(req.method !== "POST"){


return res.status(405).json({

error:"Method not allowed"

});


}





try{


const {

prompt,

image

}=req.body;





const apiKey =

process.env.GEMINI_API_KEY;





if(!apiKey){


return res.status(500).json({

error:
"Missing GEMINI_API_KEY"

});


}






const parts=[

{

text:prompt

}

];






// Image support

if(image){


const base64 =

image.split(",")[1];



parts.push({

inline_data:{


mime_type:
"image/jpeg",


data:
base64


}


});


}






const response =

await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,

{


method:"POST",


headers:{


"Content-Type":

"application/json"


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






if(data.error){


return res.status(500).json({

error:data.error.message

});


}






const text =

data.candidates?.[0]
?.content
?.parts?.[0]
?.text ||

"";






return res.status(200).json({

text

});






}

catch(error){



console.error(

error

);



return res.status(500).json({

error:

"Gemini request failed"

});


}



}
