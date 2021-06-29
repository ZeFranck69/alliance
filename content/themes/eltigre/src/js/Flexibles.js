import Contact from './flexibles/Contact';
import Organisation from './flexibles/Organisation';
import About from './flexibles/About';
import Apply from './flexibles/Apply';
import Splash from './flexibles/Splash';

const SECTIONS = {
	contact: Contact,
	about: About,
	apply: Apply,
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
