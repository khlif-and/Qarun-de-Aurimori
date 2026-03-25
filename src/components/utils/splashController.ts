export function initSplash(): void {
  const splash = document.getElementById("splash");
  if (!splash) return;

  splash.style.display = "block";
  document.body.style.overflow = "hidden";

  let virtualScroll = 0;
  const maxScroll = 12000;
  let isFinished = false;

  const gateLeft = document.getElementById("gateLeft");
  const gateRight = document.getElementById("gateRight");
  const gateEmblem = document.getElementById("gateEmblem");
  const innerJournal = document.getElementById("innerJournal");
  const stageFoundation = document.getElementById("stageFoundation");
  const stageVision = document.getElementById("stageVision");
  const scrollPrompt = document.getElementById("scrollPrompt");

  const sS1 = document.getElementById("stageStory1");
  const sS2 = document.getElementById("stageStory2");
  const sS3 = document.getElementById("stageStory3");
  const sS4 = document.getElementById("stageStory4");
  const sS5 = document.getElementById("stageStory5");
  const sS6 = document.getElementById("stageStory6");
  const sS7 = document.getElementById("stageStory7");
  const sS8 = document.getElementById("stageStory8");

  let musOn = false;
  const mus = document.getElementById("splashMusic") as HTMLAudioElement | null;
  if (mus) {
    mus.pause();
    mus.currentTime = 0;
  }

  function mapStg(
    el: HTMLElement | null,
    p: number,
    s: number,
    e: number,
  ): void {
    if (!el) return;
    let op = 0;
    const f = (e - s) * 0.25;
    if (p > s && p <= s + f) op = (p - s) / f;
    else if (p > s + f && p <= e - f) op = 1;
    else if (p > e - f && p <= e) op = 1 - (p - (e - f)) / f;

    el.style.opacity = Math.max(0, op).toString();
    if (op > 0) {
      el.style.transform = `translateY(${(s + (e - s) / 2 - p) * 300}px)`;
    }
  }

  function updateAnimationState(): void {
    const progress = Math.min(virtualScroll / maxScroll, 1);

    if (progress >= 0.99 && !isFinished) {
      isFinished = true;
      document.body.style.overflow = "";
      if (mus) {
        let v = mus.volume;
        const fadeInt = setInterval(() => {
          v -= 0.1;
          if (v <= 0) {
            clearInterval(fadeInt);
            mus.pause();
            mus.currentTime = 0;
          } else {
            mus.volume = v;
          }
        }, 30);
      }
      setTimeout(() => {
        splash.style.display = "none";
      }, 500);
      return;
    }

    if (progress < 1) {
      if (progress > 0.05 && !musOn && mus) {
        musOn = true;
        mus.volume = 0;
        mus
          .play()
          .then(() => {
            let v = 0;
            const f = setInterval(() => {
              v += 0.05;
              if (v >= 0.6) {
                clearInterval(f);
                v = 0.6;
              }
              mus.volume = v;
            }, 200);
          })
          .catch(() => {
            const unlockAudio = (): void => {
              if (progress < 0.95) {
                mus.volume = 0.6;
                mus.play().catch(() => {});
              }
              document.removeEventListener("click", unlockAudio);
              document.removeEventListener("touchstart", unlockAudio);
              document.removeEventListener("keydown", unlockAudio);
            };
            document.addEventListener("click", unlockAudio);
            document.addEventListener("touchstart", unlockAudio);
            document.addEventListener("keydown", unlockAudio);
          });
      }

      if (scrollPrompt) {
        scrollPrompt.style.opacity = progress > 0.02 ? "0" : "1";
      }

      let gateOp = 0;
      if (progress <= 0.15) {
        gateOp = progress / 0.15;
        gateOp = gateOp * gateOp;
      } else {
        gateOp = 1;
      }

      if (gateLeft)
        gateLeft.style.transform = `translateX(-${gateOp * 105}%)`;
      if (gateRight)
        gateRight.style.transform = `translateX(${gateOp * 105}%)`;

      if (gateEmblem) {
        gateEmblem.style.opacity = progress > 0.05 ? "0" : "1";
      }

      mapStg(stageFoundation, progress, 0.04, 0.15);
      mapStg(stageVision, progress, 0.15, 0.26);
      mapStg(sS1, progress, 0.26, 0.35);
      mapStg(sS2, progress, 0.35, 0.44);
      mapStg(sS3, progress, 0.44, 0.53);
      mapStg(sS4, progress, 0.53, 0.62);
      mapStg(sS5, progress, 0.62, 0.71);
      mapStg(sS6, progress, 0.71, 0.78);
      mapStg(sS7, progress, 0.78, 0.85);
      mapStg(sS8, progress, 0.85, 0.92);

      if (innerJournal) {
        let journalOp = 1;
        if (progress > 0.92) {
            journalOp = 1 - (progress - 0.92) / 0.07;
        }
        innerJournal.style.opacity = Math.max(
          0,
          Math.min(1, journalOp),
        ).toString();
      }
    }
  }

  const onWheel = (e: WheelEvent): void => {
    if (isFinished) return;
    virtualScroll += e.deltaY * 0.9;
    if (virtualScroll < 0) virtualScroll = 0;
    if (virtualScroll > maxScroll) virtualScroll = maxScroll;
    updateAnimationState();
  };

  let touchStartY = 0;
  const onTouchStart = (e: TouchEvent): void => {
    if (isFinished) return;
    touchStartY = e.touches[0].clientY;
    if (!musOn && mus) {
      mus
        .play()
        .then(() => mus.pause())
        .catch(() => {});
    }
  };

  const onTouchMove = (e: TouchEvent): void => {
    if (isFinished) return;
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    touchStartY = touchY;

    virtualScroll += deltaY * 3.5;
    if (virtualScroll < 0) virtualScroll = 0;
    if (virtualScroll > maxScroll) virtualScroll = maxScroll;

    if (virtualScroll > 0 && virtualScroll < maxScroll) {
      if (e.cancelable) e.preventDefault();
    }
    updateAnimationState();
  };

  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
}
