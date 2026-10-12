import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const cardCls = "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm";
const badgeCls = {
    confirmed: "bg-amber-100 text-amber-800",
    shipped: "bg-sky-100 text-sky-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-rose-100 text-rose-800",
};
const inputCls =
    "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-800";

const STATUSES = ["confirmed", "shipped", "delivered", "cancelled"];

const StatusBadge = ({ status }) => (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${badgeCls[status]}`}>
        {status}
    </span>
);
const inr = (n) => "₹" + n.toLocaleString("en-IN");


function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { orders, updateStatus } = useOutletContext();
    const order = orders.find((o) => o.id === id);

    if (!order) return <p>Order not found.</p>;

    return (
        <div className="space-y-5">
            <button onClick={() => navigate("/orders")} className="text-sm text-stone-600 hover:underline">
                ← Back to orders
            </button>
            <h2 className="text-xl font-semibold">Order details</h2>

            <div className="grid gap-5 lg:grid-cols-3">
                <div className={`${cardCls} lg:col-span-2`}>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">Items in {order.id}</h3>
                        <StatusBadge status={order.status} />
                    </div>
                    <ul className="divide-y divide-stone-100">
                        {order.items.map((it, i) => (
                            <li key={i} className="flex items-center gap-4 py-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f3ecdc] text-2xl">👟</div>
                                <div className="flex-1 text-sm">
                                    <p className="font-medium">{it.name}</p>
                                    <p className="text-stone-500">{it.brand} · Size {it.size} · Qty {it.qty}</p>
                                </div>
                                <p className="text-sm font-medium">{inr(it.price * it.qty)}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3 flex justify-between border-t border-stone-200 pt-3 text-sm font-semibold">
                        <span>Total</span>
                        <span>{inr(order.total)}</span>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className={cardCls}>
                        <h3 className="mb-2 text-sm font-semibold">Customer</h3>
                        <p className="text-sm">{order.user}</p>
                        <p className="text-sm text-stone-500">{order.email}</p>
                        <h3 className="mb-1 mt-4 text-sm font-semibold">Shipping address</h3>
                        <p className="text-sm text-stone-600">{order.address}</p>
                        <h3 className="mb-1 mt-4 text-sm font-semibold">Payment</h3>
                        <p className="text-sm text-stone-600">{order.payment} · Placed {order.date}</p>
                    </div>
                    <div className={cardCls}>
                        <h3 className="mb-2 text-sm font-semibold">Shipping status</h3>
                        <select
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
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