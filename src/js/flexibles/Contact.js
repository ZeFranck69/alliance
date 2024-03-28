import Form from '../class/Form';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { post } from '../utils/functions';

class Contact {
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
		this.form = new Form(section.querySelector('form'), {
			onSubmit: this.onSubmit,
		});
		// this.animate();
	}

	onSubmit = () => {
		post(
			{
				form: this.form.el,
				action: 'submit_contact_form',
			},
			this.onSubmitResponse,
			true
		);
	};

	onSubmitResponse = (res) => {
		const parsedRes = JSON.parse(res);
		if (parsedRes.success) {
			this.form.submitButton.success(site.translations.contact.message_sent);
			this.form.disabled = true;
		} else {
			this.form.displayErrors([site.translations.contact.error]);
			this.form.submitButton.reset();
			this.form.disabled = false;
		}
	};
	animate() {
		const blocksWrapper = this.section.querySelector('.contact__form');
		const inputs = blocksWrapper.querySelectorAll('.contact__input-wrapper');
		const textArea = blocksWrapper.querySelectorAll('.textarea-wrapper');
		const cta = blocksWrapper.querySelectorAll('.button__wrapper');

		const animation = gsap
			.timeline()
			.fromTo(inputs, { scale: 0.4, y: 50, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, duration: 0.6 })
			.fromTo(textArea, { scale: 0.4, y: 50, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, duration: 0.3 })
			.fromTo(cta, { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.3 });

		ScrollTrigger.create({
			trigger: blocksWrapper,
			start: 'top bottom-=10%',
			toggleActions: 'play none none reverse',
			animation,
		});
	}
}

export default Contact;
