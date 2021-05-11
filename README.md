# Pomodoro - intuitive Pomodoro app that runs purely in the browser. 

Pomodoro is a time management tool that allows users to divide their work into intervals with breaks in between, maximizing productivity.

## Goals and Objectives
Pomodoro was written to gain experience in making a usable app.

## View Pomodoro App
demo version - https://juliennecodes.github.io/pomodoro/?demo

production version - https://juliennecodes.github.io/pomodoro

## Setup
- go to project folder
- type command - npm install

## Running the App Locally
- type command - npm start

## Tests
- type command - npm test

## Deploy App in GitHub Pages
- type command - npm install gh-pages --save -dev
- add "homepage": "https://juliennecodes.github.io/pomodoro", in package.json
  - add homepage property
  - homepage property's value is the GitHub Pages url
- add "predeploy": "npm run build", "deploy": "gh-pages -d build" in the scripts property
  - predeploy - builds a minified app for deployment, is initiated after the deploy script runs
  - deploy - deploys the app
- type command - npm run deploy
- select gh-pages branch as the source for the GitHub Pages site
  - open Github repository
  - go to settings
  - go to Pages section
  - in the Source section, select gh-pages as the branch
