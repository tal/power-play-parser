import { Double } from './double'
import { BasicTeam, GameLiveDataPlay } from './game-data'
import { PowerPlay } from './power-play'
import { getTimeIntoGame } from './time-into-game'

export type ParsePowerPlaysParams = {
  teamIds?: [number, number]
}

export function parsePowerPlays(
  plays: GameLiveDataPlay[],
  params: ParsePowerPlaysParams = {}
) {
  const powerPlays: Record<number, PowerPlay> = {}

  let teams = new Double<BasicTeam['id']>(params.teamIds)
  for (let play of plays) {
    const teamId = play.team?.id
    if (teamId) {
      teams.add(teamId)
    }

    if (teams.isComplete) {
      break
    }
  }

  const [team1Id, team2Id] = teams.values

  if (!team1Id || !team2Id) {
    throw `cannot parse plays without both teams`
  }

  const activePowerPlays = {
    [team1Id]: [] as PowerPlay[],
    [team2Id]: [] as PowerPlay[],
  }

  function removePowerPlaysThatHaveExpired(by: number) {
    function filterOutExpiredPPs(pp: PowerPlay): boolean {
      if (pp.isAfterExpectedDuration(by)) {
        pp.actualDurationInSeconds = pp.expectedDurationSeconds
        powerPlays[pp.playIndex] = pp
        return false
      } else {
        return true
      }
    }

    activePowerPlays[team1Id!] =
      activePowerPlays[team1Id!].filter(filterOutExpiredPPs)
    activePowerPlays[team2Id!] =
      activePowerPlays[team2Id!].filter(filterOutExpiredPPs)
  }

  let lastPlayStartedAt = -1
  for (let play of plays) {
    const playTimeSeconds = getTimeIntoGame(play.about)
    if (playTimeSeconds < lastPlayStartedAt) {
      throw `All plays must be in order, idx:${play.about.eventIdx} was at ${playTimeSeconds}, previous was at ${lastPlayStartedAt}`
    }
    lastPlayStartedAt = playTimeSeconds
    removePowerPlaysThatHaveExpired(playTimeSeconds)

    if (play.result.eventTypeId === 'GAME_END') {
      activePowerPlays[team1Id!].forEach((pp) => {
        pp.actualEndSeconds = playTimeSeconds
      })
      activePowerPlays[team2Id!].forEach((pp) => {
        pp.actualEndSeconds = playTimeSeconds
      })
    }

    const team = play.team
    if (!team) {
      continue
    }
    const teamId = team.id
    const otherTeamId = teamId ? teams.other(teamId) : undefined

    function teamsFirstPPEnds(teamIdToEnd: typeof teamId | undefined) {
      if (!teamIdToEnd) return

      const pps = activePowerPlays[teamIdToEnd] //??
      const ppToEnd = pps.shift()
      if (!ppToEnd) return

      const timeIntoPP = playTimeSeconds - ppToEnd.startSeconds

      if (ppToEnd.expectedDurationSeconds === 60 * 2) {
        ppToEnd.actualDurationInSeconds = timeIntoPP
        return ppToEnd
      } else if (ppToEnd.expectedDurationSeconds === 60 * 4) {
        // less than 2 min in
        if (timeIntoPP < 120) {
          ppToEnd.expectedDurationSeconds -= 120 - timeIntoPP
          pps.unshift(ppToEnd)
          return
        } else {
          ppToEnd.actualDurationInSeconds = timeIntoPP
          return ppToEnd
        }
      } else if (ppToEnd.expectedDurationSeconds === 60 * 5) {
        pps.unshift(ppToEnd)
        return
      }
    }

    if (play.result.eventTypeId === 'PENALTY') {
      const otherTeamsEndedPP = teamsFirstPPEnds(otherTeamId)

      let pp = new PowerPlay(
        play.about.eventIdx,
        teamId,
        playTimeSeconds,
        play.result.penaltyMinutes! * 60
      )

      if (otherTeamsEndedPP) {
        pp.expectedDurationSeconds = otherTeamsEndedPP.actualDurationInSeconds!
        const timeDiff =
          otherTeamsEndedPP.expectedDurationSeconds -
          otherTeamsEndedPP.actualDurationInSeconds!
        pp.startSeconds += timeDiff
      }

      activePowerPlays[teamId].push(pp)
      powerPlays[pp.playIndex] = pp
    }

    if (play.result.eventTypeId === 'GOAL') {
      teamsFirstPPEnds(otherTeamId)
    }
  }

  // Remove any power plays that have zero duration or were never actually set
  const filtredPPs = Object.values(powerPlays).filter(
    (pp) => pp.actualDurationInSeconds ?? 0 > 0
  )

  return { powerPlays: filtredPPs }
}
