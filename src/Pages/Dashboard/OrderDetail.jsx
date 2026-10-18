import { useNavigate, useParams } from 'react-router-dom';
import { orderUpdate } from '../../Api/apiOrders';
import { useOrder } from '../../hooks/useOrders';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FullScreenLoader from '../../components/FullScreenLoader';

const cardCls = "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm";
const badgeCls = {
    confirmed: "bg-amber-100 text-amber-800",
    shipped: "bg-sky-100 text-sky-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-rose-100 text-rose-800",
};
const inputCls = "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-800";

const STATUSES = ["confirmed", "shipped", "delivered", "cancelled"];

const StatusBadge = ({ status }) => (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${badgeCls[status]}`}>
        {status}
    </span>
);
const inr = (n) => "₹" + n?.toLocaleString("en-IN");


function OrderDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: order, isLoading } = useOrder({ id });
    const queryClient = useQueryClient();

    const { mutate: changeStatus, isPending } = useMutation({
        mutationFn: ({ id, status }) => orderUpdate({ id, status }),
        onSuccess: (_res, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["order", id] });
        },
    })

    const capitalize = (w) => (`${w.charAt(0).toUpperCase()}${w.slice(1, 70)}`)
    const normalDate = (d) => (`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`)

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (!order) return <p className='h-screen text-center'>Order not found.</p>;
    return (
        <div className="space-y-5">
            <button onClick={() => navigate("/orders")} className="text-sm text-stone-600 cursor-pointer hover:underline">
                ← Back to orders
            </button>
            <h2 className="text-xl font-semibold">Order details</h2>

            <div className="grid gap-5 lg:grid-cols-3">
                <div className={`${cardCls} lg:col-span-2`}>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">Items in {order.orderId}</h3>
                        <StatusBadge status={order.orderStatus} />
                    </div>
                    <ul className="divide-y divide-stone-100">
                        {order?.items?.map((it) => (
                            <div key={it.name}>
                                <h1>{it.name}</h1>
                                <li key={it.name} className="flex items-center gap-4 py-3">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f3ecdc] text-2xl">
                                        <img src={it.thumbnail} alt={it.name} />
                                    </div>
                                    <div className="flex-1 text-sm">
                                        <p className="font-medium">{it.name}</p>
                                        <p className="text-stone-500">{it.name} · Size {it.shoeSize} · Qty {it.quantity}</p>
                                    </div>
                                    <p className="text-sm font-medium">{inr(it?.price * it?.quantity)}</p>
                                </li>
                            </div>
                        ))}
                    </ul>
                    <div className="mt-3 flex justify-between border-t border-stone-200 pt-3 text-sm font-semibold">
                        <span>Total</span>
                        <span>{inr(order?.totalAmount)}</span>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className={cardCls}>
                        <h3 className="mb-2 text-sm font-semibold">Customer</h3>
                        <p className="text-sm">{order.userId.fullName}</p>
                        <p className="text-sm text-stone-500">{order.userId.email}</p>
                        <h3 className="mb-1 mt-4 text-sm font-semibold">Shipping address</h3>
                        <p className="text-sm text-stone-600">{`${order.address.house},${" "} ${order.address.locality} ${" "} ${order.address.state},${order.address.pincode}`}</p>
                        <h3 className="mb-1 mt-4 text-sm font-semibold">Payment Status</h3>
                        <p className="text-sm text-stone-600">{capitalize(order?.paymentStatus)}</p>
                        <h3 className="mb-1 mt-4 text-sm font-semibold">Order Status</h3>
                        <p className="text-sm text-stone-600">Placed: {normalDate(new Date(order.createdAt))}</p>
                    </div>
                    <div className={cardCls}>
                        <h3 className="mb-2 text-sm font-semibold">Shipping status</h3>
                        <select
                            value={order.orderStatus}
                            onChange={(e) => changeStatus({ id: order._id, status: e.target.value })}
                            className={`${inputCls} capitalize`}
                        >
                            {STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail