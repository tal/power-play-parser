export class PowerPlay {
  public actualDurationInSeconds?: number
  constructor(
    public playIndex: number,
    public teamId: number,
    public startSeconds: number,
    public expectedDurationSeconds: number
  ) {}

  get expectedEndSeconds() {
    return this.startSeconds + this.expectedDurationSeconds
  }

  get actualEndSeconds() {
    if (this.actualDurationInSeconds) {
      return this.startSeconds + this.actualDurationInSeconds
    }
  }

  set actualEndSeconds(newVal: number | undefined) {
    if (newVal) {
      this.actualDurationInSeconds = newVal - this.startSeconds
    } else {
      this.actualDurationInSeconds = undefined
    }
  }

  isAfterExpectedDuration(timeInSeconds: number): boolean {
    return timeInSeconds > this.expectedEndSeconds
  }
}
