export class TrackList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .track-item {
          padding: 10px;
          border-bottom: 1px solid #555;
          cursor: pointer;
          transition: 0.25s;
          color: white;
        }

        .track-item:hover {
          background: #333;
        }
      </style>

      <h5 class="mt-3">Lista de Canciones</h5>
      <div id="lista"></div>
    `;
  }

  connectedCallback() {
    const base = window.location.origin;

    const canciones = [
      {
        src: `${base}/public/audio/MILO J - CARENCIAS DE CORDURA ft. Yami Safdie.mp3`,
        titulo: "Carencias de Cordura",
        artista: "Milo J ft. Yami Safdie",
      },
      {
        src: `${base}/public/audio/MILO J - OLIMPO.mp3`,
        titulo: "Olimpo",
        artista: "Milo J",
      },
      {
        src: `${base}/public/audio/Taiu, Milo J - Rara Vez.mp3`,
        titulo: "Rara Vez",
        artista: "Taiu, Milo J",
      },
    ];

    const lista = this.shadowRoot.querySelector("#lista");

    canciones.forEach((c) => {
      const item = document.createElement("div");
      item.className = "track-item";
      item.textContent = `${c.titulo} - ${c.artista}`;

      item.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("trackSelected", { detail: c, bubbles: true })
        );
      });

      lista.appendChild(item);
    });
  }
}

customElements.define("track-list", TrackList);
