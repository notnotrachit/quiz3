"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    // <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
    <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    // </div>
  );
}

const testimonials = [
  {
    quote:
      "DeQuiz3 has revolutionized the way I learn and challenge myself. The AI-generated quizzes are both fun and educational, making Web3 concepts easier to grasp. Highly recommended!",
    name: "Swastik ",
    title: "Open Source Developer",
  },
  {
    quote:
      "As a Web3 developer, I find DeQuiz3 incredibly useful for staying updated with the latest trends and technologies. The decentralized nature ensures transparency and fairness in every quiz.",
    name: "Satyam",
    title: "Web3 Developer",
  },
  {
    quote:
      "DeQuiz3 is a game-changer in the ed-tech space. The seamless integration of AI and decentralization provides a robust and immersive learning experience. A must-try for anyone interested in Web3.",
    name: "Yash ",
    title: "FullStack Developer",
  },

  {
    quote:
      "As a Web3 developer, I find DeQuiz3 incredibly useful for staying updated with the latest trends and technologies. The decentralized nature ensures transparency and fairness in every quiz.",
    name: "Satyam",
    title: "Web3 Developer",
  },
  {
    quote:
      "DeQuiz3 offers a unique blend of AI and blockchain technology. The quizzes are engaging, and the platform's decentralized structure adds a layer of trust and security that's unmatched.",
    name: "Rakesh",
    title: "Web3 Developer",
  },
  {
    quote:
      "I love how DeQuiz3 makes learning about Web3 so interactive and accessible. The AI-generated questions are always fresh and challenging, keeping me on my toes!",
    name: "Rachit",
    title: "FullStack Developer",
  },
];
