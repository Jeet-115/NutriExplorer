import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import favoritesRouter from "./routes/favorites.js";
import cartRoutes from './routes/cart.js';

dotenv.config();
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use('/api/cart', cartRoutes);
app.use("/api/favorites", favoritesRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
