import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class About {
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
		const blocksWrapper = this.section.querySelector('.blocks');
		const button = this.section.querySelectorAll('.first-column__cta-wrapper');
		const blocks = this.section.querySelectorAll('.about-block');

		const animation = gsap
			.timeline()
			.fromTo(
				button,
				{ scale: 0.8, x: -100, autoAlpha: 0 },
				{ scale: 1, x: 0, autoAlpha: 1, stagger: 0.1, duration: 0.5 }
			)
			.fromTo(
				blocks,
				{ scale: 0.8, y: 75, autoAlpha: 0 },
				{ scale: 1, y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.35 }
			)
			.fromTo(
				blocksElements,
				{ y: 20, autoAlpha: 0 },
				{ y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
			);

		ScrollTrigger.create({
			trigger: blocksWrapper,
			start: 'top bottom-=10%',
			toggleActions: 'play none none reverse',
			animation,
		});
	}
}

export default About;
