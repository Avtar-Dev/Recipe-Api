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
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file found" },
        {
          headers: corsHeaders,
        }
      );
    }

    const bufferData = await file.arrayBuffer();
    const buffer = Buffer.from(bufferData);

    const newImage = new Image({
      name: file.name,
      data: buffer,
      contentType: file.type,
    });

    await newImage.save();

    return NextResponse.json(
      {
        response: "Successfully Uploaded",
        success: true,
      },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      {
        response: "Failed",
        success: false,
        error: error.message,
      },
      {
        headers: corsHeaders,
      }
    );
  }
};

export const GET = async () => {
  try {
    await mongoose.connect(connectionStr);

    const images = await Image.find().sort({ createdAt: -1 });

    const formatted = images.map((img) => ({
      _id: img._id.toString(),
      name: img.name,
      imageUrl: `data:${img.contentType};base64,${img.data.toString("base64")}`,
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
