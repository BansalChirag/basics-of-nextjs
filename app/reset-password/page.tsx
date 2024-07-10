"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
    token,
  });

  const router = useRouter();

  useEffect(() => {
    const getTokenFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get("token");
      if (tokenFromUrl) {
        setToken(tokenFromUrl);
        setUser((prevUser) => ({ ...prevUser, token: tokenFromUrl }));
      }
    };

    getTokenFromUrl();
  }, []);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/reset-password", user);
      if (response.data.message.includes("Invalid")) {
        alert("oops the link has expired.");
        return;
      } else if (response.data.message.includes("don't")) {
        alert("Passwords don't match");
        return;
      } else if (response.data.message.includes("try after some time")) {
        alert("Error in updating password. Please try after some time.");
        return;
      }
      alert("Password Successfully updated.");
      router.replace("/login");
    } catch (error) {
      console.error("An error occurred while updating the password", error);
      alert("An error occurred while updating the password. see in console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-5">{loading ? "processing" : "Reset Password"}</h1>
      <hr />
      <label htmlFor="password" className="mb-2">
        Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        name="password"
        type="text"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <label htmlFor="confirmPassword" className="mb-2">
        Confirm Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="confirmPassword"
        name="confirmPassword"
        type="text"
        placeholder="Confirm Password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={handleClick}
        disabled={loading}
      >
        Reset Password
      </button>
    </div>
  );
};

export default page;
