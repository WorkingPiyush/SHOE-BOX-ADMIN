import { useLocalUsers } from "../../hooks/useUser";

const cardCls = "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm";
function UserList() {
    const { data:users, isLoading } = useLocalUsers();
    const headers = ["User", "Email", "Phone", "Role"];
    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <>
            <h2 className="mb-5 text-xl font-semibold">Users</h2>
            <div className={`${cardCls} overflow-x-auto p-0`}>
                <table className="w-full min-w-160 text-left text-sm">
                    <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase text-stone-500">
                        <tr>{headers.map((h) => <th key={h} className="py-2 font-medium">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-b border-stone-100 last:border-0">
                                <td className="py-2">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#efe5cf] text-xs font-semibold">
                                            {u?.fullName?.charAt(0)}
                                        </span>
                                        {u.fullName}
                                    </div>
                                </td>
                                <td className="py-2 text-stone-600">{u.email}</td>
                                <td className="py-2 text-stone-600">{u.phone || "Not Available"}</td>
                                <td className="py-2 text-stone-500">{u.role.toUpperCase()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserList