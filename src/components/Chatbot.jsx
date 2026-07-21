import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modelName, setModelName] = useState("llama-3.3-70b-versatile");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Greetings! I'm Fortune's AI assistant. Ask me about projects, certificates, or how to download the resume!",
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
          const hasDefault = data.data.some((m) => m.id === "llama-3.3-70b-versatile");
          if (!hasDefault && data.data.length > 0) {
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
              content: `You are Fortune Malaza's AI Assistant. Your goal is to provide brief, engaging summaries about Fortune's background, projects, skills, and experience when users ask. 
              
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
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-primary/50 bg-background/80 backdrop-blur-md overflow-hidden"
          size="icon"
        >
          {/* Glowing animated background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 animate-spin-slow"></div>
          <div className="relative z-10 text-primary">
            {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
          </div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
            className="fixed bottom-28 right-6 z-50 w-80 sm:w-96"
          >
            <Card className="h-[500px] flex flex-col bg-card/60 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-border/50 rounded-2xl overflow-hidden">
              
              {/* Header */}
              <div className="p-4 border-b border-border/50 bg-background/40 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px]"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="p-2 rounded-full bg-primary/10 border border-primary/30 relative">
                    <Bot className="w-6 h-6 text-primary" />
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      Fortune AI <Sparkles className="w-4 h-4 text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">Online // {modelName.split("-")[0]}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground relative z-10">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 relative scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                {messages.map((message, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border ${
                        message.role === "user" 
                          ? "bg-secondary/50 border-border/50" 
                          : "bg-primary/10 border-primary/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] p-3 text-sm leading-relaxed rounded-2xl ${
                        message.role === "user"
                          ? "bg-secondary text-foreground rounded-tr-sm border border-border/50"
                          : "bg-primary/10 text-foreground rounded-tl-sm border border-primary/20 backdrop-blur-sm"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 border border-primary/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    </div>
                    <div className="bg-primary/5 border border-primary/10 p-3 rounded-2xl rounded-tl-sm text-xs text-primary font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border/50 bg-background/40">
                <div className="flex gap-2 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Initialize query..."
                    disabled={isLoading}
                    className="flex-1 bg-card/50 border-border/50 focus-visible:ring-primary/50 font-mono text-sm pl-4 pr-12 h-12 rounded-xl"
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={isLoading || !input.trim()}
                    className="absolute right-1 top-1 h-10 w-10 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    size="icon"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;