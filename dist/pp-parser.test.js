"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_play_1 = require("./build-play");
const pp_parser_1 = require("./pp-parser");
function parsePowerPlays(templates) {
    const plays = (0, build_play_1.buildPlays)(['s', ...templates, 'e']);
    return (0, pp_parser_1.parsePowerPlays)(plays, { teamIds: build_play_1.teamIds });
}
describe('parsePowerPlays', () => {
    it('should return empty', () => {
        const plays = [];
        const pp = parsePowerPlays(plays);
        expect(pp.powerPlays.length).toBe(0);
    });
    it('should have one complete pp', () => {
        const pp = parsePowerPlays(['10:00 p a 2', '05:00 g a']);
        expect(pp.powerPlays.length).toBe(1);
        expect(pp.powerPlays[0].actualDurationInSeconds).toBe(120);
    });
    it('should have two complete pps', () => {
        const pp = parsePowerPlays([
            '10:00 p a 2',
            '05:00 g a',
            'per',
            '10:00 p a 2',
        ]);
        expect(pp.powerPlays.length).toBe(2);
        expect(pp.powerPlays[0].actualDurationInSeconds).toBe(120);
    });
    it('should have one partial pp', () => {
        const pp = parsePowerPlays(['10:00 p h 2', '09:00 g a']);
        expect(pp.powerPlays.length).toBe(1);
        expect(pp.powerPlays[0].actualDurationInSeconds).toBe(60);
    });
    it('is one 5 on 3', () => {
        const pp = parsePowerPlays(['10:10 p h 2', '10:00 p h 2']);
        expect(pp.powerPlays.length).toBe(2);
        expect(pp.powerPlays[0].actualDurationInSeconds).toBe(120);
        expect(pp.powerPlays[1].actualDurationInSeconds).toBe(120);
    });
    it('should error if out of order', () => {
        expect(() => parsePowerPlays(['10:00 p h 2', '10:10 p h 2'])).toThrowErrorMatchingSnapshot();
    });
    it('shortened pp', () => {
        const pp = parsePowerPlays(['10:10 p h 2', '10:00 p a 2']);
        expect(pp.powerPlays.length).toBe(2);
        const pp1 = pp.powerPlays[0];
        const pp2 = pp.powerPlays[1];
        expect(pp1.actualDurationInSeconds).toBe(10);
        expect(pp2.actualDurationInSeconds).toBe(10);
        expect(pp2.startSeconds).toBe(pp1.actualEndSeconds + 120 - 10);
    });
    it('3v5 with goal', () => {
        const pp = parsePowerPlays(['10:20 p a 2', '10:10 p a 2', '10:00 g h']);
        expect(pp.powerPlays.length).toBe(2);
        const pp1 = pp.powerPlays[0];
        const pp2 = pp.powerPlays[1];
        expect(pp1.actualDurationInSeconds).toBe(20);
        expect(pp2.actualDurationInSeconds).toBe(120);
        expect(pp2.startSeconds).toEqual(600 - 10);
    });
    describe('two offsetting pps', () => {
        let pp;
        beforeEach(() => {
            pp = parsePowerPlays(['10:00 p a 2', '10:00 p h 2']);
        });
        it('should have correct count', () => {
            expect(pp.powerPlays.length).toBe(0);
        });
    });
    describe('two offsetting pps and a goal', () => {
        let pp;
        beforeEach(() => {
            pp = parsePowerPlays(['10:00 p a 2', '10:00 p h 2', '09:30 g h']);
        });
        it('should have correct count', () => {
            expect(pp.powerPlays.length).toBe(0);
        });
    });
    it('4min', () => {
        const pp = parsePowerPlays(['10:10 p a 4']);
        expect(pp.powerPlays.length).toBe(1);
        expect(pp.powerPlays[0].actualDurationInSeconds).toBe(60 * 4);
    });
    it('4min with early goal', () => {
        const pp = parsePowerPlays(['10:10 p a 4', '10:00 g h']);
        expect(pp.powerPlays.length).toBe(1);
        expect(pp.powerPlays[0].actualDurationInSeconds).toBe(120 + 10);
    });
    it('4min with early goal', () => {
        const pp = parsePowerPlays(['10:00 p a 4', '08:01 g h']);
        expect(pp.powerPlays.length).toBe(1);
        expect(pp.powerPlays[0].actualDurationInSeconds).toBe(240 - 1);
    });
    it('4min with late goal', () => {
        const pp = parsePowerPlays(['10:00 p a 4', '07:59 g h']);
        expect(pp.powerPlays.length).toBe(1);
        expect(pp.powerPlays[0].actualDurationInSeconds).toBe(120 + 1);
    });
    describe('two offsetting pps then another pp', () => {
        let pp;
        let pp1;
        let pp2;
        beforeEach(() => {
            pp = parsePowerPlays(['10:00 p a 2', '10:00 p h 2', '09:30 p h 2']);
            pp1 = pp.powerPlays[0];
            pp2 = pp.powerPlays[1];
        });
        it('should have correct count', () => {
            expect(pp.powerPlays.length).toBe(1);
        });
        it('should have correct duration', () => {
            expect(pp1 === null || pp1 === void 0 ? void 0 : pp1.actualDurationInSeconds).toBe(120);
        });
    });
    describe('power plays across boundaries', () => {
        let pp;
        let pp1;
        let pp2;
        beforeEach(() => {
            pp = parsePowerPlays(['01:00 p a 2', 'per', '19:59 g h']);
            pp1 = pp.powerPlays[0];
            pp2 = pp.powerPlays[1];
        });
        it('should have correct count', () => {
            expect(pp.powerPlays.length).toBe(1);
        });
        it('should have correct duration', () => {
            expect(pp1 === null || pp1 === void 0 ? void 0 : pp1.actualDurationInSeconds).toBe(61);
        });
    });
    describe('end of game', () => {
        let pp;
        let pp1;
        let pp2;
        beforeEach(() => {
            pp = parsePowerPlays(['10:00 p a 4', '09:00 p h 2']);
            pp1 = pp.powerPlays[0];
            pp2 = pp.powerPlays[1];
        });
        it('should have correct count', () => {
            expect(pp.powerPlays.length).toBe(2);
        });
        it('should have correct duration', () => {
            expect(pp1 === null || pp1 === void 0 ? void 0 : pp1.actualDurationInSeconds).toBe(60);
        });
        it('should have correct team', () => {
            expect(pp1 === null || pp1 === void 0 ? void 0 : pp1.teamId).toBe(21);
        });
        it('should have correct duration', () => {
            expect(pp2 === null || pp2 === void 0 ? void 0 : pp2.actualDurationInSeconds).toBe(60);
        });
        it('should have correct team', () => {
            expect(pp2 === null || pp2 === void 0 ? void 0 : pp2.teamId).toBe(21);
        });
    });
    describe('end of game', () => {
        let pp;
        let pp1;
        let pp2;
        beforeEach(() => {
            pp = parsePowerPlays([
                // '10:10 g a',
                // '10:00 g h',
                'per',
                'per',
                '01:00 p a 2',
            ]);
            pp1 = pp.powerPlays[0];
            pp2 = pp.powerPlays[1];
        });
        it('should have correct count', () => {
            expect(pp.powerPlays.length).toBe(1);
        });
        it('should have correct duration', () => {
            expect(pp1 === null || pp1 === void 0 ? void 0 : pp1.actualDurationInSeconds).toBe(60);
        });
    });
});
//# sourceMappingURL=pp-parser.test.js.map