import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup ,GithubAuthProvider, GoogleAuthProvider} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Loginpage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successfully");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const provider = new GoogleAuthProvider();
  const Githubprovider = new GithubAuthProvider();


   const googleLogin=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
   GoogleAuthProvider.credentialFromResult(result);

    console.log("Login Successfully")
  navigate("/")
  }).catch((error) => {
   
  });
   }

   const githubLogin=()=>{
 signInWithPopup(auth, Githubprovider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    GithubAuthProvider.credentialFromResult(result);
  console.log("Login Successfully")
  navigate("/")
  }).catch((error) => {
    console.log(error)
  });
   }

  return (
    <div className="min-h-screen bg-[#E2E8F0] flex flex-col items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#2563EB] py-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            MaintainIQ
          </h1>
          <p className="text-blue-100 mt-2">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={login} className="p-8">

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
              to="/signup"
              className="text-[#2563EB] hover:underline text-sm"
            >
              Don't have an account?
            </NavLink>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>

        </form>

      </div>
      <div className="my-6 flex items-center">
  <div className="flex-1 h-px bg-gray-300"></div>
  <span className="px-4 text-gray-500 text-sm">OR</span>
  <div className="flex-1 h-px bg-gray-300"></div>
</div>

<button
  type="button"
  onClick={googleLogin}
  className=" flex items-center justify-center gap-3 border border-[#E2E8F0] bg-white w-[450px] py-3 rounded-lg hover:bg-gray-100 transition mb-3"
>
  <FaGoogle className="text-red-500 text-xl" />
  Continue with Google
</button>

<button
  type="button"
  onClick={githubLogin}
  className=" flex items-center justify-center gap-3 bg-[#1E293B] w-[450px] text-white py-3 rounded-lg hover:bg-slate-800 transition"
>
  <FaGithub className="text-xl" />
  Continue with GitHub
</button>

    </div>
  );
};

export default Loginpage;