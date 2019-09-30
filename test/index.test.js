import Archijs from "../src/Archijs";

test('test folder nomenclature', () => {
  const project = Archijs.parseFromPath("./test");
  const rule = Archijs
    .defineThat()
    .folder()
    .withNameMatching('actions') // All foders that have "actions"
    .should()
    .matchChildrensName('actions') // Check if the child file filtered before has "actions" on its name

  expect(project).toMatchArch(rule);
})