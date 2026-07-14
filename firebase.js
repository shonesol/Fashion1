// firebase.js
// FashionAI Firebase Setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
