export async function ensureNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied';

  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';

  return Notification.requestPermission();
}

export async function showLocalNotification(payload: {
  title: string;
  body: string;
}): Promise<boolean> {
  const permission = await ensureNotificationPermission();
  if (permission !== 'granted') return false;

  if (!('serviceWorker' in navigator)) return false;

  const reg = await navigator.serviceWorker.ready;
  await reg.showNotification(payload.title, {
    body: payload.body,
    icon: '/favicon.svg',
  });

  return true;
}
