// const express = require("express");
// const mongoose = require("mongoose");
// const data = require("./_data/data");
import express from "express";
import mongoose from "mongoose";
import Data from "./_data/data.js";
import Videos from "./dbModel.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-allow-Origin", "*");
  res.setHeader("Access-Control-allow-Headers", "*");
  next();
});

// db config
// tiktok-admin -> 1MO1l2akcJfvKpne
const connection_url =
  "mongodb+srv://tiktok-admin:1MO1l2akcJfvKpne@cluster0.md8be.mongodb.net/tiktok-clone?retryWrites=true&w=majority";
mongoose
  .connect(connection_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(`Database is running in ${mongoose.connection.host}`)
  );

// api endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello I am Get Request...");
});

app.get("/v2/posts", async (req, res) => {
  await Videos.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({
        success: true,
        data,
      });
    }
  });
});

app.post("/v2/posts", async (req, res) => {
  //   req.body = Data;
  await Videos.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({
        success: true,
        data,
      });
    }
  });
});

app.get("/v1/posts", (req, res) => res.status(200).send(Data));

// listener
app.listen(port, () =>
  console.log(`Server is up and running in PORT: ${port}`)
);
