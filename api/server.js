import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import versionRoutes from './routes/version.js';
import appRoutes from './routes/apps.js';
import userRoutes from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/version', versionRoutes);
app.use('/api/apps', appRoutes);
app.use('/api/users', userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "app", "browser")));

// Catch-all route for PWA - must be after API routes and static files
app.get('*', (req, res) => {
  // Don't handle API routes here
  if (req.path.startsWith('/api/')) {
    return res.status(404).send('API endpoint not found');
  }
  
  // Send the index.html for all other routes
  res.sendFile(path.join(__dirname, 'app', 'browser', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
