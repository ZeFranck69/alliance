import { initSwipers } from '../utils/functions.js';
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
import InfiniteScroll from 'infinite-scroll';
import { post } from '../utils/functions';

class Blog {
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
		this.postsPerPage = section.dataset.postsPerPage || 6;
		this.postsContainer = section.querySelector('.posts__list');
		// this.loadMoreButton = section.querySelector('.recipes__load-more');
		this.animate();
		this.initInfiniteScroll();
	}
	initInfiniteScroll = () => {
		const path = 'page/{{#}}';
		// this.loadMoreButton.style.display = 'inline-block';

		this.InfiniteScroll = new InfiniteScroll(this.postsContainer, {
			path,
			append: '.post',
			status: '.page-load-status',
			hideNav: '.pagination',
			// button: this.loadMoreButton,
			scrollThreshold: true,
			history: true,
		});

		this.InfiniteScroll.on('append', (body, path, items) => {
			if (items.length < 6) {
				this.InfiniteScroll.destroy();
				// this.loadMoreButton.style.display = 'none';
			}
		});
	};
	animate() {
		const blogSection = this.section;
		const title = blogSection.querySelector('.section_blog__title ');
		const hook = blogSection.querySelector('.section-blog__hook');
		const description = blogSection.querySelector('.section-blog__paragraph');
		const posts = blogSection.querySelector('.posts__list');
		const post = posts.querySelectorAll('.post');

		const animation = gsap.timeline();

		animation.fromTo(title, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.01, duration: 0.45 });
		if (hook) {
			animation.fromTo(hook, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.01, duration: 0.45 });
		}
		if (description) {
			animation.fromTo(description, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.01, duration: 0.45 });
		}
		if (posts) {
			animation.fromTo(post, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.35 });
		}

		ScrollTrigger.create({
			trigger: blogSection,
			start: 'top bottom-=5%',
			toggleActions: 'play none none none',
			animation,
		});
	}
}

export default Blog;
