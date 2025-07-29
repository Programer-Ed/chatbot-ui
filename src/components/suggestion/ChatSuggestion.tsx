"use client";

import React from "react";
import "./ChatSuggestions.css"; // Import the CSS we define below

const suggestions = [
  { label: "🛠 Skills", prompt: "What are your skills?" },
  { label: "📚 Education", prompt: "what is your education?" },
  { label: "💡 Projects", prompt: "What projects have you worked on?" },
  { label: "🎴 Anime", prompt: "what can you tell me about anime?" },
  { label: "🚀 Elevator Pitch", prompt: "Give me your elevator pitch." },
];

export function ChatSuggestions({ onSend }: { onSend: (msg: string) => void }) {
  return (
    <div className="suggestions-container">
      {suggestions.map((s) => (
        <button
          key={s.label}
          onClick={() => onSend(s.prompt)}
          className="suggestion-button"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
