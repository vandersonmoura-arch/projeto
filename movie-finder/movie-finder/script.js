const API_KEY="2fc6503f"

const input=document.getElementById("movie-input")
const button=document.getElementById("search-button")
const container=document.getElementById("movies-container")
const status=document.getElementById("status-message")

const modal=document.getElementById("movie-modal")
const modalBody=document.getElementById("modal-body")
const closeModal=document.getElementById("close-modal")

button.addEventListener("click",searchMovies)

input.addEventListener("keypress",e=>{
if(e.key==="Enter") searchMovies()
})

closeModal.onclick=()=>{
modal.classList.remove("show")
}

function skeleton(){

container.innerHTML=""

for(let i=0;i<8;i++){

const div=document.createElement("div")
div.className="skeleton"

container.appendChild(div)

}

}

async function searchMovies(){

const query=input.value.trim()

if(!query){
status.textContent="Type a movie name"
return
}

skeleton()

status.textContent="Searching..."

try{

const res=await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)

const data=await res.json()

container.innerHTML=""

if(data.Response==="False"){

status.textContent="No movies found"
return

}

status.textContent=`${data.Search.length} movies found`

data.Search.forEach(movie=>{

const poster=movie.Poster==="N/A"
? "https://via.placeholder.com/300x450"
: movie.Poster

const card=document.createElement("article")

card.className="card"

card.innerHTML=`

<img loading="lazy" src="${poster}" alt="${movie.Title}">

<div class="card-content">
<h3>${movie.Title}</h3>
<p>${movie.Year}</p>
</div>

`

card.onclick=()=>openMovie(movie.imdbID)

container.appendChild(card)

setTimeout(()=>{
card.classList.add("show")
},80)

})

}catch{

status.textContent="API error"

}

}

async function openMovie(id){

modal.classList.add("show")

modalBody.innerHTML="Loading..."

try{

const res=await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)

const movie=await res.json()

const poster=movie.Poster==="N/A"
? "https://via.placeholder.com/300x450"
: movie.Poster

modalBody.innerHTML=`

<img src="${poster}">

<div class="modal-info">

<h2>${movie.Title}</h2>

<p><strong>Year:</strong> ${movie.Year}</p>

<p><strong>Genre:</strong> ${movie.Genre}</p>

<p><strong>IMDB:</strong> ⭐ ${movie.imdbRating}</p>

<p>${movie.Plot}</p>

</div>

`

}catch{

modalBody.innerHTML="Error loading movie"

}

}