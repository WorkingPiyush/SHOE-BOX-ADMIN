/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageChangeBtn from "../../components/PageChangeBtn";
import { Link } from "react-router-dom";
import { fetchProduct } from "../../Api/apiProducts";

const inr = (n) => "₹" + n.toLocaleString("en-IN");
const GENDER_SECTION = ["male", "female", "kids"];
const HEADERS = ["Product", "Brand", "Category", "Gender", "Price", "Rating", "Sizes available"];
const upperCase = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1, 999)}`



function ProductIcon({ src, alt }) {
  return src ? (
    <img src={src} alt={alt} draggable={"false"} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
  ) : (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3ecdc] text-xl">👟</span>
  );
}
export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState('male');
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', gender, page],
    queryFn: fetchProduct,
    staleTime: 10 * 60 * 1000,
    keepPreviousData: true,
  });

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < data?.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const updateGender = (e) => {
    setGender(e.target.value);
  }


  useEffect(() => {
    if (data?.totalPages > page) {
      queryClient.prefetchQuery({
        queryKey: ['products', gender, page + 1],
        queryFn: fetchProduct,
      });
    }
  }, [data, page, gender, queryClient])

  useEffect(() => {
    setPage(1);
  }, [gender])


  return (
    <div className="min-h-screen bg-[#faf6ee] p-4 text-stone-800 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Products</h2>
          <span className="text-sm text-stone-500">Showing {data?.product?.length} items</span>
          <div >
            <label className="gap-2 text-sm text-stone-600 px-2">Selected Gender:</label>
            <select value={gender} onChange={updateGender} name="gender" id="gender-select" className="rounded-lg border border-stone-300 bg-white px-2 py-1">
              {GENDER_SECTION.map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="mb-3 text-sm text-rose-700">{error}</p>}

        <div
          className={`overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm transition-opacity ${isLoading ? "opacity-50" : ""
            }`}
        >
          <table className="w-full min-w-205 text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase text-stone-500">
              <tr>
                {HEADERS.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 30 }).map((_, i) => (
                  <tr key={i} className="border-b border-stone-100">
                    <td colSpan={HEADERS.length} className="px-4 py-3">
                      <div className="h-10 animate-pulse rounded-lg bg-[#f0e8d6]" />
                    </td>
                  </tr>
                ))
                : data?.product?.map((p) => (
                  <tr key={p.id} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ProductIcon src={p.thumbnail} alt={p.name} />
                        <Link to={`/products/${p.gender}/${p.slug}`} className="font-medium">{p.name}</Link>
                      </div>
                    </td>
                    <td className="px-4 py-3">{upperCase(p.brand)}</td>
                    <td className="px-4 py-3 text-stone-600">{upperCase(p.category)}</td>
                    <td className="px-4 py-3 text-stone-600">{upperCase(p.gender)}</td>
                    <td className="px-4 py-3 font-medium">{inr(p.price)}</td>
                    <td className="px-4 py-3">
                      <span className="text-amber-500">★</span> {p.rating.toFixed(1)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.sizes.map((s) => (
                          <span key={s} className="rounded-md border border-stone-300 px-1.5 py-0.5 text-xs">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Cursor pagination */}
        <PageChangeBtn currentPage={page} data={data} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
      </div>
    </div>
  );
}
