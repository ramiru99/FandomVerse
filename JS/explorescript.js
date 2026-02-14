const extraImages = {
  "all-merch-grid": [
    { src: "RSC/IMGS/ANIME.jpeg", link: "anime.html" },
    { src: "RSC/IMGS/Main.png", link: "main.html" },
    { src: "RSC/IMGS/MOVIE.avif", link: "movies.html" },
    { src: "RSC/IMGS/POSTER.jpg", link: "poster.html" },
    { src: "RSC/IMGS/Figure.jpg", link: "figure.html" }
  ],
  "popular-anime-grid": [
    { src: "RSC/IMGS/ANIME.jpeg", link: "anime.html" },
    { src: "RSC/IMGS/Main.png", link: "main.html" },
    { src: "RSC/IMGS/MOVIE.avif", link: "movies.html" },
    { src: "RSC/IMGS/POSTER.jpg", link: "poster.html" },
    { src: "RSC/IMGS/Figure.jpg", link: "figure.html" }
  ],
  "popular-games-grid": [
    { src: "RSC/IMGS/ANIME.jpeg", link: "games.html" },
    { src: "RSC/IMGS/Main.png", link: "main.html" },
    { src: "RSC/IMGS/MOVIE.avif", link: "movies.html" },
    { src: "RSC/IMGS/POSTER.jpg", link: "poster.html" },
    { src: "RSC/IMGS/Figure.jpg", link: "figure.html" }
  ],
  "popular-movies-grid": [
    { src: "RSC/IMGS/ANIME.jpeg", link: "anime.html" },
    { src: "RSC/IMGS/Main.png", link: "main.html" },
    { src: "RSC/IMGS/MOVIE.avif", link: "movies.html" },
    { src: "RSC/IMGS/POSTER.jpg", link: "poster.html" },
    { src: "RSC/IMGS/Figure.jpg", link: "figure.html" }
  ]
};

document.querySelectorAll(".load-more").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const grid = document.getElementById(targetId);

    if (extraImages[targetId] && extraImages[targetId].length > 0) {
      extraImages[targetId].splice(0, 5).forEach(item => {

        // Create link
        const link = document.createElement("a");
        link.href = item.link;
        link.classList.add("explore-link");

        // Create image box
        const box = document.createElement("div");
        box.classList.add("box", "slide-in");

        box.innerHTML = `<img src="${item.src}" alt="Image">`;

        // Wrap box with link
        link.appendChild(box);

        // Insert before arrow button
        const arrowBox = button.parentElement;
        grid.insertBefore(link, arrowBox);

        // Trigger animation
        requestAnimationFrame(() => {
          box.classList.remove("slide-in");
        });
      });
    } else {
      button.disabled = true;
      button.textContent = "✅";
    }
  });
});