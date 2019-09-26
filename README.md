![npm](https://img.shields.io/npm/v/arch-jest)
![NPM](https://img.shields.io/npm/l/arch-jest)
![GitHub followers](https://img.shields.io/github/followers/migh1?label=%40migh1&style=social)

# arch-jest

A package to test javascript architecture

## Usage

```bash
yarn add arch-jest
```

```javascript
import { ArchJest } from "arch-jest";

describe("Architecture", () => {
  it("Something", async () => {
    const project = ArchJest.parseFromPath("src");
    
    const rule = await ArchJest
      .defineThat()
      .files()
      .withNameMatching(/\/*.actions.*\//mi) // All foders that have "actions" in the name
      .should()
      .matchChildrensName(/.actions./mi) // Check if the child file filtered before has "actions" on its name

    expect(project).toMatchRule(rule); // TODO: implements this feature
  });
});
```

## TODO

- [ ] Fix async issue on nested functions
- [ ] Implement feature to read file content and validates the functions names
- [ ] Improve dir name validation
- [ ] Add exceptions validation

## SUGGESTIONS

- Please any suggestion you are invited to open an issue: https://github.com/migh1/arch-jest/issues
- You also can fork this project to contribute 

