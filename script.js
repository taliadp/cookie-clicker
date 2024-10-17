let cookieCount = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0;
let upgradeCost = 50;
let upgradeCount = 0;

function updateDisplay(){
    document.getElementById('cookieCount').textContent = "Cookies: " + Math.floor(cookieCount);
    document.getElementById('upgradeMessage').textContent = "Upgrades: " + Math.floor(upgradeCount);
    document.getElementById('upgradeButton').textContent = " Buy Upgrade (Cost: "+ Math.floor(upgradeCost) + "Cookies)";

}



function saveGameState(){
    localStorage.setItem('cookieCount',cookieCount);
    localStorage.setItem('upgradeCount',upgradeCount);
    localStorage.setItem('upgradeCost',upgradeCost);
    localStorage.setItem('cookiesPerSecond',cookiesPerSecond);
}

function loadGameState(){
    const saveCookieCount = localStorage.getItem('cookieCount');
    const saveupgradeCount = localStorage.getItem('upgradeCount');
    const saveupgradeCost = localStorage.getItem('upgradeCost');
    const savecookiesPerSecond = localStorage.getItem('cookiesPerSecond');

    if (saveCookieCount !== null){
        cookieCount = parseFloat(saveCookieCount);
    }
    if (saveupgradeCount !== null){
        upgradeCount = parseFloat(saveupgradeCount);
    }
    if (saveupgradeCost !== null){
        upgradeCost = parseFloat(saveupgradeCost);
    }
    if (savecookiesPerSecond !== null){
        cookiesPerSecond = parseFloat(savecookiesPerSecond);
    }
    updateDisplay();

}











document.getElementById('cookie').addEventListener('click',function(){
    cookieCount += cookiesPerClick;
    updateDisplay();
    saveGameState();
    if (cookieCount >= upgradeCost) {
        document.getElementById('upgradeButton').disabled = false;


    }

});

document.getElementById('upgradeButton').addEventListener('click',function(){
    if (cookieCount >= upgradeCost) {
        cookieCount -= upgradeCost;
        upgradeCount++;
        cookiesPerSecond++;
        upgradeCost *= 1.4;
        updateDisplay();
        saveGameState();
        confetti({
            particleCount: 100,
            spread: 70,
            orgin: {y: 0.6}
        });
    };
    if(cookieCount < upgradeCost){
        document.getElementById('upgradeButton').disabled = true;
    }
  
});
setInterval(function(){
cookieCount+=cookiesPerSecond;
updateDisplay();
saveGameState();
}, 1000);

window.onload = function(){
    loadGameState();
};