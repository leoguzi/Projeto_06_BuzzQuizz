const quizz_url = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/"
const main = document.querySelector("main");
let user_quizzes = [];

function getAllQuizzes(){
    const promisse = axios.get(quizz_url + "quizzes");
    promisse.then(showMainPage);
    promisse.catch(errorMessage);
}

function errorMessage(error){
    console.log(error.response.status);
}

getAllQuizzes();

function showMainPage(response) {
    const quizzes = response.data;
    main.innerHTML = `<div class = list-title user-quizzes'><h1>Seus Quizzes</h1>
                        <ion-icon class= "icon" name="add-circle"></ion-icon>
                        </div>
                        <ul class="user-quizzes"></ul>
                        <h1 class="list-title">Todos os Quizzes</h1>
                        <ul class="other-quizzes"></ul`;

    const user_quizzes_list = document.querySelector(".user-quizzes");
    const other_quizzes_list = document.querySelector(".other-quizzes");
    if(user_quizzes.length === 0){
        user_quizzes_list.innerHTML = `<li class="no-user-quizzes">
                                            <spam>Você não criou nenhum quizz ainda :(</spam>
                                            <button>Criar Quizz</button>
                                        </li>`
    }
    for(let i=0; i<quizzes.length; i++){
        if(user_quizzes.indexOf(quizzes[i].id) >= 0){
            user_quizzes_list.innerHTML += `<li class="quizz-thumbnail" id="${quizzes[i].id}" onclick = "startQuizz(this)">
                                                <img src = "${quizzes[i].image}"/>
                                                <h1>${quizzes[i].title}</h1>
                                                <div class="gradient-effect"></div>
                                            </li>`
        }
        else{
            other_quizzes_list.innerHTML += `<li class="quizz-thumbnail" id="${quizzes[i].id}" onclick = "startQuizz(this)">
                                                <img src = "${quizzes[i].image}"/>
                                                <h1>${quizzes[i].title}</h1>
                                                <div class="gradient-effect"></div>
                                            </li>`
        }
    }
}