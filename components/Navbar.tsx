"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  MessageSquareText,
  Megaphone,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import profilePic from "../public/profile.jpeg";
import { useAuthStore, useAuthInit } from "@/store/useAuthStore";
import Notification from "./Notification";
import { useClickOutside } from "@/hooks/handleClickOutside";
import Complain from "./Complain";
import SettingsSidebar from "./Setting";

const Navbar = () => {
  useAuthInit();
  const user = useAuthStore((state) => state.user);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const notificationRef = useRef<HTMLDivElement>(null);
  useClickOutside(notificationRef,() => setShowNotification(false));

  const complainRef = useRef<HTMLDivElement>(null);
  const ignorecomplainRef = useRef<HTMLButtonElement >(null);
  const [showComplain, setShowComplain] = useState(false);
  useClickOutside(complainRef, () => setShowComplain(false),ignorecomplainRef);

  const [showSettings, setShowSettings] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);
  useClickOutside(settingRef, () => setShowSettings(false));

  return (
    <nav
      className={`z-5 fixed top-0 flex items-center justify-between sm:gap-0 gap-20 px-8 py-5 bg-white border-b border-gray-100 w-full ${
        show ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300 delay-100 `}
    >
      {/* --- Left Section: Logo --- */}
      <div className="shrink-0 ">
        <Link
          href="/"
          className=" sm:text-3xl pl-10 font-extrabold text-[#2d3748] tracking-tight"
        >
          Grocery<span className="text-[#f6ad55]">.</span>
        </Link>
      </div>


      {/* --- Right Section: Actions & Profile --- */}
      <div className="flex items-center sm:gap-6 gap-0">
        {/* Language Selector */}
        <div className="hidden xl:flex items-center gap-2 cursor-pointer">
          {/* US Flag Placeholder - You can replace with an SVG or Image */}
          <div className="w-6 h-6 rounded-full overflow-hidden p-6 flex items-center justify-center bg-gray-200">
            <span className="text-lg">🇺🇸</span>
          </div>
          <span className="text-sm font-bold text-slate-700">English (US)</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Divider */}
        <div className="h-8 w-1 bg-gray-200 hidden xl:block mx-2"></div>

        {/* Icons Area */}
        <div className="flex items-center gap-2 sm:gap-5 text-slate-700">
          {/* Chat Icon with Badge */}
          <button
            ref={ignorecomplainRef}
            onClick={() => setShowComplain(!showComplain)}
            className="relative p-1 hover:bg-gray-100 rounded-full transition"
          >
            <MessageSquareText className="w-6 h-6 text-[#2d3748]" />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-orange-500 transform translate-x-1/4 -translate-y-1/4"></span>
          </button>

          {/* Announcement Icon with Badge */}
          <button
            onClick={() => setShowNotification((prev) => !prev)}
            className="relative p-1 hover:bg-gray-100 rounded-full transition"
          >
            <Megaphone className="w-6 h-6 text-[#2d3748]" />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-orange-500 transform translate-x-1/4 -translate-y-1/4"></span>
          </button>

          {/* Settings Icon */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <Settings className="w-6 h-6 text-[#2d3748]" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-100">
          <div className="text-right hidden md:block leading-tight">
            <div className="text-xl font-bold text-[#2d3748]">
              {user?.name || "Admin"}
            </div>
            <div className="text-xs text-gray-400 font-medium">
              {user?.email || "admin@gmail.com"}
            </div>
          </div>
          <div className="cursor-pointer hover:scale-125 transition h-10 w-10 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={user?.image || "/profile.png"}
              alt={user ? user.name : "profile"}
              width={100}
              height={100}
              className=" object-cover"
            />
          </div>
        </div>
      </div>

      <div
        ref={notificationRef}
        className="absolute bg-white z-80 top-0 pt-10 right-0 mb-3 h-screen shadow-[0_18px_25px_rgba(0,0,0,0.35)]"
      >
        <Notification showNotification={showNotification} />
      </div>
      <div
        ref={complainRef}
        className="absolute bg-white z-80 top-0 pt-10 right-0 mb-3 h-screen shadow-[0_18px_25px_rgba(0,0,0,0.35)]"
      >
        <Complain showComplaints={showComplain} />
      </div>
      <div
        ref={settingRef}
        className="absolute bg-white z-80 top-0 pt-10 right-0 mb-3 h-screen shadow-[0_18px_25px_rgba(0,0,0,0.35)]"
      >
        <SettingsSidebar showSettings={showSettings} />
      </div>
    </nav>
  );
};

export default Navbar;
