import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class Activities {
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
		const section = this.section.querySelector('.our-activities');
		const activitiesWrapper = this.section.querySelector('.our-activities-wrapper');
		const twoblocks = activitiesWrapper.querySelector('.two-blocks__wrapper');
		const twoblock = twoblocks.querySelectorAll('.two-blocks__block');
		const threeblocksTitle = activitiesWrapper.querySelector('.three-blocks__title');
		const threeblocksDescription = activitiesWrapper.querySelector('.three-blocks__description');
		const threeblocks = activitiesWrapper.querySelector('.three-blocks__wrapper');
		const threeblock = threeblocks.querySelectorAll('.three-blocks__block');

		const animation = gsap
			.timeline()
			.fromTo(twoblock, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 })
			.fromTo(threeblocksTitle, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 })
			.fromTo(
				threeblocksDescription,
				{ scale: 0.8, autoAlpha: 0 },
				{ scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 }
			)
			.fromTo(threeblock, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.4, duration: 0.5 });

		ScrollTrigger.create({
			trigger: section,
			start: 'top bottom-=10%',
			toggleActions: 'play none none reverse',
			animation,
		});
	}
}

export default Activities;
