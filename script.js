// Selectors

const mobileOpenButton = document.querySelector(".nav__mobile-ham");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const backProjectButton = document.querySelector(".intro__cta");
const modalBackProject = document.querySelector(".modal");
const overlayModal = document.querySelector(".overlay-modal");
const modalCloseButton = document.querySelector(".modal__close");
const selectRewardBtns = document.querySelectorAll(".card__cta");
const radioButtons = document.querySelectorAll(".card__label");
const cards = document.querySelectorAll(".card--active");
const cardsFooter = document.querySelectorAll(".card__addition");
const bookmarkBtn = document.querySelector(".intro__bookmark");
const radioCheckeds = document.querySelectorAll(".label__radio");
const pledgeForms = document.querySelectorAll(".pledge");
const counterTotal = document.querySelector(".stats__total");
const backersTotal = document.querySelector(".stats__backers");
const modalSuccess = document.querySelector(".success-modal");
const btnSuccess = document.querySelector(".btn--success");

const menuOpenClass = "fade-in-modal";
const menuCloseClass = "fade-out-modal";
const animationDuration = 1000;
let isOpen = false;
let timer;
let isTransitionend = true;

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
    showModal(modalBackProject);
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

// Modal animations

backProjectButton.addEventListener("click", () => showModal());

// show modal

const showModal = (modal) => {
    if (!isTransitionend) return false;

    isTransitionend = !isTransitionend;
    isOpen = !isOpen;

    modal.classList.add(menuOpenClass);
    console.log("SHOW");

    timer = setTimeout(() => {
        isTransitionend = !isTransitionend;
    }, animationDuration);
};

// hide modal

const hideModal = (modal) => {
    if (!isTransitionend) return false;
    isTransitionend = !isTransitionend;
    isOpen = !isOpen;
    modal.classList.add(menuCloseClass);
    console.log("HIDE");

    timer = setTimeout(() => {
        isTransitionend = !isTransitionend;

        modal.classList.remove(menuOpenClass);
        modal.classList.remove(menuCloseClass);

        timer = null;
    }, animationDuration);
};

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
    hideModal(modalBackProject);
    timer = setTimeout(() => {
        modalBackProject.classList.add("hide-modal");
        overlayModal.classList.add("hidden");
        timer = null;
    }, animationDuration - 200);
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

const changeModals = function () {
    hideModal(modalBackProject);
    overlayModal.classList.remove("hide-modal");
    timer = setTimeout(() => {
        modalBackProject.classList.add("hide-modal");
        timer = null;
    }, animationDuration - 200);
    deselectRadioBtns();
    deactiveCards();
};

const showSuccessMessage = function () {
    timer = setTimeout(() => {
        modalSuccess.classList.remove("hide-modal");
        modalSuccess.classList.add("show-modal");
        timer = null;
    }, animationDuration - 200);
    window.scrollTo(0, 0);
};

pledgeForms.forEach((form) => {
    form.addEventListener("click", function (e) {
        const target = e.target;
        if (target.classList.contains("btn")) {
            const input =
                target.parentElement.firstElementChild.firstElementChild;
            if (input === null) {
                // close modals and show succes message
                changeModals();
                showModal(modalSuccess);
                showSuccessMessage();
            } else {
                increaseTotal(input);
                increaseBackers();
                changeModals();
                showModal(modalSuccess);
                // close modals and show succes message
                showSuccessMessage();
            }
        }
    });
});

// Close success message

btnSuccess.addEventListener("click", function () {
    hideModal(modalSuccess);
    timer = setTimeout(() => {
        modalSuccess.classList.remove("show-modal");
        modalSuccess.classList.add("hide-modal");
        overlayModal.classList.add("hidden");
        timer = null;
    }, animationDuration - 200);
});

// Focus-trap function

// add all the elements inside modal which you want to make focusable
const focusableElements = "button, input";

const firstFocusableElement =
    modalBackProject.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modalBackProject.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

document.addEventListener("keydown", function (e) {
    console.log("key down");
    let isTabPressed = e.key === "Tab";

    if (!isTabPressed) {
        return;
    }

    if (e.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            e.preventDefault();
        }
    } else {
        // if tab key is pressed
        if (document.activeElement === lastFocusableElement) {
            // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement.focus(); // add focus for the first focusable element
            e.preventDefault();
        }
    }
});

firstFocusableElement.focus();
