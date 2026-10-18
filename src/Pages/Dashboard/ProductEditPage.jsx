import { useEffect, useState } from "react";
import { newImageSchema, productSchema } from "../../Validator/productValidation";
import { updateProduct } from "../../Api/apiProducts";
import { toast } from "react-toastify";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate, useParams } from "react-router-dom";
import z from 'zod';

const inputCls = "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-800";
const cardCls = "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm";

const Field = ({ label, children }) => (
    <label className="block">
        <span className="mb-1 block text-xs font-medium text-stone-600">{label}</span>
        {children}
    </label>
);

const SIZES = [5, 6, 7, 8, 9, 10, 11, 12];
const GENDERS = ["male", "female", "kids"];
const CATEGORIES = ["Sneakers", "Running", "Formal", "Sports", "Casual", "Sandals", "Boots", "Walking", "Training"];



function ProductEditPage() {
    const navigate = useNavigate();
    const { gender, slug } = useParams()
    const { data: product } = useProducts({ gender, slug });
    const empty = {
        brand: product?.brand || "", name: product?.name || "", price: product?.price || "", sizes: product?.sizes || "", gender: product?.gender || "",
        category: product?.category || "", description: product?.description || ""
    };
    const [form, setForm] = useState(empty);
    const [images, setImages] = useState([]);
    const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

    useEffect(() => {
        if (product) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setImages(product.images.map((url) => ({ url, file: null })))
        }
    }, [product])

    const toggleSize = (s) =>
        setForm({
            ...form,
            sizes: form.sizes.includes(s) ? form.sizes.filter((x) => x !== s) : [...form.sizes, s],
        });

    const pickImages = (e) => {
        const freeSlot = 2 - images.length;
        const files = Array.from(e.target.files).slice(0, freeSlot);
        setImages([...images, ...files.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
        e.target.value = "";
    };
    const submit = async (e) => {
        e.preventDefault();
        const newFiles = images.filter((i) => i.file).map((i) => i.file);
        const keptUrls = images.filter((i) => !i.file).map((i) => i.url);

        const info = productSchema.partial().safeParse(form);
        if (!info.success) {
            const message = info.error.issues[0].message;
            console.error(message);
            return;
        }
        const files = z.array(newImageSchema).safeParse(newFiles);
        if (!files.success) {
            const message = files.error.issues[0].message;
            console.error(message);
            return;
        }

        const totalImg = newFiles.length + keptUrls.length;
        if (totalImg < 1 || totalImg > 2) {
            toast.error("A product needs 1 to 2 images.");
            return;
        }

        try {
            const formData = new FormData();
            Object.entries(info.data).forEach(([k, v]) => {
                if (Array.isArray(v)) {
                    formData.append(k, JSON.stringify(v))
                }
                else formData.append(k, v);
            })
            keptUrls.forEach((url) => formData.append("existingImages", url));
            newFiles.forEach((file) => formData.append("images", file));
            const res = await updateProduct({ formData, slug, gender })
            toast.success(res.message);
            navigate("/products")
        } catch (error) {
            console.log(error)
        }
    };

    const upperCase = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1, 999)}`

    return (
        <>
            <h2 className="mb-5 text-xl font-semibold">Update product</h2>
            <button onClick={() => navigate(-1)} className="text-sm text-stone-600 cursor-pointer hover:underline hover:scale-103 transition-all duration-75 delay-2">
                ← Back to products
            </button>
            <form onSubmit={submit} className="grid gap-5 lg:grid-cols-3">
                <div className={cardCls}>
                    <h3 className="mb-3 text-sm font-semibold">
                        Product images <span className="font-normal text-stone-500">(max 2)</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {images.map((img, i) => (
                            <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-stone-200">
                                <img src={img.url || img} alt="productImg" className="h-full w-full object-cover" />
                                <div
                                    className="absolute top-0.5 right-1 h-6 w-6 rounded-full text-center bg-red-600 flex items-center justify-center active:scale-102">
                                    <button
                                        type="button"
                                        onClick={() => setImages(images.filter((_, j) => j !== i))}
                                        className='cursor-pointer  text-2xl'
                                    >×</button>
                                </div>
                            </div>
                        ))}
                        {images.length < 2 && (
                            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 text-xs text-stone-500 hover:border-stone-800">
                                <span className="text-2xl">＋</span>
                                Upload
                                <input type="file" accept="image/*" multiple hidden onChange={pickImages} />
                            </label>
                        )}
                    </div>
                </div>

                <div className={`${cardCls} space-y-4 lg:col-span-2`}>
                    <h3 className="text-sm font-semibold">Product details</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Brand">
                            <input required className={inputCls} value={form.brand} onChange={set("brand")} placeholder="Nike" />
                        </Field>
                        <Field label="Name">
                            <input required className={inputCls} value={form.name} onChange={set("name")} placeholder="AirStride Runner" />
                        </Field>
                        <Field label="Price (₹)">
                            <input required type="number" min="0" className={inputCls} value={form.price} onChange={set("price")} />
                        </Field>
                        <Field label="Gender">
                            <select className={inputCls} value={form.gender} onChange={set("gender")}>
                                {GENDERS.map((g) => <option key={g}>{upperCase(g)}</option>)}
                            </select>
                        </Field>
                        <Field label="Category">
                            <select className={inputCls} value={form.category} onChange={set("category")}>
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </Field>
                    </div>

                    <div>
                        <span className="mb-1 block text-xs font-medium text-stone-600">Sizes</span>
                        <div className="flex flex-wrap gap-2">
                            {SIZES.map((s) => (
                                <button
                                    type="button"
                                    key={s}
                                    onClick={() => toggleSize(s)}
                                    className={`h-9 w-11 rounded-lg border text-sm cursor-pointer ${form.sizes.includes(s)
                                        ? "border-stone-800 bg-stone-800 text-white"
                                        : "border-stone-300 bg-white"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Field label="Description">
                        <textarea rows="4" className={inputCls} value={form.description} onChange={set("description")} />
                    </Field>

                    <div className="flex items-center gap-3">
                        <button className="rounded-lg bg-stone-800 px-5 py-2 text-sm font-medium cursor-pointer text-white hover:bg-stone-700">
                            Update product
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}


export default ProductEditPage