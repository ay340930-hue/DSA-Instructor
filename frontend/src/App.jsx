
import { useState } from "react";
import "./App.css";

function App() {
    // Store current input
    const [question, setQuestion] = useState("");

    // Store complete conversation
    const [messages, setMessages] = useState([]);

    // Track API loading status
    const [loading, setLoading] = useState(false);

    // Backend URL from environment variable
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

    // Send message to Gemini backend
    const sendMessage = async () => {
        if (!question.trim() || loading) return;

        const userQuestion = question.trim();

        // Add user's question to conversation
        const updatedMessages = [
            ...messages,
            {
                role: "user",
                text: userQuestion
            }
        ];

        setMessages(updatedMessages);
        setQuestion("");
        setLoading(true);

        try {
            // Send complete conversation to backend
            const response = await fetch(`${API_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: updatedMessages.map((msg) => ({
                        role: msg.role,
                        content: msg.text
                    }))
                })
            });

            // Parse backend response safely
            const data = await response.json();

            // Handle backend errors
            if (!response.ok) {
                throw new Error(
                    data.error || "Something went wrong."
                );
            }

            // Check Gemini response
            if (!data.reply) {
                throw new Error("Gemini returned an empty response.");
            }

            // Add Gemini's response
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: data.reply
                }
            ]);

        } catch (error) {
            console.error("Chat Error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: error.message || "Unable to connect to the server."
                }
            ]);

        } finally {
            setLoading(false);
        }
    };

    // Start a new conversation
    const newChat = () => {
        setMessages([]);
        setQuestion("");
    };

    // Handle Enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Suggested DSA questions
    const suggestions = [
        "What is an Array?",
        "Explain Binary Search",
        "What is Time Complexity?",
        "Explain Linked List"
    ];

    return (
        <div className="app">

            {/* SIDEBAR */}
            <aside className="sidebar">

                <h2>⚡ DSA Instructor</h2>

                <button
                    className="new-chat"
                    onClick={newChat}
                >
                    + New Chat
                </button>

                <div className="sidebar-info">
                    <h4>LEARN DSA</h4>

                    <p>Arrays</p>
                    <p>Strings</p>
                    <p>Linked Lists</p>
                    <p>Stacks & Queues</p>
                    <p>Trees & Graphs</p>
                    <p>Dynamic Programming</p>
                </div>

                <div className="sidebar-footer">
                    Powered by Gemini AI
                </div>

            </aside>

            {/* MAIN CHAT */}
            <main className="chat-container">

                {/* TOP NAVBAR */}
                <header className="topbar">

                    <div>
                        <h3>DSA Learning Assistant</h3>
                        <span>Your personal DSA mentor</span>
                    </div>

                    <span className="status">
                        ● Online
                    </span>

                </header>

                {/* MESSAGES */}
                <section className="messages">

                    {/* WELCOME SCREEN */}
                    {messages.length === 0 && (

                        <div className="welcome">

                            <div className="welcome-icon">
                                ⚡
                            </div>

                            <h1>Master DSA with AI</h1>

                            <p>
                                Ask any Data Structures and
                                Algorithms question.
                                Let's solve it together!
                            </p>

                            {/* SUGGESTED QUESTIONS */}
                            <div className="suggestions">

                                {suggestions.map((item, index) => (

                                    <button
                                        key={index}
                                        onClick={() => setQuestion(item)}
                                    >
                                        {item} →
                                    </button>

                                ))}

                            </div>

                        </div>

                    )}

                    {/* CONVERSATION MESSAGES */}
                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`message ${msg.role}`}
                        >

                            <div className="avatar">
                                {msg.role === "user" ? "👤" : "⚡"}
                            </div>

                            <div className="message-content">

                                <strong>
                                    {msg.role === "user"
                                        ? "You"
                                        : "DSA Instructor"}
                                </strong>

                                <p>{msg.text}</p>

                            </div>

                        </div>

                    ))}

                    {/* LOADING INDICATOR */}
                    {loading && (
                        <div className="typing">
                            ⚡ DSA Instructor is thinking...
                        </div>
                    )}

                </section>

                {/* INPUT AREA */}
                <div className="input-area">

                    <div className="input-box">

                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask your DSA question..."
                            rows="1"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading || !question.trim()}
                        >
                            ↑
                        </button>

                    </div>

                    <p>
                        AI can make mistakes. Verify important solutions.
                    </p>

                </div>

            </main>

        </div>
    );
}

export default App;
