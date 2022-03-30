"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_into_game_1 = require("./time-into-game");
describe(time_into_game_1.getTimeIntoGame, () => {
    it('should work for', () => {
        const result = (0, time_into_game_1.getTimeIntoGame)({ period: 1, periodTimeRemaining: '20:00' });
        expect(result).toBe(0);
    });
    it('should work for', () => {
        const result = (0, time_into_game_1.getTimeIntoGame)({ period: 1, periodTimeRemaining: '10:10' });
        expect(result).toBe(590);
    });
    it('should work for', () => {
        const result = (0, time_into_game_1.getTimeIntoGame)({ period: 1, periodTimeRemaining: '18:20' });
        expect(result).toBe(100);
    });
    it('should work for', () => {
        const result = (0, time_into_game_1.getTimeIntoGame)({ period: 2, periodTimeRemaining: '18:20' });
        expect(result).toBe(1300);
    });
    it('should work for', () => {
        const result = (0, time_into_game_1.getTimeIntoGame)({ period: 5, periodTimeRemaining: '18:20' });
        expect(result).toBe(4900);
    });
});
//# sourceMappingURL=time-into-game.test.js.map