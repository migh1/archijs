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

export default class RuleBuilder {
  constructor(path, parsedPath, pathType) {
    this.parsedPath = parsedPath;
    this.pathType = pathType;
    this.path = path;
    this.dirRegex = null;
    this.nameMatching = null;
    this.childrensName = null;
  }

  isFile(path) {
    return path.split("/").pop().includes('.');
  }

  files() {
    return this;
  }

  // TODO: Fix the async getFiles method due to should() been calling at the same time.
  withNameMatching(regex) {
    this.dirRegex = regex;
    if (this.pathType === 'dir') {
      getFiles(this.path, regex)
        .then(files => this.nameMatching = files)
        .catch(e => console.error(e));
    }
    return this;
  }

  should() {
    return this;
  }

  // TODO: remove timeOut to work with async getFiles method
  matchChildrensName(regex) {
    setTimeout(() => {
      this.childrensName = this.nameMatching.filter(g => !g.split('/')[g.split('/').length - 1].match(new RegExp(`${regex}`, 'mi')))
      console.log(this.childrensName);
      return this.childrensName;
    }, 200);
  }
};

