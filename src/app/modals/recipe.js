// app/modals/recipe.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    name: String,
    data: Buffer,
    contentType: String,
  },
  { timestamps: true }
);

export const Image =
  mongoose.models.Image || mongoose.model("Image", imageSchema);

///////////////////////////////////////////////////////////////////////////////////////
// app/models/Recipe.js
// import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    equipments: { type: String, required: true },
    steps: { type: String, required: true },
    category: { type: String, required: true },
    image: {
      data: Buffer,
      contentType: String,
      fileName: String,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev/hot reload
export const Recipe =
  mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
