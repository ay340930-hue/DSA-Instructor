
import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

// ================= MIDDLEWARE =================

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ].filter(Boolean)
}));

app.use(express.json());

// ================= GEMINI CONFIGURATION =================

if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is missing from environment variables.");
    process.exit(1);
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

// ================= SYSTEM INSTRUCTION =================

const SYSTEM_INSTRUCTION = `
You are a professional DSA Instructor.

Rules:
1. Answer only Data Structures and Algorithms questions.
2. Explain concepts in simple English.
3. Give step-by-step explanations.
4. Include examples wherever useful.
5. Explain code line by line when requested.
6. Include time and space complexity.
7. For unrelated questions, politely remind the user
   that you are a DSA-only instructor.
`;

// ================= CHAT API =================

app.post("/api/chat", async (req, res) => {

    try {
        const { messages } = req.body;

        // Validate messages
        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: "Please provide a question."
            });
        }

        // Validate individual messages
        const validMessages = messages.every((message) =>
            message &&
            ["user", "bot"].includes(message.role) &&
            typeof message.content === "string" &&
            message.content.trim().length > 0
        );

        if (!validMessages) {
            return res.status(400).json({
                error: "Invalid message format."
            });
        }

        // Convert conversation into Gemini format
        const contents = messages.map((message) => ({
            role: message.role === "bot" ? "model" : "user",
            parts: [
                {
                    text: message.content
                }
            ]
        }));

        // Generate Gemini response
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION
            }
        });

        if (!response.text) {
            return res.status(502).json({
                error: "Gemini returned an empty response. Please try again."
            });
        }

        return res.json({
            reply: response.text
        });

    } catch (error) {

        console.error("Gemini Error:", error);

        const status = Number(error.status) || 500;

        if (status === 503 || status === 429) {
            return res.status(status).json({
                error: status === 503
                    ? "Gemini is temporarily busy. Please try again shortly."
                    : "Gemini request limit reached. Please try again later."
            });
        }

        if (status === 400 || status === 404) {
            return res.status(status).json({
                error: "Gemini rejected the request. Check your model name and request configuration."
            });
        }

        if (status === 401 || status === 403) {
            return res.status(status).json({
                error: "Gemini authentication failed. Check your API key."
            });
        }

        return res.status(500).json({
            error: "Something went wrong on the server."
        });
    }
});

// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
    res.json({
        message: "DSA Instructor API is running."
    });
});

// ================= SERVER =================

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`DSA Instructor running on port ${PORT}`);
    console.log(`Using Gemini model: ${MODEL_NAME}`);
});
