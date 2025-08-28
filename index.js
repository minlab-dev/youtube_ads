// ======================
// 1. 스킵 버튼 클릭
// ======================
function checkSkipButton() {
  const skipBtn1 = document.querySelector('.ytp-skip-ad-button');
  const skipBtn2 = document.querySelector('.ytp-ad-skip-button');
  if (skipBtn1) {
    skipBtn1.click();
    console.log("스킵 버튼 클릭");
    return true;
  } if (skipBtn2) {
    skipBtn2.click();
    console.log("스킵 버튼 클릭");
    return true;
  }
  return false;
}

// ======================
// 2. 광고 블록 치환
// ======================
function replaceAdBlocks() {
  const nv_ads_texts1 = Array.from(document.querySelectorAll(".ytwTopLandscapeImageLayoutViewModelHostIsClickableAdComponent"));
  const nv_ads_texts2 = Array.from(document.querySelectorAll("#rendering-content.ytd-in-feed-ad-layout-renderer"));
  const nv_ads_texts = [...nv_ads_texts1, ...nv_ads_texts2];

  nv_ads_texts.forEach(e => {
    e.innerHTML = "";
    e.onclick = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      return false;
    };
  });
}

// ======================
// 3. 광고 감지 & 강제 종료
// ======================
const observer = new MutationObserver(() => {
  const ads = document.querySelectorAll('.ad-showing video');

  ads.forEach(ad => {
    try {
      const dur = ad.duration;
      console.log(dur);
      if (Number.isFinite(dur) && dur > 0) {
        ad.currentTime = dur; // 광고 강제 점프
        console.log("⏩ 광고 강제 종료");
      } else {
        console.log("duration 비정상 → 스킵 버튼 대기");
      }
    } catch (err) {
      console.warn("currentTime 설정 실패:", err.message);
    }
  });

  // 스킵 버튼 반복 시도 (0.1초마다, 최대 10번)
  let attempts = 0;
  const intervalId = setInterval(() => {
    if (checkSkipButton() || attempts > 10) {
      clearInterval(intervalId);
    }
    attempts++;
  }, 100);
});

observer.observe(document.body, { childList: true, subtree: true });

// ======================
// 4. 광고 블록 치환 주기 실행
// ======================
setInterval(replaceAdBlocks, 500);
