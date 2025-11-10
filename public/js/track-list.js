export class TrackList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./public/vendor/bootstrap/css/bootstrap.min.css" />
      <style>
        ul { list-style: none; padding: 0; margin-top: 15px; }
        li {
          cursor: pointer;
          padding: 10px;
          border-bottom: 1px solid #555;
          transition: background 0.2s;
        }
        li:hover { background-color: #333; }
      </style>

      <h5 class="mt-3">Lista de Canciones</h5>
      <ul id="lista"></ul>
    `;
  }

  connectedCallback() {
    const canciones = [
      { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Tema 1", artista: "Mi Artista Favorito" },
      { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", titulo: "Tema 2", artista: "Mi Artista Favorito" },
      { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", titulo: "Tema 3", artista: "Mi Artista Favorito" },
    ];

    const lista = this.shadowRoot.querySelector("#lista");
    canciones.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = `${c.titulo} - ${c.artista}`;
      li.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("trackSelected", { detail: c, bubbles: true }));
      });
      lista.appendChild(li);
    });
  }
}

customElements.define("track-list", TrackList);
