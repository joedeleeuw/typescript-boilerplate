export function greeting(name: string): string {
  const displayName = name.trim() || "world";
  return `Hello, ${displayName}!`;
}
