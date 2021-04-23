class Bowling {
  constructor(private rolls: number[] = []) {}

  score(): number {
    let total = 0
    let frame = 1
    let isFirstBall = true
    let hasExtraRolls = false

    for (let i = 0; i < this.rolls.length && frame <= 10; i++) {
      const current = this.rolls[i]
      const next1 = this.rolls[i + 1]
      const next2 = this.rolls[i + 2]
      const twoBallsSum = current + next1
      const isStrike = isFirstBall && current === 10
      const isSpare = isFirstBall && twoBallsSum === 10

      if (current < 0 || current > 10) {
        throw new Error('Pins must have a value from 0 to 10')
      }

      if (isStrike) {
        if (next1 === undefined || next2 === undefined) {
          throw new Error('Score cannot be taken until the end of the game')
        }

        // Bonus can't be greater than 10 without strike in the first extra roll.
        if (next1 + next2 > 10 && next1 !== 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }

        total += current + next1 + next2
        hasExtraRolls = frame === 10 // The last frame strike has extra rolls.
        frame++
        continue
      }

      if (isFirstBall && twoBallsSum > 10) {
        throw new Error('Pin count exceeds pins on the lane')
      }

      if (isSpare) {
        if (next2 === undefined) {
          throw new Error('Score cannot be taken until the end of the game')
        }

        total += current + next1 + next2
        hasExtraRolls = frame === 10 // The last frame spare has extra rolls.
        frame++
        i++ // Skip second ball.
        continue
      }

      frame = isFirstBall ? frame : frame + 1 // Increase frame only after second ball.
      total += current
      isFirstBall = !isFirstBall
    }

    if (frame < 10) {
      throw new Error('Score cannot be taken until the end of the game')
    }

    // Can't have more than 20 rolls without extra rolls.
    if (!hasExtraRolls && this.rolls.length > 20) {
      throw new Error('Should not be able to roll after game is over')
    }

    return total
  }
}

export default Bowling
