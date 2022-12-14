export class Game {
    isGameActive = false;

    constructor() {};

    start() {
        console.log('WYŚCIG ROZPOCZĘTY!!!')
        this.isGameActive = true;
    };

    end() {
        console.log('WYŚCIG ZAKOŃCZONY!!!')
        this.isGameActive = false;
    };
}