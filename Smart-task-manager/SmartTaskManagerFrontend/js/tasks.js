// tasks.js - Advanced Version with Stats, Filters, and Feedback

// ================= AUTH CHECK =================
const accessToken = localStorage.getItem(TOKEN_KEY);
if (!accessToken) window.location.href = "/login.html";

// ================= FEEDBACK HELPERS =================
const showLoading = () => {
  const loader = document.getElementById("loadingIndicator");
  if (loader) loader.style.display = "flex";
  taskList.style.opacity = "0.5";
};

const hideLoading = () => {
  const loader = document.getElementById("loadingIndicator");
  if (loader) loader.style.display = "none";
  taskList.style.opacity = "1";
};

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ================= GLOBAL STATE =================
let allTasks = [];
let currentFilter = "all";

// ================= FETCH TASKS =================
async function fetchTasks() {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/tasks/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (!response.ok) throw new Error("Failed to load tasks");

    const data = await response.json();

    // Normalize data structure
    if (Array.isArray(data)) allTasks = data;
    else if (data.results) allTasks = data.results;
    else if (data.data) allTasks = data.data;

    applyFilter(currentFilter);
    updateStats();

  } catch (error) {
    showEmptyMessage(error.message);
    showToast(error.message, "error");
  } finally {
    hideLoading();
  }
}

// ================= RENDER TASKS =================
function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    showEmptyMessage(currentFilter === "all" ? "No tasks yet. Add your first task 🚀" : "No tasks match this filter.");
    return;
  }

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = `task-card ${task.completed ? "completed" : ""}`;
    card.dataset.id = task.id;
    card.dataset.priority = task.priority || "low";
    card.dataset.date = task.due_date || "";

    card.innerHTML = `
      <div class="task-title">${task.title}</div>
      <div class="task-desc">${task.description || "No description"}</div>
      ${task.due_date ? `<div class="task-date">📅 Due: ${task.due_date}</div>` : ""}
      <div class="task-actions">
        <button class="btn-done" ${task.completed ? "disabled" : ""}>Done</button>
        <button class="btn-delete">Delete</button>
      </div>
    `;

    taskList.appendChild(card);
  });

  if (window.updateRecommendation) window.updateRecommendation();
}

// ================= FILTER LOGIC =================
function applyFilter(filter) {
  currentFilter = filter;

  // Update UI active state
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });

  let filtered = [];
  switch (filter) {
    case "pending": filtered = allTasks.filter(t => !t.completed); break;
    case "completed": filtered = allTasks.filter(t => t.completed); break;
    case "high": filtered = allTasks.filter(t => t.priority === "high"); break;
    default: filtered = allTasks;
  }

  renderTasks(filtered);
}

// Listen for filter buttons
const filterContainer = document.getElementById("taskFilters");
if (filterContainer) {
  filterContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      applyFilter(e.target.dataset.filter);
    }
  });
}

// ================= STATISTICS =================
function updateStats() {
  const total = allTasks.length;
  const pending = allTasks.filter(t => !t.completed).length;
  const completed = total - pending;

  const totalEl = document.getElementById("totalTasks");
  const pendingEl = document.getElementById("pendingTasks");
  const completedEl = document.getElementById("completedTasks");

  if (totalEl) totalEl.textContent = total;
  if (pendingEl) pendingEl.textContent = pending;
  if (completedEl) completedEl.textContent = completed;
}

// ================= EVENT DELEGATION =================
document.addEventListener("click", async function (e) {
  // Done Button
  if (e.target.classList.contains("btn-done")) {
    const taskElement = e.target.closest(".task-card");
    const taskId = taskElement.dataset.id;

    // UI Optimistic Update
    taskElement.classList.add("completed");
    e.target.disabled = true;

    const task = allTasks.find(t => t.id == taskId);
    if (task) task.completed = true;
    updateStats();
    if (window.updateRecommendation) window.updateRecommendation();

    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ completed: true })
      });
      if (!response.ok) throw new Error("Update failed");
      showToast("Task completed! 🌟");
    } catch (error) {
      taskElement.classList.remove("completed");
      e.target.disabled = false;
      if (task) task.completed = false;
      updateStats();
      showToast("Failed to update task.", "error");
    }
  }

  // Delete Button
  if (e.target.classList.contains("btn-delete")) {
    if (!confirm("Delete this task?")) return;

    const taskElement = e.target.closest(".task-card");
    const taskId = taskElement.dataset.id;

    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });

      if (!response.ok) throw new Error("Failed to delete task");

      allTasks = allTasks.filter(t => t.id != taskId);
      taskElement.remove();
      updateStats();
      showToast("Task deleted.");

      if (window.updateRecommendation) window.updateRecommendation();
      if (allTasks.length === 0) showEmptyMessage("No tasks yet.");

    } catch (error) {
      showToast(error.message, "error");
    }
  }
});

function showEmptyMessage(message) {
  taskList.innerHTML = `<div class="task-card"><p>${message}</p></div>`;
}

// ================= INITIAL LOAD =================
fetchTasks();
