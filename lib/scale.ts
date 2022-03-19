/**
 * resize text and inputs font size based on text length
 */
export function TextScale(input: string | null): number {
  if (input == null) {
    return 1
  }

  if (input.length <= 80) {
    return 1
  }

  if (input.length <= 280) {
    return 2
  }

  return 3
}
