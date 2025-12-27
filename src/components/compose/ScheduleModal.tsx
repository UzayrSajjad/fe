"use client";

import React, { useState } from "react";
import { Modal } from "../ui/modal";

export interface ScheduledTime {
  date: string;
  time: string;
  displayDate: string;
  displayTime: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (scheduledTime: ScheduledTime) => void;
  initialDate?: string;
  initialTime?: string;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialDate = "",
  initialTime = "",
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [error, setError] = useState("");

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  const formatDisplayDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDisplayTime = (timeStr: string): string => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time");
      return;
    }

    // Check if the selected datetime is in the future
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    if (selectedDateTime <= new Date()) {
      setError("Please select a future date and time");
      return;
    }

    setError("");
    onConfirm({
      date: selectedDate,
      time: selectedTime,
      displayDate: formatDisplayDate(selectedDate),
      displayTime: formatDisplayTime(selectedTime),
    });
    handleClose();
  };

  const handleClose = () => {
    setError("");
    if (!initialDate) setSelectedDate("");
    if (!initialTime) setSelectedTime("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-md w-full mx-4 p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Schedule Post
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose when to publish your content
          </p>
        </div>

        {/* Date & Time Inputs */}
        <div className="space-y-4">
          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                min={today}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Time Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Time
            </label>
            <div className="relative">
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Preview */}
          {selectedDate && selectedTime && (
            <div className="mt-4 p-4 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
              <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mb-1">
                Scheduled for
              </p>
              <p className="text-sm text-gray-800 dark:text-white font-medium">
                {formatDisplayDate(selectedDate)} at {formatDisplayTime(selectedTime)}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-3 bg-brand-500 text-white rounded-xl font-medium hover:bg-brand-600 transition"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleModal;
