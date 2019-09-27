const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getFiles(dir, regex) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res, regex) : res;
  }));
  return files
    .reduce((a, f) => a.concat(f), [])
    .map(m => m.replace(/\\/g, '/'))
    .filter(f => f.match(new RegExp(`\/*.${regex}.*\/`, 'mi')))
  // .filter(g => g.split('\\').splice(g.split('\\').length - 1, 1).join('\\').match(regex))
}

export class RuleBuilderTest {
  constructor(path, parsedPath, pathType) {
    this.path = path;
    this.parsedPath = parsedPath;
    this.pathType = pathType;
  }

  isFile(path) {
    return path.split("/").pop().includes('.');
  }

  asyncDir(resolve) {
    resolve();
  }

  asyncFiles(resolve) {
    resolve();
  }

  asyncShould(resolve) {
    resolve();
  }

  asyncWithNameMatching(regex, resolve) {
    this.dirRegex = regex;
    if (this.pathType === 'dir') {
      getFiles(this.path, regex)
        .then(files => { this.nameMatching = files; resolve() })
        .catch(e => console.error(e));
    }
  }

  asyncMatchChildrensName(regex, resolve) {
    this.childrensName = this.nameMatching.filter(g => !g.split('/')[g.split('/').length - 1].match(new RegExp(`${regex}`, 'mi')))
    console.log(this.childrensName);
    resolve();
  }

  dir(...source) { return new Promise(resolve => this.asyncDir(resolve)) }
  files(...source) { return new Promise(resolve => this.asyncFiles(resolve)) }
  should(...source) { return new Promise(resolve => this.asyncShould(resolve)) }
  withNameMatching(...source) { return new Promise(resolve => this.asyncWithNameMatching(...source, resolve)) }
  matchChildrensName(...source) { return new Promise(resolve => this.asyncMatchChildrensName(...source, resolve)) }

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
  return new RuleBuilderTest(...params).initlzr(Promise.resolve(), ...params);
}

export default init;