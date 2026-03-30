import React from 'react'
import { useDispatch } from 'react-redux'
import { data, Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { login } from '../Store/authSlice'
import { Input, authService } from "./Index"
import { useState } from 'react'

function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const newuser = await authService.createAccount(data)
            if (newuser) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (

        < div className = "min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 px-4" >

            <div className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
                    Create Account 🚀
                </h2>

                <p className="text-gray-500 text-sm text-center mb-6">s
                    Start your journey with TaskZen
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(create)} className="space-y-4">

                    {/* Name */}
                    <Input
                        type="text"
                        placeholder="Full Name"

                        {...register("name", {
                            required: true,
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    />

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
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all hover:scale-[1.02]"
                    >
                        Create Account
                    </button>

                </form>

                {/* Footer text */}
                <p className="text-center text-sm text-gray-600 mt-5">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>

            </div>

    </div >
    )
}

export default Signup