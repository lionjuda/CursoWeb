$(document).ready(function () {
    const movies = [
      {
        title: "Macha e o Urso: A Origem",
        genre: "Ação",
        poster: "img/s-|1200.jpg.png",
        description: "Marcha e seu fiel companheiro Urso enfrentam inimigos perigosos em sua primeira grande aventura.",
        year: 2021,
        cast: "Marcha, Urso e Oscar",
        rating: 8.5
      },
      // Adicione mais filmes aqui, se quiser
    ];
 
    function renderMovies(filter = "Todos", search = "") {
      $("#movie-gallery").empty();
      const lowerSearch = search.toLowerCase();
 
      const filteredMovies = movies.filter(movie =>
        (filter === "Todos" || movie.genre === filter) &&
        movie.title.toLowerCase().includes(lowerSearch)
      );
 
      if (filteredMovies.length === 0) {
        $("#movie-gallery").append("<p>Nenhum filme encontrado.</p>");
        return;
      }
 
      filteredMovies.forEach(movie => {
        const card = `
          <div class="card"
              data-title="${movie.title}"
              data-description="${movie.description}"
              data-year="${movie.year}"
              data-cast="${movie.cast}"
              data-rating="${movie.rating}"
              data-poster="${movie.poster}">
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
          </div>
        `;
        $("#movie-gallery").append(card);
      });
    }
 
    renderMovies();
 
    $(".filter-btn").click(function () {
      $(".filter-btn").removeClass("active");
      $(this).addClass("active");
      const genre = $(this).data("genre");
      renderMovies(genre, $("#search").val());
    });
 
    $("#search").on("input", function () {
      const genre = $(".filter-btn.active").data("genre") || "Todos";
      renderMovies(genre, $(this).val());
    });
 
    $("#clear-filters").click(function () {
      $("#search").val("");
      $(".filter-btn").removeClass("active");
      renderMovies("Todos");
    });
 
    $(document).on("click", ".card", function () {
      $("#modal-title").text($(this).data("title"));
      $("#modal-description").text($(this).data("description"));
      $("#modal-year").text($(this).data("year"));
      $("#modal-cast").text($(this).data("cast"));
      $("#modal-rating").text($(this).data("rating"));
      $("#modal-poster").attr("src", $(this).data("poster"));
      $("#movie-modal").fadeIn();
    });
 
    $(".close").click(function () {
      $("#movie-modal").fadeOut();
    });
  });