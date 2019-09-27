import ArchJest from "../src/ArchJest";
import RuleBuilderTest from "../src/RuleBuilderTest";
const rule = new RuleBuilderTest('a', 'b', 'c');
rule
  .dir('./src', 'potato')
  .withNameMatching('oi')
  // .should()
  // .matchChildrensName()
// const project = ArchJest.parseFromPath("./test/actions/testActions.js");
// const project = ArchJest.parseFromPath("./test");
// (async () => {
//   const rule = await ArchJest
//     .defineThat()
//     .files()
//     .withNameMatching('actions') // All foders that have "actions"
//     .should()
//     .matchChildrensName('actions') // Check if the child file filtered before has "actions" on its name
// })()

