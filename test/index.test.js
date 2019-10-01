const Archijs = require("archijs");

test('Should have fileName according to folderName', () => {
  const project = Archijs.parseFromPath('test');
  const rule = Archijs
    .defineThat()
    .folder()
    .withNameMatching('actions')
    .should()
    .matchChildrensName('actions')

  expect(project).toMatchArch(rule);
})