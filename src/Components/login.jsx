import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { authService } from './Index';
import { login as authLogin } from '../Store/authSlice';  // ✅ Ye import sahi hai?
import { Input } from "./Index";

function Login() {
    const [error, seterror] = useState("");
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (data) => {
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            seterror(error.message)
        }
    }

    return (
        <div className = "min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 px-4" >

            {/* Background Glow */}
            <div className="absolute inset-0 bg-linear-to-tr from-blue-200/20 to-indigo-300/20 blur-3xl"></div>

            {/* Card */}
            <div className="relative w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
                    Welcome Back 👋
                </h2>

                <p className="text-gray-500 text-sm text-center mb-6">
                    Login to continue your journey with TaskZen
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(login)} className="space-y-4">

                    {/* Email */}
                    <Input
                        type="email"
                        placeholder="Email Address"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    />

                    {/* Password */}
                    <Input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                        })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-linear-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold hover:scale-[1.02] transition-all"
                    >
                        Login
                    </button>

                </form>

                {/* Footer text */}
                <p className="text-center text-sm text-gray-600 mt-5">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                        Signup
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;