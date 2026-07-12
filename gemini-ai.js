// gemini-ai.js
// FashionAI Gemini Connection via Cloudflare Worker

const WORKER_URL = "https://fashionai-api.shonesol28.workers.dev";


// ==========================
// GEMINI AI REQUEST
// ==========================

export async function askGemini(prompt, image = null) {

  try {

    let parts = [
      {
        text: prompt
      }
    ];

    // ==========================
    // IMAGE SUPPORT
    // ==========================

    if (image) {

      let base64 =
        image.includes(",")
          ? image.split(",")[1]
          : image;

      let mimeType =
        image.startsWith("data:image/png")
          ? "image/png"
          : "image/jpeg";

      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: base64
        }
      });

    }

    const response = await fetch(WORKER_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        contents: [
          {
            parts: parts
          }
        ]

      })

    });

    const data = await response.json();

    if (data.error) {

      console.error("Gemini API Error:", data.error);

      return "AI error";

    }

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return answer || "AI could not respond";

  }

  catch (error) {

    console.error("Gemini Connection Error:", error);

    return "AI connection failed";

  }

}
