// "use server";

// import { authOptions } from "@/lib/authoptions";
// import dbconnet, { collectionNames } from "@/lib/dbconnect";
// import { getServerSession } from "next-auth/next";


// export async function POST(req) {
//   try {
//     // Get the logged-in user session
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return new Response(
//         JSON.stringify({ message: "You must be logged in to add a product." }),
//         { status: 401 }
//       );
//     }

//     const body = await req.json(); // get product data from client
//     const { name, image, price, description } = body;

//     if (!name || !image || !price || !description) {
//       return new Response(
//         JSON.stringify({ message: "All fields are required" }),
//         { status: 400 }
//       );
//     }

//     const collection = dbconnet(collectionNames.PRODUCTS_DATA);

//     const result = await collection.insertOne({
//       name,
//       image,
//       price: Number(price),
//       description,
//       userId: session.user.id, // save which user added the product
//       createdAt: new Date(),
//     });

//     result.insertedId = result.insertedId.toString();

//     return new Response(
//       JSON.stringify({ message: "Product added", result }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "Server error" }), {
//       status: 500,
//     });
//   }
// }

"use server";

import { authOptions } from "@/lib/authoptions";
import dbconnet, { collectionNames } from "@/lib/dbconnect";
import { getServerSession } from "next-auth/next";

// POST: Add product
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "You must be logged in" }), { status: 401 });
    }

    const body = await req.json();
    const { name, image, price, description } = body;

    if (!name || !image || !price || !description) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const collection = dbconnet(collectionNames.PRODUCTS_DATA);

    const result = await collection.insertOne({
      name,
      image,
      price: Number(price),
      description,
      userId: session.user.id,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "Product added", product: { ...body, _id: result.insertedId.toString() } }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}

// GET: Fetch all products
export async function GET() {
  try {
    const products = await dbconnet(collectionNames.PRODUCTS_DATA).find({}).toArray();
    const formatted = products.map((p) => ({ ...p, _id: p._id.toString() }));
    return new Response(JSON.stringify(formatted), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch products" }), { status: 500 });
  }
}
