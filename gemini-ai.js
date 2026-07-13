// gemini-ai.js
// FashionAI Gemini Connection


const WORKER_URL =
"https://fashionai-api.shonesol28.workers.dev/";



export async function askGemini(prompt, image = null){


    console.log("🚀 Sending to Worker");


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






        const serverText =
        await response.text();




        console.log(
            "🔥 WORKER ANSWER:",
            serverText
        );





        if(!response.ok){


            throw new Error(
                serverText
            );


        }





        const data =
        JSON.parse(serverText);





        if(

            data.candidates &&

            data.candidates[0] &&

            data.candidates[0].content &&

            data.candidates[0].content.parts &&

            data.candidates[0].content.parts[0]

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
