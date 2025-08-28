(function () {
  class WxccTaskAgentAuto extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          .container {
            font-family: sans-serif;
            padding: 10px;
          }
          .log {
            font-size: 12px;
            background: #f4f4f4;
            border: 1px solid #ccc;
            padding: 8px;
            margin-top: 8px;
            max-height: 200px;
            overflow-y: auto;
          }
        </style>
        <div class="container">
          <h3>Task Agent Auto</h3>
          <div id="log" class="log"></div>
        </div>
      `;
    }

    connectedCallback() {
      this.log("Widget loaded ✅");

      if (!window.Desktop || !window.Desktop.cc) {
        this.log("❌ SDK no disponible: window.Desktop.cc no existe");
        return;
      }

      const cc = window.Desktop.cc;

      // Eventos de tareas
      cc.on("task:incoming", (task) => {
        this.log("📩 Incoming task: " + JSON.stringify(task.data));
        task.accept().then(() => this.log("✅ Task accepted"));
      });

      cc.on("task:hydrate", (task) => {
        this.log("♻️ Hydrate task: " + JSON.stringify(task.data));
      });

      cc.on("task:assigned", (task) => {
        this.log("🟢 Task assigned: " + task.data.interactionId);
      });
    }

    log(msg) {
      const logEl = this.shadowRoot.getElementById("log");
      logEl.innerHTML += `<div>${new Date().toISOString()} - ${msg}</div>`;
      logEl.scrollTop = logEl.scrollHeight;
    }
  }

  customElements.define("wxcc-taskagentauto", WxccTaskAgentAuto);
})();
