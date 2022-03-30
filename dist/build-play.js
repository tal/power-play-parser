"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPlays = exports.buildGameEndPlay = exports.buildGameStartPlay = exports.buildPeriodStartPlay = exports.buildPeriodEndPlay = exports.buildPenaltyPlay = exports.buildGoalPlay = exports.resetIndex = exports.teamIds = void 0;
const startPlay = {
    result: {
        event: 'Period Start',
        eventCode: 'BUF151',
        eventTypeId: 'PERIOD_START',
        description: 'Period Start',
    },
    about: {
        eventIdx: 2,
        eventId: 151,
        period: 1,
        periodType: 'REGULAR',
        ordinalNum: '1st',
        periodTime: '00:00',
        periodTimeRemaining: '20:00',
        dateTime: '2022-02-19T18:10:07Z',
        goals: { away: 0, home: 0 },
    },
    coordinates: {},
};
const endPlay = {
    result: {
        event: 'Game End',
        eventCode: 'BUF675',
        eventTypeId: 'GAME_END',
        description: 'Game End',
    },
    about: {
        eventIdx: 235,
        eventId: 675,
        period: 3,
        periodType: 'REGULAR',
        ordinalNum: '3rd',
        periodTime: '20:00',
        periodTimeRemaining: '00:00',
        dateTime: '2022-02-19T20:30:48Z',
        goals: { away: 5, home: 3 },
    },
    coordinates: {},
};
const __periodEnd = {
    result: {
        event: 'Period End',
        eventCode: 'BUF121',
        eventTypeId: 'PERIOD_END',
        description: 'End of 1st Period',
    },
    about: {
        eventIdx: 69,
        eventId: 121,
        period: 1,
        periodType: 'REGULAR',
        ordinalNum: '1st',
        periodTime: '20:00',
        periodTimeRemaining: '00:00',
        dateTime: '2022-02-19T18:43:54Z',
        goals: { away: 3, home: 2 },
    },
    coordinates: {},
};
const __periodStart = {
    result: {
        event: 'Period Start',
        eventCode: 'BUF151',
        eventTypeId: 'PERIOD_START',
        description: 'Period Start',
    },
    about: {
        eventIdx: 2,
        eventId: 151,
        period: 1,
        periodType: 'REGULAR',
        ordinalNum: '1st',
        periodTime: '00:00',
        periodTimeRemaining: '20:00',
        dateTime: '2022-02-19T18:10:07Z',
        goals: { away: 0, home: 0 },
    },
    coordinates: {},
};
const __goal = {
    players: [
        {
            player: {
                id: 8479420,
                fullName: 'Tage Thompson',
                link: '/api/v1/people/8479420',
            },
            playerType: 'Scorer',
            seasonTotal: 17,
        },
        {
            player: {
                id: 8475784,
                fullName: 'Jeff Skinner',
                link: '/api/v1/people/8475784',
            },
            playerType: 'Assist',
            seasonTotal: 15,
        },
        {
            player: {
                id: 8477949,
                fullName: 'Alex Tuch',
                link: '/api/v1/people/8477949',
            },
            playerType: 'Assist',
            seasonTotal: 13,
        },
        {
            player: {
                id: 8475311,
                fullName: 'Darcy Kuemper',
                link: '/api/v1/people/8475311',
            },
            playerType: 'Goalie',
        },
    ],
    result: {
        event: 'Goal',
        eventCode: 'BUF254',
        eventTypeId: 'GOAL',
        description: 'Tage Thompson (17) Wrist Shot, assists: Jeff Skinner (15), Alex Tuch (13)',
        secondaryType: 'Wrist Shot',
        strength: {
            code: 'EVEN',
            name: 'Even',
        },
        gameWinningGoal: false,
        emptyNet: false,
    },
    about: {
        eventIdx: 11,
        eventId: 254,
        period: 1,
        periodType: 'REGULAR',
        ordinalNum: '1st',
        periodTime: '02:50',
        periodTimeRemaining: '17:10',
        dateTime: '2022-02-19T18:13:19Z',
        goals: {
            away: 0,
            home: 1,
        },
    },
    coordinates: {
        x: 64,
        y: 13,
    },
    team: {
        id: 7,
        name: 'Buffalo Sabres',
        link: '/api/v1/teams/7',
        triCode: 'BUF',
    },
};
const penalty = {
    players: [
        {
            player: {
                id: 8481522,
                fullName: 'Peyton Krebs',
                link: '/api/v1/people/8481522',
            },
            playerType: 'PenaltyOn',
        },
        {
            player: {
                id: 8477456,
                fullName: 'J.T. Compher',
                link: '/api/v1/people/8477456',
            },
            playerType: 'DrewBy',
        },
    ],
    result: {
        event: 'Penalty',
        eventCode: 'BUF480',
        eventTypeId: 'PENALTY',
        description: 'Peyton Krebs Slashing against J.T. Compher',
        secondaryType: 'Slashing',
        penaltySeverity: 'Minor',
        penaltyMinutes: 2,
    },
    about: {
        eventIdx: 62,
        eventId: 480,
        period: 1,
        periodType: 'REGULAR',
        ordinalNum: '1st',
        periodTime: '18:44',
        periodTimeRemaining: '01:16',
        dateTime: '2022-02-19T18:39:39Z',
        goals: { away: 3, home: 2 },
    },
    coordinates: { x: 85.0, y: -21.0 },
    team: {
        id: 7,
        name: 'Buffalo Sabres',
        link: '/api/v1/teams/7',
        triCode: 'BUF',
    },
};
const teams = {
    home: {
        id: 7,
        name: 'Buffalo Sabres',
        link: '/api/v1/teams/7',
        triCode: 'BUF',
    },
    away: {
        id: 21,
        name: 'Colorado Avalanche',
        link: '/api/v1/teams/21',
        triCode: 'COL',
    },
};
exports.teamIds = [teams.home.id, teams.away.id];
let indexTracker = 0;
function resetIndex() {
    indexTracker = 0;
}
exports.resetIndex = resetIndex;
function buildGoalPlay({ period, periodTimeRemaining, homeAway, }) {
    const team = teams[homeAway];
    return Object.assign(Object.assign({}, __goal), { about: Object.assign(Object.assign({}, __goal.about), { period,
            periodTimeRemaining, eventIdx: indexTracker++, eventId: indexTracker }), team });
}
exports.buildGoalPlay = buildGoalPlay;
function buildPenaltyPlay({ period, periodTimeRemaining, homeAway, penaltyMinutes, }) {
    const team = teams[homeAway];
    return Object.assign(Object.assign({}, penalty), { about: Object.assign(Object.assign({}, penalty.about), { period,
            periodTimeRemaining, eventIdx: indexTracker++, eventId: indexTracker }), result: Object.assign(Object.assign({}, penalty.result), { penaltyMinutes }), team });
}
exports.buildPenaltyPlay = buildPenaltyPlay;
function buildPeriodEndPlay({ period, }) {
    return Object.assign(Object.assign({}, __periodEnd), { about: Object.assign(Object.assign({}, __periodEnd.about), { period, eventIdx: indexTracker++, eventId: indexTracker }) });
}
exports.buildPeriodEndPlay = buildPeriodEndPlay;
function buildPeriodStartPlay({ period, }) {
    return Object.assign(Object.assign({}, __periodStart), { about: Object.assign(Object.assign({}, __periodStart.about), { period, eventIdx: indexTracker++, eventId: indexTracker }) });
}
exports.buildPeriodStartPlay = buildPeriodStartPlay;
function buildGameStartPlay() {
    return Object.assign(Object.assign({}, startPlay), { about: Object.assign(Object.assign({}, startPlay.about), { eventIdx: indexTracker++, eventId: indexTracker }) });
}
exports.buildGameStartPlay = buildGameStartPlay;
function buildGameEndPlay() {
    return Object.assign(Object.assign({}, endPlay), { about: Object.assign(Object.assign({}, endPlay.about), { eventIdx: indexTracker++, eventId: indexTracker }) });
}
exports.buildGameEndPlay = buildGameEndPlay;
function buildPlays(playTemplates) {
    let currentPeriod = 1;
    const plays = [];
    for (let t of playTemplates) {
        const [_, time, remainder] = t.match(/(?:(\d{2}:\d{2}) )?(.+)/);
        const [type, ...args] = remainder.split(' ');
        const homeAway = args[0] === 'h' ? 'home' : args[0] === 'a' ? 'away' : undefined;
        switch (type) {
            case 'per':
                plays.push(buildPeriodEndPlay({ period: currentPeriod }));
                currentPeriod += 1;
                plays.push(buildPeriodStartPlay({ period: currentPeriod }));
                break;
            case 's':
                plays.push(buildGameStartPlay());
                break;
            case 'e':
                plays.push(buildGameEndPlay());
                break;
            case 'g':
                if (!homeAway)
                    throw `home or away not defined ${args[0]}`;
                const goal = buildGoalPlay({
                    homeAway,
                    period: currentPeriod,
                    periodTimeRemaining: time,
                });
                plays.push(goal);
                break;
            case 'p':
                if (!homeAway)
                    throw `home or away not defined ${args[0]}`;
                const penaltyMinutes = parseInt(args[1], 10);
                if (isNaN(penaltyMinutes))
                    throw `value isn't number for penalty length ${penaltyMinutes}`;
                const penalty = buildPenaltyPlay({
                    homeAway,
                    period: currentPeriod,
                    periodTimeRemaining: time,
                    penaltyMinutes,
                });
                plays.push(penalty);
                break;
            default:
                throw `unparsable template ${t}`;
        }
    }
    return plays;
}
exports.buildPlays = buildPlays;
//# sourceMappingURL=build-play.js.map