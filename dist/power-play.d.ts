export declare class PowerPlay {
    playIndex: number;
    teamId: number;
    startSeconds: number;
    expectedDurationSeconds: number;
    actualDurationInSeconds?: number;
    constructor(playIndex: number, teamId: number, startSeconds: number, expectedDurationSeconds: number);
    get expectedEndSeconds(): number;
    get actualEndSeconds(): number | undefined;
    set actualEndSeconds(newVal: number | undefined);
    isAfterExpectedDuration(timeInSeconds: number): boolean;
}
//# sourceMappingURL=power-play.d.ts.map