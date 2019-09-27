import ArchJestTest from "../src/ArchJestTest";

(async () => {
  const project = ArchJestTest.parseFromPath("./test");
  const rule = await ArchJestTest
    .defineThat()
    .dir()
    .withNameMatching('actions') // All foders that have "actions"
    .should()
    .matchChildrensName('actions') // Check if the child file filtered before has "actions" on its name
})()


