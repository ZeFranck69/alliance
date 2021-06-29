import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

<<<<<<< HEAD
class Organisation {
=======
class Splash {
>>>>>>> b25d2729629e3466ea96af94485166b6f5c4fdc6
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
<<<<<<< HEAD
		this.blocks = section.querySelectorAll('.block-circle');

		this.animate();
		this.parallax();
		this.addBlocksMouseOverAnimation();
	}

	parallax() {
		const image = this.section.querySelector('.organisation__image');
		const animation = gsap.fromTo(image, { backgroundPositionY: '40%' }, { backgroundPositionY: '0%', ease: 'linear' });
		ScrollTrigger.create({
			trigger: image,
			start: 'top bottom-=10%',
			end: 'bottom+=500 bottom-=10%',
			scrub: true,
			animation,
		});
	}
	animate() {
		const blocksWrapper = this.section.querySelector('.blocks');
		const blocks = this.section.querySelectorAll('.block');
		const blocksElements = blocksWrapper.querySelectorAll('.block__title, .block__picto, .content__paragraph');
		const animation = gsap
			.timeline()
			.fromTo(
				blocks,
				{ scale: 0.8, y: 50, autoAlpha: 0 },
				{ scale: 1, y: 0, autoAlpha: 1, stagger: 0.1, ease: 'back.out', duration: 0.25 }
			)
			.fromTo(
				blocksElements,
				{ y: 20, autoAlpha: 0 },
				{ y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.15, ease: 'power2.out' }
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
				.to(title, { autoAlpha: 0, duration: 0.2, ease: 'power2.out' })
				.fromTo(content, { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.2, ease: 'power2.out' });
			animation.pause(0);

			block.addEventListener('mouseenter', () => animation.play());
			block.addEventListener('mouseleave', () => animation.reverse());
		});
	}
}

export default Organisation;
=======
		this.animate();
	}

	animate() {
		const logo = this.section.querySelector('.splash-content__logo');
		const text = this.section.querySelectorAll('.description > *');

		gsap
			.timeline()
			.fromTo(
				logo,
				{ autoAlpha: 0, scale: 0.1 },
				{ autoAlpha: 1, scale: 1, duration: 0.4, delay: 0.5, ease: 'back.out' }
			)
			.fromTo(
				text,
				{ y: 30, autoAlpha: 0, scale: 0.2 },
				{ y: 0, autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.2, ease: 'power2.out' }
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
>>>>>>> b25d2729629e3466ea96af94485166b6f5c4fdc6
