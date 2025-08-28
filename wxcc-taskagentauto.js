// wxcc-taskagentauto.js

// Registramos el componente global con el mismo nombre que "comp" en DynamicArea
window['wxcc-taskagentauto'] = {
  init: (options) => {
    console.log('wxcc-taskagentauto init', options);

    // Obtenemos el módulo Contact Center desde el Desktop nativo
    const cc = window.Desktop?.cc;
    if (!cc) {
      console.error('Contact Center SDK no disponible en Desktop');
      return;
    }

    // Listener para tareas entrantes
    cc.on('task:incoming', (task) => {
      console.log('Incoming task:', task);

      // Ejemplo: aceptar la tarea automáticamente
      task.accept()
        .then(() => console.log('Task accepted automatically'))
        .catch(err => console.error('Error accepting task:', err));
    });

    // Listener para tareas hidratadas (reload o relogin)
    cc.on('task:hydrate', (task) => {
      console.log('Task hydrated:', task);
    });

    // Listener para tareas asignadas al agente
    cc.on('task:assigned', (task) => {
      console.log('Task assigned:', task.data.interactionId);
    });

    // Retornamos el objeto destroy() para cuando se cierre el widget
    return {
      destroy: () => {
        console.log('wxcc-taskagentauto destroyed');

        cc.off('task:incoming');
        cc.off('task:hydrate');
        cc.off('task:assigned');
      }
    };
  }
};
