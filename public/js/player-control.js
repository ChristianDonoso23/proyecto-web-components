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
          gap: 20px;
          margin: 15px 0;
        }
        button {
          background: none;
          border: none;
          color: white;
          font-size: 1.8rem;
          cursor: pointer;
          transition: 0.2s;
        }
        button:hover {
          transform: scale(1.1);
          color: #3cc31aff;
        }
      </style>

      <div class="controls">
        <button id="prev"><i class="bi bi-skip-start-fill"></i></button>
        <button id="play"><i class="bi bi-play-fill"></i></button>
        <button id="pause"><i class="bi bi-pause-fill"></i></button>
        <button id="next"><i class="bi bi-skip-end-fill"></i></button>
      </div>

    `;
  }

  connectedCallback() {
    const emit = (action) =>
      this.dispatchEvent(new CustomEvent("control", { detail: action, bubbles: true }));

    this.shadowRoot.getElementById("play").onclick = () => emit("play");
    this.shadowRoot.getElementById("pause").onclick = () => emit("pause");
    this.shadowRoot.getElementById("next").onclick = () => emit("next");
    this.shadowRoot.getElementById("prev").onclick = () => emit("prev");
  }
}

customElements.define("player-controls", PlayerControls);
