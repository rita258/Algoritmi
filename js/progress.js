document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".stage-card");
    const progressBar = document.getElementById("progress-bar");
    const completed = JSON.parse(localStorage.getItem("completedScenes") || "[]");
  
    let unlocked = 0;
  
    cards.forEach((card, i) => {
      const id = card.dataset.scene;
      if (completed.includes(id)) {
        card.classList.remove("locked");
        card.classList.add("completed");
        unlocked = i + 1;
      }
    });
  
    cards.forEach((card, i) => {
      if (i === unlocked) {
        card.classList.remove("locked");
      }
    });
  
    const percent = Math.round((completed.length / cards.length) * 100);
    progressBar.style.width = percent + "%";
  });
  
  function resetProgress() {
    localStorage.removeItem("completedScenes");
    location.reload();
  }

  window.addEventListener("load", () => {
    const congrats = document.getElementById('final-congrats');
    const completed = JSON.parse(localStorage.getItem("completedScenes") || "[]");
    const total = document.querySelectorAll(".stage-card").length;
    if (congrats && completed.length === total) {
      congrats.style.display = 'block';
    }
  });
  