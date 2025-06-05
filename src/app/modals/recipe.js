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

// ...........................................................................................

const foodsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    ingredients: { type: String },
    equipments: { type: String },
    steps: { type: String },
    category: { type: String }, // e.g., "indian", "italian", "thai"

    image: {
      name: { type: String },
      data: { type: Buffer },
      contentType: { type: String },
    },
  },
  { timestamps: true }
);

export const FoodsData =
  mongoose.models.FoodsData || mongoose.model("FoodsData", foodsSchema);
