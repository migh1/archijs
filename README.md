![npm](https://img.shields.io/npm/v/archijs)
![GitHub](https://img.shields.io/github/license/migh1/archijs)
![GitHub followers](https://img.shields.io/github/followers/migh1?label=%40migh1&style=social)

# archijs

A package to test javascript architecture

## Usage

```bash
yarn add archijs
```

```javascript
import Archijs from "archijs";

describe("Javascript Architecture", () => {
  it("Should have fileName according to folderName", () => {
    const project = Archijs.parseFromPath("src");
    
    const rule = Archijs
      .defineThat()
      .folder()
      .withNameMatching('actions') // All foders that have "actions" in the name
      .should()
      .matchChildrensName('actions') // Check if the child file filtered before has "actions" on its name

    expect(project).toMatchArch(rule); // Working
  });
});
```

## Demo

![Usage demo](demo/demo.gif)

## Todo

- [x] Fix async issue on chained functions.
- [x] Implement @types/jest.
- [x] Remove async/await on test using
- [x] Remove Babel
- [ ] Implement feature to read file content and validates the functions names.
- [ ] Improve dir name validation.
- [ ] Add exceptions validation.

## Suggestions

- Please any suggestion you are invited to open an issue: https://github.com/migh1/archijs/issues
- You also can fork this project to contribute 

