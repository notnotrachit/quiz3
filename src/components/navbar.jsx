import React from "react";
import { BiNetworkChart } from "react-icons/bi";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
// import DEQUIZZ from "../app/DEQUIZZ.png";

export const Navbar = () => {
  return (
    <div className="navbar backdrop-blur bg-base-100/30 max-w-7xl border-2 rounded-3xl z-50">
      <div className="w-full flex justify-between items-center">
        <div className="">
          <a className="btn btn-ghost text-xl">
            <Image
              src="https://raw.githubusercontent.com/yash-raj10/bookmart/main/public/DEQUIZZ.png"
              height={40}
              width={40}
            />
          </a>
        </div>

        <div className="hidden md:flex">
          <a className="btn btn-ghost text-xl">DeQuiz3</a>
        </div>

        <div className="flex-none gap-2 mr-3">
          <DynamicWidget />
        </div>
      </div>
    </div>
  );
};
