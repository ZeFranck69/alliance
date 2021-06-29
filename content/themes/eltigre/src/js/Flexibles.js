import Contact from './flexibles/Contact';

const SECTIONS = {
	contact: Contact,
};

export default function FlexiblesInit() {
	for (let className in SECTIONS) {
		if (document.querySelector(`.${className}`)) {
			new SECTIONS[className](className);
		}
	}
}
