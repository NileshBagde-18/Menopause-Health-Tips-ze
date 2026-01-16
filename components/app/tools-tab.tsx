"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, BookOpen, Zap, Award, Flame, Star, CheckCircle, Heart, Moon, Thermometer } from "lucide-react"

export function ToolsTab() {
  const [selectedAffirmation, setSelectedAffirmation] = useState(0)
  const [weeklyCheckIn, setWeeklyCheckIn] = useState({
    hotFlashes: 3,
    sleepQuality: 7,
    moodRating: 6,
    energyLevel: 5,
  })

  const affirmations = [
    "I am strong and capable of handling any challenge that comes my way.",
    "My body is wise and knows how to heal and balance itself.",
    "I embrace this new chapter of my life with grace and confidence.",
    "I deserve love, care, and compassion - especially from myself.",
  ]

  const journalEntries = [
    { date: "Today", mood: "😊", entry: "Feeling more energetic after trying the new morning routine..." },
    { date: "Yesterday", mood: "😐", entry: "Had a few hot flashes but managed them well with breathing..." },
    { date: "2 days ago", mood: "😌", entry: "Great sleep last night! The magnesium supplement seems to help..." },
  ]

  return (
    <div className="flex flex-col h-full bg-white w-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 w-full">
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold">Your Progress</h3>
                <p className="text-purple-100 text-xs">Keep up the great work!</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">1,247</div>
                <div className="text-xs text-purple-100">Points</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <Flame className="w-5 h-5 mx-auto mb-1 text-orange-300" />
                <div className="text-sm font-bold">12</div>
                <div className="text-xs text-purple-100">Streak</div>
              </div>
              <div className="text-center">
                <Award className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
                <div className="text-sm font-bold">8</div>
                <div className="text-xs text-purple-100">Badges</div>
              </div>
              <div className="text-center">
                <Star className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
                <div className="text-sm font-bold">Gold</div>
                <div className="text-xs text-purple-100">Level</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Affirmations */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="w-4 h-4 text-purple-500" />
              Daily Affirmations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-lg p-3 mb-3 bg-purple-50">
              <p className="text-gray-800 italic text-center leading-relaxed text-sm">
                "{affirmations[selectedAffirmation]}"
              </p>
            </div>

            <div className="flex justify-between items-center gap-2 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAffirmation((prev) => (prev - 1 + affirmations.length) % affirmations.length)}
                className="text-xs h-8"
              >
                Prev
              </Button>
              <div className="flex gap-1">
                {affirmations.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${index === selectedAffirmation ? "bg-purple-500" : "bg-gray-300"}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAffirmation((prev) => (prev + 1) % affirmations.length)}
                className="text-xs h-8"
              >
                Next
              </Button>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-purple-500 hover:bg-purple-600 h-9 text-sm">
                <Heart className="w-3 h-3 mr-1" />
                Save
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent h-9 text-sm">
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Check-In */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4 text-blue-500" />
              Weekly Check-In
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-red-500" />
                  Hot Flashes
                </span>
                <span className="text-xs text-gray-600">{weeklyCheckIn.hotFlashes}/day</span>
              </div>
              <Progress value={weeklyCheckIn.hotFlashes * 10} className="h-1.5" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium flex items-center gap-1">
                  <Moon className="w-3 h-3 text-indigo-500" />
                  Sleep Quality
                </span>
                <span className="text-xs text-gray-600">{weeklyCheckIn.sleepQuality}/10</span>
              </div>
              <Progress value={weeklyCheckIn.sleepQuality * 10} className="h-1.5" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium flex items-center gap-1">
                  <Heart className="w-3 h-3 text-pink-500" />
                  Mood Rating
                </span>
                <span className="text-xs text-gray-600">{weeklyCheckIn.moodRating}/10</span>
              </div>
              <Progress value={weeklyCheckIn.moodRating * 10} className="h-1.5" />
            </div>

            <Button className="w-full mt-2 h-9 text-sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              Complete Check-In
            </Button>
          </CardContent>
        </Card>

        {/* Personal Journal */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="w-4 h-4 text-green-500" />
              Personal Journal
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 mb-3">
              {journalEntries.map((entry, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">{entry.date}</span>
                    <span className="text-sm">{entry.mood}</span>
                  </div>
                  <p className="text-xs text-gray-600">{entry.entry}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 h-9 text-sm">
                <BookOpen className="w-3 h-3 mr-1" />
                New
              </Button>
              <Button variant="outline" className="flex-1 h-9 text-sm bg-transparent">
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
