"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePowerPlays = void 0;
const double_1 = require("./double");
const power_play_1 = require("./power-play");
const time_into_game_1 = require("./time-into-game");
function parsePowerPlays(plays, params = {}) {
    var _a;
    const powerPlays = {};
    let teams = new double_1.Double(params.teamIds);
    for (let play of plays) {
        const teamId = (_a = play.team) === null || _a === void 0 ? void 0 : _a.id;
        if (teamId) {
            teams.add(teamId);
        }
        if (teams.isComplete) {
            break;
        }
    }
    const [team1Id, team2Id] = teams.values;
    if (!team1Id || !team2Id) {
        throw `cannot parse plays without both teams`;
    }
    const activePowerPlays = {
        [team1Id]: [],
        [team2Id]: [],
    };
    function removePowerPlaysThatHaveExpired(by) {
        function filterOutExpiredPPs(pp) {
            if (pp.isAfterExpectedDuration(by)) {
                pp.actualDurationInSeconds = pp.expectedDurationSeconds;
                powerPlays[pp.playIndex] = pp;
                return false;
            }
            else {
                return true;
            }
        }
        activePowerPlays[team1Id] =
            activePowerPlays[team1Id].filter(filterOutExpiredPPs);
        activePowerPlays[team2Id] =
            activePowerPlays[team2Id].filter(filterOutExpiredPPs);
    }
    let lastPlayStartedAt = -1;
    for (let play of plays) {
        const playTimeSeconds = (0, time_into_game_1.getTimeIntoGame)(play.about);
        if (playTimeSeconds < lastPlayStartedAt) {
            throw `All plays must be in order, idx:${play.about.eventIdx} was at ${playTimeSeconds}, previous was at ${lastPlayStartedAt}`;
        }
        lastPlayStartedAt = playTimeSeconds;
        removePowerPlaysThatHaveExpired(playTimeSeconds);
        if (play.result.eventTypeId === 'GAME_END') {
            activePowerPlays[team1Id].forEach((pp) => {
                pp.actualEndSeconds = playTimeSeconds;
            });
            activePowerPlays[team2Id].forEach((pp) => {
                pp.actualEndSeconds = playTimeSeconds;
            });
        }
        const team = play.team;
        if (!team) {
            continue;
        }
        const teamId = team.id;
        const otherTeamId = teamId ? teams.other(teamId) : undefined;
        function teamsFirstPPEnds(teamIdToEnd) {
            if (!teamIdToEnd)
                return;
            const pps = activePowerPlays[teamIdToEnd]; //??
            const ppToEnd = pps.shift();
            if (!ppToEnd)
                return;
            const timeIntoPP = playTimeSeconds - ppToEnd.startSeconds;
            if (ppToEnd.expectedDurationSeconds === 60 * 2) {
                ppToEnd.actualDurationInSeconds = timeIntoPP;
                return ppToEnd;
            }
            else if (ppToEnd.expectedDurationSeconds === 60 * 4) {
                // less than 2 min in
                if (timeIntoPP < 120) {
                    ppToEnd.expectedDurationSeconds -= 120 - timeIntoPP;
                    pps.unshift(ppToEnd);
                    return;
                }
                else {
                    ppToEnd.actualDurationInSeconds = timeIntoPP;
                    return ppToEnd;
                }
            }
            else if (ppToEnd.expectedDurationSeconds === 60 * 5) {
                pps.unshift(ppToEnd);
                return;
            }
        }
        if (play.result.eventTypeId === 'PENALTY') {
            const otherTeamsEndedPP = teamsFirstPPEnds(otherTeamId);
            let pp = new power_play_1.PowerPlay(play.about.eventIdx, teamId, playTimeSeconds, play.result.penaltyMinutes * 60);
            if (otherTeamsEndedPP) {
                pp.expectedDurationSeconds = otherTeamsEndedPP.actualDurationInSeconds;
                const timeDiff = otherTeamsEndedPP.expectedDurationSeconds -
                    otherTeamsEndedPP.actualDurationInSeconds;
                pp.startSeconds += timeDiff;
            }
            activePowerPlays[teamId].push(pp);
            powerPlays[pp.playIndex] = pp;
        }
        if (play.result.eventTypeId === 'GOAL') {
            teamsFirstPPEnds(otherTeamId);
        }
    }
    // Remove any power plays that have zero duration or were never actually set
    const filtredPPs = Object.values(powerPlays).filter((pp) => { var _a; return (_a = pp.actualDurationInSeconds) !== null && _a !== void 0 ? _a : 0 > 0; });
    return { powerPlays: filtredPPs };
}
exports.parsePowerPlays = parsePowerPlays;
//# sourceMappingURL=pp-parser.js.map