# About

Not sure whether to choose a traditional or Roth IRA this year? Let software decide.

NOTE: WIP

# Local Setup

1. [Install](https://github.com/yarnpkg/yarn#installing-yarn) [yarn](https://github.com/yarnpkg/yarn)
2. `git clone https://github.com/sebastianrjay/IRAPicker.git && cd ./IRAPicker`
3. `NODE_ENV=development && yarn install`
4. `yarn run webpack-dev`

Navigate to [http://localhost:8080/]() in your browser. The page automatically 
reloads after any JavaScript file change made within `./lib`.

# Deployment

1. Follow Local Setup instructions above
2. `yarn run webpack-prod` (minify all JS and CSS, and remove development files)
3. Deploy `bundle.css`, `bundle.js` and `index.html` to your CDN of choice

# Contributing

Fork the repo and create your feature on your forked master branch. Then, create 
a pull request.
