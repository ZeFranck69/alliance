import Contact from './flexibles/Contact';
import Splash from './flexibles/Splash';
import Organisation from './flexibles/Organisation';
import About from './flexibles/About';
import Apply from './flexibles/Apply';
import Members from './flexibles/Members';

const SECTIONS = {
	contact: Contact,
	about: About,
	apply: Apply,
	organisation: Organisation,
	splash: Splash,
	members: Members,
};

export default function FlexiblesInit() {
	for (let className in SECTIONS) {
		if (document.querySelector(`.${className}`)) {
			new SECTIONS[className](className);
		}
	}
}
