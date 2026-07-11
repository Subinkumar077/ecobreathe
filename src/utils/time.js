export function formatRelativeTime(datetime) {
  if (!datetime?.utc) return 'Unknown';

  const updated = new Date(datetime.utc);
  const now = new Date();

  const diff = Math.floor((now - updated) / 1000);

  if (diff < 60) {
    return 'Just now';
  }

  const minutes = Math.floor(diff / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  return updated.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}