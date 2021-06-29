import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

import FlexiblesInit from './Flexibles';
import Menu from './class/Menu';
export default class App {
	constructor() {
		this.revealManager();
		this.anchorManager();
		this.modalManager();
		this.titleAnimationManager();
		this.parallaxManager();

		this.menu = new Menu();

		FlexiblesInit();
	}

	revealManager() {
		document.querySelectorAll('[gsap-reveal]').forEach((elt, index) => {
			const animation = gsap.fromTo(
				elt,
				{ y: 30, autoAlpha: 0 },
				{ y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }
			);

			ScrollTrigger.create({
				trigger: elt,
				animation,
				start: 'top-=10% bottom-=5%',
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

	titleAnimationManager() {
		const titles = document.querySelectorAll('.title__wrapper');
		titles.forEach((title) => {
			const number = title.querySelector('.title__number');
			const firstLine = title.querySelector('.title__first-line');
			const secondLine = title.querySelector('.title__second-line');

			const animation = gsap.timeline();

			if (number)
				animation.fromTo(
					number,
					{ scale: 0.5, autoAlpha: 0 },
					{ scale: 1, autoAlpha: 1, duration: 0.2, ease: 'back.out' }
				);
			if (firstLine) animation.fromTo(firstLine, { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.2 });
			if (secondLine) animation.fromTo(secondLine, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.2 });

			ScrollTrigger.create({
				trigger: title,
				start: 'top bottom-=10%',
				animation,
				toggleActions: 'play none none reverse',
			});
		});

		const subtitles = document.querySelectorAll('.subtitle');
		subtitles.forEach((subtitle) => {
			const wrapper = subtitle.parentElement;

			ScrollTrigger.create({
				trigger: wrapper,
				start: 'top bottom-=10%',
				onEnter: () => {
					wrapper.classList.add('animate');
				},
				onLeaveBack: () => {
					wrapper.classList.remove('animate');
				},
				toggleActions: 'play none none reverse',
			});
		});
	}

	parallaxManager() {
		const images = document.querySelectorAll('.organisation__image, .members__image');
		images.forEach((image) => {
			const animation = gsap.fromTo(
				image,
				{ backgroundPositionY: '50%' },
				{ backgroundPositionY: '0%', ease: 'linear' }
			);
			ScrollTrigger.create({
				trigger: image,
				start: 'top bottom-=10%',
				end: 'bottom+=500 bottom-=10%',
				scrub: 0.1,
				animation,
			});
		});
	}
}

document.addEventListener('DOMContentLoaded', function (ev) {
	new App();
});
