import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class Involved {
	constructor(className) {
		this.sections = document.querySelectorAll(`.${className}`);
		this.sections.forEach((section) => {
			new Section(section);
		});
	}
}

class Section {
	constructor(section) {
		this.section = section;
		this.animate();
	}

	animate() {
		const section = this.section.querySelector('.involved');
		const involvedWrapper = this.section.querySelector('.involved-columns__wrapper');
		const involvedLeft = involvedWrapper.querySelector('.column-left');
		const involvedLeftTitle = involvedLeft.querySelector('.column-title');
		const involvedRight = involvedWrapper.querySelector('.column-right');
		const involvedRightTitle = involvedRight.querySelector('.column-title');
		const animation = gsap
			.timeline()
			.fromTo(involvedLeft, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 })
			.fromTo(involvedLeftTitle, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 })
			.fromTo(involvedRight, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 })
			.fromTo(
				involvedRightTitle,
				{ scale: 0.8, autoAlpha: 0 },
				{ scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 }
			);

		ScrollTrigger.create({
			trigger: section,
			start: 'top bottom-=10%',
			toggleActions: 'play none none reverse',
			animation,
		});
	}
}

export default Involved;
