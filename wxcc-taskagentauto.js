class WxccTaskAgentAuto extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    console.log("✅ Widget wxcc-taskagentauto cargado");

    // Escuchar cuando el SDK esté listo
    if (window.Desktop && window.Desktop.onReady) {
      window.Desktop.onReady().then(() => {
        if (window.Desktop.cc) {
          console.log("🎉 SDK disponible via onReady");
          this.init(window.Desktop.cc);
        } else {
          console.error("❌ SDK sigue sin cc después de onReady");
          this.shadowRoot.querySelector("#status").textContent =
            "❌ SDK sin cc";
        }
      });
    } else {
      console.error("❌ window.Desktop.onReady no existe");
      this.shadowRoot.querySelector("#status").textContent =
        "❌ Desktop.onReady no existe";
    }
  }

  init(cc) {
    this.shadowRoot.querySelector("#status").textContent =
      "✅ SDK conectado";

    cc.on("task:incoming", (task) => {
      console.log("📩 Incoming task:", task);
      this.log(`Incoming task: ${task.data.interactionId}`);
    });

    cc.on("task:hydrate", (task) => {
      console.log("♻️ Hydrate task:", task);
      this.log(`Hydrate task: ${task.data.interactionId}`);
    });

    cc.on("task:assigned", (task) => {
      console.log("✅ Task accepted:", task.data.interactionId);
      this.log(`Task accepted: ${task.data.interactionId}`);
    });
  }

  log(msg) {
    const logBox = this.shadowRoot.querySelector("#log");
    const line = document.createElement("div");
    line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logBox.appendChild(line);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
          font-size: 14px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #f9f9f9;
        }
        #status {
          font-weight: bold;
          margin-bottom: 6px;
        }
        #log {
          max-height: 200px;
          overflow-y: auto;
          font-size: 12px;
          background: #fff;
          border: 1px solid #ddd;
          padding: 4px;
        }
      </style>
      <div id="status">⏳ Esperando SDK...</div>
      <div id="log"></div>
    `;
  }
}

customElements.define("wxcc-taskagentauto", WxccTaskAgentAuto);
