import RuleBuilderTest from "./RuleBuilderTest";
import fs from "fs";

export default class ArchJest {
  constructor() { }

  static getPath() { return this.path }
  static setPath(path) { this.path = path; }

  static getParsedPath() { return this.parsedPath }
  static setParsedPath(parsedPath) { this.parsedPath = parsedPath; }

  static getPathType() { return this.pathType }
  static setPathType(isFile) { this.pathType = isFile !== null ? isFile ? 'file' : 'dir' : null; }

  static defineThat() {
    if (this.pathType !== null) {
      return RuleBuilderTest(this.getPath(), this.getParsedPath(), this.getPathType());
    }
    throw new Error("Not a valid file/dir to continue...");
  }

  static parseFromPath(path) {
    this.load(path);
    return this.getParsedPath();
  }

  static isaValidFile(path) {
    const isValidFile = path.split("/").pop().split('.').pop().match(RegExp("^(js|jsx)$", "g"));
    const length = path.split("/").pop().split('.').pop().length;
    const isTestFile = length > 2 ? true : false;
    return isValidFile && !isTestFile;
  }

  static isFile(path) {
    return path.split("/").pop().includes('.');
  }

  static load(path) {
    this.setPath(path);
    return this.isFile(path) ? this.loadAsFile(path) : this.loadAsDir(path);
  }

  static loadAsFile(path) {
    let parsedPath = null;
    let isFile = null;
    if (this.isaValidFile(path)) {
      parsedPath = fs.readFileSync(path, "utf-8");
      isFile = isaFile;
    }
    this.setParsedPath(parsedPath);
    this.setPathType(isFile);
  }

  static loadAsDir(path) {
    this.setParsedPath(fs.readdirSync(path));
    this.setPathType(false);
  }

};

