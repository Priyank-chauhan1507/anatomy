var ua = navigator.userAgent.toLowerCase();
let isSafari = false;
if (ua.indexOf("safari") !== -1) {
  if (!(ua.indexOf("chrome") !== -1)) {
    isSafari = true;
  }
}

export const devicePixelRatio = window.devicePixelRatio || 1;

export const isSafariBrowser = isSafari;
