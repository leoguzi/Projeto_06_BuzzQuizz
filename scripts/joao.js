
//quando o usuario escolher um quizz ele vai enviar o id do quizz  para cá só precisa fazer a função
const URL_SERVER_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";
let QUIZZ_ID = 1;               
function start(){

    let promise = axios.get(URL_SERVER_QUIZZES +'/'+ QUIZZ_ID);
    promise.then(getQuizz);
}
//até aqui a função

let quizzQuestions = [];
let questionsAnswers = [];
let answeredQuestions = 1;
let levels = []

function getQuizz(response){ 
    
   quizzTitle(response.data);
   quizzQuestions = response.data.questions;
   showQuestions(quizzQuestions);
   levels = response.data.levels
   console.log(levels);
}

function quizzTitle(title){
    const main = document.querySelector("main");
    main.innerHTML = `  <div class="banner" id="banner-img">
                        </div>
                        <div class="quizz-title" >
                            <h1 class="title-quizz"></h1> 
                        </div>
                        <ul>
                        </ul> `;
    const quizzTitle = document.querySelector('.quizz-title h1');
    bannerImg = title.image;
    document.getElementById('banner-img').style.backgroundImage = `url(${bannerImg})`;;
    quizzTitle.innerHTML = title.title; 
    quizzTitle.scrollIntoView();
}

function showQuestions(quizzQuestions){
    const questions = document.querySelector("ul")
    let o = 0;
    let p = 0;
    for(let i = 0; i < quizzQuestions.length; i++){
        questions.innerHTML +=` <li class="question-box" >
                                    <div class="question-quizz">
                                         ${quizzQuestions[i].title}
                                    </div> 
                                    <div class="answers" id="${i}">
                                    </div>
                                </li>`;
        let = quizzAnswers = quizzQuestions[i].answers;
        quizzAnswers.sort(sortAnswers);
        let answers = document.getElementById(i);
        for(let j = 0; j < quizzAnswers.length; j++){
            answers.innerHTML +=`<option class="answer" onclick="selectAnswer(this)" id="${quizzAnswers[j].isCorrectAnswer}">
                                    <img src="${quizzAnswers[j].image}" >
                                    <strong class="quizz-answer-text">${quizzAnswers[j].text}</strong>
                                </option>`;
        
        }
        answers = [];   
    }
}

function sortAnswers(){
    
    return Math.floor(Math.random() * 10);
}

function selectAnswer(element){
    const answers = element.parentNode.querySelectorAll(".answers > .answer")
    for(let i = 0; i<answers.length; i++){
        answers[i].classList.add("opac");
        answers[i].onclick = '';
        if(answers[i].id === 'true'){
            answers[i].classList.add("green");
        }else{
            answers[i].classList.add("red");
        }
        
    }
    element.classList.remove("opac");
    questionsAnswers.push(element.id);
    if(answeredQuestions === element.parentNode.parentNode.parentNode.childElementCount){
        setTimeout(endQuizz, 2000);
        
    }
    answeredQuestions++;
    console.log(questionsAnswers);
    setTimeout(scrollQuestion, 2000, element);
}

function scrollQuestion(element){
    let questionsBox = element.parentNode.parentNode;
    
    if(questionsBox.nextElementSibling !== null){
        questionsBox.nextElementSibling.scrollIntoView();
    }
}

function endQuizz(){
    const main = document.querySelector("main");
    main.innerHTML += ` <div class="end-quizz-box">
                            <div class="end-quizz-title">
                                <h2><strong>${calcRightAnswers()}% de acerto: ${showLevels().title}</strong></h2>
                            </div>
                            <div class="end-quizz-img-message">
                                <img src="${showLevels().image}">
                                <p>
                                    ${showLevels().text}
                                </p>
                            </div>
                        </div>
                        <button class="restart-quizz" onclick="restartQuizz()"> Reiniciar Quizz</button>
                        <p class="back-home" onclick="backHome()">Voltar para a home</p>`;
    const endQuizz = document.querySelector(".end-quizz-box");
    endQuizz.scrollIntoView();
}

function calcRightAnswers(){
    let trueAnswers = [];
    for(let i =0 ; i < questionsAnswers.length; i++){
        if(questionsAnswers[i] === 'true'){
            trueAnswers.push(questionsAnswers[i]);
        }
    }
    console.log("true: ", trueAnswers.length );
    console.log("total: ", questionsAnswers.length);
    let point = trueAnswers.length/questionsAnswers.length;
    console.log(point);
    return Math.round(point*100)
}

function showLevels(){
    let point = calcRightAnswers();
    for (let i = levels.length-1; i>= 0; i--){
        if(point > levels[i].minValue){
            return levels[i];
        }
    }
}

function restartQuizz(){
    questionsAnswers = [];
    answeredQuestions = 1;
    
}

function backHome(){
    console.log("volta para a tela 1");
}

start();




