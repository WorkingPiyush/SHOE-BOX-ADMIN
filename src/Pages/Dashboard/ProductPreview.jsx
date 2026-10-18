import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { deleteProduct } from "../../Api/apiProducts";
import { Gallery } from "../../components/HelperComponents";
import FullScreenLoader from "../../components/FullScreenLoader";


const LIST_PATH = "/products";
const inr = (n) => "₹" + n.toLocaleString("en-IN");
const cardCls = "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm";

function InfoRow({ label, value, className }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <span className="text-stone-500">{label}</span>
      <span className={`text-right font-medium ${className}`}>{value}</span>
    </div>
  );
}

export default function ProductPreview() {
  const { gender, slug } = useParams();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data: product, isLoading } = useProducts({ slug, gender });
  const handleEdit = () => {
    navigate(`${LIST_PATH}/${gender}/${slug}/edit`);
  };
  const handleDelete = async () => {
    const res = await deleteProduct({ id: product._id })
    if (res) {
      navigate(LIST_PATH);
    }
  };

  if (isLoading) {
    return <FullScreenLoader />
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf6ee] p-4 text-stone-800 md:p-8">
        <p className="mb-3">Product not found.</p>
        <button onClick={() => navigate(LIST_PATH)} className="text-sm text-stone-600 hover:underline">
          ← Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6ee] p-4 text-stone-800 md:p-8">
      <div className="mx-auto max-w-5xl space-y-5">
        <button onClick={() => navigate(LIST_PATH)} className="text-sm text-stone-600 cursor-pointer hover:underline hover:scale-103 transition-all duration-75 delay-2">
          ← Back to products
        </button>
        <h2 className="text-xl font-semibold selection:bg-red-600 selection:text-white">Product details</h2>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Main details */}
          <div className={`${cardCls} lg:col-span-2`}>
            <div className="grid gap-6 sm:grid-cols-2">
              <Gallery images={product.images} name={product.name} />

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-500">
                    {product.brand} · {product.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
                  <p className="mt-1 text-sm">
                    <span className="text-amber-500">★</span> {product.rating.toFixed(1)}{" "}
                    <span className="text-stone-500">({product.reviews} reviews)</span>
                  </p>
                </div>

                <p className="text-2xl font-semibold">{inr(product.price)}</p>

                <div>
                  <p className="mb-1 text-xs font-medium text-stone-600">Sizes available</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span key={s} className="rounded-lg border border-stone-300 px-3 py-1 text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium text-stone-600">Description</p>
                  <p className="text-sm leading-relaxed text-stone-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side cards */}
          <div className="space-y-5">
            <div className={cardCls}>
              <h3 className="mb-1 text-sm font-semibold">Product info</h3>
              <div className="divide-y divide-stone-100">
                <InfoRow label="Product ID" value={`SB-P${product.id}`} />
                <InfoRow label="Brand" className="capitalize" value={product.brand} />
                <InfoRow label="Category" className="capitalize" value={product.category} />
                <InfoRow label="Gender" className="capitalize" value={product.gender} />
                <InfoRow label="Added on" value={new Date(product?.createdAt).toLocaleDateString()} />
              </div>
            </div>

            <div className={`${cardCls} space-y-3`}>
              <h3 className="text-sm font-semibold">Actions</h3>
              <button
                onClick={handleEdit}
                className="w-full rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-stone-700"
              >
                Edit product
              </button>

              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="w-full rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
                >
                  Delete product
                </button>
              ) : (
                <div className="space-y-2 rounded-lg border border-rose-200 bg-rose-50 p-3">
                  <p className="text-sm text-rose-800">Delete this product permanently?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDelete}
                      className="flex-1 rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
