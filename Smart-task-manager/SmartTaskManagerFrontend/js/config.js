// Backend configuration file // This file stores common configuration values used across the frontend

// 🔗 Base URL of your backend API // 
const BASE_URL = (
     window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
     ? "http://127.0.0.1:8000/api"   // Local backend 
     : window.location.origin + "/api"; // Production backend

// 🔐 Token key name (used for localStorage) 
const TOKEN_KEY = "smart_task_token";

// 👤 User info key (optional but useful)
const USER_KEY = "smart_task_user";

// 🧾 Common headers for API requests 
function getAuthHeaders() {
     const token = localStorage.getItem(TOKEN_KEY);

     return {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
     };

}

// 🚪 Logout helper (can be used anywhere) 
function logout() {
     localStorage.removeItem(TOKEN_KEY);
     localStorage.removeItem(USER_KEY);
     window.location.href = "/login.html";
}