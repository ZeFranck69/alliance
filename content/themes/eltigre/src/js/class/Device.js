export default class Device {
	static isDesktop() {
		return window.innerWidth >= 1024;
	}
	static isMobile() {
		return window.innerWidth < 768;
	}

	static isTablet() {
		return window.innerWidth < 1024;
	}

	static isTouchDevice() {
		return window.DocumentTouch && document instanceof DocumentTouch;
	}
}
