<script src="https://unpkg.com/@webex/contact-center@next/umd/contact-center.min.js"></script>
<script>
  const webex = window.Webex.init({
    config: {
      plugin: { allowMultiLogin: false }
    }
  });

  webex.once("ready", () => {
    console.log("✅ Webex SDK listo");
  });

  // Eventos de tareas
  webex.cc.on("task:incoming", (task) => {
    console.log("📩 Incoming task", task);
    task.accept().then(() => console.log("✅ Task accepted"));
  });

  webex.cc.on("task:hydrate", (task) => {
    console.log("♻️ Hydrate task", task);
  });

  webex.cc.on("task:assigned", (task) => {
    console.log("🟢 Task assigned", task.data.interactionId);
  });
</script>
