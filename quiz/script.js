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
            answersHandler(question.respostas, question.respostaCorreta)
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


function answersHandler(questionAnswers, correctAnswer){
    questionAnswers.forEach(answer =>{
        const li = document.createElement('li');
        li.addEventListener('click',() => checkAnswer(event, answer, correctAnswer))
        li.innerHTML = `${answer}`;
        $ul.appendChild(li);
        render(answer, li);
    })
}


function checkAnswer(event, answer, correctAnswer){
        if(answer === correctAnswer){
            event.target.style.backgroundColor = 'green';
            client.addScore();
        }
        else{
            event.target.style.backgroundColor = 'red';
        }

        $button.hidden = false;
}


questionsHandler();
$button.addEventListener('click', questionsHandler);
