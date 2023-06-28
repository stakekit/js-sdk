import { incrementDerivationPath } from '../src/utils/increment-derivation-path';

describe('incrementing derivation paths', () => {
  const tests = [
    { input: "m/44'/501'/0'/0'", expected: "m/44'/501'/0'/1'" },
    { input: "m/44'/501'/0'/0", expected: "m/44'/501'/0'/1" },
    { input: "m/44'/501'/0'/", expected: undefined },
    { input: "m/44'/501'/0/", expected: undefined },
    { input: "m/44'/501'/0/0", incrementBy: 2, expected: "m/44'/501'/0/2" },
  ];

  for (const { input, incrementBy, expected } of tests) {
    it(`${input} + ${incrementBy ?? 1} = ${expected}`, () => {
      if (!expected) {
        expect(() => incrementDerivationPath(input)).toThrow();
      } else {
        expect(incrementDerivationPath(input, incrementBy)).toEqual(expected);
      }
    });
  }
});
