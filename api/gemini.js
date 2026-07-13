// gemini-ai.js
// FashionAI Vercel Gemini Connector


const API_URL = "/api/gemini";


export async function askGemini(prompt, image=null){


    try{


        const parts = [];


        parts.push({

            text: prompt

        });



        if(image){


            const base64 =
            image.split(",")[1];


            const mime =
            image
            .split(",")[0]
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
            API_URL,
            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

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




        const data =
        await response.json();



        console.log(
            "Gemini response:",
            data
        );



        return data;



    }

    catch(error){


        console.error(
            "Gemini connection error:",
            error
        );


        return {

            error:error.message

        };


    }


}
