"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  created_at?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProducts, setShowProducts] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>("");

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if Supabase environment variables are available
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        setConnectionStatus("Using mock data - Environment variables not set");
        // Use mock data if environment variables are not set
        const mockProducts: Product[] = [
          { id: 1, name: "produkti1", price: 20 },
          { id: 2, name: "produkti2", price: 33 },
          { id: 3, name: "produkti3", price: 4444444 },
        ];

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
        setProducts(mockProducts);
        setShowProducts(true);
        return;
      }

      // Try to use Supabase if environment variables are available
      const { createClient } = await import("../../lib/supabase/client");
      const supabase = createClient();

      // Debug: Log the query attempt
      console.log("Attempting to query products table...");
      const { data, error } = await supabase.from("products").select("*");
      console.log("Query result:", { data, error });

      if (error) {
        setError(`Database error: ${error.message}`);
        setConnectionStatus("Failed to connect to Supabase");
      } else {
        setProducts(data || []);
        setShowProducts(true);
        setConnectionStatus(
          `Connected to Supabase - Found ${data?.length || 0} products`
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Connection error: ${err.message}`);
      } else {
        setError(
          "Failed to fetch products. Please check your environment variables."
        );
      }
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

      {connectionStatus && (
        <div
          className={`mb-4 p-3 rounded ${
            connectionStatus.includes("Failed") ||
            connectionStatus.includes("mock data")
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          Status: {connectionStatus}
        </div>
      )}

      {showProducts && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <div className="mb-2 w-full h-40 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
              <h2 className="text-xl text-red-900 font-semibold">
                {product.name}
              </h2>
              <p className="mt-2 font-bold text-green-600">${product.price}</p>
              {product.created_at && (
                <p className="text-sm text-gray-500 mt-1">
                  Added: {new Date(product.created_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
