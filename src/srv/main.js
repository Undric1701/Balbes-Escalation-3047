/*
const Anim = require("../anim/anim.js");
Anim.animInit();
let timer_id = setInterval(() => { Anim.animRender }, 0);
*/

/*
const MongoClient = require("mongodb");
const http = require("http");
const fs = require("fs").promises;
const express = require("express");
const logger = require("morgan");
//const WebSocket = require("ws");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
//const { useReducer } = require("react");
*/

import * as MongoClient from "mongodb";
import * as http from "http";
import * as fs from "fs/promises";
import express from "express";
import logger from "morgan";
import * as cookieParser from "cookie-parser";
import { Server } from "socket.io";

const __dirname = import.meta.dirname;

import * as Anim from "../anim/anim.js";
import { clearInterval } from "timers";

const app = express();
const port = 8002;

function myMiddleware(req, res, next) {
    console.log(`Request for ${req.url}`);

    next();
}

function middlewareCookieCheck(req, res, next) {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        console.log("There is no cookie yet!");
        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie("MyCookie", randomNumber, { maxAge: 100000, httpOnly: false });
        //res.cookie()
        console.log(`Created cookie: ${res.cookie.name}`);
    } else {
        console.log(`There is cookie ${cookie}`);
    }
    next();
}

app.use(myMiddleware);
app.use(logger("dev"));
app.use(express.static("."));
//app.use(cookieParser());
//app.use(middlewareCookieCheck);

const server = http.createServer(app);
const io = new Server(server);

let players = [];
let Animation = new Anim.Animation();
let unitsList = [];
let animInitTimeInterval;

initServer();

function addToUnitList(id, name, params) {
    unitsList.push({ id: id, name: name, params: params });
}

async function initServer() {
    //await Animation.animAddUnit("Skybox");
    await Animation.animAddUnit("water");
    addToUnitList("water", "water", 0);
    await Animation.animAddUnit("test");
    addToUnitList("test", "test", 0);
    initDatabase();
}


io.on("connection", (socket) => {
    players.push(socket);
    console.log(`Player connected with id: ${socket.id}`);

    socket.on("messageToServer", (msg) => {
        console.log(msg);

        for (let client of players) {
            client.emit("messageFromServer", `Message from client ${socket.id} was ${msg}`);
        }
    });
    socket.on("Registring-New-User", (username, password) => {
        srvRegisterNewUser(username, password, socket);
    });
    socket.on("Log-In", (username, password) => {
        srvLogIn(username, password, socket);
    });
    socket.on("disconnect", () => {
        console.log(`Client disconnected with id: ${socket.id}`);
        const index = players.indexOf(socket);
        if (index > -1) {
            players.splice(index, 1);
            ///!!!!!!!!!!!!!!!11 add player unit clear
        }
    });
    socket.on("Messages-Request", async function () {
        await srvGetMessages();
    });
    socket.on("Add-Message", async function (message, user, date) {
        await srvAddMessage(message, user, date);
        await srvGetMessages();
    });
    socket.on("Animation-Started", function (id, animation) {
        console.log(`Client:${id} started new animation`);
    });

    socket.on("New-Animation-Request", function () {
        addToUnitList("player", `player#${socket.id}`, socket.id);
        Animation.updateUnits(unitsList);
        io.emit("Animation-Update", unitsList);
    });

    //socket.on("Animation-Update", function (unitsList) )
    /*
    socket.on("Animation-Init-Response", async function (client_anim) {
        Animation = client_anim;
        Animation = new Anim.Animation();
        clearInterval(animInitTimeInterval);
        await initServer();
    });
    if (Animation == undefined) {
        animInitTimeInterval = setInterval(() => { socket.emit("No-Animation-On-Server") }, 1000);
    } else {
        Animation.animAddUnit("Player", socket);
        for (let i = 0; i < players.length; i++)
            socket.to(players[i].id).emit("Animation-From-Server", Animation);
    }
    /*              
    */
});

app.get("/", (req, res) => {
    if (req.url === "/") {
        fs.readFile(__dirname + "/client/index.html", "utf8").then((contents) => { ///src\srv\client\index.html
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        });
    } else {
        fs.readFile(__dirname + req.url, "utf8").then((contents) => {
            res.setHeader("Content-Type", "text/javascript");
            res.writeHead(200);
            res.end(contents);
        }).catch((err) => {
            res.writeHead(404);
            res.end();
        });
    }
});

app.get("/game/index.html", (req, res) => {
    fs.readFile(__dirname + "/client/game/index.html", "utf8").then((contents) => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
        io.emit("Start-Animation");
    });
});

app.get("/client.js", (req, res) => {
    fs.readFile(__dirname + "/client/client.js", "utf8").then((contents) => {
        res.setHeader("Content-Type", "text/javascript");
        res.writeHead(200);
        res.end(contents);
        io.emit("Start-Animation");
    });
});

/*
app.get("/game/index.html", (req, res) => {
    fs.readFile(__dirname + "./client/game/index.html", "utf8").then((contents) => {
            console.log("Super success!!!!!!!");
            res.send(contents);
        })
    .catch (err) {
        res.setHeader()
    }
});
*/

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

let db;
async function initDatabase() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient.MongoClient(url);
    try {
        const connection = await client.connect();
        const database = "task3chatDB";
        db = connection.db(database);
        //collection = db.collection("Users");
        //const result = await collection.insertOne({ name: "Test" });
    } catch (err) {
        console.error(err);
    }
}

async function srvRegisterNewUser(username, password) {
    try {
        const collection = db.collection("Users");
        const result = await collection.find({ name: username }).toArray();
        if (result.length != 0) {
            io.emit("Error", "This name is occupied, try another");
        } else {
            const result = await collection.insertOne({ name: username, password: password });
            io.emit("Enter-Chat", username);
        }
    }
    catch (err) {
        console.error(err);
    }
}

async function srvLogIn(username, password) {
    try {
        collection = db.collection("Users");
        const result = await collection.find({ name: username, password: password }).toArray();
        if (result.length == 1) {
            io.emit("Enter-Chat", username);
        } else {
            io.emit("Error", "Login or password is incorrect, try another");
        }
    }
    catch (err) {
        console.error(err);
    }
}

async function srvGetMessages() {
    try {
        collection = db.collection("Messages");
        const messages = await collection.find().toArray();
        io.emit("Send-Messages", messages);
    } catch (err) {
        console.error(err);
    }
}

async function srvAddMessage(message, user, date) {
    try {
        collection = db.collection("Messages");
        const messages = await collection.insertOne({ message: message, user: user, date: date });
        io.emit("messageFromServer", "Added one message");
    } catch (err) {
        console.error(err);
    }
}

//initServer();