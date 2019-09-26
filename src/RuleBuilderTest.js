export class RuleBuilderTest {
  constructor() {
    this.dir = this.dir.bind(this);
    this.files = this.files.bind(this);
    this.should = this.should.bind(this);
    this.withNameMatching = this.withNameMatching.bind(this);
    this.matchChildrensName = this.matchChildrensName.bind(this);
  }
  asyncDir(callback) {
    console.log('asyncDir() called')
    setTimeout(() => { console.log('asyncDir() result'); callback() }, 100);
  }

  asyncFiles(callback) {
    console.log('asyncFiles() called')
    setTimeout(() => { console.log('asyncFiles() result'); callback() }, 100);
  }

  asyncShould(callback) {
    console.log('asyncShould() called')
    setTimeout(() => { console.log('asyncShould() result'); callback() }, 100);
  }

  asyncWithNameMatching(callback) {
    console.log('asyncWithNameMatching() called')
    setTimeout(() => { console.log('asyncWithNameMatching() result'); callback() }, 100);
  }

  asyncMatchChildrensName(callback) {
    console.log('asyncMatchChildrensName() called')
    setTimeout(() => { console.log('asyncMatchChildrensName() result'); callback() }, 100);
  }

  dir(...source) { console.log(...source); return new Promise(resolve => this.asyncDir(resolve)) }
  files(...source) { console.log(...source); return new Promise(resolve => this.asyncFiles(resolve)) }
  should(...source) { console.log(...source); return new Promise(resolve => this.asyncShould(resolve)) }
  withNameMatching(...source) { console.log(...source); return new Promise(resolve => this.asyncWithNameMatching(resolve)) }
  matchChildrensName(...source) { console.log(...source); return new Promise(resolve => this.asyncMatchChildrensName(resolve)) }

  initlzr(previousActions, ...params) {
    return {
      dir: (...source) => this.initlzr(previousActions.then(this.dir(...source)), ...params),
      files: (...source) => this.initlzr(previousActions.then(this.files(...source)), ...params),
      should: (...source) => this.initlzr(previousActions.then(this.should(...source)), ...params),
      withNameMatching: (...source) => this.initlzr(previousActions.then(this.withNameMatching(...source)), ...params),
      matchChildrensName: (...source) => this.initlzr(previousActions.then(this.matchChildrensName(...source)), ...params),
    };
  }
}

function init(...params) {
  return new RuleBuilderTest().initlzr(Promise.resolve(), ...params);
}

export default init;