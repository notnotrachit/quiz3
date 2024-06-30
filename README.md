# DeQuiz3
An advanced quiz platform on the Fleek network. You can create your own quizzes and share them with your friends.

Need help while making questions? No problem! We have an AI question generator that will help you make questions in a jiffy.

<!-- add screenshots in dropdown -->

<details>
<summary>Screenshots</summary>

![Homepage](/assets/homepage.png)

</details>

## Features
- Create quizzes
- Share quizzes with friends
- AI question generator
- Leaderboard
- Decentralized infrastructure
- No ads

## Tech Stack
- Next.js
- Fleek Network
- IPFS
- Fleek Functions
- Turso SQLite DB

## Project Structure
```
quiz3
├── fleek_functions
├── public
└── src
    ├── app
    │   ├── create
    │   ├── dashboard
    │   ├── home
    │   ├── leaderboard
    │   └── play
    ├── components
    │   └── ui
    ├── data
    ├── lib
    └── utils
```
- `fleek_functions`: Contains all Fleek functions.
- `public`: Contains all static assets.
- `src`: Contains the main source code.
    - `app`: Contains all the app pages.
    - `components`: Contains all reusable components.

## Fleek Functions
We have deployed two main functions on the Fleek network, located in the `fleek_functions` directory:

1. `get_question.js` - Generates questions based on the quiz name and description using AI.
<br/>
[Deployed Link](https://small-egg-quick.functions.on-fleek.app)

2. `quiz3.js` - Handles all quiz-related operations and interacts with the Turso SQLite database. <br/>
   [Deployed Link](https://incalculable-football-gigantic.functions.on-fleek.app) <br/>
It includes several sub-functions:
    - `save_question`: Saves questions and creates quizzes.
    - `get_quiz`: Retrieves quiz details.
    - `submit_attempt`: Submits quiz attempts.
    - `get_user_quizzes`: Retrieves quizzes created by the user.
    - `get_leaderboard`: Retrieves the quiz leaderboard.


## Pages
- **Home Page**: The landing page of the app.
- **Dashboard**: View all quizzes created by you.
- **Create Quiz**: Create a new quiz.
- **Play Quiz**: Play the quiz.
- **Leaderboard**: View the quiz leaderboard.

## Installation
| Step | Command | Description |
| --- | --- | --- |
| 1 | `git clone https://github.com/notnotrachit/quiz3.git` | Clone the repository |
| 2 | `cd quiz3` | Change directory to the repository |
| 3 | `npm install` | Install the dependencies |
| 4 | `npm run dev` | Start the development server |


## Future Plans
- Add support for images in questions.
- Add timed quizzes.
- Add support for multiple correct answers.

- Generate questions based on a PDF provided by the user.
And much more
    