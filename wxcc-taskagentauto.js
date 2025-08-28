// wxcc-taskagentauto.js
(function() {
  const container = document.createElement('div');
  container.id = 'task-agent-container';
  container.innerHTML = `
    <h2>Task Agent Auto</h2>
    <div id="status">Ready...</div>
    <button id="end-task-btn" style="display:none;">End Task</button>
    <audio id="remote-audio" autoplay></audio>
  `;
  document.body.appendChild(container);

  const webex = window.webex; // ya existe en Desktop Agent

  let currentTask = null;

  webex.cc.on('task:incoming', async (task) => {
    currentTask = task;
    document.getElementById('status').textContent = 'Incoming task: ' + task.data.interactionId;
    await task.accept();
    document.getElementById('end-task-btn').style.display = 'inline-block';
  });

  document.getElementById('end-task-btn').addEventListener('click', async () => {
    if (currentTask) {
      await currentTask.end();
      currentTask = null;
      document.getElementById('end-task-btn').style.display = 'none';
      document.getElementById('status').textContent = 'Task ended';
    }
  });

})();
