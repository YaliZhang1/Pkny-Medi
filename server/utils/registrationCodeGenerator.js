export default function generateRegistrationCode({
  length = 12,
  includeUpper = true,
  includeLower = true,
  includeNumbers = true,
  includeSymbols = true,
}) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let chars = "";
  if (includeUpper) chars += upper;
  if (includeLower) chars += lower;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (!chars) return [];

  let registrationCode = "";
  for (let i = 0; i < length; i++) {
    registrationCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return registrationCode;
}
