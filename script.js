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

// when card is hover change border color

const cardList = document.querySelectorAll(".card--modal");

if (cardList) {
  cardList.forEach((card) => {
    card.addEventListener("mouseover", function () {
      console.log("Mouse over!!!");
      card.classList.add("card--hover");
    });
  });

  cardList.forEach((card) => {
    card.addEventListener("mouseout", function () {
      console.log("Mouse over!!!");
      card.classList.remove("card--hover");
    });
  });
}

// when card is clicked show checkmark, change border, show card__additional

const modalCheckmark = document.querySelector(".modal__checkmark");
const cardAddition = document.querySelector(".card__addition");

if (cardList) {
  cardList.forEach((card) => {
    card.addEventListener("click", function () {
      console.log("clicked!!!");
      card.classList.add("card--hover");
      modalCheckmark.style.display = "block";
      cardAddition.classList.remove("hide-modal");
    });
  });
}
