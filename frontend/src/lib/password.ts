export interface PasswordChecks {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  symbol: boolean;
  allMet: boolean;
}

export function getPasswordChecks(password: string): PasswordChecks {
  const length = password.length >= 12;
  const uppercase = /[A-Z]/.test(password);
  const lowercase = /[a-z]/.test(password);
  const number = /[0-9]/.test(password);
  const symbol = /[^A-Za-z0-9]/.test(password);

  return {
    length,
    uppercase,
    lowercase,
    number,
    symbol,
    allMet: length && uppercase && lowercase && number && symbol,
  };
}

export function isValidPassword(password: string): boolean {
  return getPasswordChecks(password).allMet;
}

export function passwordsMatch(password: string, confirm: string): boolean {
  return password === confirm;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
