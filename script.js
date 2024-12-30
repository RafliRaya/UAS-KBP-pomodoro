// Constants
const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 10 * 60;

// DOM Elements
const pomodoroTimer = document.getElementById('pomodoro-timer');
const startPomodoroBtn = document.getElementById('start-pomodoro');
const resetPomodoroBtn = document.getElementById('reset-pomodoro');
const pomodoroStatus = document.getElementById('pomodoro-status');
const pomodoroBtnEl = document.getElementById('pomodoro-btn');
const shortBreakBtnEl = document.getElementById('short-break-btn');
const longBreakBtnEl = document.getElementById('long-break-btn');
const timerAlarm = document.getElementById('timer-alarm');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Timer State
let currentTime = POMODORO_TIME;
let originalTime = POMODORO_TIME;
let interval;
let isRunning = false;

// Todo State
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Timer Functions
function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  pomodoroTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startPomodoroBtn.textContent = 'Pause';
    interval = setInterval(() => {
      if (currentTime > 0) {
        currentTime--;
        updateTimerDisplay();
      }
      if (currentTime === 0) {
        clearInterval(interval);
        isRunning = false;
        startPomodoroBtn.textContent = 'Start';
        pomodoroStatus.textContent = 'Time is up!';
        playAlarm();
      }
    }, 1000);
  } else {
    clearInterval(interval);
    isRunning = false;
    startPomodoroBtn.textContent = 'Start';
  }
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  currentTime = originalTime;
  startPomodoroBtn.textContent = 'Start';
  updateTimerDisplay();
  pomodoroStatus.textContent = 'Timer reset!';
}

function setTimer(time, status) {
  clearInterval(interval);
  isRunning = false;
  currentTime = time;
  originalTime = time;
  startPomodoroBtn.textContent = 'Start';
  updateTimerDisplay();
  pomodoroStatus.textContent = status;
}

function playAlarm() {
  timerAlarm.play().catch(error => {
    console.log('Audio playback failed:', error);
  });
}

// Todo Functions
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-50', 'p-3', 'rounded', 'transition-all', 'duration-200');
    
    const leftSection = document.createElement('div');
    leftSection.classList.add('flex', 'items-center', 'flex-1');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.classList.add('h-5', 'w-5', 'cursor-pointer');
    checkbox.addEventListener('change', () => toggleTodo(index));

    const label = document.createElement('label');
    label.textContent = todo.text;
    label.classList.add('ml-3', 'flex-1', 'cursor-pointer');
    if (todo.completed) {
      label.classList.add('line-through', 'text-gray-500');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.classList.add('bg-red-500', 'hover:bg-red-600', 'text-white', 'px-3', 'py-1', 'rounded', 'ml-2');
    deleteBtn.addEventListener('click', () => deleteTodo(index));

    leftSection.appendChild(checkbox);
    leftSection.appendChild(label);
    todoItem.appendChild(leftSection);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
  });

  if (todos.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.textContent = 'No tasks yet. Add some!';
    emptyMessage.classList.add('text-center', 'text-gray-500', 'py-4');
    todoList.appendChild(emptyMessage);
  }
}

function addTodo(e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText) {
    todos.push({ text: todoText, completed: false });
    saveTodos();
    todoInput.value = '';
    renderTodos();
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Chart Setup
const productivityChart = document.getElementById('productivity-chart').getContext('2d');
new Chart(productivityChart, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Pomodoro Sessions',
      data: [10, 15, 12, 18, 20],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5
        }
      }
    }
  }
});

// Event Listeners
pomodoroBtnEl.addEventListener('click', () => setTimer(POMODORO_TIME, 'Pomodoro session ready!'));
shortBreakBtnEl.addEventListener('click', () => setTimer(SHORT_BREAK_TIME, 'Short break ready!'));
longBreakBtnEl.addEventListener('click', () => setTimer(LONG_BREAK_TIME, 'Long break ready!'));
startPomodoroBtn.addEventListener('click', startTimer);
resetPomodoroBtn.addEventListener('click', resetTimer);
todoForm.addEventListener('submit', addTodo);

// Initial render
renderTodos();
