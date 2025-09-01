class WxccTaskAgentAuto extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    console.log("✅ Widget wxcc-taskagentauto cargado");
    this.ensureSDK();
  }

  async ensureSDK() {
    // 1. Aseguramos cargar el SDK UMD si no está
    if (!window.WebexContactCenter) {
      console.log("⏳ Cargando SDK WxCC...");
      await this.loadScript("https://unpkg.com/@webex/contact-center@next/umd/contact-center.min.js");
    }

    // 2. Esperamos el objeto (polling)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const cc = window.Desktop?.cc || window.WebexContactCenter;
      if (cc) {
        clearInterval(interval);
        console.log("🎉 SDK disponible en", cc === window.Desktop?.cc ? "Desktop.cc" : "WebexContactCenter");
        this.init(cc);
      } else if (attempts > 100) { // 10s
        clearInterval(interval);
        console.error("❌ SDK no apareció después de 10s");
        this.shadowRoot.querySelector("#status").textContent =
          "❌ SDK no disponible (timeout)";
      }
    }, 100);
  }

  async loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.crossOrigin = "anonymous";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
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
        :host { display: block; font-family: Arial, sans-serif; padding: 8px; border: 1px solid #ccc; border-radius: 8px; background: #f9f9f9; }
        #status { font-weight: bold; margin-bottom: 6px; }
        #log { max-height: 200px; overflow-y: auto; font-size: 12px; background: #fff; border: 1px solid #ddd; padding: 4px; }
      </style>
      <div id="status">⏳ Esperando SDK...</div>
      <div id="log"></div>
    `;
  }
}

customElements.define("wxcc-taskagentauto", WxccTaskAgentAuto);
