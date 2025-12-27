"use client";

import React, { useState, useRef, useEffect } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import ImageSearchModal, { UnsplashImage } from "./ImageSearchModal";
import ScheduleModal, { ScheduledTime } from "./ScheduleModal";
import PlatformSelector, { PlatformAccount } from "./PlatformSelector";

type SidebarTab = "preview" | "schedule" | "tools" | "ai-assistant";
type ScheduleMode = "now" | "scheduled";
type ContentType = "post" | "reel";

// Mock platform accounts data
const mockAccounts: PlatformAccount[] = [
  {
    id: "ig-1",
    platform: "instagram",
    username: "myinsta",
    profileImage: "/images/user/user-01.jpg",
  },
  {
    id: "ig-2",
    platform: "instagram",
    username: "business",
    profileImage: "/images/user/user-02.jpg",
  },
  {
    id: "fb-1",
    platform: "facebook",
    username: "mypage",
    profileImage: "/images/user/user-03.jpg",
  },
  {
    id: "fb-2",
    platform: "facebook",
    username: "company",
    profileImage: "/images/user/user-04.jpg",
  },
];

const ComposeContent: React.FC = () => {
  // Content state
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<UnsplashImage[]>([]);

  // UI state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SidebarTab>("preview");

  // Schedule state
  const [scheduleMode, setScheduleMode] = useState<ScheduleMode>("now");
  const [scheduledTime, setScheduledTime] = useState<ScheduledTime | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<ContentType>("post");

  // Platform selection state
  const [selectedPostAccounts, setSelectedPostAccounts] = useState<string[]>([]);
  const [selectedReelAccounts, setSelectedReelAccounts] = useState<string[]>([]);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setPostContent((prev) => prev + emojiData.emoji);
    textareaRef.current?.focus();
  };

  const handleImageSelect = (image: UnsplashImage) => {
    if (!selectedImages.find((img) => img.id === image.id)) {
      setSelectedImages((prev) => [...prev, image]);
    }
  };

  const removeSelectedImage = (imageId: string) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleScheduleConfirm = (time: ScheduledTime) => {
    setScheduledTime(time);
    setScheduleMode("scheduled");
  };

  const handleClearSchedule = () => {
    setScheduledTime(null);
    setScheduleMode("now");
  };

  const togglePostAccount = (accountId: string) => {
    setSelectedPostAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
  };

  const toggleReelAccount = (accountId: string) => {
    setSelectedReelAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
  };

  // Sidebar tabs configuration
  const sidebarTabs: { id: SidebarTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "preview",
      label: "Preview",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "tools",
      label: "Tools",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  // Render Schedule Tab Content
  const renderScheduleContent = () => {
    return (
      <div className="p-4 space-y-6">
        {/* Top Row - Post Now / Pick Time Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setScheduleMode("now");
              setScheduledTime(null);
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              scheduleMode === "now"
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Post Now
            </div>
          </button>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              scheduleMode === "scheduled"
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pick Time
            </div>
          </button>
        </div>

        {/* Scheduled Time Display */}
        {scheduledTime && (
          <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                  Scheduled for
                </p>
                <p className="text-sm text-gray-800 dark:text-white font-medium mt-0.5">
                  {scheduledTime.displayDate} at {scheduledTime.displayTime}
                </p>
              </div>
              <button
                onClick={handleClearSchedule}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                title="Clear schedule"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Content Type Toggle */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setSelectedContentType("post")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              selectedContentType === "post"
                ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Post
          </button>
          <button
            onClick={() => setSelectedContentType("reel")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              selectedContentType === "reel"
                ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Reel / Short
          </button>
        </div>

        {/* Publish Post Section */}
        {selectedContentType === "post" && (
          <div className="space-y-3">
            <PlatformSelector
              accounts={mockAccounts}
              selectedAccounts={selectedPostAccounts}
              onToggle={togglePostAccount}
              title="Publish Post"
              description="Select platforms to publish your post"
            />
          </div>
        )}

        {/* Publish Reel / Short Section */}
        {selectedContentType === "reel" && (
          <div className="space-y-3">
            <PlatformSelector
              accounts={mockAccounts}
              selectedAccounts={selectedReelAccounts}
              onToggle={toggleReelAccount}
              title="Publish Reel / Short"
              description="Select platforms for your video content"
            />
          </div>
        )}

        {/* Action Button */}
        <button
          className="w-full py-3 bg-brand-500 text-white rounded-xl font-medium hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            (selectedContentType === "post" && selectedPostAccounts.length === 0) ||
            (selectedContentType === "reel" && selectedReelAccounts.length === 0)
          }
        >
          {scheduleMode === "now" ? "Publish Now" : "Schedule Post"}
        </button>
      </div>
    );
  };

  // Render Sidebar Content based on active tab
  const renderSidebarContent = () => {
    switch (activeTab) {
      case "preview":
        return (
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Post Preview
            </h4>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
              {postContent ? (
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {postContent}
                </p>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                  Start typing to see preview...
                </p>
              )}
              {selectedImages.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {selectedImages.map((img) => (
                    <img
                      key={img.id}
                      src={img.urls.thumb}
                      alt={img.alt_description}
                      className="rounded-md w-full h-20 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "schedule":
        return renderScheduleContent();

      case "tools":
        return (
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tools
            </h4>
            <div className="space-y-2">
              {["Hashtag Generator", "Link Shortener", "Character Counter", "Analytics"].map(
                (tool) => (
                  <button
                    key={tool}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {tool}
                  </button>
                )
              )}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Characters: <span className="font-medium text-gray-700 dark:text-gray-300">{postContent.length}</span>
              </p>
            </div>
          </div>
        );

      case "ai-assistant":
        return (
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              AI Assistant
            </h4>
            <div className="space-y-2">
              {[
                "Improve Writing",
                "Generate Hashtags",
                "Suggest Caption",
                "Translate",
                "Summarize",
              ].map((action) => (
                <button
                  key={action}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {action}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Create Post Card (70%) */}
        <div className="w-full lg:w-[70%]">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            {/* Card Header */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                Create Post
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Share your thoughts with your audience
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full min-h-[200px] resize-none rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />

              {/* Selected Images Preview */}
              {selectedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.urls.small}
                        alt={image.alt_description}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeSelectedImage(image.id)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <p className="mt-1 text-xs text-gray-400 truncate">
                        by {image.user.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Actions */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Emoji Picker */}
                  <div className="relative" ref={emojiPickerRef}>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      title="Add Emoji"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-12 left-0 z-50">
                        <EmojiPicker
                          onEmojiClick={handleEmojiClick}
                          theme={Theme.AUTO}
                          width={320}
                          height={400}
                        />
                      </div>
                    )}
                  </div>

                  {/* Camera / Image Search Button */}
                  <button
                    onClick={() => setIsImageModalOpen(true)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    title="Search Images"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>

                {/* Post Button */}
                <button className="px-6 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Sidebar (30%) */}
        <div className="w-full lg:w-[30%]">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              {sidebarTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-2 text-xs font-medium transition flex flex-col items-center gap-1 ${
                    activeTab === tab.id
                      ? "text-brand-500 border-b-2 border-brand-500 bg-brand-50 dark:bg-brand-500/10"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">{renderSidebarContent()}</div>
          </div>
        </div>
      </div>

      {/* Image Search Modal */}
      <ImageSearchModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={handleImageSelect}
      />

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onConfirm={handleScheduleConfirm}
        initialDate={scheduledTime?.date}
        initialTime={scheduledTime?.time}
      />
    </>
  );
};

export default ComposeContent;
