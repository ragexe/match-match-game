import {Card} from './Card.js';

export class MatchGame{
    constructor(callback, context, difficulty = 8){
        this.difficulty = difficulty;
        this.cardPack = [];
        this.isFinished = false;
        this.selectedIndex = null;
        this.startTime = null;
        this.callbackRender = callback;
        this.openedCardLimit = 2;
        this.context = context;
        this.result = null;
        this.timer = null;
        this.isStoped = false;
        this.session = Math.random().toString(36).substr(2, 8);
    }

    start() {
        this.init();
        this.startTime = new Date().getTime();
    }

    init(){
        for (let i = 0; i < this.difficulty / 2; i++) {
            this.cardPack.push(new Card(i));
            this.cardPack.push(new Card(i));
        }
        this.shuffleCardPack();
    }

    turn(index){
        let currentCard = this.cardPack[index];

        if (this.isStoped || currentCard.isDisclosed()){
            return;
        }

        if(!this.isFinished && !this.isFrozen()){
            this.openCard(currentCard);
            this.callbackRender(this.cardPack);

            if(this.selectedIndex == null){
                this.selectedIndex = +index;
            } else if (this.selectedIndex === +index){
                setTimeout(() => this.hideAll(), 100);
                this.selectedIndex = null;
            } else if (this.cardPack[this.selectedIndex] !== null && this.cardPack[this.selectedIndex]._id === currentCard._id){
                currentCard.disclose();
                this.cardPack[this.selectedIndex].disclose();
                this.selectedIndex = null;
                this.checkIsFinished();
            } else {
                this.selectedIndex = null;
                setTimeout(() => this.hideAll(), 900);
            }
            this.updateView();
        }
    }

    shuffleCardPack() {
        for (let i = this.cardPack.length - 1; i >= 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let itemAtIndex = this.cardPack[randomIndex];
            this.cardPack[randomIndex] = this.cardPack[i];
            this.cardPack[i] = itemAtIndex;
        }
    }

    openCard(card){
        if (!card.isDisclosed() && !card.isOpened()){
            card.open();
            this.updateView();
        }
    }

    hideAll(){
        this.cardPack.forEach((element) => {if(element.isOpened() && !element.isDisclosed()) {element.hide()}});
        this.selectedIndex = null;
        this.callbackRender(this.cardPack);
        this.updateView();
    }

    checkIsFinished(){
        for (let i = 0; i < this.cardPack.length; i++) {
            if (!this.cardPack[i].isDisclosed()) {
                return false;
            }
        }
        this.isFinished = true;
        this.stop();
        return true;
    }

    stop(){
        this.isStoped = true;
        this.result = {
            timeSpent: new Date().getTime() - this.startTime,
            difficulty: this.difficulty,
            isFinished: this.isFinished,
            sessionId: this.session.toUpperCase()
        };

        for (let i = 0; i < this.cardPack.length; i++) {
            this.cardPack[i].disclose();
        }
        this.callbackRender(this.cardPack);

        let event = new Event('gameStopped');
        this.updateView();
        setTimeout(() => this.context.dispatchEvent(event), 300);
    }

    getResult(){
        return this.result;
    }

    isFrozen(){
        let counter = 0;
        for (let i = 0; i < this.cardPack.length; i++) {
            if (this.cardPack[i].isOpened() && !this.cardPack[i].isDisclosed()) {
                counter++;
            }
            if (counter >= this.openedCardLimit){
                return true;
            }
        }
        return false;
    }
    
    updateView(){
        setTimeout(() => this.callbackRender(this.cardPack), 1000);
    }
}
