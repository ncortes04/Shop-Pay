const Category = require('../models/category');
const Color = require('../models/colors');
const User = require('../models/users');
const Items = require('../models/items');
const Sizes = require('../models/sizes');
const Variation = require('../models/variations')
const Purchases = require('../models/purchase');
const Reviews = require('../models/Review');
const categoryData = require('./categories.json');
const colorData = require('./colors.json');
const variationData = require('./variationData.json')
const sizesData = require('./sizes.json');
const userData = require('./userData.json');
const purchaseData = require('./purchases.json');
const reviewData = require('./reviewsData.json');
const bcrypt = require('bcrypt');
const itemData = require('./items.json');
const db = require('../config/connection');

const processItemData = async () => {
  try {
    const processedData = [];

    for (const item of itemData) {
      const category = await Category.findOne({ name: item.category });

      if (!category) {
        console.log(`Category not found for item: ${item.name}`);
        continue;
      }

      const processedItem = {
        ...item,
        category: category._id
      };

      processedData.push(processedItem);
    }

    await Items.insertMany(processedData);
    console.log('Items inserted successfully');
  } catch (error) {
    console.log(error);
  }
};

const processPurchaseData = async (purchaseData) => {
  try {
    const processedData = [];

    for (const purchase of purchaseData) {
      const userIndex = purchase.user - 1; // Adjust index since user index starts from 1
      const user = await User.findOne().skip(userIndex);

      if (!user) {
        console.log(`User not found for purchase: ${purchase.user}`);
        continue;
      }

      const items = [];

      for (const purchaseItem of purchase.items) {
        const itemIndex = purchaseItem.item - 1; // Adjust index since item index starts from 1
        const item = await Items.findOne().skip(itemIndex);

        if (!item) {
          console.log(`Item not found for purchase item: ${purchaseItem.item}`);
          continue;
        }

        items.push({
          item: item._id,
          quantity: purchaseItem.quantity
        });

        // Increment the purchase count for the item
        await Items.findByIdAndUpdate(
          item._id,
          { $inc: { purchaseCount: purchaseItem.quantity } },
          { new: true }
        );
      }

      const processedPurchase = {
        user: user._id,
        items,
        totalPrice: purchase.totalPrice,
        purchaseDate: purchase.purchaseDate
      };

      processedData.push(processedPurchase);
    }

    await Purchases.insertMany(processedData);
  } catch (error) {
    console.log(error);
  }
};

const processReviewData = async () => {
  try {
    const processedData = [];
    const users = await User.find();
    const items = await Items.find();

    for (const review of reviewData) {
      const user = users[review.user_id - 1];
      const item = items[review.item_id - 1];

      if (!user) {
        console.log(`User not found for review: ${review.user_id}`);
        continue;
      }

      if (!item) {
        console.log(`Item not found for review: ${review.item_id}`);
        continue;
      }

      const processedReview = new Reviews({
        ...review,
        user_id: user._id,
        item_id: item._id
      });

      await processedReview.save();
      processedData.push(processedReview);
    }

    console.log('Reviews inserted successfully');
  } catch (error) {
    console.log(error);
  }
};
const seedVariations = async () => {
  try {
    const colors = await Color.find();
    const sizes = await Sizes.find();
    const items = await Items.find();

    for (const variation of variationData) {
      const color = colors[variation.color - 1];
      const size = sizes[variation.size - 1];
      const item = items[variation.item - 1];

      if (!color) {
        console.log(`Color not found for variation: ${variation.color}`);
        continue;
      }

      if (!size) {
        console.log(`Size not found for variation: ${variation.size}`);
        continue;
      }

      if (!item) {
        console.log(`Item not found for variation: ${variation.item}`);
        continue;
      }

      const processedVariation = new Variation({
        color: color._id,
        size: size._id,
        item_id: item._id,
        inventory: variation.inventory
      });

      await processedVariation.save();

      item.variations.push(processedVariation); // Push the newly created variation's ID to the item's variations array
      await item.save();
    }

    console.log('Variations inserted successfully');
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
      Items.deleteMany({}),
      Purchases.deleteMany({}),
      Reviews.deleteMany({})
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

    await processItemData();
    await processPurchaseData(purchaseData);
    await processReviewData();
    await seedVariations()
    console.log('Categories, colors, sizes, users, items, and reviews inserted successfully');
    db.close();
  } catch (err) {
    console.error('Error bulk inserting categories, colors, sizes, users, items, and reviews:', err);
    db.close();
  }
};

seedDatabase();
