"use client";
import { useState } from "react";
// import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizName, setQuizName] = useState<string>("");
  const [quizDescription, setQuizDescription] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isLoggedIn = useIsLoggedIn();
  // console.log(isLoggedIn);
  const { sdkHasLoaded, primaryWallet } = useDynamicContext();
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

  interface Question {
    question: string;
    answer: string;
    options: string[];
    explanation: string[];
  }

  async function createQuiz() {
    // validate quiz, each question should have an answer ans at least 2 options
    setLoading(true);
    if (
      questions.some(
        (question) =>
          question.answer === "" ||
          question.options.length < 2 ||
          question.options.some((option) => option === "")
      )
    ) {
      alert("Please fill all the fields");
      return;
    }

    fetch(
      "https://incalculable-football-gigantic.functions.on-fleek.app/save_question",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quiz_data: questions,
          quiz_name: quizName,
          quiz_description: quizDescription,
          user_address: primaryWallet?.address,
        }),
      }
    )
      .then((response) => {
        response.json();
        setLoading(false);
        // redirect to dashboard
        window.location.href = "/dashboard";
      })
      .then((response) => console.log(response))
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  async function getAIQuestions() {
    setLoadingAI(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: quizName,
        description: quizDescription,
      }),
    };
    console.log(options);

    fetch("https://small-egg-quick.functions.on-fleek.app/", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // if the answer  string is not in the options, then set the answer string to empty
        if (!response.options.includes(response.answer)) {
          response.answer = "";
        }

        setQuestions([
          ...questions,
          {
            question: response.question,
            answer: response.answer,
            options: response.options,
            explanation: response.explanation,
          },
        ]);
        setLoadingAI(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingAI(false);
      });
    // console.log(questions);
  }

  return (
    <main className="flex justify-center p-24 min-h-screen w-full ">
      <div className="p-10 rounded-3xl shadow-md backdrop-blur  bg-white/10 border-2 w-3/5 h-1/2">
        <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text  bg-gradient-to-b from-neutral-200 to-neutral-600">
          Create a New Quiz
        </h1>

        <form>
          <div className="w-full  relative ">
            <input
              type="text"
              id="quiz-name"
              name="quiz-name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder=" "
              className={` rounded-xl peer  w-full p-5 pb-4 font-light bg-white/10 border-2  outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
            />
            <label
              htmlFor="quiz-name"
              className={`absolute text-base duration-150 transform -translate-y-4 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
            >
              Quiz Name
            </label>
          </div>

          <div className="w-full  relative mt-2  ">
            <input
              type="text"
              id="quiz-description"
              name="quiz-description"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
              placeholder=" "
              className={` rounded-xl peer  w-full p-5 pb-4 font-light bg-white/10 border-2  outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
            />
            <label
              htmlFor="quiz-description"
              className={`absolute text-base duration-150 transform -translate-y-4 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
            >
              Quiz Description
            </label>
          </div>

          <div className="rounded-2xl border-2 mt-5 p-2 ">
            <label
              htmlFor="quiz-questions"
              className="block text-2xl text-center font-semibold border-b-2 text-blue-400 "
            >
              Questions
            </label>

            <div id="quiz-questions">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="m-4 border-blue-600 border-2  p-4 rounded-3xl"
                >
                  <textarea
                    id={`question-${index}`}
                    name={`question-${index}`}
                    placeholder={"Question " + (index + 1)}
                    value={question.question}
                    onChange={(e) =>
                      setQuestions(
                        questions.map((q, qIndex) => {
                          if (qIndex === index) {
                            return {
                              ...q,
                              question: e.target.value,
                            };
                          }
                          return q;
                        })
                      )
                    }
                    className="bg-white/10 mt-1 block w-full rounded-md border-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2"
                  />
                  <label className="block text-base font-medium mt-2  ">
                    Options:-
                  </label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="">
                      <div className={"flex space-x-2 items-center pt-1"}>
                        <input
                          type="radio"
                          id={`answer-${index}`}
                          name={`answer-${index}`}
                          className="mt-1 radio radio-primary"
                          placeholder={"Option"}
                          {...(question.answer === question.options[optionIndex]
                            ? { checked: true }
                            : {})}
                          onChange={(e) =>
                            setQuestions(
                              questions.map((q, qIndex) => {
                                if (qIndex === index) {
                                  return {
                                    ...q,
                                    answer: q.options[optionIndex],
                                  };
                                }
                                return q;
                              })
                            )
                          }
                        />
                        <textarea
                          id={`option-${index}-${optionIndex}`}
                          name={`option-${index}-${optionIndex}`}
                          placeholder={"Option " + (optionIndex + 1)}
                          value={option}
                          onChange={(e) =>
                            setQuestions(
                              questions.map((q, qIndex) => {
                                if (qIndex === index) {
                                  return {
                                    ...q,
                                    options: q.options.map((o, oIndex) => {
                                      if (oIndex === optionIndex) {
                                        return e.target.value;
                                      }
                                      return o;
                                    }),
                                  };
                                }
                                return q;
                              })
                            )
                          }
                          className="bg-white/10 px-2 mt-1 block w-full rounded-md border-2 shadow-sm focus:border-grey-300 focus:ring focus:ring-grey-200 focus:ring-opacity-50"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setQuestions(
                              questions.map((q, qIndex) => {
                                if (qIndex === index) {
                                  return {
                                    ...q,
                                    options: q.options.filter(
                                      (o, oIndex) => oIndex !== optionIndex
                                    ),
                                  };
                                }
                                return q;
                              })
                            )
                          }
                          className="mt-2 inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center">
                    {" "}
                    <button
                      type="button"
                      onClick={() =>
                        setQuestions(
                          questions.map((q, qIndex) => {
                            if (qIndex === index) {
                              return {
                                ...q,
                                options: [...q.options, ""],
                              };
                            }
                            return q;
                          })
                        )
                      }
                      className="btn btn-outline btn-primary bg-blue-600 mt-2 inline-flex justify-center items-center py-2 px-4 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Option
                    </button>
                  </div>

                  <label
                    htmlFor={`explanation-${index}`}
                    className="block text-sm font-medium mt-4"
                  >
                    Explanation:-
                  </label>
                  <textarea
                    id={`explanation-${index}`}
                    name={`explanation-${index}`}
                    placeholder={"Explanation"}
                    value={question.explanation}
                    onChange={(e) =>
                      setQuestions(
                        questions.map((q, qIndex) => {
                          if (qIndex === index) {
                            return {
                              ...q,
                              explanation: [e.target.value],
                            };
                          }
                          return q;
                        })
                      )
                    }
                    className="bg-white/10 px-2 mt-1 block w-full rounded-md border-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <div className="flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setQuestions(
                          questions.filter((q, qIndex) => qIndex !== index)
                        )
                      }
                      className="mt-2 flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2 items-center justify-center mt-2 mb-1">
              <button
                type="button"
                onClick={() =>
                  setQuestions([
                    ...questions,
                    {
                      question: "",
                      answer: "",
                      options: ["", ""],
                      explanation: [],
                    },
                  ])
                }
                className="mt-4 inline-flex justify-center btn btn-outline btn-primary"
              >
                Add Question
              </button>

              <button
                type="button"
                onClick={getAIQuestions}
                className="mt-4 inline-flex justify-center bg-blue-600 btn btn-outline btn-primary"
                disabled={loadingAI}
              >
                {/* {loadingAI ? `<span className="loading loading-dots loading-md"></span>` : "Get AI Questions"} */}
                {loadingAI && (
                  <span className="loading loading-dots loading-md"></span>
                )}
                {!loadingAI && <p>Get AI Questions ✨</p>}
              </button>
            </div>
          </div>

          <button
            onClick={createQuiz}
            type="button"
            className="mt-6 border-2 w-full rounded-3xl inline-flex justify-center btn btn-outline btn-success"
            disabled={loading}
          >
            {loading && (
              <span className="loading loading-dots loading-md"></span>
            )}
            {!loading && "Create Quiz"}
          </button>
        </form>
      </div>
    </main>
  );
}
