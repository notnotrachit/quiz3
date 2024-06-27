import React from "react";
import { Vortex } from "@/components/ui/vortex";
import { MovingBorderDemo } from "./button";
import { AnimatedTooltipPreview } from "./people";

export function VortexDemo() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden flex justify-center items-center">
      {/* <Vortex
        backgroundColor="transparent"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      > */}
        <div>
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Wanna Try??
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
            This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
            burned and you&apos;ll have a scar.
          </p>
          <div className="flex sm:flex-row justify-center gap-4 mt-6">
            {/* <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
              Order now
            </button> */}
            <MovingBorderDemo />
            <button className="px-4 py-2  text-white ">Watch Tutorial</button>
          </div>
        </div>
      {/* </Vortex> */}
    </div>
  );
}
