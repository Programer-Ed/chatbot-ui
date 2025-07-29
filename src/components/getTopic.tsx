// const topicMatchMap = {
//   "who are you": "Elevator-pitch",
//   "introduce yourself": "Elevator-pitch",
//   skills: "Skills",
//   react: "Skills",
//   tech: "Skills",
//   education: "Education",
//   anime: "Anime",
//   experience: "Experience",
//   projects: "Experience",
// };

// const lowerPrompt = prompt.toLowerCase();
// let matchedKey = Object.keys(topicMatchMap).find(key => lowerPrompt.includes(key));

// if (matchedKey) {
//   const matchedTopic = topicMatchMap[matchedKey];
//   systemPrompt = SYSTEM_PROMPT.replace("${topicsData}", topics[matchedTopic]);
// } else {
//   systemPrompt = SYSTEM_PROMPT.replace("${topicsData}", Object.values(topics).join("\n\n"));
// }

// const topicMatchMap: Record<string, keyof typeof topics> = {
//   "who are you": "Elevator-pitch",
//   "introduce yourself": "Elevator-pitch",
//   skills: "Skills",
//   react: "Skills",
//   tech: "Skills",
//   education: "Education",
//   anime: "Anime",
//   experience: "Experience",
//   projects: "Experience",
// };

// const lowerPrompt = prompt.toLowerCase();

// const matchedKey = Object.keys(topicMatchMap)
//   .sort((a, b) => b.length - a.length)
//   .find((key) => lowerPrompt.includes(key));

// const matchedTopic = matchedKey ? topicMatchMap[matchedKey] : null;

// systemPrompt = SYSTEM_PROMPT.replace(
//   "${topicsData}",
//   matchedTopic ? topics[matchedTopic] : Object.values(topics).join("\n\n")
// );
export type TopicsType = {
  ElevatorPitch: string;
  Skills: string;
  Education: string;
  Anime: string;
  Experience: string;
};

export function getSystemPrompt(prompt: string, topics: TopicsType, SYSTEM_PROMPT: string): string {
  const topicMatchMap: Record<string, keyof typeof topics> = {
    "who are you": "ElevatorPitch",
    "introduce yourself": "ElevatorPitch",
    skills: "Skills",
    react: "Skills",
    tech: "Skills",
    education: "Education",
    anime: "Anime",
    experience: "Experience",
    projects: "Experience",
  };

  const lowerPrompt = prompt.toLowerCase();
  const matchedKey = Object.keys(topicMatchMap)
    .sort((a, b) => b.length - a.length)
    .find((key) => lowerPrompt.includes(key));

  const matchedTopic = matchedKey ? topicMatchMap[matchedKey] : null;

  return SYSTEM_PROMPT.replace(
    "${topicsData}",
    matchedTopic ? topics[matchedTopic] : Object.values(topics).join("\n\n")
  );
}
