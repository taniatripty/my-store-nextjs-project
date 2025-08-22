export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="mb-4 md:mb-0 text-xl font-bold">
          My Store
        </div>

        {/* Links */}
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-blue-400">Home</a>
          <a href="/products" className="hover:text-blue-400">Products</a>
          <a href="/dashboard/add-product" className="hover:text-blue-400">Add Product</a>
          <a href="/login" className="hover:text-blue-400">Login</a>
        </div>

        {/* Copyright */}
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} My Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
