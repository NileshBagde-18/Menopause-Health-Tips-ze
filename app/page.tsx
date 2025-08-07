"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, ArrowLeft, User, Apple, Dumbbell, Pill } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: { value: string; label: string }[]
  category: string
}

interface Answers {
  [key: string]: string
}

interface Recommendations {
  persona: string
  nutrition: string[]
  supplements: string[]
  exercises: string[]
  lifestyle: string[]
}

const questions: Question[] = [
  {
    id: "age",
    question: "What is your age range?",
    options: [
      { value: "40-45", label: "40-45 years" },
      { value: "46-50", label: "46-50 years" },
      { value: "51-55", label: "51-55 years" },
      { value: "56-60", label: "56-60 years" },
      { value: "60+", label: "60+ years" }
    ],
    category: "demographics"
  },
  {
    id: "menopause_stage",
    question: "What stage of menopause are you in?",
    options: [
      { value: "perimenopause", label: "Perimenopause (irregular periods)" },
      { value: "menopause", label: "Menopause (no period for 12+ months)" },
      { value: "postmenopause", label: "Post-menopause (several years past menopause)" },
      { value: "unsure", label: "I'm not sure" }
    ],
    category: "menopause"
  },
  {
    id: "primary_symptoms",
    question: "What are your most bothersome symptoms?",
    options: [
      { value: "hot_flashes", label: "Hot flashes and night sweats" },
      { value: "mood_changes", label: "Mood swings and irritability" },
      { value: "sleep_issues", label: "Sleep problems and fatigue" },
      { value: "weight_gain", label: "Weight gain and metabolism changes" },
      { value: "joint_pain", label: "Joint pain and stiffness" }
    ],
    category: "symptoms"
  },
  {
    id: "energy_levels",
    question: "How would you describe your energy levels?",
    options: [
      { value: "very_low", label: "Very low - constantly tired" },
      { value: "low", label: "Low - tired most days" },
      { value: "moderate", label: "Moderate - some good and bad days" },
      { value: "good", label: "Good - generally energetic" },
      { value: "excellent", label: "Excellent - very energetic" }
    ],
    category: "energy"
  },
  {
    id: "current_exercise",
    question: "How often do you currently exercise?",
    options: [
      { value: "never", label: "Never or rarely" },
      { value: "1-2_times", label: "1-2 times per week" },
      { value: "3-4_times", label: "3-4 times per week" },
      { value: "5-6_times", label: "5-6 times per week" },
      { value: "daily", label: "Daily" }
    ],
    category: "exercise"
  },
  {
    id: "exercise_preference",
    question: "What type of exercise do you prefer or would like to try?",
    options: [
      { value: "low_impact", label: "Low-impact (walking, swimming, yoga)" },
      { value: "strength", label: "Strength training and resistance exercises" },
      { value: "cardio", label: "Cardio and high-intensity workouts" },
      { value: "flexibility", label: "Flexibility and balance (yoga, pilates)" },
      { value: "variety", label: "A mix of different activities" }
    ],
    category: "exercise"
  },
  {
    id: "diet_quality",
    question: "How would you rate your current diet?",
    options: [
      { value: "poor", label: "Poor - mostly processed foods" },
      { value: "fair", label: "Fair - some healthy choices" },
      { value: "good", label: "Good - mostly healthy with occasional treats" },
      { value: "excellent", label: "Excellent - very healthy and balanced" }
    ],
    category: "nutrition"
  },
  {
    id: "dietary_restrictions",
    question: "Do you have any dietary restrictions or preferences?",
    options: [
      { value: "none", label: "No restrictions" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "gluten_free", label: "Gluten-free" },
      { value: "dairy_free", label: "Dairy-free" }
    ],
    category: "nutrition"
  },
  {
    id: "sleep_quality",
    question: "How is your sleep quality?",
    options: [
      { value: "very_poor", label: "Very poor - frequent wake-ups, hard to fall asleep" },
      { value: "poor", label: "Poor - some sleep issues" },
      { value: "fair", label: "Fair - occasional sleep problems" },
      { value: "good", label: "Good - generally sleep well" },
      { value: "excellent", label: "Excellent - sleep soundly most nights" }
    ],
    category: "sleep"
  },
  {
    id: "stress_levels",
    question: "How would you rate your stress levels?",
    options: [
      { value: "very_high", label: "Very high - constantly overwhelmed" },
      { value: "high", label: "High - frequently stressed" },
      { value: "moderate", label: "Moderate - manageable stress" },
      { value: "low", label: "Low - rarely stressed" },
      { value: "very_low", label: "Very low - very calm and relaxed" }
    ],
    category: "stress"
  }
]

export default function MenopauseQuestionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null)

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      generateRecommendations()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const generateRecommendations = () => {
    const persona = determinePersona(answers)
    const recs = getRecommendations(persona, answers)
    setRecommendations(recs)
    setShowResults(true)
  }

  const determinePersona = (answers: Answers): string => {
    const symptoms = answers.primary_symptoms
    const energy = answers.energy_levels
    const exercise = answers.current_exercise
    const stress = answers.stress_levels

    if (symptoms === "hot_flashes" && energy === "very_low") {
      return "thermal_regulator"
    } else if (symptoms === "mood_changes" && stress === "very_high") {
      return "mood_balancer"
    } else if (symptoms === "weight_gain" && exercise === "never") {
      return "metabolism_booster"
    } else if (symptoms === "sleep_issues") {
      return "sleep_optimizer"
    } else if (symptoms === "joint_pain") {
      return "joint_supporter"
    } else {
      return "holistic_wellness"
    }
  }

  const getRecommendations = (persona: string, answers: Answers): Recommendations => {
    const baseRecs = {
      thermal_regulator: {
        persona: "Thermal Regulator - Managing heat and temperature fluctuations",
        nutrition: [
          "Increase phytoestrogen-rich foods (soy, flaxseeds, chickpeas)",
          "Stay hydrated with 8-10 glasses of water daily",
          "Limit spicy foods, caffeine, and alcohol",
          "Include cooling foods like cucumber, watermelon, and leafy greens",
          "Eat smaller, frequent meals to avoid heat spikes"
        ],
        supplements: [
          "Black Cohosh (40-80mg daily) for hot flash relief",
          "Evening Primrose Oil (1000mg daily)",
          "Vitamin E (400 IU daily)",
          "Magnesium (200-400mg daily) for temperature regulation",
          "Red Clover extract for natural cooling"
        ],
        exercises: [
          "Swimming or water aerobics for cooling exercise",
          "Early morning or evening walks",
          "Gentle yoga in cool environments",
          "Breathing exercises for hot flash management",
          "Avoid hot yoga or intense cardio during peak symptoms"
        ],
        lifestyle: [
          "Keep a fan nearby and dress in layers",
          "Use moisture-wicking fabrics",
          "Practice stress reduction techniques",
          "Maintain a cool sleeping environment",
          "Track hot flash triggers in a diary"
        ]
      },
      mood_balancer: {
        persona: "Mood Balancer - Stabilizing emotional well-being",
        nutrition: [
          "Increase omega-3 rich foods (salmon, walnuts, chia seeds)",
          "Include complex carbohydrates for serotonin production",
          "Eat regular meals to stabilize blood sugar",
          "Include tryptophan-rich foods (turkey, eggs, cheese)",
          "Limit sugar and processed foods that cause mood swings"
        ],
        supplements: [
          "Omega-3 fatty acids (1000-2000mg daily)",
          "Vitamin D3 (1000-2000 IU daily)",
          "B-Complex vitamins for nervous system support",
          "5-HTP (100-200mg daily) for mood regulation",
          "Ashwagandha (300-500mg daily) for stress management"
        ],
        exercises: [
          "Regular cardio exercise for endorphin release",
          "Yoga and meditation for stress relief",
          "Strength training 2-3 times per week",
          "Dancing or fun group activities",
          "Outdoor activities for natural mood boost"
        ],
        lifestyle: [
          "Establish a consistent daily routine",
          "Practice mindfulness and meditation",
          "Maintain social connections",
          "Get adequate sunlight exposure",
          "Consider counseling or support groups"
        ]
      },
      metabolism_booster: {
        persona: "Metabolism Booster - Revving up energy and weight management",
        nutrition: [
          "Increase protein intake (25-30g per meal)",
          "Include metabolism-boosting foods (green tea, chili peppers)",
          "Eat fiber-rich foods for satiety",
          "Practice portion control and mindful eating",
          "Include healthy fats (avocado, nuts, olive oil)"
        ],
        supplements: [
          "Green Tea Extract (400-500mg daily)",
          "Chromium (200mcg daily) for blood sugar control",
          "CLA (Conjugated Linoleic Acid) for fat metabolism",
          "Probiotics for gut health and metabolism",
          "Vitamin B12 for energy metabolism"
        ],
        exercises: [
          "High-Intensity Interval Training (HIIT) 2-3x per week",
          "Strength training to build lean muscle",
          "Daily walking (aim for 10,000 steps)",
          "Resistance band exercises",
          "Metabolic circuit training"
        ],
        lifestyle: [
          "Track food intake and exercise",
          "Get adequate sleep (7-9 hours)",
          "Manage stress to reduce cortisol",
          "Stay hydrated throughout the day",
          "Plan and prep healthy meals"
        ]
      },
      sleep_optimizer: {
        persona: "Sleep Optimizer - Improving rest and recovery",
        nutrition: [
          "Include magnesium-rich foods (almonds, spinach, pumpkin seeds)",
          "Avoid caffeine after 2 PM",
          "Include tart cherry juice for natural melatonin",
          "Eat light dinners 3 hours before bed",
          "Include calcium-rich foods for muscle relaxation"
        ],
        supplements: [
          "Melatonin (0.5-3mg) 30 minutes before bed",
          "Magnesium Glycinate (200-400mg) before bed",
          "L-Theanine (100-200mg) for relaxation",
          "Valerian Root (300-600mg) for sleep quality",
          "GABA (500-750mg) for calming effects"
        ],
        exercises: [
          "Gentle evening yoga or stretching",
          "Morning sunlight exposure for circadian rhythm",
          "Avoid intense exercise 3 hours before bed",
          "Progressive muscle relaxation",
          "Tai Chi for stress reduction"
        ],
        lifestyle: [
          "Establish a consistent bedtime routine",
          "Create a cool, dark sleeping environment",
          "Limit screen time 1 hour before bed",
          "Use white noise or earplugs if needed",
          "Practice relaxation techniques before sleep"
        ]
      },
      joint_supporter: {
        persona: "Joint Supporter - Maintaining mobility and reducing inflammation",
        nutrition: [
          "Include anti-inflammatory foods (turmeric, ginger, berries)",
          "Increase omega-3 fatty acids",
          "Include collagen-rich foods (bone broth, fish)",
          "Eat antioxidant-rich fruits and vegetables",
          "Limit inflammatory foods (processed foods, excess sugar)"
        ],
        supplements: [
          "Glucosamine and Chondroitin (1500mg/1200mg daily)",
          "Turmeric/Curcumin (500-1000mg daily)",
          "Omega-3 fatty acids (2000-3000mg daily)",
          "Collagen peptides (10-20g daily)",
          "Vitamin D3 for bone health"
        ],
        exercises: [
          "Low-impact activities (swimming, cycling)",
          "Gentle strength training with proper form",
          "Flexibility and mobility exercises",
          "Water aerobics for joint-friendly cardio",
          "Yoga or Pilates for flexibility"
        ],
        lifestyle: [
          "Maintain a healthy weight to reduce joint stress",
          "Use proper ergonomics at work",
          "Apply heat/cold therapy as needed",
          "Get adequate rest for tissue repair",
          "Consider physical therapy if needed"
        ]
      },
      holistic_wellness: {
        persona: "Holistic Wellness - Comprehensive health optimization",
        nutrition: [
          "Follow a balanced Mediterranean-style diet",
          "Include a variety of colorful fruits and vegetables",
          "Choose whole grains over refined carbohydrates",
          "Include lean proteins and healthy fats",
          "Stay well-hydrated throughout the day"
        ],
        supplements: [
          "High-quality multivitamin for women 50+",
          "Calcium and Vitamin D3 for bone health",
          "Omega-3 fatty acids for heart and brain health",
          "Probiotics for digestive health",
          "Coenzyme Q10 for cellular energy"
        ],
        exercises: [
          "Mix of cardio, strength, and flexibility training",
          "Aim for 150 minutes of moderate exercise per week",
          "Include balance and coordination exercises",
          "Try new activities to stay motivated",
          "Listen to your body and adjust intensity"
        ],
        lifestyle: [
          "Prioritize stress management techniques",
          "Maintain strong social connections",
          "Get regular health check-ups",
          "Practice gratitude and positive thinking",
          "Engage in hobbies and activities you enjoy"
        ]
      }
    }

    return baseRecs[persona as keyof typeof baseRecs] || baseRecs.holistic_wellness
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults && recommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-700">Your Personalized Menopause Plan</CardTitle>
              <CardDescription className="text-lg">
                Based on your responses, we've created a tailored wellness plan just for you
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">Your Persona</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 font-medium">{recommendations.persona}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">Nutrition Recommendations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.nutrition.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Supplement Suggestions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.supplements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-orange-600" />
                  <CardTitle className="text-lg">Exercise Plan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.exercises.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Lifestyle Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                {recommendations.lifestyle.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button 
              onClick={() => {
                setShowResults(false)
                setCurrentQuestion(0)
                setAnswers({})
                setRecommendations(null)
              }}
              variant="outline"
            >
              Take Quiz Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-700">Menopause Wellness Assessment</CardTitle>
            <CardDescription>
              Answer these questions to receive personalized nutrition, supplement, and exercise recommendations
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-lg">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[questions[currentQuestion].id] || ""}
              onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value)}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer text-sm leading-relaxed"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={nextQuestion}
                disabled={!answers[questions[currentQuestion].id]}
                className="flex items-center gap-2"
              >
                {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
