"use client";
import { useState, useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useSearchParams } from "next/navigation";
import { SiSpacemacs } from "react-icons/si";
import Link from "next/link";

export default function Play() {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet } = useDynamicContext();
  const searchParams = useSearchParams();

  const [quizId, setQuizId] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any>(null);

  useEffect(() => {
    const quiz_id = searchParams.get("quiz");
    setQuizId(quiz_id);
    if (!leaderboard) {
      fetch_leaderboard(quiz_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetch_leaderboard(quizId: any) {
    fetch(
      "https://incalculable-football-gigantic.functions.on-fleek.app/get_leaderboard",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quiz_id: quizId }),
      }
    ).then((response) => {
      response.json().then((data) => {
        setLeaderboard(data);
        console.log(data);
      });
    });
  }

  if (!sdkHasLoaded) {
    return (
      <div className="flex justify-center p-24 min-h-screen items-center">
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center p-24 min-h-screen items-center">
        Not logged in
      </div>
    );
  }

  if (!quizId) {
    return (
      <div className="flex justify-center p-24 min-h-screen items-center">
        Quiz Not Found
      </div>
    );
  }

  return (
    <div className=" flex justify-center pt-24 h-screen w-full">
      <div className="  ">
        <h1 className="text-3xl md:text-4xl font-bold mb-5 text-center text-transparent bg-clip-text  bg-gradient-to-b from-neutral-200 to-neutral-600">
          Leaderboard
        </h1>
        <div className="w-full">
          {" "}
          <table className="max-w-1/2 shadow-md rounded my-4 backdrop-blur  border-spacing-y-3 border-separate">
            <thead>
              <tr className="flex justify-between  bg-gray-800 rounded-xl ">
                <th className="py-2 px-4  text-white font-semibold uppercase">
                  Rank
                </th>
                <th className="py-2 px-4  text-white font-semibold uppercase">
                  Address
                </th>
                <th className="py-2 px-4  text-white font-semibold uppercase">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="flex justify-center md:justify-between text-xs md:text-base">
              {leaderboard &&
                leaderboard.map((row: any, index: number) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "my-2 bg-black/10 hover:scale-110 transition-all ease-in-out duration-200 delay-75 ring-primary ring-1"
                        : "my-2 bg-white/10 hover:scale-110 transition-all ease-in-out duration-200 delay-75 ring-primary ring-1"
                    }
                  >
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="py-2 px-3">{row.user_address}</td>
                    <td className="py-2 px-3">{row.score}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <span className="flex justify-center">
          {" "}
          <Link 
            href={"/play?quiz=" + quizId}
          >
            <button className="btn  btn-accent">Go to Quiz!</button>
          </Link>
        </span>
      </div>
    </div>
  );
}
