const cardCls = "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm";
const users = [
  { id: 1, name: "Aarav Sharma", email: "aarav@mail.com", phone: "+91 98100 11111", joined: "2026-05-02", orders: 5 },
  { id: 2, name: "Priya Verma", email: "priya@mail.com", phone: "+91 98100 22222", joined: "2026-06-14", orders: 3 },
  { id: 3, name: "Rohan Gupta", email: "rohan@mail.com", phone: "+91 98100 33333", joined: "2026-07-21", orders: 2 },
  { id: 4, name: "Sneha Iyer", email: "sneha@mail.com", phone: "+91 98100 44444", joined: "2026-09-01", orders: 1 },
];



function UserList() {
    const headers = ["User", "Email", "Phone", "Joined", "Orders"];
    return (
        <>
            <h2 className="mb-5 text-xl font-semibold">Users</h2>
            <div className={`${cardCls} overflow-x-auto p-0`}>
                <table className="w-full min-w-160 text-left text-sm">
                    <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase text-stone-500">
                        <tr>{headers.map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-b border-stone-100 last:border-0">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#efe5cf] text-xs font-semibold">
                                            {u.name[0]}
                                        </span>
                                        {u.name}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-stone-600">{u.email}</td>
                                <td className="px-4 py-3 text-stone-600">{u.phone}</td>
                                <td className="px-4 py-3 text-stone-500">{u.joined}</td>
                                <td className="px-4 py-3">{u.orders}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserList