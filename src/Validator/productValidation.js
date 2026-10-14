import { z } from "zod";
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

export const productSchema = z.object({
    brand: z.string().min(4, "Brand is required"),
    name: z.string().min(4, "Name is required"),
    price: z.coerce.number().positive("Price must be greater than 0"),
    sizes: z.array(z.number()).min(1, "At least one size is required"),
    gender: z.string().min(1, "Gender is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(5, "Description is required"),
    images: z.array(z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, "Image must be smaller than 2MB.")
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only JPG, PNG and WebP images are allowed."))
        .min(1, "Upload at least 1 image.")
        .max(2, "You can upload a maximum of 2 images."),
})

export const newImageSchema = z
    .instanceof(File)
    .refine((f) => f.size <= MAX_FILE_SIZE, "Each image must be smaller than 2MB.")
    .refine((f) => ACCEPTED_IMAGE_TYPES.includes(f.type), "Only JPG, PNG and WebP images are allowed.");