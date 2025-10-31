export async function POST(req: Request) {
  try {
    // Parse request body
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages format")
    }

    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""

    // Enhanced contextual responses
    let response = ""

    if (lastMessage.includes("hot flash") || lastMessage.includes("hot flashes")) {
      response = `Hot flashes can be really challenging! Here are some strategies that many women find helpful:

**Immediate relief:**
• Try deep, slow breathing when you feel one starting
• Keep a small fan or cooling towel nearby  
• Dress in layers so you can adjust easily

**Lifestyle changes:**
• Stay well-hydrated throughout the day
• Limit spicy foods, caffeine, and alcohol
• Consider natural supplements like black cohosh or evening primrose oil

Remember, if hot flashes are significantly impacting your quality of life, it's worth discussing treatment options with your healthcare provider.`
    } else if (lastMessage.includes("sleep") || lastMessage.includes("insomnia") || lastMessage.includes("tired")) {
      response = `Sleep challenges during menopause are so common - you're not alone! Here are some approaches that can help:

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
    } else if (lastMessage.includes("supplement") || lastMessage.includes("vitamin")) {
      response = `Here are some supplements that research suggests may help with menopause symptoms:

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
    } else if (
      lastMessage.includes("mood") ||
      lastMessage.includes("anxiety") ||
      lastMessage.includes("depression") ||
      lastMessage.includes("emotional")
    ) {
      response = `Mood changes during menopause are incredibly common and completely valid. Here's what can help:

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
    } else if (lastMessage.includes("weight") || lastMessage.includes("metabolism") || lastMessage.includes("belly")) {
      response = `Weight changes during menopause are so frustrating but very common due to hormonal shifts. Here's how to approach this:

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
    } else if (lastMessage.includes("exercise") || lastMessage.includes("workout") || lastMessage.includes("fitness")) {
      response = `Exercise is one of the most powerful tools for managing menopause symptoms! Here's how to approach it:

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
    } else if (
      lastMessage.includes("hrt") ||
      lastMessage.includes("hormone replacement") ||
      lastMessage.includes("hormones")
    ) {
      response = `Hormone Replacement Therapy is an important decision to discuss with your healthcare provider. Here's how to prepare:

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
    } else {
      response = `Thank you for reaching out! I'm here to support you through your menopause journey.

I can help you with information about:
• Managing symptoms like hot flashes, sleep issues, and mood changes
• Nutrition and supplement guidance
• Exercise recommendations
• Discussing treatment options with your healthcare provider
• Emotional support and coping strategies

What specific aspect of menopause would you like to explore today? Remember, every woman's experience is unique, and I'm here to help you find approaches that work best for you.`
    }

    // Return immediate response
    return new Response(response, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("API Error:", error)

    return new Response(
      "I'm here to help with your menopause journey! I can provide information about managing symptoms, nutrition guidance, exercise recommendations, and emotional support. What would you like to discuss today?",
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      },
    )
  }
}
