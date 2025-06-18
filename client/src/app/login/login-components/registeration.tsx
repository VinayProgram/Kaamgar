import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 lg:flex-row lg:p-8">
      {/* Left Section: Company Logo */}
      <div className="flex flex-col items-center justify-center p-4 lg:w-1/2">
        <img
          alt="KaamGar"
          src="/kaamgar.png" // Make sure this path is correct for your logo
          className="h-48 w-auto lg:h-80"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Join KaamGar Today!
        </h2>
        <p className="mt-2 text-center text-lg text-gray-600">
          Find the best opportunities or hire the right talent.
        </p>
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-full max-w-md p-4 lg:w-1/2">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Register Your Account</CardTitle>
            <CardDescription>Enter your details below to create an account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="#" method="POST" className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" required autoComplete="username" />
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