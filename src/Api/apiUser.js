import axios from "axios";

export const fetchAdmin = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
        withCredentials: true,
    });
    return res.data;
};



export const loginAdmin = async (data) => await axios.post(
    `${import.meta.env.VITE_API_URL}/admin/login`,
    data,
    {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }
);

export const postProduct = async (data) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/add`,
        data,
        {
            withCredentials: true,
        }
    );
    return response.data
}