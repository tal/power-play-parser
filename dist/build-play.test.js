"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_play_1 = require("./build-play");
describe(build_play_1.buildPlays, () => {
    it('test.todo', () => {
        const plays = (0, build_play_1.buildPlays)(['10:00 p h 2', 'per', '10:00 p h 2']);
        expect(plays.length).toBe(4);
        expect(plays[0].about.period).toEqual(1);
        expect(plays[0].about.periodTimeRemaining).toEqual('10:00');
        expect(plays[3].about.period).toEqual(2);
        expect(plays[3].about.periodTimeRemaining).toEqual('10:00');
    });
    it('test.todo2', () => {
        const plays = (0, build_play_1.buildPlays)(['s', '10:00 p h 2', 'per', '10:00 p h 2', 'e']);
        expect(plays.length).toBe(6);
        expect(plays[1].about.period).toEqual(1);
        expect(plays[1].about.periodTimeRemaining).toEqual('10:00');
        expect(plays[4].about.period).toEqual(2);
        expect(plays[4].about.periodTimeRemaining).toEqual('10:00');
    });
    it('test.todo2', () => {
        var _a;
        const [play] = (0, build_play_1.buildPlays)(['10:00 p h 2']);
        expect(play.result.eventTypeId).toEqual('PENALTY');
        expect((_a = play.team) === null || _a === void 0 ? void 0 : _a.id).toEqual(7);
        expect(play.result.penaltyMinutes).toEqual(2);
    });
    it('test.todo2', () => {
        var _a;
        const [play] = (0, build_play_1.buildPlays)(['10:00 p a 4']);
        expect(play.result.eventTypeId).toEqual('PENALTY');
        expect((_a = play.team) === null || _a === void 0 ? void 0 : _a.id).toEqual(21);
        expect(play.result.penaltyMinutes).toEqual(4);
    });
    it('test.todo2', () => {
        var _a;
        const [play] = (0, build_play_1.buildPlays)(['10:00 g h']);
        expect(play.result.eventTypeId).toEqual('GOAL');
        expect((_a = play.team) === null || _a === void 0 ? void 0 : _a.id).toEqual(7);
    });
    it('test.todo2', () => {
        var _a;
        const [play] = (0, build_play_1.buildPlays)(['10:00 g a']);
        expect(play.result.eventTypeId).toEqual('GOAL');
        expect((_a = play.team) === null || _a === void 0 ? void 0 : _a.id).toEqual(21);
    });
});
//# sourceMappingURL=build-play.test.js.map