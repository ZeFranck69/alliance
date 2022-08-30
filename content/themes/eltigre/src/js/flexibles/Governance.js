import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class Governance {
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
		const section = this.section.querySelector('.governance');
		const governanceWrapper = this.section.querySelector('.governance-wrapper');
		const governanceBlock = governanceWrapper.querySelectorAll('.governance-content');

		const animation = gsap.timeline();
		animation.fromTo(
			governanceBlock,
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

export default Governance;
