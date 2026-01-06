import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API (Ensure your API key is in your .env file)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Fortune's portfolio assistant. Ask me about projects, certificates, or how to download the resume!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper to trigger navigation based on AI response keywords
  const handleNavigation = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("/projects")) navigate("/projects");
    if (lowerText.includes("/certificates")) navigate("/certificates");
    if (lowerText.includes("/resume")) navigate("/resume");
    if (lowerText.includes("/languages")) navigate("/languages");
  };

const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setIsLoading(true);

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Use 1.5 Flash for stability and speed
      systemInstruction: "You are Fortune Malaza's Portfolio Assistant. Help users navigate. If they ask for projects, use the word /projects; for certificates, use /certificates; for resume, use /resume."
    });

    // We filter the history to ensure it ALWAYS starts with a 'user' message
    const history = messages
      .filter((msg, index) => index !== 0) // Skip the hardcoded greeting
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model", // API uses 'model' instead of 'assistant'
        parts: [{ text: msg.content }],
      }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(input);
    const responseText = await result.response.text();

    setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
    setTimeout(() => handleNavigation(responseText), 1000);

  } catch (error) {
    console.error("Gemini Error:", error);
    setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I hit a snag. Try again?" }]);
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
              <p className="text-xs text-muted-foreground">Online & Intelligent</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`p-2 h-8 w-8 rounded-full flex items-center justify-center ${message.role === "user" ? "bg-primary/20" : "bg-secondary"}`}>
                  {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                </div>
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
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
                  Fortune AI is thinking...
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