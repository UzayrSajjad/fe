"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import ProfileSidebar from "@/layout/ProfileSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  // ProfileSidebar is 70px, AppSidebar is 290px expanded or 90px collapsed
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[360px]"  // 70px (ProfileSidebar) + 290px (AppSidebar expanded)
    : "lg:ml-[160px]"; // 70px (ProfileSidebar) + 90px (AppSidebar collapsed)

  return (
    <div className="min-h-screen xl:flex">
      {/* Profile Switcher Sidebar */}
      <ProfileSidebar />
      {/* App Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
