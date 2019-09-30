class RuleBuilder {
  constructor(path, parsedPath, pathType) {
    this.path = path;
    this.parsedPath = parsedPath;
    this.pathType = pathType;
    this.nextCall = pathType;
  }

  folder() { this.nextCall = 'withNameMatching'; return; }
  files() { this.nextCall = 'withNameMatching'; return; }
  withNameMatching(regex) { this.nextCall = 'should'; this.parentRegex = regex; }
  should() { this.nextCall = 'matchChildrensName'; return; }
  matchChildrensName(regex) {
    return {
      pathType: this.pathType,
      parentRegex: this.parentRegex,
      childRegex: regex,
    }
  }

  Init() {
    switch (this.nextCall) {
      case 'files': return { files: (...source) => { this.files(...source); return this.Init('withNameMatching') } }
      case 'folder': return { folder: (...source) => { this.folder(...source); return this.Init('withNameMatching') } }
      case 'withNameMatching': return { withNameMatching: (...source) => { this.withNameMatching(...source); return this.Init('should') } }
      case 'should': return { should: (...source) => { this.should(...source); return this.Init('matchChildrensName') } }
      case 'matchChildrensName': return { matchChildrensName: (...source) => this.matchChildrensName(...source) }
    }
  }
}

function init(...params) {
  return new RuleBuilder(...params).Init();
}

module.exports = init;
