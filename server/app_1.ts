// import { json, urlencoded } from "body-parser";
//import * as compression from "compression";
//import * as express from "express";
//import express from 'express';
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

/*
'use strict';

import express = require('express');
import * as path from "path";

// import { api } from "./routes/api";

//const app: express.Application = express();

//const app: express = express();
var app = express();

let port = 3000;

//app.set('views', path.join(__dirname, 'views'));
//app.use(express.static('.'));

// 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅합니다.
app.use('/', express.static(__dirname + './routes'));
*/
/*
app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});
*/
// 라우트 예제입니다.
/*
import posts from './routes/posts';
app.use('/posts', posts);
*/
/*
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});
*/
/*
app.disable("x-powered-by");

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// api routes
app.use("./server/routes/api", api);


if (app.get("env") === "production") {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, "/../client")));
}

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error("Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});
*/
//export { app };
