const input = document.getElementById("movie-input");
const button = document.getElementById("search-button");
const container = document.querySelector(".movies-container");
const statusMessage = document.getElementById("status-message");

function setStatus(message) {
    statusMessage.textContent = message;
}

function createMovieCard(movie) {
    const card = document.createElement("article");
    card.className = "card";

    const image = document.createElement("img");
    image.src = movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/200x300?text=No+Poster";
    image.alt = `Poster of ${movie.Title}`;

    const content = document.createElement("div");
    content.className = "card-content";

    const tag = document.createElement("span");
    tag.className = "card-tag";
    tag.textContent = "Result";

    const title = document.createElement("h3");
    title.textContent = movie.Title;

    const year = document.createElement("p");
    year.textContent = movie.Year;

    content.append(tag, title, year);
    card.append(image, content);
    return card;
}

function renderEmptyState(message) {
    container.innerHTML = "";

    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = message;

    container.appendChild(emptyState);
}

async function searchMovies() {
    const query = input.value.trim();

    if (!query) {
        setStatus("Type a movie name before searching.");
        input.focus();
        return;
    }

    setStatus(`Searching for "${query}"...`);
    button.disabled = true;
    button.textContent = "Loading...";

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=2fc6503f`);
        const data = await response.json();

        if (data.Response === "False" || !Array.isArray(data.Search)) {
            renderEmptyState("No movies found for this search.");
            setStatus(`No results found for "${query}".`);
            return;
        }

        container.innerHTML = "";
        data.Search.forEach((movie) => {
            container.appendChild(createMovieCard(movie));
        });

        setStatus(`${data.Search.length} result(s) found for "${query}".`);
    } catch (error) {
        renderEmptyState("Could not load movies right now. Please try again.");
        setStatus("Request failed. Check your connection and try again.");
        console.error(error);
    } finally {
        button.disabled = false;
        button.textContent = "Search";
    }
}

button.addEventListener("click", searchMovies);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchMovies();
    }
});
