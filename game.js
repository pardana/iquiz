const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questionsArr = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

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
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
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

    console.log(classToApply);
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
startGame();
