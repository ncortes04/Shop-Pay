const Category = require('../models/category');
const Color = require('../models/colors');
const User = require('../models/users');
const Sizes = require('../models/sizes');
const categoryData = require('./categories.json');
const colorData = require('./colors.json');
const sizesData = require('./sizes.json');
const userData = require('./userData.json');
const bcrypt = require('bcrypt');
const db = require('../config/connection');

const seedDatabase = async () => {
  try {
    await Promise.all([
      Category.deleteMany({}),
      Color.deleteMany({}),
      User.deleteMany({}),
      Sizes.deleteMany({})
    ]);

    // Hash passwords before inserting users
    const hashedUsers = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    await Promise.all([
      Category.insertMany(categoryData),
      Color.insertMany(colorData),
      Sizes.insertMany(sizesData),
      User.insertMany(hashedUsers)
    ]);

    console.log('Categories, colors, sizes, and users inserted successfully.');
    db.close();
  } catch (err) {
    console.error('Error bulk inserting categories, colors, and users:', err);
    db.close();
  }
};

seedDatabase();
