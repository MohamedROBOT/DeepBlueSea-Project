import axios from "axios";

export async function callGemini(question, setAnswer) {
  try {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY
      },
      data: {
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
      }
    });

    const reply = response.data.candidates[0].content.parts[0].text;
    setAnswer(reply.trim());
  } catch (error) {
    console.error("Error calling Gemini API:", error);
   
  }
}

export async function getRecommendations(setRecs) {
  try {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY
      },
      data: {
        contents: [
          {
            parts: [
              {
                text: `Suggest 3 short, engaging questions a user might ask about sharks or the ocean. 
Return only the questions .`
              }
            ]
          }
        ]
      }
    });

    const reply = response.data.candidates[0].content.parts[0].text;
    const recs = reply.split("\n").filter((r) => r.trim() !== "");
    setRecs(recs);
  } catch (error) {
    console.error("Error getting recommendations:", error);
    setRecs([
      "Why are sharks important to ocean ecosystems?",
      "Where are sharks most likely to appear this week?",
      "What do different shark species eat?"
    ]);
  }
}
