export class TrackInfo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./public/vendor/bootstrap/css/bootstrap.min.css" />
      <style>
        img {
          width: 260px;
          height: 260px;
          border-radius: 15px;
          object-fit: cover;
          margin-bottom: 20px;
          box-shadow: 0 0 18px rgba(0,0,0,0.5);
        }
        h5, p { margin: 0; }
        h5 {
          font-size: 1.4rem;
          margin-top: 10px;
        }
        p {
          opacity: 0.85;
        }
        #favBtn {
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.2s;
          opacity: 0.4;
        }
        #favBtn.active {
          opacity: 1;
          transform: scale(1.1);
        }
      </style>

      <div>
        <img id="cover" src="./public/img/carencias_de_cordura.jpg" alt="Portada">
        <h5 id="titulo">Selecciona una canción</h5>
        <p id="artista"></p>
        <button id="favBtn" title="Marcar como favorita">⭐</button>
      </div>
    `;

    this.favBtn = null;
    this.currentSrc = null;
  }

  connectedCallback() {
    this.favBtn = this.shadowRoot.querySelector("#favBtn");
  }

  // Actualiza la información de la canción y la lógica de favorito
  setInfo(titulo, artista, img, src) {
    this.currentSrc = src;

    this.shadowRoot.querySelector("#titulo").textContent = titulo;
    this.shadowRoot.querySelector("#artista").textContent = artista;
    this.shadowRoot.querySelector("#cover").src = img;

    const favBtn = this.favBtn;
    const favorite = localStorage.getItem("favoriteSong");

    // Estado visual de la estrella
    if (favorite === src) {
      favBtn.classList.add("active");
    } else {
      favBtn.classList.remove("active");
    }

    // Al hacer clic: toggle de favorita
    favBtn.onclick = () => {
      const currentFavorite = localStorage.getItem("favoriteSong");
      if (currentFavorite === src) {
        // Quitar favorita
        localStorage.removeItem("favoriteSong");
        favBtn.classList.remove("active");
      } else {
        // Marcar como favorita
        localStorage.setItem("favoriteSong", src);
        favBtn.classList.add("active");
      }
    };
  }
}

customElements.define("track-info", TrackInfo);
