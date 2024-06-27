import React from "react";
import { BiNetworkChart } from "react-icons/bi";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 max-w-7xl border-2 rounded-3xl">
      <div className="w-full flex justify-between items-center">
        <div className="">
          <a className="btn btn-ghost text-xl">
            <BiNetworkChart size={40} />
          </a>
        </div>

        <div className="hidden md:flex">
          <a className="btn btn-ghost text-xl">DeQuiz</a>
        </div>

        <div className="flex-none gap-2 mr-3">
          <DynamicWidget />
        </div>
      </div>
    </div>
  );
};
