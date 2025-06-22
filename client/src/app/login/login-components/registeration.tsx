"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RegisterationDTO } from "../dto/registeration";
import { useState } from "react";
import axios from "axios";
import { registerationAPI } from "../fetch/register";

export default function RegisterComponent() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data: RegisterationDTO = {
      aadharNumber: formData.get("aadharCard") as string,
      email: formData.get("email") as string, // If using email instead of username
      passwordHash: password,
      username: formData.get("username") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      panNumber: formData.get("panNumber") as string,
    };

    try {
      const res = await registerationAPI(data); // Change to your API endpoint
      if (res.status === 201 || res.status === 200) {
        setSuccess("Registration successful!");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong while registering.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 lg:flex-row lg:p-8">
      {/* Left Section: Logo and Info */}
      <div className="flex flex-col items-center justify-center p-4 lg:w-1/2">
        <img
          alt="KaamGar"
          src="/kaamgar.png"
          className="h-48 w-auto lg:h-80"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Join KaamGar Today!
        </h2>
        <p className="mt-2 text-center text-lg text-gray-600">
          Find the best opportunities or hire the right talent.
        </p>
      </div>

      {/* Right Section: Form */}
      <div className="w-full max-w-md p-4 lg:w-1/2">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Register Your Account</CardTitle>
            <CardDescription>Enter your details below to create an account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" required autoComplete="username" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" required autoComplete="tel" />
              </div>
              <div>
                <Label htmlFor="aadharCard">Aadhar Card Number</Label>
                <Input id="aadharCard" name="aadharCard" type="text" required />
              </div>
              <div>
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input id="panNumber" name="panNumber" type="text" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required autoComplete="new-password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="new-password" />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign in here
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
