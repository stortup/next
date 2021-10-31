const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function fa(input: string): string {
  return input.replace(/[0-9]/g, (match) => {
    return digits[parseInt(match, 10)];
  });
}
