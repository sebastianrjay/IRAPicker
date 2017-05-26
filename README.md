# About

Not sure whether to choose a traditional or Roth IRA this year? Let software decide.

NOTE: WIP

# Local Setup

## First, install Node.js, nvm and yarn
1. [Download](https://nodejs.org/en/download/) [Node.js](https://nodejs.org/en/), if not already installed. Take note of the installed version number.
2. [Install](https://github.com/creationix/nvm#installation) [nvm](https://github.com/creationix/nvm), if not already installed.
3. Ensure that when opening a new terminal tab, `node -v` yields `v6.1.0` or higher. If not, run `nvm alias default [installed version number]` (without the `v` in the version number).
4. [Install](https://github.com/yarnpkg/yarn#installing-yarn) [yarn](https://github.com/yarnpkg/yarn)

## Next, install and build this project
1. `git clone https://github.com/sebastianrjay/IRAPicker.git && cd ./IRAPicker`
2. `NODE_ENV=development && yarn install`
3. `yarn run webpack-dev`

Navigate to [http://localhost:8080/](http://localhost:8080/) in your browser. The page automatically reloads after any JavaScript file change made within `./lib`.

# Deployment

1. Follow Local Setup instructions above
2. `yarn run webpack-prod` (minify all JS and CSS, and remove development files)
3. Deploy `bundle.css`, `bundle.js` and `index.html` to your CDN of choice

# Contributing

Fork the repo and create your feature on your forked master branch. Then, create 
a pull request.
