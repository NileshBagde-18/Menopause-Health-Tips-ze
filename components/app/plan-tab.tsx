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
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="flex-shrink-0 text-center p-4 bg-white border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Wellness Plan</h1>
          <p className="text-gray-600">Complete your assessment to see your personalized plan</p>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center border border-gray-100 shadow-sm bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assessment Yet</h3>
              <p className="text-gray-600 mb-6">
                Take our comprehensive wellness assessment to get your personalized menopause plan.
              </p>
              <Button onClick={onRetakeAssessment} className="w-full bg-purple-500 hover:bg-purple-600">
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 text-center p-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Wellness Plan</h1>
        <p className="text-gray-600">Your personalized menopause wellness recommendations</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Retake Assessment Button */}
        <div className="flex justify-center">
          <Button
            onClick={onRetakeAssessment}
            variant="outline"
            className="flex items-center gap-2 bg-white border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Assessment
          </Button>
        </div>

        {/* Persona Card */}
        <Card className="border border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-medium text-gray-900">Your Wellness Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-gray-800 font-medium">{recommendations.persona}</p>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Card */}
        <Card className="border border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Apple className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-medium text-gray-900">Nutrition</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.nutrition.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supplements Card */}
        <Card className="border border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Pill className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-medium text-gray-900">Supplements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.supplements.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exercise Card */}
        <Card className="border border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Dumbbell className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-medium text-gray-900">Exercise</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.exercises.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle Card */}
        <Card className="border border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-medium text-gray-900">Lifestyle</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.lifestyle.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
