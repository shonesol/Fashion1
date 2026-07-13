// FashionAI Hugging Face Connection

const WORKER_URL =
"https://fashion1.shonesol28.workers.dev/";


export async function askGemini(prompt, image=null){


    try{


        const response =
        await fetch(
            WORKER_URL,
            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:JSON.stringify({

                    image:image,

                    prompt:prompt

                })

            }
        );



        const data =
        await response.json();



        console.log(
            "AI Response:",
            data
        );



        return data;



    }

    catch(error){


        console.error(
            "AI Connection Error:",
            error
        );


        return {

            error:
            error.message

        };


    }


}
