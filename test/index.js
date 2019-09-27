import ArchJest from "../src/ArchJest";

(async () => {
  const project = ArchJest.parseFromPath("./test");
  const rule = ArchJest
    .defineThat()
    .dir()
    .withNameMatching('actions') // All foders that have "actions"
    .should()
    .matchChildrensName('actions') // Check if the child file filtered before has "actions" on its name
})()


