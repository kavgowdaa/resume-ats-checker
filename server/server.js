import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔥 fallback AI (IMPORTANT if quota fails)
const fallbackResponse = (text) => {
  return {
    score: 75,
    status: "Good 👍",
    suggestions: [
      "Add more quantified achievements",
      "Improve project descriptions",
      "Include more ATS keywords"
    ],
    strengths: ["Clear structure", "Has projects"],
    weaknesses: ["Needs more detail"],
  };
};

app.post("/api/analyze", async (req, res) => {
  try {
    console.log("REQUEST RECEIVED");

    const text = req.body.text;

    if (!text || text.trim() === "") {
      return res.json({
        score: 0,
        status: "Empty resume",
        suggestions: ["Paste resume first"],
        strengths: [],
        weaknesses: []
      });
    }

    // If OpenAI fails, fallback will still work
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Return ONLY JSON with score, status, suggestions, strengths, weaknesses"
          },
          {
            role: "user",
            content: text
          }
        ]
      });

      const aiText = response.choices[0].message.content;

      const json = JSON.parse(aiText);
      return res.json(json);

    } catch (aiError) {
      console.log("AI failed, using fallback:", aiError.message);

      return res.json({
        score: 72,
        status: "Good Resume (Fallback Mode)",
        suggestions: ["Improve keywords", "Add achievements"],
        strengths: ["Good structure"],
        weaknesses: ["Needs more detail"]
      });
    }

  } catch (err) {
    console.log("Server error:", err.message);

    return res.json({
      score: 50,
      status: "Server Error Fallback",
      suggestions: [],
      strengths: [],
      weaknesses: []
    });
  }
});