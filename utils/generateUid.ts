export function generateUniqueId(): string {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  return (
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
  ).substring(0, 8);
}
