// https://github.com/LedgerHQ/ledger-live-common/blob/77e5ff61ff8b2c2784e2372f2725284f58e56ef9/src/families/cosmos/js-signOperation.ts#L188
export const sortedObject = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortedObject);
  }

  const sortedKeys = Object.keys(obj).sort();
  const result: any = {};

  sortedKeys.forEach((key) => {
    result[key] = sortedObject(obj[key]);
  });

  return result;
};
