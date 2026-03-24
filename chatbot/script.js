function enviar(){

let input = document.getElementById("input")
let chat = document.getElementById("chat")

let mensagem = input.value.trim()

if(mensagem=== "") return

chat.innerHTML += "<div class='user'>"+mensagem+"</div>"

chat.scrollTop = chat.scrollHeight

let resposta = responder(mensagem)

setTimeout(function(){
chat.innerHTML+= `
<div class="bot-message typing">
<img src="img/robot.png" class="avatar"/>
<div class="bot">digitando...</div>
</div>
`
chat.scrollTop = chat.scrollHeight

setTimeout(function(){

    document.querySelector(".typing").remove()

    chat.innerHTML+= `
    <div class="bot-message">
    <img src="img/robot.png" class="avatar">
    <div class="bot">${resposta}</div>
</div>
`

chat.scrollTop = chat.scrollHeight

},100)
},500)

input.value=""

}

function responder(msg){

msg = msg.toLowerCase()

if(
    msg.includes("oi") ||
    msg.includes("olá")||
    msg.includes("ola")||
    msg.includes("bom dia")||
    msg.includes("boa tarde")||
    msg.includes("boa noite")
){
return "Olá! Como posso ajudar?"
}

if(msg.includes("seu nome")){
return "Sou um chatbot feito em JavaScript."
}

if(msg.includes("html")){
return "HTML é a estrutura das páginas web."
}

return "Não entendi sua pergunta."
}
let input = document.getElementById("input")

input.addEventListener("keypress",function(event){

if(event.key === "Enter"){
    enviar()

}

})


