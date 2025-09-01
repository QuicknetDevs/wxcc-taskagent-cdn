// wxcc-taskagentauto.js

console.log("📦 Iniciando carga del widget wxcc-taskagentauto...");

(function () {
  class WxccTaskAgentAuto extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
      this.initSdk();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .card {
            font-family: Arial, sans-serif;
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            background: #fff;
          }
          .status {
            margin-top: 0.5rem;
            font-size: 0.9rem;
            color: #444;
          }
        </style>
        <div class="card">
          <h3>🚀 WxCC Task Agent Auto</h3>
          <div id="status" class="status">⏳ Cargando SDK...</div>
          <div id="agent" class="status"></div>
        </div>
      `;
    }

    async initSdk() {
      const statusEl = this.shadowRoot.getElementById("status");
      const agentEl = this.shadowRoot.getElementById("agent");

      if (!window.WebexContactCenter) {
        console.error("❌ SDK no disponible: window.WebexContactCenter no existe");
        statusEl.textContent = "❌ SDK no disponible";
        return;
      }

      try {
        console.log("✅ SDK encontrado, inicializando...");
        const sdk = window.WebexContactCenter.init(); // importante

        statusEl.textContent = "✅ SDK inicializado";

        // obtener información del agente
        const agent = await sdk.agent.getAgent();
        console.log("🙋‍♂️ Agente:", agent);

        agentEl.textContent = `👤 ${agent.firstName} ${agent.lastName} (ID: ${agent.agentId})`;

      } catch (err) {
        console.error("❌ Error al inicializar SDK:", err);
        statusEl.textContent = "❌ Error al inicializar SDK";
      }
    }
  }

  customElements.define("wxcc-taskagentauto", WxccTaskAgentAuto);
  console.log("✅ Widget wxcc-taskagentauto registrado");
})();
