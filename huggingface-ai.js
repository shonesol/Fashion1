// =====================================
// FashionAI Hugging Face Connection
// =====================================


const WORKER_URL =
"https://fashion1.shonesol28.workers.dev/";



export async function askHuggingFace(
    prompt,
    image = null
){


    try{


        console.log(
            "Sending image to Hugging Face"
        );



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

                    prompt:prompt,

                    image:image

                })

            }
        );



        const data =
        await response.json();



        console.log(
            "Hugging Face response:",
            data
        );



        return data;



    }

    catch(error){


        console.error(
            "Hugging Face error:",
            error
        );


        return {

            error:
            error.message

        };


    }


}
