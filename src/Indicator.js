export default class Indicator {
	constructor() {
		this.element = document.getElementById('indicator');
	}

	expand(duration) {
		this.element.style.transition = `transform ${duration}s ease-out`;
		this.element.style.transform = 'scale(2)';
	}

	contract(duration) {
		this.element.style.transition = `transform ${duration}s ease-out`;
		this.element.style.transform = 'scale(1)';
	}
}
