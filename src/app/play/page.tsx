"use client";
import { useState, useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useSearchParams } from "next/navigation";
import { Wallet } from "@dynamic-labs/sdk-react-core";

export default function Play() {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet } = useDynamicContext();
  const searchParams = useSearchParams();

  const [quizId, setQuizId] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});

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

  function handleAnswerSelect(questionIndex: number, answerIndex: number) {
    setSelectedAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Send selected answer values to the endpoint
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
    ).then((response) => {
      console.log(response);
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
    <main className="flex justify-center p-24 min-h-screen">
      <form onSubmit={handleSubmit}>
        {/* Render your quiz data here */}
        {quiz && <div>{quiz.quiz_name}</div>}
        {/* questions */}
        {quiz &&
          quiz.quiz_data.map((question: any, questionIndex: number) => (
            <div key={questionIndex}>
              <h2>{question.question}</h2>
              <ul>
                {question.options.map((answer: any, answerIndex: number) => (
                  <li key={answerIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={answerIndex}
                        checked={selectedAnswers[questionIndex] === answer}
                        onChange={() =>
                          handleAnswerSelect(questionIndex, answer)
                        }
                      />
                      {answer}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
