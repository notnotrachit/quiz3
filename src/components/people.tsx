"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Yash",
    designation: "FullStack Dev",
    image:
      "https://avatars.githubusercontent.com/u/114144836?s=400&u=b6e489363b59e9cb5e6bff71f1c86b1e503c355e&v=4",
  },
  {
    id: 2,
    name: "Rachit",
    designation: "FullStack Dev",
    image: "https://avatars.githubusercontent.com/u/70265590?v=4",
  },
  {
    id: 3,
    name: "Rakesh",
    designation: "Web3 Developer",
    image: "https://avatars.githubusercontent.com/u/28479139?v=4",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-4 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
