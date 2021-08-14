let quizz = {
	title: "",
	image: "",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		}
	]
}

let questionsNumber = 0;
let levelsNumber = 0;


function createQuestions(){
    let basicScreen = document.querySelector(".basics");
    let questionScreen = document.querySelector(".ask");
    basicScreen.classList.add("some");
    questionScreen.classList.remove("some");
    quizz.title = document.querySelector(".title").value;
    quizz.image = document.querySelector(".URL").value;
    questionsNumber = document.querySelector(".questions-number").value;
    levelsNumber = document.querySelector(".levels-number").value
    
    questionScreen.innerHTML += `<h3>Crie suas perguntas</h3>`;

    for(let i=0; i < questionsNumber; i++){

        if(i === 0){
            questionScreen.innerHTML += `<div class="question${i+1}">
        <section class="content questions showing-question">
            <h4>Pergunta ${i+1}</h4>
            <article class="question">
                <input type="text" placeholder="Texto da pergunta">
                <input type="text" placeholder="Cor de fundo da pergunta">
            </article>
            <h4>Resposta correta</h4>
            <article class="question right-answer">
                <input type="text" placeholder="Resposta correta">
                <input type="text" placeholder="URL da imagem">
            </article>
            <h4>Respostas incorretas</h4>
            <article class="question wrong-answer">
                <input type="text" placeholder="Resposta incorreta 1">
                <input type="text" placeholder="URL da imagem">
            </article>
            <article class="question wrong-answer">
                <input type="text" placeholder="Resposta incorreta 2">
                <input type="text" placeholder="URL da imagem 2">
            </article>
            <article class="question wrong-answer">
                <input type="text" placeholder="Resposta incorreta 3">
                <input type="text" placeholder="URL da imagem 3">
            </article>
        </section>
        
        <section class="content hiden some">
            <h4>Pergunta ${i+1}</h4>
            <ion-icon name="create-outline" onclick="showQuestion(this)"></ion-icon>
        </section>
        </div>`;
        }else {
            questionScreen.innerHTML += `<div class="question${i+1}">
            <section class="content questions some">
                <h4>Pergunta ${i+1}</h4>
                <article class="question">
                    <input type="text" placeholder="Texto da pergunta">
                    <input type="text" placeholder="Cor de fundo da pergunta">
                </article>
                <h4>Resposta correta</h4>
                <article class="question right-answer">
                    <input type="text" placeholder="Resposta correta">
                    <input type="text" placeholder="URL da imagem">
                </article>
                <h4>Respostas incorretas</h4>
                <article class="question wrong-answer">
                    <input type="text" placeholder="Resposta incorreta 1">
                    <input type="text" placeholder="URL da imagem">
                </article>
                <article class="question wrong-answer">
                    <input type="text" placeholder="Resposta incorreta 2">
                    <input type="text" placeholder="URL da imagem 2">
                </article>
                <article class="question wrong-answer">
                    <input type="text" placeholder="Resposta incorreta 3">
                    <input type="text" placeholder="URL da imagem 3">
                </article>
            </section>
            
            <section class="content hiden">
                <h4>Pergunta ${i+1}</h4>
                <ion-icon name="create-outline" onclick="showQuestion(this)"></ion-icon>
            </section>
            </div>`;
        }
        
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


function createLevels(){
    let questionScreen = document.querySelector(".ask");
    let levelScreen = document.querySelector(".levels");
    questionScreen.classList.add("some");
    levelScreen.classList.remove("some");


    levelScreen.innerHTML += `<h3>Agora, decida os níveis</h3>`;

    for(let i=0; i<levelsNumber; i++){
        if(i === 0){
            levelScreen.innerHTML += `<div class="level${i+1}">
            <section class="content questions showing-level">
            <h3>Nível ${i+1}</h3>
            <input type="text" placeholder="Título do nível">
            <input type="text" placeholder="% de acerto mínima">
            <input type="text" placeholder="URL da imagem do nível">
            <input type="text" placeholder="Descrição do nível">
        </section>

        <section class="content hiden some">
            <h4>Nível ${i+1}</h4>
            <ion-icon name="create-outline" onclick="showLevel(this)"></ion-icon>
        </section>
        </div>`;
        }else{
            levelScreen.innerHTML += `<div class="level${i+1}">
            <section class="content questions some">
            <h3>Nível ${i+1}</h3>
            <input type="text" placeholder="Título do nível">
            <input type="text" placeholder="% de acerto mínima">
            <input type="text" placeholder="URL da imagem do nível">
            <input type="text" placeholder="Descrição do nível">
        </section>

        <section class="content hiden">
            <h4>Nível ${i+1}</h4>
            <ion-icon name="create-outline" onclick="showLevel(this)"></ion-icon>
        </section>
        </div>`;
        }
    }

    levelScreen.innerHTML += `<button onclick="finishQuizz()">Finalizar Quizz</button>`
}

function finishQuizz(){
    let levelScreen = document.querySelector(".levels");
    let finishScreen = document.querySelector(".finish");
    levelScreen.classList.add("some");
    finishScreen.classList.remove("some");
}




function hasTenChar(string){
    if(!string){
        return false;
    }
    else{
        console.log(string);
        return string.length >= 10;
    }
}

function hasThirtyChar(string){
    if(!string){
        return false;
    }
    else{
        console.log(string);
        return string.length >= 30;
    }
}

function isBetween0And100(string){
    const number = Number(string);
    if(number >= 0 && number <= 100){
        return true
    }else{
        return false;
    }
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
        
        const data_is_valid = hasTenChar(level_title) && isValidURL(URL) && isBetween0And100(min_percent) && hasThirtyChar(description);
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

    if(validOnes === all_levels.length && atLeastOneZero(percents)){
        finishQuizz();
    }else{
        alert("Algo está errado! Verifique os dados.");
    }

    console.log(new_quizz.levels);
}


function finishQuizz(){
    console.log("yeeeeyyy");
}