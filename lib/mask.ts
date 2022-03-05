export function Mask(input: string | null): string {
  return input == null ? "" : input.replace(/./g, '*')
}
