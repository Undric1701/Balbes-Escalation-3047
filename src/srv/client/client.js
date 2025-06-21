/* AT7, 14.06, client module */

import * as Anim from "../../../src/anim/anim.js"
import * as unit from "../../anim/units/unit.js"
import { control } from "../../mth/mth_cam.js"

let socket;

let Animation;

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
        socket.on("No-Animation-On-Server", async function () {
            //startAnimation();      
            let an = new Anim.Animation();
            await an.finishInit();
            socket.emit("Animation-Init-Response", an)
        });
        */
        socket.on("Animation-Update", async function (unitsList) {
            if (Animation == undefined) {
                Animation = new Anim.Animation();
                await Animation.finishInit();
                clearInterval(animInitTimeInterval);
                startAnimation();
            }
            await Animation.updateUnits(unitsList);
            //window.requestAnimationFrame(Animation.animResponse);
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

export function requestAnimation() {
    if (socket != undefined) {
        socket.emit("New-Animation-Request");
    }
}

let animInitTimeInterval;

setTimeout(() => { requestAnimation() }, 5000);

//socket.emit("New-Animation-Request", socket);

export async function startAnimation() {
    //Animation = new Anim.Animation(socket);

    //await Animation.finishInit();
    if (window.animation == undefined) {
        window.animation = Animation;
    }

    socket.emit("messageToServer", "Started new animation");
    //socket.emit("Animation-Started", socket.id, Animation);
    window.requestAnimationFrame(Animation.animResponse);
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