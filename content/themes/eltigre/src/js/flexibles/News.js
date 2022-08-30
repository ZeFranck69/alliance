import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

class News {
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
		const blocksWrapper = this.section.querySelector('.news');
		const news = this.section.querySelector('.news-wrapper');
		const post = news.querySelectorAll('.tease');

		const animation = gsap
			.timeline()
			.fromTo(post, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.1, duration: 0.5 });

		ScrollTrigger.create({
			trigger: blocksWrapper,
			start: 'top bottom-=10%',
			toggleActions: 'play none none reverse',
			animation,
		});
	}
}

export default News;
