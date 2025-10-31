import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Settings,
  Award,
  Flame,
  Crown,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  Edit,
  Calendar,
  TrendingUp,
} from "lucide-react"

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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-gray-900 text-base">Sarah Johnson</h2>
                <p className="text-gray-600 text-xs">Member since {userStats.joinDate}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-700">{userStats.level} Member</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{userStats.points}</div>
                <div className="text-sm text-purple-700">Total Points</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-1">
                  <Flame className="w-6 h-6" />
                  {userStats.streak}
                </div>
                <div className="text-sm text-orange-700">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Wellness Journey</span>
                <span className="text-sm text-gray-600">Level {userStats.level}</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">753 points to Platinum level</p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{userStats.completedAssessments}</div>
                <div className="text-xs text-gray-600">Assessments</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{userStats.journalEntries}</div>
                <div className="text-xs text-gray-600">Journal Entries</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{userStats.eventsAttended}</div>
                <div className="text-xs text-gray-600">Events Attended</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges & Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Badges & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    badge.earned ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="font-medium text-sm text-gray-900">{badge.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings & Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-500" />
              Settings & Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Bell className="w-4 h-4 mr-3" />
              Notification Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="w-4 h-4 mr-3" />
              Privacy & Security
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <CreditCard className="w-4 h-4 mr-3" />
              Subscription & Billing
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Calendar className="w-4 h-4 mr-3" />
              Retake Assessment
            </Button>

            <div className="pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Premium Upgrade */}
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6 text-center">
            <Crown className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
            <h3 className="text-lg font-semibold mb-2">Upgrade to Premium</h3>
            <p className="text-purple-100 text-sm mb-4">
              Unlock advanced features, personalized coaching, and exclusive content
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
