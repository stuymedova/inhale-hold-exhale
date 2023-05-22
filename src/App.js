import StateMachine from './StateMachine.js';
import Indicator from './Indicator.js';

export default class App {
  inhaleDuration = 4;
  holdDuration = 7;
  exhaleDuration = 8;

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
      indicator.expand(this.inhaleDuration);
      timeoutTime = this.inhaleDuration;
    }
    
    if (currentState === 'holding') {
      timeoutTime = this.holdDuration;
    }
    
    if (currentState === 'exhaling') {
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
