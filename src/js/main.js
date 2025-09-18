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
MOdal listener
-----------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector(".header");
	const allOpenVideoBtns = document.querySelectorAll("[data-video]");
	const allCloseBtns = document.querySelectorAll("[data-modal='close']");
	const openFormModalBtns = document.querySelectorAll("[data-modal='open']");
	const videoModal = document.querySelector("#videoModal");
	const formModal = document.querySelector("#formModal");

	const thanksModal = document.querySelector("#thanksModal");
	const openThanksModalBtn = document.querySelector("[data-modal='thanks']");

	const allModals = [];
	formModal && allModals.push(formModal);
	videoModal && allModals.push(videoModal);
	thanksModal && allModals.push(thanksModal);

	if (openThanksModalBtn)
		openThanksModalBtn.onclick = (e) => {
			e.preventDefault();
			console.log("Thanks");
			closeAllModals();
			setTimeout(() => {
				openModal(thanksModal);
			}, 300);
		};

	// Открытие модального VIDEO окна
	allOpenVideoBtns.forEach((btn) => {
		btn.onclick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			const url = btn.dataset.video;
			const previewUrl = btn.nextElementSibling ? btn.nextElementSibling : null;			
			openModal(videoModal, url, previewUrl ? previewUrl.src : null);
		};
	});

	// Открытие модального FORM окна
	openFormModalBtns.forEach((btn) => {
		btn.onclick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			openModal(formModal);
		};
	});

	allCloseBtns.forEach((btn) => {
		btn.onclick = (e) => {
			e.stopPropagation();
			e.preventDefault();
			closeAllModals();
		};
	});

	function closeAllModals() {
		allModals.forEach((modal) => {
			modal.classList.remove("modal--show");

			const existingVideo = modal.querySelector("video");
			if (existingVideo) {
				existingVideo.pause();
				existingVideo.remove();
			}
		});
		removeNoScroll();
	}

	function addNoScroll() {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.documentElement.style.paddingRight = scrollbarWidth + "px";
		header.style.paddingRight = scrollbarWidth + "px";

		header.classList.add("no-scroll");
		document.documentElement.classList.add("no-scroll");
	}
	function removeNoScroll() {
		header.classList.remove("no-scroll");
		document.documentElement.classList.remove("no-scroll");

		document.documentElement.style.removeProperty("padding-right");
		header.style.removeProperty("padding-right");
	}

	function openModal(modal, url, previewUrl) {
		// form modal open
		if (formModal && modal === formModal) {
			modal.classList.add("modal--show");
			addNoScroll();
			console.log("Form modal");
		} else if (thanksModal && modal === thanksModal) {
			modal.classList.add("modal--show");
			addNoScroll();
			console.log("Thanks modal");
			// video modal open
		} else if (videoModal && modal === videoModal) {
			modal.classList.add("modal--show");
			addNoScroll();

			const container = modal.querySelector(".next-video-modal__forvideo");
			// Создать элемент видео
			const video = document.createElement("video");
			video.src = url;
			video.controls = true; // показать элементы управления
			video.autoplay = true; // запускать автоматически
			video.style.width = "100%"; // по желанию
			previewUrl && video.setAttribute("poster", previewUrl);
			// Обработчик события окончания видео
			video.addEventListener("ended", () => {
				// Запустить таймер на 23 секунды
				setTimeout(() => {
					// Удалить видео из контейнера
					container.innerHTML = "";
					closeAllModals();
				}, 500);
			});

			// Вставить видео в контейнер
			container.appendChild(video);
			console.log("Video modal --", url);
		}
	}

	// Закрытие при клике вне окна
	window.onclick = function (event) {
		allModals.forEach((modal) => {
			if (event.target == modal && event.target != videoModal) {
				closeAllModals();
			}
		});
	};
});
