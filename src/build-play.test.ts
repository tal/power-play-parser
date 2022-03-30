import { buildPlays } from './build-play'

describe(buildPlays, () => {
  it('test.todo', () => {
    const plays = buildPlays(['10:00 p h 2', 'per', '10:00 p h 2'])

    expect(plays.length).toBe(4)
    expect(plays[0].about.period).toEqual(1)
    expect(plays[0].about.periodTimeRemaining).toEqual('10:00')
    expect(plays[3].about.period).toEqual(2)
    expect(plays[3].about.periodTimeRemaining).toEqual('10:00')
  })

  it('test.todo2', () => {
    const plays = buildPlays(['s', '10:00 p h 2', 'per', '10:00 p h 2', 'e'])

    expect(plays.length).toBe(6)
    expect(plays[1].about.period).toEqual(1)
    expect(plays[1].about.periodTimeRemaining).toEqual('10:00')
    expect(plays[4].about.period).toEqual(2)
    expect(plays[4].about.periodTimeRemaining).toEqual('10:00')
  })

  it('test.todo2', () => {
    const [play] = buildPlays(['10:00 p h 2'])

    expect(play.result.eventTypeId).toEqual('PENALTY')
    expect(play.team?.id).toEqual(7)
    expect(play.result.penaltyMinutes).toEqual(2)
  })

  it('test.todo2', () => {
    const [play] = buildPlays(['10:00 p a 4'])

    expect(play.result.eventTypeId).toEqual('PENALTY')
    expect(play.team?.id).toEqual(21)
    expect(play.result.penaltyMinutes).toEqual(4)
  })

  it('test.todo2', () => {
    const [play] = buildPlays(['10:00 g h'])

    expect(play.result.eventTypeId).toEqual('GOAL')
    expect(play.team?.id).toEqual(7)
  })

  it('test.todo2', () => {
    const [play] = buildPlays(['10:00 g a'])

    expect(play.result.eventTypeId).toEqual('GOAL')
    expect(play.team?.id).toEqual(21)
  })
})
