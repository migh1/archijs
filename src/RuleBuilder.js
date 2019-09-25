class RuleBuilder {
  constructor() { }

  static files() {
    console.log('files');
    return this;
  }

  static withNameMatching(regex) {
    console.log(regex);
    return this;
  }
};

module.exports = {
  RuleBuilder,
};
