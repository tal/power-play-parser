import { GameLiveDataPlay } from './game-data';
import { PowerPlay } from './power-play';
export declare type ParsePowerPlaysParams = {
    teamIds?: [number, number];
};
export declare function parsePowerPlays(plays: GameLiveDataPlay[], params?: ParsePowerPlaysParams): {
    powerPlays: PowerPlay[];
};
//# sourceMappingURL=pp-parser.d.ts.map