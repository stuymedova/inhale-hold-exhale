export default class StateMachine {
  constructor(states, initialState) {
    this.states = states;
    this.currentState = initialState;
  }

  enterNextState() {
    this.currentState = this.states[this.currentState];
  }
}
