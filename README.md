# DeQuiz
An advanced quiz platform on the fleek network. You can even generate your own quizzes and share them with your friends.

Need help while maing questions? No problem! We have an AI question generator that will help you make questions in a jiffy.

<!-- add scressnshots in dropdown -->

<details>
<summary>Screenshots</summary>

![image](/assets/homepage.png)

</details>


## Features
- Create your own quizzes
- Share your quizzes with your friends
- AI question generator
- Leaderboard
- Decentralized Infrastructure
- No ads

## Tech Stack
- NextJS
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
All the fleek functions are in the `fleek_functions` directory. 

The `public` directory contains all the static assets. The `src` directory contains the main source code of the project.

The `app` directory contains all the pages of the app.

The `components` directory contains all the reusable components. 

## Fleek Functions
We have mainly deployed 2 functions on the fleek network.<br/>
The function files are in the `fleek_functions` directory.

1. `get_question.js` - This function is used to generate questions according to the quiz name and description using AI. 
<br/>It's deployed link: https://small-egg-quick.functions.on-fleek.app

2. `quiz3.js` - This is the main function that is used for handling all quiz related things and interacting with the Turso SQLite database. <br/>It's deployed link: https://incalculable-football-gigantic.functions.on-fleek.app  <br/>It has several sub functions that we made

    - `save_question` - This function is used to save the questions and create a quiz.  
    - `get_quiz` - This function is used to get the quiz details.
    - `submit_attempt` - This function is used to submit the attempt of the quiz.
    - `get_user_quizes` - This function is used to get the quizzes created by the user.
    - `get_leaderboard` - This function is used to get the leaderboard of the quiz.



## Pages
- Home Page - The landing page of the app.
- Dashboard - The dashboard where you can see all the quizzes created by you.
- Create Quiz - Create your own quiz.
- Play Quiz - Play the quiz.
- Leaderboard - See the leaderboard of the quiz.


## Installation
| Step | Command | Description |
| --- | --- | --- |
| 1 | `git clone https://github.com/notnotrachit/quiz3.git` | Clone the repository |
| 2 | `cd quiz3` | Change directory to the repository |
| 3 | `npm install` | Install the dependencies |
| 4 | `npm run dev` | Start the development server |


