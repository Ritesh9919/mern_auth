import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signinStart,
  signinSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const response = await axios.post("/api/auth/signin", formData);
      console.log(response.data);
      if (response.data.error) {
        dispatch(signinFailure(response.data.message));
        return;
      }
      dispatch(signinSuccess(response.data.data));
      navigate("/");
    } catch (error) {
      dispatch(signinFailure(error));
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg mx-auto"
      >
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-300 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-300 p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading" : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 justify-center mt-7">
        <p>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 text-center">
        {error && "Internal server error"}
      </p>
    </div>
  );
}

export default Signin;
