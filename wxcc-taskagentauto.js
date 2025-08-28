// wxcc-taskagentauto.js

// Asegúrate de que Webex esté disponible desde CDN (solo si quieres un SDK independiente)
// <script src="https://unpkg.com/@webex/contact-center@next/umd/contact-center.min.js"></script>

window['wxcc-taskagentauto'] = {
  init: (options) => {
    console.log('wxcc-taskagentauto init', options);

    // Usar el SDK ya cargado por Desktop
    const cc = window.Desktop?.cc;
    if (!cc) {
      console.error('Contact Center SDK no disponible en Desktop');
      return;
    }

    cc.on('task:incoming', (task) => {
      console.log('Incoming task:', task);
      task.accept().then(() => console.log('Task accepted'));
    });

    cc.on('task:hydrate', (task) => {
      console.log('Task hydrated:', task);
    });

    cc.on('task:assigned', (task) => {
      console.log('Task assigned:', task.data.interactionId);
    });

    return {
      destroy: () => {
        cc.off('task:incoming');
        cc.off('task:hydrate');
        cc.off('task:assigned');
        console.log('wxcc-taskagentauto destroyed');
      }
    };
  }
};

