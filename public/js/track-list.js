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
    // MISMA LISTA QUE EN music-player.js
    const canciones = [
      {
        src: "/public/audio/MILO J - CARENCIAS DE CORDURA ft. Yami Safdie.mp3",
        titulo: "Carencias de Cordura",
        artista: "Milo J ft. Yami Safdie",
        img: "./public/img/carencias_de_cordura.jpg",
      },
      {
        src: "/public/audio/MILO J - OLIMPO.mp3",
        titulo: "Olimpo",
        artista: "Milo J",
        img: "./public/img/olimpo.jpg",
      },
      {
        src: "/public/audio/Taiu, Milo J - Rara Vez.mp3",
        titulo: "Rara Vez",
        artista: "Taiu, Milo J",
        img: "/public/img/rara_vez.jpg",
      },
    ];

    const lista = this.shadowRoot.querySelector("#lista");

    canciones.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = `${c.titulo} - ${c.artista}`;
      li.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("trackSelected", { detail: c, bubbles: true })
        );
      });
      lista.appendChild(li);
    });
  }
}

customElements.define("track-list", TrackList);
