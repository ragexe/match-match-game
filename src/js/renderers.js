import {millisToMinutesAndSeconds} from "./helper.js"

    // Update view
export function update(cardPack) {
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
export function render() {
    let html = '';

    for (let i = 0; i < game.cardPack.length; i++) {
        html += `<div class="flip-container"><div id="_card-${i}" class="game-element flipper${game.cardPack[i].isDisclosed() ? ` disabled` : ``}">
                    <div class="front default"></div>
                    <div class="back default${game.cardPack[i].isOpened() ? ` opened-${game.cardPack[i]._id}` : ``}"></div>
                </div></div>`;
    }
    document.getElementById('_game-field').innerHTML = html;
}

export function renderTimer() {
    let html;
    let time = game.isFinished ? 0 : new Date().getTime() -  game.startTime;
    html = millisToMinutesAndSeconds(time);
    document.getElementById('timer_inp').innerHTML = html;
}