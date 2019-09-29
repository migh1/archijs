import Archijs from "../src/Archijs";

test('test folder nomenclature', async () => {
  const project = Archijs.parseFromPath("./test");
  const rule = await Archijs
    .defineThat()
    .dir()
    .withNameMatching('actions') // All foders that have "actions"
    .should()
    .matchChildrensName('actions') // Check if the child file filtered before has "actions" on its name
  expect(project).toMatchArch(rule);
})