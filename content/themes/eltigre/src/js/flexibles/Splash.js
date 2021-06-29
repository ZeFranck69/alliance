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
		const image = document.querySelector('.splash__image');
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
