const { queryGemini } = require('../utils/geminiHelper.js');
const { users } = require('../data/mockData');

exports.getRecommendations = async (req, res) => {
  try {
    const { userId, query, searchResults } = req.body;
    if (!userId || !searchResults) {
      return res.status(400).json({ error: 'userId and searchResults are required' });
    }

    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const prompt = `
User Profile:
- Disability Type: ${user.disabilityType}
- Interests: ${user.interests.join(', ')}
- Search Query: "${query}"
Available Options: ${JSON.stringify(searchResults, null, 2)}
`;

    let aiResponse;
    try {
      aiResponse = await queryGemini(prompt); 
    } catch (err) {
      console.error('Gemini API failed:', err);
      aiResponse = {
        topRecommendations: searchResults.map(item => ({
          itemId: item.id,
          itemName: item.name,
          reason: `Fallback: suitable for ${user.disabilityType}`
        })),
        accessibilityAdvice: 'Always check accessibility features before visiting.',
        alternativeSuggestions: ['Try other similar locations or events'],
        error: 'Gemini API failed, using fallback response'
      };
    }

    res.json(aiResponse);

  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
