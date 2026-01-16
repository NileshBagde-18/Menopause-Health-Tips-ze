"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  )
}

const formatMessage = (text: string) => {
  const lines = text.split("\n")
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, index) => {
        if (line.trim().startsWith("•")) {
          return (
            <div key={index} className="flex items-start gap-2.5 ml-2">
              <span className="text-primary font-semibold flex-shrink-0 mt-0.5">•</span>
              <span className="text-card-foreground">{line.trim().substring(1).trim()}</span>
            </div>
          )
        }
        if (line.includes("**")) {
          const parts = line.split("**")
          return (
            <div key={index} className={parts.length > 1 ? "font-semibold text-card-foreground mt-2.5 mb-1.5" : ""}>
              {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
            </div>
          )
        }
        if (line.trim() === "") return <div key={index} className="h-1.5" />
        return (
          <div key={index} className="text-card-foreground">
            {line}
          </div>
        )
      })}
    </div>
  )
}

export function AskEmpressTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Empress. How can I help with your wellness today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const suggestedQuestions = ["Hot flash tips?", "Sleep advice?", "Best supplements?"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
        signal: AbortSignal.timeout(10000),
      })

      if (!response.ok) throw new Error("API error")

      const data = await response.text()
      const typingDuration = Math.min(Math.max(3000, data.length * 30), 8000)

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data,
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)
      }, typingDuration)
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm here to help. Can you rephrase that?",
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3.5 flex flex-col">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex animate-slide-up ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2.5 rounded-xl premium-transition ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-card-foreground shadow-sm"
              }`}
            >
              {formatMessage(message.content)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-slide-up">
            <div className="bg-card border border-border px-4 py-3 rounded-xl shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>

      <div className="px-3 py-4 border-t border-border bg-background">
        {messages.length === 1 && !isTyping && (
          <div className="grid grid-cols-1 gap-2 mb-4">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-left text-xs font-medium p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border premium-transition"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isTyping ? "Empress is typing..." : "Ask me anything..."}
            disabled={isLoading || isTyping}
            className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm bg-card text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background disabled:bg-muted premium-transition"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading || isTyping}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 p-0 rounded-xl premium-transition shadow-sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
