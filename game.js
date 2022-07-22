const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questionsArr = [];
fetch("question.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestion) => {
    questionsArr = loadedQuestion;
    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

//CONSTANT
const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...questionsArr];

  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestion.length === 0 || questionCounter > MAX_QUESTION) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question : ${questionCounter}/${MAX_QUESTION}`;

  //Update the Progress Bar

  progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

  const quiestionIndex = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[quiestionIndex];
  question.innerText = currentQuestion.question;

  choices.map((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestion.splice(quiestionIndex, 1);
  acceptingAnswer = true;
};

choices.map((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
