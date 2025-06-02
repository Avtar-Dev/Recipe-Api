import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { corsHeaders } from "@/app/api/cors";
import { MongoClient } from "mongodb";

const client = new MongoClient(connectionStr);

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
    const db = client.db("foods");
    const inventory = db.collection("data");

    const result = await inventory.insertOne(payload);

    return new NextResponse(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error inserting foods:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "foods not added",
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
    const db = client.db("foods");
    const inventory = db.collection("data");

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
