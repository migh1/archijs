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
  setPathType(pathType) { this.pathType = pathType; }

  defineThat() {
    return RuleBuilder(this.getPath(), this.getParsedPath(), this.getPathType());
  }

  parseFromPath(path) {
    if (typeof path === 'string') {
      this.load(path);
      return this.getParsedPath();
    } else {
      throw `parseFromPath() param must be a string, received: ${typeof path}`;
    }
  }

  isValidExtension(extensions) {
    if (extensions.length === 1) {
      if (extensions[0] === 'node_modules') {
        return false;
      }
      return true;
    } else {
      if (extensions.includes('spec') || extensions.includes('test')) {
        return false;
      }
      return true;
    }
  }

  // isaValidFile(path) {
  //   const extensions = path.split("/").pop().split('.');
  //   const isValidFile = this.isValidExtension(extensions);

  //   const length = path.split("/").pop().split('.').pop().length;
  //   const isTestFile = length > 2 ? true : false;
  //   return isValidFile && !isTestFile;
  // }

  traverseDir(dir, parsedPath) {
    if (!dir.match('node_modules') && fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        let fullPath = fspath.join(dir, file).replace(/\\/g, '/');
        const extensions = fullPath.split('/').pop().split('.');
        if (this.isValidExtension(extensions)) {
          parsedPath.push(fullPath);
        }
        if (fs.lstatSync(fullPath).isDirectory()) {
          this.traverseDir(fullPath, parsedPath);
        }
      });
    } else {
      return parsedPath;
    }
    return parsedPath;
  }

  load(path) {
    this.setPath(path);
    const isFile = path.split("/").pop().includes('.') ? 'file' : 'folder';
    this.setPathType(isFile);
    return isFile === 'file' ? this.loadAsFile(path) : this.loadAsDir(path);
  }

  loadAsFile(path) {
    return path;
    // TODO: implement loadAsFile feature
    // let parsedPath = null;
    // if (this.isaValidFile(path)) {
    //   parsedPath = fs.readFileSync(path, "utf8");
    // }
    // this.setParsedPath(parsedPath);
  }

  loadAsDir(path) {
    this.setParsedPath(this.traverseDir(path, []));
  }
};

module.exports = new Archijs();
