import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class GovernanceShort {
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
		const section = this.section.querySelector('.governance-short');
		const governanceWrapper = this.section.querySelector('.governance-short-wrapper');
		const governanceBlock = governanceWrapper.querySelector('.governance-short-content');
		const governanceLogos = governanceBlock.querySelector('.content-logo__container');
		const governanceLogo = governanceLogos.querySelectorAll('.logo');
		const animation = gsap
			.timeline()
			.fromTo(governanceBlock, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 })
			.fromTo(governanceLogo, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 });

		ScrollTrigger.create({
			trigger: section,
			start: 'top bottom-=10%',
			toggleActions: 'play none none reverse',
			animation,
		});
	}
}

export default GovernanceShort;
