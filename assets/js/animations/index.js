const animate = [
  {
    opacity: 0,
    display: "none",
  },
  {
    opacity: 1,
    display: "flex",
  },
];

const animateConfig = {
  duration: 1000,
  iterations: 1,
  fill: "both",
  direction: "normal",
};

export const fadeIn = (el, compare = null, delay = 500) => {
  animateConfig.duration = delay;
  if (!compare) {
    el.animate(animate, animateConfig);
  } else {
    compare.addEventListener("animateend", (e) => {
      el.animate(animate, animateConfig);
    });
  }
};

export const fadeOut = (el, compare = null, delay = 500) => {
  animateConfig.duration = delay;
  animateConfig.direction = "reverse";
  if (!compare) {
    el.animate(animate, animateConfig);
  } else {
    compare.addEventListener("animateend", (e) => {
      el.animate(animate, animateConfig);
    });
  }
};
