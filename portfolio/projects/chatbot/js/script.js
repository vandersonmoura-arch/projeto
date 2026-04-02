const chat = document.getElementById("chat")
const form = document.getElementById("chat-form")
const input = document.getElementById("input")

let knowledgeBase = []

async function carregarConhecimento(){

const res = await fetch("data/knowledge.json")

const data = await res.json()

knowledgeBase = data.respostas

}

function appendMessage(text,type){

const msg = document.createElement("div")

msg.classList.add("message",type)

msg.textContent = text

chat.appendChild(msg)

chat.scrollTop = chat.scrollHeight

}

function respostaBot(text){

const pergunta = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

let resposta = null
let options = []

for(const item of knowledgeBase){

for(const keyword of item.keywords){

const chave = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

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

input.value=""

respostaBot(text)

})

function mostrarOpcoes(options){

if(!options.length) return

const container = document.createElement("div")

container.classList.add("suggestions")

options.forEach(text => {

const btn = document.createElement("button")

btn.classList.add("chip")

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

iniciarBot()