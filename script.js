// pagehead
const yourHighScoreBtn = document.querySelector('#high-score')

// homepage
const Homepage = document.querySelector('#homepage')
const Rules = document.querySelector('#rules')
const beginQuiz = document.querySelector('#begin-quiz')

// quiz
const Quiz = document.querySelector('#quiz')
const Question = document.querySelector('#question')
const choiceBtnA = document.querySelector('#choice-gntA')
const choiceBtnB = document.querySelector('#choice-btnB')
const choiceBtnC = document.querySelector('#choice-btnC')
const choiceBtnD = document.querySelector('#choice-btnD')
const AllChoiceBtns = document.querySelector('.choice-btn')
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
const clearScoreBtn = document.querySelector('#clear')
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
        options: ['quotes', 'curly brackets', 'oarenthesis', 'square brackets'],
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
    currentScore.textContent = 'You scored ' + totalScore + ' points this time!'
    displayTime.style.display = 'none'
}

// might sound silly but i totaly forgot and didnt know about putting the n in the () 
function displayQuestion(n) {
    Question.textContent = questionBank[n].title
    choiceBtnA.textContent = questionBank[n].options[0]
    choiceBtnB.textContent = questionBank[n].options[1]
    choiceBtnC.textContent = questionBank[n].options[2]
    choiceBtnD.textContent = questionBank[n].options[3]
    questionIndex = n
}

function choiceCheck(event) {
    event.preventDefault()
    Result.style.display = "block"
    timeout(function () {
        Result.style.display = "none"
    }, 1000);
    
    if (questionBank[questionIndex].answer == event.target.value) {
        Result.textContent = "Right"
        totalScore = totalScore + 1
    }
    else {
        displayTime = displayTime - 10
        Result.textContent = "Wrong"
    }

    if (questionIndex < questionBank.length - 1) {
        displayQuestion(questionIndex + 1)
    }
    else {
        gameOver()
    }
    questionCount++
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
    if (getScore == null) {
        return
    }
    else { 
        // this sets the numbers in ascending order then i jsut flipp them so they are high to low
        unorderedList.sort(function (a, b) {
            return b.score - a.score
        })
    }
}

function displayScores() {
    userScores.style.display = 'none'
    // here im using inner html instesd of text content because the list of scores needs to be made and changes
    userScores.innerHTML = ''
    const highScores = orderScores()
    const topScore = highScores.slice(0, 5)
    for(let i = 0; i < topScore.length; i++) {
        const item = topScore[i]
        let li = document.createElement('li')
        li.textContent = item.score
        li.setAttribute('data-index'. i)
        userScores.appendChild(li)
    }

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

clearScoreBtn.addEventListener('click', function (event) {
    event.preventDefault()
    localStorage.clear()
    displayScores()
})