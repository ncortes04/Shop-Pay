const Category = require('../models/category');
const Color = require('../models/colors');
const User = require('../models/users');
const Items = require('../models/items')
const Sizes = require('../models/sizes');
const categoryData = require('./categories.json');
const colorData = require('./colors.json');
const sizesData = require('./sizes.json');
const userData = require('./userData.json');
const bcrypt = require('bcrypt');
const itemData = require('./items.json')
const db = require('../config/connection');
const processItemData = async () => {
  try {
    const processedData = [];
    for (const item of itemData) {
      const category = await Category.findOne({ name: item.category });
      const processedItem = { ...item, category: category._id };
      processedData.push(processedItem);
    }
    await Items.insertMany(processedData);
    console.log(processedData);
  } catch (error) {
    console.log(error);
  }
};

const seedDatabase = async () => {
  try {
    await Promise.all([
      Category.deleteMany({}),
      Color.deleteMany({}),
      User.deleteMany({}),
      Sizes.deleteMany({}),
      Items.deleteMany({})
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
      User.insertMany(hashedUsers),
    ]);

    await processItemData(); // Call the function after establishing the database connection

    console.log('Categories, colors, sizes, and users inserted successfully.');
    db.close();
  } catch (err) {
    console.error('Error bulk inserting categories, colors, and users:', err);
    db.close();
  }
};

seedDatabase();
