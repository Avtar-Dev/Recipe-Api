// import mongoose from "mongoose";
// import { Image } from "@/app/modals/recipe";
// import { connectionStr } from "@/app/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(req, { params }) {
//   try {
//     await mongoose.connect(connectionStr);

//     const image = await Image.findById(params.id);

//     if (!image || !image.data) {
//       return new NextResponse("Image not found", { status: 404 });
//     }

//     return new NextResponse(image.data.buffer, {
//       status: 200,
//       headers: {
//         "Content-Type": image.contentType,
//         "Content-Length": image.data.length,
//       },
//     });
//   } catch (error) {
//     console.error("Error serving image:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
