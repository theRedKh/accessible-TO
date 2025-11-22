const { users } = require('../data/mockData');

const VALID_DISABILITY_TYPES = ['mobility', 'visual', 'hearing', 'cognitive', 'none'];

function isValidDisabilityType(type) {
  return VALID_DISABILITY_TYPES.includes(type);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

exports.createUser = (req, res) => {
  const { name, email, disabilityType, interests } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    disabilityType: disabilityType || 'none',
    interests: interests || []
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const { disabilityType, interests } = req.body;
  const userIndex = users.findIndex(u => u.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (disabilityType) users[userIndex].disabilityType = disabilityType;
  if (interests) users[userIndex].interests = interests;

  res.json(users[userIndex]);
};
