/**
 * mood.ts — Kura's Emotional Engine
 * Maps endurance and activity levels to visual states and personality.
 */

export type MoodType = "weak" | "trying" | "runner" | "elite";

export interface MoodDefinition {
  type: MoodType;
  min: number;
  max: number;
  sprite: string;
  label: string;
  idleMessages: string[];
  successMessages: string[];
}

export const MOODS: MoodDefinition[] = [
  {
    type: "weak",
    min: 0,
    max: 5,
    sprite: "/kura-weak.png",
    label: "Baby Steps",
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
    min: 5,
    max: 10,
    sprite: "/kura-trying.png",
    label: "Determined",
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
    min: 10,
    max: 21,
    sprite: "/kura-runner.png",
    label: "Athlete",
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
    min: 21,
    max: 100, // Up to 42 and beyond
    sprite: "/kura-elite.png",
    label: "Champion",
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
 * Gets the current mood definition based on endurance km.
 */
export function getMood(endurance: number): MoodDefinition {
  return MOODS.find(m => endurance >= m.min && endurance < m.max) || MOODS[0];
}

/**
 * Gets a narrative status message based on mood and inactivity.
 */
export function getNarrativeStatus(endurance: number, daysSinceLastRun: number): string {
  if (daysSinceLastRun > 5) {
    return "My shell is getting dusty... I'm feeling a bit weak. Shall we run?";
  }
  if (daysSinceLastRun > 2) {
    return "It's been a few days. I missed our training sessions!";
  }

  const mood = getMood(endurance);
  // Pick a random idle message
  return mood.idleMessages[Math.floor(Math.random() * mood.idleMessages.length)];
}
