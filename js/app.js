document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('scene');
  const sceneId = new URLSearchParams(window.location.search).get('scene');
  const scene = SCENES.find(s => s.id === sceneId);

  if (!scene) {
    container.innerHTML = '<p>Сцена не найдена.</p>';
    return;
  }

  document.title = scene.title;
  container.innerHTML = `<h2>${scene.title}</h2><p>${scene.intro}</p>`;

  scene.tasks.forEach((task, index) => {
    const block = document.createElement('div');
    block.className = 'task-block';

    if (task.type === 'quiz') renderQuiz(block, task, index);
    if (task.type === 'fill') renderFill(block, task, index);
    if (task.type === 'match') renderMatch(block, task, index);
    if (task.type === 'image-match') renderImageMatch(block, task, index);

    container.appendChild(block);
  });

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.onclick = () => evaluateAnswers(scene);
});

function renderQuiz(container, task, index) {
  container.innerHTML += `<p>${task.question}</p>`;
  task.options.forEach(opt => {
    container.innerHTML += `<label><input type="radio" name="quiz-${index}" value="${opt}"> ${opt}</label><br>`;
  });
}

function renderFill(container, task, index) {
  container.innerHTML += `<p>${task.question}</p>`;
  container.innerHTML += `<input type="text" data-fill-index="${index}" style="width:100%">`;
}

function renderMatch(container, task, index) {
  container.innerHTML += `<p>${task.prompt}</p>`;
  task.pairs.forEach(pair => {
    container.innerHTML += `
      <strong>${pair.left}</strong><br>
      <select data-match-left="${pair.left}" data-index="${index}">
        <option value="">Выберите...</option>
        ${task.pairs.map(p => `<option value="${p.right}">${p.right}</option>`).join('')}
      </select><br><br>`;
  });
}

function renderImageMatch(container, task, index) {
  container.innerHTML += `<p>${task.prompt}</p>`;
  const options = [...new Set(task.images.map(img => img.label))];
  task.images.forEach(img => {
    container.innerHTML += `
      <img src="${img.src}" class="match-img" style="margin-bottom:10px;"><br>
      <select data-img="${img.src}" data-index="${index}">
        <option value="">Выберите...</option>
        ${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
      </select><br><br>`;
  });
}

function evaluateAnswers(scene) {
  let correct = 0;

  scene.tasks.forEach((task, index) => {
    if (task.type === 'quiz' && checkQuiz(task, index)) correct++;
    if (task.type === 'fill' && checkFill(task, index)) correct++;
    if (task.type === 'match' && checkMatch(task, index)) correct++;
    if (task.type === 'image-match' && checkImageMatch(task, index)) correct++;
  });

  const percent = Math.round((correct / scene.tasks.length) * 100);

  if (correct === scene.tasks.length) {
    alert(`✅ Этап пройден на 100%!`);
    saveCompleted(scene.id);
    location.href = 'stages.html';
  } else {
    alert(`❌ Правильных ответов: ${correct} из ${scene.tasks.length} (${percent}%). Попробуй снова.`);
  }
}

function checkQuiz(task, index) {
  const selected = document.querySelector(`input[name="quiz-${index}"]:checked`);
  return selected && selected.value === task.answer;
}

function checkFill(task, index) {
  const input = document.querySelector(`input[data-fill-index="${index}"]`);
  return input && input.value.trim().toLowerCase() === task.answer.toLowerCase();
}

function checkMatch(task, index) {
  return task.pairs.every(pair => {
    const sel = document.querySelector(`select[data-match-left="${pair.left}"][data-index="${index}"]`);
    return sel && sel.value === pair.right;
  });
}

function checkImageMatch(task, index) {
  return task.images.every(img => {
    const sel = document.querySelector(`select[data-img="${img.src}"][data-index="${index}"]`);
    return sel && sel.value === img.label;
  });
}

function saveCompleted(sceneId) {
  let completed = JSON.parse(localStorage.getItem('completedScenes') || '[]');
  if (!completed.includes(sceneId)) {
    completed.push(sceneId);
    localStorage.setItem('completedScenes', JSON.stringify(completed));
  }
}
