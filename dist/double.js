"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Double_value1, _Double_value2;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Double = void 0;
class Double {
    constructor(seed) {
        _Double_value1.set(this, void 0);
        _Double_value2.set(this, void 0);
        seed === null || seed === void 0 ? void 0 : seed.forEach((val) => this.add(val));
    }
    add(val) {
        if (__classPrivateFieldGet(this, _Double_value1, "f") === val) {
            return;
        }
        else if (__classPrivateFieldGet(this, _Double_value2, "f") === val) {
            return;
        }
        else if (!__classPrivateFieldGet(this, _Double_value1, "f")) {
            __classPrivateFieldSet(this, _Double_value1, val, "f");
        }
        else if (!__classPrivateFieldGet(this, _Double_value2, "f")) {
            __classPrivateFieldSet(this, _Double_value2, val, "f");
        }
        else {
            throw `trying to add a third value to double (${__classPrivateFieldGet(this, _Double_value1, "f")}, ${__classPrivateFieldGet(this, _Double_value2, "f")}) + ${val}`;
        }
    }
    has(val) {
        if (__classPrivateFieldGet(this, _Double_value1, "f") === val) {
            return true;
        }
        else if (__classPrivateFieldGet(this, _Double_value2, "f") === val) {
            return true;
        }
        else {
            return false;
        }
    }
    other(than) {
        if (!this.has(than)) {
            throw `set doesn't have ${than}`;
        }
        if (than === __classPrivateFieldGet(this, _Double_value2, "f")) {
            return __classPrivateFieldGet(this, _Double_value1, "f");
        }
        else if (than === __classPrivateFieldGet(this, _Double_value1, "f")) {
            return __classPrivateFieldGet(this, _Double_value2, "f");
        }
        else {
            throw 'Cannot switch if it doesnt equal one of the values';
        }
    }
    get isComplete() {
        return !!__classPrivateFieldGet(this, _Double_value1, "f") && !!__classPrivateFieldGet(this, _Double_value2, "f");
    }
    get values() {
        return [__classPrivateFieldGet(this, _Double_value1, "f"), __classPrivateFieldGet(this, _Double_value2, "f")];
    }
}
exports.Double = Double;
_Double_value1 = new WeakMap(), _Double_value2 = new WeakMap();
//# sourceMappingURL=double.js.map