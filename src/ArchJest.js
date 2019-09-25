import { RuleBuilder } from './RuleBuilder';
import fs from "fs";

function load(path) {
  const isFile = path.split("/").pop().includes('.');
  if (isFile) {
    const isValidFile = path.split("/").pop().split('.').pop().match(RegExp("^(js|jsx)$", "g"));
    const length = path.split("/").pop().split('.').pop().length;
    const isTestFile = length > 2 ? true : false;
    if (isValidFile && !isTestFile) {
      return fs.readFileSync(path, "utf-8");
    }
    return null;
  }
  return fs.readdirSync(path);
}

class ArchJest {
  constructor() { }

  static defineThat() {
    return RuleBuilder;
  }

  static parseFromPath(path) {
    const parsedPath = load(path);
    this.setPath(path);
    this.setParsedPath(parsedPath);
    return this.getParsedPath();
  }

  static getPath() {
    console.log(this.path);
    return this;
  }

  static setPath(path) {
    this.path = path;
  }

  static getParsedPath() {
    console.log(this.parsedPath);
    return this;
  }

  static setParsedPath(parsedPath) {
    this.parsedPath = parsedPath;
  }
};

module.exports = {
  ArchJest,
};
