window.onload = function() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('ユーザーがインストールを承諾しました');
        } else {
          console.log('ユーザーがインストールを拒否しました');
        }
        deferredPrompt = null;
      });
    }
  }