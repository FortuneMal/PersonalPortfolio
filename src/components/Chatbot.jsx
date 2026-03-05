import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modelName, setModelName] = useState("llama-3.3-70b-versatile");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Fortune's portfolio assistant. Ask me about projects, certificates, or how to download the resume!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check available models (Optional for Groq, but we can verify API key works)
  useEffect(() => {
    if (!apiKey) return;
    const checkModels = async () => {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/models", {
          headers: {
            "Authorization": `Bearer ${apiKey}`
          }
        });
        const data = await response.json();

        if (data.data) {
          console.log("✅ AVAILABLE MODELS:", data.data.map((m) => m.id));
          const hasDefault = data.data.some((m) => m.id === "llama-3.3-70b-versatile");
          if (!hasDefault && data.data.length > 0) {
            console.warn("⚠️ Default model not found. Falling back to", data.data[0].id);
            setModelName(data.data[0].id);
          }
        }
      } catch (e) {
        console.error("Model check failed:", e);
      }
    };
    checkModels();
  }, [apiKey]);

  const handleNavigation = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("/projects")) navigate("/projects");
    if (lowerText.includes("/certificates")) navigate("/certificates");
    if (lowerText.includes("/resume")) navigate("/resume");
    if (lowerText.includes("/languages")) navigate("/languages");
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Error: VITE_GROQ_API_KEY missing in environment variables. Please add it and redeploy.",
        },
      ]);
      return;
    }

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            {
              role: "system",
              content: `You are Fortune Malaza's Portfolio Assistant. Your goal is to provide brief, engaging summaries about Fortune's background, projects, skills, and experience when users ask. 
              
              ABOUT FORTUNE:
              - Focuses on Cloud (AWS, IAM, Azure), AI & LLMs (Prompt Engineering, OpenAI APIs), DevOps (Git, CI/CD, Docker), Data (SQL, ETL), and Low-Code (Power Apps, Power BI).
              
              PROJECT HIGHLIGHTS:
              - BudgetEase: Full-stack personal finance app (React, MongoDB, Node.js).
              - MercuryAI: AI-powered portfolio assistant using Gemini API.
              - Eye-Spend: AI Expense Guardian predicting risk using Python, Streamlit, and Docker.
              - LifePulse: ML app for early heart disease detection.
              - SumAI: Cyberpunk-themed AI news analyst using Groq & Llama 3.
              
              INSTRUCTIONS: 
              Instead of just sending them to a page, briefly list a few relevant highlights or details first. Then, to help them see more details, seamlessly include the relevant navigation command in your response: use '/projects' for projects, '/certificates' for certificates, '/resume' for resume, and '/languages' for skills. Be friendly, concise, and professional.`,
            },
            ...newMessages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            }))
          ],
          max_tokens: 500,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "Unknown API Error");
      }

      const responseText = result.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: responseText },
      ]);
      setTimeout(() => handleNavigation(responseText), 1000);
    } catch (error) {
      console.error("Groq Critical Error:", error);
      let errorMsg = `Sorry, I hit a snag: ${error.message}`;
      if (error.message?.includes("404"))
        errorMsg = `Error: Model '${modelName}' not found.`;
      if (error.message?.includes("401") || error.message?.includes("key"))
        errorMsg = "Error: API Key is invalid or restricted.";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[450px] flex flex-col bg-card/95 backdrop-blur-lg shadow-2xl">
          <div className="p-4 border-b bg-primary/10 rounded-t-lg flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Fortune AI</h3>
              <p className="text-xs text-muted-foreground">Online • {modelName}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""
                  }`}
              >
                <div
                  className={`p-2 h-8 w-8 rounded-full flex items-center justify-center ${message.role === "user" ? "bg-primary/20" : "bg-secondary"
                    }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                    }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="p-2 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
                <div className="bg-secondary p-3 rounded-2xl text-xs text-muted-foreground italic">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" disabled={isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chatbot;