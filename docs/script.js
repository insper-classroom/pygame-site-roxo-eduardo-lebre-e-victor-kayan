const chapters = [
  { time: 0, label: "Central: escolha um minigame apontando a mão." },
  { time: 2.1, label: "Pong: mova as raquetes com gestos rápidos." },
  { time: 4.2, label: "Duelo: aguarde o brilho e prepare o gatilho." },
  { time: 6.3, label: "Duelo: reaja no instante certo para vencer." },
  { time: 8.4, label: "Sinuca: mire e dosifique a força da tacada." },
];

const player = document.querySelector("[data-video-player]");

if (player) {
  const video = player.querySelector("[data-video]");
  const time = player.querySelector("[data-video-time]");
  const label = player.querySelector("[data-video-label]");
  const progress = player.querySelector("[data-video-progress]");
  const toggle = player.querySelector("[data-video-toggle]");
  const chaptersContainer = player.querySelector("[data-video-chapters]");

  chapters.forEach((chapter, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Ir para ${chapter.label}`);
    button.addEventListener("click", () => {
      video.currentTime = chapter.time;
      video.play().catch(() => {});
    });
    chaptersContainer.appendChild(button);
  });

  function formatTime(value) {
    const minutes = Math.floor(value / 60).toString().padStart(2, "0");
    const seconds = Math.floor(value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function getCurrentChapter() {
    return chapters.reduce((active, chapter) => {
      return video.currentTime >= chapter.time ? chapter : active;
    }, chapters[0]);
  }

  function updatePlayer() {
    const activeChapter = getCurrentChapter();
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 10.5;
    const currentProgress = Math.min((video.currentTime / duration) * 100, 100);

    time.textContent = formatTime(video.currentTime);
    label.textContent = activeChapter.label;
    progress.style.width = `${currentProgress}%`;

    chaptersContainer.querySelectorAll("button").forEach((button, index) => {
      button.setAttribute("aria-current", chapters[index] === activeChapter ? "true" : "false");
    });

    toggle.querySelector("span").textContent = video.paused ? ">" : "II";
    toggle.setAttribute("aria-label", video.paused ? "Reproduzir vídeo" : "Pausar vídeo");
  }

  toggle.addEventListener("click", () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });

  video.addEventListener("timeupdate", updatePlayer);
  video.addEventListener("play", updatePlayer);
  video.addEventListener("pause", updatePlayer);
  video.addEventListener("loadedmetadata", updatePlayer);

  updatePlayer();
}
