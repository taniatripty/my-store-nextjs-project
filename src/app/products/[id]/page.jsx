import dbconnet, { collectionNames } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

export default async function ProductsDetails({ params }) {
  const p = await params;
  const data = await dbconnet(collectionNames.PRODUCTS_DATA).findOne({
    _id: new ObjectId(p.id),
  });
  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <img
            src={data.image || "/assets/placeholder.png"}
            alt={data.name}
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
            <p className="text-gray-600 mb-4">{data.description}</p>
            <p className="text-lg font-semibold mb-6">💲{data.price}</p>

            <button className="btn bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
