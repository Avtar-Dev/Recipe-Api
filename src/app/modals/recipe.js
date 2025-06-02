import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    ingredients: String,
    equipments: String,
    steps: String,
    category: String,
    image: {
      name: String,
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export const Image =
  mongoose.models.Image || mongoose.model("Image", recipeSchema);
