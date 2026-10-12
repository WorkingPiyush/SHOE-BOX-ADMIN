import { Link, useOutletContext } from 'react-router-dom';
const inr = (n) => "₹" + n.toLocaleString("en-IN");

const cardCls = "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm";
const STATUSES = ["confirmed", "shipped", "delivered", "cancelled"];
const badgeCls = {
    confirmed: "bg-amber-100 text-amber-800",
    shipped: "bg-sky-100 text-sky-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-rose-100 text-rose-800",
};
const StatusBadge = ({ status }) => (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${badgeCls[status]}`}>
        {status}
    </span>
);


function Orders() {
    const { orders, updateStatus } = useOutletContext();
    const headers = ["Order", "Customer", "Date", "Total", "Status", "Update"];

    return (
        <>
            <h2 className="mb-5 text-xl font-semibold">Orders</h2>
            <div className={`${cardCls} overflow-x-auto p-0`}>
                <table className="w-full min-w-190 text-left text-sm">
                    <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase text-stone-500">
                        <tr>{headers.map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <tr key={o.id} className="border-b border-stone-100 last:border-0">
                                <td className="px-4 py-3">
                                    <Link to={`/orders/${o.id}`} className="font-medium text-amber-800 hover:underline">{o.id}</Link>
                                </td>
                                <td className="px-4 py-3">{o.user}</td>
                                <td className="px-4 py-3 text-stone-500">{o.date}</td>
                                <td className="px-4 py-3">{inr(o.total)}</td>
                                <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                                <td className="px-4 py-3">
                                    <select
                                        value={o.status}
                                        onChange={(e) => updateStatus(o.id, e.target.value)}
                                        className="rounded-lg border border-stone-300 bg-white px-2 py-1 text-sm capitalize"
                                    >
                                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Orders