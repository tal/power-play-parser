"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const double_1 = require("./double");
describe(double_1.Double, () => {
    it('should add two values', () => {
        const d = new double_1.Double();
        d.add('one');
        d.add('two');
        expect(d.has('one')).toBeTruthy();
        expect(d.has('two')).toBeTruthy();
        expect(d.isComplete).toBeTruthy();
    });
    it('should provide other', () => {
        const d = new double_1.Double();
        d.add('one');
        d.add('two');
        expect(d.other('one')).toBe('two');
        expect(d.other('two')).toBe('one');
    });
    it('should have values', () => {
        const d = new double_1.Double();
        d.add('one');
        d.add('two');
        expect(d.values).toEqual(['one', 'two']);
    });
    it('should have one value', () => {
        const d = new double_1.Double();
        d.add('one');
        expect(d.values).toEqual(['one', undefined]);
    });
    it('should have no value', () => {
        const d = new double_1.Double();
        expect(d.values).toEqual([undefined, undefined]);
    });
    it('should add only values', () => {
        const d = new double_1.Double();
        d.add('one');
        d.add('one');
        d.add('two');
        d.add('one');
        d.add('two');
        d.add('two');
        expect(d.has('one')).toBeTruthy();
        expect(d.has('two')).toBeTruthy();
        expect(d.isComplete).toBeTruthy();
    });
    it('should error on third value', () => {
        const d = new double_1.Double();
        d.add('one');
        d.add('two');
        expect(() => {
            d.add('three');
        }).toThrowErrorMatchingSnapshot();
        expect(d.has('one')).toBeTruthy();
        expect(d.has('two')).toBeTruthy();
        expect(d.has('three')).toBeFalsy();
        expect(d.isComplete).toBeTruthy();
    });
    it('should error no other value', () => {
        const d = new double_1.Double();
        d.add('one');
        d.add('two');
        expect(() => {
            d.other('three');
        }).toThrowErrorMatchingSnapshot();
    });
});
//# sourceMappingURL=double.test.js.map