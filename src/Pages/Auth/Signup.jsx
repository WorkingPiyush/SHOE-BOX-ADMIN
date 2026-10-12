import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../components/Loading";
import OAuth from "../../components/OAuth";
import { toast } from "react-toastify";
import signupBanner from '@/assets/Images/Type-of-Shoes/training-shoe.png'

function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        reset();
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error("Something went wrong")
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      {loading ? <Loading /> : ""}
      <div className="mt-20 w-full max-w-5xl grid md:grid-cols-2 bg-white text-black rounded-2xl shadow-2xl overflow-hidden border border-black">

        {/* Left Image */}
        <div className="hidden md:flex items-center justify-center bg-white p-10">
          <img
            className="object-contain w-80 hover:scale-105 transition duration-500"
            src={signupBanner}
            alt="product"
          />
        </div>

        {/* Form Section */}
        <div className="p-10">
          <h1 className="text-3xl text-center font-semibold mb-3">
            Create Account
          </h1>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-white text-black border border-gray-300 focus:border-black rounded-lg p-3 outline-none transition"
                {...register("fullName", {
                  required: "Full Name is required",
                })}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-0.5">
                  {errors.fullName.message}
                </p>
              )}
            </div>

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

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-white text-black border border-gray-300 focus:border-black rounded-lg p-3 outline-none transition"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-0.5">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white font-semibold py-3 rounded-lg cursor-pointer hover:bg-gray-900 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Signing..." : "Sign Up"}
            </button>
            <div className="flex justify-center items-center flex-col">
              ---- OR ----
              <OAuth />
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;