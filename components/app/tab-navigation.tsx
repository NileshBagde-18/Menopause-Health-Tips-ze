"use client"

import { MessageCircle, Wrench, Heart, User, FileText } from "lucide-react"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "ask-empress", label: "AskEmpress", icon: MessageCircle },
    { id: "tools", label: "Tools", icon: Wrench },
    { id: "for-you", label: "For You", icon: Heart },
    { id: "plan", label: "Plan", icon: FileText },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="bg-white border-t border-gray-200 px-2 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-colors ${
                isActive ? "text-purple-600 bg-purple-50" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
