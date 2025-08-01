const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message, mood } = req.body;

    // Construct a dynamic prompt based on user input + mood
    let prompt = `The user is feeling "${mood}". Respond in a short, friendly way. `;

    // If user says yes → give mood-specific tips
    if (message.toLowerCase() === "yes") {
      prompt += `Provide actionable tips to help someone feeling ${mood}.`;
    }
    // If user says no → politely acknowledge
    else if (message.toLowerCase() === "no") {
      prompt += `Acknowledge politely and reassure them they can ask for tips anytime.`;
    }
    // General message → respond conversationally
    else {
      prompt += `The user says: "${message}". Respond empathetically and offer brief helpful suggestions if appropriate.`;
    }

    const completion = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    res.json({ reply: completion.output_text });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
});

module.exports = router;
