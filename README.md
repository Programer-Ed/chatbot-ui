# 🤖 Edwin’s Chatbot

> **A responsive, topic-based chatbot UI built with React + CSS, ready for integration with AI APIs.**


## 📋 Description

This project is a sleek and modern chatbot UI built in **React**, styled with pure **CSS**, and designed to be **responsive** & **accessible**.
It supports a topic-based conversation model where the bot suggests topics and responds with predefined or dynamic answers.

Features:

* ✨ Clean and minimalist design
* 📱 Fully responsive (desktop & mobile)
* 🤝 Topic-based prompt system (Anime, Skills, Experience, etc.)
* 🧑‍💻 Easily pluggable with any backend or LLM API
* 🪄 Smooth opening/closing animation & scrollable chat history

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Node.js (v16+ recommended)
* npm or yarn

### 📦 Installation

```bash
git clone https://github.com/your-username/chatbot-ui.git
cd chatbot-ui
npm install
```

### 🖥️ Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧰 Project Structure

```
src/
├── components/
│   ├── ChatbotIcon.jsx
│   ├── ChatForm.jsx
│   └── ChatMessage.jsx
├── topicInfo.js
├── App.jsx
├── index.css
└── main.jsx
```

* `topicInfo.js` → defines the available topics & their responses
* `ChatForm` → handles user input
* `ChatMessage` → renders messages
* `ChatbotIcon` → renders the chatbot avatar

---

## 🎨 Customization

✅ To change the topics:
Edit `src/topicInfo.js` and add/remove topics as desired.

✅ To change colors & theme:
Tweak `index.css` — key variables are in `.chat-header`, `.chat-body`, `.chat-footer`, etc.

✅ To plug in an API:
Hook up your preferred AI backend by updating `generateBotResponse()` in `App.jsx`.


## 👨‍💻 Author

Built with ❤️ by [Edwin](https://github.com/Programer-Ed)

> *“Like a hero in training, I write every line of code like it could change the world.”*

---

## 🪪 License

MIT License

---

If you’d like, I can also cook a **CONTRIBUTING.md** or help you write a short deploy guide for Vercel/Netlify.
Just say: *“hook me up with deploy docs”* 🚀
