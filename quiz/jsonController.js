

export class JsonController{
    constructor(perguntas){
        this.maxScore = perguntas.length;
        this.json = perguntas;
        this.currentIndex;
    }

    static load(){
        return fetch('https://raw.githubusercontent.com/EduardoNunes5/ProjetosWeb/master/quiz/perguntas.json')
        .then(response => response.json())
        .then(data => {
            return new this(data.perguntas);
        });
    }

    generateQuestion(){
        this.currentIndex = Math.trunc(Math.random() * this.json.length);
        return this.json[this.currentIndex];
    }

    removeQuestion(){
        this.json.splice(this.currentIndex,1);
    }

    isEmpty(){
        return this.json.length === 0;
    }
}
