const { users } = require('../data/mockData');


exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUsersById = (req, res) => {
    const user = users.find(u = u.id === req.params.id);

    if(!users){
        return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
};
 
exports.createNewUser = (req, res) => {
    const {name, email, disabilityType, interests } = req.body;
    
    const exists = users.find(u = u.email === email);
    if(exists){
         return res.status(404).json({ error: 'Email Already Exists' });
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
}

exports.


