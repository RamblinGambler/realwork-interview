// Unused letters

export function unusedLetters(str: string): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphabetArray = alphabet.split('');

  // Filter then includes creates quadratic (O(n^2)) time complexity
  return alphabetArray
    .filter((letter) => !str.includes(letter))
    .join('');
}

export function unusedLettersSet(str: string): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphabetSet = new Set(alphabet);

  // Iterate over string then Set delete has O(n) time complexity
  for (const letter of str) {
    alphabetSet.delete(letter);
  }

  // Array.from is O(n) but since its not nested it doesn't quadratically increase the time complexity
  return Array.from(alphabetSet).join('');
}

console.log(unusedLetters('abwqidjnidqwjndqwic'));
console.log(unusedLettersSet('abewjurwenifweiewnweoc'));

// Particle Collider

// Constants for particle types and movement
const MOVING_PARTICLES = new Set(['L', 'R', 'B']);
const EMPTY_CELL = '.';
const PARTICLE = 'X';

/**
 * Simulates particle movement and collisions in a 1D space
 * @param initialPosition Initial state of particles
 * @param speed Movement speed of particles
 * @returns Array of states showing particle movement until particles leave the space
 */
export function animate(
  initialPosition: string,
  speed: number
): string[] {
  const result: string[] = [];
  const length = initialPosition.length;
  let currentState = initialPosition.split('');

  // Continue while there are moving particles
  while (containsMovingParticles(currentState)) {
    result.push(
      currentState
        .map((char) =>
          MOVING_PARTICLES.has(char) ? PARTICLE : EMPTY_CELL
        )
        .join('')
    );
    currentState = calculateNextState(currentState, length, speed);
  }

  // Add final empty state
  result.push(''.padEnd(length, EMPTY_CELL));
  return result;
}

/**
 * Checks if any moving particles remain
 */
function containsMovingParticles(state: string[]): boolean {
  return state.some((char) => MOVING_PARTICLES.has(char));
}

/**
 * Calculates the next state of particle positions
 */
function calculateNextState(
  currentState: string[],
  length: number,
  speed: number
): string[] {
  const nextState = new Array(length).fill(EMPTY_CELL);

  for (let i = 0; i < length; i++) {
    const char = currentState[i];

    // Handle leftward movement
    if (char === 'L' || char === 'B') {
      const newPosL = i - speed;
      if (newPosL >= 0) {
        nextState[newPosL] = nextState[newPosL] === 'R' ? 'B' : 'L';
      }
    }

    // Handle rightward movement
    if (char === 'R' || char === 'B') {
      const newPosR = i + speed;
      if (newPosR < length) {
        nextState[newPosR] = nextState[newPosR] === 'L' ? 'B' : 'R';
      }
    }
  }

  return nextState;
}

console.log(animate('..R....', 2));
console.log(animate('RR..LRL', 3));
console.log(animate('LRLR.LRLR', 2));
console.log(animate('RLRLRLRLRL', 10));
