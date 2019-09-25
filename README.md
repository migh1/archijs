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
    
    const rule = ArchJest.defineThat().files().withNameMatching('/regexExp/');

    //TODO
    expect(project).toMatchRule(rule);
  });
});
```
