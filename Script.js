// ⏰ Real-Time Clock Display
const realTime = document.getElementById('realTime');
setInterval(() => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  realTime.innerHTML = `${hours}:${minutes}`;
}, 1000);

// ⏳ Format seconds into mm:ss
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// 🎶 Jennie Ruby Jane Playlist
const playlist = [
  { title: "Like JENNIE", singer: "Jennie Ruby Jane", url: "audio/Like JENNIE.mp3" },
  { title: "Start a War", singer: "Jennie Ruby Jane", url: "audio/Start a war.mp3" },
  { title: "Twin", singer: "Jennie Ruby Jane", url: "audio/Twin.mp3" },
  { title: "Handlebars", singer: "Jennie Ruby Jane", url: "audio/Handlebars.mp3" },
  { title: "Seoul City", singer: "Jennie Ruby Jane", url: "audio/Seoul city.mp3" }
];

let currentIndex = 0;

// 📦 DOM Elements
const audio         = document.getElementById("audio");
const playBtn       = document.getElementById("playBtn");
const playIcon      = document.getElementById("playIcon");
const nextBtn       = document.getElementById("nextBtn");
const prevBtn       = document.getElementById("prevBtn");
const progressBar   = document.getElementById("progressBar");
const time          = document.getElementById("time");
const title         = document.getElementById("songTitle");
const singer        = document.getElementById("singerName");
const songImage     = document.getElementById("songImage");
const volumeSlider  = document.getElementById("volumeControl");
const songListDiv   = document.getElementById("songList");
const listBtn       = document.getElementById("list");
const wifiIcon      = document.getElementById("wifiIcon");
const btIcon        = document.getElementById("btIcon");

// 🔊 Volume Control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// 🌟 Highlight Active Song
function updateActiveSong() {
  const allItems = songListDiv.querySelectorAll("li");
  allItems.forEach(item => item.classList.remove("active"));
  if (allItems[currentIndex]) {
    allItems[currentIndex].classList.add("active");
  }
}

// 🚚 Load Song
function loadSong(index) {
  const song = playlist[index];
  audio.src = song.url;
  title.textContent = song.title;
  singer.textContent = song.singer;
  playIcon.setAttribute("name", "play-sharp");
  updateActiveSong();
}

// ▶️ / ⏸️ Play & Pause
function playPause() {
  if (audio.paused) {
    audio.play();
    playIcon.setAttribute("name", "pause");
    songImage.classList.add("rotating");
  } else {
    audio.pause();
    playIcon.setAttribute("name", "play-sharp");
    songImage.classList.remove("rotating");
  }
}
playBtn.addEventListener("click", playPause);

// ⏭️ Next Song
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  audio.play();
  playIcon.setAttribute("name", "pause");
  songImage.classList.add("rotating");
});

// ⏮️ Previous Song
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  audio.play();
  playIcon.setAttribute("name", "pause");
  songImage.classList.add("rotating");
});

// ⏱️ Metadata & Time Display
audio.addEventListener("loadedmetadata", () => {
  progressBar.max = audio.duration;
  time.textContent = `00:00 / ${formatTime(audio.duration)}`;
});
audio.addEventListener("timeupdate", () => {
  progressBar.value = audio.currentTime;
  time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

// 🕹️ Progress Bar Control
progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

// 🔁 Auto Play Next on End
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// 🚀 Load First Song on Page Load
loadSong(currentIndex);

// 📶 WiFi & Bluetooth Icons (Placeholder Alerts)
wifiIcon.addEventListener("click", () => {
  alert("Wi-Fi clicked! (You can add toggle logic here)");
});
btIcon.addEventListener("click", () => {
  alert("Bluetooth clicked! (You can add toggle logic here)");
});

// 📜 Toggle Song List
listBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  songListDiv.classList.toggle("visible");
});
document.addEventListener("click", (e) => {
  if (!songListDiv.contains(e.target) && e.target !== listBtn) {
    songListDiv.classList.remove("visible");
  }
});

// 🎧 Select Song from List
songListDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const index = parseInt(e.target.getAttribute("data-index"));
    currentIndex = index;
    loadSong(currentIndex);
    audio.play();
    playIcon.setAttribute("name", "pause");
    songImage.classList.add("rotating");
    songListDiv.classList.remove("visible");
  }
});
