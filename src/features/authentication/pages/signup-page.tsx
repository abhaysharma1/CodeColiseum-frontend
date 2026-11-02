import { SignupForm } from "@/components/signup-form";
import { useRouter } from "@/lib/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);
  
  return (
    <div className="h-screen bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      Not Allowed
    </div>
  );
}
