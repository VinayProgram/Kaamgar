'use client'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginAPI } from "../fetch/login";

export default function LoginComponent() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;  
    const password = formData.get("password") as string;
    const result = await loginAPI({ email, password })
    if (result.status === 200) {
      // Handle successful login, e.g., redirect or show a success message
      console.log("Login successful:", result.data);
    } else {
      // Handle login failure, e.g., show an error message
      console.error("Login failed:", result.data);
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="KaamGar"
          src="/kaamgar.png"
          className="mx-auto h-40 w-auto"
        />
        <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Card>
          <CardHeader>
            {/* The title and description are already handled by the h2 above, 
                but you could use CardTitle and CardDescription here if you prefer 
                to encapsulate it within the Card component. 
                For this example, we'll keep the h2 outside for consistency with your original.
            */}
          </CardHeader>
          <CardContent>
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    // shadcn's Input component already handles basic styling.
                    // You might need to adjust some specific Tailwind classes if they conflict
                    // or if you want to override shadcn's default styling.
                    // For example, if you want your custom outline style:
                    // className="outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    // Similar to email input, adjust classes if needed
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{" "}
              <a href="login/register-kaamgar" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Create a free account
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}