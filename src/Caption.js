export default class Caption {
	constructor() {
	  	this.element = document.getElementById('caption');
		this.animationDuration = 200;
		this.element.style.transition = `opacity ${this.animationDuration}ms`;
	}

	setTo(caption) {
		this.element.classList.add('hidden');

		setTimeout(() => {
			this.element.textContent = caption;
			this.element.classList.remove('hidden');
		}, this.animationDuration)
	}
}
