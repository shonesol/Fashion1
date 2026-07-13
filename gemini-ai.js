// gemini-ai.js
// FashionAI Cloudflare Worker Connection


const WORKER_URL =
"https://fashion1.shonesol28.workers.dev/";


export async function askGemini(prompt,image=null){


    const parts=[
        {
            text:prompt
        }
    ];



    if(image){


        const base64 =
        image.split(",")[1];


        const mime =
        image.split(",")[0]
        .match(/:(.*?);/)[1];



        parts.push({

            inline_data:{

                mime_type:mime,

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



    return await response.json();


}
