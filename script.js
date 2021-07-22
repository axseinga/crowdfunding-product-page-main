// Selectors //

const mobileOpenButton = document.querySelector(".nav__mobile-ham");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const backProjectButton = document.querySelector(".intro__cta");
const modalBackProject = document.querySelector(".modal");
const overlayModal = document.querySelector(".overlay-modal");
const modalCloseButton = document.querySelector(".modal__close");
const selectRewardBtns = document.querySelectorAll(".card__cta");
const radioButtons = document.querySelectorAll(".label__select");
const cards = document.querySelectorAll(".card--active");
const cardsFooter = document.querySelectorAll(".card__addition");
const bookmarkBtn = document.querySelector(".intro__bookmark");
const radioCheckeds = document.querySelectorAll(".label__radio");
const pledgeForms = document.querySelectorAll(".pledge");
const counterTotal = document.querySelector(".stats__total");
const backersTotal = document.querySelector(".stats__backers");
const modalSuccess = document.querySelector(".success-modal");
const btnSuccess = document.querySelector(".btn--success");

// Open - close mobile menu //

const toggleImage = function (img, open, close) {
  let imgSrc = document.querySelector(img);
  if (imgSrc.src.match(open)) {
    document.querySelector(img).src = close;
  } else {
    document.querySelector(img).src = open;
  }
};

const toggleMobileMenu = function () {
  mobileMenu.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  toggleImage(
    ".nav__mobile-ham",
    "./images/icon-hamburger.svg",
    "./images/icon-close-menu.svg"
  );
};

const toggleMobileMenuFull = function () {
  if (!modalBackProject.classList.contains("hide-modal")) {
    closeModal();
    toggleMobileMenu();
  } else {
    toggleMobileMenu();
  }
};

if (mobileOpenButton) {
  mobileOpenButton.addEventListener("click", toggleMobileMenuFull);
}

if (overlay) {
  overlay.addEventListener("click", toggleMobileMenu);
}

// Open modal - when clicked on 'Back this project'

const openModalPledge = function () {
  modalBackProject.classList.remove("hide-modal");
  overlayModal.classList.remove("hidden");
  window.scrollTo(0, 0);
};

if (backProjectButton) {
  backProjectButton.addEventListener("click", openModalPledge);
}

// Open modal when clicked on 'Select Reward'

selectRewardBtns.forEach((btn) => {
  if (!btn.classList.contains("btn--disabled")) {
    btn.addEventListener("click", openModalPledge);
  }
});

// Deselect radio buttons

const deselectRadioBtns = function () {
  radioCheckeds.forEach((btn) => {
    btn.checked = false;
  });
};

// Deactive all selected cards

const deactiveCards = function () {
  cards.forEach((card) => {
    card.classList.remove("card--selected");
  });
  cardsFooter.forEach((footer) => {
    footer.classList.add("hide-footer");
    footer.classList.remove("show-footer");
  });
};

// Close modal when clicked on x or overlay

const closeModal = function () {
  overlayModal.classList.add("hidden");
  modalBackProject.classList.add("hide-modal");
  if (modalSuccess.classList.contains("show-modal")) {
    modalSuccess.classList.remove("show-modal");
    modalSuccess.classList.add("hide-modal");
  }
  deselectRadioBtns();
  deactiveCards();
};

if (overlayModal) {
  overlayModal.addEventListener("click", closeModal);
}

if (modalCloseButton) {
  modalCloseButton.addEventListener("click", closeModal);
}

// when card is clicked show checkmark, change border, show card__additional

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
        footer.classList.remove("show-footer");
        footer.classList.add("hide-footer");
      });
      cards[i].classList.add("card--selected");
      cardsFooter[i].classList.add("show-footer");
      cardsFooter[i].classList.remove("hide-footer");
    }
  });
});

// Toggle bookmark

const toggleBookmark = function () {
  const text = bookmarkBtn.lastElementChild;
  const svg = bookmarkBtn.firstElementChild;
  console.log(svg);
  text.classList.toggle("bookmarked-text");
  text.innerText === "Bookmark"
    ? (text.innerText = "Bookmarked")
    : (text.innerText = "Bookmark");
  svg.classList.toggle("bookmarked-svg");
};

bookmarkBtn.addEventListener("click", toggleBookmark);

// Add pledge to total and increase backers by 1

const increaseTotal = function (input) {
  const inputValue = +input.value;
  const counterStart = parseFloat(
    counterTotal.innerText.slice(1).replace(/,/g, "")
  );
  const newCounter = counterStart + inputValue;
  counterTotal.innerText = `$${newCounter
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

const increaseBackers = function () {
  const backersStart = backersTotal.innerText.replace(/,/g, "");
  backersTotal.innerText = (+backersStart + 1)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const showSuccessMessage = function () {
  console.log(modalSuccess);
  modalSuccess.classList.remove("hide-modal");
  modalSuccess.classList.add("show-modal");
  overlayModal.classList.remove("hidden");
  window.scrollTo(0, 0);
};

pledgeForms.forEach((form) => {
  form.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("btn")) {
      const input = target.parentElement.firstElementChild.firstElementChild;
      if (input === null) {
        // close modals and show succes message
        closeModal();
        showSuccessMessage();
      } else {
        increaseTotal(input);
        increaseBackers();
        closeModal();
        // close modals and show succes message
        showSuccessMessage();
      }
    }
  });
});

// Close success message

btnSuccess.addEventListener("click", function () {
  modalSuccess.classList.remove("show-modal");
  modalSuccess.classList.add("hide-modal");
  overlayModal.classList.add("hidden");
});

// Modal animations

document.addEventListener("animationstart", function (e) {
  if (e.animationName === "fade-in") {
    e.target.classList.add("did-fade-in");
  }
});

document.addEventListener("animationend", function (e) {
  if (e.animationName === "fade-out") {
    e.target.classList.remove("did-fade-in");
  }
});
