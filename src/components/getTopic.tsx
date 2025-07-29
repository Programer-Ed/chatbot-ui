const topicMatchMap = {
  "who are you": "Elevator-pitch",
  "introduce yourself": "Elevator-pitch",
  skills: "Skills",
  react: "Skills",
  tech: "Skills",
  education: "Education",
  anime: "Anime",
  experience: "Experience",
  projects: "Experience",
};

const lowerPrompt = prompt.toLowerCase();
let matchedKey = Object.keys(topicMatchMap).find(key => lowerPrompt.includes(key));

if (matchedKey) {
  const matchedTopic = topicMatchMap[matchedKey];
  systemPrompt = SYSTEM_PROMPT.replace("${topicsData}", topics[matchedTopic]);
} else {
  systemPrompt = SYSTEM_PROMPT.replace("${topicsData}", Object.values(topics).join("\n\n"));
}
