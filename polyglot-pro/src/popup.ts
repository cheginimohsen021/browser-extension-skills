const button = document.querySelector('#quick-translate');

button?.addEventListener('click', async () => {
  const response = await chrome.runtime.sendMessage({ type: 'PING' });
  if (response?.ok) {
    button.textContent = 'Ready';
  }
});
