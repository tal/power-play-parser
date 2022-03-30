import { GameData } from './game-data'
import { ScheduleGame } from './schedule'

function linescoreFrom(data: ScheduleGame | GameData) {
  if ('liveData' in data) {
    return data.liveData.linescore
  } else {
    return data.linescore
  }
}

export function getTimeIntoGame(
  game:
    | GameData
    | ScheduleGame
    | { period: number; periodTimeRemaining: string }
) {
  let linescore: { currentPeriod: number; currentPeriodTimeRemaining: string }
  if ('period' in game) {
    linescore = {
      currentPeriod: game.period,
      currentPeriodTimeRemaining: game.periodTimeRemaining,
    }
  } else {
    linescore = linescoreFrom(game)
  }

  let secondsIntoGame: number = 0

  secondsIntoGame += linescore.currentPeriod * 20 * 60

  const [minutes, seconds] = linescore.currentPeriodTimeRemaining.split(':')

  if (minutes && seconds) {
    secondsIntoGame -= parseInt(seconds, 10)
    secondsIntoGame -= parseInt(minutes, 10) * 60
  }

  return secondsIntoGame
}
