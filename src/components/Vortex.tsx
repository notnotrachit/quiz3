import React from "react";
import { Vortex } from "@/components/ui/vortex";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";

export function VortexDemo() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden flex justify-center items-center">
      <Vortex
        backgroundColor="transparent"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <div>
          <h2 className="text-white text-2xl md:text-5xl font-bold text-center">
            Wanna Try?
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
            Decentralized platform offering AI-generated quizzes on Web3.
            Challenge your knowledge on a cutting-edge Tech.
          </p>
          <div className="flex sm:flex-row justify-center gap-4 mt-6">
            <Link
              href={"/dashboard"}
            >
              <Button
                borderRadius="1.75rem"
                className="bg-white border-2 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              >
                Dashboard
              </Button>
            </Link>

            {/* <button className="px-4 py-2  text-white ">Watch Tutorial</button> */}
          </div>
        </div>
      </Vortex>
    </div>
  );
}
