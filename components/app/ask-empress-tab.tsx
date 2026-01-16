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

// Typing animation component
const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  )
}

// Helper function to format text with basic markdown
const formatMessage = (text: string) => {
  const lines = text.split("\n")
  return (
    <div className="space-y-1 text-sm">
      {lines.map((line, index) => {
        if (line.trim().startsWith("•")) {
          return (
            <div key={index} className="flex items-start gap-2 ml-4">
              <span className="text-purple-500 font-bold">•</span>
              <span className="text-gray-700">{line.trim().substring(1).trim()}</span>
            </div>
          )
        }
        if (line.includes("**")) {
          const parts = line.split("**")
          return (
            <div key={index} className={parts.length > 1 ? "font-semibold text-gray-900 mt-2 mb-1" : ""}>
              {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
            </div>
          )
        }
        if (line.trim() === "") return <div key={index} className="h-2" />
        return (
          <div key={index} className="text-gray-700">
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

      const data = await response.json()
      const typingDuration = Math.min(Math.max(3000, data.response.length * 30), 8000)

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.response,
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
    <div className="flex flex-col h-full bg-white">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                message.role === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              {formatMessage(message.content)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-lg">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions or Input */}
      <div className="p-4 border-t border-gray-200">
        {messages.length === 1 && !isTyping && (
          <div className="grid grid-cols-1 gap-2 mb-4">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-left text-sm p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isTyping ? "Empress is typing..." : "Ask me anything..."}
            disabled={isLoading || isTyping}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-50"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading || isTyping}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 h-10 w-10 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
