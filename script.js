// pagehead
const highScoreBtn = document.querySelector('#high-Score')

// homepage
const Homepage = document.querySelector('#homepage')
const Rules = document.querySelector('#rules')
const beginQuiz = document.querySelector('#begin-quiz')

// quiz
const Quiz = document.querySelector('#quiz')
const Question = document.querySelector('#question')
const choiceBtnA = document.querySelector('#choice-btnA')
const choiceBtnB = document.querySelector('#choice-btnB')
const choiceBtnC = document.querySelector('#choice-btnC')
const choiceBtnD = document.querySelector('#choice-btnD')
const AllChoiceBtns = document.querySelectorAll('.choice-btn')
const Result = document.querySelector('#result')
let questionIndex = 0
let questionCount = 1

// finish
const quizFinish = document.querySelector('#quiz-finish')
const Finish = document.querySelector('#finish')
const currentScore = document.querySelector('#current-score')
const doneBtn = document.querySelector('#doneBtn')

// scores
const scoreBoard = document.querySelector('#score-board')
const userScores = document.querySelector('#users-score')
const tryAgainBtn = document.querySelector('#try-again')
const clearScoreBtn = document.querySelector('#clearScore')
let totalScore = 0

// timer
const displayTime = document.getElementById("timer")
console.log(displayTime)
let secondsLeft = 60

// array of obj that hold the questions
const questionBank = [
    {
        title: 'Commonly used data types DO NOT incluse:',
        options: ['strings', 'alerts', 'boolean', 'numbers'],
        answer: 'alerts',
    },
    {
        title: 'The conditions in an if/else statement is enclosed with _______.',
        options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        answer: 'parenthesis',
    },
    {
        title: 'Arrays in JavaScript can be used to store _______.',
        options: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above',
    },
    {
        title: 'String values msut be enclosed with _______ when being assinged to a variable.',
        options: ['parenthesis', 'quotes', 'commas', 'square brackets'],
        answer: 'quotes',
    },
    {
        title: 'A very useful tool for debugging during develpment and debugging for printing content to the debugger.',
        options: ['console.log', 'for loop', 'JavaScript', 'terminal/bash'],
        answer: 'console.log',
    },
    {
        title: 'Which one of these IS NOT a variable type.',
        options: ['var', 'let', 'const', 'Math'],
        answer: 'Math',
    },
    {
        title: 'A number that is a decimal is also known as a _______ number.',
        options: ['max', 'floor', 'float', 'min'],
        answer: 'float',
    },
    {
        title: 'True or False: Numbers writin in string form are affected by Math methods or expressions.',
        options: ['True', 'False'],
        answer: 'False',
    },
    {
        title: 'In order to use index elements in an array, we use _______.',
        options: ['dot notation', 'square bracket notation', 'query selector', 'get element by id'],
        answer: 'square bracket notation',
    },
    {
        title: 'An array starts at 0 because they are _______.',
        options: ['non incremental', 'zero indexed', 'empty', 'undefined'],
        answer: 'zero indexed',
    },
]

function startQuiz() {
    Homepage.style.display = 'none'
    Quiz.style.display = 'block'
    quizFinish.style.display = 'none'
    scoreBoard.style.display = 'none'
    startTimer()
    questionIndex = 0
    displayQuestion(questionIndex)
}

function startTimer() {
    const timeInterval = setInterval(function () {
        secondsLeft--
        displayTime.textContent = 'Time: ' + secondsLeft
        if (secondsLeft < 0) {
            clearInterval(timeInterval)
            displayTime.textContent = "That's Time!"
            endGame()
        }
        else if (questionCount > questionBank.length) {
            clearInterval(timeInterval)
            endGame()
        }
    }, 1000)
}

function endGame() {
    Quiz.style.display = 'none'
    quizFinish.style.display = 'block'
    currentScore.textContent = 'You scored: ' + totalScore + ' out of ' + questionBank.length + ' points!';
    displayTime.style.display = 'none'
    saveScores()
}

// might sound silly but i totaly forgot and didnt know about putting the n in the () 
function displayQuestion(n) {
    Question.textContent = questionBank[n].title
    choiceBtnA.textContent = questionBank[n].options[0]
    choiceBtnB.textContent = questionBank[n].options[1]
    choiceBtnC.textContent = questionBank[n].options[2]
    choiceBtnD.textContent = questionBank[n].options[3]

    choiceBtnA.textContent = questionBank[n].options[0];
    choiceBtnA.value = questionBank[n].options[0];
  
    choiceBtnB.textContent = questionBank[n].options[1];
    choiceBtnB.value = questionBank[n].options[1];
  
    choiceBtnC.textContent = questionBank[n].options[2];
    choiceBtnC.value = questionBank[n].options[2];
  
    choiceBtnD.textContent = questionBank[n].options[3];
    choiceBtnD.value = questionBank[n].options[3];
  
    choiceBtnA.addEventListener('click', choiceCheck);
    choiceBtnB.addEventListener('click', choiceCheck);
    choiceBtnC.addEventListener('click', choiceCheck);
    choiceBtnD.addEventListener('click', choiceCheck);

    questionIndex = n
}

function choiceCheck(event) {
    event.preventDefault();
    Result.style.display = "block";
    setTimeout(function () {
        Result.style.display = "none";
    }, 1000);

    const selectedAnswer = event.target.value.toLowerCase();
    const correctAnswer = questionBank[questionIndex].answer.toLowerCase();

    if (selectedAnswer === correctAnswer) {
        Result.textContent = "Right";
        totalScore = totalScore + 1;
    } else {
        secondsLeft = secondsLeft - 10;
        Result.textContent = "Wrong";
    }

    if (questionIndex < questionBank.length - 1) {
        displayQuestion(questionIndex + 1);
    } else {
        gameOver();
    }
    questionCount++;
}

function getScore() {
    const scoreList = localStorage.getItem('allScores')
    if (scoreList !== null) {
        newList = JSON.parse(scoreList)
    }
    else {
        newList = []
    }

    return newList
}

function orderScores() {
    const unorderedList = getScore()
    if (unorderedList == null) {
        return
    }
    else { 
        // this sets the numbers in ascending order then i jsut flipp them so they are high to low
        unorderedList.sort(function (a, b) {
            return b.score - a.score
        })
        return unorderedList
    }
}

function displayScores() {
    userScores.innerHTML = ''
    // here im using inner html instesd of text content because the list of scores needs to be made and changes
    userScores.innerHTML = ''
    const highScores = orderScores()
    const topScore = highScores.slice(0, 5)
    for(let i = 0; i < topScore.length; i++) {
        const item = topScore[i]
        let li = document.createElement('li')
        li.textContent = 'Score: ' + item.score
        li.setAttribute('data-index', i)
        userScores.appendChild(li)
    }

}

function addItem(scoreItem) {
    let scoreList = getScore();
    scoreList.push(scoreItem);
    localStorage.setItem('allScores', JSON.stringify(scoreList));
}

function saveScores() {
    let scoreItem = {
        score : totalScore
    }
    addItem(scoreItem)
    displayScores()
}

beginQuiz.addEventListener('click', startQuiz)

AllChoiceBtns.forEach(function (click) {
    click.addEventListener('click', choiceCheck)
})

doneBtn.addEventListener('click', function (event) {
    event.preventDefault()
    Homepage.style.display ='none'
    Quiz.style.display = 'none'
    quizFinish.style.display = 'none'
    scoreBoard.style.display = 'block'
    saveScores()
})

tryAgainBtn.addEventListener('click', function (event) {
    event.preventDefault()
    Homepage.style.display ='block'
    Quiz.style.display = 'none'
    quizFinish.style.display = 'none'
    scoreBoard.style.display = 'none'
    location.reload()
})

yourHighScoreBtn.addEventListener('click', function (event) {
    event.preventDefault()
    Homepage.style.display ='none'
    Quiz.style.display = 'none'
    quizFinish.style.display = 'none'
    scoreBoard.style.display = 'block'
    displayScores()
})

clearScoresBtn.addEventListener('click', function (event) {
    event.preventDefault()
    localStorage.removeItem('allScores')
    displayScores()
})