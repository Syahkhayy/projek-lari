/**
 * mood.ts — Kura's Emotional Engine
 * Maps streak (short-term consistency) to visual states and personality.
 * Endurance (long-term growth) is handled by the Evolution/Narrative system.
 */

export type MoodType = "weak" | "trying" | "runner" | "elite";

export interface MoodDefinition {
  type: MoodType;
  minStreak: number;
  sprite: string;
  label: string;
  idleMessages: string[];
  successMessages: string[];
}

export const MOODS: MoodDefinition[] = [
  {
    type: "weak",
    minStreak: 0,
    sprite: "/kura-weak.png",
    label: "Lazy & Sleepy",
    idleMessages: [
      "I'm so sleepy...",
      "My shell feels heavy today.",
      "Are we going for a walk?",
      "I'm just a little guy.",
      "Slow and steady, right?"
    ],
    successMessages: [
      "Phew! That was tough, but I'm trying!",
      "I think my legs are getting stronger!",
      "Did you see that? I moved so fast!"
    ]
  },
  {
    type: "trying",
    minStreak: 1,
    sprite: "/kura-trying.png",
    label: "Getting Started",
    idleMessages: [
      "I'm getting the hang of this!",
      "One step at a time.",
      "I feel a bit lighter today.",
      "Is that a hill? No problem!",
      "I'm not as sleepy as I used to be!"
    ],
    successMessages: [
      "I can feel the rhythm now!",
      "We're making real progress, friend!",
      "I'm not just a baby turtle anymore!"
    ]
  },
  {
    type: "runner",
    minStreak: 3,
    sprite: "/kura-runner.png",
    label: "In the Zone",
    idleMessages: [
      "I love the wind in my face!",
      "We're a great team, aren't we?",
      "Let's go further next time!",
      "I feel strong and steady.",
      "My shell is looking shiny!"
    ],
    successMessages: [
      "That felt amazing! I'm really a runner now!",
      "I could keep going forever!",
      "Look at me go! I'm getting so fast!"
    ]
  },
  {
    type: "elite",
    minStreak: 6,
    sprite: "/kura-elite.png",
    label: "Unstoppable",
    idleMessages: [
      "Nothing can stop us now!",
      "I'm ready for a marathon.",
      "Do I look like a hero? I feel like one.",
      "Let's conquer the world together!",
      "I've come so far... thank you."
    ],
    successMessages: [
      "I am the master of the training ground!",
      "Total conditioning! I feel unstoppable!",
      "We've reached the peak of greatness!"
    ]
  }
];

/**
 * Gets the current mood definition based on current streak.
 */
export function getMood(streak: number): MoodDefinition {
  // Find the highest mood that matches the current streak
  return [...MOODS].reverse().find(m => streak >= m.minStreak) || MOODS[0];
}

/**
 * Gets a narrative status message based on mood and inactivity.
 */
export function getNarrativeStatus(streak: number, daysSinceLastRun: number): string {
  if (daysSinceLastRun > 5) {
    return "My shell is getting dusty... I'm feeling a bit weak. Shall we run?";
  }
  if (daysSinceLastRun > 2) {
    return "It's been a few days. I missed our training sessions!";
  }

  const mood = getMood(streak);
  // Pick a random idle message
  return mood.idleMessages[Math.floor(Math.random() * mood.idleMessages.length)];
}

