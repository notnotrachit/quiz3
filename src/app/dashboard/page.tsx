"use client";
import { useState, useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import { Meteors } from "@/components/ui/meteors";
import { FaShareAlt } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";

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
        body: JSON.stringify({ user_address: primaryWallet?.address }),
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
    <div className="justify-center py-28 px-20 min-h-screen w-full ">
      <h1 className="text-5xl font-bold mb-6 text-center text-transparent bg-clip-text  bg-gradient-to-b from-neutral-200 to-neutral-600">
        Dashboard
      </h1>
      <div className="flex flex-wrap gap-5">
        {quizzes.map((quiz: any) => {
          return (
            <div key={quiz.quiz_id} className="">
              <div className=" relative max-w-xs h-80 w-96">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                      />
                    </svg>
                  </div>

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                    <span className="underline text-xl">{quiz.quiz_name}</span>
                  </h1>

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    {quiz.quiz_description}
                  </p>

                  <div className="flex justify-around items-center w-full">
                    <button
                      className="border px-4 py-1 rounded-lg  border-gray-500 text-white btn btn-accent"
                      onClick={() => {
                        // url = host + "/play?quiz=" + quiz.quiz_id
                        const url =
                          window.location.origin + "/play?quiz=" + quiz.quiz_id;
                        navigator.clipboard.writeText(url);
                      }}
                    >
                      Copy Link <FaShareAlt />
                    </button>
                    <Link
                      className="btn btn-primary"
                      href={"/leaderboard?quiz=" + quiz.quiz_id}
                    >
                      Leaderboard
                    </Link>
                  </div>

                  {/* Meaty part - Meteor effect */}
                  <Meteors number={20} />
                </div>
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
      <div className="flex justify-center p-8">
        <Link href="/create">
          <div className="btn btn-neutral">Create New Quiz</div>
        </Link>
      </div>
    </div>
  );
}
