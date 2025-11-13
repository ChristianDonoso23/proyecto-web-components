import { TrackList } from "./track-list.js";
import { TrackInfo } from "./track-info.js";
import { PlayerControls } from "./player-control.js";

export class MusicPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./public/vendor/bootstrap/css/bootstrap.min.css" />
      <style>
        .player-container {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          background-color: #222;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 0 10px rgba(255,255,255,0.1);
        }

        .left-panel {
          flex: 1;
          min-width: 250px;
          text-align: center;
          color: white;
        }

        .right-panel {
          flex: 1;
          min-width: 250px;
          color: white;
        }

        audio {
          width: 100%;
          margin-top: 15px;
        }
      </style>

      <div class="player-container">
        <div class="left-panel">
          <track-info></track-info>
          <player-controls></player-controls>
          <audio id="audio"></audio>
        </div>

        <div class="right-panel">
          <track-list></track-list>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const audio = this.shadowRoot.querySelector("#audio");
    const info = this.shadowRoot.querySelector("track-info");

    const base = window.location.origin;

    // Lista única de canciones (mismas rutas que en track-list.js)
    const tracks = [
      {
        src: `${base}/public/audio/MILO J - CARENCIAS DE CORDURA ft. Yami Safdie.mp3`,
        titulo: "Carencias de Cordura",
        artista: "Milo J ft. Yami Safdie",
        img: `${base}/public/img/carencias_de_cordura.jpg`,
      },
      {
        src: `${base}/public/audio/MILO J - OLIMPO.mp3`,
        titulo: "Olimpo",
        artista: "Milo J",
        img: `${base}/public/img/olimpo.jpg`,
      },
      {
        src: `${base}/public/audio/Taiu, Milo J - Rara Vez.mp3`,
        titulo: "Rara Vez",
        artista: "Taiu, Milo J",
        img: `${base}/public/img/rara_vez.jpg`,
      },
    ];

    let currentIndex = 0;

    // 🔹 Si hay favorita en localStorage, la mostramos primero
    const favoriteSrc = localStorage.getItem("favoriteSong");
    if (favoriteSrc) {
      const favTrack = tracks.find((t) => t.src === favoriteSrc);
      if (favTrack) {
        currentIndex = tracks.indexOf(favTrack);
      }
    }

    // Cargar pista inicial (favorita o primera)
    this.loadTrack(tracks[currentIndex], audio, info);

    // 🔹 Al seleccionar desde la lista
    this.shadowRoot.addEventListener("trackSelected", (e) => {
      const track = tracks.find((t) => t.src === e.detail.src) || e.detail;

      this.loadTrack(track, audio, info);
      audio.play();
      currentIndex = tracks.indexOf(track);
    });

    // 🔹 Controles básicos (play / pause / next / prev)
    this.shadowRoot.addEventListener("control", (e) => {
      const action = e.detail;

      if (action === "play") audio.play();
      if (action === "pause") audio.pause();

      if (action === "next") {
        currentIndex = (currentIndex + 1) % tracks.length;
        const t = tracks[currentIndex];
        this.loadTrack(t, audio, info);
        audio.play();
      }

      if (action === "prev") {
        currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        const t = tracks[currentIndex];
        this.loadTrack(t, audio, info);
        audio.play();
      }
    });
  }

  // Cargar pista y actualizar info (incluye src para favorita)
  loadTrack(track, audio, info) {
    audio.src = track.src;
    info.setInfo(track.titulo, track.artista, track.img, track.src);
  }
}

customElements.define("music-player", MusicPlayer);
