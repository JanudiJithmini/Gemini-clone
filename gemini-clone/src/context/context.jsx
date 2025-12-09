import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recentPrompts, setRecentPrompts] = useState(""); // Added this

  const onSent = async (prompt) => {
    if (!prompt.trim()) return;

    setLoading(true);
    setShowResults(true);
    setRecentPrompts(prompt); // Save the latest prompt
    setResultData("");

    try {
      // Add user's message to chat
      setMessages((prev) => [...prev, { role: "user", text: prompt }]);

      // Send prompt to Gemini
      const reply = await runChat(prompt);

      // Add Gemini's response to chat
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
      setResultData(reply);

      // Log response in console
      console.log("Gemini reply:", reply);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Error fetching response." },
      ]);
      setResultData("Error fetching response.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    input,
    setInput,
    messages,
    onSent,
    loading,
    resultData,
    showResults,
    recentPrompts,       // Added to context
    setRecentPrompts,    // Added to context
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
