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
          gap: 50px;
          background-color: #222;
          padding: 50px 60px;
          border-radius: 15px;
          box-shadow: 0 0 10px rgba(255,255,255,0.1);
          justify-content: center;  /* CENTRA TODO */
          align-items: flex-start;  /* Alinea arriba */
        }


        .left-panel {
          flex: 1;
          min-width: 250px;
          text-align: center;
          color: white;
        }

        .right-panel {
          flex: 1;
          min-width: 350px;
          max-width: 500px;
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
    const controls = this.shadowRoot.querySelector("player-controls");

    const base = window.location.origin;

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
      {
        src: `${base}/public/audio/Milo J - Ama de Mi Sol.mp3`,
        titulo: "Ama de Mi Sol",
        artista: "Milo J",
        img: `${base}/public/img/la_vida_era_mas_corta.jpg`,
      },
      {
        src: `${base}/public/audio/Milo J, Silvio Rodríguez - Luciérnagas.mp3`,
        titulo: "Luciérnagas",
        artista: "Milo J, Silvio Rodríguez",
        img: `${base}/public/img/la_vida_era_mas_corta.jpg`,
      },
      {
        src: `${base}/public/audio/Milo J - Solifican12.mp3`,
        titulo: "Solifican12",
        artista: "Milo J",
        img: `${base}/public/img/la_vida_era_mas_corta.jpg`,
      },
      {
        src: `${base}/public/audio/Milo J - Recordé.mp3`,
        titulo: "Recordé",
        artista: "Milo J",
        img: `${base}/public/img/la_vida_era_mas_corta.jpg`,
      }
    ];

    let currentIndex = 0;

    const favSrc = localStorage.getItem("favoriteSong");
    if (favSrc) {
      const favTrack = tracks.find(t => t.src === favSrc);
      if (favTrack) currentIndex = tracks.indexOf(favTrack);
    }

    loadCurrentTrack();

    function loadCurrentTrack() {
      const track = tracks[currentIndex];
      audio.src = track.src;
      info.setInfo(track.titulo, track.artista, track.img);
      updateFavoriteUI();
    }

    function updateFavoriteUI() {
      const fav = localStorage.getItem("favoriteSong");
      controls.setFavoriteState(fav === tracks[currentIndex].src);
    }

    this.shadowRoot.addEventListener("trackSelected", (e) => {
      const track = tracks.find((t) => t.src === e.detail.src);
      currentIndex = tracks.indexOf(track);
      loadCurrentTrack();
      audio.play();
    });

    this.shadowRoot.addEventListener("control", (e) => {
      const action = e.detail.action;

      if (action === "play") audio.play();
      if (action === "pause") audio.pause();

      if (action === "next") {
        currentIndex = (currentIndex + 1) % tracks.length;
        loadCurrentTrack();
        audio.play();
      }

      if (action === "prev") {
        currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        loadCurrentTrack();
        audio.play();
      }

      if (action === "favorite") {
        const current = tracks[currentIndex].src;
        const saved = localStorage.getItem("favoriteSong");

        if (saved === current) {
          localStorage.removeItem("favoriteSong");
        } else {
          localStorage.setItem("favoriteSong", current);
        }

        updateFavoriteUI();
      }
    });
  }
}

customElements.define("music-player", MusicPlayer);
