import gsap from 'gsap/gsap-core';
import { addTransition } from '../utils/functions';

export default class Menu {
	currentScrollPosition = 0;
	minScrollPositionBeforeSticky = 0;

	constructor() {
		this.header = document.getElementById('site-header');

		const splash = document.querySelector('.splash');
		if (splash) {
			this.minScrollPositionBeforeSticky = splash.clientHeight - 100;
		}

		window.addEventListener('scroll', this.stickyMenu);
	}

	stickyMenu = () => {
		if (this.header) {
			if (!this.isAnimating()) {
				const isSticky = this.isSticky();
				if (
					// Add sticky if scroll position is passed minScrollPositionBeforeSticky and scroll direction is up and is not sticky
					this.currentScrollPosition > this.minScrollPositionBeforeSticky &&
					this.currentScrollPosition > window.scrollY &&
					!isSticky
				) {
					this.stickMenu();
				} else if (
					// Remove sticky if scroll position is below minScrollPositionBeforeSticky or scroll direction is down and is currently sticky
					(this.currentScrollPosition < this.minScrollPositionBeforeSticky ||
						this.currentScrollPosition < window.scrollY) &&
					isSticky
				) {
					this.unstickMenu();
				}
			}

			this.currentScrollPosition = window.scrollY;
		}
	};

	isSticky = () => this.header && this.header.classList.contains('sticky');
	isAnimating = () => this.animating;
	stickMenu() {
		if (this.isSticky()) return;

		this.animating = true;
		this.header.classList.add('sticky');
		gsap.fromTo(
			this.header,
			{ y: '-100%' },
			{
				y: 0,
				duration: 0.25,
				onComplete: () => {
					this.animating = false;
				},
			}
		);
	}

	unstickMenu() {
		this.animating = true;
		gsap.fromTo(
			this.header,
			{
				y: 0,
			},
			{
				y: '-100%',
				duration: 0.25,
				onComplete: () => {
					this.animating = false;
					this.header.style.transform = null;
					this.header.classList.remove('sticky');
				},
			}
		);
	}

	toggleMenu = (action = 'toggle') => {
		const VALID_ACTIONS = ['add', 'remove', 'toggle'];
		if (!VALID_ACTIONS.includes(action))
			return console.error(`"${action}" is not allowed. Allowed actions: ${VALID_ACTIONS.join(' ')}`);

		this.body.classList[action]('no-scroll');
		this.header.classList[action]('active');
		this.header.setAttribute('aria-hidden', !this.header.classList.contains('active'));
	};
}
