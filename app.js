/**
 * The discog link element.
 */
let a = null;

/**
 * The discog search link.
 */
let discogsLink = "";

/**
 * The class for the button when there isn't a link loaded.
 */
let inactiveClass = "inactive";

/**
 * The currently playing album.
 */
let currentAlbum = {
    album: null,
    artist: null
};

/**
 * Load event listener for window
 */
window.addEventListener("load", _init);

/**
 * Initializer function.
 */
function _init() {
    setTimeout(() => _buildButton(), 10000);
    setInterval(() => this._checkCurrentAlbum(), 1000);
}

function _buildButton() {
    a = document.createElement('a');
    a.classList.add("discogs-link");
    a.classList.add(inactiveClass);
    a.appendChild(document.createTextNode("Discogs Search"));
    let forwardElement = document.getElementById('player-bar-forward');
    forwardElement.parentNode.insertBefore(a, forwardElement.nextSibling);
}

/**
 * Checks the currently playing album.
 */
function _checkCurrentAlbum() {
    let albumElement = document.getElementsByClassName("player-album"); // google play's element for current playing album
    let artistElement = document.getElementById("player-artist"); // google play's element for current playing artist
    let albumName = albumElement.length ? albumElement[0].innerHTML : currentAlbum.album;
    let artist = artistElement ? artistElement.innerHTML : currentAlbum.artist;

    if (albumName !== currentAlbum.album) {
        currentAlbum = {
            album: albumName,
            artist: artist
        };
        this._buildDiscogsLink(currentAlbum);
    }
}

/**
 * Builds the discogs link for display
 * @param {album} the album 
 */
function _buildDiscogsLink(album) {
    discogsLink = "https://www.discogs.com/search/?q=" + album.artist + "+" +
        album.album;
    a.classList.remove(inactiveClass);
    a.href = discogsLink.replace(/\s/g, '+');
}