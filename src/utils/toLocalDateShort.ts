export default function toLocalDateShort(date: string | Date): string {
  return new Date(date).toLocaleDateString("fa-IR");
}