const URL_SERVER_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";
let QUIZZ_ID = 3;               

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
    console.log(quizzQuestions)
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
            console.log(" i: ",i);
        let = quizzAnswers = quizzQuestions[i].answers;
        quizzAnswers.sort(sortAnswers);
        let answers = document.getElementById(i);
        for(let j = 0; j < quizzAnswers.length; j++){
            answers.innerHTML +=`
                                    <div class="answer">
                                        <img src="${quizzAnswers[j].image}" >
                                        <strong>${quizzAnswers[j].text}</strong>
                                    </div>
                                `; 
                                
            console.log("j: ",j);
        }
        answers = [];   
    }
}

function sortAnswers(){
    
    return Math.floor(Math.random() * 10);
}