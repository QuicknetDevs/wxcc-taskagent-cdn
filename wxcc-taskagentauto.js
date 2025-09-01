(function () {
  class WxccTaskAgentAuto extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
      this.initDesktopSdk();
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
          <div id="status" class="status">⏳ Esperando Desktop SDK...</div>
          <div id="agent" class="status"></div>
        </div>
      `;
    }

    async initDesktopSdk() {
      const statusEl = this.shadowRoot.getElementById("status");
      const agentEl = this.shadowRoot.getElementById("agent");

      if (!window.Desktop) {
        console.error("❌ Desktop SDK no disponible");
        statusEl.textContent = "❌ Desktop SDK no disponible";
        return;
      }

      try {
        console.log("✅ Desktop SDK encontrado");
        statusEl.textContent = "✅ Desktop SDK disponible";

        // obtener datos del agente
        const agentId = await window.Desktop.agent.getAgentId();
        const agentName = await window.Desktop.agent.getDisplayName();

        console.log("🙋‍♂️ Agente:", agentId, agentName);
        agentEl.textContent = `👤 ${agentName} (ID: ${agentId})`;

      } catch (err) {
        console.error("❌ Error usando Desktop SDK:", err);
        statusEl.textContent = "❌ Error leyendo datos del agente";
      }
    }
  }

  customElements.define("wxcc-taskagentauto", WxccTaskAgentAuto);
  console.log("✅ Widget wxcc-taskagentauto registrado");
})();
