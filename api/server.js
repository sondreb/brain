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

app.use('/auth', authRoutes);
app.use('/version', versionRoutes);
app.use('/apps', appRoutes);
app.use('/users', userRoutes);

app.use("/", express.static(path.join(__dirname, "app", "browser")));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
