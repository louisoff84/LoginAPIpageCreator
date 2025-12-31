// --- INITIALISATION ---
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get('theme') || 'theme-dark';
const pathParts = window.location.pathname.split('/');
const siteName = decodeURIComponent(pathParts[pathParts.length - 1]) || "CraftPick";

// Appliquer le visuel
document.getElementById('app-body').className = theme;
document.getElementById('display-name').innerText = siteName;

// Générer QR Code dynamique basé sur l'URL actuelle
const qrImg = document.getElementById('qr-img');
qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}`;

// --- GESTION DES CLICS OAUTH ---
const oauthConfigs = {
    discord: { id: "CLIENT_ID_ICI", url: "https://discord.com/api/oauth2/authorize" },
    google: { id: "CLIENT_ID_ICI", url: "https://accounts.google.com/o/oauth2/v2/auth" }
};

function startAuth(provider) {
    const config = oauthConfigs[provider];
    if (!config) return alert("Méthode non configurée.");
    
    const redirect = encodeURIComponent(window.location.origin + window.location.pathname);
    window.location.href = `${config.url}?client_id=${config.id}&redirect_uri=${redirect}&response_type=token&scope=identify`;
}

// Assigner les boutons
document.querySelector('.dsc').onclick = () => startAuth('discord');
document.querySelector('.ggl').onclick = () => startAuth('google');

// --- LOGIQUE AZURIOM ---
document.getElementById('az-login').onsubmit = async (e) => {
    e.preventDefault();
    const user = document.getElementById('az-user').value;
    const pass = document.getElementById('az-pass').value;

    console.log(`Tentative Azuriom pour ${siteName}...`);
    // Simulation d'appel API
    alert(`Azuriom : Connexion de ${user} sur l'instance ${siteName}`);
};
