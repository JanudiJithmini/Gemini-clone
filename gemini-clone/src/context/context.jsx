import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]); // ⭐ store sidebar prompts

  // -------------------- Formatting --------------------
  const formatResponse = (text) => {
    let formatted = text;

    formatted = formatted.replace(/^### (.*)$/gim, "<h4>$1</h4>");
    formatted = formatted.replace(/^## (.*)$/gim, "<h3>$1</h3>");
    formatted = formatted.replace(/^# (.*)$/gim, "<h2>$1</h2>");
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    formatted = formatted.replace(/^\d+\.\s+(.*)$/gim, "<li>$1</li>");
    formatted = formatted.replace(/^\*\s+(.*)$/gim, "<ul><li>$1</li></ul>");
    formatted = formatted.replace(/\n/g, "<br/>");

    return formatted.trim();
  };

  // -------------------- Typing Effect --------------------
  const typingEffect = (formattedText) => {
    setResultData("");
    let idx = 0;

    const type = () => {
      if (idx < formattedText.length) {
        setResultData((prev) => prev + formattedText[idx]);
        idx++;
        setTimeout(type, 7);
      }
    };

    type();
  };

  // -------------------- Send Message --------------------
  const onSent = async (prompt) => {
    if (!prompt.trim()) return;

    setLoading(true);
    setShowResults(true);
    setRecentPrompts(prompt);
    setResultData("");

    // ⭐ Save prompt in sidebar list
    setPrevPrompts((prev) => [prompt, ...prev]); 

    try {
      setMessages((prev) => [...prev, { role: "user", text: prompt }]);

      const reply = await runChat(prompt);
      console.log("Gemini reply:", reply);

      const beautified = formatResponse(reply);
      typingEffect(beautified);

      setMessages((prev) => [...prev, { role: "model", text: reply }]);

    } catch (error) {
      console.error("Error calling Gemini:", error);
      setResultData("Error fetching response.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // -------------------- Provide to App --------------------
  const contextValue = {
    input,
    setInput,
    messages,
    onSent,
    loading,
    resultData,
    showResults,
    recentPrompts,
    prevPrompts,        // ⭐ added
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
