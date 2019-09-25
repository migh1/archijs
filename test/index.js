import printMsg from "../src/printMsg";
import { ArchJest } from "../src/ArchJest";

printMsg("test");
const project = ArchJest.parseFromPath("./test/actions/testActions.js");

const rule = ArchJest
  .getPath()
  .defineThat()
  .files()
  .withNameMatching('potato')


