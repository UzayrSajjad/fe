import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Social Sync - Social Media Management",
  description: "Sign in to Social Sync - Your all-in-one social media management platform",
};

export default function SignIn() {
  return <SignInForm />;
}
