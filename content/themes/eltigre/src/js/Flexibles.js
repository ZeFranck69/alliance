import Contact from './flexibles/Contact';
import Organisation from './flexibles/Organisation';

const SECTIONS = {
	contact: Contact,
	organisation: Organisation,
};

export default function FlexiblesInit() {
	for (let className in SECTIONS) {
		if (document.querySelector(`.${className}`)) {
			new SECTIONS[className](className);
		}
	}
}
