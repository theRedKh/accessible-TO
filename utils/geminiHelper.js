// utils/geminiHelper.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini with your API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function queryGemini(prompt) {
  try {
    // Use a stable Gemini model that works for generateContent
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini Response:', text.substring(0, 100) + '...');
    
    // Try parsing JSON if possible
    try {
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleanText);
    } catch {
      return { response: text };
    }
    
  } catch (error) {
    console.error('❌ Gemini API Error:', error.message);
    // Fallback for hackathon
    return {
      topRecommendations: [
        {
          itemId: '1',
          itemName: 'Fallback Recommendation',
          reason: 'Gemini API is unavailable. Please check your API key.'
        }
      ],
      accessibilityAdvice: 'Always call ahead to verify accessibility features.',
      error: error.message
    };
  }
}

module.exports = { queryGemini };
