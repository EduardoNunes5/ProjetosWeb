import { render } from './renderizador.js'
let $startButton = document.querySelector('#start-button');


$startButton.addEventListener('click', function(){
    this.hidden = true;
})
