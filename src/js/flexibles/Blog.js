import { initSwipers } from '../utils/functions.js';
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
import InfiniteScroll from 'infinite-scroll';
import { getQueryParam, post } from '../utils/functions';

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
		this.initSearchForm();
		this.initInfiniteScroll();
	}
	initSearchForm() {
		this.form = this.section.querySelector('form.blog__search-form');
		this.searchInput = this.form.querySelector('input.blog__search-input');
		this.form.addEventListener('submit', this.search);
		this.searchInput.addEventListener('keyup', this.search);
	}
	search = (ev) => {
		ev.preventDefault();
		const searchDelay = ev.type === 'keyup' ? 1000 : 0;
		const searchValue = this.searchInput.value;
		if (this.searchTimeout) clearTimeout(this.searchTimeout);

		this.searchTimeout = setTimeout(() => {
			const args = {
				action: 'filter_posts',
				s: searchValue,
				postsPerPage: this.postsPerPage,
			};

			post(args, (response) => {
				const HTML = JSON.parse(response).data;
				this.postsContainer.innerHTML = HTML;
				this.InfiniteScroll.destroy();
				this.initInfiniteScroll();
			});
		}, searchDelay);
	};
	initInfiniteScroll = () => {
		const search = getQueryParam('s');
		if (search) {
			this.searchInput.value = search;
		}
		// const path = 'page/{{#}}';
		const path = this.searchInput.value ? `page/{{#}}?s=${this.searchInput.value}` : 'page/{{#}}';
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
