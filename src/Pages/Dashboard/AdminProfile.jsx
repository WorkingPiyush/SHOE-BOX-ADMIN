import { useNavigate } from "react-router-dom";
import { useUser } from '../../hooks/useUser.js'
import { useQueryClient } from "@tanstack/react-query";
import { logoutAdmin } from "../../Api/apiUser.js";
import FullScreenLoader from "../../components/FullScreenLoader.jsx";


const cardCls = "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm";

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-3 text-sm">
      <span className="text-stone-500">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

export default function AdminProfile() {
  const { data: admin, isLoading } = useUser()
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const normalDate = (d) => (`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`)


  const handleLogout = async () => {
    const res = await logoutAdmin();
    if (res.success) {
      queryClient.setQueryData(['admin'], null);
      queryClient.invalidateQueries(['admin']);
      navigate('/login', { replace: true });
    }
  }

  const initials = admin?.fullName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


  if (isLoading) {
    return <FullScreenLoader />
  }
  return (
    <div className="min-h-screen bg-[#faf6ee] p-4 text-stone-800 md:p-8">
      <div className="mx-auto max-w-xl space-y-5">
        <h2 className="text-xl font-semibold">Profile</h2>

        <div className={`${cardCls} flex items-center gap-4`}>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#efe5cf] text-xl font-semibold">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{admin.fullName}</p>
            <p className="truncate text-sm text-stone-500">{admin.email}</p>
            <span className="mt-1 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              {admin.role}
            </span>
          </div>
        </div>

        <div className={cardCls}>
          <h3 className="mb-1 text-sm font-semibold">Account details</h3>
          <div className="divide-y divide-stone-100">
            <Row label="Full name" value={admin.fullName} />
            <Row label="Email" value={admin.email} />
            <Row label="Phone" value={admin.phone} />
            <Row label="Role" value={admin.role} />
            <Row label="Member since" value={normalDate(new Date(admin.createdAt))} />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-lg border cursor-pointer border-rose-300 bg-white px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
