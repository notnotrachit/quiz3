"use client";
import { useState, useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
    })
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

  if (!quiz) {
    return null;
  }

  if (currentQuestionIndex === -1) {
    // Introduction screen
    return (
      <main className="flex justify-center p-24 min-h-screen">
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome to the Quiz!</h2>
          <h2 className="text-2xl font-bold mb-4 underline">
            Quiz Topic: {quiz.quiz_name}
          </h2>
          <button onClick={handleNextQuestion} className="btn btn-primary mr-4">
            Play
          </button>
          <Link
            href={"/leaderboard?quiz=" + quizId}
            // onClick={() => console.log("Leaderboard button clicked")}
            className="btn btn-primary"
          >
            Leaderboard
          </Link>
        </div>
      </main>
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
    <main className="flex justify-center p-24 min-h-screen">
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
                    checked={
                      selectedAnswers[currentQuestionIndex] === answer
                    }
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
              className="btn btn-primary"
            >
              Previous
            </button>
          )}
          {currentQuestionIndex < quiz.quiz_data.length - 1 && (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="btn btn-primary"
            >
              Next
            </button>
          )}
          {currentQuestionIndex === quiz.quiz_data.length - 1 && (
            <button
              type="submit"
              className="btn btn-primary"
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
