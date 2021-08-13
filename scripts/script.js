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
    main.innerHTML = `<div class = list-title user-quizzes'><h1>Seus Quizzes</h1>
                        <ion-icon class= "icon" name="add-circle"></ion-icon>
                        </div>
                        <ul class="user-quizzes"></ul>
                        <h1 class="list-title">Todos os Quizzes</h1>
                        <ul class="other-quizzes"></ul`;

    const user_quizzes_list = document.querySelector(".user-quizzes");
    const other_quizzes_list = document.querySelector(".other-quizzes");
    if(local_user_quizzes.length === 0){
        user_quizzes_list.innerHTML = `<li class="no-user-quizzes">
                                            <spam>Você não criou nenhum quizz ainda :(</spam>
                                            <button>Criar Quizz</button>
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

function errorMessage(error){
    console.log(error.response.status);
}