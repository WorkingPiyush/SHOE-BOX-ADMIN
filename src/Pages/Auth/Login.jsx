import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { fetchAdmin, loginAdmin } from "../../Api/apiUser";
import { useAuth } from "../../context/AuthContext";
import FullScreenLoader from "../../components/FullScreenLoader";


function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await loginAdmin(data);
      if (res.isAdmin) {
        const admin = await queryClient.fetchQuery({
          queryKey: ['admin'],
          queryFn: fetchAdmin,
        });

        queryClient.setQueryData(['admin'], admin);
        setUser(admin)
        reset();
        navigate("/", { replace: true });
      } else {
        reset();
        toast.error("Invalid credentials")
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Invalid credentials")
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <FullScreenLoader />
  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-112.5 bg-white text-black rounded-2xl shadow-2xl overflow-hidden border border-black">

        {/* Login Form */}
        <div className="p-8">
          <h1 className="text-3xl text-center font-semibold mb-6">
            Admin Dashboard
          </h1>

          <form className="flex flex-col gap-5 relative" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white text-black border border-gray-300 focus:border-black rounded-lg p-3 outline-none transition"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-0.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white text-black border border-gray-300 focus:border-black rounded-lg p-3 outline-none transition"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-0.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white cursor-pointer font-semibold py-3 rounded-lg hover:bg-gray-800 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Login..." : "Login"}
            </button>

            {/* <p className="text-sm text-gray-400 text-center mt-3">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-black hover:underline"
              >
                Sign Up
              </Link>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;