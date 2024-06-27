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
  const isLoggedIn = useIsLoggedIn();
  // console.log(isLoggedIn);
  const { sdkHasLoaded } = useDynamicContext();
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
          user_address: "0x1234",
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  async function getAIQuestions() {
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
        setQuestions([
          ...questions,
          {
            question: response.question,
            answer: response.answer,
            options: response.options,
            explanation: response.explanation,
          },
        ]);
      })
      .catch((err) => console.error(err));
    console.log(questions);
    // console.log(respons.json());
    // const question = await respons.json();
    // console.log(question);
    // append the question to the questions array
    // setQuestions([
    //   ...questions,
    //   {
    //     "question": question.question,
    //     "answer": question.answer,
    //     "options": question.options,
    //     "explanation": question.explanation,
    //   },
    // ]);
  }

  return (
    <main className="flex justify-center p-24 min-h-screen text-[#00ff2b]">
      <div className="p-10 rounded-lg shadow-md backdrop-blur-xl bg-black/20 border-2 border-[#00ff2b]">
        <h1 className="text-3xl font-bold mb-6">Create a new Quiz</h1>

        <form>
          <label htmlFor="quiz-name" className="block text-sm font-medium">
            Quiz Name
          </label>
          <input
            type="text"
            id="quiz-name"
            name="quiz-name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className="bg-white/10 mt-1 block w-full rounded-md border-2 border-[#00ff2b] shadow-sm focus:ring-opacity-50"
          />

          <label
            htmlFor="quiz-description"
            className="block text-sm font-medium mt-4"
          >
            Quiz Description
          </label>
          <textarea
            id="quiz-description"
            name="quiz-description"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            className="bg-white/10 mt-1 block w-full rounded-md border-2 border-[#00ff2b] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />

          <label
            htmlFor="quiz-questions"
            className="block text-sm font-medium mt-4"
          >
            Questions
          </label>
          <div id="quiz-questions">
            {questions.map((question, index) => (
              <div
                key={index}
                className="mt-4 border border-[#00ff2b] p-2 rounded-md"
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
                  className="bg-white/10 mt-1 block w-full rounded-md border-2 border-[#00ff2b] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2"
                />
                <label className="block text-sm font-medium">Options</label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="">
                    <div className={"flex space-x-2 items-center"}>
                      <input
                        type="radio"
                        id={`answer-${index}`}
                        name={`answer-${index}`}
                        className="mt-1 radio radio-primary"
                        placeholder={"Option"}
                        {...(question.answer === question.options[optionIndex]
                          ? { checked: true }
                          : {})}
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
                        className="bg-white/10 px-2 mt-1 block w-full rounded-md border-2 border-[#00ff2b] shadow-sm focus:border-grey-300 focus:ring focus:ring-grey-200 focus:ring-opacity-50"
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
                  className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-[#00ff2b] hover:bg-[#00ff2b]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Option
                </button>

                <label
                  htmlFor={`explanation-${index}`}
                  className="block text-sm font-medium mt-4"
                >
                  Explanation
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
                  className="bg-white/10 px-2 mt-1 block w-full rounded-md border-2 border-[#00ff2b] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={() =>
                    setQuestions(
                      questions.filter((q, qIndex) => qIndex !== index)
                    )
                  }
                  className="mt-4 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <RiDeleteBin6Fill />
                </button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
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
              className="mt-4 inline-flex justify-center btn btn-outline btn-primary"
            >
              Generate Questions using AI
            </button>
          </div>
          <button
            onClick={createQuiz}
            type="button"
            className="mt-4 inline-flex justify-center btn btn-outline btn-primary"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </main>
  );
}
