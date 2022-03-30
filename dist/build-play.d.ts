import { GameLiveDataPlay } from './game-data';
export declare const teamIds: [number, number];
export declare function resetIndex(): void;
export declare function buildGoalPlay({ period, periodTimeRemaining, homeAway, }: {
    period: number;
    periodTimeRemaining: string;
    homeAway: 'home' | 'away';
}): GameLiveDataPlay;
export declare function buildPenaltyPlay({ period, periodTimeRemaining, homeAway, penaltyMinutes, }: {
    period: number;
    periodTimeRemaining: string;
    homeAway: 'home' | 'away';
    penaltyMinutes: number;
}): GameLiveDataPlay;
export declare function buildPeriodEndPlay({ period, }: {
    period: number;
}): GameLiveDataPlay;
export declare function buildPeriodStartPlay({ period, }: {
    period: number;
}): GameLiveDataPlay;
export declare function buildGameStartPlay(): GameLiveDataPlay;
export declare function buildGameEndPlay(): GameLiveDataPlay;
export declare type PlayTemplate = `${number}:${number} ${string}` | 'per' | 's' | 'e';
export declare function buildPlays(playTemplates: PlayTemplate[]): GameLiveDataPlay[];
//# sourceMappingURL=build-play.d.ts.map