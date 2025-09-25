"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProducts, setShowProducts] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.from("productss").select("*");

      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
        setShowProducts(true);
      }
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>

      <button
        onClick={fetchProducts}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 mb-6"
      >
        {loading ? "Loading..." : "Show Products"}
      </button>

      {error && <div className="text-red-600 mb-4">Error: {error}</div>}

      {showProducts && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <div className="mb-2 w-full h-40 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
              <h2 className="text-xl text-red-900 font-semibold">
                {product.name}
              </h2>
              <p className="mt-2 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
