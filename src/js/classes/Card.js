export class Card {
    constructor(id){
        this._disclosed = false;
        this._id = id;
        this._opened = false;
    }

    disclose(){
        this._disclosed = true;
    }

    open(){
        this._opened = true;
    }

    hide(){
        this._opened = false;
    }

    isDisclosed(){
        return this._disclosed;
    }

    isOpened(){
        return this._opened;
    }
}