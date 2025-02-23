import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBpYLhnRGqYWNbNX1SPe3PevyP2UlC1pXk");

const MENTAL_HEALTH_CONTEXT = `You are Sukhify, a compassionate mental health assistant focused on providing support and guidance. 
Your purpose is to:
- Help users manage stress, anxiety, and other mental health concerns
- Provide evidence-based coping strategies and relaxation techniques
- Encourage seeking professional help when needed
- Maintain a supportive, non-judgmental tone
- Only discuss topics related to mental health and well-being

If users ask about topics unrelated to mental health, gently redirect them to mental health discussions.
In case of emergency or crisis, always recommend contacting professional help or emergency services.`;

export async function getMentalHealthResponse(message: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `${MENTAL_HEALTH_CONTEXT}\n\nUser: ${message}\nAssistant:`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // If the response is empty or there's an error, provide a fallback
    if (!response.trim()) {
      return "I'm here to help with your mental health concerns. Could you please share more about what's troubling you?";
    }

    return response;
  } catch (error) {
    console.error('Error generating response:', error);
    return "I apologize, but I'm having trouble processing your request. Please try rephrasing your question about mental health, and I'll do my best to help.";
  }
}