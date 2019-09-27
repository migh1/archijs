![npm](https://img.shields.io/npm/v/arch-js)
![NPM](https://img.shields.io/npm/l/arch-js)
![GitHub followers](https://img.shields.io/github/followers/migh1?label=%40migh1&style=social)

# arch-js

A package to test javascript architecture

## Usage

```bash
yarn add arch-js
```

```javascript
import { ArchJs } from "arch-js";

describe("Architecture", () => {
  it("Something", async () => {
    const project = ArchJs.parseFromPath("src");
    
    const rule = await ArchJs
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

- [x] Fix async issue on chained functions
- [ ] Implement feature to read file content and validates the functions names
- [ ] Improve dir name validation
- [ ] Add exceptions validation
- [ ] Implement @types/jest

## Suggestions

- Please any suggestion you are invited to open an issue: https://github.com/migh1/arch-js/issues
- You also can fork this project to contribute 

