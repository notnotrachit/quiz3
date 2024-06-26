"use client";
import { useState, useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useSearchParams } from "next/navigation";

export default function Play() {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded } = useDynamicContext();
  const searchParams = useSearchParams();

  const [quizId, setQuizId] = useState("");
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const quiz_id = searchParams.get("quiz");
    setQuizId(quiz_id || "");

    if (!loading) {
      fetch_quiz(quiz_id);
      setLoading(true);
    }
  }, [searchParams]);

  function fetch_quiz(quizId: any) {
    fetch(
      "https://incalculable-football-gigantic.functions.on-fleek.app/get_quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quiz_id: quizId }),
      }
    ).then((response) => {
      response.json().then((data) => {
        setQuiz(data);
        console.log(data);
      });
    });
  }

  if (!sdkHasLoaded) {
    return (
      <div className="flex justify-center p-24 min-h-screen items-center">Loading...</div>
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
    <main className="flex justify-center p-24 min-h-screen text-[#00ff2b]">
      {/* Render your quiz data here */}
      {quiz && (
        <div>
          {quiz.quiz_name}
          {/* Example: rendering quiz title */}
          {/* <h1>{quiz}</h1> */}
        </div>
      )}
    </main>
  );
}
