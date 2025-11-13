export class TrackList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .header {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          margin-bottom: 10px;
          color: #fadcd5;
          font-size: 0.9rem;
          border-bottom: 1px solid #4b2138;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          transition: 0.25s;
        }

        .row:hover {
          background: #6d3c52;
        }

        .num {
          width: 30px;
          text-align: center;
          opacity: 0.7;
          color: #fadcd5;
        }

        .title {
          flex: 1;
          margin-left: 10px;
          font-weight: 500;
          color: #fadcd5;
        }

        .duration {
          width: 60px;
          text-align: right;
          opacity: 0.8;
          color: #fadcd5;
        }
      </style>

      <h5 class="mt-3">Lista de Canciones</h5>

      <div class="header">
        <span style="margin-left: 20px;">#</span>
        <span style="flex: 1; margin-left: 10px;">Título</span>
        <span>Duración</span>
      </div>

      <div id="lista"></div>
    `;
  }

  connectedCallback() {
    const base = window.location.origin;

    const canciones = [
      {
        src: `${base}/public/audio/MILO J - CARENCIAS DE CORDURA ft. Yami Safdie.mp3`,
        titulo: "Carencias de Cordura"
      },
      {
        src: `${base}/public/audio/MILO J - OLIMPO.mp3`,
        titulo: "Olimpo"
      },
      {
        src: `${base}/public/audio/Taiu, Milo J - Rara Vez.mp3`,
        titulo: "Rara Vez"
      },
      {
        src: `${base}/public/audio/Milo J - Ama de Mi Sol.mp3`,
        titulo: "Ama de Mi Sol"
      },
      {
        src: `${base}/public/audio/Milo J, Silvio Rodríguez - Luciérnagas.mp3`,
        titulo: "Luciérnagas"
      },
      {
        src: `${base}/public/audio/Milo J - Solifican12.mp3`,
        titulo: "Solifican12"
      }
    ];

    const lista = this.shadowRoot.querySelector("#lista");

    /* Generar filas */
    canciones.forEach((c, index) => {
      const row = document.createElement("div");
      row.className = "row";

      row.innerHTML = `
        <span class="num">${index + 1}</span>
        <span class="title">${c.titulo}</span>
        <span class="duration" id="d${index}">--:--</span>
      `;

      /* Obtener duración */
      this.obtenerDuracion(c.src, (dur) => {
        this.shadowRoot.querySelector(`#d${index}`).textContent = dur;
      });

      /* Evento de selección */
      row.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("trackSelected", { detail: c, bubbles: true }));
      });

      lista.appendChild(row);
    });
  }

  /* Función para obtener la duración de una pista */
  obtenerDuracion(src, callback) {
    const audio = new Audio(src);

    audio.addEventListener("loadedmetadata", () => {
      let min = Math.floor(audio.duration / 60);
      let sec = Math.floor(audio.duration % 60);
      if (sec < 10) sec = "0" + sec;
      callback(`${min}:${sec}`);
    });
  }
}

customElements.define("track-list", TrackList);
