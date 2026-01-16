"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Settings, Award, Flame, Crown, Bell, Shield, CreditCard, LogOut, Edit } from "lucide-react"

export function ProfileTab() {
  const userStats = {
    level: "Gold",
    points: 1247,
    streak: 12,
    badges: 8,
    joinDate: "March 2024",
    completedAssessments: 4,
    journalEntries: 23,
    eventsAttended: 7,
  }

  const badges = [
    { name: "First Steps", icon: "🌱", description: "Completed your first assessment", earned: true },
    { name: "Consistent Logger", icon: "📝", description: "7 days of journal entries", earned: true },
    { name: "Community Member", icon: "👥", description: "Joined your first micro-pod", earned: true },
    { name: "Wellness Warrior", icon: "⚡", description: "30-day streak", earned: false },
    { name: "Expert Learner", icon: "🎓", description: "Attended 5 expert sessions", earned: true },
    { name: "Self-Care Champion", icon: "💆‍♀️", description: "Completed 50 affirmations", earned: false },
  ]

  return (
    <div className="flex flex-col h-full bg-white w-full">
      <div className="flex-1 overflow-y-auto p-3 space-y-3 w-full">
        {/* Profile Header */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-gray-900 text-sm">Sarah Johnson</h2>
                <p className="text-gray-600 text-xs">Member since {userStats.joinDate}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Crown className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-medium text-yellow-700">{userStats.level}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-8 flex-shrink-0 bg-transparent">
                <Edit className="w-3 h-3" />
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-purple-50 rounded">
                <div className="text-lg font-bold text-purple-600">{userStats.points}</div>
                <div className="text-xs text-purple-700">Points</div>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded">
                <div className="text-lg font-bold text-orange-600 flex items-center justify-center gap-0.5">
                  <Flame className="w-4 h-4" />
                  {userStats.streak}
                </div>
                <div className="text-xs text-orange-700">Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Assessments</span>
              <span className="font-medium text-gray-900">{userStats.completedAssessments}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Journal Entries</span>
              <span className="font-medium text-gray-900">{userStats.journalEntries}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Events Attended</span>
              <span className="font-medium text-gray-900">{userStats.eventsAttended}</span>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4" />
              Badges ({userStats.badges})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-center transition-opacity ${
                    badge.earned ? "bg-yellow-50" : "bg-gray-50 opacity-50"
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-medium text-gray-900 line-clamp-2">{badge.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <Button variant="outline" className="w-full justify-start text-xs h-9 bg-white">
              <Bell className="w-3 h-3 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs h-9 bg-white">
              <Shield className="w-3 h-3 mr-2" />
              Privacy
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs h-9 bg-white">
              <CreditCard className="w-3 h-3 mr-2" />
              Billing
            </Button>
            <Button variant="outline" className="w-full justify-start text-xs h-9 bg-white text-red-600">
              <LogOut className="w-3 h-3 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
