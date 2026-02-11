// auth.js

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

if (loginForm) {
  console.log("Login form detected.");
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
      console.log(`Fetching: ${BASE_URL}/api/users/login/`);
      const response = await fetch(`${BASE_URL}/api/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      console.log("Response status:", response.status);

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response received:", text.substring(0, 200));
        throw new Error(`Server returned ${response.status} ${response.statusText}. Please check logs.`);
      }

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
      if (errorMessage) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";
        errorMessage.style.color = "red";
      } else {
        alert("Login error: " + error.message);
      }
    }
  });
}
