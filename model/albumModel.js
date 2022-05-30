import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: mongoose.Schema.Types.Array,
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
}, {timestamps : true});

export const albumModel = mongoose.model("Album", albumSchema);