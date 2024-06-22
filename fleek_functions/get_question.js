import Groq from "./node_modules/groq-sdk/index.mjs";
// const Groq = require("./node_modules/groq-sdk");
import { z } from "./node_modules/zod/lib/index.mjs";
// const z = require("./node_modules/zod");
// import Instructor from "@instructor-ai/instructor";
import Instructor from "./node_modules/@instructor-ai/instructor/dist/index.js";
// const Instructor = require("./node_modules/@instructor-ai/instructor");

const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const Question_Schema = z.object({
  question: z.string(),
  answer: z.string(),
  options: z.array(z.string()),
  explanation: z.string().describe("Explanation for the correct answer"),
});

const client = Instructor({
  client: groqClient,
  mode: "FUNCTIONS",
});

export const main = async (params) => {
  const { body } = params;
  const topic = body?.topic;
  const description = body?.description;
  if (topic) {
    const q = await client.chat.completions.create({
      model: "mixtral-8x7b-32768",
      response_model: { schema: Question_Schema, name: "Question" },
      messages: [
        {
          role: "user",
          content: `Give me a tricky mcq question based on ${topic}. 
          The description of the question is ${description}.
          `,
        },
      ],
    });
    return q;
  }
};

// main({ method: "GET", path: "/question" }).then(console.log);
