export class TrackInfo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./public/vendor/bootstrap/css/bootstrap.min.css" />
      <style>
        img {
          width: 200px;
          height: 200px;
          border-radius: 10px;
          object-fit: cover;
          margin-bottom: 10px;
        }
        h5, p { margin: 0; }
      </style>

      <div>
        <img id="cover" src="./img/portada1.jpg" alt="Portada">
        <h5 id="titulo">Selecciona una canción</h5>
        <p id="artista"></p>
      </div>
    `;
  }

  // 🔹 Actualiza la información de la canción
  setInfo(titulo, artista, img) {
    this.shadowRoot.querySelector("#titulo").textContent = titulo;
    this.shadowRoot.querySelector("#artista").textContent = artista;
    this.shadowRoot.querySelector("#cover").src = img;
  }
}

customElements.define("track-info", TrackInfo);
