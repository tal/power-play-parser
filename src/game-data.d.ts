import {
  CurrentPeriodOrdinal,
  GameType,
  PeriodType,
  GameLinescore,
  GameStatus,
} from './schedule'

export type GameData = {
  copyright: string
  gamePk: number
  link: string
  liveData: GameLiveData
  gameData: GameDataGame
  metaData: {
    wait: number
    timeStamp: string
  }
}

export type GameDataGame = {
  game: {
    pk: number
    season: string
    type: GameType
  }
  datetime: {
    dateTime: string
    endDateTime: string
  }
  status: GameStatus
  teams: { away: GameDataTeam; home: GameDataTeam }
  players: Record<`ID${number}`, GameDataPlayer>
}

export type GameDataPlayer = {
  id: number
  fullName: string
  link: string
  firstName: string
  lastName: string
  primaryNumber: string
  birthDate: string
  currentAge: number
  birthCity: string
  birthStateProvence: string
  birthCountry: string
  nationality: string
  height: string
  weight: number
  active: boolean
  alternateCaptain: boolean
  captain: boolean
  rookie: boolean
  shootsCatches: 'R' | 'L'
  rosterStatus: 'Y'
  currentTeam: BasicTeam
  primaryPosition: PlayerPosition
}

export type BasicTeam = {
  id: number
  name: string
  link: string
  triCode: string
}

export type PlayerPosition = {
  code: 'R' | 'L' | 'C' | 'D' | 'G'
  name: string
  abbreviation: string
}

export type BoxscoreTeam = {
  team: BasicTeam
  teamStats: {
    teamSkaterStats: BoxscoreTeamSkaterStats
  }
  players: Record<`ID${number}`, BoxscorePlayer>
  goalies: number[]
  skaters: number[]
  onIce: number[]
  onIcePlus: { playerId: number; shiftDuration: number; stamina: number }[]
  scratches: number[]
  penaltyBox: number[]
  coaches: {
    person: { fullName: number; link: number }
    position: { code: string; name: string; type: string; abbreviation: string }
  }
}

export type BoxscoreTeamSkaterStats = {
  goals: number
  pim: number
  shots: number
  powerPlayPercentage: string
  powerPlayGoals: number
  powerPlayOpportunities: number
  faceOffWinPercentage: string
  blocked: number
  takeaways: number
  giveaways: number
  hits: number
}

export type BoxscorePlayer = {
  person: {
    id: number
    fullName: string
    link: string
    shootsCatches: 'R' | 'L'
    rosterStatus: 'Y'
  }
  jerseyNumber: number
  position: PlayerPosition
  stats: {
    skaterStats?: BoxscoreSkaterStats
    goalieStats?: BoxscoreGoalieStats
  }
}

export type BoxscoreGoalieStats = {
  timeOnIce: string
  assists: number
  goals: number
  pim: number
  shots: number
  saves: number
  powerPlaySaves: number
  shortHandedSaves: number
  evenSaves: number
  powerPlayShotsAgainst: number
  shortHandedShotsAgainst: number
  evenShotsAgainst: number
  decision: 'W' | 'L'
  savePercentage: number
  powerPlaySavePercentage: number
  evenStrengthSavePercentage: number
}

export type BoxscoreSkaterStats = {
  timeOnIce: string
  assists: number
  goals: number
  shots: number
  hits: number
  powerPlayGoals: number
  powerPlayAssists: number
  penaltyMinutes: number
  faceOffWins: number
  faceoffTaken: number
  takeaways: number
  giveaways: number
  shortHandedGoals: number
  shortHandedAssists: number
  blocked: number
  plusMinus: number
  evenTimeOnIce: string
  powerPlayTimeOnIce: string
  shortHandedTimeOnIce: string
}

export type GameDataTeam = {
  id: number
  name: string
  link: string
  abbreviation: string
  triCode: string
  locationName: string
  firstYearOfPlay: string
  shortName: string
  officialSiteUrl: string
  franchiseId: number
  active: boolean
  venue: TeamVenue
  division: TeamDivision
  conference: TeamConference
  franchise: TeamFranchise
}

export type TeamFranchise = {
  franchiseId: number
  teamName: string
  link: string
}

export type TeamConference = {
  id: number
  name: string
  link: string
}

export type TeamDivision = {
  id: number
  name: string
  nameShort: string
  link: string
  abbreviation: string
}

export type TeamVenue = {
  id: number
  name: string
  link: string
  city: string
  timeZone: { id: string; offset: number; tz: string }
}

export type GameboxScore = {
  teams: {
    home: BoxscoreTeam
    away: BoxscoreTeam
  }
}

export type GameLiveData = {
  plays: {
    allPlays: GameLiveDataPlay[]
    scoringPlays: number[]
    penaltyPlays: number[]
    playsByPeriod: number[]
    currentPlay: GameLiveDataPlay
  }
  linescore: GameLinescore
  boxscore: GameboxScore
}

export type GameLiveDataPlay = {
  result: GameLiveDataPlayResult
  about: GameLiveDataPlayAbout
  coordinates?: { x?: number; y?: number }
  players?: {
    player: { id: number; fullName: string; link: string }
    playerType: 'Scorer' | 'Assist' | 'Goalie' | 'DrewBy' | 'PenaltyOn'
    seasonTotal?: number
  }[]
  team?: BasicTeam
}

export type GameLiveDataPlayResult = {
  event: string
  eventCode: string
  eventTypeId: GameEventTypeId
  description: string
  secondaryType?: string
  penaltySeverity?: 'Minor' | 'Major'
  penaltyMinutes?: number
  strength?: {
    code: 'EVEN' | 'PPG' | 'SHG'
    name: string
  }
  emptyNet?: boolean
  gameWinningGoal?: boolean
}

export type GameLiveDataPlayAbout = {
  eventIdx: number
  eventId: number
  period: number
  periodType: PeriodType
  ordinalNum: CurrentPeriodOrdinal
  periodTime: string
  periodTimeRemaining: string
  dateTime: string
  goals: {
    away: number
    home: number
  }
}

export type GameEventTypeId =
  | 'GAME_SCHEDULED'
  | 'PERIOD_READY'
  | 'PERIOD_START'
  | 'FACEOFF'
  | 'HIT'
  | 'STOP'
  | 'SHOT'
  | 'MISSED_SHOT'
  | 'GOAL'
  | 'TAKEAWAY'
  | 'BLOCKED_SHOT'
  | 'GIVEAWAY'
  | 'PENALTY'
  | 'PERIOD_END'
  | 'PERIOD_OFFICIAL'
  | 'GAME_END'
  | 'GAME_OFFICIAL'
