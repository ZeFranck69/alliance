import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class Grantee {
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
		const section = this.section.querySelector('.our-grants');
		const granteeWrapper = this.section.querySelector('.our-grants-wrapper');
		const granteeTitle = granteeWrapper.querySelectorAll('.our-grants__title');
		const granteeDescription = granteeWrapper.querySelectorAll('.our-grants-columns__wrapper');
		const animation = gsap
			.timeline()
			.fromTo(granteeTitle, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 })
			.fromTo(
				granteeDescription,
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

export default Grantee;
