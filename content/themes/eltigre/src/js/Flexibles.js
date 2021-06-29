import Contact from './flexibles/Contact';
import Organisation from './flexibles/Organisation';
<<<<<<< HEAD
import About from './flexibles/About';
import Apply from './flexibles/Apply';
=======
import Splash from './flexibles/Splash';
>>>>>>> b25d2729629e3466ea96af94485166b6f5c4fdc6

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
