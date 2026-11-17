# ⚡ DSA Instructor AI – Your Personal DSA Learning Assistant

An AI-powered Data Structures and Algorithms learning assistant that helps students understand DSA concepts through simple explanations, step-by-step guidance, practical examples, and complexity analysis.

Built using **React, Node.js, Express.js, and Google Gemini AI**, this project aims to make learning DSA easier, more interactive, and accessible.

<p align="center">
  <a href="https://dsa-instructor-1-ahup.onrender.com/"><strong>Backend API</strong></a>
</p>

---

## 🌟 Overview

Learning Data Structures and Algorithms can be challenging, especially when concepts are explained using complex terminology.

**DSA Instructor AI** acts as a personal DSA mentor. Students can ask questions about Data Structures and Algorithms and receive AI-generated explanations in simple English.

The chatbot maintains conversation context while answering questions, helping learners understand concepts step by step.

## ✨ Features

- 🤖 **AI-Powered Learning:** Uses Google Gemini API to generate DSA explanations.
- 📚 **DSA-Focused Assistant:** Designed to answer Data Structures and Algorithms questions.
- 💡 **Simple Explanations:** Understand difficult concepts in beginner-friendly language.
- 🪜 **Step-by-Step Guidance:** Breaks down complex topics into smaller steps.
- 💻 **Code Explanation:** Supports line-by-line code explanations when requested.
- ⏱️ **Complexity Analysis:** Explains time and space complexity.
- 💬 **Conversation History:** Sends previous messages to maintain conversational context.
- ⚡ **Suggested Questions:** Provides quick-start DSA questions.
- 🔄 **New Chat:** Start a fresh conversation whenever needed.
- 🌐 **Live Deployment:** Frontend and backend hosted independently.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| Vite | Frontend development and build tool |
| JavaScript | Application logic |
| CSS3 | User interface styling |
| Node.js | Backend runtime |
| Express.js | REST API |
| Google Gemini API | AI-powered responses |
| @google/genai | Gemini integration |
| CORS | Cross-origin communication |
| Vercel | Frontend deployment |
| Render | Backend deployment |
| Git & GitHub | Version control |

## 🏗️ System Architecture

```text
              USER
                |
                v
       React + Vite Frontend
             (Vercel)
                |
                | HTTP POST
                | /api/chat
                v
       Node.js + Express
             (Render)
                |
                v
          Google Gemini
              API
                |
                v
        AI-Generated Answer
                |
                v
       React Chat Interface
                |
                v
              USER
```

## 📂 Project Structure

```text
DSA-Instructor/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ay340930-hue/DSA-Instructor.git
```

Navigate into the project:

```bash
cd DSA-Instructor
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_available_gemini_model
```

Get your API key from [Google AI Studio](https://aistudio.google.com/).

Start the backend:

```bash
npm start
```

The backend will run locally at:

```text
http://localhost:4000
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:4000
```

Start the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:5173
```

## 🔌 API Documentation

### Chat Endpoint

| Property | Value |
|---|---|
| Endpoint | `/api/chat` |
| Method | `POST` |
| Content-Type | `application/json` |

**Request Body:**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Explain Binary Search"
    }
  ]
}
```

**Successful Response:**

```json
{
  "reply": "Binary Search is an efficient searching algorithm..."
}
```

### Health Check

| Property | Value |
|---|---|
| Endpoint | `/` |
| Method | `GET` |

Returns a message confirming that the backend API is running.

## 🔐 Environment Variables

Never expose your Gemini API key in frontend code or commit it to GitHub.

### Backend

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key |
| `GEMINI_MODEL` | Gemini model available to your API key |
| `FRONTEND_URL` | Allowed frontend origin for CORS |
| `PORT` | Port assigned by the hosting platform |

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

## 🚀 Deployment

The application is deployed using separate frontend and backend hosting services.

**Frontend – Vercel**

- Platform: Vercel
- Framework: React + Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable: `VITE_API_URL`

**Backend – Render**

- Platform: Render
- Runtime: Node.js
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `GEMINI_API_KEY`, `GEMINI_MODEL`, `FRONTEND_URL`

**Live Backend:**  
https://dsa-instructor-1-ahup.onrender.com

**Live Frontend:**  
https://dsa-instructor-five-sable.vercel.app

## 🧠 How It Works

1. The user enters a DSA question in the React chat interface.
2. React stores the conversation messages.
3. The frontend sends the conversation to the Express backend.
4. Express converts messages into Gemini-compatible conversation format.
5. The Gemini API processes the request using the DSA Instructor system instructions.
6. The backend sends the generated response to the frontend.
7. React displays the answer in the chat interface.

## 🔮 Future Improvements

- [ ] Add user authentication and personalized learning profiles.
- [ ] Add dedicated DSA topic-wise learning paths.
- [ ] Add interactive coding challenges.
- [ ] Add code execution and testing functionality.
- [ ] Add progress tracking and learning analytics.
- [ ] Add quizzes and practice problems.
- [ ] Add support for multiple programming languages.
- [ ] Improve AI response formatting with syntax highlighting and Markdown rendering.

## 🎯 Learning Outcomes

Through this project, I explored and practiced:

- Building a full-stack application using React and Node.js.
- Creating REST APIs using Express.js.
- Integrating Google Gemini AI into a backend application.
- Managing conversation history between frontend and backend.
- Handling API requests, responses, and errors.
- Configuring CORS and environment variables.
- Deploying a frontend and backend independently.
- Connecting independently hosted services.

## 👩‍💻 Author

**Anshika Yadav**

B.Tech Computer Science Engineering Student

- GitHub: [@ay340930-hue](https://github.com/ay340930-hue)

---

## ⭐ Support

If you find this project interesting or useful, consider giving this repository a ⭐ on GitHub!

**Built with ⚡ and a passion for learning DSA.**
