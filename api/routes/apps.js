import express from 'express';
import App from '../models/App.js';

const router = express.Router();

// Create a new app
router.post('/', async (req, res) => {
  const { name, description, version } = req.body;

  console.log(req.body);

  try {
    const newApp = new App({
      name,
      description,
      version
    });

    console.log(newApp);

    const app = await newApp.save();
    res.json(app);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find();
    res.json(apps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a single app by ID
router.get('/:id', async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ msg: 'App not found' });
    }
    res.json(app);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update an app by ID
router.put('/:id', async (req, res) => {
  const { name, description, version } = req.body;

  try {
    let app = await App.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ msg: 'App not found' });
    }

    app.name = name;
    app.description = description;
    app.version = version;

    app = await app.save();
    res.json(app);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete an app by ID
router.delete('/:id', async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ msg: 'App not found' });
    }

    await app.remove();
    res.json({ msg: 'App removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
