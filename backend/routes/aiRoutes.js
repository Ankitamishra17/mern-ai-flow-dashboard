require("dotenv").config();

const express = require("express");
const router = express.Router();
const axios = require("axios");
const Prompt = require("../models/Prompt");

router.post("/ask-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Flow App",
        },
      },
    );

    const aiText = response.data.choices[0].message.content;

    res.json({
      success: true,
      response: aiText,
    });
  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res.status(400).json({
        success: false,
        message: "Prompt and response are required",
      });
    }

    const newPrompt = new Prompt({
      prompt,
      response,
    });

    await newPrompt.save();

    res.json({
      success: true,
      message: "Saved successfully",
    });
  } catch (error) {
    console.error("SAVE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Save failed",
    });
  }
});

module.exports = router;
