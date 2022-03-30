export type Schedule = {
  copyright: string
  totalItems: number
  totalEvents: number
  totalGames: number
  totalMatches: number
  metaData: {
    timeStamp: string
  }
  wait: number
  dates: ScheduleDate[]
}

export type ScheduleDate = {
  date: string
  totalItems: number
  totalEvents: number
  totalGames: number
  totalMatches: number
  games: ScheduleGame[]
}

export type ScheduleGame = {
  gamePk: number
  link: string
  gameType: GameType
  season: string
  gameDate: string
  status: GameStatus
  teams: {
    home: ScheduleGameTeam
    away: ScheduleGameTeam
  }
  linescore: GameLinescore
  venue: ScheduleGameVenue
  broadcasts: ScheduleGameBroadcast[]
  content: {
    link: string
  }
}

export type GameStatus = {
  abstractGameState: AbstractGameState
  codedGameState: number | string
  detailedState: DetailedState
  statusCode: number | string
  startTimeTBD: boolean
}

export type ScheduleGameTeam = {
  score: number
  legueRecord: {
    wins: number
    losses: number
    ot: number
    type: 'league'
  }
  team: {
    id: number
    name: string
    link: string
  }
}

export type GameLinescore = {
  /**
   * 1 indexed to the period number 1...3+
   */
  currentPeriod: number
  currentPeriodOrdinal: string
  currentPeriodTimeRemaining: string
  powerPlayStrength: string
  hasShootout: boolean
  periods: GameLinescorePeriod[]
  shootoutInfo: {
    home: GameLinescoreShootoutInfo
    away: GameLinescoreShootoutInfo
  }
  teams: {
    home: GameLinescoreTeam
    away: GameLinescoreTeam
  }
  intermisionInfo?: {
    intermissionTimeRemaining: number
    intermissionTimeElapsed: number
    intermission: boolean
  }
  powerPlayInfo: {
    situationTimeRemaining: number
    situationTimeElapsed: number
    inSituation: false
  }
}

export type GameLinescorePeriod = {
  periodType: PeriodType
  startTime: string
  endTime: string
  num: number
  ordinalNum: string
  home: {
    goals: number
    shotsOnGoal: number
    rinkSide: 'left' | 'right'
  }
  away: {
    goals: number
    shotsOnGoal: number
    rinkSide: 'left' | 'right'
  }
}

export type GameLinescoreShootoutInfo = {
  scores: number
  attempts: number
}

export type GameLinescoreTeam = {
  team: { id: string; name: string; link: string }
  goals: number
  shotsOnGoal: number
  goaliePulled: boolean
  numSkaters: number
  powerPlay: boolean
}

export type ScheduleGameVenue = {
  id: number
  name: string
  link: string
}

export type ScheduleGameBroadcast = {
  id: number
  name: string
  type: BroadcastType
  site: string
  language: string
}

export type GameType = 'R' | 'P'
export type BroadcastType = 'away' | 'home' | 'national'
export type CurrentPeriodOrdinal = 'OT' | '1st' | '2nd' | '3rd'
export type PeriodType = 'OVERTIME' | 'REGULAR'
export type PowerPlayStrength =
  | 'Even'
  | '6-on-4'
  | '6-on-3'
  | '5-on-4'
  | '5-on-3'
  | '4-on-4'
  | '3-on-3'
export type AbstractGameState = 'Final' | 'Live' | 'Preview'
export type DetailedState = 'Final' | 'In Progress' | 'Scheduled'
