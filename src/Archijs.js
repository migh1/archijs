const RuleBuilder = require("./RuleBuilder");
const Matcher = require("./Matcher");
const fs = require("fs");
const fspath = require('path');

class Archijs {
  constructor() { }

  getPath() { return this.path }
  setPath(path) { this.path = path; }

  getParsedPath() { return this.parsedPath }
  setParsedPath(parsedPath) { this.parsedPath = parsedPath; }

  getPathType() { return this.pathType }
  setPathType(isFile) { this.pathType = isFile !== null ? isFile ? 'file' : 'folder' : null; }

  defineThat() {
    if (this.pathType !== null) {
      return RuleBuilder(this.getPath(), this.getParsedPath(), this.getPathType());
    }
    throw `Not a valid file/folder to continue...`;
  }

  parseFromPath(path) {
    if (typeof path === 'string') {
      this.load(path);
      return this.getParsedPath();
    } else {
      throw `parseFromPath() param must be a string, received: ${typeof path}`;
    }
  }

  isaValidFile(path) {
    const isValidFile = path.split("/").pop().split('.').pop().match(RegExp("^(js|jsx)$", "g"));
    const length = path.split("/").pop().split('.').pop().length;
    const isTestFile = length > 2 ? true : false;
    return isValidFile && !isTestFile;
  }

  traverseDir(dir, parsedPath) {
    if (!dir.match('node_modules') && fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        let fullPath = fspath.join(dir, file).replace(/\\/g, '/');
        parsedPath.push(fullPath);
        if (fs.lstatSync(fullPath).isDirectory()) {
          this.traverseDir(fullPath, parsedPath);
        }
      });
    }
    return parsedPath;
  }

  load(path) {
    this.setPath(path);
    const isFile = path.split("/").pop().includes('.');
    this.setPathType(isFile);
    return isFile ? this.loadAsFile(path) : this.loadAsDir(path);
  }

  loadAsFile(path) {
    let parsedPath = null;
    let isFile = null;
    if (this.isaValidFile(path)) {
      parsedPath = fs.readFileSync(path, "utf8");
      isFile = isaFile;
    }
    this.setParsedPath(parsedPath);
  }

  loadAsDir(path) {
    this.setParsedPath(this.traverseDir(path, []));
  }
};

module.exports = new Archijs();
