import axios from "axios";

export const fetchAdmin = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
        withCredentials: true,
    });
    return res.data;
};

export const loginAdmin = async (data) => {
   const res =  await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        data,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
    );
    return res.data;
}

export const getUsers = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, {
            withCredentials: true,
        })
        return res.data.users;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message, { cause: error });
    }
}
export const logoutAdmin = async () => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/logout`,
        {},
        {
            withCredentials: true,
        }
    );
    return res.data;
}
