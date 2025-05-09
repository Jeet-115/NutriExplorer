import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const cartItems = await Cart.find();
  res.json(cartItems);
});

router.post('/', async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(400).json({ error: 'Item already exists or invalid data' });
  }
});

router.delete('/:code', async (req, res) => {
  await Cart.deleteOne({ code: req.params.code });
  res.json({ message: 'Deleted successfully' });
});

router.patch('/:code', async (req, res) => {
  const { quantity } = req.body;
  const item = await Cart.findOneAndUpdate(
    { code: req.params.code },
    { quantity },
    { new: true }
  );
  res.json(item);
});

export default router;
