# FIKA

Contribution to [Hack the Crisis 2020](https://www.hackthecrisis.se/).

<img src="https://via.tt.se/data/images/00237/97ceccdd-1d60-4a8e-b7e2-9c181ce25935-w_720.png" width="200" height="200" />

## What is FIKA?

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

-   [Jocelyn Chan]()
-   [Lili Yun](https://www.linkedin.com/in/lili-yun)
-   [Axel Niklasson](https://www.linkedin.com/in/axelniklasson)
