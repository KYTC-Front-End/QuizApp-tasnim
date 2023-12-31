// Define the quiz questions and answers
const questions = [
  {
    question: "1What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    question: "2What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Earth", "Mars"],
    answer: "Jupiter"
  },
  {
    question: "3What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    question: "4What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Earth", "Mars"],
    answer: "Jupiter"
  },
  {
    question: "5What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    question: "6What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Earth", "Mars"],
    answer: "Jupiter"
  },
  {
    question: "7What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    question: "8What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Earth", "Mars"],
    answer: "Jupiter"
  },
 
 ];

// Get DOM elements
const app = document.getElementById("app");
const startBtn = document.getElementById("start-btn");
const leaderboard = document.getElementById("leaderboard");
const scoresList = document.getElementById("scores");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsList = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const playerNameInput = document.getElementById("player-name");

let currentQuestionIndex = 0;
let playerName = "";
let score = 0;

// Load leaderboard data from localStorage
let leaderboardData = localStorage.getItem("leaderboard");
if (leaderboardData) {
// This piece of code uses the JSON.parse() function to convert a 
// JSON string into a JavaScript object.
  leaderboardData = JSON.parse(leaderboardData);
} else {
  leaderboardData = [];
}

// Event listener for the start button
startBtn.addEventListener("click", startQuiz);

// Event listener for the next button
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  showNextQuestion();
});

// Function to start the quiz
function startQuiz() {
  // `.trim()`:
  //  هذه هي وظيفة JavaScript التي تستخدم لإزالة الفراغات الزائدة من بداية ونهاية النص.
  //  يتم استخدامها هنا لإزالة أي فراغات زائدة تم إدخالها بالخطأ من قبل المستخدم.
  playerName = playerNameInput.value.trim();
  if (playerName) {
    startBtn.style.display = "none";
    playerNameInput.style.display = "none";
    leaderboard.style.display = "none";
    quizContainer.style.display = "block";

    // Shuffle the questions array
    shuffleQuestions();

    showNextQuestion();
  }
}

// Function to shuffle the questions array
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // يتم استخدام هذا السطر لتبديل العناصر في المصفوفة. باستخدام تجديد القائمة
    //  الفعلية من الأسئلة بأسلوب جديد، يتم تبديل العنصر الحالي في المصفوفة (questions[i]) مع العنصر المحدد عشوائيًا (questions[j]).
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}



function showNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    resetQuiz();
    const question = questions[currentQuestionIndex];
    questionElement.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}: ${question.question}`;
    question.options.forEach((option) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", checkAnswer);
      optionsList.appendChild(li);
    });
  } else {
    endQuiz();
  }
}


// Function to check the selected answer
function checkAnswer(event) {
  const selectedOption = event.target;
  const selectedAnswer = selectedOption.textContent;
  const question = questions[currentQuestionIndex];

  if (selectedAnswer === question.answer) {
    selectedOption.classList.add("correct");
    score++;
  } else {
    selectedOption.classList.add("incorrect");
  }

  Array.from(optionsList.children).forEach((li) => {
    li.removeEventListener("click", checkAnswer);
  });

  nextBtn.style.display = "block";
}

function resetQuiz() {
  while (optionsList.firstChild) {
    optionsList.removeChild(optionsList.firstChild);
  }

  nextBtn.style.display = "none";
  Array.from(optionsList.children).forEach((li) => {
    li.classList.remove("correct", "incorrect");
  });

  // Reset the question counter
  questionElement.textContent = "";
}


// Function to end the quiz and show the final score
function endQuiz() {
  quizContainer.style.display = "none";
  leaderboard.style.display = "block";
  leaderboard.querySelector("h2").textContent = "Leaderboard - Final Score";
  const playerScore = `${playerName}: ${score}/${questions.length}`;
  leaderboardData.push(playerScore);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
  displayLeaderboard();
}

// Function to display the leaderboard
function displayLeaderboard() {
  scoresList.innerHTML = "";
  leaderboardData.forEach((data) => {
    const li = document.createElement("li");
    li.textContent = data;
    scoresList.appendChild(li);
  });
}


// Display leaderboard on page load
displayLeaderboard();
