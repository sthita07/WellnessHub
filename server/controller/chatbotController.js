const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getChatbotResponse = async (req, res) => {
  try {
    const { message, mood } = req.body;

    // Enhanced prompt for mood-aware and unique responses
    const prompt = `You are a caring wellness assistant. 
The user feels "${mood}" and said: "${message}". 
Give 3 specific, varied, and encouraging suggestions tailored to their mood. 
Include actionable steps (like breathing, journaling, exercise, positive affirmations) 
and avoid repeating the same tips every time.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8, // More creative/varied output
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Failed to get chatbot response" });
  }
};

module.exports = { getChatbotResponse };
