import { GoogleGenerativeAI } from "@google/generative-ai";

// Your API key
const genAI = new GoogleGenerativeAI("AIzaSyB9JcEHMm0ZqgRBAweOHzBhgeskcmb2E3c");

async function runChat(prompt) {
  // Use a currently supported model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",   // UPDATED MODEL NAME
  });

  // Start chat session
  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: "Hello!" }] },
      { role: "model", parts: [{ text: "Hi! How can I help you today?" }] },
    ],
  });

  // Send user's message
  const result = await chat.sendMessage(prompt);

  return result.response.text();
}

export default runChat;
