export class PlayerControls extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./public/vendor/bootstrap/css/bootstrap.min.css" />
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
          color: #ffc107;
        }
      </style>

      <div class="controls">
        <button id="prev">⏮️</button>
        <button id="play">▶️</button>
        <button id="pause">⏸️</button>
        <button id="next">⏭️</button>
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
