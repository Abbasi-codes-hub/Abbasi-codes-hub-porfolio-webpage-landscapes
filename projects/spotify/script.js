// ========================
// Element Selectors
// ========================
const createPlaylistBtn = document.querySelector(".nav li:nth-child(4)");
const playlistsContainer = document.querySelector(".playlists ul");

const playBtn = document.querySelector('.play-btn');
const progressBar = document.querySelector('.bar');
const progress = document.querySelector('.progress');
const volumeBar = document.querySelector('.volume-bar');
const volumeLevel = document.querySelector('.volume-level');
const songTitle = document.querySelector('.song-details .title');
const songArtist = document.querySelector('.song-details .artist');
const songImg = document.querySelector('.song-info img');
const timeDisplay = document.querySelectorAll('.time');
const nextBtn = document.querySelector('.fa-step-forward').parentElement;
const prevBtn = document.querySelector('.fa-step-backward').parentElement;
alert("plese its just a demo of spotify web player not a real one\n just styling no logic javascript code")
const audio = new Audio();
let currentSong = 0;
let isPlaying = false;
let progressInterval;
let userPlaylist = [];

// ========================
// Built-in Songs
// ========================
const songs = [
    {
        title: "Happier Than Ever",
        artist: "Billie Eilish",
        cover: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        duration: "3:30",
        audio: "./songs/happier-than-ever (1).mp3"
    },
    {
        title: "Justice",
        artist: "Justin Bieber",
        cover: "https://i.scdn.co/image/ab67616d00001e02e6f407c7f3a0ec98845e4431",
        duration: "3:18",
        audio: "./songs/justice.mp3"
    },
    {
        title: "Planet Her",
        artist: "Doja Cat",
        cover: "https://i.scdn.co/image/ab67616d00001e02668e3aca3167e6e569a9aa20",
        duration: "3:28",
        audio: "./songs/planet-her.mp3"
    },
    {
        title: "Sour",
        artist: "Olivia Rodrigo",
        cover: "https://i.scdn.co/image/ab67616d00001e029ad3e9959f48d513886b8933",
        duration: "2:58",
        audio: "./songs/sour.mp3"
    }
];

// ========================
// Create Playlist Items
// ========================
function createSongItem(filePath, displayName, index = null) {
    const li = document.createElement("li");
    li.textContent = displayName;

    li.addEventListener("click", () => {
        if (index !== null) {
            currentSong = index;
            updatePlayer();
        } else {
            audio.src = filePath;
            audio.play();
            songTitle.textContent = displayName;
            songArtist.textContent = "Uploaded File";
            songImg.src = "https://cdn-icons-png.flaticon.com/512/727/727245.png";
        }
    });

    playlistsContainer.appendChild(li);
}

// Load built-in songs into playlist
songs.forEach((song, i) => {
    createSongItem(song.audio, song.title, i);
});

// ========================
// Player Controls
// ========================
function updatePlayer() {
    const song = songs[currentSong];
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songImg.src = song.cover;
    timeDisplay[1].textContent = song.duration;
    audio.src = song.audio;

    if (isPlaying) {
        audio.play();
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 0;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    timeDisplay[0].textContent = formatTime(currentTime);
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        clearInterval(progressInterval);
    } else {
        audio.play();
        progressInterval = setInterval(updateProgress, 1000);
    }

    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

function changeSong(direction) {
    currentSong = (currentSong + direction + songs.length) % songs.length;
    updatePlayer();
    if (isPlaying) audio.play();
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const volume = clickX / width;
    audio.volume = volume;
    volumeLevel.style.width = `${volume * 100}%`;
}

// ========================
// Event Listeners
// ========================
playBtn.addEventListener('click', togglePlay);
progressBar.addEventListener('click', setProgress);
volumeBar.addEventListener('click', setVolume);
nextBtn.addEventListener('click', () => changeSong(1));
prevBtn.addEventListener('click', () => changeSong(-1));

audio.addEventListener('ended', () => {
    changeSong(1);
});

// ========================
// File Upload (Custom Playlist)
// ========================
createPlaylistBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.multiple = true;
    input.style.display = "none";

    input.addEventListener("change", () => {
        const files = Array.from(input.files);
        files.forEach(file => {
            const url = URL.createObjectURL(file);
            userPlaylist.push({ name: file.name, src: url });
            createSongItem(url, file.name);
        });
    });

    document.body.appendChild(input);
    input.click();
});

// ========================
// Album / Playlist Cards
// ========================
document.querySelectorAll('.album-card, .playlist-card').forEach(card => {
    card.addEventListener('click', () => {
        alert(`Loading ${card.querySelector('.title').textContent}`);
    });
});

// ========================
// Theme Toggle
// ========================
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Initialize
updatePlayer();
