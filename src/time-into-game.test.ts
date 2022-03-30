import { getTimeIntoGame } from './time-into-game'

describe(getTimeIntoGame, () => {
  it('should work for', () => {
    const result = getTimeIntoGame({ period: 1, periodTimeRemaining: '20:00' })
    expect(result).toBe(0)
  })

  it('should work for', () => {
    const result = getTimeIntoGame({ period: 1, periodTimeRemaining: '10:10' })
    expect(result).toBe(590)
  })

  it('should work for', () => {
    const result = getTimeIntoGame({ period: 1, periodTimeRemaining: '18:20' })
    expect(result).toBe(100)
  })

  it('should work for', () => {
    const result = getTimeIntoGame({ period: 2, periodTimeRemaining: '18:20' })
    expect(result).toBe(1300)
  })

  it('should work for', () => {
    const result = getTimeIntoGame({ period: 5, periodTimeRemaining: '18:20' })
    expect(result).toBe(4900)
  })
})
