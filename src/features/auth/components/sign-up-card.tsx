import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [padding, setPadding] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuthActions();

  const onPassowrdSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match!");
      return;
    }
    setPadding(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setPadding(false);
      });
  };

  // It will only a github or google
  const onProviderSignUp = (value: "github" | "google") => {
    setPadding(true);
    signIn(value).finally(() => {
      setPadding(false);
    });
  };

  return (
    <Card className="w-full h-full p-8 ">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive md-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0 ">
        <form onSubmit={onPassowrdSignUp} className="space-y-2.5">
          <Input
            disabled={padding}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            type="text"
          />
          <Input
            disabled={padding}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            type="email"
          />
          <Input
            disabled={padding}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            type="password"
          />
          <Input
            disabled={padding}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
            type="password"
          />

          <Button type="submit" className="w-full" size="lg" disabled={padding}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={padding}
            onClick={() => onProviderSignUp("google")}
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={padding}
            onClick={() => onProviderSignUp("github")}
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with GitHub
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
