import ArchJest from "../src/ArchJest";

// const project = ArchJest.parseFromPath("./test/actions/testActions.js");
const project = ArchJest.parseFromPath("./test");
(async () => {
  const rule = await ArchJest
    .defineThat()
    .files()
    .withNameMatching(/\/*.actions.*\//mi) // All foders that have "actions"
    .should()
    .matchChildrensName(/.actions./mi) // Check if the child file filtered before has "actions" on its name
})()

