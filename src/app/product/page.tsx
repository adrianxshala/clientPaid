import { createClient } from "../../lib/supabase/client";

export const revalidate = 0; // opsionale, fetch fresh çdo herë

export default async function Home() {
  // Merr produktet nga Supabase
  const supabase = createClient();
  const { data: products, error } = await supabase
    .from("productss")
    .select("*");

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <div className="mb-2 w-full h-40 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
            <h2 className="text-xl text-red-900 font-semibold">{product.name}</h2>
            <p className="mt-2 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
