/*
const Anim = require("../anim/anim.js");
Anim.animInit();
let timer_id = setInterval(() => { Anim.animRender }, 0);
*/

const MongoClient = require("mongodb");
const http = require("http");
const fs = require("fs").promises;
const express = require("express");
const logger = require("morgan");
//const WebSocket = require("ws");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
//const { useReducer } = require("react");

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

let clients = []

io.on("connection", (socket) => {
    clients.push(socket);
    console.log(`Client connected with id: ${socket.id}`);

    socket.on("messageToServer", (msg) => {
        console.log(msg);

        for (let client of clients) {
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
        const index = clients.indexOf(socket);
        if (index > -1) {
            clients.splice(index, 1);
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

initDatabase();