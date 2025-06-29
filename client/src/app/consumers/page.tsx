"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function KaamgarAuth() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/worker-consumer-bg.jpg" // ✅ Put your image in /public/images/
          alt="Worker and Consumer"
          className="w-full h-full object-cover"
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>

      {/* Moving text reviews */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden text-white opacity-30">
        <div className="whitespace-nowrap animate-marquee text-xl font-bold">
          ★ Kaamgar connects workers & employers • Trusted by thousands • Changing lives across India ★ 
          Kaamgar connects workers & employers • Trusted by thousands • Changing lives across India ★ 
        </div>
      </div>

      {/* Auth Form */}
      <div className="relative z-10 p-8 bg-white/90 rounded shadow-md w-full max-w-md transition-all duration-500">
        <h1 className="text-2xl font-bold mb-4">
          {isSignup ? "Create an Account" : "Login to Kaamgar"}
        </h1>

        {isSignup && (
          <>
            <Label className="mt-2">Full Name</Label>
            <Input placeholder="Your name" className="mb-2" />

            <Label className="mt-2">Phone Number</Label>
            <Input placeholder="+91 9876543210" className="mb-2" />
          </>
        )}

        <Label className="mt-2">Email</Label>
        <Input placeholder="you@example.com" className="mb-2" />

        <Label className="mt-2">Password</Label>
        <Input type="password" placeholder="••••••••" className="mb-4" />

        <Button className="w-full">
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
      </div>
    </div>
  );
}
