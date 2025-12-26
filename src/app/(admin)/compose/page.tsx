import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComposeContent from "@/components/compose/ComposeContent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Compose | Social Sync - Social Media Management",
  description: "Social Sync - Your all-in-one social media management platform",
};

export default function ComposePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Compose" />
      <ComposeContent />
    </div>
  );
}
