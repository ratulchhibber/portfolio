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

$(function () {
  $(".box").on("click touchstart", function (e) {
    window.event.stopPropagation();
    $(".box").not(this).removeClass("touched");
    $(this).toggleClass("touched").removeClass("hovered");
  });
  $(".box").on("mouseenter", function (e) {
    $(this).addClass("hovered");
  });
  $(".box").on("mouseleave", function (e) {
    $(this).removeClass("hovered");
  });
});

$(document).on("click touchstart touchend", function () {
  console.log("event");

  $(".box").removeClass("touched");
});

/*
script based on this pen
https://codepen.io/lukebrooker/pen/aCiol
*/
