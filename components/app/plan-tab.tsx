"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Apple, Dumbbell, Pill, Heart, RefreshCw, CheckCircle } from "lucide-react"

interface Recommendations {
  persona: string
  nutrition: string[]
  supplements: string[]
  exercises: string[]
  lifestyle: string[]
}

interface PlanTabProps {
  recommendations: Recommendations | null
  onRetakeAssessment: () => void
}

export function PlanTab({ recommendations, onRetakeAssessment }: PlanTabProps) {
  if (!recommendations) {
    return (
      <div className="flex flex-col h-full bg-white w-full">
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full border shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 text-center">No Plan Yet</h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Take our assessment to get your personalized plan.
              </p>
              <Button onClick={onRetakeAssessment} className="w-full h-10 bg-purple-500 hover:bg-purple-600">
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white w-full">
      <div className="flex-1 overflow-y-auto p-3 space-y-3 w-full">
        {/* Retake Button */}
        <div className="flex justify-center">
          <Button
            onClick={onRetakeAssessment}
            variant="outline"
            className="flex items-center gap-1 bg-white border-purple-300 text-purple-700 hover:bg-purple-50 text-sm h-9"
          >
            <RefreshCw className="w-3 h-3" />
            Retake
          </Button>
        </div>

        {/* Persona Card */}
        <Card className="border shadow-sm bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-600" />
              <CardTitle className="text-sm font-medium text-gray-900">Your Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-xs font-medium text-gray-800">{recommendations.persona}</p>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Card */}
        <Card className="border shadow-sm bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Apple className="h-4 w-4 text-gray-600" />
              <CardTitle className="text-sm font-medium text-gray-900">Nutrition</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recommendations.nutrition.map((item, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supplements Card */}
        <Card className="border shadow-sm bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-gray-600" />
              <CardTitle className="text-sm font-medium text-gray-900">Supplements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recommendations.supplements.map((item, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exercise Card */}
        <Card className="border shadow-sm bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-gray-600" />
              <CardTitle className="text-sm font-medium text-gray-900">Exercise</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recommendations.exercises.map((item, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle Card */}
        <Card className="border shadow-sm bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-gray-600" />
              <CardTitle className="text-sm font-medium text-gray-900">Lifestyle</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recommendations.lifestyle.map((item, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
