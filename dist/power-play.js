"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerPlay = void 0;
class PowerPlay {
    constructor(playIndex, teamId, startSeconds, expectedDurationSeconds) {
        this.playIndex = playIndex;
        this.teamId = teamId;
        this.startSeconds = startSeconds;
        this.expectedDurationSeconds = expectedDurationSeconds;
    }
    get expectedEndSeconds() {
        return this.startSeconds + this.expectedDurationSeconds;
    }
    get actualEndSeconds() {
        if (this.actualDurationInSeconds) {
            return this.startSeconds + this.actualDurationInSeconds;
        }
    }
    set actualEndSeconds(newVal) {
        if (newVal) {
            this.actualDurationInSeconds = newVal - this.startSeconds;
        }
        else {
            this.actualDurationInSeconds = undefined;
        }
    }
    isAfterExpectedDuration(timeInSeconds) {
        return timeInSeconds > this.expectedEndSeconds;
    }
}
exports.PowerPlay = PowerPlay;
//# sourceMappingURL=power-play.js.map