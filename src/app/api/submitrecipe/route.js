import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Image } from "@/app/modals/recipe";
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

    const newRecipe = new Image({
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

    const recipes = await Image.find().sort({ createdAt: -1 });

    const formatted = recipes.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      ingredients: doc.ingredients,
      equipments: doc.equipments,
      steps: doc.steps,
      category: doc.category,
      imageUrl: doc.image
        ? `data:${doc.image.contentType};base64,${doc.image.data.toString(
            "base64"
          )}`
        : null,
    }));

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

// pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp
// const client = new MongoClient(connectionStr);

// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 204,
//     headers: corsHeaders,
//   });
// }

// export async function POST(request) {
//   try {
//     const payload = await request.json();
//     await client.connect();
//     const db = client.db("submit-recipe");
//     const inventory = db.collection("recipes");

//     const result = await inventory.insertOne(payload);

//     return new NextResponse(JSON.stringify({ success: true, data: result }), {
//       status: 200,
//       headers: corsHeaders,
//     });
//   } catch (error) {
//     console.error("Error inserting recipe:", error);
//     return new NextResponse(
//       JSON.stringify({
//         success: false,
//         message: "Recipe not added",
//         error: error.message,
//       }),
//       {
//         status: 500,
//         headers: corsHeaders,
//       }
//     );
//   }
// }

// export async function GET() {
//   try {
//     await client.connect();
//     const db = client.db("submit-recipe");
//     const inventory = db.collection("recipes");

//     const result = await inventory.find({}).toArray();

//     return new NextResponse(
//       JSON.stringify({ success: true, recipes: result }),
//       {
//         status: 200,
//         headers: corsHeaders,
//       }
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return new NextResponse(
//       JSON.stringify({ success: false, error: error.message }),
//       {
//         status: 500,
//         headers: corsHeaders,
//       }
//     );
//   }
// }

// .....................................................................................
