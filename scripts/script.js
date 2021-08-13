const quizz_url = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/"
const main = document.querySelector("main");
let local_user_quizzes = getLocalQuizzesIDs();

getAllQuizzes();

/*gets the IDs from the quizzes created locally*/
function getLocalQuizzesIDs(){
    const ids_string = localStorage.getItem("local_user_quizzes");
    if (ids_string === null){
        return [];
    }
    else{
    /*unserialization*/
    return JSON.parse(ids_string);
    }
}
/*adds an ID to the list of locally created quizzes*/
function addLocalQuizzID(new_id){
    local_user_quizzes.push(new_id);
    /*serialization*/
    const ids_string = JSON.stringify(local_user_quizzes);
    localStorage.setItem("local_user_quizzes", ids_string);
}
/*removes an ID to the list of locally created quizzes*/
function removeLocalQuizzID(id){
    local_user_quizzes.splice(local_user_quizzes.indexOf('id'), 1);
    const ids_string = JSON.stringify(local_user_quizzes);
    localStorage.setItem("local_user_quizzes", ids_string);
}

function getAllQuizzes(){
    const promisse = axios.get(quizz_url + "quizzes");
    promisse.then(showMainPage);
    promisse.catch(errorMessage);
}
/*generate the thumbnails*/
function showMainPage(response) {
    const quizzes = response.data;
    main.innerHTML = `<div class = 'title user-quizzes'><h1>Seus Quizzes</h1>
                        <ion-icon class= "icon" name="add-circle" onclick="createQuizzForm()"></ion-icon>
                        </div>
                        <ul class="user-quizzes"></ul>
                        <h1 class="title">Todos os Quizzes</h1>
                        <ul class="other-quizzes"></ul`;

    const user_quizzes_list = document.querySelector(".user-quizzes");
    const other_quizzes_list = document.querySelector(".other-quizzes");
    if(local_user_quizzes.length === 0){
        user_quizzes_list.innerHTML = `<li class="no-user-quizzes">
                                            <spam>Você não criou nenhum quizz ainda :(</spam>
                                            <button onclick="createQuizzForm()">Criar Quizz</button>
                                        </li>`
    }
    for(let i=0; i<quizzes.length; i++){
        const is_local = local_user_quizzes.indexOf(quizzes[i].id) >= 0;
        if(is_local){
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
/*generates a quizz object with the data from the firts form*/
function newQuizzObject(questions, levels){
    quizz = {
        title: "",
        image: "",
        questions: [],
        levels: []
    }

    const question = {
                        title: "",
                        color: "",
                        answers: []
                    }

    for(let i = 0; i < questions; i++){
        quizz.questions.push(question);
    }
    const level = {
                    title: "",
                    image: "",
                    text: "",
                    minValue: 0
                }
    for(let i = 0; i < levels; i++){
        quizz.levels.push(level);
    }
    return quizz;
}


/* texto da resposta da pergunda, a ser inserido em quizz.question.answers posteriormente.
{
    text: "",
    image: "",
    isCorrectAnswer: false
}*/

/*verifies if a string is at least 20 characters long*/
function hasTwentyChar(string){
    if(!string){
        return false;
    }
    else{
        console.log(string);
        return string.length >= 20;
    }
}

function isValidURL(string) {
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

function createQuizzForm(){
    
    main.innerHTML = `<div class="container basics">
                        <h3 class = "title">Comece pelo começo</h3>
                        <section class="content">
                            <input class="quizz_title" type="text" placeholder="Título do seu quizz">
                            <input class="URL" type="url" placeholder="URL da imagem do seu quizz">
                            <input class="questions-number" type="text" placeholder="Quantidade de perguntas do quizz">
                            <input class="levels-number" type="text" placeholder="Quantidade de níveis do quizz">
                            </section>
                            <button onclick="validateQuizzData()">Prosseguir pra criar perguntas</button>
                    </div>`
}

function validateQuizzData(){
    const title = document.querySelector(".quizz_title").value;
    const img_url = document.querySelector(".URL").value;
    const number_of_questions = document.querySelector(".questions-number").value;
    const number_of_levels = document.querySelector(".levels-number").value;
    const data_is_valid = hasTwentyChar(title) && isValidURL(img_url) && number_of_questions >= 3 && number_of_levels >= 2
    console.log(hasTwentyChar(title));
    console.log(isValidURL(img_url));
    console.log(number_of_questions >= 3);
    console.log(number_of_levels >= 2);
    if(data_is_valid){
        quizz = newQuizzObject(number_of_questions, number_of_levels);
        quizz.title = title;
        quizz.image = img_url;
        createQuestions(quizz);
    }
    else{
        alert("Algo está errado!Verifique os dados.")
    }
}

function createQuestions(quizz){
    console.log(quizz);
}

function errorMessage(error){
    console.log(error.response.status);
}