import mongoose from 'mongoose';

const AppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // version: {
  //   type: String,
  //   required: true
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('App', AppSchema);
