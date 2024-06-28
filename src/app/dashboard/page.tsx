"use client";
import { useState, useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";

export default function Play() {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet } = useDynamicContext();
  const [quizzes, setQuizzes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  function get_user_quiz() {
    setLoading(true);
    fetch(
      "https://incalculable-football-gigantic.functions.on-fleek.app/get_user_quizes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_address: primaryWallet?.address}),
      }
    ).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setQuizzes(data);
        setLoading(false);
      });
    });
  }
  useEffect(() => {
    if (isLoggedIn) {
      get_user_quiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, primaryWallet]);

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

  return (
    <div className="justify-center p-24 min-h-screen w-full">
      <div className="flex flex-wrap">
        {quizzes.map((quiz: any) => {
          return (
            <div
              key={quiz.quiz_id}
              className="p-4 m-4 rounded-lg w-96 h-56 border border-white relative backdrop-blur-sm"
            >
              <h2 className="">
                Quiz Name:{" "}
                <span className="underline text-xl">{quiz.quiz_name}</span>
              </h2>
              <span>Description:</span>
              <p>{quiz.quiz_description}</p>
              <div className="absolute bottom-4 w-full left-0 flex justify-between px-4">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    // url = host + "/play?quiz=" + quiz.quiz_id
                    const url =
                      window.location.origin + "/play?quiz=" + quiz.quiz_id;
                    navigator.clipboard.writeText(url);
                  }}
                >
                  Copy Link
                </button>
                <button className="btn btn-primary">Leaderboard</button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="p-4 m-4 rounded-lg w-96 h-56 border border-white relative backdrop-blur-sm skeleton">
          <div className="absolute bottom-4 w-full left-0 flex justify-between px-4 skeleton"></div>
        </div>
      )}
      <div className="flex justify-center">
        <Link href="/create">
          <div className="btn btn-primary">Create Quiz</div>
        </Link>
      </div>
    </div>
  );
}
