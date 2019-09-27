export class RuleBuilderTest {
  constructor() {
    this.dir = this.dir.bind(this);
    this.files = this.files.bind(this);
    this.should = this.should.bind(this);
    this.withNameMatching = this.withNameMatching.bind(this);
    this.matchChildrensName = this.matchChildrensName.bind(this);
  }

  isFile(path) {
    return path.split("/").pop().includes('.');
  }

  asyncDir(callback) {
    console.log('asyncDir() called')
    setTimeout(() => { console.log('asyncDir() result'); callback() }, 1000);
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
    setTimeout(() => { console.log('asyncWithNameMatching() result'); callback() }, 100);
  }

  asyncMatchChildrensName(callback) {
    console.log('asyncMatchChildrensName() called')
    setTimeout(() => { console.log('asyncMatchChildrensName() result'); callback() }, 100);
  }

  dir(...source) { return new Promise(resolve => this.asyncDir(resolve)) }
  files(...source) { return new Promise(resolve => this.asyncFiles(resolve)) }
  should(...source) { return new Promise(resolve => this.asyncShould(resolve)) }
  withNameMatching(...source) { return new Promise(resolve => this.asyncWithNameMatching(resolve)) }
  matchChildrensName(...source) { return new Promise(resolve => this.asyncMatchChildrensName(resolve)) }

  initlzr(previousActions, ...params) {
    return {
      dir: (...source) => this.initlzr(previousActions.then(() => this.dir(...source)), ...params),
      files: (...source) => this.initlzr(previousActions.then(() => this.files(...source)), ...params),
      should: (...source) => this.initlzr(previousActions.then(() => this.should(...source)), ...params),
      withNameMatching: (...source) => this.initlzr(previousActions.then(() => this.withNameMatching(...source)), ...params),
      matchChildrensName: (...source) => this.initlzr(previousActions.then(() => this.matchChildrensName(...source)), ...params),
    };
  }
}

function init(...params) {
  return new RuleBuilderTest().initlzr(Promise.resolve(), ...params);
}

export default init;