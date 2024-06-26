import React from "react";
import { Navbar } from "@/components/navbar";
import { GlobeDemo } from "@/components/Globe";
import { CanvasRevealEffectDemo2 } from "@/components/Canvas";
import { HeroScrollDemo } from "@/components/scroll";
import { Spotlight } from "@/components/ui/Spotlight";
import { VortexDemo } from "@/components/Vortex";
import { InfiniteMovingCardsDemo } from "@/components/loop";
import { BackgroundBeamsDemo } from "@/components/futter";

const page = () => {
  return (
    <>
      <div data-theme="dark" className=" bg-black ">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <GlobeDemo />
      </div>

      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <HeroScrollDemo />
      </div>

      {/* <HeroScrollDemo /> */}

      <div className=" flex h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative  items-center justify-center">
        <div className="absolute flex pointer-events-none inset-0  items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex-col w-full  ">
          {" "}
          <div className=" flex items-center justify-center pb-8">
            <InfiniteMovingCardsDemo />
          </div>
          <VortexDemo />
        </div>
      </div>

      <BackgroundBeamsDemo />

      {/* <div className="h-[50rem]  w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className=" w-1/2 xl:w-1/3 ">
        <p className="text-4xl py-8  sm:text-xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          <CanvasRevealEffectDemo2 />

          <HeroScrollDemo />
        </p>
      </div>
      </div> */}
    </>
  );
};

export default page;
