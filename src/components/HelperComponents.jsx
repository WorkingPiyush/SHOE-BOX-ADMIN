import { useState } from "react";

export function Gallery({ images, name }) {
    const [active, setActive] = useState(0);
    const hasImages = images.length > 0;

    return (
        <div>
            <div className="flex aspect-square items-center justify-center overflow-hidden cursor-pointer rounded-xl bg-[#f3ecdc] hover:scale-105 hover:shadow transition-shadow delay-3 ease-in-out">
                {hasImages ? (
                    <img src={images[active]} alt={name} className="h-full w-full object-cover" />
                ) : (
                    <span className="text-7xl">👟</span>
                )}
            </div>
            {images.length > 1 && (
                <div className="mt-3 flex gap-3">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${active === i ? "border-stone-800" : "border-stone-200"
                                }`}
                        >
                            <img src={src} alt="" className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}