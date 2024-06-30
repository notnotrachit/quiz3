"use client";
import { useState, useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";

export default function Play() {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet } = useDynamicContext();
  const searchParams = useSearchParams();

  const [quizId, setQuizId] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // Start with -1 to indicate the introduction screen
  const [submitting, setSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false); // Add state to control the display of results
  const [results, setResults] = useState<any>(null);
  useEffect(() => {
    const quiz_id = searchParams.get("quiz");
    setQuizId(quiz_id);

    if (!loading) {
      fetch_quiz(quiz_id);
      setLoading(true);
    }
  }, [loading, searchParams]);

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

  function handleAnswerSelect(questionIndex: number, answer: any) {
    setSelectedAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  }

  function handleNextQuestion() {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }

  function handlePreviousQuestion() {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  }

  function handleSubmit(event: React.FormEvent) {
    setSubmitting(true);
    event.preventDefault();
    fetch(
      "https://incalculable-football-gigantic.functions.on-fleek.app/submit_attempt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quiz_id: quizId,
          answers: selectedAnswers,
          user_address: primaryWallet?.address,
        }),
      }
    ).then(async (response) => {
      console.log(response);
      setShowResults(true); // Show results after submission
      setSubmitting(false);
      setResults(await response.json());
      console.log(results);
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

  if (!quiz) {
    return null;
  }

  if (currentQuestionIndex === -1) {
    // Introduction screen
    return (
      // <main className="flex justify-center p-24 min-h-screen">
      //   <div>
      //     <h1 className="text-3xl md:text-4xl font-bold mb-5 text-center text-transparent bg-clip-text  bg-gradient-to-b from-neutral-200 to-neutral-600">
      //       Welcome to the Quiz!
      //     </h1>
      //     <h2 className="text-2xl font-bold mb-4 underline">
      //       Quiz Title:- {quiz.quiz_name}
      //     </h2>

      //     <h2 className="text-2xl font-bold mb-4 underline">
      //       Description:- {quiz.quiz_description}
      //     </h2>
      //     <button onClick={handleNextQuestion} className="btn btn-success mr-4">
      //       Play
      //     </button>
      //     <Link
      //       href={"/leaderboard?quiz=" + quizId}
      //       // onClick={() => console.log("Leaderboard button clicked")}
      //       className="btn btn-info"
      //     >
      //       Leaderboard
      //     </Link>
      //   </div>
      // </main>

      <div className="flex-col justify-center p-24 h-screen ">
        <h1 className="text-4xl  md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text  bg-gradient-to-b from-neutral-200 to-neutral-600">
          Welcome to the Quiz!
        </h1>{" "}
        <div className="w-full flex justify-center ">
          <div className="md:w-2/3 xl:w-1/2 ">
            <BackgroundGradient className="  rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
              <p className="text-3xl font-bold  text-black mt-4 mb-2 dark:text-neutral-200">
                <span className=" font-normal">Quiz Title:- </span>{" "}
                {quiz.quiz_name}
              </p>

              <p className="text-2xl font-medium text-neutral-600 dark:text-neutral-400">
                Description:- {quiz.quiz_description}
              </p>
              <div className="mt-4">
                {" "}
                <button
                  onClick={handleNextQuestion}
                  className="btn btn-success mr-2"
                >
                  Play
                </button>
                <Link
                  href={"/leaderboard?quiz=" + quizId}
                  // onClick={() => console.log("Leaderboard button clicked")}
                  className="btn btn-info"
                >
                  Leaderboard
                </Link>
              </div>
            </BackgroundGradient>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.quiz_data[currentQuestionIndex];

  if (showResults) {
    // Display results page
    return (
      <main className="flex flex-col text-center items-center justify-center p-24 min-h-screen">
        <div>
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          Congratulations, you scored {results.score} out of {results.max_score}
          !
        </div>
        <Link
          href={"/leaderboard?quiz=" + quizId}
          className="btn btn-primary my-4"
        >
          Leaderboard
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-col justify-center p-14 pt-24 md:p-24 min-h-screen">
      <h1 className="text-3xl  md:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text  bg-gradient-to-b from-neutral-200 to-neutral-600">
        Quiz Title:- {quiz.quiz_name}
      </h1>
      <form onSubmit={handleSubmit}>
        <div key={currentQuestionIndex} className="mb-4">
          <h2 className="text-xl font-bold mb-2">{currentQuestion.question}</h2>
          <ul>
            {currentQuestion.options.map((answer: any, answerIndex: number) => (
              <li key={answerIndex} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={answerIndex}
                    checked={selectedAnswers[currentQuestionIndex] === answer}
                    onChange={() =>
                      handleAnswerSelect(currentQuestionIndex, answer)
                    }
                    className="mr-2"
                  />
                  <span>{answer}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* Next and previous buttons */}
        <div className="flex justify-between">
          {currentQuestionIndex > 0 && (
            <button
              type="button"
              onClick={handlePreviousQuestion}
              className="btn btn-error"
            >
              Previous
            </button>
          )}
          {currentQuestionIndex < quiz.quiz_data.length - 1 && (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="btn btn-success"
            >
              Next
            </button>
          )}
          {currentQuestionIndex === quiz.quiz_data.length - 1 && (
            <button
              type="submit"
              className="btn btn-info"
              disabled={submitting}
            >
              {submitting && (
                <span className="loading loading-dots loading-md"></span>
              )}
              {!submitting && <span>Submit</span>}
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
