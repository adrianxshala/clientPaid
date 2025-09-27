"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: number;
  name: string;
  price: number;
  created_at?: string;
}

export default function TestProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const testProductsQuery = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);

    try {
      const supabase = createClient();

      // Test 1: Basic query
      console.log("Testing basic products query...");
      const { data, error } = await supabase.from("products").select("*");

      setDebugInfo({
        data,
        error,
        dataLength: data?.length || 0,
        errorMessage: error?.message,
        errorCode: error?.code,
        errorDetails: error?.details,
        errorHint: error?.hint,
      });

      if (error) {
        setError(`Query error: ${error.message}`);
        console.error("Supabase error:", error);
      } else {
        setProducts(data || []);
        console.log("Products found:", data?.length || 0);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Connection error: ${errorMessage}`);
      console.error("Connection error:", err);
    } finally {
      setLoading(false);
    }
  };

  const testWithAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Test with authentication
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("Current user:", user);

      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        setError(`Authenticated query error: ${error.message}`);
      } else {
        setProducts(data || []);
        setDebugInfo((prev) => ({
          ...prev,
          authenticatedQuery: {
            data,
            error,
            user: user?.email || "No user",
          },
        }));
      }
    } catch (err) {
      setError(
        `Auth test error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Products Debug Page
        </h1>

        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Products Query</h2>

            <div className="space-x-4 mb-6">
              <button
                onClick={testProductsQuery}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Testing..." : "Test Basic Query"}
              </button>

              <button
                onClick={testWithAuth}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? "Testing..." : "Test with Auth"}
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {debugInfo && (
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h3 className="font-semibold mb-2">Debug Information:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}

            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Products Found: {products.length}
              </h3>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border p-3 rounded">
                      <p>
                        <strong>ID:</strong> {product.id}
                      </p>
                      <p>
                        <strong>Name:</strong> {product.name}
                      </p>
                      <p>
                        <strong>Price:</strong> ${product.price}
                      </p>
                      <p>
                        <strong>Created:</strong> {product.created_at}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No products found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
