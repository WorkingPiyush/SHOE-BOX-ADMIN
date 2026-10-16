import axios from 'axios'
export const getOrders = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`, {
            withCredentials: true,
        });
        return res.data
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message, { cause: err });
    }
}

export const getOrder = async (id) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/order/?id=${id}`, {
            withCredentials: true,
        });
        return res.data.orderPreview;
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message, { cause: err });
    }
}

export const orderUpdate = async ({ id, status }) => {
    try {
        const update = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/order/update/?id=${id}`, { status }, {
            withCredentials: true,
        })
        return update.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message, { cause: error });
    }
};



