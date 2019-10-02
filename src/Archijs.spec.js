const parsedPath = [
  "test/actions",
  "test/actions/notEmpty",
  "test/actions/notEmpty/emptyActions.js",
  "test/actions/nothing",
  "test/actions/nothing/nothingActions.js",
  "test/actions/nothing/nothingTwoActions.js",
  "test/actions/testActions.js",
  "test/index.js",
  "test/reducers",
  "test/reducers/reducerTest.js",
  "test/reducers/testActionsFail.js",
  "test/reducers/testReducers.js",
]

describe('Archijs', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('parseFromPath', () => {
    it('test parseFromPath() throw error function', () => {
      const Archijs1 = require('./Archijs');
      try {
        Archijs1.parseFromPath();
      } catch (e) {
        expect(e).toBe("parseFromPath() param must be a string, received: undefined");
      }
    });

    it('test parseFromPath() not throw error function', () => {
      const Archijs2 = require('./Archijs');
      const parseFromPath = Archijs2.parseFromPath('test');
      expect(parseFromPath).toMatchObject(parsedPath);
    });

    it('test parseFromPath() load as file function', () => {
      const Archijs3 = require('./Archijs');
      const parseFromPath = Archijs3.parseFromPath('test/actions/testActions.js');
      expect(parseFromPath).toBe(undefined);
    });
  });

  describe('defineThat', () => {
    const Archijs4 = require('./Archijs');
    it('test defineThat() function', () => {
      Archijs4.parseFromPath('test');
      const ruleBuilder = Archijs4.defineThat();
      expect(ruleBuilder).not.toBeNull();
    });
  });

  describe('RuleBuilder', () => {
    it('test folder() function', () => {
      const Archijs5 = require('./Archijs');
      const RuleBuilder1 = require('./RuleBuilder');
      const rule = RuleBuilder1('test', parsedPath, 'folder').folder().withNameMatching('actions').should().matchChildrensName('actions');

      const project = Archijs5.parseFromPath('test');
      const folder = Archijs5.defineThat().folder().withNameMatching('actions').should().matchChildrensName('actions');
      expect(folder).toMatchObject(rule);
      expect(project).toMatchArch(folder);
    });

    it('test files() function', () => {
      const Archijs6 = require('./Archijs');
      const RuleBuilder2 = require('./RuleBuilder');
      const rule = RuleBuilder2('test', parsedPath, 'files').files();

      Archijs6.parseFromPath('test/actions/testActions.js');
      const files = Archijs6.defineThat();
      expect(files).toBeUndefined();
      expect(rule).not.toBeNull();
    });
  });

  describe('Match', () => {
    it('test OK message', () => {
      const mockedExpected = {
        pathType: 'folder',
        parentRegex: 'actions',
        childRegex: 'actions',
      };

      expect(parsedPath).toMatchArch(mockedExpected);
    });

    it('test NOT OK message', () => {
      const mockedExpected = {
        pathType: 'folder',
        parentRegex: 'actions',
        childRegex: 'potato',
      };

      expect(parsedPath).not.toMatchArch(mockedExpected);
    });

    it('test switch case files', () => {
      const mockedExpected = {
        pathType: 'files',
        parentRegex: 'actions',
        childRegex: 'potato',
      };

      expect().toMatchArch(mockedExpected);
    });

    it('test switch case default', () => {
      const mockedExpected = {
        pathType: '',
        parentRegex: 'actions',
        childRegex: 'potato',
      };

      expect().toMatchArch(mockedExpected);
    });

    it('test switch case default', () => {
      const mockedExpected = {
        pathType: '',
        parentRegex: 'actions',
        childRegex: 'potato',
      };

      expect().toMatchArch(mockedExpected);
    });

    it('test message if TRUE condition', () => {
      const mockedExpected = {
        pathType: 'folder',
        parentRegex: 'actions',
        childRegex: 'actions',
      };

      expect(parsedPath).toMatchArch(mockedExpected);
    });

    it('test message if FALSE condition', () => {
      const mockedExpected = {
        pathType: 'folder',
        parentRegex: 'actions',
        childRegex: 'potato',
      };

      expect([]).toMatchArch(mockedExpected);
    });
  });
});
