function isFile(path) {
  return path.split("/").pop().includes('.');
}

function filterParsedPath(received, regex) {
  return received.filter(f => isFile(f) && f.match(new RegExp(`\/*.${regex}.*\/`, 'mi')))
}

expect.extend({
  toMatchArch(received, expected) {
    switch (expected.pathType) {
      case 'folder':
        const folderNameMatch = filterParsedPath(received, expected.parentRegex);
        const fileNameMatch = folderNameMatch.filter(g => !g.split('/')[g.split('/').length - 1].match(new RegExp(`${expected.childRegex}`, 'mi')));

        const options = {
          comment: 'Array.length equality',
          isNot: this.isNot,
          promise: this.promise,
        };

        const pass = fileNameMatch.length === 0;

        const message = pass
          ? this.utils.matcherHint('toBe', undefined, undefined, options) +
          '\n\n' +
          `Expected: ${this.utils.printExpected(0)}\n` +
          `Received: ${this.utils.printReceived(fileNameMatch.length)}`
          : this.utils.matcherHint('toBe', undefined, undefined, options) +
          '\n\n' +
          `Expected: ${this.utils.printExpected([])}\n` +
          `Received: ${this.utils.printReceived(fileNameMatch)}`;

        return { actual: received, message, pass };
      case 'files':
        return { actual: received, message: 'Not implemented yet', pass: true };
      default:
        return { actual: received, message: 'Not implemented yet', pass: true };
    }
  },
});
