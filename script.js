/* =========================
   ELEMENTS
========================= */

const playPauseBtn =
document.getElementById("playPauseBtn");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

const repeatBtn =
document.getElementById("repeatBtn");

const shuffleBtn =
document.getElementById("shuffleBtn");

const favBtn =
document.getElementById("favBtn");

const progressBar =
document.getElementById("progressBar");

const currentTimeEl =
document.getElementById("currentTime");

const durationEl =
document.getElementById("duration");

const coverImg =
document.getElementById("music-cover-img");

const titleEl =
document.getElementById("music-title");

const artistEl =
document.getElementById("music-artist");

const playlistEl =
document.getElementById("playlist");

const totalSongsEl =
document.getElementById("totalSongs");

const totalDurationEl =
document.getElementById("totalDuration");

const searchInput =
document.getElementById("searchInput");

const searchBox =
document.getElementById("searchBox");

const albumView =
document.getElementById("albumView");

const settingsPanel =
document.getElementById("settingsPanel");

/* SETTINGS */

const themeToggle =
document.getElementById("themeToggle");

const blurRange =
document.getElementById("blurRange");

const coverSize =
document.getElementById("coverSize");

const animToggle =
document.getElementById("animToggle");

/* =========================
   SONGS
========================= */

const songs = [

{ src: 'https://ar-hosting.pages.dev/1779700322878.mp3', title: 'Multo', artist: 'Cup of Joe', cover: 'https://ar-hosting.pages.dev/1779700550396.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779700954815.mp3', title: 'Risk it all', artist: 'Bruno mars', cover: 'https://ar-hosting.pages.dev/1779701431309.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779701025681.mp3', title: 'Kita', artist: 'Sheila on 7', cover: 'https://ar-hosting.pages.dev/1779701430706.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779701024884.mp3', title: 'Tampar', artist: 'Juicy Luicy', cover: 'https://ar-hosting.pages.dev/1779701432075.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779703128228.mp3', title: 'Bila kau tak di sampingku', artist: 'Sheila on 7', cover: 'https://ar-hosting.pages.dev/1779703231978.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779704561140.mp3', title: 'Akad', artist: 'Payung teduh', cover: 'https://ar-hosting.pages.dev/1779704547192.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779706280293.mp3', title: 'Aku milikmu', artist: 'Dewa 19', cover: 'https://ar-hosting.pages.dev/1779706295487.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779711078982.mp3', title: 'Sorai', artist: 'Nadin Amizah', cover: 'https://ar-hosting.pages.dev/1779711079561.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779711361498.mp3', title: 'Kembali pulang', artist: 'Suara kayu', cover: 'https://ar-hosting.pages.dev/1779711414995.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779711485381.mp3', title: 'Monolog', artist: 'Pamungkas', cover: 'https://ar-hosting.pages.dev/1779711457347.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779712916271.mp3', title: 'Sampai jadi debu', artist: 'Bandaneira', cover: 'https://ar-hosting.pages.dev/1779712896839.jpg', dur: 180 },
  { src: 'https://ar-hosting.pages.dev/1779713316714.mp3', title: 'Bertaut', artist: 'Nadin Amizah', cover: 'https://ar-hosting.pages.dev/1779713251632.jpg', dur: 180 },
];

/* =========================
   AUDIO
========================= */

const audio = new Audio();

audio.src = songs[0].src;

/* =========================
   STATE
========================= */

let currentIndex = 0;

let isPlaying = false;

let repeatMode = false;

let shuffleMode = false;

let favorites = [];

/* =========================
   HELPERS
========================= */

function formatTime(sec){

  if(!sec || isNaN(sec))
  return "0:00";

  const min =
  Math.floor(sec / 60);

  const seconds =
  Math.floor(sec % 60);

  return `${min}:${
    seconds < 10
    ? "0"
    : ""
  }${seconds}`;

}

/* =========================
   PLAY ICONS
========================= */

const playSvg = `

<svg
viewBox="0 0 24 24"
width="26"
height="26">

<path
d="M5 3v18l15-9L5 3z"
fill="currentColor"/>

</svg>

`;

const pauseSvg = `

<svg
viewBox="0 0 24 24"
width="26"
height="26">

<path
d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
fill="currentColor"/>

</svg>

`;

function setPlayIcon(state){

  playPauseBtn.innerHTML =
  state
  ? pauseSvg
  : playSvg;

}

/* =========================
   LOAD SONG
========================= */

function loadSong(index){

  const song = songs[index];

  audio.src = song.src;

  coverImg.src = song.cover;

  titleEl.textContent =
  song.title;

  artistEl.textContent =
  song.artist;

  durationEl.textContent =
  formatTime(song.dur);

  refreshPlaylist();

}

/* =========================
   PLAY SONG
========================= */

function playSong(){

  audio.play();

  isPlaying = true;

  setPlayIcon(true);

}

/* =========================
   PAUSE SONG
========================= */

function pauseSong(){

  audio.pause();

  isPlaying = false;

  setPlayIcon(false);

}

/* =========================
   NEXT SONG
========================= */

function nextSong(){

  if(shuffleMode){

    currentIndex =
    Math.floor(
      Math.random() * songs.length
    );

  } else {

    currentIndex++;

    if(currentIndex >= songs.length){

      currentIndex = 0;

    }

  }

  loadSong(currentIndex);

  playSong();

}

/* =========================
   PREV SONG
========================= */

function prevSong(){

  currentIndex--;

  if(currentIndex < 0){

    currentIndex =
    songs.length - 1;

  }

  loadSong(currentIndex);

  playSong();

}

/* =========================
   PLAYLIST
========================= */

function renderPlaylist(){

  playlistEl.innerHTML = "";

  songs.forEach((song,index)=>{

    const li =
    document.createElement("li");

    li.className =
    "playlist-item";

    if(index === currentIndex){

      li.classList.add("active");

    }

    li.innerHTML = `

      <img
      class="thumb"
      src="${song.cover}">

      <div class="meta">

        <div class="title">
          ${song.title}
        </div>

        <div class="artist">
          ${song.artist}
        </div>

      </div>

    `;

    li.addEventListener(
      "click",
      ()=>{

        currentIndex = index;

        loadSong(currentIndex);

        playSong();

      }
    );

    playlistEl.appendChild(li);

  });

  totalSongsEl.textContent =
  `${songs.length} songs`;

  let total = 0;

  songs.forEach(song=>{

    total += song.dur;

  });

  totalDurationEl.textContent =
  formatTime(total);

}

function refreshPlaylist(){

  document
  .querySelectorAll(".playlist-item")
  .forEach(item=>{

    item.classList.remove("active");

  });

  const active =
  document.querySelectorAll(
    ".playlist-item"
  )[currentIndex];

  if(active){

    active.classList.add("active");

  }

}

/* =========================
   FAVORITE
========================= */

favBtn.addEventListener(
"click",
()=>{

  if(
    favorites.includes(currentIndex)
  ){

    favorites =
    favorites.filter(
      i => i !== currentIndex
    );

    favBtn.style.color =
    "#ff8db1";

  } else {

    favorites.push(currentIndex);

    favBtn.style.color =
    "#ff4f87";

  }

});

/* =========================
   PROGRESS
========================= */

audio.addEventListener(
"timeupdate",
()=>{

  currentTimeEl.textContent =
  formatTime(audio.currentTime);

  const progress =
  (
    audio.currentTime /
    audio.duration
  ) * 100;

  progressBar.value =
  progress || 0;

});

progressBar.addEventListener(
"input",
()=>{

  audio.currentTime =
  (
    progressBar.value / 100
  ) * audio.duration;

});

/* =========================
   ENDED
========================= */

audio.addEventListener(
"ended",
()=>{

  if(repeatMode){

    audio.currentTime = 0;

    playSong();

  } else {

    nextSong();

  }

});

/* =========================
   BUTTONS
========================= */

playPauseBtn.addEventListener(
"click",
()=>{

  if(isPlaying){

    pauseSong();

  } else {

    playSong();

  }

});

nextBtn.addEventListener(
"click",
nextSong
);

prevBtn.addEventListener(
"click",
prevSong
);

/* REPEAT */

repeatBtn.addEventListener(
"click",
()=>{

  repeatMode =
  !repeatMode;

  repeatBtn.classList.toggle(
    "active-mode"
  );

});

/* SHUFFLE */

shuffleBtn.addEventListener(
"click",
()=>{

  shuffleMode =
  !shuffleMode;

  shuffleBtn.classList.toggle(
    "active-mode"
  );

});

/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
"input",
e=>{

  const value =
  e.target.value.toLowerCase();

  const items =
  document.querySelectorAll(
    ".playlist-item"
  );

  items.forEach((item,index)=>{

    const song = songs[index];

    const match =

    song.title
    .toLowerCase()
    .includes(value)

    ||

    song.artist
    .toLowerCase()
    .includes(value);

    item.style.display =
    match
    ? "flex"
    : "none";

  });

});

/* =========================
   SIDEBAR NAV
========================= */

document
.querySelectorAll(".nav-item")
.forEach(item=>{

  item.addEventListener(
  "click",
  ()=>{

    document
    .querySelectorAll(".nav-item")
    .forEach(nav=>{

      nav.classList.remove("active");

    });

    item.classList.add("active");

    const key =
    item.dataset.key;

    searchBox.classList.add(
      "is-hidden"
    );

    albumView.classList.add(
      "is-hidden"
    );

    settingsPanel.classList.add(
      "is-hidden"
    );

    playlistEl.style.display =
    "flex";

    if(key === "search"){

      searchBox.classList.remove(
        "is-hidden"
      );

    }

    if(key === "album"){

      albumView.classList.remove(
        "is-hidden"
      );

      playlistEl.style.display =
      "none";

    }

    if(key === "settings"){

      settingsPanel.classList.remove(
        "is-hidden"
      );

      playlistEl.style.display =
      "none";

    }

    if(key === "fav"){

      const items =
      document.querySelectorAll(
        ".playlist-item"
      );

      items.forEach((item,index)=>{

        item.style.display =
        favorites.includes(index)
        ? "flex"
        : "none";

      });

    } else {

      document
      .querySelectorAll(
        ".playlist-item"
      )
      .forEach(item=>{

        item.style.display =
        "flex";

      });

    }

  });

});

/* =========================
   SETTINGS
========================= */

/* DARK MODE */

themeToggle.addEventListener(
"change",
()=>{

  if(themeToggle.checked){

    document.body.classList.add(
      "dark-mode"
    );

  } else {

    document.body.classList.remove(
      "dark-mode"
    );

  }

});

/* BLUR */

blurRange.addEventListener(
"input",
()=>{

  document.documentElement
  .style.setProperty(
    "--glass-blur",
    blurRange.value + "px"
  );

});

/* COVER SIZE */

coverSize.addEventListener(
"input",
()=>{

  document.querySelector(
    ".cover-wrap"
  ).style.width =
  coverSize.value + "px";

  document.querySelector(
    ".cover-wrap"
  ).style.height =
  coverSize.value + "px";

});

/* ANIMATION */

animToggle.addEventListener(
"change",
()=>{

  if(animToggle.checked){

    document.body.classList.remove(
      "no-anim"
    );

  } else {

    document.body.classList.add(
      "no-anim"
    );

  }

});

/* =========================
   KEYBOARD SHORTCUT
========================= */

window.addEventListener(
"keydown",
e=>{

  if(e.code === "Space"){

    e.preventDefault();

    playPauseBtn.click();

  }

  if(e.code === "ArrowRight"){

    nextBtn.click();

  }

  if(e.code === "ArrowLeft"){

    prevBtn.click();

  }

});

/* =========================
   INIT
========================= */

loadSong(currentIndex);

renderPlaylist();

setPlayIcon(false);

currentTimeEl.textContent =
"0:00";
