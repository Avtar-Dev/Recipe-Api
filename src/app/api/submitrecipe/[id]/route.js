import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Image, Recipe } from "@/app/modals/recipe";
import { connectionStr } from "@/app/lib/db";
import { corsHeaders } from "@/app/api/cors";

export const GET = async (req, { params }) => {
  const paramsId = params.id;

  try {
    await mongoose.connect(connectionStr);

    const recipe = await Image.findById(paramsId);

    if (!recipe) {
      return NextResponse.json(
        { success: false, message: "Recipe not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const formatted = {
      _id: recipe._id.toString(),
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      equipments: recipe.equipments,
      steps: recipe.steps,
      category: recipe.category,
      imageUrl: recipe.image
        ? `data:${recipe.image.contentType};base64,${recipe.image.data.toString(
            "base64"
          )}`
        : null,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };

    return NextResponse.json(
      {
        success: true,
        recipe: formatted,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
};
