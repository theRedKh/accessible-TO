const { items, users } = require('../data/mockData');

exports.search = (req, res) => {
  const { 
    query = '', 
    filters = [], 
    userId
  } = req.body;

  let results = [...items];

  if (filters.length > 0) {
    results = results.filter(item => filters.includes(item.type));
  }

  if (query) {
    const searchLower = query.toLowerCase();
    results = results.filter(item => 
      item.name.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.tags.some(tag => tag.includes(searchLower))
    );
  }

  if (userId) {
    const user = users.find(u => u.id === userId);
    
    if (user && user.disabilityType !== 'none') {
      const accessibilityMap = {
        mobility: ['wheelchair', 'ramp', 'elevator', 'accessible_parking'],
        visual: ['braille', 'audio_guide', 'service_animal_friendly'],
        hearing: ['sign_language', 'high_contrast_signage'],
        cognitive: ['low_noise']
      };

      const requiredFeatures = accessibilityMap[user.disabilityType] || [];
      
      // Filter items that have at least one required feature
      results = results.filter(item =>
        item.accessibilityFeatures.some(feature => 
          requiredFeatures.includes(feature)
        )
      );
    }

    // 4. Boost results matching user interests
    if (user && user.interests.length > 0) {
      results = results.map(item => {
        const matchingInterests = item.tags.filter(tag =>
          user.interests.some(interest => 
            tag.includes(interest.toLowerCase())
          )
        ).length;
        
        return { ...item, relevanceScore: matchingInterests };
      });
      
      results.sort((a, b) => {
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        return b.rating - a.rating;
      });
    }
  }

  if (!userId) {
    results.sort((a, b) => b.rating - a.rating);
  }

  res.json({
    count: results.length,
    results: results
  });
};

exports.getItemById = (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
};

exports.getAllItems = (req, res) => {
  res.json({
    count: items.length,
    items: items
  });
};