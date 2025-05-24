  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // 自動表示をブロック
    deferredPrompt = e;
    document.getElementById('installBtn').style.display = 'block'; // ボタン表示
  });

  document.getElementById('installBtn').addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // プロンプトを表示
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('ユーザーがインストールを承諾しました');
        } else {
          console.log('ユーザーがインストールを拒否しました');
        }
        deferredPrompt = null;
      });
    }
  });