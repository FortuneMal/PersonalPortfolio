import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("project")) {
      setTimeout(() => navigate("/projects"), 1500);
      return "Fortune has built several projects including web applications, cloud infrastructure, and DevOps pipelines. I'm taking you to the Projects page now! 🚀";
    }

    if (lowerMessage.includes("certificate") || lowerMessage.includes("certification")) {
      setTimeout(() => navigate("/certificates"), 1500);
      return "Fortune has earned multiple certifications in cloud computing and software development. Let me show you the Certificates page! 📜";
    }

    if (lowerMessage.includes("resume") || lowerMessage.includes("cv") || lowerMessage.includes("download")) {
      setTimeout(() => navigate("/resume"), 1500);
      return "You can view and download Fortune's complete CV on the Resume page. Taking you there now! 📄";
    }

    if (lowerMessage.includes("skill") || lowerMessage.includes("language") || lowerMessage.includes("tech")) {
      setTimeout(() => navigate("/languages"), 1500);
      return "Fortune is skilled in JavaScript, TypeScript, Python, Go, and various cloud platforms. Check out the Skills page for more details! 💻";
    }

    if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
      return "You can reach Fortune via email at fortune@example.com, on GitHub, or LinkedIn. Check the Contact section on the homepage! 📧";
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! 👋 How can I help you today? You can ask me about Fortune's projects, certificates, skills, or how to download the resume.";
    }

    if (lowerMessage.includes("about") || lowerMessage.includes("who")) {
      return "Fortune Malaza is an aspiring Software & Cloud Engineer who started their journey at ALX Africa. Passionate about learning, creating, and connecting with people! 🌟";
    }

    return "I can help you with:\n• Projects Fortune has built\n• Certificates and certifications\n• Skills and technologies\n• Downloading the resume\n• Contact information\n\nJust ask! 😊";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const response = getResponse(input);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-glow shadow-lg"
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[450px] flex flex-col border-border bg-card/95 backdrop-blur-lg shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="p-4 border-b border-border bg-primary/10 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/20">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Portfolio Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    message.role === "user"
                      ? "bg-primary/20"
                      : "bg-secondary"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-primary" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about projects, skills..."
                className="flex-1 bg-secondary/50 border-border focus:border-primary"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
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
