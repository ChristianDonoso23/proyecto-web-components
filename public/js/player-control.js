export class PlayerControls extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./public/vendor/bootstrap/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

      <style>
        .controls {
          display: flex;
          justify-content: center;
          gap: 22px;
          margin: 20px 0;
          align-items: center;
        }

        button {
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          transition: 0.25s;
        }

        button:hover {
          transform: scale(1.18);
          color: #3cc31aff;
        }

        .fav.active i {
          color: #3cc31aff;
          transform: scale(1.2);
        }
      </style>

      <div class="controls">
        <button id="prev"><i class="bi bi-skip-start-fill"></i></button>
        <button id="play"><i class="bi bi-play-fill"></i></button>
        <button id="pause"><i class="bi bi-pause-fill"></i></button>
        <button id="next"><i class="bi bi-skip-end-fill"></i></button>
        <button id="fav" class="fav"><i class="bi bi-suit-heart"></i></button>
      </div>
    `;
  }

  connectedCallback() {
    const emit = (action) =>
      this.dispatchEvent(
        new CustomEvent("control", { detail: { action }, bubbles: true })
      );

    this.shadowRoot.getElementById("play").onclick = () => emit("play");
    this.shadowRoot.getElementById("pause").onclick = () => emit("pause");
    this.shadowRoot.getElementById("next").onclick = () => emit("next");
    this.shadowRoot.getElementById("prev").onclick = () => emit("prev");
    this.shadowRoot.getElementById("fav").onclick = () => emit("favorite");
  }

  setFavoriteState(isFav) {
    const favBtn = this.shadowRoot.querySelector("#fav");
    const icon = favBtn.querySelector("i");

    if (isFav) {
      favBtn.classList.add("active");
      icon.classList.remove("bi-suit-heart");
      icon.classList.add("bi-suit-heart-fill");
    } else {
      favBtn.classList.remove("active");
      icon.classList.remove("bi-suit-heart-fill");
      icon.classList.add("bi-suit-heart");
    }
  }
}

customElements.define("player-controls", PlayerControls);
