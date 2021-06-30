import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class Organisation {
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
		this.blocks = section.querySelectorAll('.block-circle');

		this.animate();
		this.addBlocksMouseOverAnimation();
	}

	animate() {
		const blocksWrapper = this.section.querySelector('.blocks');
		const blocks = this.section.querySelectorAll('.block');
		const blocksElements = blocksWrapper.querySelectorAll('.block__title, .block__picto, .content__paragraph');
		const blocksCircles = this.section.querySelector('.blocks-circles');

		const animation = gsap
			.timeline()
			.fromTo(
				blocks,
				{ scale: 0.5, y: 50, autoAlpha: 0 },
				{ scale: 1, y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6 }
			)
			.fromTo(blocksCircles, { x: 100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.1, duration: 0.3 })
			.fromTo(
				blocksElements,
				{ y: 20, autoAlpha: 0 },
				{ y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.25, ease: 'power2.out' }
			);

		ScrollTrigger.create({
			trigger: blocksWrapper,
			start: 'top bottom-=10%',
			toggleActions: 'play none none reverse',
			animation,
		});
	}

	addBlocksMouseOverAnimation() {
		this.blocks.forEach((block) => {
			const title = block.querySelector('.block-circle__title');
			const content = block.querySelector('.block-circle__content');
			const animation = gsap
				.timeline()
				.to(title, { autoAlpha: 0, scale: 0.5, duration: 0.15, ease: 'power2.out' })
				.fromTo(content, { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.15, ease: 'power2.out' });
			animation.pause(0);

			block.addEventListener('mouseenter', () => animation.play());
			block.addEventListener('mouseleave', () => animation.reverse());
		});
	}
}

export default Organisation;
