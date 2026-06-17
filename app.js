const TIMER_SECONDS = 15;

const questions = [
  // HTML (5)
  { topic: "HTML", text: "What does HTML stand for?", choices: ["HyperText Markup Language", "Hyper Transfer Markup", "High Text Machine Language", "Home Tool Markup Language"], answer: "HyperText Markup Language" },
  { topic: "HTML", text: "Which tag creates a line break?", choices: ["<lb>", "<break>", "<br>", "<newline>"], answer: "<br>" },
  { topic: "HTML", text: "Which attribute specifies an image's source?", choices: ["href", "src", "link", "img"], answer: "src" },
  { topic: "HTML", text: "Which element creates an unordered list?", choices: ["<ol>", "<ul>", "<list>", "<dl>"], answer: "<ul>" },
  { topic: "HTML", text: "Which heading tag is the largest?", choices: ["<h6>", "<h1>", "<heading>", "<h0>"], answer: "<h1>" },
  { topic: "HTML", text: "Which element is used to link up html and css file?", choices: ["text-align center", "link tag", "image tag", "javascript"], answer: "link tag" },
  { topic: "HTML", text: "Html can be describe as the structure of?", choices: ["Webpage", "link tag", "image tag", "javascript"], answer: "Webpage" },
  { topic: "HTML", text: "Which html tag makes content visible on the webpage?", choices: ["h1 tag", "title tag", "body tag", "img tag"], answer: "body tag" },
  { topic: "HTML", text: "What is a paragraph used for?", choices: ["Webpage", "Main container", "image tag", "Structure blocks of text on a webpage"], answer: "Structure blocks of text on a webpage" },
  { topic: "HTML", text: "What is a mark-up language?", choices: ["css", "html", "javascript", "css and html"], answer: "html" },

  // CSS (5)
  { topic: "CSS", text: "What does CSS stand for?", choices: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
  { topic: "CSS", text: "Which property changes text color?", choices: ["font-color", "text-color", "color", "foreground"], answer: "color" },
  { topic: "CSS", text: "How do you select an element with id \"main\"?", choices: [".main", "#main", "/main", "main"], answer: "#main" },
  { topic: "CSS", text: "Which property adds space INSIDE an element?", choices: ["margin", "padding", "spacing", "border"], answer: "padding" },
  { topic: "CSS", text: "Which property makes text bold?", choices: ["font-weight", "text-style", "font-bold", "bold"], answer: "font-weight" },
  { topic: "CSS", text: "What is the symbol used to end a css statement?", choices: ["semi colum", "double quote", "square bracket", "bold"], answer: "semi colum" },
  { topic: "CSS", text: "How do you style this element <p> About Me <p> in css?", choices: ["add the selector p {}", "add the \"About me\" text", "add the \"h1\" tag", "all of the above"], answer: "add the selector p {}" },
  { topic: "CSS", text: "Which css property is used to change the position of an element or a text on a webpage?", choices: ["font-style", "position", "text-align", "color"], answer: "text-align" },
  { topic: "CSS", text: "What is the purpose of css?", choices: ["To structure webpage content", "to style and format webpage content", "to store webpage data", "to connect to database"], answer: "to style and format webpage content" },
  { topic: "CSS", text: "Which CSS feature allows a webpage to adapt to different screen sizes?", choices: ["Animation", "Media Queries", "Selectors", "Comments"], answer: "Media Queries" },


  // JavaScript (5)
  { topic: "JavaScript", text: "Which keyword declares a variable in JavaScript?", choices: ["int", "let", "define", "declare"], answer: "let" },
  { topic: "JavaScript", text: "Which symbol is for single-line comments?", choices: ["/*", "//", "#", "<!--"], answer: "//" },
  { topic: "JavaScript", text: "Which method adds an element to the end of an array in JavaScript?", choices: ["push()", "pop()", "append()", "add()"], answer: "push()" },
  { topic: "JavaScript", text: "Which operator checks both value AND type?", choices: ["==", "===", "=", "!="], answer: "===" },
  { topic: "JavaScript", text: "Which function shows a popup message?", choices: ["print()", "message()", "alert()", "popup()"], answer: "alert()" },
  { topic: "JavaScript", text: "What is the full meaning of JS?", choices: ["john salad", "Journal script", "JavaScript", "jambscore"], answer: "JavaScript" },
  { topic: "JavaScript", text: "In Web Development, which of this is referreed to as the brain of a website", choices: ["html", "css", "JavaScript", "language"], answer: "JavaScript" },
  { topic: "JavaScript", text: "Who invented JaveScript?", choices: ["Brendan Eich in 1995", "Charles Babage", "Danny Tompson", "Tom and Jerry"], answer: "Brendan Eich in 1995" },
  { topic: "JavaScript", text: "Where do we run our javascript program?", choices: ["computer", "on the browser", "index.html", "style.css"], answer: "on the browser" },
  { topic: "JavaScript", text: "What Data type is this: let greeting = \"Hello, World\" in JavaScript", choices: ["number", "boolean", "object", "string"], answer: "string" }
];

const screens = {
  welcome: document.getElementById('screenWelcome'),
  quiz: document.getElementById('screenQuiz'),
  results: document.getElementById('screenResults')
};

const nameInput = document.getElementById('nameInput');
const errorMsg = document.getElementById('errorMsg');
const startBtn = document.getElementById('startBtn');
const userGreeting = document.getElementById('userGreeting');
const questionCount = document.getElementById('questionCount');
const progressFill = document.getElementById('progressFill');
const questionText = document.getElementById('questionText');
const choicesContainer = document.getElementById('choicesContainer');
const resultIcon = document.getElementById('resultIcon');
const resultScore = document.getElementById('resultScore');
const resultMessage = document.getElementById('resultMessage');
const restartBtn = document.getElementById('restartBtn');
const timerBar = document.getElementById('timerBar');
const timerText = document.getElementById('timerText');

const classNameInput = document.getElementById('classNameInput');
const topicBtns = document.querySelectorAll('.topic-btn');
const classGreeting = document.getElementById('classGreeting');

let filteredQuestions = [];
let currentQuestion = 0;
let score = 0;
let userName = '';
let className = '';
let selectedTopic = 'all';
let isAnswering = false;
let timerInterval = null;
let timeLeft = TIMER_SECONDS;
let userAnswers = [];

function showScreen(screenId) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function startTimer() {
  stopTimer();
  timeLeft = TIMER_SECONDS;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    if (timeLeft <= 0) {
      timeLeft = 0;
      updateTimerDisplay();
      stopTimer();
      handleTimeUp();
    } else {
      updateTimerDisplay();
    }
  }, 100);
}

function updateTimerDisplay() {
  const pct = (timeLeft / TIMER_SECONDS) * 100;
  timerBar.style.width = pct + '%';

  if (pct > 50) {
    timerBar.style.background = '#43e97b';
    timerText.classList.remove('urgent');
  } else if (pct > 25) {
    timerBar.style.background = '#ffd93d';
    timerText.classList.remove('urgent');
  } else {
    timerBar.style.background = '#f5576c';
    timerText.classList.add('urgent');
  }

  timerText.textContent = Math.ceil(timeLeft) + 's';
}

function handleTimeUp() {
  if (isAnswering) return;
  isAnswering = true;

  const allBtns = choicesContainer.querySelectorAll('.choice-btn');
  allBtns.forEach(b => { b.disabled = true; });

  const q = filteredQuestions[currentQuestion];
  allBtns.forEach(b => {
    if (b.textContent === q.answer) b.classList.add('correct');
  });

  userAnswers.push({
    question: q,
    selected: null,
    correct: false
  });

  setTimeout(() => {
    currentQuestion++;
    renderQuestion();
  }, 800);
}

function startQuiz() {
  const name = nameInput.value.trim();
  if (!name) {
    errorMsg.textContent = 'Please enter your name';
    nameInput.focus();
    return;
  }
  errorMsg.textContent = '';
  userName = name;
  className = classNameInput.value.trim();
  selectedTopic = document.querySelector('.topic-btn.selected')?.dataset.topic || 'all';

  if (selectedTopic === 'all') {
    filteredQuestions = [...questions];
  } else {
    filteredQuestions = questions.filter(q => q.topic === selectedTopic);
  }

  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  userGreeting.textContent = `👋 Hi, ${name}`;
  classGreeting.textContent = className ? `📚 ${className}` : '';
  showScreen('screenQuiz');
  renderQuestion();
}

function renderQuestion() {
  if (currentQuestion >= filteredQuestions.length) {
    showResults();
    return;
  }

  isAnswering = false;
  const q = filteredQuestions[currentQuestion];
  questionText.textContent = q.text;
  questionText.style.animation = 'none';
  void questionText.offsetHeight;
  questionText.style.animation = 'fadeIn 0.3s ease-out';

  questionCount.textContent = `${currentQuestion + 1} / ${filteredQuestions.length}`;
  progressFill.style.width = `${(currentQuestion / filteredQuestions.length) * 100}%`;

  choicesContainer.innerHTML = '';
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleChoice(btn, choice, q.answer));
    choicesContainer.appendChild(btn);
  });

  startTimer();
}

function handleChoice(btn, selected, correct) {
  if (isAnswering) return;
  isAnswering = true;
  stopTimer();

  const allBtns = choicesContainer.querySelectorAll('.choice-btn');
  allBtns.forEach(b => { b.disabled = true; });

  const isCorrect = selected === correct;
  if (isCorrect) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    allBtns.forEach(b => {
      if (b.textContent === correct) b.classList.add('correct');
    });
  }

  userAnswers.push({
    question: filteredQuestions[currentQuestion],
    selected,
    correct: isCorrect
  });

  setTimeout(() => {
    currentQuestion++;
    renderQuestion();
  }, 800);
}

function showResults() {
  stopTimer();
  progressFill.style.width = '100%';
  showScreen('screenResults');

  const total = filteredQuestions.length;
  const pct = total > 0 ? (score / total) * 100 : 0;
  let icon, msg;
  if (pct === 100) { icon = '🏆'; msg = "Perfect score! You're a tech genius!"; }
  else if (pct >= 80) { icon = '🌟'; msg = 'Amazing! You really know your stuff!'; }
  else if (pct >= 60) { icon = '👏'; msg = 'Good job! Keep learning!'; }
  else if (pct >= 40) { icon = '💪'; msg = 'Not bad! Room for improvement.'; }
  else { icon = '📚'; msg = "Time to hit the books! Try again."; }

  resultIcon.textContent = icon;
  resultScore.textContent = `${score} / ${total}`;
  resultMessage.textContent = msg;

  resultScore.style.animation = 'none';
  void resultScore.offsetHeight;
  resultScore.style.animation = 'bounceIn 0.6s ease-out';

  renderReview();

  if (pct >= 80) spawnConfetti();
}

function renderReview() {
  const wrap = document.getElementById('reviewWrap');
  const list = document.getElementById('reviewList');
  list.innerHTML = '';

  let html = '';
  userAnswers.forEach((item, i) => {
    const q = item.question;
    const isCorrect = item.correct;
    const statusIcon = isCorrect ? '✅' : '❌';
    const selectedText = item.selected ?? '(time ran out)';

    html += `<div class="review-item ${isCorrect ? 'review-correct' : 'review-wrong'}">`;
    html += `<div class="review-q">${statusIcon} <strong>${i + 1}.</strong> ${q.text}</div>`;
    html += `<div class="review-detail">Your answer: <span class="review-answer">${selectedText}</span></div>`;
    html += `<div class="review-detail">Correct answer: <span class="review-answer review-answer-correct">${q.answer}</span></div>`;
    html += `</div>`;
  });

  list.innerHTML = html;
  wrap.style.display = 'block';
}

function spawnConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#43e97b', '#ffd93d', '#6c5ce7'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (Math.random() * 8 + 4) + 'px';
    piece.style.height = (Math.random() * 8 + 4) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    piece.style.animationDelay = Math.random() * 1.5 + 's';
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 5000);
}

topicBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    topicBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

startBtn.addEventListener('click', startQuiz);
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') startQuiz(); });
restartBtn.addEventListener('click', () => {
  stopTimer();
  showScreen('screenWelcome');
  nameInput.value = '';
  classNameInput.value = '';
  document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('selected'));
  document.querySelector('.topic-btn[data-topic="all"]').classList.add('selected');
  document.getElementById('reviewWrap').style.display = 'none';
  nameInput.focus();
});
