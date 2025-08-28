// wxcc-taskagentauto.js

class WxccTaskAgentAuto extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    console.log("✅ Widget wxcc-taskagentauto cargado");

    // Verificar que el SDK está disponible
    if (!window.Desktop || !window.Desktop.cc) {
      console.error("❌ SDK no disponible: window.Desktop.cc no existe");
      this.shadowRoot.querySelector("#status").textContent =
        "❌ SDK no disponible";
      return;
    }

    const cc = window.Desktop.cc;

    // Escuchar eventos de tareas
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
