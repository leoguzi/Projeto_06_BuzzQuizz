const URL_SERVER_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";
let QUIZZ_ID = 1;               

let promise = axios.get(URL_SERVER_QUIZZES +'/'+ QUIZZ_ID);
promise.then(getQuizz);
let quizzQuestions = [];

function getQuizz(response){ 
    
   quizzTitle(response.data);
   quizzQuestions = response.data.questions;
   showQuestions(quizzQuestions);
}

function quizzTitle(title){
    const quizzTitle = document.querySelector('.quizz-title h1');
    bannerImg = title.image;
    document.getElementById('banner-img').style.backgroundImage = `url(${bannerImg})`;;
    quizzTitle.innerHTML = title.title; 
}

function showQuestions(quizzQuestions){
    const questions = document.querySelector("ul")
    let o = 0;
    let p = 0;
    for(let i = 0; i < quizzQuestions.length; i++){
        questions.innerHTML +=` <li class="question-box" >
                                    <div class="question">
                                         ${quizzQuestions[i].title}
                                    </div> 
                                    <div class="answers" id="${i}">
                                    </div>
                                </li>`;
        let = quizzAnswers = quizzQuestions[i].answers;
        quizzAnswers.sort(sortAnswers);
        let answers = document.getElementById(i);
        for(let j = 0; j < quizzAnswers.length; j++){
            answers.innerHTML +=`<option class="answer" onclick="selectAnswer(this)">
                                    <img src="${quizzAnswers[j].image}" >
                                    <strong>${quizzAnswers[j].text}</strong>
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
    }
    element.classList.remove("opac");
    setTimeout(scrollQuestion, 2000, element);
}

function scrollQuestion(element){
    let questionsBox = element.parentNode.parentNode;
    
    if(questionsBox.nextElementSibling !== null){
        questionsBox.nextElementSibling.scrollIntoView();
    }
}