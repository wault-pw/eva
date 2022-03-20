export function Mask(input: string | null): string {
  // with regular asterisks mask char "*", css word-reak:break-all;
  // property not working on mobile safari and chrome
  // @refs https://unicode-table.com/en/sets/star-symbols/
  return input == null ? "" : input.replace(/./g, '✶')
}
