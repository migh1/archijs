![npm](https://img.shields.io/npm/v/archijs)
![NPM](https://img.shields.io/npm/l/archijs)
![GitHub followers](https://img.shields.io/github/followers/migh1?label=%40migh1&style=social)

# archijs

A package to test javascript architecture

## Usage

```bash
yarn add archijs
```

```javascript
import { Archijs } from "archijs";

describe("Architecture", () => {
  it("Something", async () => {
    const project = Archijs.parseFromPath("src");
    
    const rule = await Archijs
      .defineThat()
      .dir()
      .withNameMatching('actions') // All foders that have "actions" in the name
      .should()
      .matchChildrensName('actions') // Check if the child file filtered before has "actions" on its name

    expect(project).toMatchRule(rule); // TODO: implements this feature
  });
});
```

## Todo

- [x] Fix async issue on chained functions.
- [ ] Implement feature to read file content and validates the functions names.
- [ ] Improve dir name validation.
- [ ] Add exceptions validation.
- [ ] Implement @types/jest.

## Suggestions

- Please any suggestion you are invited to open an issue: https://github.com/migh1/archijs/issues
- You also can fork this project to contribute 

