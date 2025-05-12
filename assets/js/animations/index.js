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
  fill: "forwards",
  direction: "normal",
  composite: "replace",
  easing: "ease-in-out",
};

export const fadeIn = (el, compare = null, delay = 500, scroll = null) => {
  animateConfig.duration = delay;
  animateConfig.direction = "normal";
  el.classList.remove("d-none");
  if (!compare) {
    el.animate(animate, animateConfig);
  } else {
    compare.addEventListener("animationend", (e) => {
      el.animate(animate, animateConfig);
    });
  }
  if (scroll)
    el.addEventListener("animationend", (e) =>
      scroll.scrollTo(0, scroll.scrollHeight)
    );
};

export const fadeOut = (el, compare = null, delay = 500, scroll = null) => {
  animateConfig.duration = delay;
  animateConfig.direction = "reverse";
  if (!compare) {
    el.animate(animate, animateConfig);
  } else {
    compare.addEventListener("animationend", (e) => {
      el.animate(animate, animateConfig);
    });
  }
  if (scroll)
    el.addEventListener("animationend", (e) =>
      scroll.scrollTo(0, scroll.scrollHeight)
    );
};
