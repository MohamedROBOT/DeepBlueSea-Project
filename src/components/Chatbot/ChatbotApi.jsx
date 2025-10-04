import axios from "axios";

// List all your Gemini API keys
const GEMINI_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY_1,
  import.meta.env.VITE_GEMINI_API_KEY_2,
  import.meta.env.VITE_GEMINI_API_KEY_3
];

let currentKeyIndex = 0;

// Get current key
const getCurrentKey = () => GEMINI_KEYS[currentKeyIndex];

// Switch to next key
const switchKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % GEMINI_KEYS.length;
  console.warn("Switching Gemini API key to:", GEMINI_KEYS[currentKeyIndex]);
};

// Generic function to call Gemini API with retry logic
const callGeminiApi = async (payload) => {
  for (let i = 0; i < GEMINI_KEYS.length; i++) {
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": getCurrentKey()
        },
        data: payload
      });
      return response.data;
    } catch (error) {
      console.error("Gemini API key failed:", getCurrentKey(), error.message);
      switchKey(); // try next key
    }
  }
  throw new Error("All Gemini API keys failed.");
};

// Chatbot call function
export async function callGemini(question, setAnswer) {
  const payload = {
    contents: [
      {
        parts: [
          {
            text: `You are an expert chatbot that ONLY answers questions related to:
- Sharks
- The ocean
- Marine life
- You can use expressions and greet people in different ways
- You can use emojis for fun

If the question is NOT related to sharks or the ocean, respond in creative ways that you only know about oceans and sharks.
If someone insults you, wish that they get eaten by a shark soon with flirting emojis.

User's question: ${question}`
          }
        ]
      }
    ]
  };

  try {
    const data = await callGeminiApi(payload);
    const reply = data.candidates[0].content.parts[0].text;
    setAnswer(reply.trim());
  } catch (error) {
    console.error("All keys failed in callGemini:", error);
    setAnswer("Sorry, I'm having trouble connecting to the API right now. Please try again later.");
  }
}

// Recommendation function
export async function getRecommendations(setRecs) {
  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Suggest 3 short, engaging questions a user might ask about sharks or the ocean. 
Return only the questions do not number or listing them.`
          }
        ]
      }
    ]
  };

  try {
    const data = await callGeminiApi(payload);
    const reply = data.candidates[0].content.parts[0].text;
    const recs = reply.split("\n").filter((r) => r.trim() !== "");
    setRecs(recs);
  } catch (error) {
    console.error("All keys failed in getRecommendations:", error);
    setRecs([
      "Why are sharks important to ocean ecosystems?",
      "Where are sharks most likely to appear this week?",
      "What do different shark species eat?"
    ]);
  }
}
