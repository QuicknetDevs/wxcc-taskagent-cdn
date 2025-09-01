(function () {
  console.log("📦 Iniciando carga del widget wxcc-taskagentauto...");

  // Nombre del componente
  const COMPONENT_NAME = "wxcc-taskagentauto";

  // Registrar el custom element
  class WxccTaskAgentAuto extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          .widget {
            font-family: Arial, sans-serif;
            padding: 12px;
          }
          .title {
            font-weight: bold;
            color: #0066cc;
          }
          .status {
            margin-top: 8px;
            color: #333;
          }
        </style>
        <div class="widget">
          <div class="title">🚀 WxCC Task Agent Auto</div>
          <div class="status" id="status">⏳ Cargando SDK...</div>
        </div>
      `;

      this.init();
    }

    async init() {
      const statusEl = this.shadowRoot.getElementById("status");

      try {
        // Verifica si el SDK ya está disponible
        if (!window.WebexContactCenter) {
          console.log("ℹ️ SDK no encontrado. Cargando desde CDN...");
          statusEl.textContent = "Descargando SDK desde CDN...";

          await this.loadSdk(
            "https://unpkg.com/@webex/contact-center@next/umd/contact-center.min.js"
          );
        }

        if (window.WebexContactCenter) {
          console.log("✅ SDK disponible:", window.WebexContactCenter);
          statusEl.textContent = "✅ SDK cargado correctamente";
        } else {
          console.error("❌ No se pudo inicializar el SDK");
          statusEl.textContent = "❌ SDK no disponible";
        }
      } catch (err) {
        console.error("❌ Error cargando SDK:", err);
        statusEl.textContent = "❌ Error cargando SDK";
      }
    }

    loadSdk(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
  }

  if (!customElements.get(COMPONENT_NAME)) {
    customElements.define(COMPONENT_NAME, WxccTaskAgentAuto);
    console.log(`✅ Widget ${COMPONENT_NAME} registrado`);
  } else {
    console.warn(`⚠️ Widget ${COMPONENT_NAME} ya estaba registrado`);
  }
})();
