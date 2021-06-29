import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class Members {
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
		const blocksWrapper = this.section.querySelector('.members__block');
		const hook = blocksWrapper.querySelectorAll('.hook');
		const logos = blocksWrapper.querySelectorAll('.logo');
		const animation = gsap
			.timeline()
			.fromTo(
				blocksWrapper,
				{ scale: 0.8, y: 50, autoAlpha: 0 },
				{ scale: 1, y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.42 }
			)
			.fromTo(hook, { scale: 0.8, y: 50, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.5 })
			.fromTo(logos, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6 });

		ScrollTrigger.create({
			trigger: blocksWrapper,
			start: 'top bottom-=10%',
			toggleActions: 'play none none reverse',
			animation,
		});
	}
}

export default Members;
