/* AT7, 14.06, client module */

import * as Anim from "../../../src/anim/anim.js"

export function logABC() {
    console.log("ABC");
}

let timer_id;
let Animation;

let socket;
export async function openWebsocketCommunication() {
    socket = await io();

    socket.on("connect", () => {
        console.log("Successful connection to server");
        socket.emit("messageToServer", "Hello");
        socket.on("messageFromServer", function (msg) {
            console.log(`Message from server: ${msg}`);
        });
        socket.on("Error", function (err) {
            document.getElementById("Dynamic-Text").textContent = err;
            console.error(err);
        })
        socket.on("Enter-Chat", function (user) {
            localStorage.setItem("User", user);
            window.location.href = "./chat.html";
            socket.emit("Messages-Request");
        });
        socket.on("Send-Messages", (messages) => {
            drawChat(messages);
        });
        /*
        socket.on("Start-Animation", () => {
            Animation = new Anim.Animation();
            window.requestAnimationFrame(Animation.animRender());
        }); 
        */
    });

    socket.on("disconnect", () => {
        console.log(socket.id);
    });
};

export function startAnimation() {
    Animation = new Anim.Animation();
    socket.emit("messageToServer", "Started new animation");
    socket.emit("Animation-Started", socket.id, Animation);
    window.requestAnimationFrame(Animation.animRender);
}

/*
export function registerNewUser(username, password) {
    socket.emit("System-Mesasge", `Registring new user: name:${username}, password: ${password}`);
    console.log(`Registring new user: name:${username}, password: ${password}`);
    socket.emit("Registring-New-User", username, password);
}

export function logIn(username, password) {
    socket.emit("System-Mesasge", `Try to login: name:${username}, password: ${password}`);
    console.log(`Try to login: name:${username}, password: ${password}`);
    socket.emit("Log-In", username, password);
}

export function SendMessage(text) {
    let hours = (new Date()).getHours();
    let minutes = (new Date()).getMinutes();
    socket.emit("Add-Message", text, localStorage.getItem("User"), [hours, minutes]);
}
//setTimeout(() => { openWebsocketCommunication(); }, 1000);

export function requestMessages() {
    socket.emit("Messages-Request");
}

function drawChat(messages) {
    const msg = document.getElementById("Chat-Messages");
    while (msg.firstChild) {
        msg.removeChild(msg.firstChild);
    }
    for (let i = 0; i < messages.length; i++) {
        const item = document.createElement('li');
        item.style.maxWidth = '900px';
        item.style.backgroundColor = "azure";
        item.textContent = `${messages[i].user} :${messages[i].date[0]}:${messages[i].date[1]} ${messages[i].message}`;
        msg.appendChild(item);
    }
}
*/