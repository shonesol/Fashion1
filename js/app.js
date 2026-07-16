// =========================================
// FashionAI Ultimate
// app.js
// Main Application Controller
// =========================================

console.log("🚀 FashionAI Ultimate Starting...");


// =========================================
// DOM Elements
// =========================================

const splash = document.getElementById("splash");
const app = document.getElementById("app");
const greeting = document.getElementById("greeting");
const todayDate = document.getElementById("todayDate");

const clothCount = document.getElementById("clothCount");
const favoriteCount = document.getElementById("favoriteCount");
const outfitCount = document.getElementById("outfitCount");

const dailyAdvice = document.getElementById("dailyAdvice");
const trendContainer = document.getElementById("trendContainer");


// =========================================
// Initialize Application
// =========================================

window.addEventListener("DOMContentLoaded", async () => {

    try {

        setGreeting();

        setDate();

        await initializeApp();

        await loadDashboard();

        hideSplash();

    } catch (error) {

        console.error("❌ App initialization failed:", error);

        hideSplash();

    }

});


// =========================================
// Splash Screen
// =========================================

function hideSplash() {

    setTimeout(() => {

        if (splash) {
            splash.style.display = "none";
        }

        if (app) {
            app.style.display = "block";
            app.classList.add("fadeIn");
        }

    }, 1500);

}


// =========================================
// Greeting
// =========================================

function setGreeting() {

    if (!greeting) return;

    const hour = new Date().getHours();

    let text = "Hello";

    if (hour < 12) {
        text = "Good Morning";
    } else if (hour < 17) {
        text = "Good Afternoon";
    } else {
        text = "Good Evening";
    }

    greeting.textContent = text;

}


// =========================================
// Date
// =========================================

function setDate() {

    if (!todayDate) return;

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    };

    todayDate.textContent = new Date().toLocaleDateString("en-US", options);

}


// =========================================
// Initialize Services
// =========================================

async function initializeApp() {

    console.log("⚙️ Initializing services...");

    // Database
    if (window.initializeDatabase) {
        await window.initializeDatabase();
    }

    // Notifications
    if ("Notification" in window) {
        Notification.requestPermission();
    }

    // Service Worker
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("sw.js");
            console.log("✅ Service Worker Registered");
        } catch (err) {
            console.log("⚠️ Service Worker failed:", err);
        }
    }

    console.log("✅ Services initialized");

}


// =========================================
// Load Dashboard Data
// =========================================

async function loadDashboard() {

    await Promise.all([
        loadStatistics(),
        loadDailyAdvice(),
        loadTrends(),
        loadRecentOutfits(),
        loadFavoritesPreview()
    ]);

}


// =========================================
// Statistics
// =========================================

async function loadStatistics() {

    try {

        let clothes = [];

        if (window.getAllClothes) {
            clothes = await window.getAllClothes();
        }

        const favorites = clothes.filter(item => item.favorite);

        if (clothCount) clothCount.textContent = clothes.length;
        if (favoriteCount) favoriteCount.textContent = favorites.length;

        // Dummy outfit history count for now
        if (outfitCount) outfitCount.textContent = localStorage.getItem("outfitCount") || 0;

    } catch (error) {

        console.error("❌ Failed to load statistics:", error);

    }
// =====================================
// FashionAI Ultimate
// app.js - Part 2
// =====================================

import { getStatistics } from "./database.js";
import { getFavoriteClothes } from "./favorites.js";
import { getRecentOutfits } from "./history.js";
import { getDailyRecommendation } from "./hybrid-ai.js";
import { loadFashionTrends } from "./trend-engine.js";

// ===============================
// Toast Notification
// ===============================

export function showToast(message, duration = 3000) {

    const toast = document.querySelector(".toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, duration);

}

// ===============================
// Loading Overlay
// ===============================

export function showLoading(text = "Loading...") {

    const overlay = document.querySelector(".loadingOverlay");

    if (!overlay) return;

    overlay.querySelector(".loadingText").textContent = text;

    overlay.classList.add("show");

}

export function hideLoading() {

    document
        .querySelector(".loadingOverlay")
        ?.classList.remove("show");

}

// ===============================
// Dashboard Statistics
// ===============================

export async function loadDashboardStatistics() {

    try {

        const stats = await getStatistics();

        document.getElementById("clothCount").textContent =
            stats.clothes || 0;

        document.getElementById("favoriteCount").textContent =
            stats.favorites || 0;

        document.getElementById("outfitCount").textContent =
            stats.outfits || 0;

    } catch (error) {

        console.error(error);

        showToast("Unable to load statistics");

    }

}

// ===============================
// Daily AI Recommendation
// ===============================

export async function loadDailyAdvice() {

    try {

        const advice =
            await getDailyRecommendation();

        document.getElementById(
            "dailyAdvice"
        ).textContent = advice;

    } catch {

        document.getElementById(
            "dailyAdvice"
        ).textContent =
        "Wear confidence. A clean, well-fitted outfit always looks great.";

    }

}

// ===============================
// Fashion Trends
// ===============================

export async function displayFashionTrends() {

    const container =
        document.getElementById("trendContainer");

    container.innerHTML = "";

    const trends =
        await loadFashionTrends();

    trends.forEach(trend => {

        const item =
            document.createElement("div");

        item.className = "trendItem";

        item.innerHTML = `
            <h4>${trend.title}</h4>
            <p>${trend.description}</p>
        `;

        container.appendChild(item);

    });

}

// ===============================
// Favorites Preview
// ===============================

export async function loadFavoritesPreview() {

    const container =
        document.getElementById(
            "favoritePreview"
        );

    if (!container) return;

    container.innerHTML = "";

    const favorites =
        await getFavoriteClothes();

    favorites.slice(0, 5).forEach(item => {

        const card =
            document.createElement("div");

        card.className = "favoriteCard";

        card.innerHTML = `
            <img src="${item.image}" alt="">
            <h4>${item.name}</h4>
        `;

        container.appendChild(card);

    });

}

// ===============================
// Recent Outfits
// ===============================

export async function loadRecentOutfits() {

    const container =
        document.getElementById(
            "recentOutfits"
        );

    if (!container) return;

    container.innerHTML = "";

    const outfits =
        await getRecentOutfits();

    outfits.slice(0, 5).forEach(outfit => {

        const card =
            document.createElement("div");

        card.className = "outfitCard";

        card.innerHTML = `
            <img src="${outfit.image}">
            <div class="outfitInfo">
                <h4>${outfit.name}</h4>
                <p>${outfit.date}</p>
            </div>
        `;

        container.appendChild(card);

    });

}
}
// =====================================
// FashionAI Ultimate
// app.js - Part 3
// =====================================


// ===============================
// Online / Offline Detection
// ===============================

function updateConnectionStatus(){

    let banner =
    document.getElementById(
        "connectionStatus"
    );


    if(!banner) return;


    if(navigator.onLine){

        banner.textContent =
        "🟢 Online";

        banner.classList.remove(
            "offline"
        );

    }
    else{

        banner.textContent =
        "🔴 Offline Mode";

        banner.classList.add(
            "offline"
        );

        showToast(
            "You are offline. FashionAI is using offline intelligence."
        );

    }

}


window.addEventListener(
    "online",
    updateConnectionStatus
);


window.addEventListener(
    "offline",
    updateConnectionStatus
);



// ===============================
// Generate Today's Outfit
// ===============================

async function generateTodayOutfit(){

    const box =
    document.getElementById(
        "todayOutfit"
    );


    if(!box) return;


    box.innerHTML =
    `
    <div class="loadingSpinner"></div>
    <p>Creating your outfit...</p>
    `;


    try{


        const module =
        await import(
            "./outfit-engine.js"
        );


        const outfit =
        await module.generateOutfit();


        box.innerHTML =
        `
        <img 
        src="${outfit.image || ''}"
        class="outfitPreview">

        <h3>
        ${outfit.name}
        </h3>

        <p>
        ${outfit.description}
        </p>
        `;


    }
    catch(error){

        console.error(error);


        box.innerHTML =
        `
        <p>
        Unable to generate outfit.
        Try again.
        </p>
        `;

    }

}



// ===============================
// Voice Assistant Launcher
// ===============================

window.openAssistant =
function(){

    import(
        "./voice-assistant.js"
    )
    .then(module=>{

        module.startVoiceAssistant();

    });

};



// ===============================
// Navigation Highlight
// ===============================

function setupNavigation(){

    const links =
    document.querySelectorAll(
        ".bottomNav a"
    );


    links.forEach(link=>{


        link.addEventListener(
            "click",
            ()=>{


                links.forEach(item=>

                    item.classList.remove(
                        "active"
                    )

                );


                link.classList.add(
                    "active"
                );


            }
        );


    });


}



// ===============================
// Dashboard Events
// ===============================

function setupEvents(){


const refresh =
document.getElementById(
    "refreshOutfit"
);


if(refresh){

    refresh.addEventListener(
        "click",
        generateTodayOutfit
    );

}



}



// ===============================
// Application Startup
// ===============================

async function initApp(){


    console.log(
        "🚀 FashionAI Ultimate Starting..."
    );


    updateConnectionStatus();


    setupNavigation();


    setupEvents();


    await loadDashboardStatistics();


    await loadFavoritesPreview();


    await loadRecentOutfits();


    await displayFashionTrends();


    await loadDailyAdvice();



    console.log(
        "✅ FashionAI Ready"
    );


}



// ===============================
// Start Application
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    initApp
);
