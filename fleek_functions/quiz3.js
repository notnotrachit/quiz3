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
  const quiz_data = JSON.parse(
    atob(data.results[0].response.result.rows[0][4].value)
  );

  for (let i = 0; i < quiz_data.length; i++) {
    delete quiz_data[i].answer;
    delete quiz_data[i].explanation;
  }

  const quiz = {
    quiz_name: data.results[0].response.result.rows[0][2].value,
    quiz_description: data.results[0].response.result.rows[0][3].value,
    quiz_data: quiz_data,
    owner: data.results[0].response.result.rows[0][1].value,
  };
  return quiz;
}

async function submit_attempt(body) {
  const quiz_id = body.quiz_id;
  const user_address = body.user_address;
  const answers = body.answers;
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
  const quiz_data = JSON.parse(
    atob(data.results[0].response.result.rows[0][4].value)
  );

  let score = 0;
  const max_score = quiz_data.length;
  for (let i = 0; i < quiz_data.length; i++) {
    console.log(quiz_data[i].answer, answers[i]);
    if (quiz_data[i].answer === answers[i]) {
      score += 1;
    }
  }

  const attempt_id = makeid(10);
  const payload2 = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `CREATE TABLE IF NOT EXISTS attempts (
          id PRIMARY KEY,
          quiz_id TEXT,
          user_address TEXT,
          answers TEXT,
          score INT,
          max_score INT,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )`,
        },
      },
      {
        type: "execute",
        stmt: {
          sql: `INSERT INTO attempts (id, quiz_id, user_address, answers, score, max_score) VALUES ('${attempt_id}' ,'${quiz_id}', '${user_address}', '${JSON.stringify(
            answers
          )}', ${score}, ${max_score})`,
        },
      },
      { type: "close" },
    ],
  };

  const uri2 = "https://quiz3-notnotrachit.turso.io/v2/pipeline";
  const response2 = await fetch(uri2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + TursoKEY,
    },
    body: JSON.stringify(payload2),
  });
  // const data2 = await response2.json();
  // console.log(data2.results[1]);
  return { score: score, max_score: max_score };
}

async function get_user_quizes(body) {
  const user_address = body.user_address;
  const payload = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `SELECT * FROM quiz
          WHERE owner = '${user_address}'`,
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
  const quizes = [];
  for (let i = 0; i < data.results[0].response.result.rows.length; i++) {
    quizes.push({
      quiz_name: data.results[0].response.result.rows[i][2].value,
      quiz_description: data.results[0].response.result.rows[i][3].value,
      quiz_id: data.results[0].response.result.rows[i][0].value,
    });
  }
  return quizes;
}

async function get_leaderboard(body) {
  // get the attempts ordered by score and timestamp
  const quiz_id = body.quiz_id;
  const payload = {
    requests: [
      {
        type: "execute",
        stmt: {
          sql: `SELECT * FROM attempts WHERE quiz_id = '${quiz_id}' ORDER BY score DESC, timestamp ASC`,
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
  const leaderboard = [];
  for (let i = 0; i < data.results[0].response.result.rows.length; i++) {
    leaderboard.push({
      user_address: data.results[0].response.result.rows[i][2].value,
      score: data.results[0].response.result.rows[i][4].value,
      max_score: data.results[0].response.result.rows[i][5].value,
      timestamp: data.results[0].response.result.rows[i][6].value,
    });
  }
  return leaderboard;
}

export const main = async (params) => {
  const { body, path } = params;
  switch (path) {
    case "/save_question":
      return save_question(body);
    case "/get_quiz":
      return get_quiz(body);
    case "/submit_attempt":
      return submit_attempt(body);
    case "/get_user_quizes":
      return get_user_quizes(body);
    case "/get_leaderboard":
      return get_leaderboard(body);
    default:
      return { error: "path not found" };
  }
};

// get_quiz({ quiz_id: "xL6qKKlXHx" });

// submit_attempt({
//   quiz_id: "KGetymyZMB",
//   user_address: "0x123",
//   answers: {
//     0: "a",
//     1: "runserver",
//   },
// });
