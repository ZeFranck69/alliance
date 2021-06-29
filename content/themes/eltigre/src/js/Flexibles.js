import Contact from './flexibles/Contact';
import Organisation from './flexibles/Organisation';
import Splash from './flexibles/Splash';

const SECTIONS = {
	contact: Contact,
	organisation: Organisation,
	splash: Splash,
};

export default function FlexiblesInit() {
	for (let className in SECTIONS) {
		if (document.querySelector(`.${className}`)) {
			new SECTIONS[className](className);
		}
	}
}
