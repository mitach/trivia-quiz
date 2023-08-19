// chat.js
import { generateDate } from "./utils.js";

export function sendMessage(socket, data) {
    socket.emit("message", data);
    document.getElementById("message").value = "";
}

export function displayUserMessage(data) {
    const messages = document.getElementById("messages");

    const htmlTemplate = `<div>
    <span class="message-hour">${generateDate()} </span>
    <span class="message-username">${data.username}:</span>  
    <span class="message-text">${data.message}</span>  
    </div>`;
    
    messages.innerHTML += htmlTemplate;
    console.log(messages.children)

    if (messages.children.length > 50) {
        messages.children[0].remove()
    }
}

export function displaySystemMessage(data) {
    const messages = document.getElementById("messages");

    const htmlTemplate = `<div>
        <span class="message-hour">${generateDate()}</span>
        <span class="message-text">${data.username} ${data.message}</span>  
    </div>`;
    const text = `${generateDate()} ${data.username} ${data.message}`

    messages.innerHTML += htmlTemplate
}
