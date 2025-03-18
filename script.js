let apps = [];
let usedApps = new Set();
const ageOptions = ["4+", "9+", "12+", "17+"];
let correctCount = 0;
let totalCount = 0;
let currentApp = null;
let hintVisible = false; // ヒントの表示状態

fetch("apps.json")
    .then(response => response.json())
    .then(data => {
        apps = data;
        totalCount = apps.length;
        showRandomApp();
    });

window.onload = function(){
    alert('App Storeに基づく年齢制限を当ててください。');
};

function showRandomApp() {
    if (usedApps.size === apps.length) {
        document.body.innerHTML = `<h1>${correctCount}/${totalCount} 正解！！</h1>`;
        return;
    }

    let remainingApps = apps.filter(app => !usedApps.has(app.name));
    currentApp = remainingApps[Math.floor(Math.random() * remainingApps.length)];

    usedApps.add(currentApp.name);
    document.getElementById("appName").textContent = currentApp.name;
    document.getElementById("appStoreLink").href = currentApp.app_store;
    document.getElementById("playStoreLink").href = currentApp.play_store;
    document.getElementById("result").textContent = "";

    // ヒントをリセット
    hintVisible = false;
    document.getElementById("hintText").textContent = "";
    document.getElementById("hintText").style.display = "none";

    // アイコン取得
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(currentApp.name)}&country=JP&entity=software&limit=1`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                document.getElementById("appIcon").src = data.results[0].artworkUrl100;
                document.getElementById("appIcon").style.display = "block";
                currentApp.description = data.results[0].description;
            }
        });

    // 選択肢の生成
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    ageOptions.forEach(age => {
        const btn = document.createElement("button");
        btn.textContent = age;
        btn.onclick = () => selectAnswer(age);
        choicesDiv.appendChild(btn);
    });
}

// 回答処理
function selectAnswer(age) {
    document.querySelectorAll("#choices button").forEach(btn => btn.disabled = true);
    if (age === currentApp.age) {
        document.getElementById("result").textContent = "正解！";
        correctCount++;
    } else {
        document.getElementById("result").textContent = `不正解！正しくは ${currentApp.age} 以上`;
    }
    setTimeout(showRandomApp, 2000);
}

// ヒントのトグル機能
document.getElementById("hintButton").addEventListener("click", () => {
    if (!currentApp.description) return;

    hintVisible = !hintVisible; // 状態を反転
    document.getElementById("hintText").textContent = hintVisible ? currentApp.description : "";
    document.getElementById("hintText").style.display = hintVisible ? "block" : "none";
});