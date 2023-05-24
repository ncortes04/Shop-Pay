const Color = require('../models/color');
const User = require('../models/user');

module.exports = {
  async addColor(req, res) {
    try {
      const { body, user } = req;
      
      // Check if the user is an admin
      const foundUser = await User.findById(user._id);
      if (foundUser.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      // Create the color
      const color = await Color.create(body);
      res.status(200).json({ message: 'Color added successfully', color });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding color' });
    }
  },

  async getColors(req, res) {
    try {
      const colors = await Color.find();
      res.json(colors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving colors' });
    }
  }
};
