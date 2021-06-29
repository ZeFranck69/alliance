import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin);

import FlexiblesInit from './Flexibles';
import Menu from './class/Menu';
export default class App {
	constructor() {
		this.revealManager();
		this.anchorManager();
		this.modalManager();

		this.menu = new Menu();

		FlexiblesInit();
	}

	revealManager() {
		document.querySelectorAll('[gsap-reveal]').forEach((el) => {
			const animation = gsap.fromTo(
				elt,
				{ y: 30, autoAlpha: 0 },
				{ y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }
			);
			ScrollTrigger.create({
				trigger: elt,
				animation,
				start: 'top-=10% bottom-=10%',
			});
		});
	}

	anchorManager(ev) {
		const links = document.querySelectorAll('a');
		links.forEach((link) => {
			const anchor = link.href.replace(window.location.href, '');
			if (anchor.indexOf('#') === 0 && anchor.length > 1) {
				const element = document.querySelector(anchor);
				if (element) {
					link.removeAttribute('href');
					link.addEventListener('click', (ev) => {
						ev.preventDefault();
						gsap.to(window, {
							scrollTo: anchor,
							duration: 0.7,
							ease: 'power2.out',
						});
					});
				}
			}
		});
	}

	modalManager() {
		const modalTriggers = document.querySelectorAll('[data-popup]');

		modalTriggers.forEach((trigger) => {
			const { popup } = trigger.dataset;
			try {
				trigger.addEventListener('click', function (ev) {
					ev.stopPropagation();
					document.querySelector(popup).classList.add('active');
					document.body.addEventListener('click', closeModal);
				});
			} catch (error) {}
		});

		const modals = document.querySelectorAll('.modal');
		modals.forEach((modal) => {
			let clickedInsideModal = false;

			function closeModal() {
				modal.classList.remove('active');
			}

			const closeButton = modal.querySelector('.close');
			const wrapper = modal.querySelector('.modal-wrapper');

			if (wrapper) {
				wrapper.addEventListener('click', (ev) => {
					ev.stopPropagation();
					clickedInsideModal = true;
				});
			}

			// CLOSE EVENTS
			if (closeButton) {
				closeButton.addEventListener('click', closeModal);
			}

			document.body.addEventListener('click', () => {
				if (!clickedInsideModal) closeModal();

				clickedInsideModal = false;
			});

			document.body.addEventListener('keydown', (ev) => {
				if (ev.key === 'Escape') closeModal();
			});
		});
	}
}

document.addEventListener('DOMContentLoaded', function (ev) {
	new App();
});
