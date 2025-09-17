import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();

/* -------------------------------------------------------------------------------------------------------------------------------------------------
Transfer elements
-----------------------------------------------------------------------------------------------------------------------------------------------------*/
import TransferElements from "./modules/transfer-elements";

const headerTransferEl = document.querySelector('[data-id="transfer-element"]');
const headerTransferPlace = document.querySelector('[data-id="transfer-place"]');

if (headerTransferEl && headerTransferPlace) {
	new TransferElements({
		sourceElement: headerTransferEl,
		breakpoints: {
			768: {
				targetElement: headerTransferPlace,
				targetPosition: 1,
			},
		},
	});
}

/* -------------------------------------------------------------------------------------------------------------------------------------------------
Burger menu
-----------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const burgerBtn = document.querySelector("#burger");
	const burgerClose = document.querySelector("#burger-close");
	const mobileNav = document.querySelector(".header__nav");

	burgerBtn.onclick = openMobile;
	burgerClose.onclick = closeMobile;

	function openMobile() {
		mobileNav.classList.add("active");
		document.documentElement.classList.add("no-scroll");
	}
	function closeMobile() {
		mobileNav.classList.remove("active");
		document.documentElement.classList.remove("no-scroll");
	}
});

/* -------------------------------------------------------------------------------------------------------------------------------------------------
Video Modal
-----------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("videoModal");
	const allOpenBtns = document.querySelectorAll("[data-video]");
	const closeBtn = document.getElementById("closeModal");

	// Открытие модального окна
	allOpenBtns.forEach((btn) => {
		btn.onclick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			modal.classList.add('modal--show');
      document.documentElement.classList.add('no-scroll');
		};
	});

	// Закрытие модального окна
	closeBtn.onclick = (e) => {
		e.preventDefault();	
		modal.classList.remove('modal--show');
    document.documentElement.classList.remove('no-scroll');
	};

	// Закрытие при клике вне окна
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.classList.remove('modal--show');
      document.documentElement.classList.remove('no-scroll');
		}
	};
});
