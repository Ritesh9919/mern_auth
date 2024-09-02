import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-300 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-300 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-300 p-3 rounded-lg"
        />
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 justify-center mt-7">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
