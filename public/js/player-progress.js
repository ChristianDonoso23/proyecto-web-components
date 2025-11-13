export class PlayerProgress extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .progress-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 15px 0;
          width: 100%;
          color: #FADCD5; /* texto claro */
          font-size: 0.9rem;
        }

        .progress-bar {
          position: relative;
          flex: 1;
          height: 8px;
          background: #4B2138;         /* violeta oscuro (tu paleta) */
          border-radius: 10px;
          cursor: pointer;
          overflow: hidden;
        }

        .progress-filled {
          height: 100%;
          width: 0%;
          background: #6D3C52;         /* violeta profundo */
          border-radius: 10px;
          transition: width 0.1s linear;
        }
      </style>

      <div class="progress-container">
        <span id="current">0:00</span>

        <div class="progress-bar" id="bar">
          <div class="progress-filled" id="filled"></div>
        </div>

        <span id="total">0:00</span>
      </div>
    `;
  }

  connectedCallback() {
    this.bar = this.shadowRoot.querySelector("#bar");
    this.filled = this.shadowRoot.querySelector("#filled");
    this.currentLabel = this.shadowRoot.querySelector("#current");
    this.totalLabel = this.shadowRoot.querySelector("#total");

    this.bar.addEventListener("click", (e) => {
      const rect = this.bar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      this.dispatchEvent(
        new CustomEvent("seek", { detail: percent, bubbles: true })
      );
    });
  }

  update(current, total) {
    if (!total || total === Infinity) return;

    const percent = (current / total) * 100;
    this.filled.style.width = `${percent}%`;

    this.currentLabel.textContent = this.formatTime(current);
    this.totalLabel.textContent = this.formatTime(total);
  }

  formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = "0" + sec;
    return `${min}:${sec}`;
  }
}

customElements.define("player-progress", PlayerProgress);
