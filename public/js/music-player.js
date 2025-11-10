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
        .player-card {
          background-color: #222;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(255,255,255,0.1);
        }
        audio { width: 100%; margin-top: 10px; }
      </style>

      <div class="player-card text-center">
        <track-info></track-info>
        <player-controls></player-controls>
        <audio id="audio"></audio>
        <track-list></track-list>
      </div>
    `;
  }

  connectedCallback() {
    const audio = this.shadowRoot.querySelector("#audio");
    const info = this.shadowRoot.querySelector("track-info");

    let currentIndex = 0;
    // 🎵 Lista de canciones con sus portadas individuales
    const tracks = [
      { 
        src: "./audio/cancion1.mp3", 
        titulo: "Tema 1", 
        artista: "Mi Artista Favorito",
        img: "./img/portada1.jpg"
      },
      { 
        src: "./audio/cancion2.mp3", 
        titulo: "Tema 2", 
        artista: "Mi Artista Favorito",
        img: "./img/portada2.jpg"
      },
      { 
        src: "./audio/cancion3.mp3", 
        titulo: "Tema 3", 
        artista: "Mi Artista Favorito",
        img: "./img/portada3.jpg"
      }
    ];

    // 🔹 Cargar la primera canción
    this.loadTrack(tracks[currentIndex], audio, info);

    // 🎵 Cuando se selecciona una canción de la lista
    this.shadowRoot.addEventListener("trackSelected", (e) => {
      const { src, titulo, artista, img } = e.detail;
      audio.src = src;
      audio.play();
      info.setInfo(titulo, artista, img);
      currentIndex = tracks.findIndex(t => t.src === src);
    });

    // 🎮 Escucha los eventos del componente de control
    this.shadowRoot.addEventListener("control", (e) => {
      const action = e.detail;
      if (action === "play") audio.play();
      if (action === "pause") audio.pause();
      if (action === "next") {
        currentIndex = (currentIndex + 1) % tracks.length;
        this.loadTrack(tracks[currentIndex], audio, info);
        audio.play();
      }
      if (action === "prev") {
        currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        this.loadTrack(tracks[currentIndex], audio, info);
        audio.play();
      }
    });
  }

  // 🧩 Cargar la canción y actualizar la portada
  loadTrack(track, audio, info) {
    audio.src = track.src;
    info.setInfo(track.titulo, track.artista, track.img);
  }
}

customElements.define("music-player", MusicPlayer);
