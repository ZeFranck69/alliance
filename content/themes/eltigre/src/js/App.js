import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin);

import FlexiblesInit from './Flexibles';
import Menu from './class/Menu';
export default class App {
	constructor() {
		this.revealManager();
		this.anchorManagers();

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

	anchorManagers(ev) {
		const links = document.querySelectorAll('a');
		links.forEach((link) => {
			const anchor = link.href.replace(window.location.href, '');
			if (anchor.indexOf('#') === 0) {
				link.removeAttribute('href');
				link.addEventListener('click', (ev) => {
					ev.preventDefault();
					const element = document.querySelector(anchor);
					if (element) {
						gsap.to(window, {
							scrollTo: anchor,
							duration: 0.5,
							ease: 'power2.out',
						});
					}
				});
			}
		});
	}
}

document.addEventListener('DOMContentLoaded', function (ev) {
	new App();
});
