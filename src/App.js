import StateMachine from './StateMachine.js';
import Indicator from './Indicator.js';

export default class App {
  inhaleDuration = 4; // in sec
  holdDuration = 7; // in sec
  exhaleDuration = 8; // in sec

  canVibrate = Boolean(navigator.vibrate);
  vibrationDuration = 400; // in msec

  constructor() {
    const states = {
      inhaling: 'holding',
      holding: 'exhaling',
      exhaling: 'inhaling',
    };
    const initialState = 'inhaling';
    const indicator = new Indicator();

    this.stateMachine = new StateMachine(states, initialState);
    this.animate(indicator);
  }

  animate(indicator) {
    const currentState = this.stateMachine.currentState;
    let timeoutTime = 0;

    if (currentState === 'inhaling') {
      if (this.canVibrate) {
        navigator.vibrate(this.vibrationDuration);
      }
      indicator.expand(this.inhaleDuration);
      timeoutTime = this.inhaleDuration;
    }

    if (currentState === 'holding') {
      if (this.canVibrate) {
        navigator.vibrate(this.vibrationDuration);
      }
      timeoutTime = this.holdDuration;
    }

    if (currentState === 'exhaling') {
      if (this.canVibrate) {
        navigator.vibrate([this.vibrationDuration, this.vibrationDuration]);
      }
      indicator.contract(this.exhaleDuration);
      timeoutTime = this.exhaleDuration;
    }

    // Delay further execution for some time
    setTimeout(() => {
      this.stateMachine.enterNextState();
      this.animate(indicator);
    }, timeoutTime * 1000);
  }
}
