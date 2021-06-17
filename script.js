const openMobileMenu = document.querySelector(".nav__mobile-ham");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

// Open - close mobile menu //

openMobileMenu.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  toggleImage(
    ".nav__mobile-ham",
    "./images/icon-hamburger.svg",
    "./images/icon-close-menu.svg"
  );
});

const toggleImage = function (img, open, close) {
  let imgSrc = document.querySelector(img);
  if (imgSrc.src.match(open)) {
    document.querySelector(img).src = close;
  } else {
    document.querySelector(img).src = open;
  }
};

overlay.addEventListener("click", function () {
  mobileMenu.classList.add("hidden");
  overlay.classList.add("hidden");
  toggleImage(
    ".nav__mobile-ham",
    "./images/icon-hamburger.svg",
    "./images/icon-close-menu.svg"
  );
});
