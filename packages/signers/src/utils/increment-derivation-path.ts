export const incrementDerivationPath = (
  derivationPath: string,
  incrementBy = 1
) => {
  const index = derivationPath.endsWith("'")
    ? derivationPath.length - 2
    : derivationPath.length - 1;

  const oldValue = parseInt(derivationPath[index]);
  if (isNaN(oldValue)) {
    throw new Error('Invalid derivation path');
  }

  const value = oldValue + incrementBy;

  return (
    derivationPath.slice(0, index) +
    `${value}` +
    derivationPath.slice(index + 1)
  );
};
