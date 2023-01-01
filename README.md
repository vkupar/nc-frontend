### General information - [https://gregarious-pastelito-3acedb.netlify.app/](https://gregarious-pastelito-3acedb.netlify.app/)

- Working on this project (BE + FE + Deployment) took me around 2 full days.
- Used `Blueprint.js` as a UI toolkit for the first time.
- Implemented Firebase Auth for the first time.
- Deployed on `Netlify` for the first time. Pushing changes to the `main` branch triggers automatic deployment on Netlify.
- ! Tests are missing _(will be added if requested)_

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

(optional) Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) extensions for [VS Code](https://code.visualstudio.com/download).

Install dependencies:

```
npm install
```

Set default environment variables. Create a `Firebase` project, activate Authentication => Phone, and specify credentials:

```
cp .env.example .env
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test` _(tests will be added if requested)_

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
