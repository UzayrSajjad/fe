"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Profile {
  id: string;
  name: string;
  avatar: string;
  platform?: string;
}

// Static profiles data - in a real app this would come from an API
const PROFILES: Profile[] = [
  {
    id: "1",
    name: "Musharof",
    avatar: "/images/user/owner.jpg",
    platform: "instagram",
  },
  {
    id: "2",
    name: "Brand Account",
    avatar: "/images/user/user-01.jpg",
    platform: "twitter",
  },
  {
    id: "3",
    name: "Company Page",
    avatar: "/images/user/user-02.jpg",
    platform: "linkedin",
  },
];

const ProfileSidebar: React.FC = () => {
  const [activeProfileId, setActiveProfileId] = useState<string>("1");
  const [mounted, setMounted] = useState(false);

  // Load active profile from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedActiveId = localStorage.getItem("activeProfileId");
    if (savedActiveId && PROFILES.some((p) => p.id === savedActiveId)) {
      setActiveProfileId(savedActiveId);
    }
  }, []);

  // Save active profile to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("activeProfileId", activeProfileId);
    }
  }, [activeProfileId, mounted]);

  const activeProfile = PROFILES.find((p) => p.id === activeProfileId);
  const otherProfiles = PROFILES.filter((p) => p.id !== activeProfileId);

  const handleProfileSwitch = (profileId: string) => {
    setActiveProfileId(profileId);
  };

  const handleAddProfile = () => {
    // TODO: Open modal or navigate to add profile page
    console.log("Add new profile clicked");
  };

  return (
    <aside className="fixed left-0 top-0 z-[99999] hidden h-screen w-[70px] flex-col items-center border-r border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-900 lg:flex">
      {/* Active Profile at Top */}
      <div className="mb-4 group relative">
        <button
          className="relative flex h-12 w-12 items-center justify-center"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-brand-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
            <Image
              src={activeProfile?.avatar || "/images/user/owner.jpg"}
              alt={activeProfile?.name || "Active Profile"}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Active indicator */}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900"></span>
        </button>
        {/* Tooltip */}
        <div className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-700">
          {activeProfile?.name}
        </div>
      </div>

      {/* Divider */}
      <div className="mb-6 h-px w-8 bg-gray-200 dark:bg-gray-700"></div>

      {/* Other Profiles */}
      <div className="flex flex-1 flex-col items-center gap-4 pt-2 no-scrollbar">
        {otherProfiles.map((profile) => (
          <div key={profile.id} className="group relative">
            <button
              onClick={() => handleProfileSwitch(profile.id)}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            </button>
            {/* Tooltip */}
            <div className="pointer-events-none absolute left-full top-1/2 z-[100000] ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-700">
              {profile.name}
            </div>
          </div>
        ))}
      </div>

      {/* Add Profile Button */}
      <div className="mt-4">
        <button
          onClick={handleAddProfile}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 transition-all hover:border-brand-500 hover:text-brand-500 dark:border-gray-600 dark:text-gray-500 dark:hover:border-brand-500 dark:hover:text-brand-500"
          title="Add Profile"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4.16667V15.8333M4.16667 10H15.8333"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
