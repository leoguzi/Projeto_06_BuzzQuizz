const quizz_url = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/"
const main = document.querySelector(".main");
let local_user_quizzes = getLocalQuizzesIDs();
let new_quizz = null

getAllQuizzes();

//gets the IDs from the quizzes created locally
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
//adds an ID to the list of locally created quizzes
function addLocalQuizzID(new_id){
    local_user_quizzes.push(new_id);
    /*serialization*/
    const ids_string = JSON.stringify(local_user_quizzes);
    localStorage.setItem("local_user_quizzes", ids_string);
}
//removes an ID to the list of locally created quizzes
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
//generate the thumbnails
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
//generates a quizz object with the data from the firts form
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

//verifies if a string is at least 20 characters long
function checkStringLength(string, length){
    if(!string){
        return false;
    }
    else{
        return string.length >= length && string.length <= 65;
    }
}

//verifies the image url
function isValidURL(string) {
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

function isValidHexColor(string){
    const res = string.match(/^#[0-9A-F]{6}$/i);
    return (res != null);
}

//cheks if all the validation results are true
function checkBoolArray(array){
    for(let i = 0; i<array.length; i++){
        if (array[i] === false){
            return false;
        }
    }
    return true
}

function createQuizzForm(){
    main.classList.add("forms");
    main.innerHTML = `  <h1 class="form-title">Comece pelo começo</h1>
                        <section class="content">
                            <input class="quizz-title" type="text" placeholder="Título do seu quizz">
                            <input class="URL" type="url" placeholder="URL da imagem do seu quizz">
                            <input class="questions-number" type="text" placeholder="Quantidade de perguntas do quizz">
                            <input class="levels-number" type="text" placeholder="Quantidade de níveis do quizz">
                        </section>
                        <button class ="form-button" onclick="validateQuizzData()">Prosseguir pra criar perguntas</button>`
}

//validates the data and starts filling the new_quizz object
function validateQuizzData(){
    const title = document.querySelector(".quizz-title").value;
    const img_url = document.querySelector(".URL").value;
    const number_of_questions = document.querySelector(".questions-number").value;
    const number_of_levels = document.querySelector(".levels-number").value;
    const data_is_valid = checkStringLength(title, 20) && isValidURL(img_url) && number_of_questions >= 3 && number_of_levels >= 2
    if(data_is_valid){
        new_quizz = newQuizzObject(number_of_questions, number_of_levels);
        quizz.title = title;
        quizz.image = img_url;
        createQuestionsForm();
    }
    else{
        alert("Algo está errado! Verifique os dados.")
    }
}

function createQuestionsForm(){
    
    main.innerHTML = `<h1 class="form-title">Crie suas perguntas</h1>
                        <div class="questions"></div>`
    const questions_form_container = main.querySelector(".questions");
    for(let i=0; i<new_quizz.questions.length; i++){ 
        if(i === 0){
            questions_form_container.innerHTML += `<div class="question-container">
                                                        <section class="content questions showing-question">
                                                            <h2 class= "title">Pergunta ${i+1}</h2>
                                                            <article class="question">
                                                                <input class="question-text" type="text" placeholder="Texto da pergunta">
                                                                <input class="question-color" "type="text" placeholder="Cor de fundo da pergunta">
                                                            </article>
                                                            <h2 class= "title">Resposta correta</h2>
                                                            <article class="question">
                                                                <input class="right-answer-text" type="text" placeholder="Resposta correta">
                                                                <input class="right-answer-img" type="text" placeholder="URL da imagem">
                                                            </article>
                                                            <h2 class= "title">Respostas incorretas</h2>
                                                            <article class="question">
                                                                <input class="wrong-answer-text" type="text" placeholder="Resposta incorreta 1">
                                                                <input class="wrong-answer-img" type="text" placeholder="URL da imagem 1">
                                                            </article>
                                                            <article class="question">
                                                                <input class="wrong-answer-text" type="text" placeholder="Resposta incorreta 2">
                                                                <input class="wrong-answer-img" type="text" placeholder="URL da imagem 2">
                                                            </article>
                                                            <article class="question">
                                                                <input class="wrong-answer-text" type="text" placeholder="Resposta incorreta 3">
                                                                <input class="wrong-answer-img" type="text" placeholder="URL da imagem 3">
                                                            </article>
                                                        </section>
                                                        <section class="content hiden some">
                                                            <h2 class= "title">Pergunta ${i+1}</h2>
                                                            <ion-icon name="create-outline" onclick="showQuestion(this)"></ion-icon>
                                                        </section>
                                                    </div>`;
        }
        else {
            questions_form_container.innerHTML += `<div class="question-container">
                                                        <section class="content questions some">
                                                            <h2 class ="title">Pergunta ${i+1}</h2>
                                                            <article class="question">
                                                                <input class="question-text" type="text" placeholder="Texto da pergunta">
                                                                <input class="question-color" "type="text" placeholder="Cor de fundo da pergunta">
                                                            </article>
                                                            <h2 class= "title">Resposta correta</h2>
                                                            <article class="question">
                                                                <input class="right-answer-text" type="text" placeholder="Resposta correta">
                                                                <input class="right-answer-img" type="text" placeholder="URL da imagem">
                                                            </article>
                                                            <h2 class= "title">Respostas incorretas</h2>
                                                            <article class="question">
                                                                <input class="wrong-answer-text" type="text" placeholder="Resposta incorreta 1">
                                                                <input class="wrong-answer-img" type="text" placeholder="URL da imagem 1">
                                                            </article>
                                                            <article class="question">
                                                                <input class="wrong-answer-text" type="text" placeholder="Resposta incorreta 2">
                                                                <input class="wrong-answer-img" type="text" placeholder="URL da imagem 2">
                                                            </article>
                                                            <article class="question">
                                                                <input class="wrong-answer-text" type="text" placeholder="Resposta incorreta 3">
                                                                <input class="wrong-answer-img" type="text" placeholder="URL da imagem 3">
                                                            </article>
                                                        </section>
                                                        <section class="content hiden">
                                                            <h2 class= "title">Pergunta ${i+1}</h2>
                                                            <ion-icon name="create-outline" onclick="showQuestion(this)"></ion-icon>
                                                        </section>
                                                    </div>`;
        }
    }
    questions_form_container.innerHTML += `<button class="form-button"onclick="validateQuestionsData()">Prosseguir pra criar níveis</button>`;
}

//validates the data from the questions form and put the questions data in the new_quizz object
function validateQuestionsData(){
    //array that will keep the results of the validation functions
    let validated_data = [];
    let is_valid = false;
    let at_least_one_wrong_answer = false;
    const questions = document.querySelectorAll(".question-container");
    for(let i=0; i < questions.length; i++){
        at_least_one_wrong_answer = false;
        const wrong_answers = questions[i].querySelectorAll(".question.wrong-answer");
        const question = questions[i].querySelector(".question-text").value;
        const question_color = questions[i].querySelector(".question-color").value;
        const right_answer = questions[i].querySelector(".right-answer-text").value;
        const right_answer_img = questions[i].querySelector(".right-answer-img").value;
        const is_valid_rigth_answer = checkStringLength(right_answer, 1) && isValidURL(right_answer_img);
        is_valid = checkStringLength(question, 20) && isValidHexColor(question_color) && is_valid_rigth_answer;
        if(is_valid){
            const new_question = {
                            title: question,
                            color: question_color,
                            answers: []
                            }  
            new_quizz.questions[i] = new_question; 
            const answer = {
                            text: right_answer,
                            image: right_answer_img,
                            isCorrectAnswer: true
                            }
            new_quizz.questions[i].answers = [answer];
            validated_data.push(true);
        }
        else{
            validated_data.push(false)
        }
            for(let j=0; j < wrong_answers.length; j++){
                const wrong_answer = wrong_answers[j].querySelector(".wrong-answer-text").value;
                const wrong_answer_img = wrong_answers[j].querySelector(".wrong-answer-img").value;
                is_valid = checkStringLength(wrong_answer, 1) && isValidURL(wrong_answer_img);
                if(is_valid){
                    const answer = {
                                    text: wrong_answer,
                                    image: wrong_answer_img,
                                    isCorrectAnswer: false
                                    } 
                    new_quizz.questions[i].answers.push(answer);
                    at_least_one_wrong_answer = true;
                    validated_data.push(true);
                }
            }
    }
    is_valid = checkBoolArray(validated_data);
    console.log(new_quizz);
    if(at_least_one_wrong_answer && is_valid){
        createLevelsForm();
    }
    else{
        alert("Algo está errado! Verifique os dados!");
    }
}

function showQuestion(element){
    let hidenInputs = element.parentNode;
    let showInputs =  hidenInputs.parentNode.querySelector(".questions");
    let showingInputs = document.querySelector(".showing-question");
    let hideInputs = showingInputs.parentNode.querySelector(".hiden");
    showingInputs.classList.remove("showing-question");
    showingInputs.classList.add("some");
    hideInputs.classList.remove("some");
    hidenInputs.classList.add("some");
    showInputs.classList.remove("some");
    showInputs.classList.add("showing-question");
}

function errorMessage(error){
    console.log(error.response.status);
}

function showLevel(element){
    let hidenInputs = element.parentNode;
    let showInputs =  hidenInputs.parentNode.querySelector(".questions");
    let showingInputs = document.querySelector(".showing-level");
    let hideInputs = showingInputs.parentNode.querySelector(".hiden");
    showingInputs.classList.remove("showing-level");
    showingInputs.classList.add("some");
    hideInputs.classList.remove("some");

    hidenInputs.classList.add("some");
    showInputs.classList.remove("some");
    showInputs.classList.add("showing-level");
}

function isBetween0And100(string){
    const number = Number(string);
    if(number >= 0 && number <= 100){
        return true
    }else{
        return false;
    }
}

function atLeastOneZero(array){
    let zero = 0;
    for(let i=0; i<array.length; i++){
        if(array[i] === 0){
            zero++;
        }
    }

    if(zero >= 1){
        return true;
    }else{
        return false;
    }
}

function createLevelsForm(){
    main.innerHTML = `<h1 class="title">Agora, decida os níveis</h3>
                        <div class="container levels"></div>`;
    const levels_form_container = main.querySelector(".container.levels");

    for(let i=0; i<quizz.levels.length; i++){ 
        if(i === 0){
            levels_form_container.innerHTML +=  `<div class="container-level">
            <section class="content questions showing-level">
            <h3>Nível ${i+1}</h3>
            <input class="level-title" type="text" placeholder="Título do nível">
            <input class="min-percent" type="text" placeholder="% de acerto mínima">
            <input class="level-URL" type="text" placeholder="URL da imagem do nível">
            <input class="description" type="text" placeholder="Descrição do nível">
        </section>

        <section class="content hiden some">
            <h4>Nível ${i+1}</h4>
            <ion-icon name="create-outline" onclick="showLevel(this)"></ion-icon>
        </section>
        </div>`;
        }
        else {
            levels_form_container.innerHTML +=`<div class="container-level">
            <section class="content questions some">
            <h3>Nível ${i+1}</h3>
            <input class="level-title" type="text" placeholder="Título do nível">
            <input class="min-percent" type="text" placeholder="% de acerto mínima">
            <input class="level-URL" type="text" placeholder="URL da imagem do nível">
            <input class="description" type="text" placeholder="Descrição do nível">
        </section>

        <section class="content hiden">
            <h4>Nível ${i+1}</h4>
            <ion-icon name="create-outline" onclick="showLevel(this)"></ion-icon>
        </section>
        </div>`;
        }
    }
    levels_form_container.innerHTML += `<button onclick="validateLevelsData()">Finalizar Quizz</button>`;

}

function validateLevelsData(){
    const all_levels = document.querySelectorAll(".container-level");
    new_quizz.levels = [];
    let percents = [];
    let validOnes = 0;

    for(let i=0; i<all_levels.length; i++){
        const level_title = all_levels[i].querySelector(".level-title").value;
        const min_percent = all_levels[i].querySelector(".min-percent").value;
        const URL = all_levels[i].querySelector(".level-URL").value;
        const description = all_levels[i].querySelector(".description").value;

            percents.push(Number(min_percent));
        
        const data_is_valid = checkStringLength(level_title, 10) && isValidURL(URL) && isBetween0And100(min_percent) && checkStringLength(description, 30);
        if(data_is_valid){
            new_quizz.levels.push({
                title: level_title,
                image: URL,
                text: description,
                minValue: Number(min_percent)
            });

            validOnes++;
            
        }
    }

    console.log(validOnes, percents)

    if(validOnes === all_levels.length && atLeastOneZero(percents)){
        sendQuizzToServer();
    }else{
        alert("Algo está errado! Verifique os dados.");
    }

}


function sendQuizzToServer(){
    axios.post(`${quizz_url}quizzes`, new_quizz)
        .then(finishQuizz)
        .catch(console.log)
}

function finishQuizz(object){
    console.log(object);
    addLocalQuizzID(object.data.id);


    axios.get(`${quizz_url}quizzes/${object.data.id}`)
        .then(showCreatedQuizz);

    
}

function showCreatedQuizz(object){
    main.innerHTML = `<div class="forms-container finish">
                            <h3>Seu quizz está pronto!</h3>
                            <div class="quizz-finished">
                                <img src=${object.data.image}>
                                <span>${object.data.title}</span>
                            </div>        
                            <button>Acessar Quizz</button>
                            <p>Voltar pra home</p>
                        </div>`
}