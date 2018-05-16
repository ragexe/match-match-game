/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = update;
/* harmony export (immutable) */ __webpack_exports__["a"] = render;
/* harmony export (immutable) */ __webpack_exports__["b"] = renderTimer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_js__ = __webpack_require__(1);


    // Update view
function update(cardPack) {
    for (let i = 0; i < game.cardPack.length; i++) {
        let currentElement = document.getElementById(`_card-${i}`);
        if (cardPack[i].isOpened()){
            currentElement.classList.add("flipped");
            currentElement.children[1].classList.add(`opened-${game.cardPack[i]._id}`);
        } else {
            currentElement.classList.remove("flipped");
            currentElement.children[1].classList.remove(`opened-${game.cardPack[i]._id}`);
        }

        if (cardPack[i].isDisclosed()){
            currentElement.classList.add("disabled");
            currentElement.children[0].classList.add(`opened-${game.cardPack[i]._id}`);
        } else {
            currentElement.classList.remove("disabled");
            currentElement.children[0].classList.remove(`opened-${game.cardPack[i]._id}`);
        }
    }
}
    // Init render
function render() {
    let html = '';

    for (let i = 0; i < game.cardPack.length; i++) {
        html += `<div class="flip-container"><div id="_card-${i}" class="game-element flipper${game.cardPack[i].isDisclosed() ? ` disabled` : ``}">
                    <div class="front default"></div>
                    <div class="back default${game.cardPack[i].isOpened() ? ` opened-${game.cardPack[i]._id}` : ``}"></div>
                </div></div>`;
    }
    document.getElementById('_game-field').innerHTML = html;
}

function renderTimer() {
    let html;
    let time = game.isFinished ? 0 : new Date().getTime() -  game.startTime;
    html = Object(__WEBPACK_IMPORTED_MODULE_0__helper_js__["b" /* millisToMinutesAndSeconds */])(time);
    document.getElementById('timer_inp').innerHTML = html;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extractIndex;
/* harmony export (immutable) */ __webpack_exports__["b"] = millisToMinutesAndSeconds;
function extractIndex(element) {
    let idAttribute = element.getAttribute('id');
    let regexp = /_card-\d/;

    if (regexp.test(idAttribute)) {
        return (idAttribute.match(/\d+/g)[0]);
    } else {    }
}

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_MatchGame_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderers_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(1);







document.getElementById('_game-difficulty-select').addEventListener('change', () => {
    document.getElementById('_difficulty-badge').innerHTML = document.getElementById('_game-difficulty-select').value;
});

document.getElementById('_game-skirt-select').addEventListener('change', () => {
    let values = Array.from(document.getElementsByClassName(window.game.skirt));
    // console.log(document.getElementsByClassName(window.game.skirt).length);
    for (let i = 0; i < values.length; i++) {
        values[i].classList.remove(window.game.skirt);
        values[i].classList.add(document.getElementById('_game-skirt-select').value);
    }
    window.game.skirt = document.getElementById('_game-skirt-select').value;
});

document.getElementById('_new-game-btn').addEventListener('click', () => {
    window.game = new __WEBPACK_IMPORTED_MODULE_0__classes_MatchGame_js__["a" /* MatchGame */](__WEBPACK_IMPORTED_MODULE_2__renderers_js__["c" /* update */], document.getElementById('_game-field'), document.getElementById('_game-difficulty-select').value);
    window.game.start();
    document.getElementById('_game-skirt-select').removeAttribute('disabled');
    document.getElementById('_stop-game-btn').classList.remove('hidden');
    window.game.timer = setInterval(() => Object(__WEBPACK_IMPORTED_MODULE_2__renderers_js__["b" /* renderTimer */])(), 500);
    window.game.skirt = document.getElementById('_game-skirt-select').value;
    Object(__WEBPACK_IMPORTED_MODULE_2__renderers_js__["a" /* render */])();
});

document.getElementById('_stop-game-btn').addEventListener('click', () => {
    window.game.stop();
});


document.getElementById('_game-field').addEventListener('click', (event) => {
    let target = event.target.parentNode ? event.target.parentNode : event.srcElement;
    let index = Object(__WEBPACK_IMPORTED_MODULE_1__helper_js__["a" /* extractIndex */])(target);
    Object(__WEBPACK_IMPORTED_MODULE_2__renderers_js__["b" /* renderTimer */])()
    if(index) {
        window.game.turn(index)
    }
});

document.getElementById('_game-field').addEventListener('gameStopped', () => {
    document.getElementById('_game-skirt-select').setAttribute('disabled', 'true');
    document.getElementById('_stop-game-btn').classList.add('hidden');
    clearInterval(window.game.timer);
    setTimeout(() => {
        alert((window.game.getResult().isFinished ? `YOU WIN! 
        It tooks you ${Object(__WEBPACK_IMPORTED_MODULE_3__helper__["b" /* millisToMinutesAndSeconds */])(window.game.getResult().timeSpent)} minutes with difficulty ${window.game.getResult().difficulty} cards. 
        Game session: ${window.game.getResult().sessionId}.` :
            `GAME STOPPED
        Game session: ${window.game.getResult().sessionId}.`))
    }, 100);
});





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Card_js__ = __webpack_require__(4);


class MatchGame{
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
            this.cardPack.push(new __WEBPACK_IMPORTED_MODULE_0__Card_js__["a" /* Card */](i));
            this.cardPack.push(new __WEBPACK_IMPORTED_MODULE_0__Card_js__["a" /* Card */](i));
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
/* harmony export (immutable) */ __webpack_exports__["a"] = MatchGame;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Card {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Card;


/***/ })
/******/ ]);