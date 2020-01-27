function loadScript(url) {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.async = true;
    script.src = url;

    head.appendChild(script);

    script.onload = resolve;
    script.onerror = reject;
  })
}

function loadStyle(url) {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    const script = document.createElement('link');
    script.href = url;
    script.rel = "stylesheet";

    head.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
  })
}

export const loadPayline = async (isHomologation = false) => {
  if(isHomologation){
    await loadScript("https://homologation-payment.payline.com/scripts/widget-min.js");
    await loadStyle("https://homologation-payment.payline.com/styles/widget-min.css");
  } else {
    await loadScript("https://payment.payline.com/scripts/widget-min.js");
    await loadStyle("https://payment.payline.com/styles/widget-min.css");
  }
};
