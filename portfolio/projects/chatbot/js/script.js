const chat = document.getElementById("chat")
const form = document.getElementById("chat-form")
const input = document.getElementById("input")
const suggestionButtons = [...document.querySelectorAll(".chip")]

let knowledgeBase = []

const fallbackKnowledgeBase = [
{
keywords: ["quem e voce", "quem é você", "quem é voce", "quem é vc", "quem e vc"],
answer: "Sou um robô criado para ajudar a apresentar os projetos do portfólio."
},
{
keywords: ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "e ai", "hey"],
answer: "Olá! Em que posso ajudar?",
options: ["Projetos", "Orçamento"]
},
{
keywords: ["projeto", "projetos", "trabalho", "portfolio", "portfólio"],
answer: "Os principais projetos são Movie Finder e o Chatbot interativo."
},
{
keywords: ["o que voce faz", "o que você faz", "como funciona"],
answer: "Eu respondo perguntas rápidas sobre o portfólio e os projetos disponíveis.",
options: ["Projetos", "Orçamento"]
},
{
keywords: ["orçamento", "orcamento", "preço", "valor", "custo", "quanto custa"],
answer: "Posso ajudar com orçamento. Que tipo de projeto você precisa?"
}
]

async function carregarConhecimento(){
try{
const res = await fetch("data/knowledge.json")

if(!res.ok){
throw new Error("Falha ao carregar a base de conhecimento")
}

const data = await res.json()
knowledgeBase = data.respostas
}catch(error){
knowledgeBase = fallbackKnowledgeBase
}
}

function appendMessage(text,type){
const msg = document.createElement("div")
msg.classList.add("message",type)
msg.textContent = text
chat.appendChild(msg)
chat.scrollTop = chat.scrollHeight
}

function normalizarTexto(text){
return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function respostaBot(text){
const pergunta = normalizarTexto(text)

let resposta = null
let options = []

for(const item of knowledgeBase){
for(const keyword of item.keywords){
const chave = normalizarTexto(keyword)

if(pergunta.includes(chave)){
resposta = item.answer
options = item.options || []
break
}
}

if(resposta) break
}

if(!resposta){
resposta = "Desculpe, ainda não entendi. Você pode perguntar sobre projetos ou orçamento."
}

const typing = document.createElement("div")
typing.classList.add("message","bot")
typing.textContent = "Digitando..."
chat.appendChild(typing)

setTimeout(()=>{
typing.remove()
appendMessage(resposta,"bot")
mostrarOpcoes(options)
},700)
}

form.addEventListener("submit",(e)=>{
e.preventDefault()
const text = input.value.trim()

if(!text) return

appendMessage(text,"user")
input.value = ""
respostaBot(text)
})

function mostrarOpcoes(options){
if(!options.length) return

const container = document.createElement("div")
container.classList.add("suggestions")

options.forEach(text => {
const btn = document.createElement("button")
btn.classList.add("chip")
btn.type = "button"
btn.textContent = text
btn.onclick = () => {
appendMessage(text,"user")
respostaBot(text)
}
container.appendChild(btn)
})

chat.appendChild(container)
chat.scrollTop = chat.scrollHeight
}

async function iniciarBot(){
await carregarConhecimento()
appendMessage("Olá! Posso responder perguntas sobre o portfólio.","bot")
}

suggestionButtons.forEach(button => {
button.type = "button"
button.addEventListener("click", () => {
const text = button.textContent.trim()
appendMessage(text, "user")
respostaBot(text)
})
})

iniciarBot()
