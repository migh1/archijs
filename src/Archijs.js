import RuleBuilder from "./RuleBuilder";
import Matcher from "./Matcher";
import fs from "fs";
import fspath from 'path';

class Archijs {
  constructor() { }

  getPath() { return this.path }
  setPath(path) { this.path = path; }

  getParsedPath() { return this.parsedPath }
  setParsedPath(parsedPath) { this.parsedPath = parsedPath; }

  getPathType() { return this.pathType }
  setPathType(isFile) { this.pathType = isFile !== null ? isFile ? 'file' : 'dir' : null; }

  defineThat() {
    if (this.pathType !== null) {
      return RuleBuilder(this.getPath(), this.getParsedPath(), this.getPathType());
    }
    throw new Error("Not a valid file/dir to continue...");
  }

  parseFromPath(path) {
    this.load(path);
    return this.getParsedPath();
  }

  isaValidFile(path) {
    const isValidFile = path.split("/").pop().split('.').pop().match(RegExp("^(js|jsx)$", "g"));
    const length = path.split("/").pop().split('.').pop().length;
    const isTestFile = length > 2 ? true : false;
    return isValidFile && !isTestFile;
  }

  isFile(path) {
    return path.split("/").pop().includes('.');
  }

  traverseDir(dir, parsedPath) {
    if (!dir.match('node_modules')) {
      fs.readdirSync(dir).forEach(file => {
        let fullPath = fspath.join(dir, file);
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
    return this.isFile(path) ? this.loadAsFile(path) : this.loadAsDir(path);
  }

  loadAsFile(path) {
    let parsedPath = null;
    let isFile = null;
    if (this.isaValidFile(path)) {
      parsedPath = fs.readFileSync(path, "utf-8");
      isFile = isaFile;
    }
    this.setParsedPath(parsedPath);
    this.setPathType(isFile);
  }

  loadAsDir(path) {
    const parsedPath = [];
    this.setParsedPath(this.traverseDir(path, parsedPath));
    this.setPathType(false);
  }
};

export default new Archijs();

