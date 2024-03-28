import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class ContactShort {
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
		const section = this.section.querySelector('.contact-short');
		const contactWrapper = this.section.querySelector('.contact-short-columns__wrapper');
		const contactLeft = contactWrapper.querySelector('.column-left');

		const contactRight = contactWrapper.querySelector('.column-right');

		const animation = gsap
			.timeline()
			.fromTo(contactLeft, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 })
			.fromTo(contactRight, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 });

		ScrollTrigger.create({
			trigger: section,
			start: 'top bottom-=10%',
			toggleActions: 'play none none reverse',
			animation,
		});
	}
}

export default ContactShort;
