"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeIntoGame = void 0;
function linescoreFrom(data) {
    if ('liveData' in data) {
        return data.liveData.linescore;
    }
    else {
        return data.linescore;
    }
}
function getTimeIntoGame(game) {
    let linescore;
    if ('period' in game) {
        linescore = {
            currentPeriod: game.period,
            currentPeriodTimeRemaining: game.periodTimeRemaining,
        };
    }
    else {
        linescore = linescoreFrom(game);
    }
    let secondsIntoGame = 0;
    secondsIntoGame += linescore.currentPeriod * 20 * 60;
    const [minutes, seconds] = linescore.currentPeriodTimeRemaining.split(':');
    if (minutes && seconds) {
        secondsIntoGame -= parseInt(seconds, 10);
        secondsIntoGame -= parseInt(minutes, 10) * 60;
    }
    return secondsIntoGame;
}
exports.getTimeIntoGame = getTimeIntoGame;
//# sourceMappingURL=time-into-game.js.map