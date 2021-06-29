import Form from '../class/Form';
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
}

export default Contact;
