import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';


const initialOrders = [
    {
        id: "SB-1001", user: "Aarav Sharma", email: "aarav@mail.com", date: "2026-10-08",
        status: "confirmed", total: 7498, payment: "UPI", address: "12 MG Road, Delhi 110001",
        items: [
            { name: "AirStride Runner", brand: "Nike", size: 9, qty: 1, price: 4999 },
            { name: "Classic Canvas Low", brand: "Converse", size: 9, qty: 1, price: 2499 },
        ],
    },
    {
        id: "SB-1002", user: "Priya Verma", email: "priya@mail.com", date: "2026-10-09",
        status: "shipped", total: 5999, payment: "Card", address: "44 Park Street, Kolkata 700016",
        items: [{ name: "Urban Leather Loafer", brand: "Clarks", size: 6, qty: 1, price: 5999 }],
    },
    {
        id: "SB-1003", user: "Rohan Gupta", email: "rohan@mail.com", date: "2026-10-10",
        status: "delivered", total: 3799, payment: "COD", address: "7 Residency Rd, Bengaluru 560025",
        items: [{ name: "Court Pro Sneaker", brand: "Puma", size: 10, qty: 1, price: 3799 }],
    },
    {
        id: "SB-1004", user: "Sneha Iyer", email: "sneha@mail.com", date: "2026-10-10",
        status: "cancelled", total: 2999, payment: "UPI", address: "21 Anna Salai, Chennai 600002",
        items: [{ name: "Cloud Slide", brand: "Adidas", size: 7, qty: 1, price: 2999 }],
    },
];

function AdminLayout() {
    const [orders, setOrders] = useState(initialOrders);

    // TODO: call your API here (e.g. PATCH /orders/:id) then update state
    const updateStatus = (id, status) =>
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

    const nav = [
        { to: "/", label: "Dashboard", end: true },
        { to: "/products", label: "Products" },
        { to: "/orders", label: "Orders" },
        { to: "/users", label: "Users" },
    ];

    return (
        <div className="min-h-screen bg-[#faf6ee] text-stone-800 md:flex">
            <aside className="border-b border-stone-200 bg-white md:min-h-screen md:w-56 md:border-b-0 md:border-r">
                <div className="px-5 py-4 text-lg font-bold">
                    👟 Shoe Box <span className="text-xs font-normal text-stone-500">Admin</span>
                </div>
                <nav className="flex gap-1 px-3 pb-3 md:flex-col">
                    {nav.map((n) => (
                        <NavLink
                            key={n.to}
                            to={n.to}
                            end={n.end}
                            className={({ isActive }) => `rounded-lg px-3 py-2 text-sm ${isActive ? "bg-stone-800 text-white" : "text-stone-700 hover:bg-stone-100"}`}
                        >
                            {n.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-4 md:p-8">
                <Outlet context={{ orders, updateStatus }} />
            </main>
        </div>
    );
}

export default AdminLayout