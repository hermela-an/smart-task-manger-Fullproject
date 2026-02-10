// smart.js – Smart Recommendation Logic

const smartMessage = document.getElementById("smartMessage");

function updateRecommendation() {
  const incompleteTasks = Array.from(document.querySelectorAll(".task-card:not(.completed)"));
  const remainingCount = incompleteTasks.length;

  if (remainingCount === 0) {
    if (smartMessage) smartMessage.textContent = "🎉 All tasks completed. Amazing job!";
    return;
  }

  // 1. Check for Overdue or Due Today tasks
  const today = new Date().toISOString().split('T')[0]; // Simple YYYY-MM-DD
  const dueSoon = incompleteTasks.filter(t => t.dataset.date <= today && t.dataset.date !== "");

  if (dueSoon.length > 0) {
    if (smartMessage) smartMessage.textContent = `⏰ You have ${dueSoon.length} task${dueSoon.length > 1 ? 's' : ''} overdue or due today! Focus on these.`;
    return;
  }

  // 2. Check for High Priority tasks
  const highPriority = incompleteTasks.filter(t => t.dataset.priority === "high");
  if (highPriority.length > 0) {
    if (smartMessage) smartMessage.textContent = `🔥 Focus on your ${highPriority.length} High Priority task${highPriority.length > 1 ? 's' : ''} next!`;
    return;
  }

  // 3. General encouraging messages
  if (remainingCount === 1) {
    if (smartMessage) smartMessage.textContent = "👍 You are almost done. Just one task left!";
  } else {
    if (smartMessage) smartMessage.textContent = `⚡ You have ${remainingCount} pending tasks. Stay focused!`;
  }
}

// Initial Call
window.updateRecommendation = updateRecommendation;
updateRecommendation();