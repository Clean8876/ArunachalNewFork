import { Toaster } from "@/components/ui/sonner";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <Toaster position="top-center" richColors closeButton />
        {children}
      </>
    );
  } 