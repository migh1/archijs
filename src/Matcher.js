expect.extend({
  toMatchArch(received, matcher) {
    if (received === undefined || received === null) {
      return {
        pass: false,
        message: () => 'Your expect must have something'
      };
    }
    if (this.isNot) {
      expect(matcher).not.toHaveLength(0);
    } else {
      expect(matcher).toHaveLength(0);
    }
    return { pass: !this.isNot }
  }
});