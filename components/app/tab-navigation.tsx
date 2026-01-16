"use client"

import { MessageCircle, Wrench, Heart, User, FileText } from "lucide-react"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "ask-empress", label: "Chat", icon: MessageCircle },
    { id: "tools", label: "Tools", icon: Wrench },
    { id: "for-you", label: "For You", icon: Heart },
    { id: "plan", label: "Plan", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="w-full bg-white border-t border-gray-200 sticky bottom-0">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 px-1 transition-colors ${
                isActive ? "text-purple-600 bg-purple-50" : "text-gray-500"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium text-center line-clamp-1">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
