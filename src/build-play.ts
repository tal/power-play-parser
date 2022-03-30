import { BasicTeam, GameLiveDataPlay } from './game-data'

const startPlay: GameLiveDataPlay = {
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
}

const endPlay: GameLiveDataPlay = {
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
}

const __periodEnd: GameLiveDataPlay = {
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
}

const __periodStart: GameLiveDataPlay = {
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
}

const __goal: GameLiveDataPlay = {
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
    description:
      'Tage Thompson (17) Wrist Shot, assists: Jeff Skinner (15), Alex Tuch (13)',
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
}

const penalty: GameLiveDataPlay = {
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
}

const teams = {
  home: {
    id: 7,
    name: 'Buffalo Sabres',
    link: '/api/v1/teams/7',
    triCode: 'BUF',
  } as BasicTeam,
  away: {
    id: 21,
    name: 'Colorado Avalanche',
    link: '/api/v1/teams/21',
    triCode: 'COL',
  } as BasicTeam,
}

export const teamIds = [teams.home.id, teams.away.id] as [number, number]

let indexTracker = 0
export function resetIndex() {
  indexTracker = 0
}

export function buildGoalPlay({
  period,
  periodTimeRemaining,
  homeAway,
}: {
  period: number
  periodTimeRemaining: string
  homeAway: 'home' | 'away'
}): GameLiveDataPlay {
  const team = teams[homeAway]

  return {
    ...__goal,
    about: {
      ...__goal.about,
      period,
      periodTimeRemaining,
      eventIdx: indexTracker++,
      eventId: indexTracker,
    },
    team,
  }
}

export function buildPenaltyPlay({
  period,
  periodTimeRemaining,
  homeAway,
  penaltyMinutes,
}: {
  period: number
  periodTimeRemaining: string
  homeAway: 'home' | 'away'
  penaltyMinutes: number
}): GameLiveDataPlay {
  const team = teams[homeAway]

  return {
    ...penalty,
    about: {
      ...penalty.about,
      period,
      periodTimeRemaining,
      eventIdx: indexTracker++,
      eventId: indexTracker,
    },
    result: {
      ...penalty.result,
      penaltyMinutes,
    },
    team,
  }
}

export function buildPeriodEndPlay({
  period,
}: {
  period: number
}): GameLiveDataPlay {
  return {
    ...__periodEnd,
    about: {
      ...__periodEnd.about,
      period,
      eventIdx: indexTracker++,
      eventId: indexTracker,
    },
  }
}

export function buildPeriodStartPlay({
  period,
}: {
  period: number
}): GameLiveDataPlay {
  return {
    ...__periodStart,
    about: {
      ...__periodStart.about,
      period,
      eventIdx: indexTracker++,
      eventId: indexTracker,
    },
  }
}

export function buildGameStartPlay(): GameLiveDataPlay {
  return {
    ...startPlay,
    about: {
      ...startPlay.about,
      eventIdx: indexTracker++,
      eventId: indexTracker,
    },
  }
}

export function buildGameEndPlay(): GameLiveDataPlay {
  return {
    ...endPlay,
    about: {
      ...endPlay.about,
      eventIdx: indexTracker++,
      eventId: indexTracker,
    },
  }
}

export type PlayTemplate = `${number}:${number} ${string}` | 'per' | 's' | 'e'
export function buildPlays(playTemplates: PlayTemplate[]): GameLiveDataPlay[] {
  let currentPeriod = 1
  const plays = [] as GameLiveDataPlay[]

  for (let t of playTemplates) {
    const [_, time, remainder] = t.match(/(?:(\d{2}:\d{2}) )?(.+)/)!
    const [type, ...args] = remainder.split(' ')
    const homeAway =
      args[0] === 'h' ? 'home' : args[0] === 'a' ? 'away' : undefined

    switch (type) {
      case 'per':
        plays.push(buildPeriodEndPlay({ period: currentPeriod }))
        currentPeriod += 1
        plays.push(buildPeriodStartPlay({ period: currentPeriod }))
        break
      case 's':
        plays.push(buildGameStartPlay())
        break
      case 'e':
        plays.push(buildGameEndPlay())
        break
      case 'g':
        if (!homeAway) throw `home or away not defined ${args[0]}`
        const goal = buildGoalPlay({
          homeAway,
          period: currentPeriod,
          periodTimeRemaining: time,
        })
        plays.push(goal)
        break
      case 'p':
        if (!homeAway) throw `home or away not defined ${args[0]}`
        const penaltyMinutes = parseInt(args[1], 10)
        if (isNaN(penaltyMinutes))
          throw `value isn't number for penalty length ${penaltyMinutes}`
        const penalty = buildPenaltyPlay({
          homeAway,
          period: currentPeriod,
          periodTimeRemaining: time,
          penaltyMinutes,
        })
        plays.push(penalty)
        break
      default:
        throw `unparsable template ${t}`
    }
  }

  return plays
}
