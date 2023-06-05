const User = require('../models/users');
const Item = require('../models/items');
const { ObjectId } = require('mongoose').Types;
const Color = require('../models/colors');
const Size = require('../models/sizes');
const Reviews = require('../models/Review');

module.exports = {
  async createItem({ body, user = null, params }, res) {
    try {
      const foundUser = await User.findOne({
        _id: user._id,
        role: 'admin'
      });

      if (!foundUser) {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
      }

      const newItem = new Item({
        brand: body.brand,
        name: body.name,
        price: body.price,
        category: body.category,
        description: body.description,
        hotTrendScore: 0,
        bestSellerRank: 0,
        featured: false
      });

      await newItem.save();

      res.status(200).json({ message: 'Success' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },

    async addVariation({ body, user = null, params }, res) {
    try {
        const foundUser = await User.findOne({
        _id: user._id,
        role: 'admin'
        });
    
        if (!foundUser) {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
    
        const { color, size, itemNumber } = body;
    
        const item = await Item.findOne({ itemNumber });
    
        if (!item) {
        return res.status(404).json({ message: 'Item not found' });
        }
    
        const existingVariation = item.variations.find((variation) => {
        const variationColor = variation.color instanceof ObjectId ? variation.color.toString() : variation.color;
        const variationSize = variation.size instanceof ObjectId ? variation.size.toString() : variation.size;
        return variationColor === color && variationSize === size;
        });
    
        if (existingVariation) {
        existingVariation.inventory += 1; // Increase the inventory by 1
        return res.status(200).json({ message: 'Success !! Variation Already Exists, quantity increased' });
        } else {
        const newVariation = {
            color,
            size,
            inventory: 1
        };
        item.variations.push(newVariation);
        }
    
        await item.save();
    
        res.status(200).json({ message: 'Success, New Variation Has Been Created' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
    },
async servePosts(req, res) {
    try {
        const items = await Item.find()
        .populate({
            path: 'category',
            select: 'name'
        })
        .select('-variations'); 
    
        res.status(200).json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
    },
    
    async getByCategory(req, res) {
      const { category } = req.body
      try {
        const items = await Item.find({ category: category })
          .populate({
            path: 'category',
            select: 'name',
          })
          .select('-variations')
          .limit(4);
        if (items.length === 0) {
          return res.status(404).json({ message: 'No items found for the category' });
        }
    
        res.status(200).json(items);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
      }
    },

    async getIndividualItem(req, res) {
      try {
        const item = await Item.findById(req.params.id)
          .populate({
            path: 'category',
            select: 'name'
          })
          .populate({
            path: 'variations',
            populate: [
              { path: 'color', model: Color },
              { path: 'size', model: Size, select: 'name' }
            ]
          })
          item.reviews = await Reviews.find({ item_id: req.params.id })
          .populate({
            path: 'user_id',
            select: 'username'
          });
          if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
    
        res.status(200).json(item);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
      }
    },
  

  async getInventoryCount(req, res) {
    try {
      const { size, color } = req.query;

      const inventoryCount = await Item.countDocuments({
        'colors': color,
        'sizes.size': size,
      });

      res.status(200).json({ inventoryCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
};
