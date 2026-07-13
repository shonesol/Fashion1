// api/gemini.js
// FashionAI Vercel Gemini Function


export default async function handler(req, res) {


    // CORS
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS"
    );



    if(req.method === "OPTIONS"){

        return res.status(200).end();

    }



    if(req.method !== "POST"){

        return res.status(405).json({

            error:"Only POST requests allowed"

        });

    }



    try{


        const {
            contents
        } = req.body || {};



        if(!contents){

            return res.status(400).json({

                error:"Missing contents"

            });

        }



        const response =
        await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json",

                    "x-goog-api-key":
                    process.env.GEMINI_API_KEY

                },


                body:JSON.stringify({

                    contents

                })

            }

        );



        const data =
        await response.json();



        return res
        .status(response.status)
        .json(data);



    }



    catch(error){


        console.error(
            "Gemini Error:",
            error
        );


        return res.status(500).json({

            error:error.message

        });


    }


}
