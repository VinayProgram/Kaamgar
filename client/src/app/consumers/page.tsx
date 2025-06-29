"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { useRouter } from "next/router";

export default function KaamgarAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();
  React.useEffect(() => {checkAuth()},[])
  const checkAuth=async()=>{
    await api.post("/consumers/login-module/check-auth")

  }
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName")?.toString() || "",
      phoneNumber: formData.get("phoneNumber")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    if (isSignup) {
      console.log("Signing up with:", data);
      await api.post("/consumers/login-module/signup", data)
      // Call your signup API here
    } else {

      const response = await api.post("/consumers/login-module/login", {
        email: data.email,
        password: data.password})
      // Call your login API here
      if(response.status === 200){
        console.log("Login successful:", response.data);
        router.push("/consumers/dashboard");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-20">
        <img
          src="/kaamgarback.avif"
          alt="Worker and Consumer"
          className="w-full h-full object-cover"
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>


      {/* Auth Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 p-8 bg-white/90 rounded shadow-md w-full max-w-md transition-all duration-500"
      >
        <h1 className="text-2xl font-bold mb-4">
          {isSignup ? "Create an Account" : "Login to Kaamgar"}
        </h1>

        {isSignup && (
          <>
            <Label className="mt-2">Full Name</Label>
            <Input
              name="fullName"
              placeholder="Your name"
              className="mb-2"
            />

            <Label className="mt-2">Phone Number</Label>
            <Input
              name="phoneNumber"
              placeholder="+91 9876543210"
              className="mb-2"
            />
          </>
        )}

        <Label className="mt-2">Email</Label>
        <Input
          name="email"
          placeholder="you@example.com"
          className="mb-2"
        />

        <Label className="mt-2">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="••••••••"
          className="mb-4"
        />

        <Button type="submit" className="w-full">
          {isSignup ? "Sign Up" : "Login"}
        </Button>

        <p className="text-sm mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}
