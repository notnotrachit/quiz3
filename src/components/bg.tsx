"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Bg() {
    const [xval, setXval] = useState(0);
    const [yval, setYval] = useState(0);
    useEffect(() => {
        const ball1 = document.getElementById("ball1") as HTMLElement;
        // now move the ball randomly on screen

        const moveBall = () => {
        //   ball1.style.left = `${Math.random() * window.innerWidth}px`;
        // ball1.classList.add("top-["+Math.random() * window.innerHeight+"px]");

        let xval = Math.random() * window.innerWidth;
        setXval(xval);
        let yval = Math.random() * window.innerHeight;
        setYval(yval);

        }

        setInterval(moveBall, 2000);
        // moveBall();

    }, []);



    return (
      <div className="bg-gradient-to-t from-[#020204] to-[#204829]/50 fixed top-0 left-0 w-screen h-screen">
        <motion.div
          animate={{ x: xval, y: yval }}
          transition={{ ease: "linear", duration: 2 }}
        >
          <div
            id="ball1"
            className="bg-white rounded-full w-24 h-24 blur-3xl transition-all ease-in-out"
          ></div>
        </motion.div>
      </div>
    );
}