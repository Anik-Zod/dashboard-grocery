"use client";
import React, { useEffect, useRef, useState } from "react";
import { MessageSquareText, Megaphone, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore, useAuthInit } from "@/store/useAuthStore";
import Notification from "../Notification";
import { useClickOutside } from "@/hooks/handleClickOutside";
import Complain from "../Complain";
import SettingsSidebar from "../Setting";
import SearchBar from "./SearchBar";
import MobileView from "./MobileView";
import SearchBox from "../search/Searchbox";
import { motion } from "motion/react";

const Navbar = () => {
  useAuthInit();
  const user = useAuthStore((state) => state.user);
  const [show, setShow] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  const [mobile, setMobile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 15; // px
      if (window.scrollY - lastScrollY.current > threshold) {
        setShow(false);
      } else if (lastScrollY.current - window.scrollY > threshold) {
        setShow(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const notificationRef = useRef<HTMLDivElement>(null);
  useClickOutside(notificationRef, () => setShowNotification(false));

  const complainRef = useRef<HTMLDivElement>(null);
  const ignorecomplainRef = useRef<HTMLButtonElement>(null);
  const [showComplain, setShowComplain] = useState(false);
  useClickOutside(complainRef, () => setShowComplain(false), ignorecomplainRef);

  const [showSettings, setShowSettings] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);
  useClickOutside(settingRef, () => setShowSettings(false));

  const mobileRef = useRef<HTMLDivElement>(null);
  const ignoreMobileRef = useRef<HTMLDivElement>(null);
  useClickOutside(mobileRef, () => setMobile(false), ignoreMobileRef);

  const searchRef = useRef<HTMLDivElement>(null);
  const ignoreSearchRef = useRef<HTMLDivElement>(null);
  useClickOutside(searchRef, () => setOpenSearch(false), ignoreSearchRef);

  return (
    <nav
      className={`z-5 fixed top-0 flex items-center justify-between px-10 sm:gap-0 gap-10  py-5 bg-white border-b border-gray-100 w-full ${
        show ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300 delay-100 `}
    >
      {/* --- Left Section: Logo --- */}
      <motion.div
        animate={{ x: 20 }}
        transition={{ duration: 0.3 }}
        className="shrink-0 "
      >
        <Link
          href="/"
          className=" text-3xl font-extrabold text-[#2d3748] tracking-tight"
        >
          Grocery<span className="text-[#f6ad55]">.</span>
        </Link>
      </motion.div>

      <div
        onClick={() => setOpenSearch((prev) => !prev)}
        ref={ignoreSearchRef}
        className=" lg:w-[400px] sm:w-[200px] sm:block hidden"
      >
        <SearchBar />
      </div>

      {/* --- Right Section: Actions & Profile --- */}
      <div className="flex items-center sm:gap-6 gap-0">
        {/* Language Selector */}
        <div className="hidden xl:flex items-center gap-2 cursor-pointer">
          {/* US Flag Placeholder - You can replace with an SVG or Image */}
          <div className="w-6 h-6 rounded-2xl overflow-hidden p-6 flex items-center justify-center bg-gray-200">
            <span className="text-lg">🇺🇸</span>
          </div>
          <span className="text-sm font-bold text-slate-700">English (US)</span>
        </div>

        {/* Divider */}
        <div className="h-8 w-1 bg-gray-200 hidden xl:block mx-2"></div>

        {/* Icons Area */}
        <div className="hidden md:flex items-center gap-2 sm:gap-5 text-slate-700">
          {/* Chat Icon with Badge */}
          <button
            ref={ignorecomplainRef}
            onClick={() => setShowComplain(!showComplain)}
            className="group relative p-1 cursor-pointer hover:bg-gray-100 rounded-2xl transition"
          >
            <MessageSquareText className="group-hover:text-orange-500  w-6 h-6 text-[#2d3748]" />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-orange-500 transform translate-x-1/4 -translate-y-1/4"></span>
          </button>

          {/* Announcement Icon with Badge */}
          <button
            onClick={() => setShowNotification((prev) => !prev)}
            className="relative group p-1 cursor-pointer hover:bg-gray-100 rounded-2xl transition"
          >
            <Megaphone className="w-6 h-6 text-[#2d3748] group-hover:text-orange-500" />
            <span className="absolute top-0  right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-orange-500 transform translate-x-1/4 -translate-y-1/4"></span>
          </button>

          {/* Settings Icon */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 cursor-pointer group hover:bg-gray-100 rounded-2xl transition"
          >
            <Settings className="w-6 h-6 text-[#2d3748] group-hover:text-orange-500" />
          </button>
        </div>

        {/* User Profile */}
        <div
          onClick={() => setMobile(!mobile)}
          ref={ignoreMobileRef}
          className="flex items-center  gap-3 lg:ml-2 "
        >
          <div className="text-right lg:block leading-tight">
            <div className="text-xl font-bold text-[#2d3748]">
              {user?.name || "Admin"}
            </div>
            <div className="lg:block text-xs text-gray-400 font-medium">
              {user?.email || "admin@gmail.com"}
            </div>
          </div>
          <div className="cursor-pointer hover:scale-125 transition h-10 w-10 rounded-2xl overflow-hidden shadow-sm">
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
      {/* mobile view */}

      <div
        ref={mobileRef}
        className="rounded-2xl overflow-hidden fixed right-2 top-21  shadow-[0_18px_25px_rgba(0,0,0,0.35)]"
      >
        <MobileView
          mobile={mobile}
          setMobile={setMobile}
          ignorecomplainRef={ignorecomplainRef}
          setShowComplain={setShowComplain}
          setShowNotification={setShowNotification}
          setShowSettings={setShowSettings}
        />
      </div>

      {openSearch && (
        <div
          ref={searchRef}
          className="left-1/2 z-[9999] -translate-x-1/2  overflow-hidden fixed top-23  "
        >
          <SearchBox setOpenSearch={setOpenSearch} openSearch={openSearch} />
        </div>
      )}
      {openSearch && (
        <div className="fixed z-[9998] h-screen w-screen top-20 left-0 bottom-0   backdrop-blur-sm "></div>
      )}
    </nav>
  );
};

export default Navbar;
