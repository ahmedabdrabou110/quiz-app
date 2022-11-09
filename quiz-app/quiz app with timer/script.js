//! get All required
const startBtn = document.querySelector('.start_button button')
const infoApp = document.querySelector('.info_app')
const exitBtn = infoApp.querySelector('.buttons button.exit')
const continueBtn = infoApp.querySelector('.buttons button.restart')
const quizApp = document.querySelector('.quiz-app')
let questionNumber = 0
const nextQuestion = quizApp.querySelector('footer .next_question')
const timerCounter = quizApp.querySelector('.timer .timer_seconds')
let counter
let counterLine
let timerValue = 15
let counterLineValue = 0
const timeLine = quizApp.querySelector('header .timeLine')
const resultQuiz = document.querySelector('.result_box')
let userScore = 0
const quitQuiz = resultQuiz.querySelector('.quit')
const restartQuiz = resultQuiz.querySelector('.restart')

//! If clicked Start Btn
startBtn.addEventListener('click', () => {
  infoApp.classList.add('infoApp') //! Show the info App box
})

//! If clicked quit Btn
quitQuiz.addEventListener('click', () => {
  window.location.reload() //! reload the page
})

//! if exit button clicked

exitBtn.addEventListener('click', () => {
  infoApp.classList.remove('infoApp') //! Hide the info App box
})

//! if continue button clicked

continueBtn.addEventListener('click', () => {
  quizApp.classList.add('activeQuiz') //! show the quiz App
  infoApp.classList.remove('infoApp') //! Hide the info box
  // showQuestions(0)
  startTimer(15)
  startTimerLine(0)
})

// //! Function of fetch Questions from JSON file
let fetchQuestions = () => {
  let request = new XMLHttpRequest()
  request.open('GET', './questions.json', true)
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText)
      showQuestions(questionsObject, 0)
      // ! if next question is clicked
      //! If clicked restart Btn
      restartQuiz.addEventListener('click', () => {
        quizApp.classList.add('activeQuiz')
        resultQuiz.classList.remove('activeResultQuiz')
        let timerValue = 15
        let counterLineValue = 0
        let userScore = 0
        questionNumber = 0
        // startTimer(15)
        // startTimerLine(0)
        showQuestions(questionsObject, questionNumber)
        clearInterval(counter)
        startTimer(timerValue)
        clearInterval(counterLine)
        startTimerLine(counterLineValue)
        nextQuestion.style.display = 'none'
      })

      nextQuestion.addEventListener('click', () => {
        if (questionNumber < questionsObject.length - 1) {
          questionNumber++
          showQuestions(questionsObject, questionNumber)
          clearInterval(counter)
          startTimer(timerValue)
          clearInterval(counterLine)
          startTimerLine(counterLineValue)
          nextQuestion.style.display = 'none'
        } else {
          // console.log('Completed')
          resultQuiz.classList.add('activeResultQuiz')
          quizApp.classList.remove('activeQuiz')
        }
      })
    }
  }
  request.send()
}

fetchQuestions()

//! function of show Question
let showQuestions = (data, index) => {
  // console.log(data)
  //! get the data
  // let data = fetchQuestions()
  // console.log(data)
  //! show question title
  const questionText = document.querySelector('.question_text')
  questionText.innerHTML = `<span>${data[index].number}.${data[index].question}</span>`

  //! show question option to choose the correct
  const questionOption = document.querySelector('.option_list')
  const optionTag = `<div class="option"><span>${data[index].option[0]}</span></div>
                     <div class="option"><span>${data[index].option[1]}</span></div>
                     <div class="option"><span>${data[index].option[2]}</span></div>
                     <div class="option"><span>${data[index].option[3]}</span></div>`
  questionOption.innerHTML = optionTag
  //! question of count of questions
  const bottomQuestionCounter = document.querySelector('.total_questions')
  bottomQuestionCounter.innerHTML = `<span><p> ${data[index].number}</p> of <p>${data.length}</p>questions</span`
  const trick = `<div class="icon trick">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
              >
                <path
                  d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
                />
              </svg>
            </div>`
  let cross = `<div class="icon cross">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
                
              >
                <path
                  d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
                />
              </svg>
            </div>`
  const options = document.querySelectorAll('.option_list .option')
  const answer = data[index].answer
  options.forEach((option) => {
    option.addEventListener('click', () => {
      clearInterval(counter)
      clearInterval(counterLine)
      nextQuestion.style.display = 'block'
      if (option.textContent === answer) {
        userScore++
        option.classList.add('correct')
        option.insertAdjacentHTML('beforeend', trick)
        const scoreText = resultQuiz.querySelector('.score_text')
        if (userScore > 3) {
          let scoreTag = `<span>and congrats , you got <p> ${userScore} </p>out of<p> ${data.length} </p></span>`
          scoreText.innerHTML = scoreTag
        } else if (userScore < 2) {
          let scoreTag = `<span>and sorry , you got <p> ${userScore} </p>out of<p> ${data.length} </p></span>`
          scoreText.innerHTML = scoreTag
        } else if (userScore == 0) {
          let scoreTag = `<span>Sorry , you Failed in this quiz study , and you can restart again </p></span>`
          scoreText.innerHTML = scoreTag
        } else {
          let scoreTag = `<span>and nice , you got <p> ${userScore} </p>out of<p> ${data.length} </p></span>`
          scoreText.innerHTML = scoreTag
        }
      } else {
        option.classList.add('incorrect')
        option.insertAdjacentHTML('beforeend', cross)

        options.forEach((option) => {
          if (option.textContent == answer) {
            option.classList.add('correct')
            option.insertAdjacentHTML('beforeend', trick)
          }
        })
      }
      options.forEach((option) => {
        option.classList.add('disabled')
      })
    })
  })
}

let startTimer = (time) => {
  counter = setInterval(timer, 1000)
  function timer() {
    timerCounter.textContent = time
    time--
    if (time <= 9) {
      time = '0' + time
    }
    if (time <= 0) {
      clearInterval(counter)
      timerCounter.textContent = '00'
      nextQuestion.style.display = 'block'
      // nextQuestion.click()
      // userScore--
    }
  }
}

let startTimerLine = (time) => {
  counterLine = setInterval(timer, 30)
  function timer() {
    time += 1
    timeLine.style.width = time + 'px'
    if (timer > 604) {
      clearInterval(counterLine)
    }
  }
}
