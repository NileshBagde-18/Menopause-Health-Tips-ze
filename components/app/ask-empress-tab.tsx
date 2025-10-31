"use client"

import type React from "react"
import { useState } from "react"
import { Send, Heart, Loader2 } from "lucide-react"

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
      <span className="text-sm text-gray-500">Empress is typing</span>
      <div className="flex gap-1 ml-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  )
}

// Helper function to format text with basic markdown
const formatMessage = (text: string) => {
  // Split text by lines to handle bullet points and formatting
  const lines = text.split("\n")
  const formattedLines = lines.map((line, index) => {
    // Handle bullet points
    if (line.trim().startsWith("•")) {
      return (
        <div key={index} className="flex items-start gap-2 ml-4">
          <span className="text-purple-500 font-bold">•</span>
          <span>{line.trim().substring(1).trim()}</span>
        </div>
      )
    }

    // Handle bold headers (text between **)
    if (line.includes("**")) {
      const parts = line.split("**")
      return (
        <div key={index} className={parts.length > 1 ? "font-semibold text-gray-900 mt-3 mb-1" : ""}>
          {parts.map((part, partIndex) => (partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part))}
        </div>
      )
    }

    // Handle empty lines
    if (line.trim() === "") {
      return <div key={index} className="h-2" />
    }

    // Regular text
    return <div key={index}>{line}</div>
  })

  return <div className="space-y-1">{formattedLines}</div>
}

export function AskEmpressTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm Empress, your personal menopause wellness companion. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const suggestedQuestions = [
    "How can I manage hot flashes naturally?",
    "What supplements are best for menopause?",
    "I'm having trouble sleeping, any tips?",
    "How do I talk to my doctor about HRT?",
  ]

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  // Fallback responses for when API fails
  const getFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hot flash") || message.includes("hot flashes")) {
      return `Hot flashes can be really challenging! Here are some strategies that many women find helpful:

**Immediate relief:**
• Try deep, slow breathing when you feel one starting
• Keep a small fan or cooling towel nearby
• Dress in layers so you can adjust easily

**Lifestyle changes:**
• Stay well-hydrated throughout the day
• Limit spicy foods, caffeine, and alcohol
• Consider natural supplements like black cohosh or evening primrose oil

Remember, if hot flashes are significantly impacting your quality of life, it's worth discussing treatment options with your healthcare provider.`
    }

    if (message.includes("sleep") || message.includes("insomnia") || message.includes("tired")) {
      return `Sleep challenges during menopause are so common - you're not alone! Here are some approaches that can help:

**Sleep environment:**
• Keep your bedroom cool (around 65-68°F)
• Use breathable, moisture-wicking bedding
• Consider a white noise machine

**Natural sleep aids:**
• Magnesium supplements (200-400mg before bed)
• Chamomile tea or valerian root
• Try gentle yoga or meditation before sleep

**Sleep hygiene:**
• Establish a consistent bedtime routine
• Avoid screens 1 hour before bed
• No caffeine after 2 PM

If sleep issues persist, don't hesitate to discuss options like melatonin with your healthcare provider.`
    }

    if (message.includes("supplement") || message.includes("vitamin")) {
      return `Here are some supplements that research suggests may help with menopause symptoms:

**For general support:**
• Vitamin D3 (1000-2000 IU daily) - crucial for bone health
• Omega-3 fatty acids - may help with mood and inflammation
• Calcium with magnesium - for bone health and muscle relaxation

**For specific symptoms:**
• Black cohosh - may help reduce hot flashes
• Evening primrose oil - for hormonal balance
• Probiotics - support digestive and overall health

**Important reminders:**
Always consult your healthcare provider before starting new supplements, especially if you take medications. Quality matters - look for third-party tested products.`
    }

    if (
      message.includes("mood") ||
      message.includes("anxiety") ||
      message.includes("depression") ||
      message.includes("emotional")
    ) {
      return `Mood changes during menopause are incredibly common and completely valid. Here's what can help:

**Natural mood support:**
• Regular exercise releases mood-boosting endorphins
• Omega-3 fatty acids may help with emotional balance
• B-complex vitamins support nervous system health
• Mindfulness or meditation practices

**Lifestyle strategies:**
• Maintain social connections - isolation can worsen mood symptoms
• Prioritize sleep - poor sleep directly impacts emotional regulation
• Limit alcohol, which can worsen anxiety and depression
• Consider journaling to process your feelings

If you're experiencing persistent sadness, anxiety, or thoughts of self-harm, please reach out to your healthcare provider or a mental health professional immediately. You deserve support!`
    }

    if (message.includes("weight") || message.includes("metabolism") || message.includes("belly")) {
      return `Weight changes during menopause are so frustrating but very common due to hormonal shifts. Here's how to approach this:

**Understanding the changes:**
• Estrogen decline can shift fat storage to the midsection
• Metabolism naturally slows with age
• Muscle mass tends to decrease, affecting calorie burning

**Effective strategies:**
• Focus on strength training to maintain muscle mass
• Include protein at every meal (aim for 25-30g)
• Choose whole foods over processed options
• Stay hydrated - sometimes thirst feels like hunger

**Mindset shift:**
Focus on how you feel and your overall health rather than just the scale. Building sustainable healthy habits is more valuable than quick fixes.`
    }

    if (message.includes("exercise") || message.includes("workout") || message.includes("fitness")) {
      return `Exercise is one of the most powerful tools for managing menopause symptoms! Here's how to approach it:

**Best types for menopause:**
• Strength training - helps maintain bone density and muscle mass
• Low-impact cardio - walking, swimming, cycling
• Flexibility work - yoga or stretching for joint health
• Balance exercises - important for preventing falls

**Getting started safely:**
• Start slowly if you're new to exercise
• Listen to your body - energy levels can vary day to day
• Consider working with a trainer familiar with menopause
• Mix different activities to stay engaged

**Timing tips:**
• Morning exercise can boost energy for the day
• Avoid intense workouts close to bedtime if you have sleep issues
• Exercise can actually help regulate body temperature and reduce hot flashes!`
    }

    if (message.includes("hrt") || message.includes("hormone replacement") || message.includes("hormones")) {
      return `Hormone Replacement Therapy is an important decision to discuss with your healthcare provider. Here's how to prepare:

**Questions for your doctor:**
• What are the benefits and risks for my specific situation?
• What types of HRT are available (pills, patches, gels)?
• How long would I need to take it?
• What are the alternatives?

**What your doctor will consider:**
• Your age and time since menopause began
• Your symptom severity and impact on quality of life
• Your personal and family medical history
• Your preferences and concerns

**Preparation tips:**
• Keep a symptom diary for a few weeks before your appointment
• List all medications and supplements you're taking
• Write down your questions beforehand

Remember, this decision is very personal and should be made with your healthcare team based on your individual circumstances.`
    }

    // Default response
    return `Thank you for reaching out! I'm here to support you through your menopause journey.

I can help you with information about:
• Managing symptoms like hot flashes, sleep issues, and mood changes
• Nutrition and supplement guidance
• Exercise recommendations
• Discussing treatment options with your healthcare provider
• Emotional support and coping strategies

What specific aspect of menopause would you like to explore today? Remember, every woman's experience is unique, and I'm here to help you find approaches that work best for you.`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input.trim()
    setInput("")
    setIsLoading(true)
    setIsTyping(true)

    // Show typing indicator for at least 3 seconds
    const typingStartTime = Date.now()
    const minTypingDuration = 3000 // 3 seconds

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    }

    // Add empty assistant message to show typing indicator
    setMessages((prev) => [...prev, assistantMessage])

    try {
      // Try API call with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Get the response content
      let responseContent = ""
      const contentType = response.headers.get("content-type")

      if (contentType?.includes("text/plain")) {
        responseContent = await response.text()
      } else {
        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (reader) {
          try {
            while (true) {
              const { done, value } = await reader.read()
              if (done) break

              const chunk = decoder.decode(value, { stream: true })
              const lines = chunk.split("\n")

              for (const line of lines) {
                if (!line.trim()) continue

                try {
                  let textContent = ""

                  if (line.startsWith("0:")) {
                    const data = JSON.parse(line.slice(2))
                    if (data.type === "text-delta" && data.textDelta) {
                      textContent = data.textDelta
                    }
                  } else if (line.startsWith("data: ")) {
                    const jsonStr = line.slice(6)
                    if (jsonStr === "[DONE]") break
                    const data = JSON.parse(jsonStr)
                    if (data.choices && data.choices[0]?.delta?.content) {
                      textContent = data.choices[0].delta.content
                    }
                  } else {
                    const data = JSON.parse(line)
                    if (data.type === "text-delta" && data.textDelta) {
                      textContent = data.textDelta
                    } else if (data.content) {
                      textContent = data.content
                    }
                  }

                  if (textContent) {
                    responseContent += textContent
                  }
                } catch (parseError) {
                  continue
                }
              }
            }
          } catch (streamError) {
            console.warn("Stream reading error:", streamError)
          }
        }
      }

      // If no content from API, use fallback
      if (!responseContent) {
        responseContent = getFallbackResponse(currentInput)
      }

      // Ensure minimum typing duration
      const typingElapsed = Date.now() - typingStartTime
      const remainingTypingTime = Math.max(0, minTypingDuration - typingElapsed)

      // Wait for remaining typing time if needed
      if (remainingTypingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTypingTime))
      }

      // Update message with actual content
      setMessages((prev) =>
        prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: responseContent } : msg)),
      )
    } catch (error) {
      console.error("Chat error:", error)

      // Use fallback response based on user's question
      const fallbackResponse = getFallbackResponse(currentInput)

      // Ensure minimum typing duration even for errors
      const typingElapsed = Date.now() - typingStartTime
      const remainingTypingTime = Math.max(0, minTypingDuration - typingElapsed)

      if (remainingTypingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTypingTime))
      }

      setMessages((prev) =>
        prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: fallbackResponse } : msg)),
      )
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Empress</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isTyping ? "bg-orange-500" : "bg-green-500"}`}></div>
              {isTyping ? "Typing..." : "Always here to help"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-purple-500 text-white rounded-tr-md"
                  : "bg-white text-gray-800 rounded-tl-md shadow-sm border border-gray-100"
              }`}
            >
              {/* Show typing indicator if message is empty and we're typing */}
              {message.role === "assistant" && !message.content && isTyping ? (
                <TypingIndicator />
              ) : (
                <div className="text-sm">
                  {message.role === "assistant" ? formatMessage(message.content) : <p>{message.content}</p>}
                </div>
              )}

              {/* Only show timestamp if message has content */}
              {message.content && (
                <p className={`text-xs mt-1 ${message.role === "user" ? "text-purple-100" : "text-gray-500"}`}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Questions - Only show when no messages except welcome and not typing */}
      {messages.length === 1 && !isTyping && (
        <div className="p-4 flex-shrink-0">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Suggested questions:</h3>
          <div className="grid grid-cols-1 gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <p className="text-sm text-gray-700">{question}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isTyping ? "Empress is typing..." : "Ask Empress anything about menopause..."}
            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-500"
            disabled={isLoading || isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || isTyping}
            className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
          >
            {isLoading || isTyping ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
