import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { FoodsData } from "@/app/modals/recipe";
import { connectionStr } from "@/app/lib/db";
import { corsHeaders } from "@/app/api/cors";

export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const POST = async (request) => {
  try {
    await mongoose.connect(connectionStr);

    const data = await request.formData();

    const name = data.get("name");
    const description = data.get("description");
    const ingredients = data.get("ingredients");
    const equipments = data.get("equipments");
    const steps = data.get("steps");
    const category = data.get("category");
    const file = data.get("image");

    const bufferData = await file?.arrayBuffer();
    const buffer = file ? Buffer.from(bufferData) : null;

    const newRecipe = new FoodsData({
      name,
      description,
      ingredients,
      equipments,
      steps,
      category,
      image: file
        ? {
            name: file.name,
            data: buffer,
            contentType: file.type,
          }
        : null,
    });

    await newRecipe.save();

    return NextResponse.json(
      {
        response: "Recipe uploaded successfully",
        success: true,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { response: "Upload failed", success: false, error: error.message },
      { headers: corsHeaders }
    );
  }
};

export const GET = async () => {
  try {
    await mongoose.connect(connectionStr);

    const recipes = await FoodsData.find().sort({ createdAt: -1 });

    const formatted = recipes.map((doc) => {
      let imageUrl = null;

      if (doc.image && doc.image.data) {
        imageUrl = `data:${
          doc.image.contentType
        };base64,${doc.image.data.toString("base64")}`;
      }

      return {
        _id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        ingredients: doc.ingredients,
        equipments: doc.equipments,
        steps: doc.steps,
        category: doc.category,
        imageUrl,
      };
    });

    return NextResponse.json(
      { success: true, recipes: formatted },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};
