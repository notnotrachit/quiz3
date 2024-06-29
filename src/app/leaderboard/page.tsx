

"use client";
import { useState, useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useSearchParams } from "next/navigation";


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
    <div className="flex justify-center p-24 min-h-screen">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <table className="w-full shadow-md rounded my-4 backdrop-blur border-spacing-y-3 border-separate">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-800 text-white font-semibold uppercase">
                Rank
              </th>
              <th className="py-2 px-4 bg-gray-800 text-white font-semibold uppercase">
                Address
              </th>
              <th className="py-2 px-4 bg-gray-800 text-white font-semibold uppercase">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
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
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{row.user_address}</td>
                  <td className="py-2 px-4">{row.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
