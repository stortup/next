const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function fa(input: string | number): string {
  if (typeof input === "number") {
    input = input.toString();
  }

  return input.replace(/[0-9]/g, (match) => {
    return digits[parseInt(match, 10)];
  });
}

export function fPhone(input: string): string {
  return fa(input.replace("+98", "0"));
}
