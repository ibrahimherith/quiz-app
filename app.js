const baseURL = 'https://opentdb.com/api.php?amount=1&category=18'; //questions API
const containerEl = document.querySelector('.container');
const form = document.querySelector('#quiz_form');
const qusEl = document.querySelector('.qus');
const optionEl = document.querySelector('.all_options');
const buttonEl = document.querySelector('buttons');
const scoreEl = document.querySelector('.scoreBoard .score-num');
const answeredEl = document.querySelector('.scoreBoard .answered-num');


//variables
let question, answer;
let options = [];
let score = 0;
let answeredQus = 0;



window.addEventListener('DOMContentLoaded', quizApp);


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(e.target.quiz.value){
        checkQuiz(e.target.quiz.value);

        e.target.querySelector('button').style.display = 'none';
        generateButtons();
    }
    else{
        return;
    }
})



async function quizApp(){
    const data = await fetchQuiz();
    question = data[0].question;
    options = [];
    answer = data[0].correct_answer;
    data[0].incorrect_answers.map(option => options.push(option));
    options.splice(Math.floor(Math.random() * options.length + 1), 0, answer);


    //function call
    generateTemplate(question, options);
}


async function fetchQuiz(){
    const response = await fetch(baseURL);
    const data = await response.json();

    return data.results;
}


//genarating html for users to see
function generateTemplate(question, options){
    optionEl.innerHTML = '';
    qusEl.innerText = question;

    options.map((options, index) => {
        const item = document.createElement('div');
        item.classList.add('option');
        item.innerHTML = '
        <input type="radio" id="option${index + 1}" value="$(option)" name="Quiz">
        <label for="option${index + 1}">${option}</label>
        '

        optionE1.appendChild(item);
    })
}


//
function checkQuiz(selected){
    answeredQus++;

    if(selected === answer){
        score++;
    }

    updateScoreBoard();

    form.quiz.forEach(input => {
        if(input.value === answer){
            input.parentElement.classList.add('correct');
        }
    })
}

function updateScoreBoard(){
    scoreEl.innerText = score;
    answeredEl.innerText = answeredQus;
}


//
function generateButtons(){
    const finishBtn = document.createElement('button');
    finishBtn.innerText = 'Finish';
    finishBtn.setAttribute('type', 'button');
    finishBtn.classList.add('finish-btn');
    buttonEl.appendChild(finishBtn);

    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next Quiz';
    nextBtn.setAttribute('type', 'button');
    nextBtn.classList.add('next-btn');
    buttonEl.appendChild(nextBtn);

    //
    finishBtn.addEventListener('click', finishQuiz());
    nextBtn.addEventListener('click', nextQuiz());
}

function nextQuiz(){
    const nextBtn = document.querySelector('.next-btn');
    const finishBtn = document.querySelector('finish-btn');

    //removing btn
    buttonEl.removeChild(nextBtn);
    buttonEl.removeChild(finishBtn);

    //getting back submit button
    buttonEl.querySelector('button[type = "submit"]').style.display = 'block';

    //
    quizApp();
}

function finishQuiz(){
    //removing btn
    buttonEl.removeChild(nextBtn);
    buttonEl.removeChild(finishBtn);

    //getting back submit button
    buttonEl.querySelector('button[type = "submit"]').style.display = 'block';

    //
    const overlay = document.createElement('div');
    overlay.classList.add('result-overlay');
}