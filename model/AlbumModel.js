import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema(
  {
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
      ref: "User",
    },
  },
  { timestamps: true }
);

export const AlbumModel = mongoose.model("Album", AlbumSchema);
