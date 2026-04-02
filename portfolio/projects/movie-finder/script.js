const apiKey = "thewdb"

const input = document.getElementById("searchInput")
const yearFilter = document.getElementById("yearFilter")
const button = document.getElementById("searchBtn")

const resultados = document.getElementById("resultados")
const detalhes = document.getElementById("detalhes")
const favoritosLista = document.getElementById("favoritosLista")

const prevPage = document.getElementById("prevPage")
const nextPage = document.getElementById("nextPage")
const pageInfo = document.getElementById("pageInfo")

let paginaAtual = 1
let buscaAtual = ""

button.addEventListener("click", ()=>{
paginaAtual = 1
buscarFilme()
})

input.addEventListener("keypress", e=>{
if(e.key==="Enter"){
paginaAtual=1
buscarFilme()
}
})

prevPage.onclick=()=>{
if(paginaAtual>1){
paginaAtual--
buscarFilme()
}
}

nextPage.onclick=()=>{
paginaAtual++
buscarFilme()
}

function debounce(fn, delay){

let timer

return (...args)=>{

clearTimeout(timer)

timer=setTimeout(()=>{
fn(...args)
},delay)

}

}

input.addEventListener("input", debounce(()=>{
paginaAtual=1
buscarFilme()
},600))

function getFavoritos(){
return JSON.parse(localStorage.getItem("favoritos")) || []
}

function salvarFavoritos(lista){
localStorage.setItem("favoritos",JSON.stringify(lista))
}

function toggleFavorito(filme){

let favoritos=getFavoritos()

const existe=favoritos.find(f=>f.imdbID===filme.imdbID)

if(existe){

favoritos=favoritos.filter(f=>f.imdbID!==filme.imdbID)

}else{

favoritos.push(filme)

}

salvarFavoritos(favoritos)

renderFavoritos()

}

function renderFavoritos(){

const favoritos=getFavoritos()

favoritosLista.innerHTML=""

favoritos.forEach(filme=>{

const card=document.createElement("div")

card.classList.add("movie")

card.innerHTML=`
<img src="${filme.Poster}">
<h3>${filme.Title}</h3>
<p>${filme.Year}</p>
<button>Remover</button>
`

card.querySelector("button").onclick=()=>toggleFavorito(filme)

card.onclick=()=>mostrarDetalhes(filme.imdbID)

favoritosLista.appendChild(card)

})

}

async function buscarFilme(){

const nome=input.value

if(!nome){
resultados.innerHTML="Digite algo para buscar"
return
}

buscaAtual=nome

resultados.innerHTML="Buscando..."

const ano=yearFilter.value

let url=`https://www.omdbapi.com/?s=${nome}&page=${paginaAtual}&apikey=${apiKey}`

if(ano){
url+=`&y=${ano}`
}

try{

const resposta=await fetch(url)

const dados=await resposta.json()

if(!dados.Search){

resultados.innerHTML="Nenhum resultado encontrado"

return

}

renderFilmes(dados.Search)

pageInfo.textContent=`Página ${paginaAtual}`

}catch(error){

resultados.innerHTML="Erro ao buscar filmes"

}

}

function renderFilmes(lista){

resultados.innerHTML=""

lista.forEach(filme=>{

const card=document.createElement("div")

card.classList.add("movie")

card.innerHTML=`
<img src="${filme.Poster}">
<h3>${filme.Title}</h3>
<p>${filme.Year}</p>
<button>⭐ Favoritar</button>
`

card.querySelector("button").onclick=(e)=>{

e.stopPropagation()

toggleFavorito(filme)

}

card.onclick=()=>mostrarDetalhes(filme.imdbID)

resultados.appendChild(card)

})

}

async function mostrarDetalhes(id){

const url=`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`

const resposta=await fetch(url)

const filme=await resposta.json()

detalhes.innerHTML=`

<div class="detalhes-content">

<h2>${filme.Title}</h2>

<img src="${filme.Poster}" style="width:200px">

<p><b>Ano:</b> ${filme.Year}</p>

<p><b>Gênero:</b> ${filme.Genre}</p>

<p><b>Diretor:</b> ${filme.Director}</p>

<p><b>IMDB:</b> ${filme.imdbRating}</p>

<p>${filme.Plot}</p>

<button onclick="fecharDetalhes()">Fechar</button>

</div>

`

detalhes.classList.remove("hidden")

}

function fecharDetalhes(){

detalhes.classList.add("hidden")

}

renderFavoritos()