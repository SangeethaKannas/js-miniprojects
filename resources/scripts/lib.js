let slideUp = (target, duration) => {
  target.style.transitionProperty = "height, margin, padding"; /* [1.1] */
  target.style.transitionDuration = duration + "ms"; /* [1.2] */
  target.style.boxSizing = "border-box"; /* [2] */
  target.style.height = target.offsetHeight + "px"; /* [3] */
  target.style.height = 0; /* [4] */
  target.style.paddingTop = 0; /* [5.1] */
  target.style.paddingBottom = 0; /* [5.2] */
  target.style.marginTop = 0; /* [6.1] */
  target.style.marginBottom = 0; /* [7.2] */
  target.style.overflow = "hidden"; /* [7] */

  window.setTimeout(() => {
    target.style.display = "none"; /* [8] */
    target.style.removeProperty("height"); /* [9] */
    target.style.removeProperty("padding-top"); /* [10.1] */
    target.style.removeProperty("padding-bottom"); /* [10.2] */
    target.style.removeProperty("margin-top"); /* [11.1] */
    target.style.removeProperty("margin-bottom"); /* [11.2] */
    target.style.removeProperty("overflow"); /* [12] */
    target.style.removeProperty("transition-duration"); /* [13.1] */
    target.style.removeProperty("transition-property"); /* [13.2] */
  }, duration);
};

let slideDown = (target, duration) => {
  target.style.removeProperty("display"); /* [1] */
  let display = window.getComputedStyle(target).display;
  if (display === "none") {
    /* [2] */
    display = "block";
  }
  target.style.display = display;

  let height = target.offsetHeight; /* [3] */
  target.style.height = 0; /* [4] */
  target.style.paddingTop = 0; /* [5.1] */
  target.style.paddingBottom = 0; /* [5.2] */
  target.style.marginTop = 0; /* [6.1] */
  target.style.marginBottom = 0; /* [6.2] */
  target.style.overflow = "hidden"; /* [7] */

  target.style.boxSizing = "border-box"; /* [8] */
  target.style.transitionProperty = "height, margin, padding"; /* [9.1] */
  target.style.transitionDuration = duration + "ms"; /* [9.2] */
  target.style.height = height + "px"; /* [10] */
  target.style.removeProperty("padding-top"); /* [11.1] */
  target.style.removeProperty("padding-bottom"); /* [11.2] */
  target.style.removeProperty("margin-top"); /* [12.1] */
  target.style.removeProperty("margin-bottom"); /* [12.2] */

  window.setTimeout(() => {
    target.style.removeProperty("height"); /* [13] */
    target.style.removeProperty("overflow"); /* [14] */
    target.style.removeProperty("transition-duration"); /* [15.1] */
    target.style.removeProperty("transition-property"); /* [15.2] */
  }, duration);
};

let slideToggle = (target, duration) => {
  if (window.getComputedStyle(target).display === "none") {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};
