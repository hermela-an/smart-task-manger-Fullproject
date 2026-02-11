// signup.js

const signupForm = document.getElementById("signupForm");
const errorMessage = document.getElementById("errorMessage");

if (signupForm) {
  console.log("Signup form detected.");
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Signup form submitted");

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Preparing signup for:", username);

    if (!username || !email || !password) {
      showError("All fields are required");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/users/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      if (!response.ok) {
        const data = await response.json();
        let msg = data.detail || "Signup failed";

        // Handle field validation errors (e.g., {"username": ["Already taken"]})
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

      console.log("Signup successful, redirecting...");
      window.location.href = "/login.html";

    } catch (error) {
      console.error("Signup error:", error);
      showError(error.message);
    }
  });
} else {
  console.warn("Signup form NOT found on this page.");
}

function showError(msg) {
  if (!errorMessage) {
    alert("Signup error: " + msg);
    return;
  }
  errorMessage.textContent = msg;
  errorMessage.style.display = "block";
  errorMessage.style.color = "red";
  errorMessage.style.marginTop = "10px";
}