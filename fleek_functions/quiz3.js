// import mongoose from "mongoose";

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function save_question(body) {
  const quiz_data = btoa(JSON.stringify(body.quiz_data));
  const owner = body.user_address;
  const quiz_name = body.quiz_name;
  const quiz_description = body.quiz_description;
  console.log(quiz_data);
  const quiz_id = makeid(10);
  const payload = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `CREATE TABLE IF NOT EXISTS quiz (
          id PRIMARY KEY,
          owner TEXT,
          quiz_name TEXT,
          quiz_description TEXT,
          quiz_data TEXT
        )`,
        },
      },
      {
        type: "execute",
        stmt: {
          sql: `INSERT INTO quiz (id, owner, quiz_name, quiz_description, quiz_data) VALUES ('${quiz_id}' ,'${owner}', '${quiz_name}', '${quiz_description}', "${quiz_data}")`,
        },
      },
      { type: "close" },
    ],
  };
  console.log(payload.requests[1].stmt.sql);
  const uri = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data.results[1];
}

async function get_quiz(body) {
  const quiz_id = body.quiz_id;
  const payload = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `SELECT * FROM quiz WHERE id = '${quiz_id}'`,
        },
      },
      { type: "close" },
    ],
  };
  const uri = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data.results[0];
}

export const main = async (params) => {
  const { body, path } = params;
  switch (path) {
    case "/save_question":
      return save_question(body);
    case "/get_quiz":
      return get_quiz(body);
    default:
      return { error: "path not found" };
  }
};

// console.log(
//   await main({
//     body: {
//       quiz_data: [
//         {
//           question: "What is the main concept behind Web 3?",
//           answer: "Decentralized web",
//           options: [
//             "Centralized web",
//             "Decentralized web",
//             "Static web",
//             "Dynamic web",
//           ],
//           explanation:
//             "Web 3, also known as Web3.0, is the next generation of the internet, where decentralized networks and protocols replace centralized servers. This allows for a more transparent and user-controlled online experience.",
//         },
//         {
//           question: "What is the main difference between Web 2.0 and Web 3.0?",
//           answer:
//             "Web 3.0, also known as the semantic web, introduces more intelligent, flexible, and connected web services. Unlike Web 2.0, which is primarily focused on user-generated content, Web 3.0 aims to make the web understand and process data with the help of AI, making the web more intelligent and intuitive.",
//           options: [
//             "Web 3.0 is focused on user-generated content like Web 2.0",
//             "Web 3.0 aims to make the web more intelligent and intuitive",
//             "Web 3.0 is not different from Web 2.0",
//             "Web 3.0 is about the physical internet",
//           ],
//           explanation:
//             "Web 3.0 provides a superior user experience by understanding and processing data, while Web 2.0 merely displays it. Web 3.0 uses AI, machine learning, and semantic web technologies to achieve its goals. It's about connecting data and making it more meaningful.",
//         },
//       ],
//       quiz_name: "Web 3 ",
//       quiz_description: "a simple quiz on web3",
//       user_address: "0x1234",
//     },
//   })
// );
