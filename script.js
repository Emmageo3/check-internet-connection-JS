const popup = document.querySelector(".notification"),
wifiIcon = document.querySelector(".wifi-icon i"),
popupTitle = document.querySelector(".notification .title"),
popupDesc = document.querySelector(".desc"),
reconnectBtn = document.querySelector(".reconnect-btn");
let isOnline = true, intervalId, timer = 10;
const checkConnection = async () => {
    try {
        // Essayer de recuperer des données d'une API. SI le statut est compris entre 200 et 300 alors la connexion est bonne
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOnline = false; // S'il y'a une erreur, on considere que la connexion n'est pas disponible
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}
const handlePopup = (status) => {
    if(status) { // si le statut est true (online), mettre a jour l'icone, le titre, la description
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Connexion rétablie";
        popupDesc.innerHTML = "Vous êtes connecté à internet.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }
    //si le statut est false mettre a jour les memes elements
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Connexion perdue";
    popupDesc.innerHTML = "Connexion indisponible. Nous tenterons de vous reconnecter dans <b>10</b> secondes.";
    popup.className = "popup show";
    intervalId = setInterval(() => { // mettre en place un intervalle d'une seconde
        timer--;
        if(timer === 0) checkConnection(); // si le temps arrive a à, checker la connexion
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}

setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);