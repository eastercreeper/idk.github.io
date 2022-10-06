const form = document.querySelector('form');
const input = document.querySelector('input');

function save(){
    var checkbox = document.getElementById('cloak');
    localStorage.setItem('cloak', checkbox.checked);
}

function load(){
    var checked = JSON.parse(localStorage.getItem('cloak'));
    document.getElementById('cloak').checked = checked;
}

load();

function openFromURL(url) {
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then (() => {
        if (document.getElementById('cloak').checked) {
            var encoded_url = window.location.origin + __uv$config.prefix + __uv$config.encodeUrl(url);
            var w = open('about:blank', '_blank') || alert("It seems like you are blocking pop-ups. Please try again once you have allowed pop-ups.")
                    w.document.write(`<iframe style="height: 100%; width: 100%; border: none;" src="${encoded_url}" allowfullscreen></iframe>`)
                    w.document.body.style.margin = '0'
            load();
        } else {
                window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
                load();
        }
    });
}

function selectChange(){
    var select = document.getElementById('shortcuts');
    var value = select.options[select.selectedIndex].value;
    if (value === 'GeForce Now') {
        openFromURL('https://play.geforcenow.com/');
        document.getElementById("shortcuts").value = "Shortcuts:"
    } else if (value === "Roblox") {
        openFromURL('https://now.gg/play/roblox-corporation/5349/roblox');
        document.getElementById("shortcuts").value = "Shortcuts:"
    } else if (value === "Discord") {
        openFromURL('https://discord.com/');
        document.getElementById("shortcuts").value = "Shortcuts:"
    } else if (value === "Spotify") {
        openFromURL('https://open.spotify.com/');
        document.getElementById("shortcuts").value = "Shortcuts:"
    } else if (value === "YouTube") {
        openFromURL('https://youtube.com/');
        document.getElementById("shortcuts").value = "Shortcuts:"
    } else if (value === "Twitch") {
        openFromURL('https://twitch.tv/');
        document.getElementById("shortcuts").value = "Shortcuts:"
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

        if (document.getElementById('cloak').checked) {
                var encoded_url = window.location.origin + __uv$config.prefix + __uv$config.encodeUrl(url);
                var w = open('about:blank', '_blank') || alert("It seems like you are blocking pop-ups. Please try again once you have allowed pop-ups.")
                        w.document.write(`<iframe style="height: 100%; width: 100%; border: none;" src="${encoded_url}" allowfullscreen></iframe>`)
                        w.document.body.style.margin = '0'
                load();
        } else {
                window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
                load();
        }
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};
