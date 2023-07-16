import StateMachine from './StateMachine.js';
import Indicator from './Indicator.js';
import Caption from './Caption.js';

export default class App {
	inhaleDuration = 4; // in sec
	holdDuration = 7; // in sec
	exhaleDuration = 8; // in sec

	constructor() {
		const states = {
			inhale: 'hold',
			hold: 'exhale',
			exhale: 'inhale',
		};
		const initialState = 'inhale';
		const indicator = new Indicator();
		const caption = new Caption();

		this.stateMachine = new StateMachine(states, initialState);
		this.animate(indicator, caption);
	}

	animate(indicator, caption) {
		const currentState = this.stateMachine.currentState;
		let timeoutTime = 0;

		if (currentState === 'inhale') {
			indicator.expand(this.inhaleDuration);
			caption.setTo(currentState);
			timeoutTime = this.inhaleDuration;
		}
		else if (currentState === 'hold') {
			caption.setTo(currentState);
			timeoutTime = this.holdDuration;
		}
		else if (currentState === 'exhale') {
			caption.setTo(currentState);
			indicator.contract(this.exhaleDuration);
			timeoutTime = this.exhaleDuration;
		}

		// Delay further execution for some time
		setTimeout(() => {
			this.stateMachine.enterNextState();
			this.animate(indicator, caption);
		}, timeoutTime * 1000);
	}
}
