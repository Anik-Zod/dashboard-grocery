"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

// Extend window type for TypeScript
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement | null,
            options?: {
              theme?: string;
              size?: string;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

// Type for Google credential response
interface GoogleCredentialResponse {
  credential: string;
  clientId?: string;
}

export default function GoogleLoginButton() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    // Callback function inside useEffect to avoid dependency warnings
    const handleCallbackResponse = async (
      response: GoogleCredentialResponse
    ) => {
      try {
        const res = await api.post("/user/google-login", {
          token: response.credential,
        });

        if (!res.data.success) return;

        setUser(res.data.user);
        setTimeout(() => {
          router.push("/");
        }, 0);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error(
            "Google Login Failed:",
            error.response?.data ?? error.message
          );
        } else if (error instanceof Error) {
          console.error("Google Login Failed:", error.message);
        } else {
          console.error("Google Login Failed: Unknown error", error);
        }
      }
    };

    // Dynamically load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );

      // Optional: automatically prompt user
      // window.google.accounts.id.prompt();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [setUser]);

  return <div id="googleSignInDiv"></div>;
}
