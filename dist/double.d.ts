export declare class Double<T = string | number> {
    #private;
    constructor(seed?: T[]);
    add(val: T): void;
    has(val: T): boolean;
    other(than: T): T;
    get isComplete(): boolean;
    get values(): readonly [T | undefined, T | undefined];
}
//# sourceMappingURL=double.d.ts.map