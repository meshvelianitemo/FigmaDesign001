const URL =
  "https://raw.githubusercontent.com/lomsadze123/movie-api/refs/heads/main/data.json";

const container = document.getElementById("tv-series");
fetch(URL)
  .then((response) => response.json())
  .then((movies) => {
    movies.forEach((movie) => {
      const filmCard = `
                <div class="movie-card">
                    <img src="${movie.thumbnail.regular.medium}" class="film-picture" alt="${movie.title}">
                    <div class="description">
                        <p>${movie.year}</P>
                        <img src="assets/dot.svg" alt="" class="dot" />
                        <img src="assets/nav3.svg" alt="" class="" /> 
                        <P>${movie.category} </P>
                        <img src="assets/dot.svg" alt="" class="dot" />
                        <P>${movie.rating}</p>
                        <h2>${movie.title}</h2>
                    </div>
                </div>
            `;
      container.innerHTML += filmCard;
    });
  })
  .catch((error) => console.error("Error loading movie data:", error));
