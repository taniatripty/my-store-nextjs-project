import React from "react";

export default function Highlights() {
  const features = [
    { title: "Fast Delivery", description: "Get your products delivered within 24 hours." },
    { title: "Best Quality", description: "Top-notch products from trusted suppliers." },
    { title: "Secure Payment", description: "Safe and secure payment gateways." },
    { title: "24/7 Support", description: "Our team is always ready to help you." },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
