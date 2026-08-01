import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Signup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successfully");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#E2E8F0] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#2563EB] py-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            MaintainIQ
          </h1>
          <p className="text-blue-100 mt-2">
            Create your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={Signup} className="p-8">

          <div className="mb-5">
            <label className="block text-[#1E293B] font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-[#1E293B] font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-6">
            <NavLink
              to="/"
              className="text-[#2563EB] hover:underline text-sm"
            >
              Already have an account?
            </NavLink>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Sign Up
          </button>

        </form>

      </div>

    </div>
  );
};

export default Signup;