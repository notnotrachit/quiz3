"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { AnimatedTooltipPreview } from "@/components/people";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
// import Link from "next/link";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased ">
      <BackgroundBeams />
      <div className="flex-row md:flex items-center justify-center gap-6 ">
        <div className="flex-row pb-6 md:pb-0 border-b md:border-b-0 md:border-r ">
          <div className="max-w-2xl flex gap-8 justify-center z-10">
            {/* <h1 className="relative z-10 text-lg md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              Have Query ?
            </h1>

            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-2xl text-center relative z-10">
              Mail us at Yashraj.se10@gmail.com
            </p> */}
            <a href="https://github.com/notnotrachit/quiz3">
              <FaGithub size={60} />
            </a>

            <FaSquareXTwitter size={60} />
            <SiFarcaster size={60} />
          </div>

          <div className="max-w-2xl  mx-auto p-4 pb-0">
            <h1 className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              Have Query ?
            </h1>

            <p className="text-neutral-500 max-w-lg mx-auto mt-2 text-xl text-center relative z-10">
              Mail us at Yashraj.se10@gmail.com
            </p>
          </div>
        </div>

        <div className="pt-6 md:pt-0">
          <AnimatedTooltipPreview />
          <p className="text-neutral-500 text-base text-center ">
            Made by Us with ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
