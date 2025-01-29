const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const versionRoutes = require('./routes/version');
const appRoutes = require('./routes/apps');
const userRoutes = require('./routes/users');

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
