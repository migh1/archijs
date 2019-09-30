const Archijs = require("../src/Archijs");

test('Should have fileName according to folderName', () => {
  const project = Archijs.parseFromPath("./test");
  const rule = Archijs
    .defineThat()
    .folder()
    .withNameMatching('actions') // All foders that have "actions"
    .should()
    .matchChildrensName('actions') // Check if the child file filtered before has "actions" on its name

  expect(project).toMatchArch(rule);
})