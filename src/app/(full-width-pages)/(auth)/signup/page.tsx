import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Social Sync - Social Media Management",
  description: "Sign up for Social Sync - Your all-in-one social media management platform",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
