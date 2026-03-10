/** Returns the base URL prefix (empty string for production, "/preview" for preview builds) */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the base URL */
export function href(path: string): string {
  return `${base}${path}`;
}
