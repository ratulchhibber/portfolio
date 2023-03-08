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

class StickyNavigation {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.onScroll();
    let self = this;
    $(".et-hero-tab").on("click", function () {
      self.onTabClick(window.event, $(this));
    });
    $(window).on("scroll", () => {
      this.onScroll();
    });
    $(window).on("resize", () => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop =
      $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
    $("html, body").animate({ scrollTop: scrollTop }, 0);
  }

  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkTabContainerPosition() {
    let offset =
      $(".et-hero-tabs").offset().top +
      $(".et-hero-tabs").height() -
      this.tabContainerHeight;
    if ($(window).scrollTop() > offset) {
      $(".et-hero-tabs-container").addClass("et-hero-tabs-container--top");
    } else {
      $(".et-hero-tabs-container").removeClass("et-hero-tabs-container--top");
    }
  }

  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".et-hero-tab").each(function () {
      let id = $(this).attr("href");
      var top = ($(".content-nav").offset() || { top: NaN }).top;
      let offsetTop = top - self.tabContainerHeight;
      let offsetBottom = top + $(id).height() - self.tabContainerHeight;
      if (
        $(window).scrollTop() > offsetTop &&
        $(window).scrollTop() < offsetBottom
      ) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css("width");
      left = this.currentTab.offset().left;
    }
    $(".et-hero-tab-slider").css("width", width);
    $(".et-hero-tab-slider").css("left", left);
  }
}

new StickyNavigation();
