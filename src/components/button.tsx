"use client";
import React from "react";
import { Button } from "@/components/ui/moving-border";

export function MovingBorderDemo() {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-white border-2 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Click Here!
      </Button>
    </div>
  );
}
