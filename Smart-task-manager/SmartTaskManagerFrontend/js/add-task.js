// js/add-task.js

const form = document.getElementById("taskForm");
const message = document.getElementById("message");

// 🔐 Get token
const token = localStorage.getItem(TOKEN_KEY);

// 🚨 Protect page
if (!token) {
    window.location.href = "/login.html";
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const due_date = document.getElementById("due_date").value; // Assuming backend accepts this

    // Build payload
    const payload = {
        title,
        description,
        priority
    };

    // Only add due_date if it has a value (avoid sending empty string if not required)
    if (due_date) {
        payload.due_date = due_date;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/tasks/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            message.style.color = "green";
            message.innerText = "✅ Task created successfully!";

            // Redirect
            setTimeout(() => {
                window.location.href = "/dashboard.html";
            }, 1000);

        } else {
            message.style.color = "red";
            let msg = data.detail || "Failed to create task.";

            // Handle field validation errors
            if (!data.detail && typeof data === "object") {
                const errors = [];
                for (const key in data) {
                    if (Array.isArray(data[key])) errors.push(`${key}: ${data[key].join(", ")}`);
                    else errors.push(`${key}: ${data[key]}`);
                }
                if (errors.length > 0) msg = errors.join("\n");
            }
            message.innerText = msg;
        }

    } catch (error) {
        message.style.color = "red";
        message.innerText = "Server error. Is backend running?";
        console.error(error);
    }
});
