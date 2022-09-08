export default class Map {
	constructor(className) {
		const sections = document.querySelectorAll(`.${className}`);
		sections.forEach((section) => new Section(section));
	}
}

class Section {
	get height() {
		return this.section.clientHeight;
	}

	get width() {
		return this.section.clientWidth;
	}

	get tooltipWidth() {
		return this.tooltipEl.clientWidth;
	}

	get tooltipHeight() {
		return this.tooltipEl.clientHeight;
	}

	constructor(section) {
		this.section = section;
		this.tooltipEl = section.querySelector('.tooltip');
		this.init();
	}

	getActivePinPosition() {
		const style = getComputedStyle(this.activePin);
		return { x: style.left, y: style.top };
	}

	init() {
		this.pins = [...this.section.querySelectorAll('.pin')].forEach((pin) => {
			pin.addEventListener('click', (ev) => {
				ev.stopPropagation();

				this.activePin = pin;
				this.setTooltipData();
				this.setTooltipPosition();
				this.openTooltip();
			});

			this.tooltipEl.addEventListener('click', (ev) => ev.stopPropagation());
			document.body.addEventListener('keydown', (ev) => (ev.key === 'Escape' ? this.closeTooltip() : null));
			document.body.addEventListener('click', this.closeTooltip.bind(this));
		});

		window.addEventListener('resize', this.setTooltipPosition.bind(this));
	}

	setTooltipData() {
		this.clearTooltip();

		const { title, logo, content, links } = JSON.parse(this.activePin.dataset.pin);

		// Title
		this.tooltipEl.querySelector('.tooltip__title').innerHTML = title;

		// Content
		this.tooltipEl.querySelector('.tooltip__content').innerHTML = content;

		// Logo
		if (logo) {
			const logoContainer = this.tooltipEl.querySelector('.tooltip__logo');
			const img = document.createElement('img');
			img.src = logo.url;
			img.alt = logo.alt;
			logoContainer.appendChild(img);
		}

		// Links
		if (Array.isArray(links)) {
			links.forEach(({ link }) => {
				const a = document.createElement('a');
				a.href = link.url;
				a.textContent = link.title;
				a.target = link.target;
				this.tooltipEl.querySelector('.tooltip__links').appendChild(a);
			});
		}
	}

	clearTooltip() {
		this.tooltipEl.querySelector('.tooltip__title').innerHTML = '';
		this.tooltipEl.querySelector('.tooltip__content').innerHTML = '';
		this.tooltipEl.querySelector('.tooltip__logo').innerHTML = '';
		this.tooltipEl.querySelector('.tooltip__links').innerHTML = '';
	}

	setTooltipPosition() {
		const { x, y } = this.getActivePinPosition();
		const offset = window.innerWidth * 0.018;

		const isMobile = window.innerWidth < 768;
		if (isMobile) {
			this.tooltipEl.style.top = `${parseInt(y)}px`;
			this.tooltipEl.style.left = `${parseInt(x)}px`;
			return;
		}

		// Y position
		if (parseInt(y) - this.tooltipHeight - offset > 0) {
			this.tooltipEl.style.top = parseInt(y) - offset - this.tooltipHeight + 'px';
		} else {
			this.tooltipEl.style.top = parseInt(y) + offset + 'px';
		}

		// X Position
		if (parseInt(x) + this.tooltipWidth + offset < this.width) {
			this.tooltipEl.style.left = parseInt(x) + offset + 'px';
		} else {
			this.tooltipEl.style.left = parseInt(x) - offset - this.tooltipWidth + 'px';
		}
	}

	openTooltip() {
		this.tooltipEl.style.opacity = 1;
		this.tooltipEl.style.pointerEvents = 'all';
	}

	closeTooltip() {
		this.clearTooltip();

		this.tooltipEl.style.opacity = 0;
		this.tooltipEl.style.pointerEvents = 'none';
	}
}
