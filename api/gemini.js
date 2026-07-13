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



    if(req.method === "OPTIONS"){

        return res.status(200).end();

    }



    try{


        const { contents } = req.body;



        const response =
        await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json",

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



        return res.status(200).json(data);



    }


    catch(error){


        console.error(
            error
        );


        return res.status(500).json({

            error:error.message

        });


    }


}
