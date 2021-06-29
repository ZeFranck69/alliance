import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class Splash {
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
		const logo = this.section.querySelector('.splash-content__logo');
		const text = this.section.querySelectorAll('.description > *');

		gsap
			.timeline()
			.fromTo(logo, { autoAlpha: 0, scale: 0.1 }, { autoAlpha: 1, scale: 1, duration: 0.7, delay: 0.5 })
			.fromTo(
				text,
				{ y: 30, autoAlpha: 0, scale: 0.2 },
				{ y: 0, autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.2, ease: 'power2.out' }
			);

		const image = this.section.querySelector('.splash__image');
		const animation = gsap.fromTo(image, { backgroundPositionY: '0' }, { backgroundPositionY: '30vh', ease: 'linear' });
		ScrollTrigger.create({
			trigger: image,
			start: 'bottom-=10% bottom-=10%',
			end: 'bottom+=100% bottom-=10%',
			scrub: 0.1,
			animation,
		});
	}
}

export default Splash;
