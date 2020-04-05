# FIKA

## What is FIKA?

[![alt text](https://raw.githubusercontent.com/axelniklasson/fika/master/static/fika.png)](https://youtu.be/twsrmRLMc0o)


FIKA is a web application that enables people to easily enjoy a typical Sweish fika virtually, which is especially important during the COVID-19 crisis.

> To fika is to have a short coffee break, often with cookies or pastries, and you can (and should) have several per day.

### Features

-   Surface for ordering fika from local bakeries and cafés to support during the COVID-19 crisis
-   Matching between people wanting to grab a fika virtually without any need to register/log in
-   Chat functionality prior to starting video call
-   Live video calling directly in your browser to help you grab a virtual fika

## Tech

### Client

The client is written in Javascript using [React](https://reactjs.org/) and was bootstrapped using [create-react-app](https://create-react-app.dev/). [Socket.io](https://socket.io/docs/client-api/) is used to facilitate the socket connection with the server and [peerjs](https://peerjs.com/) was used for the video calling.

### Server

The server is writting in Javascript using [Node.js](https://nodejs.org/en/)/[Express](https://expressjs.com/) and [Socket.io](https://socket.io/docs/server-api/) is used to handle websocket connections from clients.

### Running it locally

```sh
git clone git@github.com:axelniklasson/fika.git && cd fika
# launch client on localhost:3000
cd client && yarn && yarn start
# launch server on localhost:3001
cd ../server && yarn && node index.js
```

## Hackers

-   [Jocelyn Chan](mailto:jocelyn.sthlm@gmail.com)
-   [Lili Yun](https://www.linkedin.com/in/lili-yun)
-   [Axel Niklasson](https://www.linkedin.com/in/axelniklasson)

Contribution to [Hack the Crisis 2020](https://www.hackthecrisis.se/).

<img src="https://raw.githubusercontent.com/axelniklasson/fika/master/static/hack_the_crisis.png" width="200" height="200" />
