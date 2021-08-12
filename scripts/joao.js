const URL_SERVER_QUIZZES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes";

let promise = axios.get(URL_SERVER_QUIZZES);
promise.then(showQuizz);

function showQuizz(response){
    console.log(response);
    console.log(response.data);

}