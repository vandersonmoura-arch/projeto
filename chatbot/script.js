const chat = document.getElementById("chat");
const input = document.getElementById("input");
const form = document.getElementById("chat-form");
const suggestionChips = document.querySelectorAll(".suggestion-chip");

function createMessageRow(content, type) {
    const row = document.createElement("div");
    row.className = `message-row ${type}-row`;

    if (type === "bot") {
        const wrapper = document.createElement("div");
        wrapper.className = "bot-message";

        const avatar = document.createElement("img");
        avatar.src = "./img/robot.png";
        avatar.className = "avatar";
        avatar.alt = "Avatar do robo";

        const message = document.createElement("div");
        message.className = "message bot";
        message.textContent = content;

        wrapper.append(avatar, message);
        row.appendChild(wrapper);
        return row;
    }

    const message = document.createElement("div");
    message.className = "message user";
    message.textContent = content;
    row.appendChild(message);

    return row;
}

function appendMessage(content, type) {
    const row = createMessageRow(content, type);
    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
    return row;
}

function normalizeText(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function responder(message) {
    const normalizedMessage = normalizeText(message);

    if (
        normalizedMessage.includes("oi") ||
        normalizedMessage.includes("ola") ||
        normalizedMessage.includes("bom dia") ||
        normalizedMessage.includes("boa tarde") ||
        normalizedMessage.includes("boa noite")
    ) {
        return "Ola! Como posso ajudar?";
    }

    if (normalizedMessage.includes("seu nome")) {
        return "Sou o chatbot do Vanderson, feito em JavaScript.";
    }

    if (normalizedMessage.includes("html")) {
        return "HTML e a linguagem que estrutura o conteudo das paginas web.";
    }

    if (normalizedMessage.includes("css")) {
        return "CSS e usado para estilizar e organizar a aparencia da interface.";
    }

    if (normalizedMessage.includes("javascript")) {
        return "JavaScript adiciona comportamento e interatividade a pagina.";
    }

    return "Ainda nao entendi essa pergunta. Tente falar sobre HTML, CSS, JavaScript ou cumprimente o bot.";
}

function enviar() {
    const message = input.value.trim();

    if (!message) {
        input.focus();
        return;
    }

    appendMessage(message, "user");
    input.value = "";

    const typingRow = appendMessage("Digitando...", "bot");
    typingRow.classList.add("typing");

    const resposta = responder(message);

    setTimeout(() => {
        typingRow.remove();
        appendMessage(resposta, "bot");
    }, 700);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    enviar();
});

suggestionChips.forEach((chip) => {
    chip.addEventListener("click", () => {
        input.value = chip.dataset.message || "";
        input.focus();
    });
});

appendMessage("Ola! Eu sou seu chatbot de estudos. Pergunte algo sobre HTML, CSS ou JavaScript.", "bot");
