const { contextBridge, shell } = ('electron');
const information = document.getElementById('info')
document.getElementById('install-git-btn').addEventListener('click', () => {
    const url = 'https://git-scm.com/downloads'; // 这里替换为你想要打开的链接
    window.api.openUrl(url); // 调用 API 打开链接
});
document.getElementById('star').addEventListener('click', () => {
    const url = 'https://github.com/Leetfs/git-helper'; // 这里替换为你想要打开的链接
    window.api.openUrl(url); // 调用 API 打开链接
});

// 处理 git 指令
document.getElementById('gitForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    try {
      const result = await window.gitConfig.updateConfig(username, email);
      document.getElementById('result').innerText = result;
    } catch (error) {
      document.getElementById('result').innerText = `错误: ${error}`;
    }
});

information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`