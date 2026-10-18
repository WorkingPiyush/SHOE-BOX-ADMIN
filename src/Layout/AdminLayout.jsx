import { Link, NavLink, Outlet } from 'react-router-dom';



function AdminLayout() {
    const nav = [
        { to: "/", label: "Dashboard", end: true },
        { to: "/products", label: "Products" },
        { to: "/orders", label: "Orders" },
        { to: "/users", label: "Users" },
        { to: "/profile", label: "Profile" },
    ];

    return (
        <div className="min-h-screen bg-[#faf6ee] text-stone-800 md:flex">
            <aside className="border-b border-stone-200 bg-white md:min-h-screen md:w-56 md:border-b-0 md:border-r">
                <Link to="/">
                    <div className="px-5 py-4 text-lg font-bold">
                        👟 Shoe Box <span className="text-xs font-normal text-stone-500">Admin</span>
                    </div>
                </Link>
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
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout