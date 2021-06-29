import gsap from 'gsap';

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

		this.addMouseOverAnimation();
	}

	addMouseOverAnimation() {
		this.blocks.forEach((block) => {
			const title = block.querySelector('.block-circle__title');
			const content = block.querySelector('.block-circle__content');
			const animation = gsap
				.timeline()
				.to(title, { autoAlpha: 0, duration: 0.2, ease: 'power2.out' })
				.fromTo(content, { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.2, ease: 'power2.out' });
			animation.pause(0);

			block.addEventListener('mouseenter', () => animation.play());
			block.addEventListener('mouseleave', () => animation.reverse());
		});
	}
}

export default Organisation;
