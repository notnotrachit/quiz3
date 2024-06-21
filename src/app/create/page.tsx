"use client";
import {useState} from "react";
// import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Home() {

    interface Question {
        question: string;
        answer: string;
        options: string[];
        explanation: string[];
    }

    const [questions, setQuestions] = useState<Question[]>([]);

    return (
        <main className="flex justify-center p-24 bg-gray-100 min-h-screen text-black">
            <div className="bg-white p-10 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6">Create a new Quiz</h1>

                <form>
                    <label htmlFor="quiz-name" className="block text-sm font-medium text-gray-700">Quiz Name</label>
                    <input type="text" id="quiz-name" name="quiz-name"
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>

                    <label htmlFor="quiz-description" className="block text-sm font-medium text-gray-700 mt-4">Quiz
                        Description</label>
                    <textarea id="quiz-description" name="quiz-description"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>

                    <label htmlFor="quiz-questions"
                           className="block text-sm font-medium text-gray-700 mt-4">Questions</label>
                    <div id="quiz-questions">
                        {questions.map((question, index) => (
                            <div key={index} className="mt-4">
                                <label htmlFor={`question-${index}`}
                                       className="block text-sm font-medium text-gray-700">Question</label>
                                <input type="text" id={`question-${index}`} name={`question-${index}`}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>

                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="mt-4">
                                        <label htmlFor={`option-${index}-${optionIndex}`}
                                               className="block text-sm font-medium text-gray-700">Option</label>
                                        <div className={"flex space-x-2"}>
                                            <input type="radio" id={`answer-${index}`} name={`answer-${index}`}
                                                   value={option} className="mt-1"/>
                                            <input type="text" id={`option-${index}-${optionIndex}`}
                                                    name={`option-${index}-${optionIndex}`}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>

                                        <button type="button" onClick={
                                            () => setQuestions(
                                                questions.map((q, qIndex) => {
                                                    if (qIndex === index) {
                                                        return {
                                                            ...q,
                                                            options: q.options.filter((o, oIndex) => oIndex !== optionIndex)
                                                        };
                                                    }
                                                    return q;
                                                })
                                            )
                                        } className="mt-2 inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <RiDeleteBin6Fill/>
                                        </button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={
                                    () => setQuestions(
                                        questions.map((q, qIndex) => {
                                            if (qIndex === index) {
                                                return {
                                                    ...q,
                                                    options: [...q.options, ""]
                                                };
                                            }
                                            return q;
                                        })
                                    )
                                }
                                        className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add
                                    Option
                                </button>

                                <label htmlFor={`explanation-${index}`}
                                       className="block text-sm font-medium text-gray-700 mt-4">Explanation</label>
                                <input type="text" id={`explanation-${index}`} name={`explanation-${index}`}
                                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => setQuestions([...questions, {
                        question: "",
                        answer: "",
                        options: [],
                        explanation: []
                    }])}
                            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add
                        Question
                    </button>
                    <button type="submit"
                            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                        Quiz
                    </button>
                </form>
            </div>
        </main>
    );
}