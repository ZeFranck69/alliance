import Contact from './flexibles/Contact';
import Splash from './flexibles/Splash';
import Organisation from './flexibles/Organisation';
import About from './flexibles/About';
import Apply from './flexibles/Apply';
import Members from './flexibles/Members';
import AboutShort from './flexibles/AboutShort';
import ActivitiesShort from './flexibles/ActivitiesShort';
import GranteeShort from './flexibles/GranteeShort';
import GovernanceShort from './flexibles/GovernanceShort';
import InvolvedShort from './flexibles/InvolvedShort';
import Involved from './flexibles/Involved';
import News from './flexibles/News';
import ContactShort from './flexibles/ContactShort';
import Activities from './flexibles/Activities';
import Grantee from './flexibles/Grantee';
import Governance from './flexibles/Governance';
import Blog from './flexibles/Blog';

const SECTIONS = {
	contact: Contact,
	about: About,
	'about-short': AboutShort,
	'our-activities-short': ActivitiesShort,
	'grantee-short': GranteeShort,
	'governance-short': GovernanceShort,
	'involved-short': InvolvedShort,
	'contact-short': ContactShort,
	'our-activities': Activities,
	'our-grants': Grantee,
	governance: Governance,
	involved: Involved,
	news: News,
	blog: Blog,
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
