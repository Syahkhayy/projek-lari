export type LoreCategory = "Village News" | "Village Whispers" | "AR Rumors" | "Journey Notes";

export interface LoreSnippet {
  category: LoreCategory;
  unlockEndurance: number;
  title: string;
  content: string;
}

/**
 * PHASE 3 — Narrative Layer: Advanced Category-Based World Building
 * 4 Categories x 6 Milestones x 3 Snippets = 72 Lore Items
 */
export const LORE_DATABASE: LoreSnippet[] = [
  // ─── Endurance 1 ───
  { category: "Village News", unlockEndurance: 1, title: "The Harvest Festival", content: "The village celebrated a bountiful harvest today. Everyone toasted to Kura's health and training." },
  { category: "Village News", unlockEndurance: 1, title: "New Bridge Built", content: "Ciktam helped build a new bridge over the stream. He says it will make Kura's path smoother." },
  { category: "Village News", unlockEndurance: 1, title: "Stranger in Town", content: "A traveling minstrel arrived today, singing songs of brave creatures. Kura was mentioned in the chorus!" },

  { category: "Village Whispers", unlockEndurance: 1, title: "The Hidden Map", content: "Someone found an old map in the attic. It shows secret tunnels beneath the Forest Grove." },
  { category: "Village Whispers", unlockEndurance: 1, title: "Sleepy Talk", content: "Tok the elder was heard talking in his sleep about a 'Shield of Green'. Could he mean Kura?" },
  { category: "Village Whispers", unlockEndurance: 1, title: "Moving Roots", content: "The younger kids say they saw the ancient oak tree move its roots last night. The forest is waking up." },

  { category: "AR Rumors", unlockEndurance: 1, title: "Steel in the West", content: "Travelers say the AR. Nab army is massing iron. They are building something big beyond the mountains." },
  { category: "AR Rumors", unlockEndurance: 1, title: "The Black Banners", content: "A scout saw black banners being raised at the Iron Fort. The Iron Rabbits are preparing for war." },
  { category: "AR Rumors", unlockEndurance: 1, title: "The Scout's Warning", content: "A wounded sparrow arrived from the west. 'They are coming for the green places,' it chirped." },

  { category: "Journey Notes", unlockEndurance: 1, title: "The First Step", content: "Kura's shell felt heavy today, but the first kilometer is always the hardest. The journey begins." },
  { category: "Journey Notes", unlockEndurance: 1, title: "Morning Mist", content: "The forest air was crisp as Kura started his run. Every breath is a victory over the slow life." },
  { category: "Journey Notes", unlockEndurance: 1, title: "The Steady Pace", content: "Slow and steady isn't just a saying; it's Kura's tactical advantage against the impulsive Iron Rabbits." },

  // ─── Endurance 5 ───

  { category: "Village News", unlockEndurance: 5, title: "The Market expands", content: "Trade is booming! More travelers are stopping by, all curious to see the 'Training Ground'." },
  { category: "Village News", unlockEndurance: 5, title: "Garden of Hope", content: "The children have planted a new garden specifically for Kura's favorite greens." },
  { category: "Village News", unlockEndurance: 5, title: "Oyen's Lookout", content: "Oyen the cat has claimed the highest roof in the village. He's keeping a sharp eye on the horizon." },

  { category: "Village Whispers", unlockEndurance: 5, title: "Shadow of the Cat", content: "Oyen isn't just sleeping. They say he disappears into the shadows and returns with news of the army." },
  { category: "Village Whispers", unlockEndurance: 5, title: "The Silent Owl", content: "An owl hasn't hooted for three nights. In the village, they say that means a big change is coming." },
  { category: "Village Whispers", unlockEndurance: 5, title: "Whispering Moss", content: "If you press your ear to the moss near Kura's favorite spot, you can hear the heartbeat of the forest." },

  { category: "AR Rumors", unlockEndurance: 5, title: "Marching Cadence", content: "The sound of thousand boots hitting the ground can be heard by those who listen to the earth." },
  { category: "AR Rumors", unlockEndurance: 5, title: "Heavy Smoke", content: "The clouds in the west are dark with the smoke of AR. Nab's forges. They never sleep." },
  { category: "AR Rumors", unlockEndurance: 5, title: "The Missing Scouts", content: "Our own scouts haven't returned from the valley. The Iron Rabbits have closed the borders." },

  { category: "Journey Notes", unlockEndurance: 5, title: "Rhythm of the Heart", content: "Kura has found his rhythm. He no longer fights the path; he becomes part of it." },
  { category: "Journey Notes", unlockEndurance: 5, title: "The Creek Crossing", content: "Crossing the stream used to take an hour. Today, Kura didn't even break his stride." },
  { category: "Journey Notes", unlockEndurance: 5, title: "Moss and Stone", content: "Kura's feet are hardening. The rough terrain of the Grove is now his most familiar friend." },

  // ─── Endurance 12 ───

  { category: "Village News", unlockEndurance: 12, title: "Iron Forges Busy", content: "The village smith is working late. Not for weapons, but for tools to fortify the Grove's entrance." },
  { category: "Village News", unlockEndurance: 12, title: "The Great Gathering", content: "All the forest elders met today. They've officially recognized Kura as the Grove's champion." },
  { category: "Village News", unlockEndurance: 12, title: "Message by Crow", content: "A crow brought a letter from the High Canopy. Other forests have heard of Kura's progress." },

  { category: "Village Whispers", unlockEndurance: 12, title: "The Traitor?", content: "A strange crow was seen talking to a traveler. The elders are being more careful about what they say." },
  { category: "Village Whispers", unlockEndurance: 12, title: "Glow in the Cave", content: "A blue light was seen in the deep caves. Some say the Forest Spirit is preparing for battle." },
  { category: "Village Whispers", unlockEndurance: 12, title: "The Prophet", content: "A young girl drew a turtle with wings in the sand. The elders looked at it and went silent." },

  { category: "AR Rumors", unlockEndurance: 12, title: "Iron Wheels", content: "The AR. Nab army has built massive machines with iron wheels. They are designed to flatten the forest." },
  { category: "AR Rumors", unlockEndurance: 12, title: "The General's Vow", content: "They say General Nab himself has sworn to turn our Grove into a paved city of steel." },
  { category: "AR Rumors", unlockEndurance: 12, title: "Crows of War", content: "The sky over the western pass is thick with AR. Nab's messenger crows. The orders are being sent." },

  { category: "Journey Notes", unlockEndurance: 12, title: "Second Wind", content: "At the 10km mark, something shifted. Kura's lungs felt like they could breathe for the whole world." },
  { category: "Journey Notes", unlockEndurance: 12, title: "The Steep Hill", content: "Kura conquered the Great Ridge today. From the top, he saw the smoke in the west and didn't flinch." },
  { category: "Journey Notes", unlockEndurance: 12, title: "Rainy Training", content: "Even the heavy rains couldn't stop him. His shell is a shield, and his will is a storm." },

  // ─── Endurance 25 ───

  { category: "Village News", unlockEndurance: 25, title: "The Stone Wall", content: "A new stone wall has been completed at the western pass. The village feels safer already." },
  { category: "Village News", unlockEndurance: 25, title: "Banner of the Shell", content: "The village weavers created a banner with a golden shell. It now flies high above the training ground." },
  { category: "Village News", unlockEndurance: 25, title: "Night Patrols", content: "Ciktam and the elders have started night patrols. They are determined to protect the training grounds." },

  { category: "Village Whispers", unlockEndurance: 25, title: "Missing Iron", content: "The smith's finest iron went missing. Rumor is it was taken to build a secret weapon for Kura." },
  { category: "Village Whispers", unlockEndurance: 25, title: "The Ghost Runner", content: "Travelers say they see Kura running in the mist, even when he's resting here. His spirit is everywhere." },
  { category: "Village Whispers", unlockEndurance: 25, title: "Echoes of Drums", content: "The ground vibrates at midnight. Some say it's the AR. Nab army, others say it's the forest itself breathing." },

  { category: "AR Rumors", unlockEndurance: 25, title: "The River Blocked", content: "The Iron Rabbits have dammed the Great River. They want to thirst us out before they attack." },
  { category: "AR Rumors", unlockEndurance: 25, title: "Night Flares", content: "Strange red lights were seen over the canopy last night. AR. Nab is signaling their vanguard." },
  { category: "AR Rumors", unlockEndurance: 25, title: "The Iron Wall", content: "A scout reports a wall of iron has been built at our border. They are boxing us in." },

  { category: "Journey Notes", unlockEndurance: 25, title: "The Flow State", content: "Distances that used to be impossible are now just a morning warm-up. Kura has transcended his limits." },
  { category: "Journey Notes", unlockEndurance: 25, title: "Twilight Run", content: "Running in the dark has sharpened Kura's other senses. He can feel the earth's vibrations beneath his shell." },
  { category: "Journey Notes", unlockEndurance: 25, title: "The 25km Wall", content: "He hit a wall today, then he ran right through it. Kura's endurance is becoming legendary." },

  // ─── Endurance 30 ───

  { category: "Village News", unlockEndurance: 30, title: "The Final Feast", content: "The village is preparing a grand feast. They know a confrontation is coming, and they stand united." },
  { category: "Village News", unlockEndurance: 30, title: "The Children's Song", content: "A new song is heard in the streets: 'Kura runs, the Forest stands. Kura leads, we hold the lands.'" },
  { category: "Village News", unlockEndurance: 30, title: "Signal Fires Ready", content: "Stacks of wood have been placed on every hill. The village is ready to spread the word at a moment's notice." },

  { category: "Village Whispers", unlockEndurance: 30, title: "The Secret Pact", content: "Oyen and Ciktam were seen shaking hands. The cat and the villager have a secret plan for the invasion." },
  { category: "Village Whispers", unlockEndurance: 30, title: "The Eternal Flame", content: "A fire that doesn't burn wood was found in the center of the grove. It glows brighter as Kura trains." },
  { category: "Village Whispers", unlockEndurance: 30, title: "The Wind's Warning", content: "The wind through the pines sounds like a name now... it's calling for Kura to be ready." },

  { category: "AR Rumors", unlockEndurance: 30, title: "The Final March", content: "The drums have stopped. That means the AR. Nab army has begun their final march towards the Grove." },
  { category: "AR Rumors", unlockEndurance: 30, title: "Steel Thunder", content: "A roar like thunder but of metal clashing was heard. Their war machines have started moving." },
  { category: "AR Rumors", unlockEndurance: 30, title: "The Sky Darkens", content: "It's not clouds. It's the soot from the AR. Nab engines. They are right at our doorstep." },

  { category: "Journey Notes", unlockEndurance: 30, title: "Marathon Mindset", content: "Kura is now training at a level that would tire a horse. His small legs are driven by an infinite spirit." },
  { category: "Journey Notes", unlockEndurance: 30, title: "Echoing Steps", content: "The forest floors echo with a deep, steady thud. It's the sound of Kura claiming his territory." },
  { category: "Journey Notes", unlockEndurance: 30, title: "The Peak looms", content: "The 42km mark is in sight. Kura's eyes are focused, his heart is a steady drum of pure resolve." },

  // ─── Endurance 42 ───

  { category: "Village News", unlockEndurance: 42, title: "The Legend Lives", content: "Every house in the village now has a small turtle carving on its door. Kura is part of their history now." },
  { category: "Village News", unlockEndurance: 42, title: "The Grove's Vow", content: "The village elders have vowed that as long as there is breath in the Forest, Kura's name will be remembered." },
  { category: "Village News", unlockEndurance: 42, title: "Victory Parade", content: "Though the threat remains, the village marched today in celebration of Kura's peak endurance." },

  { category: "Village Whispers", unlockEndurance: 42, title: "The Ascended One", content: "Some villagers believe Kura is no longer just a turtle, but a Guardian Spirit of the entire world." },
  { category: "Village Whispers", unlockEndurance: 42, title: "The Silent Forest", content: "The forest has gone completely quiet. They say it's holding its breath for Kura's final kilometer." },
  { category: "Village Whispers", unlockEndurance: 42, title: "The Golden Leaf", content: "A leaf made of pure gold fell from the Great Tree and landed on Kura's shell. A sign of ultimate protection." },

  { category: "AR Rumors", unlockEndurance: 42, title: "The Iron Silence", content: "The AR. Nab army has stopped at the edge of the forest. They are afraid of the legend Kura has become." },
  { category: "AR Rumors", unlockEndurance: 42, title: "Broken Steel", content: "A scout found a discarded AR. Nab helmet. It was crushed by what looked like a giant flipper." },
  { category: "AR Rumors", unlockEndurance: 42, title: "The Retreat?", content: "Some say the backlines of the Iron Rabbit army are turning back. They can't face a Forest that won't tire." },

  { category: "Journey Notes", unlockEndurance: 42, title: "The Champion's Path", content: "42 kilometers. A marathon. Kura has achieved the impossible. He is the guardian the forest needed." },
  { category: "Journey Notes", unlockEndurance: 42, title: "Endless Horizons", content: "The goal was 42, but Kura feels like he could run forever. The finish line was just another start." },
  { category: "Journey Notes", unlockEndurance: 42, title: "The Shell of Steel", content: "Kura's shell now shines with the effort of a thousand miles. He is ready for whatever comes next." }

];

/**
 * Gets all snippets currently unlocked by the user
 */
export const getUnlockedSnippets = (currentEndurance: number) => {
  return LORE_DATABASE.filter(s => currentEndurance >= s.unlockEndurance);
};

/**
 * Picks a random snippet from the pool of all unlocked snippets.
 * This naturally "rotates" between categories and milestones.
 */
export const getRandomUnlockedSnippet = (currentEndurance: number) => {
  const unlocked = getUnlockedSnippets(currentEndurance);
  if (unlocked.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * unlocked.length);
  return unlocked[randomIndex];
};
