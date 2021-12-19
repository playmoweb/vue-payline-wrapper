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

export const loadPayline = (isHomologation = false) => {
  if(isHomologation){
    return Promise.all([
      loadScript("https://homologation-payment.cdn.payline.com/scripts/widget-min.js"),
      loadStyle("https://homologation-payment.cdn.payline.com/styles/widget-min.css"),
    ]);
  } else {
    return Promise.all([
      loadScript("https://payment.payline.com/scripts/widget-min.js"),
      loadStyle("https://payment.payline.com/styles/widget-min.css"),
    ]);
  }
};
