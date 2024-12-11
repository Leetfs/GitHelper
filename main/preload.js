const { contextBridge, shell, ipcRenderer } = require('electron');

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

// 使用 contextBridge 暴露 API
contextBridge.exposeInMainWorld('api', {
  openUrl: (url) => ipcRenderer.send('open-external', url)
});

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // 除函数之外，我们也可以暴露变量
  })

contextBridge.exposeInMainWorld('gitConfig', {
  updateConfig: async (username, email) => {
    return await ipcRenderer.invoke('update-git-config', { username, email });
  },
});