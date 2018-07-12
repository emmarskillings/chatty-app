#Chatty Project

Chatty Kathy is a simple, single-page chat application created using React and WebSockets.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:3000/>.
4. Start the web socket server by changing into the 'chatty_server' directory and using the `npm run local` command. The web socket will be served at <http://localhost:3001>
5. Go to <http://localhost:3000/> in your browser.

## Dependencies

### `chatty-app`
  - babel-core
  - babel-loader
  - babel-preset-es2015
  - babel-preset-react
  - babel-preset-stage-0
  - css-loader
  - node-sass
  - sass-loader
  - sockjs-client
  - style-loader
  - webpack
  - webpack-dev-server
  - express
  - react
  - react-dom
  - uuid
  - ws

### `chatty_server`
  - express
  - uuid
  - ws

## Screenshots

!["Screenshot of Chatty Kathy"](https://github.com/emmarskillings/chatty-app/blob/master/docs/chatty-cathy.png)
