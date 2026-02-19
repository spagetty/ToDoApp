/**
 * Format an ISO timestamp to a human-readable date string.
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Return true if the given YYYY-MM-DD date is in the past (strictly before today).
 */
export function isOverdue(dueDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + 'T00:00:00');
  return due < today;
}

/**
 * Format a YYYY-MM-DD string to a locale date string.
 */
export function formatDueDate(dueDate: string): string {
  const date = new Date(dueDate + 'T00:00:00');
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
