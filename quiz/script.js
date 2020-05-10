import { render, clear } from './renderizador.js'
import { JsonController } from './jsonController.js'
import { Client } from './client.js'


let client = new Client();
let $ul = document.querySelector('#lista-perguntas');
let $pergunta = document.querySelector('#pergunta');
let $button = document.querySelector('button');
let $points = document.querySelector('#points');
let $finalResult = document.querySelector('#result');
let $score = document.querySelector('#user-score');
let $maxScore = document.querySelector('#max-score');
var questionController = JsonController.load();

function questionsHandler(){

    questionController.then(controller => {
        var question = controller.generateQuestion();
        if(question){
            render(question.pergunta, $pergunta);
            answersRender(question.respostas)
            console.log(question.respostaCorreta)
            answersEvents(document.querySelectorAll("li"),question.respostaCorreta);

        }
        if(controller.isEmpty()){
            $button.hidden = true;
            $maxScore.innerText = controller.maxScore;
            $score.innerText = client.score;
            $finalResult.hidden = false;
            clear($ul);
            clear($pergunta);

        }
        controller.removeQuestion();
    })

}

function answersRender(questionAnswers){
    questionAnswers.forEach(answer =>{
        const li = document.createElement('li');
        li.innerHTML = `${answer}`;
        $ul.appendChild(li);
        $button.hidden = true;
        render(answer, li);
    })
}

let checker
function answersEvents(answers, correctAnswer){
    checker = checkAnswer.bind(correctAnswer);
    answers.forEach(answer =>{
        answer.addEventListener('click', checker, false)
    })
}

let checkAnswer = function(event){
    console.log(this)
    if(event.target.innerHTML === this){
        event.target.style.color = 'green';
        client.addScore();
    }
    else{
        event.target.style.color = 'red';
    }
    $button.hidden = false;
    stopClicks();

}

function stopClicks(){
    var lis = document.querySelectorAll('li');
    lis.forEach((item, i) => {
        item.removeEventListener('click',checker, false);

    });

}

$button.addEventListener('click', function(){
    clear($ul);
    clear($pergunta);
    questionsHandler();
});

questionsHandler();
