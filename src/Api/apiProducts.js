import axios from "axios";

export const postProduct = async (data) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/product/add`,
        data,
        {
            withCredentials: true,
        }
    );
    return response.data
}

export const updateProduct = async ({ formData, slug, gender }) => {
    const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/product/update/?gender=${gender}&slug=${slug}`,
        formData,
        {
            withCredentials: true,
        }
    );
    return response.data
}


export const fetchProduct = async ({ queryKey }) => {
    const [_key, gender, page] = queryKey;
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/products?gender=${gender}&page=${page}&limit=20`, {
        withCredentials: true,
    });
    return res.data;
};

export const getProducts = async ({ slug, gender }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/page?gender=${gender}&slug=${slug}`, {
            withCredentials: true,
        });
        return res.data
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message, { cause: err });
    }
}

export const deleteProduct = async ({ id }) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/admin/product/delete/?productId=${id}`, {
        withCredentials: true,
    })
}


