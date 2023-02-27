import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

const left = document.getElementById("left-side");

const handleMove = (e) => {
  left.style.width = `${(e.clientX / window.innerWidth) * 100}%`;
};

document.onmousemove = (e) => handleMove(e);

document.ontouchmove = (e) => handleMove(e.touches[0]);

initScrollReveal(targetElements, defaultProps);
initTiltEffect();
