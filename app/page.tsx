"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"

import { ChatInterfaceMockup } from "@/components/onboarding/chat-interface-mockup"
import { StatisticsMockup } from "@/components/onboarding/statistics-mockup"
import { PrivacyMockup } from "@/components/onboarding/privacy-mockup"
import { TabNavigation } from "@/components/app/tab-navigation"
import { AskEmpressTab } from "@/components/app/ask-empress-tab"
import { ToolsTab } from "@/components/app/tools-tab"
import { ForYouTab } from "@/components/app/for-you-tab"
import { PlanTab } from "@/components/app/plan-tab"
import { ProfileTab } from "@/components/app/profile-tab"

interface Question {
  id: string
  question: string
  options: { value: string; label: string; description?: string }[]
  category: string
  type: "radio" | "checkbox"
}

interface Answers {
  [key: string]: string | string[]
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
      { value: "35-40", label: "35-40 years" },
      { value: "40-45", label: "40-45 years" },
      { value: "46-50", label: "46-50 years" },
      { value: "51-55", label: "51-55 years" },
      { value: "56-60", label: "56-60 years" },
      { value: "60+", label: "60+ years" },
    ],
    category: "demographics",
    type: "radio",
  },
  {
    id: "menopause_stage",
    question: "What stage of menopause are you in?",
    options: [
      { value: "early_perimenopause", label: "Early Perimenopause", description: "Subtle changes, regular periods" },
      { value: "perimenopause", label: "Perimenopause", description: "Irregular periods" },
      { value: "menopause", label: "Menopause", description: "No period for 12+ months" },
      { value: "postmenopause", label: "Post-menopause", description: "Several years past menopause" },
      { value: "unsure", label: "I'm not sure" },
    ],
    category: "menopause",
    type: "radio",
  },
  {
    id: "physical_symptoms",
    question: "Which physical symptoms are you experiencing? (Select all that apply)",
    options: [
      {
        value: "hot_flashes",
        label: "Hot Flashes",
        description: "Sudden feelings of intense heat with sweating and flushing",
      },
      { value: "night_sweats", label: "Night Sweats", description: "Hot flashes during sleep, disrupting rest" },
      { value: "vaginal_dryness", label: "Vaginal Dryness", description: "Reduced lubrication causing discomfort" },
      {
        value: "irregular_periods",
        label: "Irregular Periods",
        description: "Changes in cycle length, flow, or frequency",
      },
      { value: "weight_gain", label: "Weight Gain", description: "Increased fat storage, especially around abdomen" },
      { value: "sleep_disturbances", label: "Sleep Disturbances", description: "Difficulty falling or staying asleep" },
      { value: "fatigue", label: "Fatigue", description: "Persistent tiredness despite adequate rest" },
      { value: "thinning_hair", label: "Thinning Hair", description: "Hair becoming finer or falling out more easily" },
      { value: "dry_skin", label: "Dry Skin", description: "Loss of moisture and elasticity" },
      { value: "bone_density_loss", label: "Bone Concerns", description: "Increased risk of osteoporosis" },
      { value: "joint_muscle_pain", label: "Joint & Muscle Pain", description: "Unexplained aches and stiffness" },
      { value: "heart_palpitations", label: "Heart Palpitations", description: "Racing or pounding heart sensations" },
      { value: "body_odor_changes", label: "Body Odor Changes", description: "Hormonal shifts altering body odor" },
      { value: "electric_shock", label: "Electric Shock Sensations", description: "Tingling or shock-like sensations" },
      { value: "gum_problems", label: "Gum Problems", description: "Increased sensitivity or bleeding gums" },
    ],
    category: "symptoms",
    type: "checkbox",
  },
  {
    id: "emotional_symptoms",
    question: "Which emotional or psychological symptoms are you experiencing? (Select all that apply)",
    options: [
      { value: "mood_swings", label: "Mood Swings", description: "Irritability, anxiety, or depression" },
      { value: "brain_fog", label: "Brain Fog", description: "Difficulty concentrating or memory lapses" },
      { value: "decreased_libido", label: "Decreased Libido", description: "Reduced sexual desire" },
      {
        value: "anxiety_panic",
        label: "Anxiety or Panic Attacks",
        description: "Increased worry or sudden intense fear",
      },
      { value: "depression", label: "Depression", description: "Persistent feelings of sadness or hopelessness" },
    ],
    category: "emotional",
    type: "checkbox",
  },
  {
    id: "energy_levels",
    question: "How would you describe your overall energy levels?",
    options: [
      { value: "very_low", label: "Very low - constantly tired" },
      { value: "low", label: "Low - tired most days" },
      { value: "moderate", label: "Moderate - some good and bad days" },
      { value: "good", label: "Good - generally energetic" },
      { value: "excellent", label: "Excellent - very energetic" },
    ],
    category: "energy",
    type: "radio",
  },
  {
    id: "current_exercise",
    question: "How often do you currently exercise?",
    options: [
      { value: "never", label: "Never or rarely" },
      { value: "1-2_times", label: "1-2 times per week" },
      { value: "3-4_times", label: "3-4 times per week" },
      { value: "5-6_times", label: "5-6 times per week" },
      { value: "daily", label: "Daily" },
    ],
    category: "exercise",
    type: "radio",
  },
  {
    id: "exercise_preference",
    question: "What type of exercise do you prefer or would like to try? (Select all that apply)",
    options: [
      { value: "low_impact", label: "Low-impact", description: "Walking, swimming, yoga" },
      { value: "strength", label: "Strength training", description: "Resistance exercises" },
      { value: "cardio", label: "Cardio", description: "High-intensity workouts" },
      { value: "flexibility", label: "Flexibility & balance", description: "Yoga, pilates" },
      { value: "variety", label: "Mixed activities", description: "A variety of different exercises" },
    ],
    category: "exercise",
    type: "checkbox",
  },
  {
    id: "diet_quality",
    question: "How would you rate your current diet?",
    options: [
      { value: "poor", label: "Poor - mostly processed foods" },
      { value: "fair", label: "Fair - some healthy choices" },
      { value: "good", label: "Good - mostly healthy with occasional treats" },
      { value: "excellent", label: "Excellent - very healthy and balanced" },
    ],
    category: "nutrition",
    type: "radio",
  },
  {
    id: "dietary_restrictions",
    question: "Do you have any dietary restrictions or preferences? (Select all that apply)",
    options: [
      { value: "none", label: "No restrictions" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "gluten_free", label: "Gluten-free" },
      { value: "dairy_free", label: "Dairy-free" },
    ],
    category: "nutrition",
    type: "checkbox",
  },
  {
    id: "sleep_quality",
    question: "How is your sleep quality?",
    options: [
      { value: "very_poor", label: "Very poor - frequent wake-ups, hard to fall asleep" },
      { value: "poor", label: "Poor - some sleep issues" },
      { value: "fair", label: "Fair - occasional sleep problems" },
      { value: "good", label: "Good - generally sleep well" },
      { value: "excellent", label: "Excellent - sleep soundly most nights" },
    ],
    category: "sleep",
    type: "radio",
  },
  {
    id: "stress_levels",
    question: "How would you rate your stress levels?",
    options: [
      { value: "very_high", label: "Very high - constantly overwhelmed" },
      { value: "high", label: "High - frequently stressed" },
      { value: "moderate", label: "Moderate - manageable stress" },
      { value: "low", label: "Low - rarely stressed" },
      { value: "very_low", label: "Very low - very calm and relaxed" },
    ],
    category: "stress",
    type: "radio",
  },
]

export default function MenopauseQuestionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResults, setShowResults] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showApp, setShowApp] = useState(false)
  const [activeTab, setActiveTab] = useState("ask-empress")
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null)
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false)

  const handleRadioAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleCheckboxAnswer = (questionId: string, value: string, checked: boolean) => {
    setAnswers((prev) => {
      const currentAnswers = (prev[questionId] as string[]) || []
      if (checked) {
        return { ...prev, [questionId]: [...currentAnswers, value] }
      } else {
        return { ...prev, [questionId]: currentAnswers.filter((item) => item !== value) }
      }
    })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      generateRecommendations()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const generateRecommendations = () => {
    const persona = determinePersona(answers)
    const recs = getRecommendations(persona, answers)
    setRecommendations(recs)
    setIsAssessmentComplete(true)
  }

  const startOnboarding = () => {
    setShowOnboarding(true)
    setOnboardingStep(0)
  }

  const nextOnboardingStep = () => {
    if (onboardingStep < 2) {
      setOnboardingStep((prev) => prev + 1)
    } else {
      setShowOnboarding(false)
      setShowApp(true)
    }
  }

  const retakeAssessment = () => {
    setShowApp(false)
    setShowResults(false)
    setShowOnboarding(false)
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendations(null)
    setIsAssessmentComplete(false)
  }

  const determinePersona = (answers: Answers): string => {
    const physicalSymptoms = (answers.physical_symptoms as string[]) || []
    const emotionalSymptoms = (answers.emotional_symptoms as string[]) || []
    const energy = answers.energy_levels as string
    const exercise = answers.current_exercise as string

    if (physicalSymptoms.includes("hot_flashes") || physicalSymptoms.includes("night_sweats")) {
      return "thermal_regulator"
    } else if (emotionalSymptoms.includes("mood_swings") || emotionalSymptoms.includes("anxiety_panic")) {
      return "mood_balancer"
    } else if (physicalSymptoms.includes("weight_gain") && exercise === "never") {
      return "metabolism_booster"
    } else if (physicalSymptoms.includes("sleep_disturbances") || physicalSymptoms.includes("fatigue")) {
      return "sleep_optimizer"
    } else if (physicalSymptoms.includes("joint_muscle_pain") || physicalSymptoms.includes("bone_density_loss")) {
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
          "Eat smaller, frequent meals to avoid heat spikes",
        ],
        supplements: [
          "Black Cohosh (40-80mg daily) for hot flash relief",
          "Evening Primrose Oil (1000mg daily)",
          "Vitamin E (400 IU daily)",
          "Magnesium (200-400mg daily) for temperature regulation",
          "Red Clover extract for natural cooling",
        ],
        exercises: [
          "Swimming or water aerobics for cooling exercise",
          "Early morning or evening walks",
          "Gentle yoga in cool environments",
          "Breathing exercises for hot flash management",
          "Avoid hot yoga or intense cardio during peak symptoms",
        ],
        lifestyle: [
          "Keep a fan nearby and dress in layers",
          "Use moisture-wicking fabrics",
          "Practice stress reduction techniques",
          "Maintain a cool sleeping environment",
          "Track hot flash triggers in a diary",
        ],
      },
      mood_balancer: {
        persona: "Mood Balancer - Stabilizing emotional well-being",
        nutrition: [
          "Increase omega-3 rich foods (salmon, walnuts, chia seeds)",
          "Include complex carbohydrates for serotonin production",
          "Eat regular meals to stabilize blood sugar",
          "Include tryptophan-rich foods (turkey, eggs, cheese)",
          "Limit sugar and processed foods that cause mood swings",
        ],
        supplements: [
          "Omega-3 fatty acids (1000-2000mg daily)",
          "Vitamin D3 (1000-2000 IU daily)",
          "B-Complex vitamins for nervous system support",
          "5-HTP (100-200mg daily) for mood regulation",
          "Ashwagandha (300-500mg daily) for stress management",
        ],
        exercises: [
          "Regular cardio exercise for endorphin release",
          "Yoga and meditation for stress relief",
          "Strength training 2-3 times per week",
          "Dancing or fun group activities",
          "Outdoor activities for natural mood boost",
        ],
        lifestyle: [
          "Establish a consistent daily routine",
          "Practice mindfulness and meditation",
          "Maintain social connections",
          "Get adequate sunlight exposure",
          "Consider counseling or support groups",
        ],
      },
      metabolism_booster: {
        persona: "Metabolism Booster - Revving up energy and weight management",
        nutrition: [
          "Increase protein intake (25-30g per meal)",
          "Include metabolism-boosting foods (green tea, chili peppers)",
          "Eat fiber-rich foods for satiety",
          "Practice portion control and mindful eating",
          "Include healthy fats (avocado, nuts, olive oil)",
        ],
        supplements: [
          "Green Tea Extract (400-500mg daily)",
          "Chromium (200mcg daily) for blood sugar control",
          "CLA (Conjugated Linoleic Acid) for fat metabolism",
          "Probiotics for gut health and metabolism",
          "Vitamin B12 for energy metabolism",
        ],
        exercises: [
          "High-Intensity Interval Training (HIIT) 2-3x per week",
          "Strength training to build lean muscle",
          "Daily walking (aim for 10,000 steps)",
          "Resistance band exercises",
          "Metabolic circuit training",
        ],
        lifestyle: [
          "Track food intake and exercise",
          "Get adequate sleep (7-9 hours)",
          "Manage stress to reduce cortisol",
          "Stay hydrated throughout the day",
          "Plan and prep healthy meals",
        ],
      },
      sleep_optimizer: {
        persona: "Sleep Optimizer - Improving rest and recovery",
        nutrition: [
          "Include magnesium-rich foods (almonds, spinach, pumpkin seeds)",
          "Avoid caffeine after 2 PM",
          "Include tart cherry juice for natural melatonin",
          "Eat light dinners 3 hours before bed",
          "Include calcium-rich foods for muscle relaxation",
        ],
        supplements: [
          "Melatonin (0.5-3mg) 30 minutes before bed",
          "Magnesium Glycinate (200-400mg) before bed",
          "L-Theanine (100-200mg) for relaxation",
          "Valerian Root (300-600mg) for sleep quality",
          "GABA (500-750mg) for calming effects",
        ],
        exercises: [
          "Gentle evening yoga or stretching",
          "Morning sunlight exposure for circadian rhythm",
          "Avoid intense exercise 3 hours before bed",
          "Progressive muscle relaxation",
          "Tai Chi for stress reduction",
        ],
        lifestyle: [
          "Establish a consistent bedtime routine",
          "Create a cool, dark sleeping environment",
          "Limit screen time 1 hour before bed",
          "Use white noise or earplugs if needed",
          "Practice relaxation techniques before sleep",
        ],
      },
      joint_supporter: {
        persona: "Joint Supporter - Maintaining mobility and reducing inflammation",
        nutrition: [
          "Include anti-inflammatory foods (turmeric, ginger, berries)",
          "Increase omega-3 fatty acids",
          "Include collagen-rich foods (bone broth, fish)",
          "Eat antioxidant-rich fruits and vegetables",
          "Limit inflammatory foods (processed foods, excess sugar)",
        ],
        supplements: [
          "Glucosamine and Chondroitin (1500mg/1200mg daily)",
          "Turmeric/Curcumin (500-1000mg daily)",
          "Omega-3 fatty acids (2000-3000mg daily)",
          "Collagen peptides (10-20g daily)",
          "Vitamin D3 for bone health",
        ],
        exercises: [
          "Low-impact activities (swimming, cycling)",
          "Gentle strength training with proper form",
          "Flexibility and mobility exercises",
          "Water aerobics for joint-friendly cardio",
          "Yoga or Pilates for flexibility",
        ],
        lifestyle: [
          "Maintain a healthy weight to reduce joint stress",
          "Use proper ergonomics at work",
          "Apply heat/cold therapy as needed",
          "Get adequate rest for tissue repair",
          "Consider physical therapy if needed",
        ],
      },
      holistic_wellness: {
        persona: "Holistic Wellness - Comprehensive health optimization",
        nutrition: [
          "Follow a balanced Mediterranean-style diet",
          "Include a variety of colorful fruits and vegetables",
          "Choose whole grains over refined carbohydrates",
          "Include lean proteins and healthy fats",
          "Stay well-hydrated throughout the day",
        ],
        supplements: [
          "High-quality multivitamin for women 50+",
          "Calcium and Vitamin D3 for bone health",
          "Omega-3 fatty acids for heart and brain health",
          "Probiotics for digestive health",
          "Coenzyme Q10 for cellular energy",
        ],
        exercises: [
          "Mix of cardio, strength, and flexibility training",
          "Aim for 150 minutes of moderate exercise per week",
          "Include balance and coordination exercises",
          "Try new activities to stay motivated",
          "Walk or hike in nature regularly",
        ],
        lifestyle: [
          "Maintain regular health check-ups",
          "Practice stress management daily",
          "Foster meaningful relationships",
          "Pursue hobbies and personal interests",
          "Get 7-9 hours of quality sleep nightly",
        ],
      },
    }

    return baseRecs[persona as keyof typeof baseRecs] || baseRecs.holistic_wellness
  }

  if (showApp) {
    return (
      <div className="w-full h-screen bg-white flex flex-col">
        {activeTab === "ask-empress" && <AskEmpressTab />}
        {activeTab === "tools" && <ToolsTab />}
        {activeTab === "for-you" && <ForYouTab />}
        {activeTab === "plan" && <PlanTab recommendations={recommendations} onRetake={retakeAssessment} />}
        {activeTab === "profile" && <ProfileTab />}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    )
  }

  if (showOnboarding) {
    return (
      <div className="w-full h-screen bg-white flex flex-col">
        {onboardingStep === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
            <ChatInterfaceMockup />
            <h1 className="text-xl font-bold text-gray-900 mt-4 text-center">Cope with anxiety</h1>
            <p className="text-sm text-gray-600 text-center mt-2 leading-relaxed">
              Empress understands even very nuanced situations. It listens, asks questions, and supports without
              judging.
            </p>
          </div>
        )}
        {onboardingStep === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
            <StatisticsMockup />
            <h1 className="text-xl font-bold text-gray-900 mt-4 text-center">Overcome Challenge</h1>
            <p className="text-sm text-gray-600 text-center mt-2 leading-relaxed">
              Our study shows that regular conversations with Empress can improve mental and emotional well-being.
            </p>
          </div>
        )}
        {onboardingStep === 2 && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
            <PrivacyMockup />
            <h1 className="text-xl font-bold text-gray-900 mt-4 text-center">Confide your secrets</h1>
            <p className="text-sm text-gray-600 text-center mt-2 leading-relaxed">
              Chat without revealing your real identity. You can delete your chat history at any time, leaving no trace.
            </p>
          </div>
        )}
        <div className="flex gap-2 justify-center p-4 flex-shrink-0">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${step === onboardingStep ? "bg-purple-800" : "bg-gray-300"}`}
            />
          ))}
        </div>
        <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
          <Button
            onClick={nextOnboardingStep}
            className="w-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 hover:from-purple-950 hover:via-purple-900 hover:to-indigo-950 text-white"
          >
            {onboardingStep === 2 ? "Get Started" : "Continue"}
          </Button>
        </div>
      </div>
    )
  }

  if (isAssessmentComplete && recommendations) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col p-4 pb-20">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <CheckCircle className="w-12 h-12 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Empress Wellness is now personalized for you</h1>
          <p className="text-sm text-gray-600 mb-8">Explore features that support your wellness journey</p>
          <Button
            onClick={startOnboarding}
            className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 hover:from-purple-950 hover:via-purple-900 hover:to-indigo-950 text-white"
          >
            Explore Features
          </Button>
        </div>
      </div>
    )
  }

  // Questionnaire rendering
  const question = questions[currentQuestion]
  const isAnswered = answers[question.id] !== undefined && answers[question.id] !== null

  return (
    <div className="w-full min-h-screen bg-white flex flex-col p-4 pb-20">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Menopause Assessment</h1>
        <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-1 bg-gray-200" />
        <p className="text-xs text-gray-500 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        <Card className="w-full bg-white border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-900">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {question.type === "radio" ? (
              <RadioGroup
                value={answers[question.id] as string}
                onValueChange={(value) => handleRadioAnswer(question.id, value)}
              >
                {question.options.map((option) => (
                  <div
                    key={option.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      answers[question.id] === option.value
                        ? "border-purple-800 bg-purple-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    onClick={() => handleRadioAnswer(question.id, option.value)}
                  >
                    <div className="flex items-start gap-2">
                      <RadioGroupItem value={option.value} id={option.value} className="mt-1 pointer-events-none" />
                      <div className="flex-1 pointer-events-none">
                        <label htmlFor={option.value} className="text-sm font-medium text-gray-900 cursor-pointer">
                          {option.label}
                        </label>
                        {option.description && <p className="text-xs text-gray-500 mt-1">{option.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-2">
                {question.options.map((option) => (
                  <div
                    key={option.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      (answers[question.id] as string[])?.includes(option.value)
                        ? "border-purple-800 bg-purple-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    onClick={() =>
                      handleCheckboxAnswer(
                        question.id,
                        option.value,
                        !(answers[question.id] as string[])?.includes(option.value),
                      )
                    }
                  >
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={(answers[question.id] as string[])?.includes(option.value) || false}
                        onCheckedChange={(checked) =>
                          handleCheckboxAnswer(question.id, option.value, checked as boolean)
                        }
                        className="mt-1 pointer-events-none"
                      />
                      <div className="flex-1 pointer-events-none">
                        <label className="text-sm font-medium text-gray-900 cursor-pointer">{option.label}</label>
                        {option.description && <p className="text-xs text-gray-500 mt-1">{option.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <Button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          variant="outline"
          className="flex-1 border-gray-300 text-gray-700 text-sm h-10 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={nextQuestion}
          disabled={!isAnswered}
          className="flex-1 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 hover:from-purple-950 hover:via-purple-900 hover:to-indigo-950 text-white text-sm h-10"
        >
          {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
