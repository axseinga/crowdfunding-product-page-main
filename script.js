const mobileOpenButton = document.querySelector(".nav__mobile-ham");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

// Open - close mobile menu //

const toggleMobileMenu = function () {
  mobileMenu.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  toggleImage(
    ".nav__mobile-ham",
    "./images/icon-hamburger.svg",
    "./images/icon-close-menu.svg"
  );
};

if (mobileOpenButton) {
  mobileOpenButton.addEventListener("click", toggleMobileMenu);
}

const toggleImage = function (img, open, close) {
  let imgSrc = document.querySelector(img);
  if (imgSrc.src.match(open)) {
    document.querySelector(img).src = close;
  } else {
    document.querySelector(img).src = open;
  }
};

const closeMenuWhenOverlayIsClicked = function () {
  mobileMenu.classList.add("hidden");
  overlay.classList.add("hidden");
  toggleImage(
    ".nav__mobile-ham",
    "./images/icon-hamburger.svg",
    "./images/icon-close-menu.svg"
  );
};

if (overlay) {
  overlay.addEventListener("click", closeMenuWhenOverlayIsClicked);
}

// Open modal - when clicked on 'Back this project'

const backProjectButton = document.querySelector(".intro__cta");
const modalBackProject = document.querySelector(".modal");
const overlayModal = document.querySelector(".overlay-modal");
const modalCloseButton = document.querySelector(".modal__close");

const openModalPledge = function () {
  console.log("Clicked");
  modalBackProject.classList.remove("hide-modal");
  overlayModal.classList.remove("hidden");
};

if (backProjectButton) {
  backProjectButton.addEventListener("click", openModalPledge);
}

// Hide modal when click on x or on overlay

const closeModalWhenOverlayClicked = function () {
  overlayModal.classList.add("hidden");
  modalBackProject.classList.add("hide-modal");
};

if (overlayModal) {
  overlayModal.addEventListener("click", closeModalWhenOverlayClicked);
}

const closeModalWhenCloseBtn = function () {
  overlayModal.classList.add("hidden");
  modalBackProject.classList.add("hide-modal");
};

if (modalCloseButton) {
  modalCloseButton.addEventListener("click", closeModalWhenCloseBtn);
}

// when card is clicked show checkmark, change border, show card__additional

const radioButtons = document.querySelectorAll(".label__select");
console.log(radioButtons);
const cards = document.querySelectorAll(".card--active");
const cardsFooter = document.querySelectorAll(".card__addition");

radioButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (
      !cards[i].classList.contains("card--selected") &&
      !cards[i].classList.contains("card--disabled")
    ) {
      cards.forEach((card) => {
        card.classList.remove("card--selected");
      });
      cardsFooter.forEach((footer) => {
        footer.classList.add("hidden");
      });
      cards[i].classList.add("card--selected");
      cardsFooter[i].classList.remove("hidden");
    }
  });
});
