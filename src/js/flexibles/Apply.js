import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class Apply {
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
		this.block = section.querySelector('.apply-content');

		this.animate();
	}
	animate() {
		const blocksWrapper = this.section.querySelector('.apply-content');
		const subtitle = this.section.querySelector('.apply-content__subtitle');
		const columns = this.section.querySelectorAll('.columns__column');
		const columnsElements = blocksWrapper.querySelectorAll('.column-title, .column__events, .critera');
		const animation = gsap
			.timeline()
			.fromTo(
				subtitle,
				{ scale: 0.8, y: 50, autoAlpha: 0 },
				{ scale: 1, y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.3 }
			)
			.fromTo(
				columns,
				{ scale: 0.8, y: 50, autoAlpha: 0 },
				{ scale: 1, y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.35 }
			)
			.fromTo(
				columnsElements,
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

export default Apply;
