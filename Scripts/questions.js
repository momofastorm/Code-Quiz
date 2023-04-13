const QUIZ_SECTIONS = document.getElementById("quiz-questions");

const START_SECTION = document.getElementById("start-page");

function startGame() {
START_SECTION.classList.add('hidden')
QUIZ_SECTIONS.classList.remove('hidden')
displayQuestion() 
}
const START_BTN = document.getElementById("start-button");
//quiz
var quizArea = document.getElementById("questions");
//
const CORRECT = document.getElementById("correct");
const WRONG = document.getElementById("wrong");
//
const CHOICE_STATUSES = document.querySelectorAll(".choice-status");
const QUESTION = document.getElementById("question");
const CHOICES = document.getElementById("choices");
const TIME_REMAINING = document.getElementById("time-remaining");

//End
const SCORE = document.getElementById("score");
const INITIALS_INPUT = document.getElementById("initials");
const SUBMIT_SCORE = document.getElementById("submit-score");
const ERROR_MESSAGE = document.getElementById("error-message");
const END_SECTION = document.getElementById("end");
const END_TITLE = document.getElementById("end-title");


class Question {
  constructor(question, choices, indexOfCorrectChoice) {
    this.question = question;
    this.choices = choices;
    this.indexOfCorrectChoice = indexOfCorrectChoice;
  }
}

// Multi-choice questions//
var questions = [
  {
    question: "Javascript is an _______ language?",
    answerChoices: ["Object-Oriented", "Object-Based", "Procedural", "Numbers"],
    correctAnswer: "Object-Oriented"
  },

  {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    answerChoices:  ["var", "let", "Both A and B", "None of the above"],
    correctAnswer: "Both A and B"
  },
{
    question: "Which of the following methods is used to access HTML elements using Javascript?",
    answerChoices:  ["getElementbyId()", "getElementsbyClassName()", "Both A and B", "None of the Above"],
    correctAnswer: "Both A and B"
  },

  {
    question: "Which of the following methods can be used to display data in some form using Javascript?",
    answerChoices:  ["document.write()", "console.log()", "window.alert()", "All of the above"],
    correctAnswer: "All of the above",
  },
  
  
  {
    question: "Arrays in JavaScript are defined by which of the following statements?",
    answerChoices:  ["It is an ordered list of values", " It is an ordered list of objects", "It is an ordered list of string", "It is an ordered list of functions"],
    correctAnswer: "It is an ordered list of values",
  
  },
  
  {
    question: "Which of the following is not javascript data types?",
    answerChoices:  ["Null type", "Undefined type", "Number type", "All of the Above"],
    correctAnswer: "All of the Above",
  },
  {
    question: "Where is Client-side JavaScript code is embedded within HTML documents?",
    answerChoices:  ["A URL that uses the special javascript:code", "A URL that uses the special javascript:protocol", " A URL that uses the special javascript:encoding", "A URL that uses the special javascript:stack"],
    correctAnswer: "A URL that uses the special javascript:protocol",
  },
  
  
  {
    question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    answerChoices:  ["Position", "Window", "Standard", "Location"],
    correctAnswer: "Window",
  },
  

  {
    question: "Which of the following is not an error in JavaScript?",
    answerChoices:  ["Missing of Bracket", "Division by zero", "Syntax error", "Missing of semicolons"],
    correctAnswer: "Division by zero",
  },


  {
    question: "Which of the following is not an error in JavaScript?",
    answerChoices:  ["Missing of Bracket", "Division by zero", "Syntax error", "Missing of semicolons"],
    correctAnswer: "Division by zero",
  }]
  
  var currentQuestion = 1;

 

var totalTime = 90;
var totalTimeInterval;
var choiceStatusTimeout; 

/******** EVENT LISTENERS ********/ 
START_BTN.addEventListener('click', startGame);
CHOICES.addEventListener('click', processChoice);
SUBMIT_SCORE.addEventListener('submit', processInput);



/******** SHOWING/HIDING ELEMENTS ********/ 
function showElement(siblingList, element) {
 console.log(siblingList);
  for (element of siblingList) {
    hideElement(element);
  }
  element.classList.remove("hidden");
} 

function hideElement(element) {
console.log(element);
  if (!element) return;
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
}

/******** TIME ********/ 
function displayTime() {
  TIME_REMAINING.textContent = totalTime;
}

function startTimer() {
  totalTimeInterval = setInterval(function() {
    totalTime--;
    displayTime();
    checkTime();

  }, 1000);
}

function checkTime() {
  if (totalTime <= 0) {
    totalTime = 0;
    endGame();
  }
}

/******** QUESTIONS ********/ 
function displayQuestion() {
  
if (currentQuestion<questions.length) {
  QUESTION.textContent = questions[currentQuestion].question;
  displayChoiceList();
}
  
}

function displayChoiceList() {
  CHOICES.innerHTML = "";

 questions[currentQuestion].answerChoices.forEach(function(answer, index) {
    const li = document.createElement("li");
    li.dataset.index = index;
    const button = document.createElement("button");
    button.textContent = (index + 1) + ". " + answer;
    li.appendChild(button);
    CHOICES.appendChild(li);
  });
}

//when user answers a question
function processChoice(event) {
  const userChoice = parseInt(event.target.parentElement.dataset.index);

  resetChoiceStatusEffects();
  checkChoice(userChoice);
  getNextQuestion();
}

//Displaying choice statuses
function resetChoiceStatusEffects() {
  clearTimeout(choiceStatusTimeout);
  styleTimeRemainingDefault();
}

function styleTimeRemainingDefault() {
  TIME_REMAINING.style.color = "#4616E8";
}

function styleTimeRemainingWrong() {
  TIME_REMAINING.style.color = "#E81648";
}

function checkChoice(userChoice) {
  if (isChoiceCorrect(userChoice)) {
    displayCorrectChoiceEffects();
  } else {
    displayWrongChoiceEffects();
  }
}

function isChoiceCorrect(choice) {
  return choice === questions[currentQuestion].indexOfCorrectChoice;
}

function displayWrongChoiceEffects() {
  deductTimeBy(10);

  styleTimeRemainingWrong();
  showElement(CHOICE_STATUSES, WRONG);

  choiceStatusTimeout = setTimeout(function() {
    hideElement(WRONG);
    styleTimeRemainingDefault();
  }, 1000);
}

function deductTimeBy(seconds) {
  totalTime -= seconds;
  checkTime();
  displayTime();
}

function displayCorrectChoiceEffects() {
  showElement(CHOICE_STATUSES, CORRECT);

  choiceStatusTimeout = setTimeout(function() {
    hideElement(CORRECT);
  }, 1000);
}

//Get next question
function getNextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    endGame();
  } else {
    displayQuestion();
  }
}

/******** ENDING THE GAME ********/ 
function endGame() {
  clearInterval(totalTimeInterval);
  
  showElement(questions, END_SECTION);
  displayScore();
  setEndHeading();
}

function displayScore() {
  SCORE.textContent = totalTime;
}

function setEndHeading() {
  if (totalTime === 0) {
    END_TITLE.textContent = " Time is up! Try again";
  } else {
    END_TITLE.textContent = " You did great! You answered everything before your time was up!";
  }
}

/******** SUBMITTING INITIALS ********/ 
function processInput(event) {
  event.preventDefault();

  const initials = INITIALS_INPUT.value.toUpperCase();

  if (isInputValid(initials)) {
    const score = totalTime;
    const highscoreEntry = getNewHighscoreEntry(initials, score);
    saveHighscoreEntry(highscoreEntry);
    window.location.href= "./highScores.html";
  }
}

function getNewHighscoreEntry(initials, score) {
  const entry = {
    initials: initials,
    score: score,
  }
  return entry;
}

function isInputValid(initials) {
  let errorMessage = "";
  if (initials === "") {
    errorMessage = "Please fill out empty initials!";
    displayFormError(errorMessage);
    return false;
  } else if (initials.match(/[^a-z]/ig)) {
    errorMessage = "Letters only."
    displayFormError(errorMessage);
    return false;
  } else {
    return true;
  }
}

function displayFormError(errorMessage) {
  ERROR_MESSAGE.textContent = errorMessage;
  if (!INITIALS_INPUT.classList.contains("error")) {
    INITIALS_INPUT.classList.add("error");
  }
}

function saveHighscoreEntry(highscoreEntry) {
  const currentScores = getScoreList();
  placeEntryInHighscoreList(highscoreEntry, currentScores);
  localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

function getScoreList() {
  const currentScores = localStorage.getItem('scoreList');
  if (currentScores) {
    return JSON.parse(currentScores);
  } else {
    return [];
  }
}

function placeEntryInHighscoreList(newEntry, scoreList) {
  const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
  scoreList.splice(newScoreIndex, 0, newEntry);
}

function getNewScoreIndex(newEntry, scoreList) {
  if (scoreList.length > 0) {
    for (let i = 0; i < scoreList.length; i++) {
      if (scoreList[i].score <= newEntry.score) {
        return i;
      }
    } 
  }
  return scoreList.length;
}