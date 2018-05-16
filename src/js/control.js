import {MatchGame} from './classes/MatchGame.js';
import {extractIndex} from './helper.js';
import {update} from "./renderers.js";
import {render} from "./renderers.js";
import {renderTimer} from "./renderers.js";
import {millisToMinutesAndSeconds} from "./helper"

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
    window.game = new MatchGame(update, document.getElementById('_game-field'), document.getElementById('_game-difficulty-select').value);
    window.game.start();
    document.getElementById('_game-skirt-select').removeAttribute('disabled');
    document.getElementById('_stop-game-btn').classList.remove('hidden');
    window.game.timer = setInterval(() => renderTimer(), 500);
    window.game.skirt = document.getElementById('_game-skirt-select').value;
    render();
});

document.getElementById('_stop-game-btn').addEventListener('click', () => {
    window.game.stop();
});


document.getElementById('_game-field').addEventListener('click', (event) => {
    let target = event.target.parentNode ? event.target.parentNode : event.srcElement;
    let index = extractIndex(target);
    renderTimer()
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
        It tooks you ${millisToMinutesAndSeconds(window.game.getResult().timeSpent)} minutes with difficulty ${window.game.getResult().difficulty} cards. 
        Game session: ${window.game.getResult().sessionId}.` :
            `GAME STOPPED
        Game session: ${window.game.getResult().sessionId}.`))
    }, 100);
});



