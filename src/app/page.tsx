"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

const HomePage = () => {
  const { signOut } = useAuthActions();

  return (
    <div className="">
      Logged In!
      <Button className="ml-6" variant="slack" onClick={() => signOut()}> Sign out </Button>
    </div>
  );
};

export default HomePage;
