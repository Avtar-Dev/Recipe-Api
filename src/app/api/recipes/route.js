// import { connectionStr } from "@/app/lib/db";
// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";

// const client = new MongoClient(connectionStr);

// export async function POST(request) {
//   try {
//     const payload = await request.json();
//     await client.connect();
//     const db = client.db("recipes");
//     const inventory = db.collection("inventory");

//     const result = await inventory.insertOne(payload);

//     return NextResponse.json({ success: true, data: result });
//   } catch (error) {
//     console.error("Error inserting recipe:", error);
//     return NextResponse.json({
//       success: false,
//       status: 500,
//       message: "Recipe not added",
//       headers: {
//         "Access-Control-Allow-Origin": "*", // Allow all origins (or specify your domain)
//         "Access-Control-Allow-Methods": "POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     });
//   }
// }

// export async function GET() {
//   try {
//     await client.connect();
//     const db = client.db("recipes");
//     const inventory = db.collection("inventory");

//     const result = await inventory.find({}).toArray();

//     return NextResponse.json({ success: true, Recipes: result });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { connectionStr } from "@/app/lib/db";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(connectionStr);

// CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend URL in production
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    await client.connect();
    const db = client.db("recipes");
    const inventory = db.collection("inventory");

    const result = await inventory.insertOne(payload);

    return new NextResponse(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error inserting recipe:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Recipe not added",
        error: error.message,
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db("recipes");
    const inventory = db.collection("inventory");

    const result = await inventory.find({}).toArray();

    return new NextResponse(
      JSON.stringify({ success: true, recipes: result }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
