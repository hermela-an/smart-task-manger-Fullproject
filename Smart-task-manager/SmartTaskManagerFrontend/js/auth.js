// auth.js

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Login form submitted");

  const username = document.getElementById("username").value.trim(); // SimpleJWT uses username
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    errorMessage.textContent = "Please enter username and password";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      let msg = data.detail || "Login failed";
      if (!data.detail && typeof data === "object") {
        const errors = [];
        for (const key in data) {
          if (Array.isArray(data[key])) errors.push(`${key}: ${data[key].join(", ")}`);
          else errors.push(`${key}: ${data[key]}`);
        }
        if (errors.length > 0) msg = errors.join("\n");
      }
      throw new Error(msg);
    }

    // ✅ Save tokens
    localStorage.setItem(TOKEN_KEY, data.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);

    // ✅ Redirect
    window.location.href = "/dashboard.html";

  } catch (error) {
    console.error("Login error:", error);
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
    errorMessage.style.color = "red";
  }
});