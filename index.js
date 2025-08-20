setInterval(()=>{
  var nv_ads_texts1 = document.querySelectorAll(".ytwTopLandscapeImageLayoutViewModelHostIsClickableAdComponent");
  var nv_ads_texts2 = document.querySelectorAll("#rendering-content.ytd-in-feed-ad-layout-renderer");
  var nv_ads_texts = [Array.from(nv_ads_texts1), ...Array.from(nv_ads_texts2)];
  nv_ads_texts.forEach(e => {
    var ew = e.clientWidth, eh = e.clientHeight;
    e.innerHTML = `<img src="https://github.com/minlab-dev/ads_nono/blob/main/img_ads.png?raw=true" style="width: ${ew}px !important; height: ${eh-3}px !important;">`
    e.onclick = (esd) => {
      esd.stopPropagation()
      esd.preventDefault()
      return false;
    }
  });
}, 500);