import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const getAIAnalysis = async (message) => {
  if (!GROQ_API_KEY) return "AI analysis not available (missing API key)";

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "❌ Error with Groq AI:",
      error.response?.data || error.message
    );
    return "AI analysis failed";
  }
};

export default getAIAnalysis;
