// 1. CONFIGURATION PAR DÉFAUT (Modifiable via un fichier externe ou URL)
let config = {
    siteName: "Craftpick Instance",
    primaryColor: "#00d2ff",
    azuriomApi: "https://craftpick.fr/api",
    tokens: {
        google: "GOOGLE_CLIENT_ID",
        discord: "DISCORD_CLIENT_ID",
        github: "GITHUB_CLIENT_ID",
        gitlab: "GITLAB_CLIENT_ID"
    }
};

// 2. ANALYSE DE L'URL ET INITIALISATION
window.onload = async () => {
    const path = window.location.pathname.split('/').filter(p => p).pop();
    const siteID = path ? decodeURIComponent(path) : "Global";

    // Simuler le chargement d'une config spécifique au site
    // Dans une version avancée, on ferait : fetch(`/configs/${siteID}.json`)
    document.getElementById('site-name').innerText = siteID;
    document.getElementById('site-id').innerText = `Instance : ${siteID}.craftpick.fr`;

    // Générer QR Code (via API externe gratuite)
    const currentUrl = window.location.href;
    document.getElementById('qr-img').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`;

    document.getElementById('main-card').classList.remove('hidden');
};

// 3. FONCTION D'AUTH OAUTH2
function auth(provider) {
    const clientId = config.tokens[provider];
    const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
    
    let url = "";
    if(provider === 'discord') {
        url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=identify`;
    } else if(provider === 'google') {
        url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=profile email`;
    }
    
    if(clientId.includes("CLIENT_ID")) {
        alert(`Erreur : Le token ${provider} n'est pas configuré pour ce site.`);
    } else {
        window.location.href = url;
    }
}

// 4. CONNEXION AZURIOM
document.getElementById('az-form').onsubmit = async (e) => {
    e.preventDefault();
    const user = document.getElementById('az-user').value;
    const pass = document.getElementById('az-pass').value;

    document.getElementById('feedback').innerText = "Connexion à Azuriom...";
    
    // Exemple d'appel vers le CMS Azuriom
    try {
        const res = await fetch(`${config.azuriomApi}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email: user, password: pass })
        });
        const data = await res.json();
        alert("Réponse Azuriom reçue !");
    } catch (e) {
        alert("CORS Error : L'API Azuriom doit autoriser ce domaine.");
    }
};
