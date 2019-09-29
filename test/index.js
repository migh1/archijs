import Archijs from "../src/Archijs";

(async () => {
  const project = Archijs.parseFromPath("./test");
  const rule = Archijs
    .defineThat()
    .dir()
    .withNameMatching('actions') // All foders that have "actions"
    .should()
    .matchChildrensName('actions') // Check if the child file filtered before has "actions" on its name
})()


